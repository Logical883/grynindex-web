import { motion } from 'motion/react'
import { ArrowRight, ChevronRight, Mail } from 'lucide-react'
import { about } from '../aboutData'
import { Reveal, SplitText, Magnetic } from '../components/fx'
import { CTA } from '../components/Sections'

const ease = [0.22, 1, 0.36, 1]

function Hero() {
  return (
    <section className="page-hero-wrap">
      <div className="page-hero violet-panel" data-dark>
        <div className="mesh" aria-hidden="true"><span className="blob b1" /><span className="blob b2" /></div>
        <div className="grain" aria-hidden="true" />
        <div className="container dest-hero-grid">
          <div className="page-hero-copy">
            <motion.nav className="crumbs" aria-label="Breadcrumb" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
              <a href="/">Home</a><ChevronRight size={14} /><span aria-current="page">About Us</span>
            </motion.nav>
            <h1 className="page-title" aria-label="About Gryn Index">
              {['About', 'Gryn Index'].map((w, i) => (
                <span className="line-mask" key={w}>
                  <motion.span initial={{ y: '105%' }} animate={{ y: '0%' }} transition={{ duration: 1.1, ease, delay: 0.1 + i * 0.12 }}>{w}</motion.span>
                </span>
              ))}
            </h1>
            <motion.p className="lede light" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.9, ease }}>
              {about.intro}
            </motion.p>
            <motion.div className="dest-hero-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.9, ease }}>
              <Magnetic>
                <a href="/contact" className="btn-journey"><span className="arrow-disc"><ArrowRight size={16} /></span>Book a consultation</a>
              </Magnetic>
              <a href="#team" className="link-underline light">Meet the team</a>
            </motion.div>
          </div>
          <motion.div className="about-hero-photo" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 1, ease }}>
            <img src={about.heroImage} alt="The Gryn Index team" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function WhoWeAre() {
  return (
    <section className="section container about-who">
      <div>
        <p className="eyebrow">Who we are</p>
        <SplitText className="display" text="Who Are We?" />
        <div className="about-who-text">
          {about.who.map((t, i) => <Reveal as="p" key={i} delay={i * 0.08} className="svc-body">{t}</Reveal>)}
        </div>
      </div>
      <Reveal className="about-office" delay={0.1}>
        <img src={about.officeImage} alt="A Gryn Index counselling session" loading="lazy" />
      </Reveal>
    </section>
  )
}

function CardGrid({ items, className = '', numbered = false }) {
  return (
    <div className={`about-grid ${className}`}>
      {items.map(({ icon: Icon, title, text }, i) => (
        <Reveal key={title} delay={(i % 4) * 0.07} className="fact-card">
          <div className="fact-top">
            <span className="fact-icon"><Icon size={20} strokeWidth={1.75} /></span>
            {numbered && <span className="fact-num">{String(i + 1).padStart(2, '0')}</span>}
          </div>
          <h3>{title}</h3>
          <p>{text}</p>
        </Reveal>
      ))}
    </div>
  )
}

function Team() {
  return (
    <section id="team" className="section team">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Our people</p>
            <SplitText className="display" text="Meet the Team" />
          </div>
        </div>
        <div className="team-grid">
          {about.team.map((m, i) => (
            <Reveal key={m.name} delay={(i % 4) * 0.05} className="team-card">
              <div className="team-photo"><img src={m.photo} alt={m.name} loading="lazy" /></div>
              <div className="team-body">
                <h3>{m.name}</h3>
                {m.role && <p className="team-role">{m.role}</p>}
                {m.emails.map((e) => (
                  <a key={e} className="team-email" href={`mailto:${e}`}><Mail size={14} /> {e}</a>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function AboutPage() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <section className="section container about-block">
        <div className="section-head"><div><p className="eyebrow">Our purpose</p><SplitText className="display" text="Mission and vision" /></div></div>
        <CardGrid items={about.purpose} className="three" />
      </section>
      <section className="section container about-block">
        <div className="section-head"><div><p className="eyebrow">Why Gryn Index</p><SplitText className="display" text="Why Choose Us?" /></div></div>
        <CardGrid items={about.why} numbered />
      </section>
      <section className="section container about-block">
        <div className="section-head"><div><p className="eyebrow">What guides us</p><SplitText className="display" text="Our Values" /></div></div>
        <CardGrid items={about.values} numbered />
      </section>
      <Team />
      <CTA />
    </>
  )
}
