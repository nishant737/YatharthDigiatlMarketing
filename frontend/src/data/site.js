// Single source of truth for business details and per-page SEO.
// Used by the React app (useSeo) and by scripts/prerender.mjs at build time.
// Keep this file free of imports so Node can load it directly.

export const SITE = {
  url: 'https://www.yatharthsocial.com',
  name: 'Yatharth',
  legalName: 'Yatharth Social',
  email: 'info@yatharthsocial.com',
  phones: ['+91-89700-90057', '+91-78997-80057'],
  city: 'Mangaluru',
  cityAlt: 'Mangalore',
  region: 'Karnataka',
  country: 'IN',
  founder: 'Eshwar Shetty',
  logo: '/logo.png',
  ogImage: '/og-yatharth-2026.jpg',
  sameAs: [
    'https://www.instagram.com/yatharthsocial/',
    'https://www.linkedin.com/company/yatharth-social/',
  ],
  areaServed: ['Mangaluru', 'Udupi', 'Dakshina Kannada', 'Udupi District', 'Karnataka', 'India'],
}

export const HOME_SEO = {
  path: '/',
  title: 'Digital Marketing & Web Development Agency in Mangalore | Yatharth',
  description:
    'Yatharth is a digital marketing & website development agency in Mangalore offering social media marketing, Meta & Google Ads, SEO and event marketing.',
}

export const WORK_SEO = {
  path: '/our-work',
  title: 'Our Work: Websites, Social Media, Ads & Events | Yatharth',
  description:
    'Client work by Yatharth, Mangalore: website development, social media & branding, performance marketing and event management projects.',
}

export function caseStudySeo(id, study) {
  const subtitle = study.subtitle.replace(/\s+-\s+/g, ': ')
  return {
    path: `/case-study/${id}`,
    title: caseTitle(toTitle(study.title.split(' – ')[0]), study.category),
    description: truncate(`${subtitle}. ${study.overview}`, 158),
  }
}

function caseTitle(name, category) {
  const full = `${name}: ${category} Case Study | Yatharth`
  return full.length <= 65 ? full : `${name} Case Study | Yatharth Mangalore`
}

function toTitle(t) {
  // "AMATA BUILDING CARE" -> "Amata Building Care"; leaves mixed-case titles alone
  if (t !== t.toUpperCase()) return t
  return t.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
}

export function truncate(text, max) {
  if (text.length <= max) return text
  const cut = text.slice(0, max - 1)
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,.;:\s]+$/, '') + '…'
}
