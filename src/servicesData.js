// Content for the Services page. All copy comes from the company's current
// "Our Services" page; it is only regrouped into sections here.
import {
  GraduationCap, School, Stamp, Plane, ShieldCheck,
  BookOpen, Landmark, Award, Wallet,
  IdCard, ScrollText, FileUser, Languages, PenLine, Mail,
  FolderCheck, Stethoscope, Send, BedDouble,
  MousePointerClick, PiggyBank, MapPinned,
} from 'lucide-react'
import { img } from './data'

export const serviceSections = [
  {
    id: 'academic-counseling',
    num: '01',
    title: 'Academic Counseling',
    short: 'Course, country and university choices made with an expert.',
    icon: GraduationCap,
    image: img('Young-Programmer.jpg'),
    lede: 'Our academic counseling service is designed to provide personalized guidance and support to help you make informed decisions about your educational journey.',
    question: 'Are you confused about Course, Country, or University selection?',
    body: 'Our experienced counselors will assess your academic background, interests, and goals to recommend suitable study options. We discuss your academic/career history and offer you the best study options. We provide insights into various academic programs, assist in course selection, and offer advice on enhancing your academic profile.',
    listTitle: 'We provide concise information not limited to',
    list: [
      { icon: BookOpen, text: 'Study programs/course of study' },
      { icon: Landmark, text: 'Ideal Universities/Colleges' },
      { icon: Award, text: 'Scholarship offers' },
      { icon: Wallet, text: 'Cost of living at study destinations' },
    ],
  },
  {
    id: 'admission-support',
    num: '02',
    title: 'Admission Support',
    short: 'A compelling application package, followed through to a decision.',
    icon: School,
    image: img('box2.jpg'),
    lede: 'Our admission support service is tailored to streamline the university application process and maximize your chances of acceptance.',
    body: 'We work closely with you to create a compelling application package, including assistance with filling out application forms, crafting impactful personal statements or essays, and organizing supporting documents. Our team ensures that your application showcases your strengths and aligns with the requirements of your desired universities.',
    highlight: 'Beyond the applications, we follow through with the Universities to ensure a speedy response to your applications.',
    listTitle: 'You will need to provide these documents for your applications',
    list: [
      { icon: IdCard, text: 'International passport/bio-data page' },
      { icon: ScrollText, text: 'Previous academic certificates and transcripts' },
      { icon: FileUser, text: 'Curriculum vitae' },
      { icon: Languages, text: 'Proof of language proficiency' },
      { icon: PenLine, text: 'Statement of purpose/letter of intent/motivation letter' },
      { icon: Mail, text: 'Reference letters (academic and work)' },
    ],
  },
  {
    id: 'visa-application',
    num: '03',
    title: 'Visa Application',
    short: 'Requirements, documents and forms, handled step by step.',
    icon: Stamp,
    image: img('Working-from-Home.jpg'),
    lede: 'Navigating the visa application process can be complex and time-consuming. Our visa application service is designed to simplify this process for you.',
    body: 'Our experts will guide you through the visa requirements, help you gather the necessary documents, and provide guidance on filling out visa application forms accurately.',
    highlight: 'We aim to make the visa application process smooth and stress-free, ensuring you are well-prepared for your study abroad journey.',
    listTitle: 'We provide information to help you',
    list: [
      { icon: FolderCheck, text: 'Prepare the documents for your visa application' },
      { icon: Stethoscope, text: 'Get dates for your medical tests' },
      { icon: Send, text: 'Visa application and submission' },
      { icon: BedDouble, text: 'Explore accommodation options at your study destination' },
    ],
  },
  {
    id: 'flight-offers',
    num: '04',
    title: 'Amazing Flight Offers',
    short: 'Competitive fares to your dream destination.',
    icon: Plane,
    image: img('Airplane-Flying.jpg'),
    lede: 'Are you in search of an economical and trouble-free flight experience? Look no further!',
    pull: 'We recognize the value of your hard-earned money.',
    body: 'That’s why our dedicated team of travel experts scours the skies for the most competitive flight deals. Our fantastic flight offers will get you to your dream destination without straining your wallet.',
    listTitle: 'Why opt for us?',
    list: [
      { icon: MousePointerClick, text: 'Effortless booking process' },
      { icon: PiggyBank, text: 'Wallet-friendly prices' },
      { icon: MapPinned, text: 'Maximize your travels while minimizing expenses' },
    ],
  },
]

export const compliance = {
  id: 'industry-compliance',
  num: '05',
  title: 'Industry Compliance',
  short: 'British Council, ICEF and ABCC certified.',
  icon: ShieldCheck,
  image: img('compliance.jpg'),
  lede: 'At Gryn Index Initiative, we don’t just promise quality we prove it. Every member of our team operates to the highest international standards, backed by globally recognized certifications that protect you, your application, and your future.',
  statement: 'We are proud to be a British Council Certified, ICEF Certified, and ABC Certified agency.',
  quote: 'We adhere to the National Code of Ethical Practice',
  body: 'These credentials aren’t just badges; they are your guarantee that you are working with a fully compliant, professionally regulated education consultancy that understands the intricate details of global admissions and visa compliance.',
  badges: [
    { name: 'British Council Certified', src: img('british-council.png') },
    { name: 'ICEF Accredited Agency', src: img('icef-badge.png') },
    { name: 'ABCC Certified', src: img('abcc.png') },
  ],
}

export const pageIndex = [...serviceSections, compliance]
