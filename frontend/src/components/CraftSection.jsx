import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTheme } from '../ThemeContext'

function useDeviceType() {
  const [type, setType] = useState(() => {
    if (typeof window === 'undefined') return 'desktop'
    const w = window.innerWidth
    if (w < 768) return 'mobile'
    if (w < 1024) return 'tablet'
    return 'desktop'
  })
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      const newType = w < 768 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop'
      setType(newType)
    }
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [])
  return type
}

/* ── Large icons ── */
function IconBrandStrategy({ size = 140 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <defs>
        <linearGradient id="ig1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.95)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0.45)"/>
        </linearGradient>
      </defs>
      <path d="M60 10L18 38v26c0 18.5 14.8 35.8 42 39C87.2 99.8 102 82.5 102 64V38L60 10z"
        stroke="url(#ig1)" strokeWidth="3.5" strokeLinejoin="round" fill="rgba(255,255,255,0.06)"/>
      <path d="M40 60l12 12 28-24" stroke="url(#ig1)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="60" cy="38" r="6" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
    </svg>
  )
}
function IconDigitalMarketing({ size = 140 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <defs>
        <linearGradient id="ig2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.95)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0.45)"/>
        </linearGradient>
      </defs>
      <rect x="14" y="22" width="92" height="62" rx="8" stroke="url(#ig2)" strokeWidth="3.5" fill="rgba(255,255,255,0.06)"/>
      <path d="M14 94h92" stroke="url(#ig2)" strokeWidth="3" strokeLinecap="round"/>
      <path d="M38 110h44" stroke="url(#ig2)" strokeWidth="3" strokeLinecap="round"/>
      <path d="M60 94v16" stroke="url(#ig2)" strokeWidth="3" strokeLinecap="round"/>
      <path d="M30 66l14-18 12 8 14-20 14 12" stroke="url(#ig2)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="30" cy="66" r="4" fill="rgba(255,255,255,0.6)"/>
      <circle cx="86" cy="48" r="4" fill="rgba(255,255,255,0.6)"/>
    </svg>
  )
}
function IconContent({ size = 140 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <defs>
        <linearGradient id="ig3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.95)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0.45)"/>
        </linearGradient>
      </defs>
      <path d="M20 20h52l28 28v56a6 6 0 01-6 6H26a6 6 0 01-6-6V20z"
        stroke="url(#ig3)" strokeWidth="3.5" fill="rgba(255,255,255,0.06)" strokeLinejoin="round"/>
      <path d="M72 20v28h28" stroke="url(#ig3)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M34 62h52M34 76h34M34 90h42" stroke="url(#ig3)" strokeWidth="3.5" strokeLinecap="round"/>
      <circle cx="34" cy="62" r="3" fill="rgba(255,255,255,0.5)"/>
      <circle cx="34" cy="76" r="3" fill="rgba(255,255,255,0.5)"/>
      <circle cx="34" cy="90" r="3" fill="rgba(255,255,255,0.5)"/>
    </svg>
  )
}
function IconCreative({ size = 140 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <defs>
        <linearGradient id="ig4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.95)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0.45)"/>
        </linearGradient>
      </defs>
      <circle cx="60" cy="36" r="18" stroke="url(#ig4)" strokeWidth="3.5" fill="rgba(255,255,255,0.06)"/>
      <path d="M20 96a40 40 0 0180 0" stroke="url(#ig4)" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M60 54v14" stroke="url(#ig4)" strokeWidth="3" strokeLinecap="round"/>
      <path d="M52 74l-6 12M68 74l6 12" stroke="url(#ig4)" strokeWidth="3" strokeLinecap="round"/>
      <path d="M42 26c4-8 12-14 18-14" stroke="url(#ig4)" strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
    </svg>
  )
}
function IconSocial({ size = 140 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <defs>
        <linearGradient id="ig5" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.95)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0.45)"/>
        </linearGradient>
      </defs>
      <circle cx="60" cy="28" r="16" stroke="url(#ig5)" strokeWidth="3.5" fill="rgba(255,255,255,0.06)"/>
      <circle cx="24" cy="80" r="16" stroke="url(#ig5)" strokeWidth="3.5" fill="rgba(255,255,255,0.06)"/>
      <circle cx="96" cy="80" r="16" stroke="url(#ig5)" strokeWidth="3.5" fill="rgba(255,255,255,0.06)"/>
      <path d="M46 38l-10 26M74 38l10 26" stroke="url(#ig5)" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M40 80h40" stroke="url(#ig5)" strokeWidth="3.5" strokeLinecap="round"/>
    </svg>
  )
}

function IconWebDev({ size = 140 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <defs>
        <linearGradient id="ig6" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.95)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0.45)"/>
        </linearGradient>
      </defs>
      <rect x="10" y="18" width="100" height="72" rx="8" stroke="url(#ig6)" strokeWidth="3.5" fill="rgba(255,255,255,0.06)"/>
      <path d="M10 36h100" stroke="url(#ig6)" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="24" cy="27" r="4" fill="rgba(255,255,255,0.45)"/>
      <circle cx="38" cy="27" r="4" fill="rgba(255,255,255,0.3)"/>
      <circle cx="52" cy="27" r="4" fill="rgba(255,255,255,0.2)"/>
      <path d="M42 58l-14 10 14 10" stroke="url(#ig6)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M78 58l14 10-14 10" stroke="url(#ig6)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M65 52l-10 32" stroke="url(#ig6)" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M10 102h100" stroke="url(#ig6)" strokeWidth="3" strokeLinecap="round" opacity="0.4"/>
    </svg>
  )
}

const ICONS = [IconBrandStrategy, IconDigitalMarketing, IconContent, IconCreative, IconSocial, IconWebDev]

function getServices(dark) {
  return [
    {
      num: '01', title: 'Brand\nStrategy',
      brief: 'Positioning, messaging, and visual identity — the foundation every great campaign builds on.',
      bg: dark ? 'linear-gradient(160deg,#2c1006 0%,#160803 50%,#200c04 100%)' : 'linear-gradient(160deg,#0e3650 0%,#062030 50%,#092840 100%)',
    },
    {
      num: '02', title: 'Digital\nMarketing',
      brief: 'SEO, Google Ads, social campaigns — data-driven strategies that reach your exact audience.',
      bg: dark ? 'linear-gradient(160deg,#281005 0%,#140703 50%,#1c0c04 100%)' : 'linear-gradient(160deg,#0a2e48 0%,#041a2c 50%,#071e38 100%)',
    },
    {
      num: '03', title: 'Content &\nStorytelling',
      brief: 'Copy, visuals, and narratives that cut through noise and turn attention into lasting trust.',
      bg: dark ? 'linear-gradient(160deg,#2a1207 0%,#150804 50%,#1e0d05 100%)' : 'linear-gradient(160deg,#0c3246 0%,#051c2e 50%,#08263c 100%)',
    },
    {
      num: '04', title: 'Creative\nDirection',
      brief: 'Art direction to complete visual systems — every touchpoint unmistakably yours.',
      bg: dark ? 'linear-gradient(160deg,#240e05 0%,#130703 50%,#1a0b04 100%)' : 'linear-gradient(160deg,#082a40 0%,#04182a 50%,#062034 100%)',
    },
    {
      num: '05', title: 'Social\nPresence',
      brief: 'Strategy-led content and community growth — turning followers into loyal brand advocates.',
      bg: dark ? 'linear-gradient(160deg,#2e1408 0%,#170903 50%,#220e05 100%)' : 'linear-gradient(160deg,#103852 0%,#072232 50%,#092c42 100%)',
    },
    {
      num: '06', title: 'Web\nDevelopment',
      brief: 'Fast, responsive, and conversion-optimised websites built to showcase your brand and drive results.',
      bg: dark ? 'linear-gradient(160deg,#241408 0%,#120a04 50%,#1a1005 100%)' : 'linear-gradient(160deg,#0c3040 0%,#051a28 50%,#082230 100%)',
    },
  ]
}

// Per-card initial rotation for the "fanned deck" feel
const ROTATIONS = [-6, -3, -1, 1, 3, 6]

export default function CraftSection() {
  const { dark }  = useTheme()
  const deviceType = useDeviceType()
  const isMobile  = deviceType === 'mobile'
  const isTablet  = deviceType === 'tablet'
  const SERVICES  = getServices(dark)
  const accent    = dark ? '#E3735E' : '#0A5675'
  const glowColor = dark ? 'rgba(219,100,54,0.35)' : 'rgba(10,86,117,0.40)'

  const outerRef  = useRef(null)
  const trackRef  = useRef(null)
  const headerRef = useRef(null)
  const inView    = useInView(headerRef, { once: true, margin: '-5% 0px' })

  const [active, setActive] = useState(0)

  const vw       = typeof window !== 'undefined' ? window.innerWidth : 1440
  const vh       = typeof window !== 'undefined' ? window.innerHeight : 900
  const CARD_W   = isMobile
    ? Math.round(vw * 0.76)
    : isTablet
      ? Math.round(Math.min(340, vw * 0.33))
      : Math.round(Math.min(380, vw * 0.30))
  const CARD_H   = isMobile ? Math.round(vh * 0.68) : Math.round(vh * 0.74)
  const GAP      = isMobile ? 16 : isTablet ? 18 : 24
  // Left padding so first card is roughly centred
  const PEEK     = Math.round((vw - CARD_W) / 2)

  const totalW   = PEEK + SERVICES.length * (CARD_W + GAP) - GAP + PEEK
  const maxShift = totalW - vw   // total px the track travels

  useEffect(() => {
    let raf = null
    let cur = 0

    const tick = (target) => {
      cur += (target - cur) * 0.09
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${-cur}px)`
      }
      // active index
      const centreCard = Math.round((cur + vw / 2 - PEEK) / (CARD_W + GAP))
      setActive(Math.max(0, Math.min(SERVICES.length - 1, centreCard)))

      if (Math.abs(target - cur) > 0.3) raf = requestAnimationFrame(() => tick(target))
    }

    const onScroll = () => {
      const outer = outerRef.current
      if (!outer) return
      const scrolled = -outer.getBoundingClientRect().top
      const sectionH = outer.offsetHeight - vh
      const progress = Math.max(0, Math.min(1, scrolled / sectionH))
      const target   = progress * maxShift
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => tick(target))
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [maxShift, CARD_W, GAP, PEEK, SERVICES.length, vh, vw])

  // Outer height: sticky 100vh + enough room to scroll all cards
  const outerH = vh + maxShift

  return (
    <section id="craft" ref={outerRef} style={{ height: outerH, position: 'relative' }}>
      <div style={{
        position: 'sticky', top: 0, height: vh,
        overflow: 'hidden', background: 'var(--bg-section)',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            textAlign: 'center', flexShrink: 0,
            padding: isMobile ? '36px 20px 20px' : isTablet ? '40px 16px 20px' : '42px 0 22px',
          }}
        >
          <span style={{
            fontFamily: "'Inter', sans-serif", fontSize: '0.68rem', fontWeight: 500,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: accent, display: 'block', marginBottom: '8px',
          }}>Our Services</span>
          <h2 style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 300,
            fontSize: isMobile ? 'clamp(1.55rem,6.5vw,2.1rem)' : isTablet ? 'clamp(1.65rem,3vw,2.2rem)' : 'clamp(1.7rem,2.6vw,2.5rem)',
            letterSpacing: '-0.04em', color: 'var(--text-primary)',
            margin: 0, lineHeight: 1.1,
          }}>
            What we <span style={{ color: accent, fontStyle: 'italic' }}>bring</span> to your brand.
          </h2>
        </motion.div>

        {/* Cards track */}
        <div style={{ flex: 1, overflow: 'visible', position: 'relative' }}>
          <div
            ref={trackRef}
            style={{
              display: 'flex', alignItems: 'center',
              gap: GAP,
              paddingLeft: PEEK, paddingRight: PEEK,
              height: '100%',
              willChange: 'transform',
            }}
          >
            {SERVICES.map((s, i) => {
              const IconComp = ICONS[i]
              const isActive = i === active
              const rot      = isActive ? 0 : ROTATIONS[i]
              const iconSize = isMobile ? 110 : 130

              return (
                <motion.div
                  key={s.num}
                  initial={{ opacity: 0, y: 80, rotate: ROTATIONS[i] * 1.8 }}
                  animate={inView ? { opacity: 1, y: 0, rotate: rot } : {}}
                  transition={{
                    duration: 0.75, ease: [0.22, 1, 0.36, 1],
                    delay: 0.08 + i * 0.1,
                    rotate: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                  }}
                  style={{
                    width: CARD_W, height: CARD_H,
                    flexShrink: 0, position: 'relative',
                    borderRadius: '24px', overflow: 'hidden',
                    background: s.bg,
                    border: `1px solid rgba(255,255,255,${isActive ? '0.14' : '0.07'})`,
                    boxShadow: isActive
                      ? `0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.08)`
                      : `0 16px 48px rgba(0,0,0,0.4)`,
                    transform: `scale(${isActive ? 1 : 0.93}) rotate(${rot}deg)`,
                    transition: 'transform 0.55s cubic-bezier(0.22,1,0.36,1), box-shadow 0.55s ease, border-color 0.55s ease',
                    display: 'flex', flexDirection: 'column',
                    cursor: 'default', userSelect: 'none',
                  }}
                >
                  {/* Circular watermark (like reference) */}
                  <div style={{
                    position: 'absolute', bottom: '-15%', right: '-10%',
                    width: '90%', height: '90%',
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.05)',
                    pointerEvents: 'none',
                  }} />
                  <div style={{
                    position: 'absolute', bottom: '-5%', right: '-18%',
                    width: '75%', height: '75%',
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.04)',
                    pointerEvents: 'none',
                  }} />

                  {/* Top glow */}
                  <div style={{
                    position: 'absolute', top: 0, left: '50%',
                    transform: 'translateX(-50%)',
                    width: '100%', height: '60%',
                    background: `radial-gradient(ellipse 75% 55% at 50% 0%, ${glowColor} 0%, transparent 72%)`,
                    pointerEvents: 'none',
                  }} />

                  {/* Number badge */}
                  <div style={{
                    position: 'absolute', top: 20, left: 22,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.6rem', fontWeight: 700,
                    letterSpacing: '0.16em', color: 'rgba(255,255,255,0.2)',
                  }}>{s.num}</div>

                  {/* Icon — upper center */}
                  <div style={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -64%)',
                    opacity: isActive ? 1 : 0.65,
                    transition: 'opacity 0.45s ease',
                    filter: `drop-shadow(0 8px 32px ${glowColor})`,
                    pointerEvents: 'none',
                  }}>
                    <IconComp size={iconSize} />
                  </div>

                  {/* Bottom text */}
                  <div style={{
                    marginTop: 'auto',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.28) 55%, transparent 100%)',
                    padding: isMobile ? '52px 20px 24px' : isTablet ? '58px 22px 26px' : '64px 26px 28px',
                    position: 'relative', zIndex: 2,
                  }}>
                    <h3 style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 700,
                      fontSize: isMobile ? 'clamp(1.6rem,6vw,2rem)' : 'clamp(1.7rem,2.2vw,2.2rem)',
                      color: '#fff', margin: '0 0 10px',
                      lineHeight: 1.1, letterSpacing: '-0.03em',
                      whiteSpace: 'pre-line',
                    }}>{s.title}</h3>
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 300, fontSize: '0.78rem',
                      color: 'rgba(255,255,255,0.55)',
                      margin: 0, lineHeight: 1.6,
                    }}>{s.brief}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Dot indicators */}
        <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          gap: '6px', flexShrink: 0,
          padding: isMobile ? '14px 0 26px' : isTablet ? '15px 0 27px' : '16px 0 28px',
        }}>
          {SERVICES.map((_, i) => (
            <div key={i} style={{
              width: i === active ? 24 : 6,
              height: 6, borderRadius: '100px',
              background: i === active ? accent : 'var(--text-faintest)',
              transition: 'width 0.35s cubic-bezier(0.22,1,0.36,1), background 0.35s ease',
            }} />
          ))}
        </div>
      </div>
    </section>
  )
}
