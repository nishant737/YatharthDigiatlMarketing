import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../ThemeContext'

// Generate FAQPage JSON-LD schema for Google
const generateFAQSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a.replace(/<[^>]*>/g, ''), // Strip HTML tags if any
    },
  })),
})

const FAQ_CSS = `
.faq-section {
  background: var(--bg-primary);
  padding: clamp(80px, 14vh, 160px) clamp(24px, 8vw, 120px);
  position: relative;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
}

.faq-inner {
  max-width: 860px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  width: 100%;
}

.faq-badge {
  display: inline-block;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: clamp(0.62rem, 0.9vw, 0.72rem);
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-faint);
  border: 1px solid var(--border-medium);
  padding: 6px 14px;
  border-radius: 100px;
  margin-bottom: 24px;
}

.faq-title {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: clamp(2.6rem, 6vw, 5rem);
  font-weight: 300;
  color: var(--text-primary);
  letter-spacing: -0.04em;
  line-height: 1.0;
  margin: 0 0 16px 0;
}

.faq-subtitle {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: clamp(0.85rem, 1.4vw, 1rem);
  font-weight: 300;
  color: var(--text-42);
  line-height: 1.7;
  margin: 0 0 clamp(48px, 7vh, 80px) 0;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  border-top: 1px solid var(--border-subtle);
}

.faq-item {
  border-bottom: 1px solid var(--border-subtle);
}

.faq-question-btn {
  width: 100%;
  background: none;
  border: none;
  cursor: pointer;
  padding: clamp(18px, 2.5vh, 28px) 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  text-align: left;
}

.faq-question-btn:focus-visible {
  outline: 2px solid rgba(219,100,54,0.6);
  outline-offset: 2px;
  border-radius: 4px;
}

.faq-question-text {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: clamp(0.95rem, 1.6vw, 1.15rem);
  font-weight: 300;
  color: var(--text-primary);
  line-height: 1.4;
  letter-spacing: -0.01em;
  transition: color 0.3s ease;
}

.faq-item.open .faq-question-text {
  color: #DB6436;
}

.faq-icon {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid var(--border-15);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.3s ease, background 0.3s ease;
}

.faq-item.open .faq-icon {
  border-color: rgba(219,100,54,0.5);
  background: rgba(219,100,54,0.08);
}

.faq-answer {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: clamp(0.88rem, 1.2vw, 1rem);
  font-weight: 300;
  color: var(--text-55);
  line-height: 1.85;
  padding: 0 48px clamp(18px, 2.5vh, 28px) 0;
  margin: 0;
}

.faq-divider {
  width: 32px;
  height: 1px;
  background: linear-gradient(90deg, #DB6436, transparent);
  margin-bottom: 12px;
  border: none;
}
`

const FAQS = [
  {
    q: 'What is Yatharth and what digital marketing services do we offer in Mangalore?',
    a: 'Yatharth is a full-service digital marketing company in Mangalore specializing in brand strategy, SEO services, social media marketing, Meta ads management, website development, influencer marketing, content creation, and creative direction. We help businesses across Mangalore, Udupi, and Karnataka establish powerful online presence through data-driven digital marketing strategies.',
  },
  {
    q: 'What are the best SEO services in Mangalore, and how can they improve my rankings?',
    a: 'Our SEO services in Mangalore include technical optimization, keyword research, on-page and off-page SEO, local optimization, and content strategy. We help businesses rank for high-intent keywords like "digital marketing company in Mangalore," "SEO services in Mangalore," and industry-specific terms. Our clients have seen organic traffic increases of 300-500% within 6 months.',
  },
  {
    q: 'How does social media marketing in Mangalore drive business growth?',
    a: 'Our social media marketing services in Mangalore cover strategy development, content creation, community management, paid advertising on Instagram and Facebook, influencer partnerships, and reels strategy. We help build engaged audiences and drive qualified leads for e-commerce, services, hospitality, and B2B businesses across Karnataka.',
  },
  {
    q: 'What is Meta Ads management, and how can it help my Mangalore business?',
    a: 'Meta Ads management involves creating and optimizing Facebook and Instagram advertising campaigns. We handle audience research, ad creative development, budget allocation, A/B testing, and performance tracking. Businesses using Meta Ads management typically see 200-400% ROI, making it ideal for e-commerce, local services, and lead generation in Mangalore.',
  },
  {
    q: 'Do you offer website development services optimized for digital marketing?',
    a: 'Yes, our website development services are built with SEO and conversion optimization at the core. We create fast, mobile-responsive websites that rank well on Google and integrate with your digital marketing strategy. Every website includes technical SEO, performance optimization, and is ready for social media and paid advertising campaigns.',
  },
  {
    q: 'What is influencer marketing and how does it work for Mangalore brands?',
    a: 'Influencer marketing involves partnering with content creators to authentically promote your brand. We manage the entire process: identifying creators aligned with your brand, negotiating partnerships, briefing and content review, and tracking ROI. It\'s highly effective for e-commerce, hospitality, consumer products, and lifestyle brands in Mangalore and across India.',
  },
  {
    q: 'How long does it take to see results from digital marketing services?',
    a: 'Results vary by strategy: Google Ads deliver immediate visibility, social media ads show results in 1-3 weeks, while SEO typically takes 3-6 months for significant rankings. Our approach focuses on sustainable, long-term growth combined with quick wins. We provide monthly performance reports so you can track progress.',
  },
  {
    q: 'Why should I hire a digital marketing company in Mangalore instead of freelancers?',
    a: 'A professional digital marketing company in Mangalore like Yatharth provides accountability, diverse expertise across SEO, social media, ads, and website development, consistent strategy implementation, and measurable results. We have established processes, team redundancy, and proven success with 17+ brands. Freelancers may lack these advantages.',
  },
  {
    q: 'Who founded Yatharth, and what is their experience?',
    a: 'Yatharth was founded by Eshwar Shetty, a digital marketing expert with 17+ years of experience in brand strategy, SEO services, social media marketing, Meta ads management, and influencer marketing. He has worked with Member of Parliament, MLAs, corporate leaders, and multinational organizations, bringing this expertise to every client engagement.',
  },
  {
    q: 'How do I start working with a digital marketing agency in Mangalore?',
    a: 'Getting started is simple: contact us through our website, email, or phone to schedule a free discovery call. During this call, we\'ll discuss your business goals, current marketing challenges, and how our services (SEO, social media marketing, Meta ads, website development) can help. There\'s no obligation — we\'re here to listen and recommend the right strategy for your needs.',
  },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
})

export default function FAQSection() {
  const { dark } = useTheme()
  const [openIdx, setOpenIdx] = useState(null)
  const accentColor = dark ? '#DB6436' : '#0A5675'

  const toggle = (i) => setOpenIdx(prev => prev === i ? null : i)

  // Inject JSON-LD FAQPage schema into document head
  useEffect(() => {
    const schema = generateFAQSchema(FAQS)
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return (
    <section id="faq" className="faq-section">
      <style>{FAQ_CSS}</style>

      {/* Subtle top glow matching site palette */}
      <div aria-hidden style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '60%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(219,100,54,0.18), transparent)',
        pointerEvents: 'none',
      }} />

      <div className="faq-inner">

        {/* Header */}
        <motion.div {...fadeUp(0)}>
          <span className="faq-badge">FAQ</span>
        </motion.div>

        <motion.h2 className="faq-title" {...fadeUp(0.06)}>
          Common questions.
        </motion.h2>

        <motion.p className="faq-subtitle" {...fadeUp(0.12)}>
          Everything you need to know about working with Yatharth.
        </motion.p>

        {/* FAQ List */}
        <motion.div
          className="faq-list"
          role="list"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.18 }}
        >
          {FAQS.map((faq, i) => {
            const isOpen = openIdx === i
            return (
              <div
                key={i}
                className={`faq-item${isOpen ? ' open' : ''}`}
                role="listitem"
              >
                <button
                  className="faq-question-btn"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-question-${i}`}
                >
                  <span className="faq-question-text">{faq.q}</span>
                  <span className="faq-icon" aria-hidden>
                    <motion.svg
                      width="12" height="12" viewBox="0 0 12 12"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <line x1="6" y1="1" x2="6" y2="11" stroke={isOpen ? accentColor : 'var(--text-secondary)'} strokeWidth="1.2" strokeLinecap="round" />
                      <line x1="1" y1="6" x2="11" y2="6" stroke={isOpen ? accentColor : 'var(--text-secondary)'} strokeWidth="1.2" strokeLinecap="round" />
                    </motion.svg>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${i}`}
                      role="region"
                      aria-labelledby={`faq-question-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <hr className="faq-divider" />
                      <p className="faq-answer">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </motion.div>
      </div>

    </section>
  )
}
