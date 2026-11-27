import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react'
import {
  ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, MapPin,
  Quote, ShieldCheck, Headphones, Building, Globe, Ticket, GraduationCap, BadgeCheck,
} from 'lucide-react'
import { services, steps, destinations, stats, event, testimonial, img } from '../data'
import { Reveal, SplitText, Counter, Magnetic, Tilt } from './fx'

const ease = [0.22, 1, 0.36, 1]

function Eyebrow({ children, light }) {
  return <p className={`eyebrow ${light ? 'light' : ''}`}>{children}</p>
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
        <p>Accreditations &amp; training</p>
        <img src={img('Certifications.jpg')} alt="ICEF Agency Status accreditation, British Council-trained education counsellors, ABCC" />
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
          Gryn Index is an international education consultancy dedicated to helping students discover suitable academic opportunities, secure university admissions and navigate the student visa application process with confidence. From your first consultation to your departure, our experienced team provides personalised support tailored to your academic background, career aspirations and financial circumstances.
        </Reveal>
      </div>

      <div className="service-grid">
        {services.map(({ title, text, icon: Icon, image, href }, i) => (
          <Reveal key={title} delay={i * 0.1}>
            <Tilt className="service-card" max={6}>
              <a href={href}>
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
              </a>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ---------- How We Work: sticky heading + scroll-filled timeline ---------- */
export function Process() {
  const ref = useRef(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 60%', 'end 70%'] })
  const line = useTransform(scrollYProgress, [0, 1], [0, 1])
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length))))
  })

  return (
    <section id="process" className="process violet-panel" data-dark ref={ref}>
      <div className="grain" aria-hidden="true" />
      <div className="container process-inner">
        <div className="process-sticky">
          <Eyebrow light>How We Work</Eyebrow>
          <SplitText className="display light" text="Five steps. One seamless journey." />
          <p className="lede light">Expert guidance at every stage, so nothing falls through the cracks.</p>
        </div>

        <ol className="process-steps">
          <div className="process-track" aria-hidden="true"><motion.span style={{ scaleY: line }} /></div>
          {steps.map(({ title, text, icon: Icon }, i) => (
            <motion.li key={title} className={`step ${i <= active ? 'done' : ''}`}
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
          <motion.a key={d.code} href={d.href} className="dest-card"
            initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.9, ease, delay: (i % 4) * 0.08 }}>
            <div className="dest-media">
              {d.image ? <img src={d.image} alt="" loading="lazy" /> : <span className="media-fallback" aria-hidden="true">{d.code}</span>}
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

/* ---------- Why choose us (hosts the team collage) ---------- */
export function Why() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])
  const chipY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const points = [
    { icon: Headphones, title: 'In-person & virtual support', text: 'Comprehensive in-person and virtual support throughout your international education journey, wherever you are.' },
    { icon: Building, title: '10 offices', text: 'Real people you can meet, not anonymous online “experts”.' },
    { icon: ShieldCheck, title: 'British Council-Trained Education Counsellors', text: 'Our team includes professionally trained education counsellors committed to ethical international student recruitment, responsible student counselling and accurate admissions guidance.' },
    { icon: Globe, title: '11 destinations', text: 'UK, Canada, USA, Ireland, Australia, Europe, New Zealand and more.' },
  ]
  const chips = [
    { cls: 'chip-a', icon: GraduationCap, title: '2,000+', sub: 'Offers to top universities' },
    { cls: 'chip-b', icon: BadgeCheck, title: 'British Council', sub: 'Trained education counsellors' },
    { cls: 'chip-c', icon: MapPin, title: '11 destinations', sub: '10 offices' },
  ]
  return (
    <section className="section container why" ref={ref}>
      <div className="why-copy">
        <Eyebrow>Why Gryn Index</Eyebrow>
        <SplitText className="display" text="Elevate your study abroad journey" />
        <Reveal as="p" className="lede">
          At Gryn Index, we understand that choosing to study internationally is an important academic, personal and financial decision. Our experienced education counsellors provide personalised guidance, access to international institutions, professional application support and comprehensive visa preparation to help you make informed decisions about your future.
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
        <motion.div className="collage" style={{ y }}>
          <img src={img('banner1.png')} alt="Gryn Index counsellors with students, and an accepted university application" />
        </motion.div>
        {chips.map(({ cls, icon: Icon, title, sub }, i) => (
          <motion.div key={cls} className={`glass-chip ${cls}`} style={{ y: i === 1 ? y : chipY }}>
            <span className="chip-ico"><Icon size={16} /></span>
            <span><strong>{title}</strong><small>{sub}</small></span>
          </motion.div>
        ))}
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
            <Eyebrow>Our Events</Eyebrow>
            <SplitText className="display" text="Explore Our Past Events" />
          </div>
          <Reveal as="p" className="lede" delay={0.1}>
            Discover highlights from our previous education fairs, information sessions, seminars and community development initiatives. Through these events, Gryn Index connects students, parents and professionals with valuable insights, educational opportunities and expert guidance.
          </Reveal>
        </div>

        <div className="event-feature">
          <Reveal className="event-flyer">
            <Tilt max={5}>
              <img src={event.flyer} alt="Gryn Index, Building Values event flyer" />
            </Tilt>
            <span className="badge-free"><Ticket size={14} /> Past event</span>
          </Reveal>
          <div className="event-info">
            <Reveal as="p" className="event-kicker">{event.kicker}</Reveal>
            <SplitText as="h3" className="event-title" text={event.title} />
            <Reveal className="event-meta" delay={0.1}>
              <span><MapPin size={16} /> {event.venue}</span>
            </Reveal>
            <Reveal delay={0.2}>
              <Magnetic>
                <a href="#event-highlights" className="btn btn-green">Explore Event Highlights <ArrowRight size={16} /></a>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </div>

      <div id="event-highlights" className="marquee" aria-label="Past event highlights">
        <div className="marquee-track">
          {[...event.gallery, ...event.gallery].map((src, i) => (
            <div className="marquee-item" key={i}><img src={src} alt="" loading="lazy" /></div>
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
      <motion.div className="cta violet-panel" data-dark
        initial={{ clipPath: 'inset(12% 8% 12% 8% round 48px)' }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 32px)' }}
        viewport={{ once: true, margin: '-10% 0px' }} transition={{ duration: 1.2, ease }}>
        <div className="mesh" aria-hidden="true"><span className="blob b1" /><span className="blob b2" /></div>
        <div className="grain" aria-hidden="true" />
        <SplitText className="cta-title" text="Start your study abroad journey today" />
        <Reveal as="p" className="lede light" delay={0.2}>Book a free consultation with our counsellors and take the first step.</Reveal>
        <Reveal delay={0.3} className="cta-actions">
          <Magnetic strength={0.4}>
            <a href="/contact" className="btn-orb">Get Started</a>
          </Magnetic>
        </Reveal>
      </motion.div>
    </section>
  )
}
