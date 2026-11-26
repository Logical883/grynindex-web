import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { socials, img, sec } from '../data'

const paths = {
  TikTok: 'M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48Z',
  Instagram: 'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.25a3.25 3.25 0 1 1 0-6.5 3.25 3.25 0 0 1 0 6.5Zm5.2-9.62a1.17 1.17 0 1 0 0 2.34 1.17 1.17 0 0 0 0-2.34Z',
  Facebook: 'M13.5 21v-7.5h2.53l.38-2.94H13.5V8.69c0-.85.24-1.43 1.46-1.43h1.55V4.63A20.6 20.6 0 0 0 14.25 4.5c-2.24 0-3.77 1.37-3.77 3.88v2.18H7.95v2.94h2.53V21h3.02Z',
  X: 'M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78L17.75 3Zm-1.08 16.18h1.7L7.4 4.73H5.58l11.09 14.45Z',
  LinkedIn: 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11.25H3V9.75Zm6.5 0h3.83v1.54h.06c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.13V21h-4v-5.03c0-1.2-.02-2.74-1.67-2.74-1.67 0-1.93 1.3-1.93 2.65V21h-4V9.75Z',
}

export function SocialIcon({ name }) {
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d={paths[name]} /></svg>
}

export default function Footer() {
  const links = [
    ['Our Services', '/services'], ['How We Work', sec('process')], ['Study Locations', sec('destinations')], ['Events', sec('events')],
    ['Accommodation', '/accommodation'], ['About Us', '/about'], ['Blog', '/blog'], ['Contact', '/contact'],
  ]
  return (
    <footer className="footer" data-dark>
      <div className="container footer-top">
        <div className="footer-brand">
          <span className="footer-logo"><img src={img('gryn-logo-light.svg')} alt="Gryn Index Initiative" /></span>
          <p>At Gryn Index, we simplify your path to global education by providing seamless international education processes with expert guidance.</p>
        </div>
        <div>
          <p className="footer-h">Quick Links</p>
          <ul className="footer-links">
            {links.map(([l, h]) => <li key={l}><a href={h}>{l}</a></li>)}
          </ul>
        </div>
        <div>
          <p className="footer-h">Follow Us</p>
          <ul className="footer-social">
            {socials.map((s) => (
              <li key={s.name}>
                <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.name}>
                  <SocialIcon name={s.name} /><span>{s.name}</span><ArrowUpRight size={14} className="ext" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer-word" aria-hidden="true">GRYN INDEX</div>
      <div className="container footer-bottom">
        <span>©2026 Gryn Index. All Rights Reserved.</span>
        <a href={sec('top')} className="to-top">Back to top <ArrowUp size={14} /></a>
      </div>
    </footer>
  )
}
