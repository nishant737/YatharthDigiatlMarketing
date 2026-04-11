import { useState } from 'react'
import { motion } from 'framer-motion'

const JOURNAL_CSS = `
.journal-section {
  background: #060503;
  padding: clamp(80px, 14vh, 160px) clamp(24px, 8vw, 120px);
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
}

.journal-inner {
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  width: 100%;
}

.journal-header {
  margin-bottom: clamp(48px, 7vh, 80px);
}

.journal-badge {
  display: inline-block;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: clamp(0.62rem, 0.9vw, 0.72rem);
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(245,240,235,0.4);
  border: 1px solid rgba(245,240,235,0.12);
  padding: 6px 14px;
  border-radius: 100px;
  margin-bottom: 24px;
}

.journal-title {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: clamp(2.6rem, 6vw, 5rem);
  font-weight: 300;
  color: #f5f0eb;
  letter-spacing: -0.04em;
  line-height: 1.0;
  margin: 0 0 16px 0;
}

.journal-subtitle {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: clamp(0.85rem, 1.4vw, 1rem);
  font-weight: 300;
  color: rgba(245,240,235,0.42);
  line-height: 1.7;
  margin: 0;
  max-width: 480px;
  letter-spacing: -0.005em;
}

.journal-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(16px, 2vw, 28px);
}

.journal-card {
  background: linear-gradient(160deg, rgba(18,14,10,0.9), rgba(10,8,6,0.98));
  border: 1px solid rgba(245,240,235,0.07);
  border-radius: 16px;
  padding: clamp(24px, 3vw, 36px);
  cursor: pointer;
  transition: border-color 0.35s ease, transform 0.3s ease, box-shadow 0.35s ease;
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-decoration: none;
}

.journal-card:hover {
  border-color: rgba(219,100,54,0.35);
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(0,0,0,0.45), 0 0 0 1px rgba(219,100,54,0.08);
}

.journal-card-featured {
  grid-column: span 2;
  background: linear-gradient(160deg, rgba(22,16,10,0.95), rgba(10,8,6,0.98));
  border-color: rgba(219,100,54,0.18);
}

.journal-card-tag {
  display: inline-block;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 0.62rem;
  font-weight: 400;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #DB6436;
  padding: 4px 10px;
  border: 1px solid rgba(219,100,54,0.3);
  border-radius: 100px;
  width: fit-content;
}

.journal-card-title {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: clamp(1rem, 1.6vw, 1.3rem);
  font-weight: 300;
  color: #f5f0eb;
  letter-spacing: -0.02em;
  line-height: 1.3;
  margin: 0;
  flex: 1;
}

.journal-card-featured .journal-card-title {
  font-size: clamp(1.2rem, 2.2vw, 1.75rem);
}

.journal-card-excerpt {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: clamp(0.78rem, 1.1vw, 0.88rem);
  font-weight: 300;
  color: rgba(245,240,235,0.38);
  line-height: 1.75;
  margin: 0;
  letter-spacing: -0.005em;
}

.journal-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid rgba(245,240,235,0.06);
}

.journal-card-date {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 0.72rem;
  font-weight: 300;
  color: rgba(245,240,235,0.28);
  letter-spacing: 0.04em;
}

.journal-card-arrow {
  color: rgba(219,100,54,0.5);
  transition: color 0.25s ease, transform 0.25s ease;
  display: flex;
  align-items: center;
}

.journal-card:hover .journal-card-arrow {
  color: #DB6436;
  transform: translate(3px, -3px);
}

.journal-divider {
  width: 1px;
  background: linear-gradient(to bottom, transparent, rgba(219,100,54,0.2), transparent);
  align-self: stretch;
}

@media (max-width: 900px) {
  .journal-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .journal-card-featured {
    grid-column: span 2;
  }
}

@media (max-width: 600px) {
  .journal-grid {
    grid-template-columns: 1fr;
  }
  .journal-card-featured {
    grid-column: span 1;
  }
}
`

const ARTICLES = [
  {
    id: 1,
    tag: 'Branding',
    title: 'Why Most Brand Identities Fail Within Three Years',
    excerpt: "A brand is not a logo. It's a promise. And most brands fail because they confuse the two from the very beginning.",
    date: 'March 2025',
    featured: true,
    url: 'https://www.become.team/blogs/why-brands-fail-and-what-businesses-can-learn-from-it',
  },
  {
    id: 2,
    tag: 'Digital',
    title: 'The Invisible Architecture of Great Websites',
    excerpt: 'What separates a site that converts from one that gets clicked away from in seconds.',
    date: 'February 2025',
    featured: false,
    url: 'https://medium.com/design-bootcamp/the-invisible-architecture-of-meaning-6e2b1e60b501',
  },
  {
    id: 3,
    tag: 'Culture',
    title: 'Slowness as a Creative Strategy',
    excerpt: 'In an age of instant everything, the most radical thing a studio can do is take its time.',
    date: 'January 2025',
    featured: false,
    url: 'https://medium.com/contemporary-pause/the-art-of-slowing-down-how-slowness-can-save-your-creativity-in-a-busy-world-550598b57ae8',
  },
  {
    id: 4,
    tag: 'Craft',
    title: 'Typography Is Voice',
    excerpt: 'Every typeface has a personality. Choosing the right one is the difference between whispering and shouting.',
    date: 'December 2024',
    featured: false,
    url: 'https://medium.com/%40anandpdoshi/typography-giving-voice-to-words-fd5a79cd5da4',
  },
  {
    id: 5,
    tag: 'Strategy',
    title: 'On Saying No to the Right Clients',
    excerpt: 'The projects we turn down define us as much as the ones we take on.',
    date: 'November 2024',
    featured: false,
    url: 'https://www.creativeboom.com/tips/when-and-how-to-say-no-when-freelancing/',
  },
]

const VP = { once: false, margin: '-8% 0px' }

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VP,
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
})

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )
}

export default function JournalSection() {
  const featured = ARTICLES.filter(a => a.featured)
  const rest = ARTICLES.filter(a => !a.featured)

  return (
    <>
      <style>{JOURNAL_CSS}</style>
      <section id="journal" className="journal-section" style={{ position: 'relative', zIndex: 20 }}>

        {/* Ambient glow */}
        <div aria-hidden style={{
          position: 'absolute', top: '20%', right: '5%',
          width: '35%', height: '50%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(219,100,54,0.05) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }} />
        <div aria-hidden style={{
          position: 'absolute', bottom: '10%', left: '0%',
          width: '40%', height: '40%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,144,48,0.04) 0%, transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }} />

        <div className="journal-inner">

          {/* Header */}
          <div className="journal-header">
            <motion.span className="journal-badge" {...fadeUp(0)}>
              Journal
            </motion.span>
            <motion.h2 className="journal-title" {...fadeUp(0.08)}>
              What we think.
            </motion.h2>
            <motion.p className="journal-subtitle" {...fadeUp(0.16)}>
              Ideas, observations, and perspectives on digital, branding, and culture.
            </motion.p>
          </div>

          {/* Grid */}
          <motion.div
            className="journal-grid"
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
            }}
          >
            {/* Featured article */}
            {featured.map(article => (
              <motion.a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="journal-card journal-card-featured"
                variants={{
                  hidden: { opacity: 0, y: 32 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                <span className="journal-card-tag">{article.tag}</span>
                <p className="journal-card-title">{article.title}</p>
                <p className="journal-card-excerpt">{article.excerpt}</p>
                <div className="journal-card-footer">
                  <span className="journal-card-date">{article.date}</span>
                  <span className="journal-card-arrow"><ArrowIcon /></span>
                </div>
              </motion.a>
            ))}

            {/* Regular articles */}
            {rest.map(article => (
              <motion.a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="journal-card"
                variants={{
                  hidden: { opacity: 0, y: 32 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                <span className="journal-card-tag">{article.tag}</span>
                <p className="journal-card-title">{article.title}</p>
                <p className="journal-card-excerpt">{article.excerpt}</p>
                <div className="journal-card-footer">
                  <span className="journal-card-date">{article.date}</span>
                  <span className="journal-card-arrow"><ArrowIcon /></span>
                </div>
              </motion.a>
            ))}
          </motion.div>

        </div>
      </section>
    </>
  )
}
