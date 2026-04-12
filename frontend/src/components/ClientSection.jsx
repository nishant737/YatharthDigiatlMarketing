import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const LOGOS = [
  { name: 'ABC',              file: 'ABC_Black_Logo.png'       },
  { name: 'Bolpu',            file: 'BOLPU_logo.png'           },
  { name: 'Thatasth',        file: 'Black-PNG-Thatasth.png'   },
  { name: 'Chris & Danny',   file: 'Chris_&_Danny.png'        },
  { name: 'ETA',              file: 'ETA_Logo.png'             },
  { name: 'Hayka',            file: 'Hayka_Logo.png'           },
  { name: 'IMJ',              file: 'IMJ_Logo.png'             },
  { name: 'Iris',             file: 'Iris_Logo.png'            },
  { name: 'KOIN Home',       file: 'KOIN_Home_Logo.png'       },
  { name: 'Kedarautaana',    file: 'Kedarautaana_Logo.png'    },
  { name: 'MIT Kundapura',   file: 'MIT_Kundapura_Logo.png'   },
  { name: 'MRG',              file: 'MRG-LOGO.png'             },
  { name: 'MSRS',             file: 'MSRS_Logo.png'            },
  { name: 'Net Zero Vision', file: 'Net_Zero_Vision_Logo.png' },
  { name: 'OBG',              file: 'OBG_Logo.png'             },
  { name: 'Sathyanath',      file: 'Sathyanath_Logo.png'      },
  { name: 'Kadala Parbha',   file: 'kadala-parbha-blue.png'   },
]

const CSS = `
/* ── Ticker ─────────────────────────────────────────────────── */
@keyframes ticker-left {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes ticker-right {
  0%   { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}
.ticker-track-l {
  display: flex;
  width: max-content;
  animation: ticker-left 38s linear infinite;
  will-change: transform;
  pointer-events: none;
}
.ticker-track-r {
  display: flex;
  width: max-content;
  animation: ticker-right 44s linear infinite;
  will-change: transform;
  pointer-events: none;
}

/* ── Logo pill ──────────────────────────────────────────────── */
.logo-pill {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(245,240,235,0.04) 0%, rgba(245,240,235,0.02) 100%);
  border: 1px solid rgba(245,240,235,0.08);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
}
.logo-pill::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(219,100,54,0.06) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.4s ease;
  border-radius: inherit;
}

/* ── Stats ──────────────────────────────────────────────────── */
.cs-stats {
  display: flex;
  align-items: stretch;
  justify-content: center;
  border: 1px solid rgba(245,240,235,0.08);
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(245,240,235,0.03) 0%, rgba(245,240,235,0.01) 100%);
  overflow: hidden;
  max-width: 700px;
  margin: clamp(52px,8vh,80px) auto 0;
  position: relative;
  z-index: 2;
}
.cs-stats::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(219,100,54,0.04) 0%, transparent 50%);
  pointer-events: none;
}
.cs-stat {
  flex: 1;
  text-align: center;
  padding: clamp(28px,4vw,44px) clamp(16px,3vw,40px);
  position: relative;
  transition: background 0.3s ease;
}
.cs-stat:hover {
  background: rgba(219,100,54,0.04);
}
.cs-stat + .cs-stat::before {
  content: '';
  position: absolute;
  left: 0; top: 18%; bottom: 18%;
  width: 1px;
  background: linear-gradient(to bottom, transparent, rgba(245,240,235,0.1), transparent);
}
.cs-stat-num {
  font-family: 'Inter', system-ui, sans-serif;
  font-weight: 300;
  font-size: clamp(2.2rem, 4.5vw, 3.2rem);
  letter-spacing: -0.04em;
  color: #DB6436;
  line-height: 1;
  margin-bottom: 10px;
  background: linear-gradient(135deg, #DB6436 0%, #e8874f 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.cs-stat-label {
  font-family: 'Inter', system-ui, sans-serif;
  font-weight: 300;
  font-size: clamp(0.6rem, 1vw, 0.7rem);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(245,240,235,0.32);
  line-height: 1.5;
}

/* ── Section heading badge ───────────────────────────────────── */
.cs-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'Inter', system-ui, sans-serif;
  font-weight: 400;
  font-size: clamp(0.58rem, 0.9vw, 0.68rem);
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(219,100,54,0.7);
  border: 1px solid rgba(219,100,54,0.2);
  padding: 6px 16px;
  border-radius: 100px;
  margin-bottom: 22px;
  background: rgba(219,100,54,0.04);
}
.cs-badge-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #DB6436;
  animation: pulse-dot 2s ease-in-out infinite;
}
@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.4; transform: scale(0.7); }
}

/* ── Ticker row separator ───────────────────────────────────── */
.ticker-sep {
  width: 100%;
  height: 1px;
  background: linear-gradient(to right, transparent 0%, rgba(219,100,54,0.12) 30%, rgba(219,100,54,0.12) 70%, transparent 100%);
}

@media (max-width: 580px) {
  .cs-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 360px;
    width: calc(100% - 48px);
  }
  /* Third stat spans both columns and sits centered below */
  .cs-stat:last-child {
    grid-column: 1 / -1;
    border-top: 1px solid rgba(245,240,235,0.07);
  }
  /* Reset vertical pseudo-dividers */
  .cs-stat + .cs-stat::before {
    top: 18%; bottom: 18%;
    left: 0;
    width: 1px; height: auto;
    background: linear-gradient(to bottom, transparent, rgba(245,240,235,0.1), transparent);
  }
  /* Remove the divider between col-2 and the full-width third stat */
  .cs-stat:last-child::before {
    display: none;
  }
  .cs-stat {
    padding: 24px 12px;
  }
  .cs-stat-num {
    font-size: 1.9rem;
  }
  .cs-stat-label {
    font-size: 0.6rem;
  }
}
`

function Ticker({ logos, dir = 'left' }) {
  const items = [...logos, ...logos, ...logos, ...logos]
  return (
    <div
      style={{ overflow: 'hidden', width: '100%', position: 'relative' }}
    >
      <div className={dir === 'left' ? 'ticker-track-l' : 'ticker-track-r'}>
        {items.map((logo, i) => (
          <div
            key={`${logo.file}-${i}`}
            style={{
              flexShrink: 0,
              padding: `0 clamp(8px, 1.2vw, 14px)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 'clamp(100px, 12vw, 128px)',
            }}
          >
            <div
              className="logo-pill"
              style={{
                width: 'clamp(120px, 15vw, 190px)',
                height: 'clamp(62px, 7.5vw, 82px)',
                padding: '12px 18px',
              }}
            >
              <img
                src={`/company/${logo.file}`}
                alt={logo.name}
                draggable={false}
                style={{
                  height: '100%',
                  width: 'auto',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  userSelect: 'none',
                  filter: 'brightness(0.9) contrast(1.08)',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const STATS = [
  { num: '17+',  label: 'Brands' },
  { num: '3×',   label: 'Avg. engagement lift' },
  { num: '90d',  label: 'To measurable results' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: 'visible',
  variants: {
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] } },
  },
})

export default function ClientSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-8% 0px' })

  const half = Math.ceil(LOGOS.length / 2)
  const row1 = LOGOS.slice(0, half)
  const row2 = LOGOS.slice(half)

  return (
    <>
      <style>{CSS}</style>

      <section
        id="clients"
        ref={ref}
        style={{
          background: '#060503',
          padding: 'clamp(88px, 12vh, 140px) 0 clamp(80px, 11vh, 120px)',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 20,
        }}
      >
        {/* ── Background layers ── */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          {/* Large central glow */}
          <div style={{
            position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)',
            width: '80%', height: '60%',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(219,100,54,0.07) 0%, transparent 60%)',
            filter: 'blur(70px)',
          }} />
          {/* Bottom-left glow */}
          <div style={{
            position: 'absolute', bottom: '0%', left: '-5%',
            width: '45%', height: '50%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(200,90,48,0.05) 0%, transparent 65%)',
            filter: 'blur(80px)',
          }} />
          {/* Bottom-right glow */}
          <div style={{
            position: 'absolute', bottom: '10%', right: '-5%',
            width: '40%', height: '45%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(219,100,54,0.04) 0%, transparent 65%)',
            filter: 'blur(70px)',
          }} />
          {/* Subtle grid overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `
              linear-gradient(rgba(245,240,235,0.015) 1px, transparent 1px),
              linear-gradient(90deg, rgba(245,240,235,0.015) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
          }} />
        </div>

        {/* Top accent line */}
        <div aria-hidden style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '35%', height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(219,100,54,0.55), transparent)',
        }} />

        {/* ── Heading ── */}
        <div style={{
          textAlign: 'center',
          padding: '0 clamp(20px, 4vw, 48px)',
          marginBottom: 'clamp(52px, 8vh, 80px)',
          position: 'relative', zIndex: 2,
        }}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="cs-badge">
              <span className="cs-badge-dot" />
              Trusted By
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 26 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: '"Inter", system-ui, sans-serif',
              fontWeight: 300,
              fontSize: 'clamp(2.2rem, 5.5vw, 4rem)',
              letterSpacing: '-0.04em',
              color: '#f5f0eb',
              margin: '0 0 16px',
              lineHeight: 1.08,
            }}
          >
            Brands that chose
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #DB6436 0%, #e89060 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              to grow
            </span>
            {' '}with us
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: '"Inter", system-ui, sans-serif',
              fontWeight: 300,
              fontSize: 'clamp(0.82rem, 1.3vw, 0.95rem)',
              color: 'rgba(245,240,235,0.36)',
              margin: '0 auto',
              maxWidth: '400px',
              lineHeight: 1.7,
            }}
          >
            {LOGOS.length}+ brands. Every story, every campaign — intentional.
          </motion.p>
        </div>

        {/* ── Ticker rows ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.35 }}
          style={{ position: 'relative' }}
        >
          <Ticker logos={row1} dir="left" />

          <div className="ticker-sep" />

          <Ticker logos={row2} dir="right" />

          {/* Left + right edge fade */}
          <div aria-hidden style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'linear-gradient(to right, #060503 0%, transparent 14%, transparent 86%, #060503 100%)',
          }} />
        </motion.div>

        {/* ── Stats strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.85, delay: 0.52, ease: [0.22, 1, 0.36, 1] }}
          className="cs-stats"
        >
          {STATS.map((s, i) => (
            <div key={i} className="cs-stat">
              <div className="cs-stat-num">{s.num}</div>
              <div className="cs-stat-label">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Bottom accent line */}
        <div aria-hidden style={{
          position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          width: '20%', height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(219,100,54,0.25), transparent)',
        }} />
      </section>
    </>
  )
}
