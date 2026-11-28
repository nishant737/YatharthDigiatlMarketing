// Which clients appear under each service on /our-work.
// Shared by WorkByServicePage and the build-time prerender script.
export const WORK_CLIENTS = {
  'goldfinch': { name: 'Goldfinch Mangaluru', line: 'Social media and ad campaigns that drove more hotel bookings' },
  'ms-developers': { name: 'MS Developers', line: 'Villa website with CRM-integrated lead capture, social media and ads' },
  'vaibhav-veda': { name: 'Vaibhav Veda Green Ventures', line: 'Next.js website with SEO, AEO and GEO for a multi-vertical enterprise' },
  'alvas-schools': { name: "Alva's Schools", line: 'Admission campaigns and social media that drove calls from parents' },
  'radiance':   { name: 'Radiance by Hotel Roopa', line: 'Brand built from scratch, with a booking-integrated website' },
  'olive':      { name: 'Olive',                   line: 'Website development with analytics and SEO set-up' },
  'koin-home':  { name: 'Koin Home',               line: 'Social media and brand storytelling for Korean hospitality' },
  'amata-building-care': { name: 'AMATA Building Care', line: 'Social media, creative design and event branding' },
  'eta':        { name: 'ETA Logistics',           line: 'Long-term social media management and brand building' },
  'village':    { name: 'Village Family Restaurant', line: 'Menu and bucket biryani packaging designed from scratch' },
  'bolpu':      { name: 'BOLPU',                   line: 'Brand positioning and founder storytelling for a startup program' },
  'net-zero':   { name: 'Net Zero Vision',         line: 'Event marketing and activation for a sustainability initiative' },
}

export const SERVICES = [
  {
    key: 'website',
    label: 'Website',
    blurb: 'Fast, conversion-focused websites, from booking systems to analytics and SEO.',
    clients: ['vaibhav-veda', 'ms-developers', 'radiance', 'olive'],
  },
  {
    key: 'social',
    label: 'Social Media & Branding',
    blurb: 'Brand identities and social presence built to be recognised and remembered.',
    clients: ['ms-developers', 'goldfinch', 'radiance', 'alvas-schools', 'koin-home', 'amata-building-care', 'eta', 'village', 'bolpu'],
  },
  {
    key: 'performance',
    label: 'Performance Marketing',
    blurb: 'Targeted ad campaigns that turn attention into enquiries and bookings.',
    clients: ['alvas-schools', 'goldfinch', 'ms-developers', 'radiance'],
  },
  {
    key: 'events',
    label: 'Event Management',
    blurb: 'Event branding, promotion and on-ground activation that draw a crowd.',
    clients: ['net-zero', 'amata-building-care', 'bolpu'],
  },
]

