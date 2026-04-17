import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import logo from '../asset/logo.png'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.1 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
})

const CARD_CSS = `
.contact-info-card {
  background: linear-gradient(145deg, rgba(22,18,14,0.9), rgba(12,9,6,0.95));
  border: 1px solid rgba(219,100,54,0.14);
  border-radius: 16px;
  padding: clamp(20px, 2.5vw, 28px);
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  cursor: default;
}
.contact-info-card:hover {
  border-color: rgba(219,100,54,0.32);
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
}
.contact-consult-card {
  background: linear-gradient(145deg, rgba(26,20,14,0.95), rgba(14,10,6,0.98));
  border: 1px solid rgba(219,100,54,0.2);
  border-radius: 18px;
  padding: clamp(24px, 3vw, 36px);
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.book-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #DB6436;
  color: #fff;
  font-family: 'Inter', system-ui, sans-serif;
  font-weight: 500;
  font-size: clamp(0.78rem, 1.1vw, 0.88rem);
  letter-spacing: 0.04em;
  padding: 14px 28px;
  border-radius: 100px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease;
  white-space: nowrap;
  width: 100%;
}
.book-btn:hover {
  background: #c45628;
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(219,100,54,0.35);
}
.book-btn:active { transform: translateY(0); }

@media (max-width: 768px) {
  .contact-right-grid {
    grid-template-columns: 1fr !important;
  }
}
`

function CalendarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="18" rx="3" stroke="#DB6436" strokeWidth="1.5"/>
      <path d="M16 2v4M8 2v4M3 10h18" stroke="#DB6436" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="7" y="14" width="3" height="3" rx="0.5" fill="#DB6436"/>
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="3" stroke="#DB6436" strokeWidth="1.5"/>
      <path d="M2 7l10 7 10-7" stroke="#DB6436" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.21 2.2z" stroke="#DB6436" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#DB6436">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function PinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#DB6436" strokeWidth="1.5"/>
      <circle cx="12" cy="9" r="2.5" stroke="#DB6436" strokeWidth="1.5"/>
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function ContactSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-10% 0px' })

  return (
    <>
      <style>{CARD_CSS}</style>

      <section
        id="contact"
        ref={ref}
        style={{
          position: 'relative',
          background: '#0a0806',
          overflow: 'hidden',
          minHeight: '100vh',
          zIndex: 30,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* Ambient glows */}
        <div aria-hidden style={{
          position: 'absolute', top: '-10%', left: '-5%',
          width: 'clamp(300px, 55vw, 650px)', height: 'clamp(300px, 55vw, 650px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(219,100,54,0.07) 0%, transparent 65%)',
          filter: 'blur(60px)', pointerEvents: 'none',
        }} />
        <div aria-hidden style={{
          position: 'absolute', bottom: '-8%', right: '-4%',
          width: 'clamp(200px, 40vw, 480px)', height: 'clamp(200px, 40vw, 480px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,90,48,0.05) 0%, transparent 65%)',
          filter: 'blur(50px)', pointerEvents: 'none',
        }} />

        {/* Top rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{
            position: 'absolute', top: 0, left: '8%', right: '8%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(219,100,54,0.3), transparent)',
            transformOrigin: 'left', pointerEvents: 'none',
          }}
        />

        {/* Main content */}
        <div style={{
          maxWidth: '1160px',
          margin: '0 auto',
          width: '100%',
          padding: 'clamp(80px, 12vh, 140px) clamp(24px, 6vw, 80px) clamp(48px, 7vh, 80px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))',
          gap: 'clamp(48px, 7vw, 100px)',
          alignItems: 'start',
        }}>

          {/* ── LEFT column ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

            {/* Badge */}
            <motion.span {...fade(0)} style={{
              display: 'inline-block',
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 400, fontSize: '0.68rem',
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: '#DB6436',
              background: 'rgba(219,100,54,0.1)',
              border: '1px solid rgba(219,100,54,0.2)',
              padding: '6px 14px', borderRadius: '100px',
              width: 'fit-content',
            }}>
              Contact
            </motion.span>

            {/* Heading */}
            <motion.div {...fade(0.08)}>
              <h2 style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)',
                letterSpacing: '-0.04em', lineHeight: 1.08,
                color: '#f5f0eb', margin: '0 0 14px',
              }}>
                Let's Build<br />
                <span style={{ color: '#DB6436' }}>Something Great</span>
              </h2>
              <p style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: 'clamp(0.88rem, 1.4vw, 1rem)',
                color: 'rgba(245,240,235,0.42)',
                margin: 0, lineHeight: 1.75, maxWidth: '400px',
              }}>
                Ready to transform your ideas into reality? Let's discuss how we can help your brand grow with strategy, creativity, and clarity.
              </p>
            </motion.div>

            {/* Consultation card */}
            <motion.div {...fade(0.16)} className="contact-consult-card">
              {/* Icon + text */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
                  background: 'rgba(219,100,54,0.1)',
                  border: '1px solid rgba(219,100,54,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <CalendarIcon />
                </div>
                <div>
                  <div style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontWeight: 500, fontSize: 'clamp(0.92rem, 1.3vw, 1.02rem)',
                    color: '#f5f0eb', marginBottom: '4px',
                  }}>
                    Schedule Your Consultation
                  </div>
                  <div style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontWeight: 300, fontSize: '0.8rem',
                    color: 'rgba(245,240,235,0.38)', letterSpacing: '0.01em',
                  }}>
                    30-minute strategy call
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: 'rgba(219,100,54,0.1)' }} />

              {/* CTA */}
              <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2n6b8wPnSCQ_Xg6YKii-hTTBIuFp6vwFIVbiaHH3sFr1jkkf4SY-Utqpd5Gobe2O7U43bwm7ks" target="_blank" rel="noopener noreferrer" className="book-btn">
                Book an Appointment <ArrowIcon />
              </a>
            </motion.div>
          </div>

          {/* ── RIGHT column ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Top row: Email + LinkedIn */}
            <div
              className="contact-right-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
              }}
            >
              {/* Email card */}
              <motion.div {...fade(0.12)} className="contact-info-card">
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  background: 'rgba(219,100,54,0.1)',
                  border: '1px solid rgba(219,100,54,0.18)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '4px',
                }}>
                  <EmailIcon />
                </div>
                <div style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 500, fontSize: '0.92rem', color: '#f5f0eb',
                }}>
                  Email Us
                </div>
                <a
                  href="mailto:info@yatharthsocial.com"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontWeight: 400, fontSize: '0.78rem',
                    color: '#DB6436', textDecoration: 'none', letterSpacing: '-0.01em',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  info@yatharthsocial.com
                </a>
                <div style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 300, fontSize: '0.72rem',
                  color: 'rgba(245,240,235,0.32)',
                }}>
                  Drop us a line anytime
                </div>
              </motion.div>

              {/* LinkedIn card */}
              <motion.a
                {...fade(0.18)}
                className="contact-info-card"
                href="https://www.linkedin.com/company/yatharth-social/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', cursor: 'pointer' }}
              >
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  background: 'rgba(219,100,54,0.1)',
                  border: '1px solid rgba(219,100,54,0.18)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '4px',
                }}>
                  <LinkedInIcon />
                </div>
                <div style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 500, fontSize: '0.92rem', color: '#f5f0eb',
                }}>
                  LinkedIn
                </div>
                <div style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 400, fontSize: '0.78rem',
                  color: '#DB6436',
                }}>
                  Connect with Yatharth
                </div>
                <div style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 300, fontSize: '0.72rem',
                  color: 'rgba(245,240,235,0.32)',
                }}>
                  Follow our journey
                </div>
              </motion.a>
            </div>

            {/* Phone card — full width */}
            <motion.div {...fade(0.22)} className="contact-info-card" style={{ flexDirection: 'row', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
                background: 'rgba(219,100,54,0.1)',
                border: '1px solid rgba(219,100,54,0.18)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <PhoneIcon />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 300, fontSize: '0.72rem',
                  color: 'rgba(245,240,235,0.35)',
                  marginBottom: '6px', letterSpacing: '0.05em', textTransform: 'uppercase',
                }}>
                  Call Us
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 24px' }}>
                  <a href="tel:+918970090057" style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontWeight: 500, fontSize: 'clamp(0.82rem, 1.2vw, 0.95rem)',
                    color: '#DB6436', textDecoration: 'none', letterSpacing: '0.01em',
                    transition: 'opacity 0.2s', whiteSpace: 'nowrap',
                  }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >+91 78997 80057</a>
                  <a href="tel:+917899780057" style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontWeight: 500, fontSize: 'clamp(0.82rem, 1.2vw, 0.95rem)',
                    color: 'rgba(219,100,54,0.7)', textDecoration: 'none', letterSpacing: '0.01em',
                    transition: 'opacity 0.2s', whiteSpace: 'nowrap',
                  }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >+91 89700 90057</a>
                </div>
              </div>
            </motion.div>

            {/* Location card — full width */}
            <motion.div {...fade(0.24)} className="contact-info-card" style={{ flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
                background: 'rgba(219,100,54,0.1)',
                border: '1px solid rgba(219,100,54,0.18)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <PinIcon />
              </div>
              <div>
                <div style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 300, fontSize: '0.72rem',
                  color: 'rgba(245,240,235,0.35)',
                  marginBottom: '4px', letterSpacing: '0.05em', textTransform: 'uppercase',
                }}>
                  Based in
                </div>
                <div style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 500, fontSize: 'clamp(0.92rem, 1.3vw, 1.05rem)',
                  color: '#f5f0eb', marginBottom: '3px',
                }}>
                  Mangaluru, Karnataka
                </div>
                <div style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 300, fontSize: '0.76rem',
                  color: 'rgba(245,240,235,0.32)',
                }}>
                  Serving clients globally
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* ── Footer strip ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          style={{
            borderTop: '1px solid rgba(245,240,235,0.05)',
            padding: 'clamp(20px, 3.5vh, 32px) clamp(24px, 6vw, 80px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px',
            maxWidth: '1160px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          <img
            src={logo}
            alt="Yatharth"
            style={{
              height: 'clamp(22px, 3vw, 30px)',
              width: 'auto', objectFit: 'contain',
              opacity: 0.32,
              userSelect: 'none', pointerEvents: 'none',
            }}
          />
          <span style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 300, fontSize: 'clamp(0.56rem, 0.85vw, 0.66rem)',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(245,240,235,0.16)',
          }}>
            Mangaluru &nbsp;·&nbsp; Est. 2020
          </span>
          <a
            href="https://www.linkedin.com/company/yatharth-social/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: '7px',
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 400, fontSize: 'clamp(0.58rem, 0.88vw, 0.7rem)',
              letterSpacing: '0.06em',
              color: 'rgba(219,100,54,0.6)',
              textDecoration: 'none',
              border: '1px solid rgba(219,100,54,0.18)',
              borderRadius: '100px',
              padding: '6px 14px',
              transition: 'color 0.25s ease, border-color 0.25s ease, background 0.25s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#DB6436'
              e.currentTarget.style.borderColor = 'rgba(219,100,54,0.5)'
              e.currentTarget.style.background = 'rgba(219,100,54,0.06)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'rgba(219,100,54,0.6)'
              e.currentTarget.style.borderColor = 'rgba(219,100,54,0.18)'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            Connect with Yatharth
          </a>
          <span style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 300, fontSize: 'clamp(0.56rem, 0.85vw, 0.66rem)',
            letterSpacing: '0.08em',
            color: 'rgba(245,240,235,0.1)',
          }}>
            © {new Date().getFullYear()} Yatharth. All rights reserved.
          </span>
        </motion.div>
      </section>
    </>
  )
}
