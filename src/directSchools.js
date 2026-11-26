// Schools Gryn Index works with directly, per destination (from the client's
// "UK DIRECT_SCHOOLS" sheet; names only). These are the primary list on each
// destination page; the longer third-party partner list is shown on request.
// Names are tidied to the universities' usual spelling. "University of Law" is
// left out until its signing is complete.
export const directSchools = {
  uk: [
    'Loughborough University',
    'Plymouth University',
    'Health Sciences University',
    'Ravensbourne University',
    'University of Winchester',
    'Teesside University',
    'Arden University',
    'Lincoln Bishop University',
    'University of Hertfordshire',
    'University of Hull, London',
    'Northumbria University',
    'Ulster University',
    'Canterbury Christ Church University',
    'University of Leicester',
    'University of Northampton',
    'Coventry University',
    'Robert Gordon University',
    'Hartpury University',
    'Aston University London',
  ],
}

// Loose name key so "The University of Winchester" matches "University of Winchester"
// and campus variants ("Northumbria University (London Campus)") match the main entry.
const STOP = new Set(['the', 'university', 'of', 'london', 'campus', 'uk'])
export const schoolKey = (name) =>
  name.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter((w) => w && !STOP.has(w)).join(' ')
