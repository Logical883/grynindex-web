// Content for the Services page, from the client's final content corrections
// (27 November 2026). Section ids are kept so existing links keep working.
import {
  GraduationCap, School, Stamp, Plane, ShieldCheck,
  Compass, ClipboardCheck, Award, Wallet, MapPinned, CalendarDays,
  IdCard, ScrollText, FileUser, Languages, PenLine, Mail, Briefcase, FilePlus,
  FolderCheck, PiggyBank, Send, MessagesSquare, Stethoscope, PlaneTakeoff,
} from 'lucide-react'
import { img } from './data'

export const serviceSections = [
  {
    id: 'academic-counseling',
    num: '01',
    title: 'Academic Counselling',
    short: 'Get expert guidance to choose the right course, institution, and academic pathway for your future.',
    icon: GraduationCap,
    image: img('Young-Programmer.jpg'),
    lede: 'Our experienced education counsellors provide personalised academic and career guidance to help students identify suitable international education opportunities.',
    question: 'Are you confused about Course, Country, or University selection?',
    body: "We assess each applicant's academic qualifications, professional experience, career aspirations, preferred destination and financial circumstances before recommending appropriate institutions and programmes.",
    listTitle: 'Our academic counselling services include',
    list: [
      { icon: Compass, text: 'Career and academic pathway guidance' },
      { icon: School, text: 'University and programme selection' },
      { icon: ClipboardCheck, text: 'Admission eligibility assessment' },
      { icon: Award, text: 'Scholarship information' },
      { icon: Wallet, text: 'Tuition fee and living expense guidance' },
      { icon: MapPinned, text: 'Study destination comparison' },
      { icon: CalendarDays, text: 'Information on available academic intakes' },
    ],
  },
  {
    id: 'admission-support',
    num: '02',
    title: 'Admission Support',
    short: 'Navigate university applications with professional guidance, from selecting institutions to securing admission.',
    icon: School,
    image: img('box2.jpg'),
    lede: 'We provide comprehensive admission support throughout the university application process. Our services include assessing entry requirements, reviewing supporting documents, assisting with application submissions and monitoring application progress.',
    body: 'Our team maintains regular communication with relevant institutions and recruitment partners to provide applicants with timely updates throughout the admission process.',
    highlightTitle: 'Personal statement support',
    highlight: 'We provide professional guidance and constructive feedback to help applicants develop authentic personal statements that accurately reflect their academic background, career objectives and motivation for their chosen programme.',
    listTitle: 'Depending on your chosen institution and academic programme, commonly requested application documents may include:',
    list: [
      { icon: IdCard, text: 'Valid international passport' },
      { icon: ScrollText, text: 'Academic certificates and transcripts' },
      { icon: FileUser, text: 'Curriculum vitae' },
      { icon: Languages, text: 'Evidence of English language proficiency, where applicable' },
      { icon: PenLine, text: 'Personal statement or statement of purpose' },
      { icon: Mail, text: 'Academic or professional references' },
      { icon: Briefcase, text: 'Evidence of employment or professional experience, where required' },
      { icon: FilePlus, text: 'Additional programme-specific supporting documents' },
    ],
  },
  {
    id: 'visa-application',
    num: '03',
    title: 'Visa Application',
    short: 'Get guided support with student visa requirements, documentation, application processes, and interview preparation.',
    icon: Stamp,
    image: img('Working-from-Home.jpg'),
    lede: 'We provide professional student visa application support, including guidance on documentation, financial evidence, application forms, credibility interview preparation and relevant immigration requirements.',
    body: 'Our team supports applicants in preparing accurate and complete applications while promoting honesty, transparency and compliance throughout the visa application process.',
    note: 'Visa decisions remain solely at the discretion of the relevant embassy or immigration authority.',
    listTitle: 'Services include',
    list: [
      { icon: FolderCheck, text: 'Visa document assessment' },
      { icon: PiggyBank, text: 'Financial documentation guidance' },
      { icon: Send, text: 'Visa application support' },
      { icon: MessagesSquare, text: 'Credibility and visa interview preparation' },
      { icon: Stethoscope, text: 'Medical examination guidance, where applicable' },
      { icon: ShieldCheck, text: 'Immigration compliance guidance' },
      { icon: PlaneTakeoff, text: 'Pre-departure preparation' },
    ],
  },
  {
    id: 'flight-offers',
    num: '04',
    title: 'Flight and Travel Assistance',
    short: 'We assist students in exploring suitable flight options and preparing for their international travel.',
    icon: Plane,
    image: img('Airplane-Flying.jpg'),
    lede: 'We assist students in exploring suitable flight options and preparing for their international travel. Flight availability and prices depend on the destination, travel dates, airline and prevailing market conditions.',
  },
]

export const compliance = {
  id: 'industry-compliance',
  num: '05',
  title: 'Industry Compliance',
  short: 'Ethical recruitment, professional integrity and responsible student counselling.',
  icon: ShieldCheck,
  image: img('compliance.jpg'),
  lede: 'At Gryn Index, ethical recruitment, professional integrity and responsible student counselling are fundamental to our operations.',
  statement: 'We are committed to providing accurate information, transparent communication and professional support throughout the international education process.',
  quote: 'We adhere to the National Code of Ethical Practice',
  body: 'Our team prioritises applicant confidentiality, responsible data handling, authentic documentation and adherence to applicable institutional and immigration requirements.',
  badges: [
    { name: 'British Council-Trained Education Counsellors', src: img('british-council.png') },
    { name: 'ICEF Agency Status', src: img('icef-badge.png') },
    { name: 'ABCC', src: img('abcc.png') },
  ],
}

export const pageIndex = [...serviceSections, compliance]
