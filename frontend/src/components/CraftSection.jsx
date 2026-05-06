import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function useIsMobile() {
  const [mobile, setMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)
  useEffect(() => {
    const update = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [])
  return mobile
}

// ─── Service Data ─────────────────────────────────────────────────────────────
const SERVICES = [
  {
    num: '01',
    title: 'Brand Strategy',
    brief: 'We define how the world sees you — from positioning and messaging to visual identity. A strong brand strategy is the foundation every campaign builds on.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 30 30" fill="none">
        <path d="M15 3L5 10v8c0 5.25 4.25 10.14 10 11 5.75-.86 10-5.75 10-11v-8L15 3z" stroke="#E3735E" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M11 15l3 3 5-6" stroke="#E3735E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Digital Marketing',
    brief: 'From SEO and Google Ads to social campaigns and analytics — we build data-driven strategies that put your brand exactly where your audience is looking.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 30 30" fill="none">
        <path d="M6 18V8l10-4 10 4v10" stroke="#E3735E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 14v10" stroke="#E3735E" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="16" cy="12" r="3" stroke="#E3735E" strokeWidth="1.5"/>
        <path d="M10 22l3-4 3 2 4-5 4 3" stroke="#E3735E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Content & Storytelling',
    brief: 'Compelling copy, scroll-stopping visuals, and authentic narratives that cut through the noise and turn casual attention into lasting trust and action.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 30 30" fill="none">
        <path d="M6 6h12l6 6v14a2 2 0 01-2 2H8a2 2 0 01-2-2V6z" stroke="#E3735E" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M18 6v6h6" stroke="#E3735E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 16h10M10 20h6" stroke="#E3735E" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Creative Direction',
    brief: 'From campaign art direction to complete visual systems — we ensure every touchpoint carries a cohesive, memorable creative vision that feels unmistakably you.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 30 30" fill="none">
        <circle cx="10" cy="12" r="3" stroke="#E3735E" strokeWidth="1.5"/>
        <circle cx="20" cy="10" r="3" stroke="#E3735E" strokeWidth="1.5"/>
        <circle cx="15" cy="22" r="3" stroke="#E3735E" strokeWidth="1.5"/>
        <path d="M12.5 13.5l1.5 6M17.5 13l-1.5 6" stroke="#E3735E" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Social Presence',
    brief: 'Strategy-led social content, community engagement, and platform growth — we turn passive followers into loyal advocates who champion your brand daily.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 30 30" fill="none">
        <circle cx="9" cy="12" r="3" stroke="#E3735E" strokeWidth="1.5"/>
        <circle cx="21" cy="12" r="3" stroke="#E3735E" strokeWidth="1.5"/>
        <circle cx="15" cy="8" r="3" stroke="#E3735E" strokeWidth="1.5"/>
        <path d="M12 9.5l-1.5 1M18 9.5l1.5 1" stroke="#E3735E" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M9 15v3a6 6 0 0012 0v-3" stroke="#E3735E" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
]

// ─── Mobile Card ─────────────────────────────────────────────────────────────
function MobileCard({ service, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 }}
      style={{
        padding: '22px', borderRadius: '14px',
        border: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(255,255,255,0.02)',
        display: 'flex', flexDirection: 'column', gap: '12px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          width: 42, height: 42, borderRadius: '11px',
          background: 'rgba(227,115,94,0.08)',
          border: '1px solid rgba(227,115,94,0.18)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>{service.icon}</div>
        <h3 style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontWeight: 500, fontSize: '1rem',
          color: '#f5f0eb', margin: 0, letterSpacing: '-0.01em',
        }}>{service.title}</h3>
      </div>
      <p style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        fontWeight: 300, fontSize: '0.84rem',
        color: 'rgba(245,240,235,0.45)', margin: 0, lineHeight: 1.6,
      }}>{service.brief}</p>
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CraftSection() {
  const sectionRef = useRef(null)
  const groupRef   = useRef(null)
  const cardRefs   = useRef([])
  const rafRef     = useRef(null)
  const isMobile   = useIsMobile()
  const COUNT      = SERVICES.length

  useEffect(() => {
    if (isMobile) return

    const tick = () => {
      const section = sectionRef.current
      if (!section) { rafRef.current = requestAnimationFrame(tick); return }

      const totalScroll = Math.max(section.offsetHeight - window.innerHeight, 1)
      const raw = Math.max(0, Math.min(1, -section.getBoundingClientRect().top / totalScroll))

      // ── Staggered card entrance: raw 0.05 → 0.55 (one by one, slower) ──
      const CARD_START = 0.05
      const CARD_END   = 0.55
      const CARD_WINDOW = (CARD_END - CARD_START) / COUNT

      cardRefs.current.forEach((card, i) => {
        if (!card) return
        const cStart = CARD_START + i * CARD_WINDOW
        const t      = Math.max(0, Math.min(1, (raw - cStart) / (CARD_WINDOW * 1.5)))
        const eased  = 1 - Math.pow(1 - t, 2.5)

        card.style.opacity   = String(eased)
        card.style.transform = `translateY(${(1 - eased) * 40}px)`
      })

      // ── Group exit drift: raw 0.62 → 1.0 ──
      if (groupRef.current) {
        const exitT = Math.max(0, Math.min(1, (raw - 0.62) / 0.38))
        const exitE = 1 - Math.pow(1 - exitT, 2)
        groupRef.current.style.transform = `translateY(${-exitE * 140}px)`
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [isMobile])

  // ── Mobile ──────────────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <section id="craft" style={{ background: '#0a0806', padding: '72px 20px' }}>
        <span style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: '0.72rem', fontWeight: 500,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color: '#E3735E', display: 'block', marginBottom: '14px',
        }}>Our Services</span>
        <h2 style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontWeight: 300, fontSize: 'clamp(1.8rem, 7vw, 2.6rem)',
          letterSpacing: '-0.04em', color: '#f5f0eb',
          margin: '0 0 36px', lineHeight: 1.15,
        }}>
          What we <span style={{ color: '#E3735E', fontStyle: 'italic' }}>bring</span> to your brand.
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {SERVICES.map((s, i) => <MobileCard key={s.num} service={s} index={i} />)}
        </div>
      </section>
    )
  }

  // ── Desktop ─────────────────────────────────────────────────────────────────
  return (
    <section
      id="craft"
      ref={sectionRef}
      style={{ position: 'relative', height: '280vh' }}
    >
      {/* SEO-only */}
      <div style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap' }}>
        <h2>Our Services</h2>
        {SERVICES.map(s => <div key={s.num}><h3>{s.title}</h3><p>{s.brief}</p></div>)}
      </div>

      {/* Sticky viewport frame */}
      <div style={{
        position: 'sticky', top: 0, height: '100vh',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        background: '#0a0806', overflow: 'hidden', zIndex: 10,
      }}>
        {/* Subtle background glow */}
        <div style={{
          position: 'absolute', top: '35%', left: '50%',
          transform: 'translateX(-50%)',
          width: '50vw', height: '30vh',
          background: 'radial-gradient(ellipse at center, rgba(227,115,94,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div
          ref={groupRef}
          style={{
            position: 'relative', zIndex: 1,
            width: '100%', maxWidth: '1540px',
            padding: '0 clamp(28px, 4vw, 64px)',
            willChange: 'transform',
          }}
        >
          {/* ── Header ── */}
          <div style={{ marginBottom: 'clamp(36px, 4.5vh, 56px)', textAlign: 'center' }}>
            <span style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.72rem', fontWeight: 500,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: '#E3735E', display: 'block', marginBottom: '12px',
            }}>Our Services</span>
            <h2 style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)',
              letterSpacing: '-0.04em', color: '#f5f0eb',
              margin: 0, lineHeight: 1.1,
            }}>
              What we <span style={{ color: '#E3735E', fontStyle: 'italic' }}>bring</span> to your brand.
            </h2>
          </div>

          {/* ── All 5 cards in one horizontal line ── */}
          <div style={{
            display: 'flex',
            gap: 'clamp(12px, 1.5vw, 22px)',
            justifyContent: 'center',
          }}>
            {SERVICES.map((service, i) => (
              <div
                key={service.num}
                ref={el => { cardRefs.current[i] = el }}
                style={{
                  flex: '1 1 0',
                  maxWidth: '320px',
                  opacity: 0,
                  willChange: 'opacity, transform',
                  padding: 'clamp(24px, 2.5vw, 36px)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.07)',
                  background: 'rgba(255,255,255,0.025)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', gap: '18px',
                  textAlign: 'center',
                  cursor: 'default',
                  transition: 'border-color 0.3s ease, background 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(227,115,94,0.35)'
                  e.currentTarget.style.background  = 'rgba(227,115,94,0.06)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                  e.currentTarget.style.background  = 'rgba(255,255,255,0.025)'
                }}
              >
                {/* Icon */}
                <div style={{
                  width: 54, height: 54, borderRadius: '14px',
                  background: 'rgba(227,115,94,0.08)',
                  border: '1px solid rgba(227,115,94,0.18)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{service.icon}</div>

                {/* Title */}
                <h3 style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: 'clamp(0.92rem, 1.15vw, 1.1rem)',
                  color: '#f5f0eb', margin: 0, lineHeight: 1.3,
                  letterSpacing: '-0.01em',
                }}>{service.title}</h3>

                {/* Brief description */}
                <p style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 300,
                  fontSize: 'clamp(0.78rem, 0.88vw, 0.86rem)',
                  color: 'rgba(245,240,235,0.45)',
                  margin: 0, lineHeight: 1.65,
                }}>{service.brief}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
