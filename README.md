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
| `src/components/Hero.jsx` | Hero panel, image collage with mouse parallax, service slider, quick finder bar |
| `src/components/Sections.jsx` | Stats, Services, How We Work (sticky stepper), Destinations carousel, Why Us, Events, Testimonial, CTA |
| `src/components/Footer.jsx` | Footer with social links |
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
| Body font | Poppins |
| Display font | Instrument Serif |

## Status

Only the home page is done. The other nav links still point to the live site's pages until those are rebuilt.

Content notes for the client:
- Several service and destination blurbs were cut off mid-sentence on the live site; here they end at the last complete clause.
- The "Building Values" event says "June 17th" with no year. Confirm the date, or replace it with the next upcoming event.
- No phone number or email appears on the home page. Add them to the footer once confirmed.
