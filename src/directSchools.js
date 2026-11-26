// Schools Gryn Index works with directly, per destination, from the client's
// "UK DIRECT_SCHOOLS" sheet: tuition deposit, instalment plan and intakes.
// These are the primary list on each destination page; the longer third-party
// partner list is shown on request. Names are tidied to the universities' usual
// spelling. "University of Law" is left out until its signing is complete.
export const directSchools = {
  uk: [
    { name: "Arden University", deposit: "£4,000", instalments: "3 instalments", intakes: ["February", "May"] },
    { name: "Aston University London", deposit: "50% of tuition", instalments: "3 instalments", intakes: ["January", "April", "September"] },
    { name: "Canterbury Christ Church University", deposit: "£6,000", instalments: "8 instalments", intakes: ["January", "September"] },
    { name: "Coventry University", deposit: "£8,000", instalments: "3 instalments", intakes: ["January", "March", "May", "September"] },
    { name: "Hartpury University", deposit: "50% of tuition", instalments: "3 instalments", intakes: ["January", "September"] },
    { name: "Health Sciences University", deposit: "£3,500", instalments: "2 instalments", intakes: ["January", "May", "September"] },
    { name: "Lincoln Bishop University", deposit: "£3,000", instalments: "2 instalments", intakes: ["January", "May", "September"] },
    { name: "Loughborough University", deposit: "£2,500", instalments: "3 instalments", intakes: ["January", "September"] },
    { name: "Northumbria University", deposit: "£5,500", instalments: "3 instalments", intakes: ["January", "September"] },
    { name: "Plymouth University", deposit: "£3,500", instalments: "3 instalments", intakes: ["January", "September"] },
    { name: "Ravensbourne University", deposit: "£3,500", instalments: "3 instalments", intakes: ["January", "February", "May", "September"] },
    { name: "Robert Gordon University", deposit: "50% of tuition", instalments: "3 instalments", intakes: ["January", "May", "September"] },
    { name: "Teesside University", deposit: "£4,000", instalments: "5 instalments", intakes: ["January", "May", "September"] },
    { name: "Ulster University", deposit: "£6,000", instalments: "3 instalments", intakes: ["January", "September"] },
    { name: "University of Hertfordshire", deposit: "£5,000", instalments: "3 instalments", intakes: ["January", "September"] },
    { name: "University of Hull, London", deposit: "£6,350", instalments: "3 instalments", intakes: ["January", "June", "September"] },
    { name: "University of Leicester", deposit: "£6,000", instalments: "3 instalments", intakes: ["January", "May", "September"] },
    { name: "University of Northampton", deposit: "£7,000", instalments: "3 instalments", intakes: ["January", "February", "September"] },
    { name: "University of Winchester", deposit: "£3,000", instalments: "2 or 6 instalments", intakes: ["January", "September"] },
  ],
}

// Loose name key so "The University of Winchester" matches "University of Winchester"
// and campus variants ("Northumbria University (London Campus)") match the main entry.
const STOP = new Set(['the', 'university', 'of', 'london', 'campus', 'uk'])
export const schoolKey = (name) =>
  name.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter((w) => w && !STOP.has(w)).join(' ')
