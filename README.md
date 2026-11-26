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
| `src/directSchools.js` | Direct partner universities per destination (UK so far, from the client's sheet). Shown first; other partners open on request |
| `src/destinationsData.js` | Generated from the live destination pages (facts verbatim; school lists de-duplicated and sorted) |
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
- UK direct schools: names tidied from the sheet (e.g. LINCON BISHOP -> Lincoln Bishop, RORBERT -> Robert Gordon, UNIVERSITY OF COVENTRY -> Coventry University); University of Law left out until its signing completes. Tuition deposit, instalment and intake columns are not used yet.
- Other destinations show their single partner list until direct lists arrive.
- "Get Accommodation" in the nav opens https://grynindex-accommodation.studentacco.com/ in a new tab.
