import { useEffect } from 'react'
import Lenis from 'lenis'
import { useScroll } from 'motion/react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import { Stats, Services, Process, Destinations, Why, Events, Testimonial, CTA } from './components/Sections'
import Footer from './components/Footer'
import NotReady from './components/NotReady'
import ServicesPage from './pages/ServicesPage'
import ContactPage from './pages/ContactPage'
import DestinationPage from './pages/DestinationPage'
import { destinationBySlug } from './destinationsData'
import { Cursor, ScrollProgress } from './components/fx'
import { path } from './data'
import { setLenis, scrollToId } from './scroll'

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

// Built pages; every other route shows the "Not yet developed" placeholder.
const pages = { '/': Home, '/services': ServicesPage, '/contact': ContactPage }
const destination = path.startsWith('/destinations/') ? destinationBySlug[path.split('/')[2]] : null

export default function App() {
  const { scrollYProgress } = useScroll()
  const Page = pages[path]

  useEffect(() => {
    let lenis = null
    let id
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      lenis = new Lenis({ duration: 1.15, smoothWheel: true, anchors: { offset: -100 } })
      const raf = (t) => { lenis.raf(t); id = requestAnimationFrame(raf) }
      id = requestAnimationFrame(raf)
    }
    setLenis(lenis)
    // Arriving with a "#section" in the URL: jump there once the layout has settled.
    const hash = decodeURIComponent(window.location.hash.slice(1))
    if (hash) setTimeout(() => scrollToId(hash, { immediate: true }), 120)
    return () => { cancelAnimationFrame(id); lenis?.destroy(); setLenis(null) }
  }, [])

  return (
    <>
      <ScrollProgress progress={scrollYProgress} />
      <Cursor />
      <Nav />
      <main>
        {destination ? <DestinationPage destination={destination} /> : Page ? <Page /> : <NotReady path={path} />}
      </main>
      <Footer />
    </>
  )
}
