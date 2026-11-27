import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, ArrowUpRight, ChevronDown, ChevronRight, Globe, Search, X } from 'lucide-react'
import { destinationPages, pathwayPartnersImage } from '../destinationsData'
import { serviceSections } from '../servicesData'
import { Reveal, SplitText, Magnetic } from '../components/fx'
import { CTA } from '../components/Sections'
import { scrollToId } from '../scroll'
import { partnerSchools } from '../partnerSchools'

const ease = [0.22, 1, 0.36, 1]
const PREVIEW = 18 // schools shown before "Show all"

// School lists for a destination, flat or grouped by country (Europe).
function schoolsFor(slug) {
  const p = partnerSchools[slug]
  if (!p) return null
  if (!p.groups) return { direct: p.direct, others: p.others }
  const pick = (k) => p.groups.filter((g) => g[k].length).map((g) => ({ country: g.country, schools: g[k] }))
  const directGroups = pick('direct')
  const otherGroups = pick('others')
  return {
    direct: directGroups.flatMap((g) => g.schools), others: otherGroups.flatMap((g) => g.schools),
    directGroups, otherGroups, countries: p.groups.length,
  }
}

// "At a glance": partner counts come from the workbook data.
const glanceFor = (d) => {
  const s = schoolsFor(d.slug)
  if (!s) return d.glance
  return d.glance.map(([value, label]) => {
    if (label === 'Partner institutions') {
      const plural = (n, one, many) => [String(n), n === 1 ? one : many]
      return s.direct.length
        ? plural(s.direct.length, 'Direct partner school', 'Direct partner schools')
        : plural(s.others.length, 'Partner institution', 'Partner institutions')
    }
    if (label === 'Partner countries' && s.countries) return [String(s.countries), 'Partner countries']
    return [value, label]
  })
}

/* ---------- Hero ---------- */
function DestHero({ d }) {
  return (
    <section className="page-hero-wrap">
      <div className="page-hero dest-hero violet-panel" data-dark>
        <div className="mesh" aria-hidden="true"><span className="blob b1" /><span className="blob b2" /></div>
        <div className="grain" aria-hidden="true" />
        <div className="container">
          <div className="dest-hero-grid">
            <div className="page-hero-copy">
              <motion.nav className="crumbs" aria-label="Breadcrumb" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
                <a href="/">Home</a><ChevronRight size={14} />
                <a href="/#destinations">Study Locations</a><ChevronRight size={14} />
                <span aria-current="page">{d.name}</span>
              </motion.nav>
              <motion.p className="eyebrow light" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.8, ease }}>
                Study in
              </motion.p>
              <h1 className="page-title dest-title" aria-label={d.name}>
                {d.name.split(' ').map((w, i) => (
                  <span className="line-mask" key={w}>
                    <motion.span initial={{ y: '105%' }} animate={{ y: '0%' }} transition={{ duration: 1.1, ease, delay: 0.1 + i * 0.12 }}>{w}</motion.span>
                  </span>
                ))}
              </h1>
              <motion.p className="lede light" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.9, ease }}>
                {d.lede}
              </motion.p>
              <motion.div className="dest-hero-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.9, ease }}>
                <Magnetic>
                  <a href="/contact" className="btn-journey">
                    <span className="arrow-disc"><ArrowRight size={16} /></span>
                    Book a free consultation
                  </a>
                </Magnetic>
                <a href="#partners" onClick={(e) => { e.preventDefault(); scrollToId('partners') }} className="link-underline light">See partner schools</a>
              </motion.div>
            </div>

            <motion.div className="dest-hero-card" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 1, ease }}>
              <div className="dest-hero-photo">
                {d.image ? <img src={d.image} alt="" /> : <span className="media-fallback" aria-hidden="true">{d.code}</span>}
                <span className="flag-chip"><Globe size={12} /> {d.code}</span>
              </div>
              <p className="glance-label">At a glance</p>
              <div className="glance-grid">
                {glanceFor(d).map(([value, label]) => (
                  <div className="glance-item" key={label}>
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.nav className="dest-switch" aria-label="Other study destinations" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.8 }}>
            {destinationPages.map((x) => (
              <a key={x.slug} href={`/destinations/${x.slug}`} className={x.slug === d.slug ? 'on' : ''} aria-current={x.slug === d.slug ? 'page' : undefined}>
                <span className="code-chip">{x.code}</span>{x.name}
              </a>
            ))}
          </motion.nav>
        </div>
      </div>
    </section>
  )
}

/* ---------- Quick facts (bento grid) ---------- */
function Facts({ d }) {
  return (
    <section id="facts" className="section container">
      <div className="section-head">
        <div>
          <p className="eyebrow">Why study in {d.name}</p>
          <SplitText className="display" text={d.heading} />
        </div>
      </div>
      <div className={`fact-grid ${d.facts.length === 1 ? 'single' : ''}`}>
        {d.facts.map(({ title, icon: Icon, text }, i) => (
          <Reveal key={title} delay={(i % 3) * 0.07} className={`fact-card ${i === 0 ? 'featured' : ''}`} {...(i === 0 ? { 'data-dark': true } : {})}>
            <div className="fact-top">
              <span className="fact-icon"><Icon size={20} strokeWidth={1.75} /></span>
              <span className="fact-num">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <h3>{title}</h3>
            <p>{text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ---------- Partner schools ---------- */
function groupByLetter(names) {
  const groups = {}
  names.forEach((n) => {
    const letter = n.replace(/^(the|\W)+\s*/i, '')[0]?.toUpperCase() || '#'
    ;(groups[/[A-Z]/.test(letter) ? letter : '#'] ||= []).push(n)
  })
  return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b))
}

/* Searchable A–Z (or by-country) list with a "Show all" toggle. */
function SchoolBoard({ names, groups, label = 'schools', preview = PREVIEW }) {
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState(false)
  const q = query.trim().toLowerCase()
  const matches = q ? names.filter((n) => n.toLowerCase().includes(q)) : names
  const showAll = expanded || q || names.length <= preview
  const visible = showAll ? matches : matches.slice(0, preview)
  // Grouped lists (Europe) preview a few schools from every country rather than the first N overall.
  const perGroup = groups ? Math.max(3, Math.ceil(preview / groups.length)) : 0
  const sections = groups
    ? groups
      .map((g) => [g.country, g.schools.filter((n) => matches.includes(n)).slice(0, showAll ? undefined : perGroup)])
      .filter(([, list]) => list.length)
    : groupByLetter(visible)

  return (
    <>
      {names.length > 10 && (
        <div className="school-toolbar">
          <label className="school-search">
            <Search size={18} />
            <span className="sr">Search {label}</span>
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={`Search ${label}`} />
            {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search"><X size={16} /></button>}
          </label>
        </div>
      )}
      <div className={`school-board ${showAll ? '' : 'collapsed'}`}>
        {sections.length === 0 && <p className="school-empty">No {label} match “{query}”.</p>}
        <div className={groups ? 'school-groups countries' : 'school-groups'}>
          {sections.map(([heading, list]) => (
            <div className="school-group" key={heading}>
              <p className="school-letter">{heading}</p>
              <ul>{list.map((n) => <li key={n}>{n}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
      {!q && names.length > preview && (
        <div className="school-more">
          <button type="button" className="btn btn-dark" onClick={() => setExpanded((v) => !v)} aria-expanded={expanded}>
            {expanded ? 'Show fewer' : `Show all ${names.length} ${label}`}
            <ChevronDown size={16} className={expanded ? 'flip' : ''} />
          </button>
        </div>
      )}
    </>
  )
}

function PathwayCard() {
  return (
    <Reveal className="pathway-card">
      <div>
        <p className="eyebrow">Pathway partners</p>
        <h3>Admission pathways through our global partners</h3>
      </div>
      <img src={pathwayPartnersImage} alt="Logos of admission pathway partners including ApplyBoard, Cambridge Education Group, INTO, Navitas and Oxford International" loading="lazy" />
    </Reveal>
  )
}

// "in the United Kingdom" / "in Canada"
const place = (d) => (/^United /.test(d.name) ? `the ${d.name}` : d.name)

/* Direct schools are the main list; third-party partner schools are opened on request. */
function DirectPartners({ d, s: list }) {
  const [open, setOpen] = useState(false)
  const where = list.countries ? `across ${list.directGroups.length} countries` : `in ${place(d)}`
  const toggle = () => {
    setOpen((v) => !v)
    if (!open) setTimeout(() => scrollToId('more-schools'), 80)
  }

  return (
    <section id="partners" className="section partners">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Our direct schools</p>
            <SplitText className="display" text={`Study directly with our schools in ${place(d)}`} />
          </div>
          <Reveal as="p" className="lede" delay={0.1}>
            {list.direct.length} {list.direct.length === 1 ? 'school' : 'schools'} {where} that Gryn Index partners with directly.
          </Reveal>
        </div>

        <SchoolBoard names={list.direct} groups={list.directGroups} label="direct schools" preview={Infinity} />

        {list.others.length > 0 && (
          <>
            <Reveal className="more-schools-cta">
              <div>
                <h3>Can’t find your desired university among our direct schools?</h3>
                <p>We also work with {list.others.length} more schools in {place(d)} through our admission pathway partners.</p>
              </div>
              <button type="button" className="btn btn-dark" onClick={toggle} aria-expanded={open} aria-controls="more-schools">
                {open ? 'Hide partner schools' : 'See more partner schools'}
                <ChevronDown size={16} className={open ? 'flip' : ''} />
              </button>
            </Reveal>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div id="more-schools" className="more-schools"
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.5, ease }}>
                  <div className="more-schools-head">
                    <p className="eyebrow">Admission pathway partners</p>
                    <h3>More partner schools in {place(d)}</h3>
                  </div>
                  <SchoolBoard names={list.others} groups={list.otherGroups} label="partner schools" />
                  <PathwayCard />
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </section>
  )
}

/* Destinations with no direct schools show their partner schools as the main list. */
function Partners({ d }) {
  const list = schoolsFor(d.slug)
  if (!list) return null
  if (list.direct.length) return <DirectPartners d={d} s={list} />
  return (
    <section id="partners" className="section partners">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Admission Pathway Partners</p>
            <SplitText className="display" text={`Partner schools in ${place(d)}`} />
          </div>
          <Reveal as="p" className="lede" delay={0.1}>
            {list.others.length} {list.others.length === 1 ? 'institution' : 'institutions'}{list.countries ? ` across ${list.otherGroups.length} countries` : ''} we work with on admissions.
          </Reveal>
        </div>
        <SchoolBoard names={list.others} groups={list.otherGroups} />
        <PathwayCard />
      </div>
    </section>
  )
}

/* ---------- How we help ---------- */
function HowWeHelp({ d }) {
  return (
    <section className="section container">
      <div className="section-head">
        <div>
          <p className="eyebrow">How we help</p>
          <SplitText className="display" text={`From counseling to landing in ${d.name}`} />
        </div>
        <Reveal as="p" className="lede" delay={0.1}>One team guides your entire study abroad process.</Reveal>
      </div>
      <div className="help-grid">
        {serviceSections.map((s, i) => (
          <Reveal key={s.id} delay={i * 0.07}>
            <a href={`/services#${s.id}`} className="help-card">
              <span className="help-num">{s.num}</span>
              <span className="fact-icon"><s.icon size={20} strokeWidth={1.75} /></span>
              <strong>{s.title}</strong>
              <small>{s.short}</small>
              <span className="service-link">Learn more <ArrowUpRight size={16} /></span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ---------- Other destinations ---------- */
function OtherDestinations({ d }) {
  const others = destinationPages.filter((x) => x.slug !== d.slug)
  return (
    <section className="section other-dest">
      <div className="container section-head">
        <div>
          <p className="eyebrow">Keep exploring</p>
          <SplitText className="display" text="Other study destinations" />
        </div>
      </div>
      <div className="dest-track">
        {others.map((x, i) => (
          <motion.a key={x.slug} href={`/destinations/${x.slug}`} className="dest-card"
            initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.9, ease, delay: (i % 4) * 0.08 }}>
            <div className="dest-media">
              {x.image ? <img src={x.image} alt="" loading="lazy" /> : <span className="media-fallback" aria-hidden="true">{x.code}</span>}
              <span className="flag-chip"><Globe size={12} /> {x.code}</span>
            </div>
            <div className="dest-body">
              <h3>{x.name}</h3>
              <p>{x.lede}</p>
              <span className="dest-foot">Explore {x.name} <span className="circle-arrow"><ArrowRight size={14} /></span></span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}

export default function DestinationPage({ destination: d }) {
  return (
    <>
      <DestHero d={d} />
      {d.facts.length > 0 && <Facts d={d} />}
      <Partners d={d} />
      <HowWeHelp d={d} />
      <OtherDestinations d={d} />
      <CTA />
    </>
  )
}
