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
    title: 'Academic Counseling',
    icon: GraduationCap,
    image: img('Young-Programmer.jpg'),
    href: '/services#academic-counseling',
    text: 'Our academic counseling service is designed to provide personalized guidance and support to help you make informed decisions about your educational journey.',
  },
  {
    title: 'Admission Support',
    icon: School,
    image: img('box2.jpg'),
    href: '/services#admission-support',
    text: 'Our admission support service is tailored to streamline the university application process and maximize your chances of acceptance.',
  },
  {
    title: 'Visa Application',
    icon: Stamp,
    image: img('Working-from-Home.jpg'),
    href: '/services#visa-application',
    text: 'Navigating the visa application process can be complex and time-consuming. Our visa application service is designed to simplify this process for you.',
  },
  {
    title: 'Amazing Flight Offers',
    icon: Plane,
    image: img('Airplane-Flying.jpg'),
    href: '/services#flight-offers',
    text: 'Explore our fantastic flight offers to get you to your dream destination without straining your wallet.',
  },
]

export const steps = [
  {
    title: 'Counseling',
    icon: MessagesSquare,
    art: img('1.png'),
    text: 'We provide personalized counseling sessions to understand your educational goals, preferences, and career aspirations. Our experienced consultants offer guidance and advice to help you make informed decisions about your study options.',
  },
  {
    title: 'Choose Schools',
    icon: School,
    art: img('2.png'),
    text: 'Based on your preferences and academic profile, we assist you in selecting the most suitable universities or educational institutions. We consider factors such as program offerings, reputation, location, and affordability to help you find the right fit.',
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
    text: 'Our team supports you throughout the application process. We help you fill out application forms, review your personal statements or essays, and gather all the required documents. Our aim is to present your application in the best possible light to maximize your chances of admission.',
  },
  {
    title: 'Visa Processing',
    icon: Stamp,
    art: img('5.png'),
    text: 'Navigating the visa application process can be complex and time-consuming. Our visa application service is designed to simplify this process for you, so you can focus on getting ready for your new journey.',
  },
]

export const destinations = [
  { name: 'The United Kingdom', code: 'UK', image: img('Young-Programmer.jpg'), href: '/destinations/uk', text: 'The UK has a world-class, long and successful history of excellence.' },
  { name: 'Canada', code: 'CA', image: img('Canada.jpg'), href: '/destinations/canada', text: 'Canada, the world’s second-largest country by landmass, is in the North American continent.' },
  { name: 'United States', code: 'US', image: img('US-Flag-Balloon.jpg'), href: '/destinations/usa', text: 'The United States of America makes up a great portion of the North American continent.' },
  { name: 'Ireland', code: 'IE', image: img('ireland-flag.jpeg'), href: '/destinations/ireland', text: 'The Republic of Ireland is a part of the European Union.' },
  { name: 'Australia', code: 'AU', image: img('Australian-Flags.jpg'), href: '/destinations/australia', text: 'Australia is more than a study destination; Australia is a change in lifestyle.' },
  { name: 'Europe', code: 'EU', image: img('European-Union-Flag.jpg'), href: '/destinations/europe', text: 'Embark on an incredible educational adventure in Europe, where diverse cultures and academic excellence meet.' },
  { name: 'New Zealand', code: 'NZ', image: img('new-zealand.webp'), href: '/destinations/new-zealand', text: 'Embark on an enriching academic journey in New Zealand, where natural beauty meets educational excellence.' },
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
  kicker: 'Join us for an immersive experience at the Gryn Initiative',
  date: 'June 17th',
  time: '10:00 AM prompt',
  venue: 'Catholic Church of the Holy Spirit, Omole Estate',
  flyer: img('the-gryn-flyer-2-768x768-1.jpg'),
  body: [
    'We invite you to partake in dynamic discussions exploring the fundamental pillars of life, knowledge, and progress. From navigating personal and professional growth to fostering nation-building dialogues, we’re dedicated to empowering individuals to realize their full potential.',
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
    { title: 'How We Work', icon: Compass, href: sec('process'), text: 'From counseling to visa, step by step.' },
  ],
  home: House,
}
