import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react'
import {
  ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Calendar, Clock, MapPin,
  Quote, ShieldCheck, Headphones, Building, Globe, Ticket,
} from 'lucide-react'
import { services, steps, destinations, stats, event, testimonial, img, SITE } from '../data'
import { Reveal, SplitText, Counter, Magnetic, Tilt } from './fx'

const ease = [0.22, 1, 0.36, 1]

function Eyebrow({ children, light }) {
  return <p className={`eyebrow ${light ? 'light' : ''}`}><span className="eyebrow-dot" />{children}</p>
}

/* ---------- Stats + accreditation ---------- */
export function Stats() {
  return (
    <section className="stats container">
      <div className="stats-grid">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="stat">
            <strong><Counter value={s.value} suffix={s.suffix} /></strong>
            <span>{s.label}</span>
          </Reveal>
        ))}
      </div>
      <Reveal className="accredit">
        <p>Certified &amp; accredited</p>
        <img src={img('Certifications.jpg')} alt="ICEF accredited agency, British Council certified, ABCC" />
      </Reveal>
    </section>
  )
}

/* ---------- Services ---------- */
export function Services() {
  return (
    <section id="services" className="section container">
      <div className="section-head">
        <div>
          <Eyebrow>Our Services</Eyebrow>
          <SplitText className="display" text="Everything you need, from first question to boarding pass" />
        </div>
        <Reveal as="p" className="lede" delay={0.2}>
          GrynIndex is a fully integrated education consulting agency. One team guides your entire study abroad process.
        </Reveal>
      </div>

      <div className="service-grid">
        {services.map(({ title, text, icon: Icon, image, href }, i) => (
          <Reveal key={title} delay={i * 0.1}>
            <Tilt className="service-card" max={6}>
              <a href={href} data-cursor="Explore">
                <div className="service-media">
                  <img src={image} alt="" loading="lazy" />
                  <span className="service-num">0{i + 1}</span>
                </div>
                <div className="service-body">
                  <span className="service-icon"><Icon size={20} strokeWidth={1.75} /></span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <span className="service-link">Learn more <ArrowUpRight size={16} /></span>
                </div>
                <span className="card-glow" aria-hidden="true" />
              </a>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ---------- How We Work: sticky scroll stepper ---------- */
export function Process() {
  const ref = useRef(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 60%', 'end 70%'] })
  const line = useTransform(scrollYProgress, [0, 1], [0, 1])
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length))))
  })

  return (
    <section id="process" className="process" data-dark ref={ref}>
      <div className="grain" aria-hidden="true" />
      <div className="container process-inner">
        <div className="process-sticky">
          <Eyebrow light>How We Work</Eyebrow>
          <SplitText className="display light" text="Five steps. One seamless journey." />
          <p className="lede light">Expert guidance at every stage, so nothing falls through the cracks.</p>
          <div className="process-art">
            {steps.map((s, i) => (
              <motion.img key={s.title} src={s.art} alt=""
                animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 0.9, rotate: i === active ? 0 : -6 }}
                transition={{ duration: 0.6, ease }} />
            ))}
          </div>
        </div>

        <ol className="process-steps">
          <div className="process-track" aria-hidden="true"><motion.span style={{ scaleY: line }} /></div>
          {steps.map(({ title, text, icon: Icon }, i) => (
            <motion.li key={title} className={`step ${i <= active ? 'done' : ''} ${i === active ? 'current' : ''}`}
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-15% 0px' }}
              transition={{ duration: 0.8, ease }}>
              <span className="step-marker"><Icon size={18} strokeWidth={1.75} /></span>
              <div>
                <span className="step-num">Step 0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ---------- Study destinations carousel ---------- */
export function Destinations() {
  const track = useRef(null)
  const scroll = (dir) => {
    const el = track.current
    const card = el.querySelector('.dest-card')
    el.scrollBy({ left: dir * (card.offsetWidth + 24), behavior: 'smooth' })
  }
  return (
    <section id="destinations" className="section">
      <div className="container section-head row">
        <div>
          <Eyebrow>Study Destinations</Eyebrow>
          <SplitText className="display" text="Recommended destinations" />
        </div>
        <div className="carousel-ctrl">
          <Magnetic><button onClick={() => scroll(-1)} aria-label="Previous destinations"><ChevronLeft size={20} /></button></Magnetic>
          <Magnetic><button onClick={() => scroll(1)} aria-label="Next destinations"><ChevronRight size={20} /></button></Magnetic>
        </div>
      </div>

      <div className="dest-track" ref={track}>
        {destinations.map((d, i) => (
          <motion.a key={d.code} href={d.href} className="dest-card" data-cursor="View"
            initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.9, ease, delay: (i % 4) * 0.08 }}>
            <div className="dest-media">
              <img src={d.image} alt="" loading="lazy" />
              <span className="flag-chip"><Globe size={12} /> {d.code}</span>
            </div>
            <div className="dest-body">
              <h3>{d.name}</h3>
              <p>{d.text}</p>
              <span className="dest-foot">Learn more <span className="circle-arrow"><ArrowRight size={14} /></span></span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}

/* ---------- Why choose us ---------- */
export function Why() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const points = [
    { icon: Headphones, title: 'In-person & virtual support', text: '100% support across every step, whichever way suits you.' },
    { icon: Building, title: '10 offices', text: 'Real people you can meet, not anonymous online “experts”.' },
    { icon: ShieldCheck, title: 'Certified & accredited', text: 'British Council certified, with recognized industry accreditation.' },
    { icon: Globe, title: '11 destinations', text: 'UK, Canada, USA, Ireland, Australia, Europe, New Zealand and more.' },
  ]
  return (
    <section className="section container why" ref={ref}>
      <div className="why-copy">
        <Eyebrow>Why GrynIndex</Eyebrow>
        <SplitText className="display" text="Elevate your study abroad journey" />
        <Reveal as="p" className="lede">
          At GRYN INDEX INITIATIVE, we simplify your path to global education by providing seamless international education processes with expert guidance.
        </Reveal>
        <div className="why-points">
          {points.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.08} className="why-point">
              <span className="why-icon"><Icon size={18} strokeWidth={1.75} /></span>
              <h4>{title}</h4>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
      <Reveal className="why-visual">
        <motion.img style={{ y }} src={img('Why-Choose-us1-1.png')} alt="900+ happy students, 2000+ offers to top universities, 100% in-person and virtual support, 10 offices, 11 destinations" />
      </Reveal>
    </section>
  )
}

/* ---------- Events ---------- */
export function Events() {
  return (
    <section id="events" className="section events">
      <div className="container">
        <div className="section-head">
          <div>
            <Eyebrow>Attend Our Free Events</Eyebrow>
            <SplitText className="display" text="Learn, connect and get inspired" />
          </div>
        </div>

        <div className="event-feature">
          <Reveal className="event-flyer">
            <Tilt max={5}>
              <img src={event.flyer} alt="The Gryn Initiative, Building Values event flyer" />
            </Tilt>
            <span className="badge-free"><Ticket size={14} /> Registration is free</span>
          </Reveal>
          <div className="event-info">
            <Reveal as="p" className="event-kicker">{event.kicker}, tagged</Reveal>
            <SplitText as="h3" className="event-title" text={event.title} />
            <Reveal className="event-meta" delay={0.1}>
              <span><Calendar size={16} /> {event.date}</span>
              <span><Clock size={16} /> {event.time}</span>
              <span><MapPin size={16} /> {event.venue}</span>
            </Reveal>
            {event.body.map((p, i) => <Reveal as="p" key={i} delay={0.15 + i * 0.05} className="event-body">{p}</Reveal>)}
            <Reveal as="p" className="event-body em" delay={0.25}>Stay informed and inspired as we shape a brighter future together.</Reveal>
            <Reveal delay={0.3}>
              <Magnetic>
                <a href={`${SITE}/contact/`} className="btn btn-green">Secure your spot today <ArrowRight size={16} /></a>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="marquee" aria-label="Past events">
        <div className="marquee-track">
          {[...event.gallery, ...event.gallery].map((src, i) => (
            <div className="marquee-item" key={i} data-cursor="Event"><img src={src} alt="" loading="lazy" /></div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Testimonial ---------- */
export function Testimonial() {
  return (
    <section className="section container testimonial">
      <Eyebrow>Read Our Students' Reviews</Eyebrow>
      <Reveal className="t-card">
        <Quote className="t-quote-mark" size={56} strokeWidth={1} />
        <SplitText as="blockquote" className="t-quote" text={`“${testimonial.quote}”`} stagger={0.012} />
        <div className="t-person">
          <span className="t-avatar">{testimonial.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span>
          <span><strong>{testimonial.name}</strong><small>{testimonial.place}</small></span>
        </div>
      </Reveal>
    </section>
  )
}

/* ---------- Closing CTA ---------- */
export function CTA() {
  return (
    <section className="container cta-wrap">
      <motion.div className="cta" data-dark
        initial={{ clipPath: 'inset(12% 8% 12% 8% round 48px)' }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 32px)' }}
        viewport={{ once: true, margin: '-10% 0px' }} transition={{ duration: 1.2, ease }}>
        <div className="mesh" aria-hidden="true"><span className="blob b1" /><span className="blob b3" /></div>
        <div className="grain" aria-hidden="true" />
        <SplitText className="cta-title" text="Start your study abroad journey today" />
        <Reveal as="p" className="lede light" delay={0.2}>Book a free consultation with our counselors and take the first step.</Reveal>
        <Reveal delay={0.3} className="cta-actions">
          <Magnetic strength={0.4}>
            <a href={`${SITE}/contact/`} className="btn-orb" data-cursor="Go">Get Started</a>
          </Magnetic>
        </Reveal>
      </motion.div>
    </section>
  )
}
