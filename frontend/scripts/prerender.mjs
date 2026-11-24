// Post-build step: writes a real HTML file for every route so search engines and
// AI crawlers (which often don't run JavaScript) see each page's own title,
// description, canonical URL, structured data and text content.
//
// The content goes inside <div id="root">; React replaces it as soon as the app
// mounts, so visitors see the normal site. Also writes sitemap.xml and llms.txt.
//
// Run automatically by `npm run build` (see package.json).

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { SITE, HOME_SEO, WORK_SEO, caseStudySeo } from '../src/data/site.js'
import { CASE_STUDIES } from '../src/data/caseStudies.js'
import { FAQS } from '../src/data/faqs.js'
import { SERVICES, WORK_CLIENTS } from '../src/data/workByService.js'

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const DIST = path.join(ROOT, 'dist')
const TEMPLATE = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8')
const TODAY = new Date().toISOString().slice(0, 10)
const abs = p => SITE.url + p

// ── Services offered (home page copy + schema) ───────────────────────────────
const OFFERINGS = [
  {
    name: 'Website Development',
    text: 'Fast, mobile-first websites built for search and conversions, including booking systems, analytics (Google Analytics 4, Microsoft Clarity) and technical SEO.',
  },
  {
    name: 'Social Media Marketing & Branding',
    text: 'Brand identity, content planning, reels, photography and day-to-day management of Instagram and Facebook for businesses in Mangalore and across Karnataka.',
  },
  {
    name: 'Performance Marketing (Meta & Google Ads)',
    text: 'Targeted Facebook, Instagram and Google ad campaigns with audience research, creative testing and conversion tracking, focused on enquiries and bookings.',
  },
  {
    name: 'SEO Services',
    text: 'Keyword research, on-page and technical SEO, local search optimisation and content strategy to help Mangalore businesses get found on Google.',
  },
  {
    name: 'Event Marketing & Management',
    text: 'Event branding, promotion, collateral and on-ground activation, from conferences and launches to cultural events.',
  },
  {
    name: 'Content, Reels & Video Production',
    text: 'Scroll-stopping reels, videography, copywriting and creative direction that give a brand a consistent voice.',
  },
]

// ── Helpers ──────────────────────────────────────────────────────────────────
const esc = s => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const jsonLd = obj =>
  `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`

function setTag(html, re, replacement) {
  if (!re.test(html)) throw new Error(`prerender: template is missing ${re}`)
  return html.replace(re, replacement)
}

// Splits "Name: description" bullet points used in the case studies.
function splitPoint(p) {
  const i = p.indexOf(': ')
  return i > 0 && i < 70 ? [p.slice(0, i), p.slice(i + 2)] : [null, p]
}

const STYLE = `<style>
.pr{background:#0b0b0b;color:#e8e4dc;font:16px/1.65 Inter,system-ui,sans-serif;min-height:100vh;padding:clamp(24px,6vw,80px) clamp(16px,6vw,100px)}
.pr a{color:#DB6436}.pr h1{font-size:clamp(1.8rem,4vw,3rem);line-height:1.15;margin:.4em 0}
.pr h2{font-size:1.3rem;margin:2em 0 .6em}.pr h3{font-size:1.05rem;margin:1.2em 0 .3em}
.pr p,.pr li,.pr dd{color:#b9b4ab;max-width:780px}.pr nav a{margin-right:18px}
.pr dt{font-weight:600;margin-top:1em}.pr dd{margin:0}
.pr-cover{position:fixed;inset:0;z-index:2147483647;background:#0a0806;display:flex;align-items:center;justify-content:center}
.pr-cover img{width:min(220px,50vw);height:auto;filter:brightness(0) invert(1);opacity:.9}
html:has(.pr-cover){overflow:hidden;background:#0a0806}
</style>`

// Visitors never see the crawler text: this splash matches the React
// LoadingScreen and sits on top until React mounts and replaces #root.
const COVER = `<div class="pr-cover" aria-hidden="true"><img src="/logo.png" alt="" width="600" height="335"></div>`

const NAV = `<nav aria-label="Main"><a href="/">Home</a><a href="/our-work">Our work</a><a href="/#faq">FAQ</a><a href="/#contact">Contact</a></nav>`

const CONTACT = `<section><h2>Contact Yatharth</h2>
<p>Yatharth, ${esc(SITE.city)} (${esc(SITE.cityAlt)}), ${esc(SITE.region)}, India.</p>
<p>Phone: ${SITE.phones.map(p => `<a href="tel:${p.replace(/-/g, '')}">${esc(p.replace(/-/g, ' '))}</a>`).join(' · ')}<br>
Email: <a href="mailto:${SITE.email}">${SITE.email}</a></p></section>`

// ── Structured data ──────────────────────────────────────────────────────────
const ORG_ID = abs('/#organization')

const ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': ORG_ID,
  name: SITE.name,
  alternateName: SITE.legalName,
  url: abs('/'),
  logo: abs(SITE.logo),
  image: abs(SITE.ogImage),
  description: HOME_SEO.description,
  email: SITE.email,
  telephone: SITE.phones[0],
  address: {
    '@type': 'PostalAddress',
    addressLocality: SITE.city,
    addressRegion: SITE.region,
    addressCountry: SITE.country,
  },
  areaServed: SITE.areaServed.map(name => ({ '@type': 'Place', name })),
  founder: { '@type': 'Person', name: SITE.founder },
  sameAs: SITE.sameAs,
  contactPoint: SITE.phones.map(telephone => ({
    '@type': 'ContactPoint', telephone, contactType: 'sales', areaServed: 'IN', availableLanguage: ['en', 'kn'],
  })),
  knowsAbout: [
    'Digital marketing', 'Website development', 'Social media marketing', 'Branding',
    'Performance marketing', 'Meta Ads', 'Google Ads', 'SEO', 'Event marketing', 'Video production',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Digital marketing services in Mangalore',
    itemListElement: OFFERINGS.map(o => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: o.name, description: o.text, areaServed: SITE.city },
    })),
  },
}

const breadcrumb = items => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, p], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(p) })),
})

// ── Page renderer ────────────────────────────────────────────────────────────
function renderPage({ seo, schemas, body }) {
  const url = abs(seo.path)
  let html = TEMPLATE
  html = setTag(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(seo.title)}</title>`)
  html = setTag(html, /<meta name="description"[^>]*>/, `<meta name="description" content="${esc(seo.description)}" />`)
  html = setTag(html, /<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`)
  html = setTag(html, /<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}" />`)
  html = setTag(html, /<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(seo.title)}" />`)
  html = setTag(html, /<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${esc(seo.description)}" />`)
  html = setTag(html, /<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${esc(seo.title)}" />`)
  html = setTag(html, /<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${esc(seo.description)}" />`)
  html = html.replace('</head>', `    ${schemas.map(jsonLd).join('\n    ')}\n  </head>`)
  html = setTag(html, /<div id="root"><\/div>/, `<div id="root">${STYLE}${COVER}<div class="pr">${NAV}${body}</div></div>`)
  return html
}

function write(route, html) {
  // /our-work -> our-work.html, served at /our-work by Vercel's cleanUrls
  const file = route === '/' ? path.join(DIST, 'index.html') : path.join(DIST, `${route.slice(1)}.html`)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, html)
}

const caseIds = Object.keys(CASE_STUDIES)

// ── Home ─────────────────────────────────────────────────────────────────────
write('/', renderPage({
  seo: HOME_SEO,
  schemas: [
    ORGANIZATION,
    { '@context': 'https://schema.org', '@type': 'WebSite', '@id': abs('/#website'), url: abs('/'), name: SITE.name, publisher: { '@id': ORG_ID }, inLanguage: 'en-IN' },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
  body: `<main>
<h1>Digital Marketing &amp; Website Development Agency in Mangalore</h1>
<p>Yatharth is a digital marketing and website development agency based in ${esc(SITE.city)} (${esc(SITE.cityAlt)}), Karnataka, founded by ${esc(SITE.founder)}. We help businesses in Mangalore, Udupi and across India build their brand and grow online through social media marketing, performance marketing, SEO, websites and event marketing.</p>
<section><h2>Our services</h2>
${OFFERINGS.map(o => `<h3>${esc(o.name)}</h3><p>${esc(o.text)}</p>`).join('\n')}
</section>
<section><h2>Selected work</h2><ul>
${caseIds.map(id => `<li><a href="/case-study/${id}">${esc(CASE_STUDIES[id].title)}</a>: ${esc(CASE_STUDIES[id].subtitle)}</li>`).join('\n')}
</ul><p><a href="/our-work">See our work by service</a></p></section>
<section id="faq"><h2>Frequently asked questions</h2><dl>
${FAQS.map(f => `<dt>${esc(f.q)}</dt><dd>${esc(f.a)}</dd>`).join('\n')}
</dl></section>
${CONTACT}
</main>`,
}))

// ── Our work by service ──────────────────────────────────────────────────────
write(WORK_SEO.path, renderPage({
  seo: WORK_SEO,
  schemas: [
    ORGANIZATION,
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: WORK_SEO.title,
      url: abs(WORK_SEO.path),
      description: WORK_SEO.description,
      about: { '@id': ORG_ID },
    },
    breadcrumb([['Home', '/'], ['Our work', WORK_SEO.path]]),
  ],
  body: `<main>
<h1>Our work, by service</h1>
<p>${esc(WORK_SEO.description)}</p>
${SERVICES.map(s => `<section><h2>${esc(s.label)}</h2><p>${esc(s.blurb)}</p><ul>
${s.clients.map(id => `<li><a href="/case-study/${id}">${esc(WORK_CLIENTS[id].name)}</a>: ${esc(WORK_CLIENTS[id].line)}</li>`).join('\n')}
</ul></section>`).join('\n')}
${CONTACT}
</main>`,
}))

// ── Case studies ─────────────────────────────────────────────────────────────
for (const id of caseIds) {
  const s = CASE_STUDIES[id]
  const seo = caseStudySeo(id, s)
  write(seo.path, renderPage({
    seo,
    schemas: [
      ORGANIZATION,
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: `${s.title}: ${s.subtitle}`.slice(0, 110),
        description: seo.description,
        url: abs(seo.path),
        image: abs(SITE.ogImage),
        author: { '@id': ORG_ID },
        publisher: { '@id': ORG_ID },
        about: s.category,
        inLanguage: 'en-IN',
      },
      breadcrumb([['Home', '/'], ['Our work', '/our-work'], [s.title, seo.path]]),
    ],
    body: `<main><article>
<p><a href="/">Home</a> › <a href="/our-work">Our work</a> › ${esc(s.title)}</p>
<h1>${esc(s.title)}</h1>
<p>${esc(s.subtitle)}</p>
<p>${esc(s.category)} · ${esc(s.tag)} · ${esc(s.year)}</p>
${s.website ? `<p>Live website: <a href="${esc(s.website)}" rel="noopener">${esc(s.website.replace(/^https?:\/\//, ''))}</a></p>` : ''}
<h2>Overview</h2><p>${esc(s.overview)}</p>
<h2>The challenge</h2><p>${esc(s.challenge)}</p>
${s.solution ? `<h2>Our approach</h2><p>${esc(s.solution)}</p>` : ''}
<h2>What we did</h2><ul>
${(s.solutionPoints || []).map(p => { const [h, t] = splitPoint(p); return `<li>${h ? `<strong>${esc(h)}:</strong> ` : ''}${esc(t)}</li>` }).join('\n')}
</ul>
${s.results ? `<h2>Results</h2><p>${esc(s.results)}</p>` : ''}
<p>Want similar results? Yatharth is a digital marketing and website development agency in Mangalore. <a href="/#contact">Get in touch</a>.</p>
</article>
${CONTACT}
</main>`,
  }))
}

// ── sitemap.xml ──────────────────────────────────────────────────────────────
const routes = [
  ['/', '1.0', 'weekly'],
  [WORK_SEO.path, '0.8', 'monthly'],
  ...caseIds.map(id => [`/case-study/${id}`, '0.7', 'monthly']),
]
fs.writeFileSync(path.join(DIST, 'sitemap.xml'),
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(([p, pr, cf]) => `  <url>
    <loc>${abs(p)}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${cf}</changefreq>
    <priority>${pr}</priority>
  </url>`).join('\n')}
</urlset>
`)

// ── llms.txt (summary for AI assistants / answer engines) ────────────────────
fs.writeFileSync(path.join(DIST, 'llms.txt'),
`# ${SITE.name}

> ${HOME_SEO.description}

${SITE.name} (also known as ${SITE.legalName}) is a digital marketing and website development agency based in ${SITE.city} (${SITE.cityAlt}), ${SITE.region}, India, founded by ${SITE.founder}. It serves businesses in Mangalore, Udupi, Dakshina Kannada and across India.

## Contact
- Website: ${abs('/')}
- Email: ${SITE.email}
- Phone: ${SITE.phones.join(', ')}
- Location: ${SITE.city}, ${SITE.region}, India
${SITE.sameAs.map(u => `- ${u}`).join('\n')}

## Services
${OFFERINGS.map(o => `- ${o.name}: ${o.text}`).join('\n')}

## Case studies
${caseIds.map(id => `- [${CASE_STUDIES[id].title}](${abs('/case-study/' + id)}): ${CASE_STUDIES[id].subtitle}`).join('\n')}

## Work by service
${SERVICES.map(s => `- ${s.label}: ${s.clients.map(id => WORK_CLIENTS[id].name).join(', ')}`).join('\n')}

## Frequently asked questions
${FAQS.map(f => `### ${f.q}\n${f.a}`).join('\n\n')}
`)

console.log(`prerender: wrote ${routes.length} pages, sitemap.xml and llms.txt`)
