import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../ThemeContext'
import { WORK_CLIENTS, SERVICES } from '../data/workByService'
import { useSeo } from '../hooks/useSeo'
import { WORK_SEO } from '../data/site'
import imgKoin from '../asset/Koin_Home_Image.jpg'
import imgAmata from '../asset/Amata_Image.jpg'
import imgVillage from '../asset/village-dekstopview.jpg'
import imgNetZero from '../asset/NET_Zero_Vision_Image.jpg'
import imgBolpu from '../asset/BOLPU_Image.jpg'
import imgAlvas from '../asset/Alvas_Schools_Image.jpg'
import imgVaibhav from '../asset/Vaibhav_Veda_Image.jpg'
import imgMsDev from '../asset/MS_Developers_Image.jpg'
import imgGoldfinch from '../asset/Goldfinch_Image.jpg'
import imgRadiance from '../asset/radiance.jpg'
import imgOlive from '../asset/Olive-Dekstop.jpg'
import imgEta from '../asset/etafinalfix.jpg'

const CLIENT_IMAGES = {
  'radiance':            { image: imgRadiance, position: 'center' },
  'olive':               { image: imgOlive,    position: 'center' },
  'koin-home':           { image: imgKoin,     position: 'center' },
  'amata-building-care': { image: imgAmata,    position: 'center' },
  'eta':                 { image: imgEta,      position: 'center' },
  'village':             { image: imgVillage,  position: 'center' },
  'bolpu':               { image: imgBolpu,    position: 'center' },
  'alvas-schools':       { image: imgAlvas,    position: 'center' },
  'vaibhav-veda':        { image: imgVaibhav,  position: 'center' },
  'ms-developers':       { image: imgMsDev,    position: 'center' },
  'goldfinch':           { image: imgGoldfinch, position: 'center' },
  'net-zero':            { image: imgNetZero,  position: 'center' },
}

const CLIENTS = Object.fromEntries(
  Object.entries(WORK_CLIENTS).map(([id, c]) => [id, { ...c, ...CLIENT_IMAGES[id] }])
)

const EASE = [0.22, 1, 0.36, 1]

const CSS = `
.svc-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 0 0 clamp(20px, 3vw, 28px);
}
.svc-tab {
  position: relative;
  border: 1px solid var(--svc-border);
  background: transparent;
  color: var(--text-primary);
  font-family: 'Inter', system-ui, sans-serif;
  font-size: clamp(0.8rem, 1vw, 0.92rem);
  font-weight: 500;
  padding: 11px 20px;
  border-radius: 999px;
  cursor: pointer;
  transition: color 0.3s ease, border-color 0.3s ease;
  -webkit-tap-highlight-color: transparent;
}
.svc-tab[aria-selected="true"] { color: #fff; border-color: transparent; }
.svc-tab:focus-visible { outline: 2px solid var(--svc-accent); outline-offset: 3px; }
.svc-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(20px, 2.6vw, 36px);
}
.svc-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0;
  border: 1px solid var(--svc-border);
  border-radius: 20px;
  overflow: hidden;
  background: var(--card-bg, transparent);
  text-align: left;
  cursor: pointer;
  font: inherit;
  color: inherit;
  transition: border-color 0.35s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.5s ease;
}
.svc-card:hover {
  border-color: var(--svc-accent);
  transform: translateY(-4px);
  box-shadow: 0 18px 40px -18px rgba(0,0,0,0.45);
}
.svc-card:focus-visible { outline: 2px solid var(--svc-accent); outline-offset: 3px; }
.svc-media {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #111;
}
.svc-media img {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.9s cubic-bezier(0.22,1,0.36,1);
}
.svc-card:hover .svc-media img { transform: scale(1.04); }
.svc-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: clamp(18px, 2vw, 26px) clamp(20px, 2.2vw, 28px);
}
.svc-text { min-width: 0; }
.svc-name {
  display: block;
  font-family: 'Inter', system-ui, sans-serif;
  font-weight: 600;
  font-size: clamp(1.1rem, 1.6vw, 1.4rem);
  letter-spacing: -0.02em;
  line-height: 1.25;
  color: var(--text-primary);
  margin: 0 0 6px;
}
.svc-line {
  display: block;
  font-family: 'Inter', system-ui, sans-serif;
  font-weight: 300;
  font-size: clamp(0.85rem, 1vw, 0.95rem);
  line-height: 1.55;
  color: var(--text-38);
}
.svc-arrow {
  flex-shrink: 0;
  width: 46px; height: 46px;
  border-radius: 50%;
  border: 1px solid var(--svc-border);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  color: var(--text-primary);
  transition: background 0.35s ease, border-color 0.35s ease, color 0.35s ease, transform 0.35s ease;
}
.svc-card:hover .svc-arrow {
  background: var(--svc-accent);
  border-color: var(--svc-accent);
  color: #fff;
  transform: rotate(-45deg);
}
.svc-back {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 clamp(28px, 5vh, 48px);
  padding: 10px 18px 10px 14px;
  border-radius: 999px;
  border: 1px solid var(--svc-border);
  background: transparent;
  color: var(--text-primary);
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.3s ease, color 0.3s ease, background 0.3s ease;
}
.svc-back:hover { border-color: var(--svc-accent); color: var(--svc-accent); }
.svc-back:focus-visible { outline: 2px solid var(--svc-accent); outline-offset: 3px; }
.svc-back-arrow { display: inline-block; transition: transform 0.3s ease; }
.svc-back:hover .svc-back-arrow { transform: translateX(-4px); }
@media (max-width: 860px) {
  .svc-grid { grid-template-columns: 1fr; }
}
@media (max-width: 600px) {
  .svc-arrow { width: 40px; height: 40px; }
  .svc-tabs { flex-wrap: nowrap; overflow-x: auto; scrollbar-width: none; margin-left: -4px; padding: 0 4px 4px; }
  .svc-tabs::-webkit-scrollbar { display: none; }
  .svc-tab { white-space: nowrap; flex-shrink: 0; }
}
`

const TAB_KEY = 'workByServiceTab'

function readTab() {
  try {
    const saved = sessionStorage.getItem(TAB_KEY)
    if (SERVICES.some(s => s.key === saved)) return saved
  } catch { /* storage unavailable */ }
  return SERVICES[0].key
}

export default function WorkByServicePage() {
  const { dark } = useTheme()
  const navigate = useNavigate()
  const [active, setActive] = useState(readTab)
  useSeo(WORK_SEO)

  useEffect(() => {
    window.scrollTo(0, 0)
    // Clear the flag a case study sets, so it doesn't fire later on the home page
    try { sessionStorage.removeItem('scrollToOurWork') } catch { /* ignore */ }
  }, [])

  useEffect(() => {
    try { sessionStorage.setItem(TAB_KEY, active) } catch { /* ignore */ }
  }, [active])

  const goBack = () => {
    try { sessionStorage.setItem('scrollToOurWorkEnd', 'true') } catch { /* ignore */ }
    navigate('/')
  }
  const accent = dark ? '#DB6436' : '#0A5675'
  const border = dark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.14)'
  const service = SERVICES.find(s => s.key === active)

  return (
    <motion.main
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      style={{
        background: 'var(--bg-primary)',
        minHeight: '100vh',
        padding: 'clamp(110px, 16vh, 160px) clamp(16px, 6vw, 100px) clamp(80px, 12vh, 140px)',
        position: 'relative',
        boxSizing: 'border-box',
        '--svc-border': border,
        '--svc-accent': accent,
      }}
    >
      <style>{CSS}</style>

      <motion.button
        type="button"
        className="svc-back"
        onClick={goBack}
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
      >
        <span className="svc-back-arrow" aria-hidden="true">←</span>
        Back
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
        style={{ marginBottom: 'clamp(28px, 4vw, 44px)' }}
      >
        <p style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: '0.72rem',
          fontWeight: 600,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: accent,
          margin: '0 0 12px',
        }}>Our clients, by service</p>
        <h1 style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontWeight: 600,
          fontSize: 'clamp(2rem, 4.4vw, 3.6rem)',
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          color: 'var(--text-primary)',
          margin: 0,
        }}>What we did for each brand</h1>
      </motion.div>

      <motion.div
        className="svc-tabs"
        role="tablist"
        aria-label="Services"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
      >
        {SERVICES.map(s => (
          <button
            key={s.key}
            role="tab"
            id={`svc-tab-${s.key}`}
            aria-selected={active === s.key}
            aria-controls="svc-panel"
            className="svc-tab"
            onClick={() => setActive(s.key)}
          >
            {active === s.key && (
              <motion.span
                layoutId="svc-pill"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                style={{ position: 'absolute', inset: 0, borderRadius: 999, background: accent, zIndex: 0 }}
              />
            )}
            <span style={{ position: 'relative', zIndex: 1 }}>{s.label}</span>
          </button>
        ))}
      </motion.div>

      <div id="svc-panel" role="tabpanel" aria-labelledby={`svc-tab-${active}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <p style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(0.9rem, 1.2vw, 1.02rem)',
              color: 'var(--text-38)',
              lineHeight: 1.6,
              margin: '0 0 clamp(20px, 3vw, 28px)',
              maxWidth: '620px',
            }}>{service.blurb}</p>

            <div className="svc-grid">
              {service.clients.map((id, i) => {
                const c = CLIENTS[id]
                return (
                  <motion.button
                    key={id}
                    type="button"
                    className="svc-card"
                    onClick={() => navigate(`/case-study/${id}`)}
                    aria-label={`View ${c.name} case study`}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
                  >
                    <span className="svc-media">
                      <img src={c.image} alt="" loading="lazy" decoding="async" style={{ objectPosition: c.position }} />
                    </span>
                    <span className="svc-body">
                      <span className="svc-text">
                        <span className="svc-name">{c.name}</span>
                        <span className="svc-line">{c.line}</span>
                      </span>
                      <span className="svc-arrow" aria-hidden="true">→</span>
                    </span>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.main>
  )
}
