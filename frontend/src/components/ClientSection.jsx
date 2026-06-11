import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTheme } from '../ThemeContext'

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

const MARQUEE_CSS = `
@keyframes marquee-left {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes marquee-right {
  0%   { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}

.cs-wrap {
  display: grid;
  grid-template-columns: minmax(200px, 1fr) 2fr;
  border: 1px solid var(--cs-border);
  border-radius: 20px;
  overflow: hidden;
  background: var(--card-bg);
}

.cs-left-text {
  max-width: 260px;
}

@media (min-width: 769px) and (max-width: 1023px) {
  .cs-left-text {
    max-width: 100%;
  }
}

.cs-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(32px, 5vw, 56px) clamp(24px, 4vw, 44px);
  border-right: 1px solid var(--cs-border);
}

.cs-right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: clamp(18px, 2.5vw, 28px);
  padding: clamp(28px, 4vw, 48px) 0;
  overflow: hidden;
}

.cs-marquee-row {
  overflow: hidden;
  width: 100%;
  position: relative;
}

.cs-marquee-track {
  display: flex;
  width: max-content;
  gap: clamp(16px, 2vw, 28px);
  will-change: transform;
}

.cs-marquee-track.left  { animation: marquee-left  36s linear infinite; }
.cs-marquee-track.right { animation: marquee-right 42s linear infinite; }

.cs-logo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: clamp(110px, 12vw, 160px);
  height: clamp(56px, 6vw, 76px);
  border-radius: 12px;
  background: var(--card-bg2, var(--card-bg));
  padding: 12px 18px;
  box-sizing: border-box;
}

.cs-logo-item img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  display: block;
  user-select: none;
  pointer-events: none;
  filter: brightness(0.9) contrast(1.05);
}

@media (max-width: 768px) {
  .cs-wrap {
    grid-template-columns: 1fr;
    border-radius: 16px;
  }
  .cs-left {
    border-right: none;
    border-bottom: 1px solid var(--cs-border);
    padding: 28px 24px;
  }
  .cs-right {
    padding: 24px 0;
    gap: 16px;
  }
  .cs-logo-item {
    width: clamp(90px, 28vw, 130px);
    height: clamp(48px, 12vw, 64px);
    padding: 10px 14px;
  }
}

@media (min-width: 769px) and (max-width: 1023px) {
  .cs-wrap {
    grid-template-columns: minmax(240px, 1fr) 1.5fr;
    border-radius: 18px;
  }
  .cs-left {
    padding: clamp(30px, 4vw, 44px) clamp(20px, 3.5vw, 36px);
    border-right: 1px solid var(--cs-border);
  }
  .cs-right {
    padding: clamp(26px, 3.5vw, 40px) clamp(20px, 3vw, 32px);
    gap: clamp(16px, 2vw, 24px);
  }
  .cs-logo-item {
    width: clamp(100px, 14vw, 150px);
    height: clamp(52px, 7vw, 70px);
    padding: 10px 16px;
  }
}
`

function MarqueeRow({ logos, direction }) {
  // Duplicate 4× to ensure seamless loop at any container width
  const items = [...logos, ...logos, ...logos, ...logos]
  return (
    <div className="cs-marquee-row">
      <div className={`cs-marquee-track ${direction}`}>
        {items.map((logo, i) => (
          <div key={`${logo.file}-${i}`} className="cs-logo-item">
            <img
              src={`/company/${logo.file}`}
              alt={logo.name}
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ClientSection() {
  const { dark } = useTheme()
  const ref    = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-8% 0px' })

  const accent      = dark ? '#DB6436' : '#0A5675'
  const borderColor = dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'

  // Split logos into two rows
  const mid  = Math.ceil(LOGOS.length / 2)
  const row1 = LOGOS.slice(0, mid)
  const row2 = LOGOS.slice(mid)

  return (
    <>
      <style>{MARQUEE_CSS}</style>
      <style>{`:root { --cs-border: ${borderColor}; }`}</style>

      <section
        id="clients"
        ref={ref}
        style={{
          background: 'var(--bg-primary)',
          padding: 'clamp(80px, 12vh, 140px) clamp(20px, 6vw, 100px)',
          position: 'relative',
          zIndex: 20,
        }}
      >
        <motion.div
          className="cs-wrap"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* ── Left: text panel ── */}
          <div className="cs-left">
            <motion.div
              className="cs-left-text"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 600,
                fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
                lineHeight: 1.15,
                margin: '0 0 14px',
              }}>
                Our Happy<br />Customers
              </h2>
              <p style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: 'clamp(0.8rem, 1.1vw, 0.9rem)',
                color: 'var(--text-38)',
                lineHeight: 1.7,
                margin: '0 0 28px',
              }}>
                {LOGOS.length}+ brands that trusted us to shape their digital presence.
              </p>

              {/* Stats */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { num: '17+', label: 'Brands Served' },
                  { num: '3×',  label: 'Avg. Engagement Lift' },
                  { num: '90d', label: 'To Measurable Results' },
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.25 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                  >
                    <span style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontWeight: 600,
                      fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
                      letterSpacing: '-0.02em',
                      color: accent,
                    }}>{s.num}</span>
                    <span style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontWeight: 300,
                      fontSize: 'clamp(0.72rem, 0.9vw, 0.8rem)',
                      color: 'var(--text-38)',
                    }}>{s.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right: dual marquee rows ── */}
          <motion.div
            className="cs-right"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <MarqueeRow logos={row1} direction="left" />
            <MarqueeRow logos={row2} direction="right" />
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}
