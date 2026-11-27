// All copy and imagery below comes from the company's current home page.
// Sentences that were cut off mid-way on the live site are closed at the last full clause.
import {
  GraduationCap, School, FileText, ClipboardCheck, Stamp, Plane,
  MessagesSquare, Ticket, BedDouble, Users, House, Compass,
} from 'lucide-react'

// Home sections are linked with a hash on the home page and "/#id" from inner pages.
export const path = typeof window === 'undefined' ? '/' : window.location.pathname.replace(/\/+$/, '') || '/'
export const isHome = path === '/'
export const sec = (id) => (isHome ? `#${id}` : `/#${id}`)

// External student-accommodation booking portal (opens in a new tab).
export const ACCOMMODATION_URL = 'https://grynindex-accommodation.studentacco.com/'
export const img = (name) => `/images/${name}`

export const services = [
  {
    title: 'Academic Counselling',
    icon: GraduationCap,
    image: img('Young-Programmer.jpg'),
    href: '/services#academic-counseling',
    text: 'Get expert guidance to choose the right course, institution, and academic pathway for your future.',
  },
  {
    title: 'Admission Support',
    icon: School,
    image: img('box2.jpg'),
    href: '/services#admission-support',
    text: 'Navigate university applications with professional guidance, from selecting institutions to securing admission.',
  },
  {
    title: 'Visa Application',
    icon: Stamp,
    image: img('Working-from-Home.jpg'),
    href: '/services#visa-application',
    text: 'Get guided support with student visa requirements, documentation, application processes, and interview preparation.',
  },
  {
    title: 'Flight and Travel Assistance',
    icon: Plane,
    image: img('Airplane-Flying.jpg'),
    href: '/services#flight-offers',
    text: 'We assist students in exploring suitable flight options and preparing for their international travel.',
  },
]

export const steps = [
  {
    title: 'Counselling',
    icon: MessagesSquare,
    art: img('1.png'),
    text: 'We provide personalised counselling sessions to understand your educational goals, preferences, and career aspirations. Our experienced consultants offer guidance and advice to help you make informed decisions about your study options.',
  },
  {
    title: 'Choose Schools',
    icon: School,
    art: img('2.png'),
    text: 'Based on your preferences and academic profile, we assist you in selecting the most suitable universities or educational institutions. We consider factors such as programme offerings, reputation, location, and affordability to help you find the right fit.',
  },
  {
    title: 'Documentation',
    icon: FileText,
    art: img('3.png'),
    text: 'We help you navigate the complex documentation process, ensuring you have all the necessary paperwork in order. From academic transcripts and recommendation letters to financial statements and language proficiency certificates, we ensure you submit a complete and accurate application package.',
  },
  {
    title: 'Applications',
    icon: ClipboardCheck,
    art: img('4.png'),
    text: 'Our team supports you throughout the application process. We help you fill out application forms, review your personal statements or essays, and gather all the required documents. Our aim is to present your application in the best possible light to maximise your chances of admission.',
  },
  {
    title: 'Visa Processing',
    icon: Stamp,
    art: img('5.png'),
    text: 'Navigating the visa application process can be complex and time-consuming. Our visa application service is designed to simplify this process for you, so you can focus on getting ready for your new journey.',
  },
]

export const destinations = [
  { name: 'The United Kingdom', code: 'UK', image: img('Young-Programmer.jpg'), href: '/destinations/uk', text: "The United Kingdom is one of the world's leading destinations for international education, offering globally respected qualifications, diverse academic programmes, internationally recognised research institutions and opportunities for personal and professional development." },
  { name: 'Canada', code: 'CA', image: img('Canada.jpg'), href: '/destinations/canada', text: "Canada offers internationally respected education, multicultural communities, innovative academic programmes and valuable research opportunities." },
  { name: 'United States', code: 'US', image: img('US-Flag-Balloon.jpg'), href: '/destinations/usa', text: "The United States is a leading global destination for international education, offering a diverse range of universities, colleges, research institutions and professional programmes." },
  { name: 'Ireland', code: 'IE', image: img('ireland-flag.jpeg'), href: '/destinations/ireland', text: "Ireland is an English-speaking European Union member state offering internationally recognised education, innovative research opportunities and a growing international student community." },
  { name: 'Australia', code: 'AU', image: img('Australian-Flags.jpg'), href: '/destinations/australia', text: "Australia combines internationally recognised education with diverse communities, innovative research facilities and a distinctive lifestyle." },
  { name: 'Europe', code: 'EU', image: img('European-Union-Flag.jpg'), href: '/destinations/europe', text: "Europe offers diverse international education opportunities across a wide range of countries, cultures and academic systems." },
  { name: 'New Zealand', code: 'NZ', image: img('new-zealand.webp'), href: '/destinations/new-zealand', text: "New Zealand offers internationally respected education, innovative learning environments, diverse natural landscapes and opportunities for academic and professional development." },
  { name: 'China', code: 'CN', image: img('china-flag.svg'), href: '/destinations/china', text: "Study in China through our admission pathway partners." },
]

// Figures taken from the "Why choose us" graphic on the live site.
export const stats = [
  { value: 900, suffix: '+', label: 'Happy students' },
  { value: 2000, suffix: '+', label: 'Offers to top universities' },
  { value: 100, suffix: '%', label: 'In-person & virtual support' },
  { value: 10, suffix: '', label: 'Offices' },
  { value: 11, suffix: '', label: 'Destinations' },
]

export const event = {
  title: 'Building Values',
  kicker: 'A Gryn Index community event',
  date: 'June 17th',
  time: '10:00 AM prompt',
  venue: 'Catholic Church of the Holy Spirit, Omole Estate',
  flyer: img('the-gryn-flyer-2-768x768-1.jpg'),
  body: [
    'We invite you to partake in dynamic discussions exploring the fundamental pillars of life, knowledge, and progress. From navigating personal and professional growth to fostering nation-building dialogues, we’re dedicated to empowering individuals to realise their full potential.',
    'Supported by our esteemed sponsors who share our vision for empowerment and progress, this event is not to be missed. Registration is free, offering you the chance to connect with industry experts, gain insights from success stories, and contribute to meaningful discussions.',
  ],
  gallery: ['flyer1.jpg', 'flyer2.png', 'flyer3.jpg', 'flyer4.jpg', 'flyer5.jpg', 'flyer6.jpg'].map(img),
}

export const testimonial = {
  quote: 'My cousin sang praises of Gryn Index as the best study abroad agency; I decided to try it. Before this, I had fallen into the wrong hands of Twitter travel experts and had horrible experiences with amateurs. But Gryn Index took my hand through the entire process, from application to travel plans. Special shout out to Ms. Cynthia; she’s excellent!',
  name: 'Kelechi Ndudi Okoro',
  place: 'Northampton, UK',
}

export const socials = [
  { name: 'TikTok', href: 'https://www.tiktok.com/@grynindex' },
  { name: 'Instagram', href: 'https://www.instagram.com/grynindexinitiative' },
  { name: 'Facebook', href: 'https://www.facebook.com/grynindexinitiative' },
  { name: 'X', href: 'https://x.com/grynindex' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/gryn-index-initiative' },
]

export const nav = {
  services: services.map((s) => ({ ...s, short: s.text.split('.')[0] + '.' })),
  explore: [
    { title: 'Events', icon: Ticket, href: sec('events'), text: 'Free sessions, edu-fairs and open days.' },
    { title: 'Accommodation', icon: BedDouble, href: '/accommodation', text: 'Find a place to stay before you land.' },
    { title: 'About Us', icon: Users, href: '/about', text: 'The team behind your journey.' },
    { title: 'How We Work', icon: Compass, href: sec('process'), text: 'From counselling to visa, step by step.' },
  ],
  home: House,
}
