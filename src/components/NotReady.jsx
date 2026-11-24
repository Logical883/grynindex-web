import { motion } from 'motion/react'
import { ArrowLeft, Hammer } from 'lucide-react'
import { Magnetic } from './fx'

const ease = [0.22, 1, 0.36, 1]

const titles = {
  services: 'Our Services',
  about: 'About Us',
  accommodation: 'Accommodation',
  contact: 'Contact',
  blog: 'Blog',
  destinations: 'Study Destinations',
}

function pageName(path) {
  const parts = path.split('/').filter(Boolean)
  if (parts[0] === 'destinations' && parts[1]) {
    return parts[1].split('-').map((w) => (w.length <= 3 ? w.toUpperCase() : w[0].toUpperCase() + w.slice(1))).join(' ')
  }
  return titles[parts[0]] || 'This page'
}

/* Placeholder for every route other than the home page. */
export default function NotReady({ path }) {
  const name = pageName(path)
  return (
    <section className="not-ready-wrap">
      <div className="not-ready violet-panel" data-dark>
        <div className="mesh" aria-hidden="true"><span className="blob b1" /><span className="blob b2" /></div>
        <div className="grain" aria-hidden="true" />
        <motion.span className="not-ready-icon" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease }}>
          <Hammer size={22} strokeWidth={1.75} />
        </motion.span>
        <motion.p className="eyebrow light" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8, ease }}>
          {name}
        </motion.p>
        <h1 className="not-ready-title">
          {['Not yet', 'developed'].map((line, i) => (
            <span className="line-mask" key={line}>
              <motion.span initial={{ y: '105%' }} animate={{ y: '0%' }} transition={{ duration: 1, ease, delay: 0.2 + i * 0.12 }}>{line}</motion.span>
            </span>
          ))}
        </h1>
        <motion.p className="lede light" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8, ease }}>
          We are still building this page. In the meantime, everything you need is on the home page.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.8, ease }}>
          <Magnetic>
            <a href="/" className="btn-journey">
              <span className="arrow-disc"><ArrowLeft size={16} /></span>
              Back to home
            </a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  )
}
