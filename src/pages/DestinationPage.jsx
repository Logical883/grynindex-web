import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, ArrowUpRight, ChevronDown, ChevronRight, Globe, Search, X } from 'lucide-react'
import { destinationPages, pathwayPartnersImage } from '../destinationsData'
import { serviceSections } from '../servicesData'
import { Reveal, SplitText, Magnetic } from '../components/fx'
import { CTA } from '../components/Sections'
import { scrollToId } from '../scroll'

const ease = [0.22, 1, 0.36, 1]
const PREVIEW = 18 // schools shown before "Show all"

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
                <img src={d.image} alt="" />
                <span className="flag-chip"><Globe size={12} /> {d.code}</span>
              </div>
              <p className="glance-label">At a glance</p>
              <div className="glance-grid">
                {d.glance.map(([value, label]) => (
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

/* ---------- Partner schools: search, A–Z groups, expandable ---------- */
function groupByLetter(names) {
  const groups = {}
  names.forEach((n) => {
    const letter = n.replace(/^(the|\W)+\s*/i, '')[0]?.toUpperCase() || '#'
    ;(groups[/[A-Z]/.test(letter) ? letter : '#'] ||= []).push(n)
  })
  return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b))
}

function Partners({ d }) {
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState(false)
  const all = useMemo(() => d.groups ? d.groups.flatMap((g) => g.schools) : d.schools, [d])
  const q = query.trim().toLowerCase()
  const matches = q ? all.filter((n) => n.toLowerCase().includes(q)) : all
  const showAll = expanded || q || all.length <= PREVIEW
  const visible = showAll ? matches : matches.slice(0, PREVIEW)
  const sections = d.groups
    ? d.groups.map((g) => [g.country, g.schools.filter((n) => visible.includes(n))]).filter(([, s]) => s.length)
    : groupByLetter(visible)

  return (
    <section id="partners" className="section partners">
      <div className="container">
        <div className="section-head row partners-head">
          <div>
            <p className="eyebrow">Admission Pathway Partners</p>
            <SplitText className="display" text={`Partner schools in ${d.name}`} />
            <Reveal as="p" className="lede" delay={0.1}>
              {all.length} institutions{d.groups ? ` across ${d.groups.length} countries` : ''} we work with on admissions.
            </Reveal>
          </div>
          {all.length > 10 && (
            <label className="school-search">
              <Search size={18} />
              <span className="sr">Search partner schools</span>
              <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search schools" />
              {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search"><X size={16} /></button>}
            </label>
          )}
        </div>

        <div className={`school-board ${showAll ? '' : 'collapsed'}`}>
          {sections.length === 0 && <p className="school-empty">No partner schools match “{query}”.</p>}
          <div className={d.groups ? 'school-groups countries' : 'school-groups'}>
            {sections.map(([label, names]) => (
              <div className="school-group" key={label}>
                <p className="school-letter">{label}</p>
                <ul>
                  {names.map((n) => <li key={n}>{n}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {!q && all.length > PREVIEW && (
          <div className="school-more">
            <button type="button" className="btn btn-dark" onClick={() => setExpanded((v) => !v)} aria-expanded={expanded}>
              {expanded ? 'Show fewer' : `Show all ${all.length} schools`}
              <ChevronDown size={16} className={expanded ? 'flip' : ''} />
            </button>
          </div>
        )}

        <Reveal className="pathway-card">
          <div>
            <p className="eyebrow">Pathway partners</p>
            <h3>Admission pathways through our global partners</h3>
          </div>
          <img src={pathwayPartnersImage} alt="Logos of admission pathway partners including ApplyBoard, Cambridge Education Group, INTO, Navitas and Oxford International" loading="lazy" />
        </Reveal>
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
              <img src={x.image} alt="" loading="lazy" />
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
      <Facts d={d} />
      <Partners d={d} />
      <HowWeHelp d={d} />
      <OtherDestinations d={d} />
      <CTA />
    </>
  )
}
