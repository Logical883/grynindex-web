import { Fragment, useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, animate, useReducedMotion } from 'motion/react'

const ease = [0.22, 1, 0.36, 1]

// Pointer-follow effects (magnetic, tilt) only make sense with a real mouse;
// on touch screens a tap would make the element jump.
const canHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches

/* Fade/slide in once when scrolled into view. */
export function Reveal({ children, delay = 0, y = 40, className, as = 'div', ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, ease, delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/* Headline that rises word by word from a mask. */
export function SplitText({ text, className, delay = 0, as = 'h2', stagger = 0.06 }) {
  const Tag = motion[as]
  const words = text.split(' ')
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="word-mask" aria-hidden="true">
            <motion.span
              className="word"
              variants={{ hidden: { y: '110%' }, show: { y: '0%', transition: { duration: 0.9, ease } } }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 && ' '}
        </Fragment>
      ))}
    </Tag>
  )
}

/* Count up when visible. */
export function Counter({ value, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, value, { duration: 2, ease, onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, value])
  return (
    <span ref={ref}>
      {n.toLocaleString()}
      {suffix}
    </span>
  )
}

/* Element drifts toward the pointer while hovered. */
export function Magnetic({ children, strength = 0.35, className }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 })
  const reduce = useReducedMotion() || !canHover
  const move = (e) => {
    if (reduce) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const leave = () => { x.set(0); y.set(0) }
  return (
    <motion.div ref={ref} className={className} style={{ x: sx, y: sy, display: 'inline-flex' }} onMouseMove={move} onMouseLeave={leave}>
      {children}
    </motion.div>
  )
}

/* Card that tilts in 3D toward the pointer. */
export function Tilt({ children, className, max = 8, ...rest }) {
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 150, damping: 18 })
  const sry = useSpring(ry, { stiffness: 150, damping: 18 })
  const reduce = useReducedMotion() || !canHover
  const move = (e) => {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ry.set(px * max * 2)
    rx.set(-py * max * 2)
    e.currentTarget.style.setProperty('--mx', `${(px + 0.5) * 100}%`)
    e.currentTarget.style.setProperty('--my', `${(py + 0.5) * 100}%`)
  }
  const leave = () => { rx.set(0); ry.set(0) }
  return (
    <motion.div className={className} style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }} onMouseMove={move} onMouseLeave={leave} {...rest}>
      {children}
    </motion.div>
  )
}

/* Custom cursor: a dot plus a trailing ring that grows over links and buttons.
   Solid colors only: ink on light sections, cream on dark ([data-dark]) ones. */
export function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 })
  const ry = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 })
  const [state, setState] = useState({ hover: false, down: false, hidden: true, dark: false })
  const [enabled] = useState(
    () => window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('has-cursor')
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const hover = !!e.target.closest?.('a, button, input, select, textarea')
      const dark = !!e.target.closest?.('[data-dark]')
      setState((s) => (s.hover === hover && s.dark === dark && !s.hidden ? s : { ...s, hidden: false, hover, dark }))
    }
    const down = () => setState((s) => ({ ...s, down: true }))
    const up = () => setState((s) => ({ ...s, down: false }))
    const leave = () => setState((s) => ({ ...s, hidden: true }))
    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    document.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      document.removeEventListener('mouseleave', leave)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [enabled, x, y])

  if (!enabled) return null
  const tone = state.dark ? 'on-dark' : ''
  return (
    <>
      <motion.div
        className={`cursor-ring ${tone} ${state.hover ? 'is-hover' : ''}`}
        style={{ x: rx, y: ry }}
        animate={{ width: state.hover ? 56 : 34, height: state.hover ? 56 : 34, opacity: state.hidden ? 0 : 1, scale: state.down ? 0.85 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />
      <motion.div className={`cursor-dot ${tone}`} style={{ x, y }} animate={{ opacity: state.hidden ? 0 : 1 }} />
    </>
  )
}

/* Thin violet bar showing page scroll progress. */
export function ScrollProgress({ progress }) {
  return <motion.div className="scroll-progress" style={{ scaleX: progress }} />
}
