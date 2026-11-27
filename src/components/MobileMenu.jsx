import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { sec, path, ACCOMMODATION_URL } from '../data'

const ease = [0.22, 1, 0.36, 1]

const LINKS = [
  { label: 'Home', href: sec('top'), match: '/' },
  { label: 'About Us', href: '/about', match: '/about' },
  { label: 'Events', href: sec('events') },
  { label: 'Services', href: '/services', match: '/services' },
  { label: 'Study Locations', href: sec('destinations'), match: '/destinations' },
  { label: 'Accommodation', href: '/accommodation', match: '/accommodation' },
  { label: 'Contact', href: '/contact', match: '/contact' },
]

const isCurrent = (l) => l.match && (l.match === '/' ? path === '/' : path.startsWith(l.match))

/* A quiet full-screen sheet: the background fades in, then the links
   slide in from the left one after another. */
export default function MobileMenu({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          className="m-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25, delay: 0.1 } }}
          transition={{ duration: 0.3 }}
        >
          <nav className="m-menu-inner" aria-label="Mobile">
            <ul className="m-links">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.label}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.08 + i * 0.045, duration: 0.5, ease } }}
                  exit={{ opacity: 0, x: -12, transition: { duration: 0.2 } }}
                >
                  <a href={l.href} onClick={onClose} aria-current={isCurrent(l) ? 'page' : undefined}>{l.label}</a>
                </motion.li>
              ))}
            </ul>
            <motion.a
              href={ACCOMMODATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-dark m-cta"
              onClick={onClose}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.45, duration: 0.5, ease } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              Get Accommodation <ArrowUpRight size={16} />
            </motion.a>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
