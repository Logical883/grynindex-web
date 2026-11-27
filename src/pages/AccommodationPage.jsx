import { motion } from 'motion/react'
import { ArrowUpRight, ChevronRight, Info } from 'lucide-react'
import { accommodation as acc } from '../aboutData'
import { ACCOMMODATION_URL } from '../data'
import { Reveal, SplitText, Magnetic } from '../components/fx'
import { CTA } from '../components/Sections'

const ease = [0.22, 1, 0.36, 1]

export default function AccommodationPage() {
  return (
    <>
      <section className="page-hero-wrap">
        <div className="page-hero violet-panel" data-dark>
          <div className="mesh" aria-hidden="true"><span className="blob b1" /><span className="blob b2" /></div>
          <div className="grain" aria-hidden="true" />
          <div className="container dest-hero-grid">
            <div className="page-hero-copy">
              <motion.nav className="crumbs" aria-label="Breadcrumb" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
                <a href="/">Home</a><ChevronRight size={14} /><span aria-current="page">Accommodation</span>
              </motion.nav>
              <h1 className="page-title acc-title" aria-label={acc.title}>
                {['Secure Your Verified', 'Student Accommodation', 'Abroad'].map((line, i) => (
                  <span className="line-mask" key={line}>
                    <motion.span initial={{ y: '105%' }} animate={{ y: '0%' }} transition={{ duration: 1.1, ease, delay: 0.1 + i * 0.12 }}>{line}</motion.span>
                  </span>
                ))}
              </h1>
              <motion.p className="lede light" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.9, ease }}>
                {acc.lede}
              </motion.p>
              <motion.div className="dest-hero-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.9, ease }}>
                <Magnetic>
                  <a href={ACCOMMODATION_URL} target="_blank" rel="noopener noreferrer" className="btn-journey">
                    <span className="arrow-disc"><ArrowUpRight size={16} /></span>Get Accommodation
                  </a>
                </Magnetic>
              </motion.div>
            </div>
            <motion.div className="about-hero-photo" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 1, ease }}>
              <img src={acc.heroImage} alt="A furnished student bedroom with a study desk" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Where we can help</p>
            <SplitText className="display" text="Accommodation Destinations" />
          </div>
        </div>
        <div className="acc-grid">
          {acc.destinations.map((d, i) => (
            <Reveal key={d.name} delay={(i % 4) * 0.06}>
              <a className="acc-card" href={ACCOMMODATION_URL} target="_blank" rel="noopener noreferrer" aria-label={`Find student accommodation in ${d.name} (opens the accommodation portal)`}>
                <div className="acc-photo"><img src={d.photo} alt="" loading="lazy" /></div>
                <div className="acc-body">
                  <h3>{d.name}</h3>
                  <span className="circle-arrow"><ArrowUpRight size={15} /></span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal as="p" className="svc-note"><Info size={16} /> <span>{acc.note}</span></Reveal>
      </section>
      <CTA />
    </>
  )
}
