import React from 'react'
import { motion } from 'framer-motion'
import lpBg from '../asset/lp.jpg'
import founderImg from '../asset/final1.png'

const FOUNDER_CSS = `
.founder-lp-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  opacity: 0.22;
  mix-blend-mode: luminosity;
}

@media (max-width: 768px) {
  .founder-lp-bg {
    background-size: auto 100%;
    background-position: center top;
  }
}

.founder-section {
  background: #060503;
  padding: clamp(72px, 16vh, 200px) clamp(24px, 8vw, 120px);
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
}

.founder-inner {
  display: flex;
  align-items: center;
  gap: clamp(40px, 7vw, 96px);
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  zIndex: 2;
}

.founder-card {
  flex: 0 0 clamp(200px, 26vw, 300px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.founder-photo-wrap {
  width: 100%;
}

.founder-photo-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}

.founder-name-block {
  padding: 16px 0 0 0;
}

.founder-name {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: clamp(0.95rem, 1.5vw, 1.1rem);
  font-weight: 400;
  color: #f5f0eb;
  margin: 0 0 4px 0;
  letter-spacing: -0.01em;
}

.founder-role {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 0.78rem;
  font-weight: 300;
  color: #DB6436;
  margin: 0;
  letter-spacing: 0.04em;
}

.founder-content {
  flex: 1;
  min-width: 0;
}

.founder-badge {
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

.founder-heading {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: clamp(1.9rem, 4vw, 3rem);
  font-weight: 300;
  color: #f5f0eb;
  letter-spacing: -0.03em;
  line-height: 1.12;
  margin: 0 0 24px 0;
}

.founder-heading-accent {
  color: #DB6436;
  font-weight: 300;
}

.founder-para {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: clamp(0.85rem, 1.4vw, 1rem);
  font-weight: 300;
  color: rgba(245,240,235,0.55);
  line-height: 1.8;
  margin: 0 0 32px 0;
  letter-spacing: -0.005em;
  max-width: 580px;
  word-break: normal;
  overflow-wrap: break-word;
}

@media (max-width: 768px) {
  .founder-para {
    max-width: 100%;
    font-size: 0.9rem;
    line-height: 1.75;
  }
}

.founder-timeline {
  display: flex;
  align-items: center;
  gap: clamp(20px, 4vw, 40px);
  margin-bottom: 36px;
  flex-wrap: wrap;
}

.founder-timeline-item {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.founder-year {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: clamp(1rem, 1.6vw, 1.2rem);
  font-weight: 300;
  color: #DB6436;
  letter-spacing: -0.02em;
}

.founder-year-label {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 0.75rem;
  font-weight: 300;
  color: rgba(245,240,235,0.38);
  letter-spacing: 0.01em;
}

.founder-divider {
  width: 1px;
  height: 28px;
  background: rgba(245,240,235,0.1);
  align-self: center;
}

.founder-actions {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.founder-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 32px;
  border-radius: 100px;
  background: none;
  color: #f5f0eb;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: clamp(0.68rem, 1vw, 0.78rem);
  font-weight: 400;
  text-decoration: none;
  border: 1px solid rgba(219,100,54,0.45);
  cursor: pointer;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  transition: background 0.35s ease, border-color 0.35s ease, transform 0.25s ease;
}
.founder-btn-primary:hover {
  background: rgba(219,100,54,0.1);
  border-color: #DB6436;
  transform: translateY(-1px);
}

.founder-btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  border-radius: 100px;
  background: transparent;
  color: rgba(245,240,235,0.55);
  font-family: 'Inter', system-ui, sans-serif;
  font-size: clamp(0.68rem, 1vw, 0.78rem);
  font-weight: 400;
  text-decoration: none;
  border: 1px solid rgba(245,240,235,0.12);
  cursor: pointer;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  transition: border-color 0.3s ease, color 0.3s ease, transform 0.25s ease;
}
.founder-btn-outline:hover {
  border-color: rgba(245,240,235,0.3);
  color: #f5f0eb;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .founder-inner {
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }
  .founder-card {
    flex: none;
    width: clamp(180px, 55vw, 240px);
    align-items: center;
  }
  .founder-name-block {
    text-align: center;
    width: 100%;
  }
  .founder-content {
    text-align: center;
    width: 100%;
  }
  .founder-badge {
    display: inline-block;
  }
  .founder-timeline {
    gap: 16px;
    justify-content: center;
  }
  .founder-divider {
    height: 20px;
  }
  .founder-actions {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .founder-actions {
    flex-direction: column;
    align-items: stretch;
  }
  .founder-btn-primary,
  .founder-btn-outline {
    justify-content: center;
  }
}
`


const TIMELINE = [
  { year: '2020', label: 'Founded' },
  { year: '2022', label: 'First 10 Clients' },
  { year: '2024', label: 'Growing Strong' },
]

const VP = { once: false, margin: '-10% 0px' }

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VP,
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function FounderNote() {
  return (
    <>
      <style>{FOUNDER_CSS}</style>
      <section id="about" className="founder-section" style={{ position: 'relative', zIndex: 20 }}>

        {/* lp.jpg background */}
        <div aria-hidden className="founder-lp-bg" style={{ backgroundImage: `url(${lpBg})` }} />

        {/* Dark warm overlay to blend with site color */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(135deg, rgba(10,8,6,0.72) 0%, rgba(219,100,54,0.04) 100%)',
        }} />

        {/* Ambient orange glow */}
        <div aria-hidden style={{
          position: 'absolute', top: '30%', left: '10%',
          width: '40%', height: '50%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(219,100,54,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }} />

        <div className="founder-inner">

          {/* ── Left: founder card ── */}
          <motion.div className="founder-card" {...fadeUp(0.05)}>
            <div className="founder-photo-wrap" style={{ position: 'relative' }}>
              {/* Subtle glow beneath photo */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  bottom: '-14px', left: '10%', right: '10%',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'radial-gradient(ellipse, rgba(219,100,54,0.28) 0%, transparent 70%)',
                  filter: 'blur(10px)',
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <img src={founderImg} alt="Eshwar Shetty" style={{
                  width: '100%',
                  height: 'clamp(260px, 36vw, 360px)',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  display: 'block',
                  borderRadius: '16px',
                  border: '1px solid rgba(219,100,54,0.35)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(219,100,54,0.1), 0 20px 60px rgba(219,100,54,0.15)',
                }} />
              </div>
            </div>
            <div className="founder-name-block">
              <p className="founder-name">Eshwar Shetty</p>
              <p className="founder-role">Founder</p>
            </div>
          </motion.div>

          {/* ── Right: content ── */}
          <div className="founder-content">

            <motion.span className="founder-badge" {...fadeUp(0.12)}>
              Meet the Founder
            </motion.span>

            <motion.h2 className="founder-heading" {...fadeUp(0.2)}>
              The Story Behind{' '}
              <span className="founder-heading-accent">Yatharth</span>
            </motion.h2>

            <motion.p className="founder-para" {...fadeUp(0.28)}>
              Yatharth began in 2020 with a small set of ideas and a strong sense of intent. What started as a simple vision gradually turned into meaningful work, shaping our journey step by step. Over time, the projects grew, the team expanded, and with that came greater responsibility and a deeper commitment to deliver value. Every challenge taught us something new, every milestone strengthened our purpose, and every experience pushed us to improve. Today, we continue to move forward with clarity, passion, and the belief that growth is a continuous process. Still building. Still learning. Still figuring it out.
            </motion.p>

            <motion.div className="founder-timeline" {...fadeUp(0.36)}>
              {TIMELINE.map(({ year, label }, i) => (
                <React.Fragment key={year}>
                  <div className="founder-timeline-item">
                    <span className="founder-year">{year}</span>
                    <span className="founder-year-label">{label}</span>
                  </div>
                  {i < TIMELINE.length - 1 && (
                    <div className="founder-divider" />
                  )}
                </React.Fragment>
              ))}
            </motion.div>

            <motion.div className="founder-actions" {...fadeUp(0.44)}>
              <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2n6b8wPnSCQ_Xg6YKii-hTTBIuFp6vwFIVbiaHH3sFr1jkkf4SY-Utqpd5Gobe2O7U43bwm7ks" target="_blank" rel="noopener noreferrer" className="founder-btn-primary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Let's Talk
              </a>
              <a
                href="https://www.linkedin.com/company/yatharth-social/"
                target="_blank"
                rel="noopener noreferrer"
                className="founder-btn-outline"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  )
}
