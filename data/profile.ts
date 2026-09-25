// =============================================================================
// Single source of truth for the portfolio content.
// Real data first; any authored copy is marked with a NOTE comment below.
// =============================================================================

export const profile = {
  name: 'Hamza Beizig',
  role: 'Software Engineer · Full-Stack Developer',
  location: 'Monastir, Tunisia',
  timezone: 'UTC+1',
  email: 'beizig.hamza@gmail.com',
  phone: '+216 54 023 799',
  linkedin: 'https://www.linkedin.com/in/hamza-beizig-software-engineer/',
  avatar: '/hamza-profile.png',
  available: true,
  stats: { years: '3+', countries: ['TN', 'FR', 'LU', 'CH'] as const, companies: 7 },
  ai: ['OpenAI', 'Claude', 'DeepSeek'] as const,
} as const

export const heroChat = {
  question: 'Does Hamza work with AI?',
  answer: 'Yes — he integrates LLMs and AI agents into web apps.',
}

export const companies = [
  'DIGCODER',
  'ALLIANCE',
  'NEOFACTO',
  'IMMO360',
  'MOODLAB',
  'CARHABTEK',
  'COSOFTIT',
] as const

// Optional grayscale logos when present in /public
export const companyLogos: Record<string, string> = {
  DIGCODER: '/logo-digcoder.png',
  ALLIANCE: '/logo-alliance.png',
  NEOFACTO: '/logo-neofacto.png',
  IMMO360: '/logo-immo360.png',
  CARHABTEK: '/logo-carhabtek.png',
}

export const stats = [
  { value: '3+', label: 'Years of experience' },
  { value: '4', label: 'Countries', countries: ['TN', 'FR', 'LU', 'CH'] },
  { value: '7', label: 'Companies worked with' },
]

export const services = [
  {
    title: 'Full-Stack Development',
    text: 'Intuitive UIs and optimized back-end systems for a smooth user experience.',
  },
  {
    title: 'AI & Agents Integration',
    text: 'LLMs, prompt engineering and AI agents (OpenAI, Claude, DeepSeek) to build intelligent, automated solutions.',
    featured: true,
    chips: ['OpenAI API', 'Claude API', 'DeepSeek', 'Prompt Engineering'],
  },
  {
    title: 'Performance & UX',
    text: 'Optimizing apps and leveraging data to enhance web performance and UX.',
  },
  {
    title: 'Testing & Quality',
    text: 'Automated tests and code reviews to ensure quality, reliability and performance.',
  },
]

export type CountryCode = 'TN' | 'FR' | 'LU' | 'CH'

export const education = [
  {
    id: 'esprit',
    kind: 'education' as const,
    school: 'Esprit School of Engineering',
    degree: 'Engineering Degree in Software Development',
    start: '2020-09',
    end: '2023-06',
    country: 'TN' as CountryCode,
    summary:
      'Specialized in full-stack development, software architecture, and modern development practices.',
  },
  {
    id: 'isimm',
    kind: 'education' as const,
    school: 'ISIMM — Higher Institute of Computer Science and Mathematics of Monastir',
    degree: "Bachelor's Degree in Computer Sciences",
    start: '2017-09',
    end: '2020-06',
    country: 'TN' as CountryCode,
    summary: 'Foundation in computer science principles and programming fundamentals.',
  },
]

export const experience = [
  {
    id: 'digcoder',
    kind: 'experience' as const,
    current: true,
    title: 'Fullstack Developer',
    company: 'DIGCODER',
    location: 'Monastir, Tunisia',
    start: '2024-01',
    end: null,
    countries: ['TN', 'FR'] as CountryCode[],
    project: 'Easy By Exceliances (France)',
    bullets: [
      'Built REST APIs with Spring Boot, integrating business processing pipelines with low-latency data exchange',
      'Created reusable Angular components and AI-driven interfaces to accelerate frontend development cycles',
      'Conducted code reviews and resolved critical anomalies, ensuring production stability',
      'Collaborated with Product Owner and Designer to align functional, UX and delivery goals',
    ],
    labels: ['APIs', 'Front-end', 'Quality', 'Collaboration'],
    tags: ['Spring Boot', 'Angular', 'AI', 'Agile'],
  },
  {
    id: 'alliance-fs',
    kind: 'experience' as const,
    title: 'Fullstack Developer',
    company: 'ALLIANCE',
    location: 'Sousse, Tunisia',
    start: '2023-05',
    end: '2023-12',
    countries: ['TN'] as CountryCode[],
    project: 'EasyScope (Tunisia)',
    bullets: [
      'Designed backend architectures with Spring Boot, optimizing stability and performance of business services',
      'Built reactive and intuitive Angular interfaces with AI tools integration to enhance user experience',
      'Proactive diagnostics and targeted fixes ensuring continuity and reliability in production',
      'Wrote detailed technical guides to accelerate team onboarding',
    ],
    labels: ['Architecture', 'Front-end', 'Reliability', 'Docs'],
    tags: ['Spring Boot', 'Angular', 'AI'],
  },
  {
    id: 'neofacto',
    kind: 'experience' as const,
    title: 'Fullstack Developer (Intern)',
    company: 'NEOFACTO',
    location: 'Esch-sur-Alzette, Luxembourg',
    start: '2022-10',
    end: '2023-04',
    countries: ['LU'] as CountryCode[],
    project: 'Perikles (Luxembourg)',
    bullets: [
      'Developed smart contracts and secure backend services in a blockchain environment',
      'Optimized Web3 platform performance, reducing observed latencies',
      'Collaborated in an international Agile team to deliver critical features on time',
    ],
    labels: ['Blockchain', 'Performance', 'Teamwork'],
    tags: ['Solidity', 'Web3', 'Agile'],
  },
  {
    id: 'alliance-web',
    kind: 'experience' as const,
    title: 'Web Developer',
    company: 'ALLIANCE',
    location: 'Sousse, Tunisia',
    start: '2021-08',
    end: '2022-09',
    countries: ['TN', 'CH'] as CountryCode[],
    project: 'Carhabtek & Ayo Prestige Tour (Tunisia) — BeautifyMe & Immo360 (Switzerland)',
    bullets: [
      'Developed custom websites for multiple clients ensuring performance and stability',
      'SEO optimization increasing visibility and organic traffic',
      'Conducted technical audits improving UX and overall quality',
    ],
    labels: ['Websites', 'SEO', 'Audits'],
    tags: ['WordPress', 'SEO', 'PHP'],
  },
  {
    id: 'cosoft',
    kind: 'experience' as const,
    title: 'Web & Mobile Developer (Intern)',
    company: 'COSOFT-IT',
    location: 'Monastir, Tunisia',
    start: '2020-03',
    end: '2020-06',
    countries: ['TN'] as CountryCode[],
    project: 'AlloDoctor (Tunisia)',
    bullets: [
      'Designed and developed a web and mobile app to simplify appointment booking',
      'Implemented key modules (scheduling, profiles, notifications) improving user experience',
      'Continuous performance and stability improvements',
    ],
    labels: ['Product', 'Features', 'Performance'],
    tags: ['Web', 'Mobile'],
  },
]

// Journey KPIs
export const journeyKpis = [
  { value: '2017', label: 'Started in CS' },
  { value: '2', label: 'Degrees' },
  { value: '5', label: 'Roles' },
  { value: 'TN · FR · LU · CH', label: 'Countries' },
]

// Periodic table of the stack
export type Family = 'ai' | 'lang' | 'front' | 'back' | 'data' | 'tools' | 'design'

export const familyMeta: Record<Family, { label: string; color: string }> = {
  ai: { label: 'AI & LLMs', color: 'var(--fam-ai)' },
  lang: { label: 'Languages', color: 'var(--fam-lang)' },
  front: { label: 'Front-end', color: 'var(--fam-front)' },
  back: { label: 'Back-end', color: 'var(--fam-back)' },
  data: { label: 'Databases', color: 'var(--fam-data)' },
  tools: { label: 'Workflow', color: 'var(--fam-tools)' },
  design: { label: 'Design & CMS', color: 'var(--fam-design)' },
}

export const stack: [string, string, Family][] = [
  ['Oa', 'OpenAI API', 'ai'],
  ['Cl', 'Claude API', 'ai'],
  ['Ds', 'DeepSeek', 'ai'],
  ['Pe', 'Prompt Engineering', 'ai'],
  ['Ag', 'AI Agents', 'ai'],
  ['Jv', 'Java', 'lang'],
  ['Ts', 'TypeScript', 'lang'],
  ['Js', 'JavaScript', 'lang'],
  ['Ph', 'PHP', 'lang'],
  ['So', 'Solidity', 'lang'],
  ['Nx', 'Next.js', 'front'],
  ['Re', 'React', 'front'],
  ['Ng', 'Angular', 'front'],
  ['Ht', 'HTML', 'front'],
  ['Cs', 'CSS', 'front'],
  ['Bs', 'Bootstrap', 'front'],
  ['Sb', 'Spring Boot', 'back'],
  ['Hb', 'Hibernate', 'back'],
  ['Nd', 'Node.js', 'back'],
  ['Ra', 'REST APIs', 'back'],
  ['W3', 'Web3', 'back'],
  ['Ju', 'JUnit', 'back'],
  ['Mo', 'Mocha.js', 'back'],
  ['Pg', 'PostgreSQL', 'data'],
  ['My', 'MySQL', 'data'],
  ['Mg', 'MongoDB', 'data'],
  ['N4', 'Neo4j', 'data'],
  ['Gh', 'GitHub', 'tools'],
  ['Gl', 'GitLab', 'tools'],
  ['Ji', 'Jira', 'tools'],
  ['Cf', 'Confluence', 'tools'],
  ['Tr', 'Trello', 'tools'],
  ['Sc', 'Scrum', 'tools'],
  ['Fg', 'Figma', 'design'],
  ['Xd', 'Adobe XD', 'design'],
  ['Um', 'UML', 'design'],
  ['Dp', 'Design Patterns', 'design'],
  ['Wp', 'WordPress', 'design'],
]

export const softSkills = ['Collaboration', 'Problem-solving', 'Adaptability', 'Communication']

// Selected work — real projects from the previous portfolio.
// NOTE: `description` lines are authored (sober, domain-accurate) — not sourced.
export const projects = [
  {
    title: 'Easy By Exceliances',
    type: 'Web App',
    image: '/project-easy.png',
    tech: ['Java', 'Angular', 'Spring Boot', 'REST API', 'MySQL'],
    url: 'https://easy.exceliances.fr/',
    description:
      'Business platform for a French client — Spring Boot REST APIs and reusable Angular interfaces with AI-assisted workflows.',
    featured: true,
  },
  {
    title: 'Expert En Conseil',
    type: 'Website',
    image: '/project-expertenconseil-v2.png',
    tech: ['WordPress', 'PHP', 'MySQL'],
    url: 'https://expertenconseil.com/',
    description: 'Corporate website with SEO-optimized content and a maintainable CMS.',
  },
  {
    title: 'Exceliances',
    type: 'Website',
    image: '/project-exceliances.png',
    tech: ['WordPress', 'PHP', 'MySQL'],
    url: 'http://exceliances.fr/',
    description: 'Company website delivering a clean, responsive brand experience.',
  },
  {
    title: 'AyoCocktails',
    type: 'Web App',
    image: '/project-ayococktails.png',
    tech: ['Next.js', 'TypeScript', 'Node.js', 'MongoDB'],
    url: 'https://ayococktails.com/',
    description:
      'Cocktail catalogue & management platform — searchable menu, alcohol/no-alcohol filtering, and an admin dashboard for establishments.',
  },
  {
    title: 'BeautifyMe',
    type: 'Website',
    image: '/project-beautifyme.png',
    tech: ['WordPress', 'PHP', 'MySQL'],
    url: 'https://beautifyme.ch/',
    description: 'Swiss aesthetic-clinic website with online booking and a refined, responsive layout.',
  },
  {
    title: 'Digcoder',
    type: 'Website',
    image: '/project-digcoder-v2.png',
    tech: ['Nuxt.js', 'JavaScript', 'Bootstrap'],
    url: 'https://digcoder.com/',
    description: 'Agency site built with Nuxt for fast, SEO-friendly rendering.',
  },
]

// Testimonials — real people from the previous portfolio.
// NOTE: roles are authored (not present in previous data); flagged for validation.
export const testimonials = [
  {
    name: 'Moez Douss',
    role: 'Collaborator',
    avatar: '/moez-douss.png',
    accent: 'exceptional',
    quote:
      'Hamza is an exceptional developer, and our collaboration on numerous projects has consistently been successful. His technical skills, professionalism, and communication are top-notch.',
  },
  {
    name: 'Cheima Elhaj',
    role: 'Project Partner',
    avatar: '/cheima-elhaj.png',
    accent: 'exceptional',
    quote:
      'Hamza delivered exceptional work, enhancing my projects with his outstanding development skills. His technical expertise, professionalism, and clear communication set him apart.',
  },
  {
    name: 'Lejla Dogu',
    role: 'Collaborator',
    avatar: '/lejla-dogu.png',
    accent: 'remarkable',
    quote:
      'Collaborating with Hamza has been truly remarkable and inspiring. His exceptional expertise and seamless communication have consistently ensured our success.',
  },
  {
    name: 'Walid Majdoub',
    role: 'Project Partner',
    avatar: '/walid-majdoub.jpg',
    accent: 'invaluable',
    quote:
      'Partnering with Hamza was invaluable — he turned complex requirements into clean, reliable solutions and kept every milestone on track. Sharp, dependable, and a real pleasure to build with.',
  },
]

export const contactTopics = ['Full-time role', 'Freelance', 'AI integration', 'Other']

export const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#journey', label: 'Journey' },
  { href: '#stack', label: 'Stack' },
  { href: '#work', label: 'Work' },
  { href: '#contact', label: 'Contact' },
]

// Map — reuse the existing embed (Monastir, Tunisia). No API config changed.
export const mapEmbedUrl =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12865.598627820896!2d10.822170000000001!3d35.75657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13002e2e2e2e2e2f%3A0x2e2e2e2e2e2e2e2e!2sMonastir%2C%20Tunisia!5e0!3m2!1sen!2stn!4v1234567890123!5m2!1sen!2stn'

export const suggestedQuestions = [
  "What are Hamza's technical skills?",
  "What is Hamza's work experience?",
  'Does Hamza work with AI?',
]

export const countryFlags: Record<CountryCode, string> = {
  TN: '🇹🇳',
  FR: '🇫🇷',
  LU: '🇱🇺',
  CH: '🇨🇭',
}
