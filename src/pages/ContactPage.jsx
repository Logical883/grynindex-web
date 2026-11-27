import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, Building, ChevronRight, CircleCheck, MapPin, TriangleExclamationPoint } from 'lucide-react'
import { Reveal } from '../components/fx'
import { destinationPages } from '../destinationsData'
import { office, privacyNotice } from '../legal'

const ease = [0.22, 1, 0.36, 1]

// Where consultation requests are sent (the CRM / enquiry system's form endpoint).
// Set VITE_ENQUIRY_ENDPOINT in Vercel's environment variables. Until it is set the
// form explains that online booking is not connected rather than pretending to succeed.
const ENDPOINT = import.meta.env.VITE_ENQUIRY_ENDPOINT

const QUALIFICATIONS = ['Secondary school certificate (e.g. WASSCE, NECO)', 'Diploma / OND', 'HND', "Bachelor's degree", "Master's degree", 'Doctorate', 'Other']
const INTAKES = ['January', 'February', 'May', 'September', 'Other / not sure yet']
const METHODS = ['In person (Lagos office)', 'Phone call', 'WhatsApp', 'Video call', 'Email']

function Field({ label, required, children, wide }) {
  return (
    <label className={`field ${wide ? 'wide' : ''}`}>
      <span className="field-label">{label}{required && <em aria-hidden="true"> *</em>}</span>
      {children}
    </label>
  )
}

function Select({ name, options, required, placeholder = 'Select an option' }) {
  return (
    <select name={name} required={required} defaultValue="">
      <option value="" disabled>{placeholder}</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}

function ConsultationForm() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error | offline

  const submit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    if (!ENDPOINT) { setStatus('offline'); return }
    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, source: 'website-consultation', submittedAt: new Date().toISOString() }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="form-result ok" role="status">
        <CircleCheck size={28} />
        <p>Thank you for contacting Gryn Index. Your consultation request has been received successfully. A member of our education counselling team will contact you using the information provided.</p>
      </div>
    )
  }

  return (
    <form className="consult-form" onSubmit={submit}>
      <div className="form-grid">
        <Field label="Full name" required><input name="fullName" autoComplete="name" required /></Field>
        <Field label="Email address" required><input name="email" type="email" autoComplete="email" required /></Field>
        <Field label="Phone or WhatsApp number" required><input name="phone" type="tel" autoComplete="tel" required /></Field>
        <Field label="Country of residence" required><input name="country" autoComplete="country-name" required /></Field>
        <Field label="Preferred study destination" required>
          <Select name="destination" required options={[...destinationPages.map((d) => d.name), 'Not sure yet']} />
        </Field>
        <Field label="Highest academic qualification" required>
          <Select name="qualification" required options={QUALIFICATIONS} />
        </Field>
        <Field label="Intended programme of study"><input name="programme" /></Field>
        <Field label="Preferred academic intake"><Select name="intake" options={INTAKES} /></Field>
        <Field label="Estimated study budget"><input name="budget" placeholder="e.g. £15,000 per year" /></Field>
        <Field label="Preferred consultation method" required><Select name="method" required options={METHODS} /></Field>
        <Field label="Additional enquiries" wide><textarea name="message" rows={4} /></Field>
      </div>

      <label className="privacy-check">
        <input type="checkbox" name="privacyAccepted" value="yes" required />
        <span>{privacyNotice} See our <a href="/privacy-policy">Privacy Policy</a>.</span>
      </label>

      {(status === 'error' || status === 'offline') && (
        <div className="form-result bad" role="alert">
          <TriangleExclamationPoint size={20} />
          <p>
            {status === 'offline'
              ? 'Online booking is not connected yet, so your request was not sent. Please visit our office or try again later.'
              : 'Sorry, your request could not be sent. Please check your connection and try again.'}
          </p>
        </div>
      )}

      <button type="submit" className="btn btn-dark consult-submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Book My Consultation'} <ArrowRight size={16} />
      </button>
    </form>
  )
}

export default function ContactPage() {
  return (
    <>
      <section className="page-hero-wrap">
        <div className="page-hero violet-panel contact-hero" data-dark>
          <div className="mesh" aria-hidden="true"><span className="blob b1" /><span className="blob b2" /></div>
          <div className="grain" aria-hidden="true" />
          <div className="container">
            <motion.nav className="crumbs" aria-label="Breadcrumb" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
              <a href="/">Home</a><ChevronRight size={14} /><span aria-current="page">Contact</span>
            </motion.nav>
            <h1 className="page-title contact-title" aria-label="Let's Start Your Global Education Journey.">
              {["Let's Start Your", 'Global Education Journey.'].map((line, i) => (
                <span className="line-mask" key={line}>
                  <motion.span initial={{ y: '105%' }} animate={{ y: '0%' }} transition={{ duration: 1.1, ease, delay: 0.1 + i * 0.12 }}>{line}</motion.span>
                </span>
              ))}
            </h1>
            <motion.div className="contact-intro" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.9, ease }}>
              <p className="lede light">Whether you are exploring your study options, preparing a university application or seeking guidance on student visa requirements, our experienced team is available to assist you.</p>
              <p className="lede light">Book a consultation with Gryn Index and receive personalised guidance based on your academic qualifications, career goals and preferred destination.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section container contact-body">
        <Reveal className="contact-side">
          <div className="contact-card">
            <span className="fact-icon"><Building size={20} strokeWidth={1.75} /></span>
            <p className="contact-label">Registered business name</p>
            <p className="contact-value">{office.name}</p>
          </div>
          <div className="contact-card">
            <span className="fact-icon"><MapPin size={20} strokeWidth={1.75} /></span>
            <p className="contact-label">Office address</p>
            <p className="contact-value">{office.address}</p>
            <a className="link-arrow" href={office.mapUrl} target="_blank" rel="noopener noreferrer">Open in Google Maps <ArrowRight size={15} /></a>
          </div>
        </Reveal>
        <Reveal className="contact-form-card" delay={0.1}>
          <p className="eyebrow">Book a consultation</p>
          <h2 className="contact-form-title">Tell us about your study plans</h2>
          <ConsultationForm />
        </Reveal>
      </section>
    </>
  )
}
