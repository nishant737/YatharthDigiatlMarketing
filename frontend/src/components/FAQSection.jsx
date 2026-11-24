import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../ThemeContext'
import { FAQS } from '../data/faqs'

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

    </section>
  )
}
