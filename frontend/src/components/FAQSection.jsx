import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../ThemeContext'

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
    q: 'What does Yatharth do?',
    a: 'Yatharth is a full-service digital marketing and brand strategy agency based in Mangalore, India. We help businesses define how they are seen online — through brand strategy, SEO, Meta ads, content creation, social media management, influencer marketing, reels strategy, videography, and creative direction.',
  },
  {
    q: 'Who is the founder of Yatharth?',
    a: 'Yatharth was founded by Eshwar Shetty, a digital marketing expert with deep expertise in brand strategy, SEO, social media marketing, Meta ads, and influencer marketing. He has worked with businesses across Karnataka including Mangalore, Udupi, and beyond.',
  },
  {
    q: 'Which areas does Yatharth serve?',
    a: 'Yatharth works with clients across India, with a strong presence in Karnataka — particularly Mangalore, Udupi, Dakshina Kannada District, and Udupi District. We also work with national and international brands.',
  },
  {
    q: 'What industries does Yatharth work with?',
    a: 'We have worked with clients across real estate, politics, sustainability, hospitality, education, professional services, and retail. Our clients include business leaders, elected officials, and international organisations operating in India.',
  },
  {
    q: 'What services does Yatharth offer?',
    a: 'Our core services include Brand Strategy, SEO, Digital Marketing, Social Media Management, Instagram Marketing, Meta Ads (Facebook & Instagram), Influencer Marketing, Reels Strategy, Videography & Video Production, Content Creation & Storytelling, Creative Direction, Website Development, Poster Design, Flex Banner Design, and Event Marketing & Promotion.',
  },
  {
    q: 'How does the brand strategy process work at Yatharth?',
    a: 'We begin with a deep discovery session to understand your business, audience, and goals. From there we define your brand positioning, identity, and narrative — the strategic foundation that drives everything else. The process typically takes 2–4 weeks and results in a clear, actionable brand playbook.',
  },
  {
    q: 'Can Yatharth help with Meta ads and paid campaigns?',
    a: 'Yes. We plan, create, and manage Meta ad campaigns across Facebook and Instagram. This includes audience targeting, creative production, A/B testing, and performance analytics — all aimed at maximising return on ad spend for your business.',
  },
  {
    q: 'Does Yatharth offer influencer marketing services?',
    a: 'Yes. We handle end-to-end influencer marketing — from identifying the right creators for your brand, managing outreach, briefing, content review, and performance tracking. We work with influencers across Instagram and YouTube in Karnataka and across India.',
  },
  {
    q: 'How do I get started with Yatharth?',
    a: 'The easiest way to start is to reach out through our contact form or call us directly. We will schedule a free discovery call to understand your goals and recommend the right services for your business.',
  },
  {
    q: 'Why should I choose Yatharth over other agencies?',
    a: 'Yatharth combines strategic thinking with creative execution — we do not just run campaigns, we build brands. Our clients include a Member of Parliament, an MLA, a Founder Chairman of a major business group, and an Executive Director of an international corporation. We bring the same level of craft and dedication to every engagement, regardless of size.',
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

      {/* Hidden SEO block — all Q&As readable by crawlers without JS */}
      <div style={{
        position: 'absolute', width: 1, height: 1,
        overflow: 'hidden', clip: 'rect(0 0 0 0)',
        whiteSpace: 'nowrap', pointerEvents: 'none',
      }} aria-hidden="true">
        <h2>Frequently Asked Questions about Yatharth</h2>
        {FAQS.map((faq, i) => (
          <div key={i}>
            <h3>{faq.q}</h3>
            <p>{faq.a}</p>
          </div>
        ))}
      </div>

    </section>
  )
}
