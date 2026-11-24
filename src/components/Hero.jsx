import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, GraduationCap, Search, BadgeCheck } from 'lucide-react'
import { services, destinations, img, SITE } from '../data'
import { Magnetic } from './fx'

const ease = [0.22, 1, 0.36, 1]
const BIG = 'Study Abroad'

function useMouseParallax() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 20 })
  const sy = useSpring(my, { stiffness: 60, damping: 20 })
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  return { sx, sy, onMove }
}

function Float({ sx, sy, depth, className, children, delay = 0 }) {
  const x = useTransform(sx, (v) => v * depth)
  const y = useTransform(sy, (v) => v * depth)
  return (
    <motion.div className={className} style={{ x, y }}
      initial={{ opacity: 0, scale: 0.9, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.1, ease, delay }}>
      {children}
    </motion.div>
  )
}

function SlideCard({ i, setI }) {
  const s = services[i]
  return (
    <div className="hero-slide-card">
      <div className="hero-slide-media">
        <AnimatePresence mode="popLayout">
          <motion.img key={s.image} src={s.image} alt=""
            initial={{ opacity: 0, scale: 1.15 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease }} />
        </AnimatePresence>
      </div>
      <div className="hero-slide-meta">
        <AnimatePresence mode="wait">
          <motion.span key={s.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            {s.title}
          </motion.span>
        </AnimatePresence>
        <div className="hero-slide-thumbs">
          {services.map((x, k) => (
            <button key={x.title} className={k === i ? 'on' : ''} onClick={() => setI(k)} aria-label={`Show ${x.title}`}>
              <img src={x.image} alt="" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const { sx, sy, onMove } = useMouseParallax()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bigY = useTransform(scrollYProgress, [0, 1], ['0%', '45%'])
  const panelScale = useTransform(scrollYProgress, [0, 1], [1, 0.92])
  const panelRadius = useTransform(scrollYProgress, [0, 1], [28, 56])
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const [dot, setDot] = useState(0)
  const n = services.length
  useEffect(() => {
    const t = setInterval(() => setDot((v) => (v + 1) % n), 4500)
    return () => clearInterval(t)
  }, [dot, n])

  return (
    <section id="top" className="hero" ref={ref}>
      <motion.div className="hero-panel" data-dark style={{ scale: panelScale, borderRadius: panelRadius }} onMouseMove={onMove}>
        <div className="mesh" aria-hidden="true">
          <span className="blob b1" /><span className="blob b2" /><span className="blob b3" /><span className="blob b4" />
        </div>
        <div className="grain" aria-hidden="true" />
        <div className="hero-grid-lines" aria-hidden="true" />

        <motion.div className="hero-big" style={{ y: bigY }} aria-hidden="true">
          {BIG.split('').map((ch, i) => (
            ch === ' ' ? <span key={i} className="sp">{'\u00A0'}</span> :
            <motion.span key={i} initial={{ y: '100%', opacity: 0 }} animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 1.2, ease, delay: 0.15 + i * 0.045 }}>
              {ch}
            </motion.span>
          ))}
        </motion.div>

        <div className="hero-collage">
          <Float sx={sx} sy={sy} depth={-30} className="collage-main" delay={0.5}>
            <img src={img('banner1.png')} alt="GrynIndex counselors with students and an accepted application" />
          </Float>
          <Float sx={sx} sy={sy} depth={50} className="glass-chip chip-a" delay={0.9}>
            <span className="chip-ico green"><GraduationCap size={16} /></span>
            <span><strong>2,000+</strong><small>Offers to top universities</small></span>
          </Float>
          <Float sx={sx} sy={sy} depth={70} className="glass-chip chip-b" delay={1.05}>
            <span className="chip-ico coral"><BadgeCheck size={16} /></span>
            <span><strong>British Council</strong><small>Certified agency</small></span>
          </Float>
          <Float sx={sx} sy={sy} depth={40} className="glass-chip chip-c" delay={1.2}>
            <span className="chip-ico purple"><MapPin size={16} /></span>
            <span><strong>11 destinations</strong><small>10 offices</small></span>
          </Float>
        </div>

        <motion.div className="hero-copy" style={{ opacity: fade }}>
          <motion.p className="hero-aside" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.9, ease }}>
            Unlock seamless study abroad process with expert guidance.
            <span className="hero-tags">
              {['Counseling', 'Admission', 'Visa', 'Flights'].map((t) => <em key={t}>{t}</em>)}
            </span>
          </motion.p>

          <h1 className="hero-title">
            {['A Fully Integrated', 'Education Consulting', 'Agency'].map((line, i) => (
              <span className="line-mask" key={line}>
                <motion.span initial={{ y: '105%' }} animate={{ y: '0%' }} transition={{ duration: 1, ease, delay: 0.6 + i * 0.12 }}>
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div className="hero-actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8, ease }}>
            <Magnetic>
              <a href="#services" className="btn-journey">
                <span className="arrow-disc"><ArrowRight size={16} /></span>
                Learn More
              </a>
            </Magnetic>
            <a href={`${SITE}/contact/`} className="link-underline light">Book a consultation</a>
          </motion.div>
        </motion.div>

        <div className="hero-bottom">
          <div className="hero-dots">
            <button aria-label="Previous" onClick={() => setDot((d) => (d + n - 1) % n)}><ChevronLeft size={16} /></button>
            {services.map((x, d) => <span key={x.title} className={d === dot ? 'on' : ''} />)}
            <button aria-label="Next" onClick={() => setDot((d) => (d + 1) % n)}><ChevronRight size={16} /></button>
          </div>
          <a href="#finder" className="scroll-hint" aria-label="Scroll down">
            <span className="mouse"><span /></span>
            Scroll
          </a>
          <SlideCard i={dot} setI={setDot} />
        </div>
      </motion.div>

      <Finder />
    </section>
  )
}

function Finder() {
  return (
    <motion.form id="finder" className="finder" onSubmit={(e) => { e.preventDefault(); window.location.href = `${SITE}/contact/` }}
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}>
      <label>
        <MapPin size={16} />
        <span className="sr">Destination</span>
        <select defaultValue="">
          <option value="" disabled>Where do you want to study?</option>
          {destinations.map((d) => <option key={d.code}>{d.name}</option>)}
        </select>
      </label>
      <label>
        <GraduationCap size={16} />
        <span className="sr">Service</span>
        <select defaultValue="">
          <option value="" disabled>What do you need help with?</option>
          {services.map((s) => <option key={s.title}>{s.title}</option>)}
        </select>
      </label>
      <label>
        <span className="finder-text">Free counseling, in person or virtual</span>
      </label>
      <Magnetic>
        <button type="submit" className="finder-go" aria-label="Start your journey"><Search size={18} /></button>
      </Magnetic>
    </motion.form>
  )
}
