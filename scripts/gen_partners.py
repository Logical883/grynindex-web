"""Clean partners-raw.json and write src/partnerSchools.js (school names only).
Usage: python3 -I gen_partners.py <partners-raw.json> <out.js>
"""
import json
import re
import sys

raw = json.load(open(sys.argv[1], encoding='utf-8'))

SHEET_TO_SLUG = {'United Kingdom': 'uk', 'USA': 'usa', 'Canada': 'canada', 'Ireland': 'ireland',
                 'Australia': 'australia', 'New Zealand': 'new-zealand', 'China': 'china'}
EUROPE = ['France', 'Germany', 'Greece', 'Italy', 'Malta', 'Netherlands', 'Poland', 'Spain', 'Switzerland', 'Finland']

# Exact replacements (after basic cleanup) for typos, provider variants and truncated entries.
FIX = {
    # UK direct variants
    'Aston London': 'Aston University – London Campus', 'Aston London University': 'Aston University – London Campus',
    'BBP University London': 'BPP University London', 'BPP London': 'BPP University London',
    'Health Science University': 'Health Sciences University',
    'Lincon Bishop University': 'Lincoln Bishop University',
    'Northumbria London': 'Northumbria University London',
    'Ravens Bourne University': 'Ravensbourne University London',
    'Royal Holloway University of London': 'Royal Holloway, University of London',
    'University of Hull London': 'University of Hull – London Campus',
    'Teesside Universitty': 'Teesside University',
    'University of Southwales': 'University of South Wales',
    'University of Gloucestershire (UOG': 'University of Gloucestershire',
    'Hertfordshire University International College (HI': 'Hertfordshire International College',
    'University of Portsmouth, International College (I': 'International College Portsmouth',
    'UCLAN': 'University of Central Lancashire (UCLan)', 'ULAN': 'University of Central Lancashire (UCLan)',
    # Australia direct
    'Charles Strut University': 'Charles Sturt University',
    'Griffith University International': 'Griffith University',
    'University of Notredam': 'University of Notre Dame Australia',
    # Canada
    'Alexender College': 'Alexander College', 'St Lawerence College': 'St. Lawrence College',
    'Wilfri Lauren University': 'Wilfrid Laurier University',
    'Wilfred Laurier International College (WLIC)': 'Wilfrid Laurier International College (WLIC)',
    'Simon Frazer University': 'Simon Fraser University', 'Canada Collège': 'Canada College',
    # France / Ireland / Netherlands / USA
    'Ecole the Management Applique/ EMA- Campus: Paris, France': 'École de Management Appliqué (EMA)',
    'Essca': 'ESSCA',
    'Manchester': 'INTO Manchester',
    'RHUL': 'Royal Holloway, University of London',
    # Client corrections (Nov 2026)
    'Australian College of Applied Psychology': 'ACAP University College',
    'Australian College of Applied Professions': 'ACAP University College',
    'Letterkenny Institute of Technology': 'Atlantic Technological University (ATU)',
    'Atlantic Technological University Sligo – Ireland': 'Atlantic Technological University (ATU)',
    'Institute of Technology Carlow': 'South East Technological University (SETU)',
    'Limerick Institute of Technology': 'Technological University of the Shannon (TUS)',
    'Technological University of the Shannon: Midlands Midwest (TUS)': 'Technological University of the Shannon (TUS)',
    'National University of Ireland, Galway': 'University of Galway',
    'National University of Ireland Galway': 'University of Galway',
    'Plymouth University': 'University of Plymouth',
    'Plymouth University/ Plymouth University International College (PUIC)': 'University of Plymouth International College',
    'University of Plymouth International College (Navitas)': 'University of Plymouth International College',
    'University of Plymouth International College (UPIC) at Plymouth University': 'University of Plymouth International College',
    'Ravensbourne University': 'Ravensbourne University London',
    'Aston University London': 'Aston University – London Campus',
    'University of Hull, London': 'University of Hull – London Campus',
    'Brescia University College': 'Western University',   # integrated into Western University (May 2024); Western is approved
    'University of Europe For Applied Sciences': 'University of Europe for Applied Sciences',
    'Technological University of the Shannon: Midlands Midwest (TUS': 'Technological University of the Shannon: Midlands Midwest (TUS)',
    'The Hague University of Applied Science – Netherland': 'The Hague University of Applied Sciences',
    'Oragon State University': 'Oregon State University',
    'Richard Blan College of Williams and Mary Global Student Success Program': 'Richard Bland College of William & Mary Global Student Success Program',
}
DROP = {'CEG', 'Dublin', 'Study Group', 'University College', 'Academy for the International Community NZ Ltd'}
SMALL = {'of', 'and', 'the', 'for', 'at', 'in', 'de', 'du', 'la', 'le', 'des', 'di', 'del', 'y', 'en', 'am', 'an', 'der', 'und'}


def smart_case(name):
    words = name.split(' ')
    out = []
    for i, w in enumerate(words):
        if w and w[0].islower() and not (i and w in SMALL):
            w = w[0].upper() + w[1:]
        out.append(w)
    return ' '.join(out)


def clean(name):
    n = ' '.join(name.split())
    n = re.sub(r'\s*\(\s*signing in progress\s*\)', '', n, flags=re.I)   # "University of Law (signing in progress)"
    n = re.sub(r'^Malvern International, UK \(Pathway Provider\) - ', '', n)
    n = re.sub(r'^(NAVITAS|QA|INTO)\s+', '', n)
    n = re.sub(r'^[A-Z]{2,5}:\s*', '', n)                       # "FIC: Simon Fraser University"
    n = re.sub(r'\s*\((Direct|LG|Pathways any center|OIEG)\)', '', n, flags=re.I)
    n = re.sub(r'\s*[-–]\s*(CEG|OIEG|QAHE|GUS|StudyGroup|MALVERN)\s*$', '', n, flags=re.I)
    n = re.sub(r'^(GUS|OIEG|UE|CEG|QAHE|OIEG Group|Navitas Group|Study Group|Higher Education)\s*-\s*', '', n)  # provider prefixes
    n = re.sub(r'\s*\((?:INTO|OIEG|SG|Study Group|CEG)?\s*-?\s*Direct\)', '', n, flags=re.I)  # "(OIEG Direct)"
    n = re.sub(r'(?:\s*,|\s+CEG)?\s+Direct$', '', n, flags=re.I)                    # ", Direct" / " CEG Direct"
    n = re.sub(r'\s*\(via [^)]*\)', '', n, flags=re.I)                              # "(via Kaplan)"
    n = re.sub(r'\s+via\s+.*$', '', n, flags=re.I)                              # "... via QA Higher Education"
    n = re.sub(r"^[\w&+.' ]{0,30}Group\s*-\s*", '', n)                          # "Shorelight Group - ", "Group - "
    n = re.sub(r'^[-#\s]+|[-–/\s]+$', '', n)                                    # stray "- ", "#", trailing "/" or " -"
    n = re.sub(r'\s*[-–]\s*(DIRECT|RCL|Ulaw)\s*$', '', n, flags=re.I)        # "... - DIRECT", "Regent College London – RCL"
    n = re.sub(r'[\s.*]+$', '', n)                               # trailing dots / admission-level stars
    n = re.sub(r'\s*\*$', '', n)
    n = n.strip()
    if n.startswith('(') and n.endswith(')'):
        n = n[1:-1]                                              # orphan "(…)" fragment
    elif n.startswith('(') and ')' not in n:
        n = n[1:]
    n = smart_case(n)
    while n in FIX and FIX[n] != n:                                               # chained fixes
        n = FIX[n]
    return n


def key(n):
    n = n.lower().replace('&', 'and')
    n = re.sub(r'^the\s+', '', n)
    return re.sub(r'[^a-z0-9]', '', n)


STOP = {'the', 'university', 'of', 'london', 'campus', 'uk'}


def loose(n):
    return ' '.join(w for w in re.sub(r'[^a-z0-9\s]', ' ', n.lower()).split() if w not in STOP)


def build(sheet):
    data = raw[sheet]
    direct, seen = [], set()
    for e in data['direct']:
        n = clean(e['name'])
        if n in DROP or key(n) in seen:
            continue
        seen.add(key(n)); direct.append(n)
    direct_loose = {loose(n) for n in direct}
    others = []
    for e in data['third']:
        n = clean(e['name'])
        base = re.sub(r'\s*[-–]\s*[^-–]*Campus$', '', n)                       # campus variant of a direct school
        if not n or n in DROP or len(n) < 3 or key(n) in seen or loose(n) in direct_loose or loose(base) in direct_loose:
            continue
        seen.add(key(n)); others.append(n)
    srt = lambda xs: sorted(xs, key=lambda s: re.sub(r'^(the|\W)+\s*', '', s, flags=re.I).lower())
    return srt(direct), srt(others)


def js(v):
    return json.dumps(v, ensure_ascii=False)


lines, report = [], []
for sheet, slug in SHEET_TO_SLUG.items():
    d, o = build(sheet)
    report.append(f'{slug:12} direct={len(d):3} others={len(o):4}')
    lines.append(f"  {js(slug)}: {{\n    direct: {js(d)},\n    others: {js(o)},\n  }},")
groups = []
for c in EUROPE:
    d, o = build(c)
    report.append(f'  europe/{c:11} direct={len(d):2} others={len(o):3}')
    groups.append(f"      {{ country: {js(c)}, direct: {js(d)}, others: {js(o)} }},")
lines.append("  europe: {\n    groups: [\n" + '\n'.join(groups) + "\n    ],\n  },")

header = '''// Partner schools per study destination, generated from the client's workbook
// "Partner_Schools_2026_Cleaned.xlsx" (school names only). `direct` schools are the
// main list; `others` are third-party partner schools (including entries the sheet
// marks as unconfirmed partners) shown on request. Names are tidied (typos, casing,
// provider suffixes) and de-duplicated; direct schools are not repeated in `others`.
export const partnerSchools = {
'''
footer = '''
}

// Loose name key so "The University of Winchester" matches "University of Winchester".
const STOP = new Set(['the', 'university', 'of', 'london', 'campus', 'uk'])
export const schoolKey = (name) =>
  name.toLowerCase().replace(/[^a-z0-9\\s]/g, ' ').split(/\\s+/).filter((w) => w && !STOP.has(w)).join(' ')
'''
open(sys.argv[2], 'w', encoding='utf-8').write(header + '\n'.join(lines) + footer)
print('\n'.join(report))
