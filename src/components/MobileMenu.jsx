import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Plus, MapPin } from 'lucide-react'
import { destinations, socials, sec, path, ACCOMMODATION_URL } from '../data'
import { office } from '../legal'
import { SocialIcon } from './Footer'

const ease = [0.76, 0, 0.24, 1]
const soft = [0.22, 1, 0.36, 1]

const LINKS = [
  { label: 'Home', href: sec('top'), sub: 'Start here', match: '/' },
  { label: 'About Us', href: '/about', sub: 'Our story and team', match: '/about' },
  { label: 'Events', href: sec('events'), sub: 'Past events and highlights' },
  { label: 'Services', href: '/services', sub: 'Counselling, admissions and visas', match: '/services' },
  { label: 'Study Locations', sub: `${destinations.length} destinations`, match: '/destinations', children: true },
  { label: 'Accommodation', href: '/accommodation', sub: 'Student residences abroad', match: '/accommodation' },
  { label: 'Contact', href: '/contact', sub: 'Book a consultation', match: '/contact' },
]

const isCurrent = (l) => l.match && (l.match === '/' ? path === '/' : path.startsWith(l.match))

/* Full-screen menu that spreads out as a circle from the burger button.
   `origin` is the burger's centre in viewport pixels. */
export default function MobileMenu({ open, origin, onClose }) {
  const [locations, setLocations] = useState(false)
  const { x, y } = origin
  const closed = `circle(0px at ${x}px ${y}px)`
  const full = `circle(150vmax at ${x}px ${y}px)`

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence onExitComplete={() => setLocations(false)}>
      {open && (
        <motion.div
          id="mobile-menu"
          className="m-menu violet-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          data-dark
          data-lenis-prevent
          initial={{ clipPath: closed }}
          animate={{ clipPath: full, transition: { duration: 0.9, ease } }}
          exit={{ clipPath: closed, transition: { duration: 0.7, ease, delay: 0.15 } }}
        >
          <div className="mesh" aria-hidden="true"><span className="blob b1" /><span className="blob b2" /></div>
          <div className="grain" aria-hidden="true" />
          <span className="m-menu-watermark" aria-hidden="true">GRYN</span>
          <div className="m-menu-fade" aria-hidden="true" />

          <nav className="m-menu-inner" aria-label="Mobile">
            <ol className="m-links">
              {LINKS.map((l, i) => {
                const delay = 0.32 + i * 0.06
                const body = (
                  <>
                    <span className="m-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="m-text">
                      <span className="m-mask">
                        <motion.span className="m-label" initial={{ y: '110%' }} animate={{ y: '0%', transition: { delay, duration: 0.7, ease: soft } }} exit={{ y: '110%', transition: { duration: 0.3, delay: (LINKS.length - i) * 0.02 } }}>
                          {l.label}
                        </motion.span>
                      </span>
                      <motion.span className="m-sub" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: delay + 0.25 } }} exit={{ opacity: 0, transition: { duration: 0.15 } }}>
                        {l.sub}
                      </motion.span>
                    </span>
                  </>
                )
                return (
                  <li key={l.label} className={isCurrent(l) ? 'current' : ''}>
                    {l.children ? (
                      <>
                        <button type="button" className="m-link" aria-expanded={locations} aria-controls="m-locations" onClick={() => setLocations((v) => !v)}>
                          {body}
                          <motion.span className="m-toggle" animate={{ rotate: locations ? 45 : 0 }} transition={{ duration: 0.35, ease: soft }}><Plus size={20} /></motion.span>
                        </button>
                        <AnimatePresence initial={false}>
                          {locations && (
                            <motion.div id="m-locations" className="m-sub-list" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: soft }}>
                              <div className="m-chips">
                                {destinations.map((d, k) => (
                                  <motion.a key={d.code} href={d.href} onClick={onClose} className="m-chip"
                                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.05 + k * 0.03 } }}>
                                    <span className="code-chip">{d.code}</span>{d.name.replace(/^The /, '')}
                                  </motion.a>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <a className="m-link" href={l.href} onClick={onClose} aria-current={isCurrent(l) ? 'page' : undefined}>
                        {body}
                        <ArrowUpRight className="m-arrow" size={20} />
                      </a>
                    )}
                  </li>
                )
              })}
            </ol>

            <motion.div className="m-foot" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.6, ease: soft } }} exit={{ opacity: 0, transition: { duration: 0.15 } }}>
              <a href={ACCOMMODATION_URL} target="_blank" rel="noopener noreferrer" className="m-cta" onClick={onClose}>
                Get Accommodation <ArrowUpRight size={16} />
              </a>
              <p className="m-address"><MapPin size={14} /> {office.address}</p>
              <ul className="m-socials">
                {socials.map((s) => (
                  <li key={s.name}><a href={s.href} target="_blank" rel="noreferrer" aria-label={s.name}><SocialIcon name={s.name} /></a></li>
                ))}
              </ul>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
