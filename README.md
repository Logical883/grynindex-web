# GrynIndex — website redesign

A modern redesign of the [grynindexedu.com](https://grynindexedu.com/) home page, built with React and Vite. The copy and images are the company's own; only the UI is new.

## Stack

- React 19 + Vite
- [motion](https://motion.dev) for animation (scroll-linked parallax, split-text reveals, magnetic buttons, 3D tilt cards)
- [lenis](https://lenis.darkroom.engineering) for smooth scrolling
- [lucide-react](https://lucide.dev) for icons (no emojis)

## Run

```bash
npm install
npm run dev
```

## Structure

| Path | What |
| --- | --- |
| `src/data.js` | All site copy, links and image references, taken from the live home page |
| `src/components/Nav.jsx` | Floating nav with mega menus (Services, Study Locations) and a full-screen mobile menu |
| `src/components/Hero.jsx` | Violet hero panel, service slider, quick finder bar |
| `src/components/Sections.jsx` | Stats, Services, How We Work (sticky stepper), Destinations carousel, Why Us, Events, Testimonial, CTA |
| `src/components/Footer.jsx` | Footer with social links |
| `src/pages/ServicesPage.jsx` | `/services`: hero, sticky section menu, one section per service, compliance |
| `src/servicesData.js` | Services page copy, taken from the live "Our Services" page |
| `src/scroll.js` | Shared smooth-scroll helper (`scrollToId`) |
| `src/pages/DestinationPage.jsx` | `/destinations/:slug` template: hero with at-a-glance figures, quick facts, searchable partner schools, how we help, other destinations |
| `src/partnerSchools.js` | Generated from the client's `Partner_Schools_2026_Cleaned.xlsx`: direct schools (main list) and third-party partner schools (on request) per destination; Europe grouped by country |
| `scripts/` | `parse_partners.py` + `gen_partners.py` regenerate `partnerSchools.js` from the workbook |
| `src/destinationsData.js` | Destination facts, ledes and at-a-glance figures (from the live site); China added |
| `src/components/NotReady.jsx` | Placeholder shown for routes not built yet |
| `src/components/fx.jsx` | Reusable effects: custom cursor, reveal, split text, counter, magnetic, tilt |
| `src/styles.css` | Brand tokens and all styles |
| `public/images/` | Images downloaded from the live site |

## Brand tokens

| Token | Hex |
| --- | --- |
| Green (primary) | `#4DBE6F` |
| Purple (secondary) | `#7C1D96` |
| Pink (accent) | `#CC3366` |
| Coral (accent) | `#FB7751` |
| Font | Plus Jakarta Sans |

## Status

Done: home (`/`), the seven study destinations (`/destinations/uk`, `usa`, `canada`, `ireland`, `australia`, `europe`, `new-zealand`) and services (`/services`, with `#academic-counseling`, `#admission-support`, `#visa-application`, `#flight-offers`, `#industry-compliance`). Every other route (`/about`, `/contact`, `/accommodation`, ...) shows a "Not yet developed" page. Nothing links to the live site. `vercel.json` rewrites all routes to `index.html`.

Design rules: violet and black are the only gradient pair; green, coral and pink are never blended together; buttons have no shadows.

Content notes for the client:
- Several service and destination blurbs were cut off mid-sentence on the live site; here they end at the last complete clause.
- The "Building Values" event says "June 17th" with no year. Confirm the date, or replace it with the next upcoming event.
- No phone number or email appears on the home page. Add them to the footer once confirmed.
- Destination copy fixes vs the live site: Canada said "You need a valid UK study visa" (now "Canadian study visa"); UK said "intentional students" (now "international students").
- Ireland's live page has only one quick fact; ask the client for more.
- Partner schools come from `Partner_Schools_2026_Cleaned.xlsx` (names only). To update:
  `python3 -I scripts/parse_partners.py <workbook.xlsx> raw.json && python3 -I scripts/gen_partners.py raw.json src/partnerSchools.js`
- Names are tidied (typos, casing, provider suffixes like "- OIEG"), de-duplicated across agencies; "Unconfirmed partner" entries (NZ, USA) are included.
- University of Law is listed as a UK direct school; the sheet's "(signing in progress)" label is not shown.
- Destinations with no direct schools (New Zealand, China) show their partner schools as the main list.
- "Get Accommodation" in the nav opens https://grynindex-accommodation.studentacco.com/ in a new tab.
