"""Parse Partner_Schools_2026_Cleaned.xlsx into {sheet: {direct: [...], third: [...]}} (names only).
Usage: python3 -I parse_partners.py <xlsx> <out.json>
Third-party entries keep every agency section, including 'UNCONFIRMED PARTNER'.
"""
import json
import sys

import openpyxl

wb = openpyxl.load_workbook(sys.argv[1], data_only=True)
skip = {'Destinations', 'Admission guidance'}
out = {}
for ws in wb.worksheets:
    if ws.title in skip:
        continue
    section, agency = None, None
    direct, third = [], []
    for a, b, *_ in ws.iter_rows(min_row=3, values_only=True):
        if isinstance(a, str) and b is None and a.strip().isupper():
            tag = a.strip()
            if tag == 'DIRECT SCHOOLS':
                section = 'direct'
            elif tag == 'THIRD-PARTY PARTNER SCHOOLS':
                section = 'third'
            else:
                agency = tag
            continue
        if not b or not isinstance(b, str):
            continue
        name = ' '.join(b.split())
        if name.lower().startswith('no direct schools'):
            continue
        (direct if section == 'direct' else third).append({'name': name, 'agency': agency})
    out[ws.title] = {'direct': direct, 'third': third}

json.dump(out, open(sys.argv[2], 'w'), ensure_ascii=False, indent=1)
for k, v in out.items():
    print(f"{k:15} direct={len(v['direct']):3} third={len(v['third']):4}")
