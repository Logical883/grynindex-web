import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X, CalendarDays } from 'lucide-react'
import { nav, destinations, event, img, sec } from '../data'
import { Magnetic } from './fx'

const regions = [
  { label: 'UK & Europe', codes: ['UK', 'IE', 'EU'] },
  { label: 'North America', codes: ['CA', 'US'] },
  { label: 'Oceania', codes: ['AU', 'NZ'] },
]
const byCode = Object.fromEntries(destinations.map((d) => [d.code, d]))

function ServicesPanel({ close }) {
  return (
    <div className="mega-grid">
      <div className="mega-left">
        <a href="/services" className="mega-heading mega-heading-link" onClick={close}>Our Services <ArrowRight size={14} /></a>
        <div className="mega-tiles">
          {nav.services.map(({ title, icon: Icon, short, href }) => (
            <a key={title} href={href} className="mega-tile" onClick={close}>
              <span className="tile-icon"><Icon size={18} strokeWidth={1.75} /></span>
              <span>
                <strong>{title}</strong>
                <small>{short}</small>
              </span>
            </a>
          ))}
        </div>
      </div>
      <div className="mega-right">
        <p className="mega-heading">Explore</p>
        <div className="mega-links">
          {nav.explore.map(({ title, icon: Icon, href, text }) => (
            <a key={title} href={href} className="mega-link" onClick={close}>
              <Icon size={16} strokeWidth={1.75} />
              <span><strong>{title}</strong><small>{text}</small></span>
            </a>
          ))}
        </div>
        <a href={sec('events')} className="mega-feature" onClick={close}>
          <img src={event.flyer} alt="" />
          <span>
            <em className="pill-soft"><CalendarDays size={12} /> Free event</em>
            <strong>{event.title}</strong>
            <small>{event.date}, {event.venue}</small>
          </span>
          <ArrowUpRight className="mega-feature-arrow" size={18} />
        </a>
      </div>
    </div>
  )
}

function DestinationsPanel({ close }) {
  return (
    <div className="mega-grid">
      <div className="mega-left">
        <p className="mega-heading">Study Destinations</p>
        <div className="mega-regions">
          {regions.map((r) => (
            <div key={r.label}>
              <p className="mega-sub">{r.label}</p>
              {r.codes.map((c) => (
                <a key={c} href={byCode[c].href} className="mega-dest" onClick={close}>
                  <span className="code-chip">{c}</span>
                  {byCode[c].name.replace('The ', '')}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mega-right">
        <a href={sec('destinations')} className="mega-feature tall" onClick={close}>
          <img src={img('Canada.jpg')} alt="" />
          <span>
            <em className="pill-soft">7 destinations</em>
            <strong>Not sure where to study?</strong>
            <small>Our counselors match your goals, budget and profile to the right country and university.</small>
          </span>
          <ArrowUpRight className="mega-feature-arrow" size={18} />
        </a>
      </div>
    </div>
  )
}

const menus = { services: ServicesPanel, destinations: DestinationsPanel }

export default function Nav() {
  const [open, setOpen] = useState(null)
  const [mobile, setMobile] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const timer = useRef()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(v > 40)
    setHidden(v > prev && v > 400 && !open && !mobile)
  })

  useEffect(() => {
    document.documentElement.style.overflow = mobile ? 'hidden' : ''
  }, [mobile])

  const enter = (k) => { clearTimeout(timer.current); setOpen(k) }
  const leave = () => { timer.current = setTimeout(() => setOpen(null), 160) }
  const close = () => { setOpen(null); setMobile(false) }
  const Panel = open && menus[open]

  return (
    <motion.header
      className={`nav-wrap ${scrolled ? 'scrolled' : ''}`}
      animate={{ y: hidden ? -120 : 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      onMouseLeave={leave}
    >
      <nav className="nav" aria-label="Main">
        <a href={sec('top')} className="brand" aria-label="GrynIndex home" onClick={close}>
          <img src={img('grynindex-logo-trim.png')} alt="Gryn Index Initiative" />
        </a>

        <ul className="nav-links">
          <li><a href={sec('top')}>Home</a></li>
          {[['services', 'Services'], ['destinations', 'Study Locations']].map(([k, label]) => (
            <li key={k} onMouseEnter={() => enter(k)}>
              <button className={open === k ? 'active' : ''} aria-expanded={open === k} onClick={() => setOpen(open === k ? null : k)}>
                {label} <ChevronDown size={14} className="chev" />
              </button>
            </li>
          ))}
          <li onMouseEnter={() => enter(null)}><a href={sec('events')}>Events</a></li>
          <li onMouseEnter={() => enter(null)}><a href={'/accommodation'}>Accommodation</a></li>
          <li onMouseEnter={() => enter(null)}><a href={'/about'}>About Us</a></li>
        </ul>

        <div className="nav-cta">
          <a href={'/contact'} className="nav-plain">Contact</a>
          <Magnetic strength={0.25}>
            <a href={'/contact'} className="btn btn-dark btn-sm">Get Started</a>
          </Magnetic>
          <button className="burger" aria-label={mobile ? 'Close menu' : 'Open menu'} onClick={() => setMobile(!mobile)}>
            {mobile ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {Panel && (
          <motion.div
            key="mega"
            className="mega"
            onMouseEnter={() => clearTimeout(timer.current)}
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatePresence mode="wait">
              <motion.div key={open} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }}>
                <Panel close={close} />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobile && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0 round 24px)' }}
            animate={{ clipPath: 'inset(0 0 0% 0 round 24px)' }}
            exit={{ clipPath: 'inset(0 0 100% 0 round 24px)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            data-lenis-prevent
          >
            {[
              ['Home', sec('top')], ['Our Services', '/services'], ['How We Work', sec('process')],
              ['Study Locations', sec('destinations')], ['Events', sec('events')],
              ['Accommodation', '/accommodation'], ['About Us', '/about'], ['Contact', '/contact'],
            ].map(([label, href], i) => (
              <motion.a
                key={label}
                href={href}
                onClick={close}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05, duration: 0.5 }}
              >
                {label} <ArrowRight size={20} />
              </motion.a>
            ))}
            <a href={'/contact'} className="btn btn-green" onClick={close}>Start your journey</a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
