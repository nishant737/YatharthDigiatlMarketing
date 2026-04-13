import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import craftBg from '../asset/craft.jpeg'
import goExtraBg from '../asset/goextra.jpeg'

function useIsMobile() {
  const [mobile, setMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)
  useEffect(() => {
    const update = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [])
  return mobile
}

// ─── Service data ─────────────────────────────────────────────────────────────
const SERVICES = [
  {
    num: '01', title: 'Brand Strategy',
    desc: 'We define how you are seen. From positioning and identity to the story your brand tells the world — we craft the strategic foundation that makes everything else work.',
    icon: '◎', accent: '#DB6436',
  },
  {
    num: '02', title: 'Digital Marketing',
    desc: 'We make sure you are found. Through SEO, paid campaigns, analytics, and smart targeting — we put your brand exactly where your audience is looking.',
    icon: '◈', accent: '#C85A30',
  },
  {
    num: '03', title: 'Content & Storytelling',
    desc: 'We give your brand a voice. Compelling copy, scroll-stopping visuals, and narratives that resonate — we create content that moves people to action.',
    icon: '❖', accent: '#C85A30',
  },
  {
    num: '04', title: 'Creative Direction',
    desc: 'We shape how it feels. From visual systems to campaign art direction — we ensure every touchpoint carries a cohesive, unforgettable creative vision.',
    icon: '✦', accent: '#DB6436',
  },
  {
    num: '05', title: 'Social Presence',
    desc: 'We build how you show up daily. Strategy-led social content, community engagement, and platform growth — we turn followers into loyal fans.',
    icon: '◇', accent: '#C85A30',
  },
]

// ─── Main section ─────────────────────────────────────────────────────────────
export default function CraftSection() {
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const isMobile = useIsMobile()
  const COUNT = SERVICES.length

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const sectionTop = -rect.top
      const scrollableHeight = section.offsetHeight - window.innerHeight
      if (scrollableHeight <= 0) return
      const progress = Math.max(0, Math.min(1, sectionTop / scrollableHeight))
      const idx = Math.min(COUNT - 1, Math.floor(progress * COUNT))
      setActiveIndex(idx)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [COUNT])

  const current = SERVICES[activeIndex]

  return (
    <section
      id="craft"
      ref={sectionRef}
      style={{
        position: 'relative',
        height: `${COUNT * 100}vh`,
      }}
    >
      {/* Sticky viewport */}
      <div style={{
        position: 'sticky', top: 0, height: '100vh',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        background: '#0a0806', overflow: 'hidden', zIndex: 10,
      }}>
        {/* Background images */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: `url(${craftBg})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.04, pointerEvents: 'none',
        }} />
        <div aria-hidden style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: `url(${goExtraBg})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.07, pointerEvents: 'none',
        }} />

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'relative', zIndex: 1,
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 300, fontSize: isMobile ? '1.1rem' : 'clamp(1.3rem,4vw,2.1rem)',
            letterSpacing: '-0.03em', color: '#f5f0eb',
            marginBottom: isMobile ? '20px' : '60px',
            textAlign: isMobile ? 'left' : 'center',
            width: isMobile ? '100%' : 'auto',
            paddingLeft: isMobile ? '24px' : 0,
          }}
        >
          Our Services
        </motion.h2>

        {/* Number + Content layout */}
        <div style={{
          position: 'relative', zIndex: 1,
          display: 'flex',
          flexDirection: 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: isMobile ? 'flex-start' : 'center',
          gap: isMobile ? '16px' : 'clamp(40px, 8vw, 120px)',
          width: '100%',
          maxWidth: '1100px',
          padding: isMobile ? '0 20px' : '0 clamp(24px, 4vw, 60px)',
        }}>

          {/* LEFT — Big number */}
          <div style={{
            position: 'relative',
            display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'flex-start' : 'center',
            minWidth: isMobile ? '70px' : '220px',
            paddingTop: isMobile ? '4px' : 0,
          }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={activeIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 200,
                  fontSize: isMobile ? '3.2rem' : 'clamp(7rem, 12vw, 11rem)',
                  lineHeight: 1,
                  color: 'transparent',
                  WebkitTextStroke: isMobile ? `1px ${current.accent}` : `1.5px ${current.accent}`,
                  letterSpacing: '-0.04em',
                  userSelect: 'none',
                }}
              >
                {current.num}
              </motion.span>
            </AnimatePresence>

          </div>

          {/* RIGHT — Content */}
          <div style={{
            flex: 1, maxWidth: isMobile ? 'none' : '560px',
            minHeight: isMobile ? '180px' : '280px',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
            paddingTop: isMobile ? '2px' : 0,
          }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '10px' : '16px' }}
              >
                {/* Icon + Title row on mobile */}
                {isMobile ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                      fontSize: '1.2rem',
                      color: current.accent, lineHeight: 1,
                      filter: `drop-shadow(0 0 6px ${current.accent}44)`,
                    }}>
                      {current.icon}
                    </span>
                    <h3 style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontWeight: 500,
                      fontSize: '1.4rem',
                      color: '#f5f0eb', margin: 0,
                      letterSpacing: '-0.02em',
                    }}>
                      {current.title}
                    </h3>
                  </div>
                ) : (
                  <>
                    {/* Icon */}
                    <span style={{
                      fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)',
                      color: current.accent, lineHeight: 1,
                      filter: `drop-shadow(0 0 8px ${current.accent}44)`,
                    }}>
                      {current.icon}
                    </span>

                    {/* Title */}
                    <h3 style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontWeight: 500,
                      fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                      color: '#f5f0eb', margin: 0,
                      letterSpacing: '-0.02em',
                    }}>
                      {current.title}
                    </h3>
                  </>
                )}

                {/* Divider */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    height: '1px', width: isMobile ? '40px' : '60px',
                    background: `linear-gradient(90deg, ${current.accent}cc, transparent)`,
                    transformOrigin: 'left',
                  }}
                />

                {/* Description */}
                <p style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 300,
                  fontSize: isMobile ? '0.95rem' : 'clamp(0.92rem, 1.2vw, 1.05rem)',
                  lineHeight: isMobile ? 1.7 : 1.75,
                  color: 'rgba(245,240,235,0.55)', margin: 0,
                  maxWidth: '480px',
                }}>
                  {current.desc}
                </p>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Scroll hint */}
        {activeIndex === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            style={{
              position: 'absolute', bottom: isMobile ? '24px' : '60px', right: isMobile ? '20px' : '32px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
              zIndex: 2,
            }}
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              style={{
                width: '16px', height: '24px', borderRadius: '10px',
                border: '1.5px solid rgba(245,240,235,0.2)',
                display: 'flex', justifyContent: 'center', paddingTop: '5px',
              }}
            >
              <div style={{
                width: '2px', height: '5px', borderRadius: '1px',
                background: 'rgba(245,240,235,0.3)',
              }} />
            </motion.div>
            <span style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.58rem', letterSpacing: '0.15em',
              color: 'rgba(245,240,235,0.2)', textTransform: 'uppercase',
            }}>
              Scroll
            </span>
          </motion.div>
        )}
      </div>
    </section>
  )
}
