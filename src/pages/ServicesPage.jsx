import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, ArrowUpRight, Check, ChevronRight, Handshake, Quote, ShieldCheck, Sparkles } from 'lucide-react'
import { serviceSections, compliance, pageIndex } from '../servicesData'
import { Reveal, SplitText, Magnetic } from '../components/fx'
import { CTA } from '../components/Sections'
import { scrollToId } from '../scroll'

const ease = [0.22, 1, 0.36, 1]
const [academic, admission, visa, flights] = serviceSections
const sectionIds = pageIndex.map((s) => s.id)

function goTo(e, id) {
  e.preventDefault()
  scrollToId(id)
  history.replaceState(null, '', `#${id}`)
}

/* Which section is currently in the middle of the screen. */
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.isIntersecting && setActive(en.target.id)),
      { rootMargin: '-40% 0px -55% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])
  return active
}

/* ---------- Hero ---------- */
function PageHero() {
  return (
    <section className="page-hero-wrap">
      <div className="page-hero violet-panel" data-dark>
        <div className="mesh" aria-hidden="true"><span className="blob b1" /><span className="blob b2" /></div>
        <div className="grain" aria-hidden="true" />
        <div className="container page-hero-inner">
          <div className="page-hero-copy">
            <motion.nav className="crumbs" aria-label="Breadcrumb" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
              <a href="/">Home</a><ChevronRight size={14} /><span aria-current="page">Our Services</span>
            </motion.nav>
            <h1 className="page-title" aria-label="Our Services">
              {['Our', 'Services'].map((w, i) => (
                <span className="line-mask" key={w}>
                  <motion.span initial={{ y: '105%' }} animate={{ y: '0%' }} transition={{ duration: 1.1, ease, delay: 0.1 + i * 0.12 }}>{w}</motion.span>
                </span>
              ))}
            </h1>
            <motion.p className="lede light" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.9, ease }}>
              We simplify your path to global education by providing seamless international education processes with expert guidance.
            </motion.p>
            <motion.div className="hero-certs" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.9, ease }}>
              <span>Certified by</span>
              {compliance.badges.map((b) => <span className="cert-pill" key={b.name}><img src={b.src} alt={b.name} /></span>)}
            </motion.div>
          </div>

          <div className="page-hero-index">
            {serviceSections.map((s, i) => (
              <motion.a key={s.id} href={`#${s.id}`} onClick={(e) => goTo(e, s.id)} className="index-card"
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 + i * 0.08, duration: 0.9, ease }}>
                <span className="index-top">
                  <span className="index-icon"><s.icon size={18} strokeWidth={1.75} /></span>
                  <span className="index-num">{s.num}</span>
                </span>
                <strong>{s.title}</strong>
                <small>{s.short}</small>
                <ArrowUpRight className="index-arrow" size={16} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Sticky "on this page" menu (side rail on desktop, chip bar on phones) ---------- */
function SideMenu({ active }) {
  const listRef = useRef(null)
  // Keep the active chip visible in the horizontal bar on small screens.
  useEffect(() => {
    const list = listRef.current
    const el = list?.querySelector(`[data-id="${active}"]`)
    if (!list || !el || list.scrollWidth <= list.clientWidth) return
    list.scrollTo({ left: el.offsetLeft - list.clientWidth / 2 + el.offsetWidth / 2, behavior: 'smooth' })
  }, [active])

  return (
    <aside className="svc-aside" aria-label="Services on this page">
      <p className="svc-aside-label">On this page</p>
      <ul ref={listRef}>
        {pageIndex.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`} data-id={s.id} onClick={(e) => goTo(e, s.id)} className={active === s.id ? 'on' : ''} aria-current={active === s.id ? 'true' : undefined}>
              {active === s.id && <motion.span layoutId="svc-active" className="svc-aside-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
              <span className="svc-aside-num">{s.num}</span>
              <span className="svc-aside-title">{s.title}</span>
            </a>
          </li>
        ))}
      </ul>
      <div className="svc-aside-cta">
        <Sparkles size={18} />
        <strong>Not sure where to start?</strong>
        <p>Book a free consultation and we will map out the right services for you.</p>
        <a href="/contact" className="link-arrow">Book a consultation <ArrowRight size={15} /></a>
      </div>
    </aside>
  )
}

/* ---------- Shared section header ---------- */
function SvcHead({ s, label = 'Service' }) {
  const Icon = s.icon
  return (
    <div className="svc-head">
      <div className="svc-head-text">
        <Reveal as="p" className="eyebrow"><span className="svc-num">{s.num}</span>{label}</Reveal>
        <SplitText as="h2" className="svc-title" text={s.title} />
        <Reveal as="p" className="svc-lede" delay={0.1}>{s.lede}</Reveal>
      </div>
      <Reveal className="svc-photo" delay={0.15}>
        <img src={s.image} alt="" loading="lazy" />
        <span className="svc-photo-icon"><Icon size={20} strokeWidth={1.75} /></span>
      </Reveal>
    </div>
  )
}

/* ---------- 01 Academic Counseling ---------- */
function Academic() {
  const s = academic
  return (
    <section id={s.id} className="svc-section">
      <SvcHead s={s} />
      <div className="svc-split">
        <Reveal className="svc-callout">
          <Quote size={28} strokeWidth={1.5} className="svc-callout-mark" />
          <p className="svc-callout-q">{s.question}</p>
          <p>{s.body}</p>
        </Reveal>
        <div>
          <Reveal as="p" className="svc-list-title">{s.listTitle}</Reveal>
          <div className="svc-icon-grid">
            {s.list.map(({ icon: Icon, text }, i) => (
              <Reveal key={text} delay={i * 0.07} className="svc-icon-card">
                <span className="svc-icon"><Icon size={20} strokeWidth={1.75} /></span>
                <span>{text}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- 02 Admission Support ---------- */
function Admission() {
  const s = admission
  return (
    <section id={s.id} className="svc-section">
      <SvcHead s={s} />
      <div className="svc-split">
        <div className="svc-stack">
          <Reveal as="p" className="svc-body">{s.body}</Reveal>
          <Reveal className="svc-highlight" delay={0.1}>
            <span className="svc-icon"><Handshake size={20} strokeWidth={1.75} /></span>
            <p>{s.highlight}</p>
          </Reveal>
        </div>
        <Reveal className="checklist">
          <div className="checklist-head">
            <span className="checklist-tag">Document checklist</span>
            <span className="checklist-count">{s.list.length} items</span>
          </div>
          <p className="checklist-title">{s.listTitle}</p>
          <motion.ol initial="hidden" whileInView="show" viewport={{ once: true, margin: '-15% 0px' }} transition={{ staggerChildren: 0.12, delayChildren: 0.2 }}>
            {s.list.map(({ icon: Icon, text }) => (
              <li key={text}>
                <motion.span className="check" variants={{ hidden: { scale: 0, opacity: 0 }, show: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 420, damping: 20 } } }}>
                  <Check size={13} strokeWidth={3} />
                </motion.span>
                <Icon size={18} strokeWidth={1.75} className="checklist-icon" />
                <span>{text}</span>
              </li>
            ))}
          </motion.ol>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- 03 Visa Application ---------- */
function Visa() {
  const s = visa
  return (
    <section id={s.id} className="svc-section">
      <SvcHead s={s} />
      <Reveal as="p" className="svc-list-title">{s.listTitle}</Reveal>
      <div className="visa-track">
        <motion.span className="visa-line" aria-hidden="true" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: '-15% 0px' }} transition={{ duration: 1.4, ease }} />
        {s.list.map(({ icon: Icon, text }, i) => (
          <Reveal key={text} delay={0.15 + i * 0.12} className="visa-step">
            <span className="visa-dot"><Icon size={20} strokeWidth={1.75} /></span>
            <span className="visa-step-num">Step {i + 1}</span>
            <p>{text}</p>
          </Reveal>
        ))}
      </div>
      <div className="svc-split">
        <Reveal as="p" className="svc-body">{s.body}</Reveal>
        <Reveal className="svc-highlight" delay={0.1}>
          <span className="svc-icon"><ShieldCheck size={20} strokeWidth={1.75} /></span>
          <p>{s.highlight}</p>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- 04 Flight offers ---------- */
function Flights() {
  const s = flights
  return (
    <section id={s.id} className="svc-section">
      <Reveal className="flight-card violet-panel" data-dark>
        <div className="mesh" aria-hidden="true"><span className="blob b1" /><span className="blob b2" /></div>
        <div className="grain" aria-hidden="true" />
        <div className="flight-copy">
          <p className="eyebrow light"><span className="svc-num light">{s.num}</span>Service</p>
          <SplitText as="h2" className="svc-title light" text={s.title} />
          <p className="flight-lede">{s.lede}</p>
          <p className="flight-pull">{s.pull}</p>
          <p className="flight-body">{s.body}</p>
        </div>
        <div className="flight-side">
          <div className="flight-photo">
            <img src={s.image} alt="" loading="lazy" />
          </div>
          <p className="flight-list-title">{s.listTitle}</p>
          <ul className="flight-list">
            {s.list.map(({ icon: Icon, text }) => (
              <li key={text}><span className="flight-icon"><Icon size={18} strokeWidth={1.75} /></span>{text}</li>
            ))}
          </ul>
          <Magnetic>
            <a href="/contact" className="btn-journey">
              <span className="arrow-disc"><ArrowRight size={16} /></span>
              Ask about flight offers
            </a>
          </Magnetic>
        </div>
      </Reveal>
    </section>
  )
}

/* ---------- 05 Industry compliance ---------- */
function Compliance() {
  const s = compliance
  return (
    <section id={s.id} className="svc-section compliance">
      <div className="compliance-grid">
        <div>
          <Reveal as="p" className="eyebrow"><span className="svc-num">{s.num}</span>Our standards</Reveal>
          <SplitText as="h2" className="svc-title" text={s.title} />
          <Reveal as="p" className="svc-lede">{s.lede}</Reveal>
          <Reveal as="p" className="svc-body strong" delay={0.05}>{s.statement}</Reveal>
          <Reveal as="blockquote" className="compliance-quote" delay={0.1}>
            <Quote size={22} strokeWidth={1.5} />
            “{s.quote}”
          </Reveal>
          <Reveal as="p" className="svc-body" delay={0.15}>{s.body}</Reveal>
        </div>
        <Reveal className="compliance-photo" delay={0.1}>
          <img src={s.image} alt="A Gryn Index consultant" loading="lazy" />
          <span className="compliance-chip"><ShieldCheck size={16} /> Fully compliant, professionally regulated</span>
        </Reveal>
      </div>
      <div className="badge-row">
        {s.badges.map((b, i) => (
          <Reveal key={b.name} delay={i * 0.08} className="badge-card">
            <img src={b.src} alt="" loading="lazy" />
            <span>{b.name}</span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default function ServicesPage() {
  const active = useActiveSection(sectionIds)
  return (
    <>
      <PageHero />
      <div className="container svc-layout">
        <SideMenu active={active} />
        <div className="svc-content">
          <Academic />
          <Admission />
          <Visa />
          <Flights />
          <Compliance />
        </div>
      </div>
      <CTA />
    </>
  )
}
