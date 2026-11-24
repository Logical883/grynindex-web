import { useEffect } from 'react'
import Lenis from 'lenis'
import { useScroll } from 'motion/react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import { Stats, Services, Process, Destinations, Why, Events, Testimonial, CTA } from './components/Sections'
import Footer from './components/Footer'
import NotReady from './components/NotReady'
import { Cursor, ScrollProgress } from './components/fx'
import { isHome } from './data'

function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <Process />
      <Destinations />
      <Why />
      <Events />
      <Testimonial />
      <CTA />
    </>
  )
}

export default function App() {
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, anchors: { offset: -90 } })
    let id
    const raf = (t) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    // Arriving from an inner page via "/#section": scroll there once the layout has settled.
    if (isHome && window.location.hash) {
      const el = document.querySelector(window.location.hash)
      if (el) setTimeout(() => lenis.scrollTo(el, { offset: -90, immediate: true }), 100)
    }
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])

  return (
    <>
      <ScrollProgress progress={scrollYProgress} />
      <Cursor />
      <Nav />
      <main>{isHome ? <Home /> : <NotReady path={window.location.pathname} />}</main>
      <Footer />
    </>
  )
}
