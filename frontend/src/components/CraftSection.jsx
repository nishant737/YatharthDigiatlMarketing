import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTheme } from '../ThemeContext'

function useIsMobile() {
  const [mobile, setMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)
  useEffect(() => {
    const update = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [])
  return mobile
}

function getServices(c) {
  return [
    {
      num: '01',
      title: 'Brand Strategy',
      brief: 'We define how the world sees you — from positioning and messaging to visual identity. A strong brand strategy is the foundation every campaign builds on.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 30 30" fill="none">
          <path d="M15 3L5 10v8c0 5.25 4.25 10.14 10 11 5.75-.86 10-5.75 10-11v-8L15 3z" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M11 15l3 3 5-6" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      num: '02',
      title: 'Digital Marketing',
      brief: 'From SEO and Google Ads to social campaigns and analytics — we build data-driven strategies that put your brand exactly where your audience is looking.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 30 30" fill="none">
          <path d="M6 18V8l10-4 10 4v10" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 14v10" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="16" cy="12" r="3" stroke={c} strokeWidth="1.5"/>
          <path d="M10 22l3-4 3 2 4-5 4 3" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      num: '03',
      title: 'Content & Storytelling',
      brief: 'Compelling copy, scroll-stopping visuals, and authentic narratives that cut through the noise and turn casual attention into lasting trust and action.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 30 30" fill="none">
          <path d="M6 6h12l6 6v14a2 2 0 01-2 2H8a2 2 0 01-2-2V6z" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M18 6v6h6" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 16h10M10 20h6" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      num: '04',
      title: 'Creative Direction',
      brief: 'From campaign art direction to complete visual systems — we ensure every touchpoint carries a cohesive, memorable creative vision that feels unmistakably you.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 30 30" fill="none">
          <circle cx="10" cy="12" r="3" stroke={c} strokeWidth="1.5"/>
          <circle cx="20" cy="10" r="3" stroke={c} strokeWidth="1.5"/>
          <circle cx="15" cy="22" r="3" stroke={c} strokeWidth="1.5"/>
          <path d="M12.5 13.5l1.5 6M17.5 13l-1.5 6" stroke={c} strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      num: '05',
      title: 'Social Presence',
      brief: 'Strategy-led social content, community engagement, and platform growth — we turn passive followers into loyal advocates who champion your brand daily.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 30 30" fill="none">
          <circle cx="9" cy="12" r="3" stroke={c} strokeWidth="1.5"/>
          <circle cx="21" cy="12" r="3" stroke={c} strokeWidth="1.5"/>
          <circle cx="15" cy="8" r="3" stroke={c} strokeWidth="1.5"/>
          <path d="M12 9.5l-1.5 1M18 9.5l1.5 1" stroke={c} strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M9 15v3a6 6 0 0012 0v-3" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
    },
  ]
}

// ── Mobile card with InView animation ────────────────────────────────────────
function MobileCard({ service, index, accent, accentBg, accentBorder }) {
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
        border: '1px solid var(--border-subtle)',
        background: 'var(--card-bg2)',
        display: 'flex', flexDirection: 'column', gap: '12px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          width: 42, height: 42, borderRadius: '11px',
          background: accentBg, border: `1px solid ${accentBorder}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>{service.icon}</div>
        <h3 style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontWeight: 500, fontSize: '1rem',
          color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.01em',
        }}>{service.title}</h3>
      </div>
      <p style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        fontWeight: 300, fontSize: '0.84rem',
        color: 'var(--text-muted)', margin: 0, lineHeight: 1.6,
      }}>{service.brief}</p>
    </motion.div>
  )
}

export default function CraftSection() {
  const { dark } = useTheme()
  const accent           = dark ? '#E3735E' : '#0A5675'
  const accentBg         = dark ? 'rgba(227,115,94,0.08)'  : 'rgba(10,86,117,0.08)'
  const accentBorder     = dark ? 'rgba(227,115,94,0.18)'  : 'rgba(10,86,117,0.18)'
  const accentHover      = dark ? 'rgba(227,115,94,0.35)'  : 'rgba(10,86,117,0.25)'
  const accentCardHoverBg= dark ? 'rgba(227,115,94,0.06)'  : 'rgba(10,86,117,0.05)'
  const SERVICES         = getServices(accent)
  const COUNT            = SERVICES.length

  const isMobile   = useIsMobile()
  const headerRef  = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-8% 0px' })
  const cardsRef   = useRef(null)
  const cardsInView = useInView(cardsRef, { once: true, margin: '-6% 0px' })

  // ── Mobile ───────────────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <section id="craft" style={{ background: 'var(--bg-section)', padding: '72px 20px' }}>
        <span style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: '0.72rem', fontWeight: 500,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color: accent, display: 'block', marginBottom: '14px',
        }}>Our Services</span>
        <h2 style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontWeight: 300, fontSize: 'clamp(1.8rem, 7vw, 2.6rem)',
          letterSpacing: '-0.04em', color: 'var(--text-primary)',
          margin: '0 0 36px', lineHeight: 1.15,
        }}>
          What we <span style={{ color: accent, fontStyle: 'italic' }}>bring</span> to your brand.
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {SERVICES.map((s, i) => (
            <MobileCard key={s.num} service={s} index={i} accent={accent} accentBg={accentBg} accentBorder={accentBorder} />
          ))}
        </div>
      </section>
    )
  }

  // ── Desktop — normal scroll, all 5 cards in one row with stagger ─────────────
  return (
    <section
      id="craft"
      style={{
        position: 'relative',
        background: 'var(--bg-section)',
        padding: 'clamp(80px, 12vh, 120px) clamp(28px, 4vw, 64px)',
        zIndex: 10,
      }}
    >
      {/* Header */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 24 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: 'center', marginBottom: 'clamp(40px, 5vh, 64px)' }}
      >
        <span style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: '0.72rem', fontWeight: 500,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color: accent, display: 'block', marginBottom: '12px',
        }}>Our Services</span>
        <h2 style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontWeight: 300,
          fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)',
          letterSpacing: '-0.04em', color: 'var(--text-primary)',
          margin: 0, lineHeight: 1.1,
        }}>
          What we <span style={{ color: accent, fontStyle: 'italic' }}>bring</span> to your brand.
        </h2>
      </motion.div>

      {/* All 5 cards in one row — staggered fade-up on scroll into view */}
      <div
        ref={cardsRef}
        style={{
          display: 'flex',
          gap: 'clamp(12px, 1.5vw, 22px)',
          justifyContent: 'center',
          maxWidth: '1540px',
          margin: '0 auto',
        }}
      >
        {SERVICES.map((service, i) => (
          <motion.div
            key={service.num}
            initial={{ opacity: 0, y: 40 }}
            animate={cardsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.09 }}
            style={{
              flex: '1 1 0',
              maxWidth: '320px',
              padding: 'clamp(24px, 2.5vw, 36px)',
              borderRadius: '16px',
              border: '1px solid var(--card-border)',
              background: 'var(--card-bg)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: '18px',
              textAlign: 'center',
              cursor: 'default',
              transition: 'border-color 0.3s ease, background 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = accentHover
              e.currentTarget.style.background  = accentCardHoverBg
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = ''
              e.currentTarget.style.background  = ''
            }}
          >
            <div style={{
              width: 54, height: 54, borderRadius: '14px',
              background: accentBg, border: `1px solid ${accentBorder}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{service.icon}</div>

            <h3 style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 500,
              fontSize: 'clamp(0.92rem, 1.15vw, 1.1rem)',
              color: 'var(--text-primary)', margin: 0, lineHeight: 1.3,
              letterSpacing: '-0.01em',
            }}>{service.title}</h3>

            <p style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(0.78rem, 0.88vw, 0.86rem)',
              color: 'var(--text-muted)',
              margin: 0, lineHeight: 1.65,
            }}>{service.brief}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
