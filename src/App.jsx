import { useEffect } from 'react'
import Lenis from 'lenis'
import { useScroll } from 'motion/react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import { Stats, Services, Process, Destinations, Why, Events, Testimonial, CTA } from './components/Sections'
import Footer from './components/Footer'
import { Cursor, ScrollProgress } from './components/fx'

export default function App() {
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, anchors: { offset: -90 } })
    let id
    const raf = (t) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])

  return (
    <>
      <ScrollProgress progress={scrollYProgress} />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Process />
        <Destinations />
        <Why />
        <Events />
        <Testimonial />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
