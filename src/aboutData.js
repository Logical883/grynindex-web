// About Us and Accommodation content, from the company's live pages (grynindexedu.com),
// in British English. Adjustments for the client's content corrections (27 Nov 2026):
// - "100% Support" is retitled (the client replaced "100% support" on the home page).
// - Team cards show name, role, photo and company (@grynindexedu.com) email only;
//   phone numbers and non-company addresses wait for management approval of contact details.
// - "300 successful student travels" and "eleven destinations" are company statistics
//   pending management approval (see README).
import {
  Handshake, Building, LifeBuoy, PlaneTakeoff, Target, Eye, Sprout,
  ShieldCheck, HeartHandshake, Flame, DoorOpen,
} from 'lucide-react'
import { img } from './data'

export const about = {
  heroImage: img('About-Us-Grynindex.png'),
  officeImage: img('boxxx.png'),
  intro: 'At Gryn Index, we are committed to bridging the gap between top global educational institutions and students from West Africa.',
  who: [
    "At Gryn Index, we are committed to bridging the gap between top global educational institutions and students from West Africa. We combine our workforce community's warm interpersonal skills and international experience with the convenience of technology to provide expert services that help prospective students from West Africa gain admission and study at top global universities.",
    'We at Gryn Index believe in your dream beyond borders and support you to pursue your education, goals and ambitions at your dream destination. We have built strong affiliations with our university partners across study destinations, including the UK, USA, Ireland, Australia, New Zealand and Canada, to ensure we provide you with the best. We provide excellent support, innovative solutions and expert guidance; our commitment to our processes has yielded credible results with over 300 successful student travels in the past year.',
  ],
  purpose: [
    { icon: Target, title: 'Our Mission', text: 'To make offshore learning as easy as possible and a dream come true for aspiring West African students.' },
    { icon: Eye, title: 'Our Vision', text: 'To be the preferred intermediary between West African students seeking international education and the institutions of their choice.' },
    { icon: Sprout, title: 'Our Aim', text: 'We aim to nurture organic and fruitful relationships between our institutional partners and student communities, ensuring that study processes get more accessible every year.' },
  ],
  why: [
    { icon: Handshake, title: 'Top University Partnerships', text: 'We have partner institutions across eleven ideal study destinations. Our relationships with our university partners ensure we get the best deals and the latest updates for our students.' },
    { icon: Building, title: 'Offices across West Africa', text: 'We have offices at target locations across Nigeria and are growing beyond with an office in Ghana. You can book an in-person or virtual counselling session in any of our offices.' },
    { icon: LifeBuoy, title: 'Support at every stage', text: 'We support you pre-admission, admission and post-admission. We understand the processes and possible hiccups and guide you through the journey with solutions for every step.' },
    { icon: PlaneTakeoff, title: 'Credible record of student travel success', text: 'With a record of over 300 successful student travels in the past year.' },
  ],
  values: [
    { icon: ShieldCheck, title: 'Integrity', text: 'Being honest and consistently truthful in all our dealings with our students and study partners.' },
    { icon: HeartHandshake, title: 'Trust', text: "We are committed to retaining trust within our community by protecting our clients' interests, supporting and respecting them." },
    { icon: Flame, title: 'Commitment', text: 'Fuelled by our vision, we consistently deliver the right service outcome effectively with a great customer experience.' },
    { icon: DoorOpen, title: 'Friendliness', text: 'We effortlessly make our clients feel safe and at home, from our warm reception to the final goodbye.' },
  ],
  team: [
    { name: 'Onyilimba Chibuzor', role: 'Co-Founder and COO', photo: 'Mr.-Chibuzor1.jpg', emails: ['Chibuzor@grynindexedu.com'] },
    { name: 'Kwaku Ampratwum Djarbeng', role: 'Director (Gryn Index Ghana)', photo: 'Kwaku-Ampratwum-Djarbeng.jpg', emails: ['kwaku@grynindexedu.com'] },
    { name: 'Toluwalope Bamidele', role: 'Loughborough University In-Country Manager – West Africa Global Engagement', photo: 'Toluwalope-Bamidele.jpg', emails: [] },
    { name: 'Osagie Charles', role: 'Branch Manager', photo: 'Osagie-Charles.jpg', emails: ['info@grynindexedu.com', 'admission@grynindexedu.com'] },
    { name: 'Bankole Glory', role: 'Human Resource Officer', photo: 'Bankole-1.jpg', emails: ['hr@grynindexedu.com'] },
    { name: 'Festus Susan Uyai', role: 'Relationship Executive', photo: 'Festus-Susan-Uyai.jpg', emails: ['education@grynindexedu.com', 'tees@grynindexedu.com'] },
    { name: 'Ogundeyi Omodolapo', role: 'Relationship Executive', photo: 'Dolapo.jpeg', emails: ['counselor@grynindexedu.com'] },
    { name: 'Margaret Akpan Christopher', role: 'Marketing Officer', photo: 'Akpan.jpeg', emails: ['study@grynindexedu.com'] },
    { name: 'Ejike James', role: 'Admission Officer', photo: 'James.jpeg', emails: ['applications@grynindexedu.com'] },
    { name: 'Priscilla Nana Akua Ankomah', role: 'Student Advisor', photo: 'Priscilla-Nana-Akua-Ankomah.jpg', emails: ['ghana@grynindexedu.com'] },
    { name: 'Felix Happiness Chinonso', role: '', photo: 'happiness.jpeg', emails: ['porthacourt@grynindexedu.com'] },
    { name: 'Juliet James', role: 'Marketing Officer', photo: 'Juliet.jpeg', emails: ['marketing@grynindexedu.com'] },
    { name: 'Kareem Abayomi', role: '', photo: 'Kareem.jpeg', emails: ['recruitment@grynindexedu.com'] },
    { name: 'Ubabuokem Kingson Chinecherem', role: '', photo: 'Uba.jpeg', emails: ['enquiry@grynindexedu.com'] },
    { name: 'Sunday Julius Sasona', role: 'Manager, Service Hub Osogbo', photo: 'Sunday-Julius-Sasona.jpg', emails: [] },
    { name: 'Balogun Itohan', role: 'Ticketing Officer', photo: 'Balogun.jpeg', emails: ['ticketing@grynindexedu.com'] },
    { name: 'Nwobum Ogechukwu', role: '', photo: 'Oge.jpeg', emails: ['ipaja@grynindexedu.com'] },
  ].map((m) => ({ ...m, photo: img(`team/${m.photo}`) })),
}

export const accommodation = {
  heroImage: img('accommodation/Acc1.jpg'),
  title: 'Secure Your Verified Student Accommodation Abroad',
  lede: 'Find Your Ideal Student Residence, built for International Students.',
  note: 'Room availability, prices and booking terms are set by accommodation providers and may change.',
  destinations: [
    { name: 'The United Kingdom', photo: 'Acc2.jpg' },
    { name: 'Canada', photo: 'Acc3-1.jpg' },
    { name: 'United States', photo: 'Acc4.jpg' },
    { name: 'Ireland', photo: 'Acc5.jpg' },
    { name: 'Australia', photo: 'Acc6.jpg' },
    { name: 'Europe', photo: 'Acc8.jpg' },
    { name: 'New Zealand', photo: 'Acc9.jpg' },
  ].map((d) => ({ ...d, photo: img(`accommodation/${d.photo}`) })),
}
