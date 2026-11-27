import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, ChevronDown, X } from 'lucide-react'
import { services, destinations, sec, path, ACCOMMODATION_URL } from '../data'

const ease = [0.65, 0, 0.35, 1]

const GROUPS = [
  { label: 'Home', href: sec('top'), match: '/' },
  { label: 'About us', href: '/about', match: '/about' },
  { label: 'Events', href: sec('events') },
  {
    label: 'Services', href: '/services', match: '/services',
    sub: { title: 'What we offer', all: 'All services', links: services.map((s) => ({ label: s.title, href: s.href })) },
  },
  {
    label: 'Study locations', href: sec('destinations'), match: '/destinations',
    sub: { title: 'Destinations', all: 'All destinations', links: destinations.map((d) => ({ label: d.name.replace(/^The /, ''), href: d.href })) },
  },
  { label: 'Accommodation', href: '/accommodation', match: '/accommodation' },
  { label: 'Contact', href: '/contact', match: '/contact' },
]

const isCurrent = (g) => g.match && (g.match === '/' ? path === '/' : path.startsWith(g.match))

/* Side drawer: a dark, slightly see-through panel slides in from the right,
   leaving a strip of the page visible. Main sections are small-caps headings,
   with their sub-pages listed underneath. */
export default function MobileMenu({ open, onClose }) {
  const [expanded, setExpanded] = useState(null)
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence onExitComplete={() => setExpanded(null)}>
      {open && (
        <div key="m-menu" className="m-menu" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Site menu">
          <motion.button
            type="button"
            className="m-scrim"
            aria-label="Close menu"
            tabIndex={-1}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
          <motion.nav
            className="m-drawer"
            aria-label="Mobile"
            data-lenis-prevent
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.6, ease }}
          >
            <button type="button" className="m-close" aria-label="Close menu" onClick={onClose}><X size={30} strokeWidth={1.75} /></button>
            <ul className="m-groups">
              {GROUPS.map((g) => (
                <li key={g.label} className={g.sub ? 'has-sub' : ''}>
                  {g.sub ? (
                    <>
                      <button
                        type="button"
                        className={`m-head m-toggle ${isCurrent(g) ? 'is-current' : ''}`}
                        aria-expanded={expanded === g.label}
                        aria-controls={`m-sub-${g.match.slice(1)}`}
                        onClick={() => setExpanded((v) => (v === g.label ? null : g.label))}
                      >
                        {g.label}
                        <ChevronDown size={18} className="m-chev" />
                      </button>
                      <AnimatePresence initial={false}>
                        {expanded === g.label && (
                          <motion.div
                            id={`m-sub-${g.match.slice(1)}`}
                            className="m-collapse"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease }}
                          >
                            <div className="m-subgroup">
                              <p className="m-subtitle">{g.sub.title}</p>
                              <ul>
                                <li><a href={g.href} onClick={onClose}>{g.sub.all}</a></li>
                                {g.sub.links.map((l) => (
                                  <li key={l.href}><a href={l.href} onClick={onClose}>{l.label}</a></li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <a className="m-head" href={g.href} onClick={onClose} aria-current={isCurrent(g) ? 'page' : undefined}>{g.label}</a>
                  )}
                </li>
              ))}
            </ul>
            <a href={ACCOMMODATION_URL} target="_blank" rel="noopener noreferrer" className="m-cta" onClick={onClose}>
              Get Accommodation <ArrowUpRight size={16} />
            </a>
          </motion.nav>
        </div>
      )}
    </AnimatePresence>
  )
}
