import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import craftBg from '../asset/craft.jpeg'
import goExtraBg from '../asset/GOO.jpeg'

function useIsMobile() {
  const [mobile, setMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)
  useEffect(() => {
    const update = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [])
  return mobile
}

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
      style={{ position: 'relative', height: `${COUNT * 100}vh` }}
    >
      <div style={{
        position: 'sticky', top: 0, height: '100vh',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        background: '#0a0806', overflow: 'hidden', zIndex: 10,
      }}>
        {/* Background images — unchanged */}
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

        {/* Main two-column layout */}
        <div style={{
          position: 'relative', zIndex: 1,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: isMobile ? '32px' : 'clamp(60px, 9vw, 130px)',
          width: '100%',
          maxWidth: '1140px',
          padding: isMobile ? '0 24px' : '0 clamp(32px, 5vw, 80px)',
        }}>

          {/* ── LEFT: stacked service list ── */}
          <div style={{
            flex: '1 1 0',
            maxWidth: isMobile ? '100%' : '520px',
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? '20px' : '28px',
          }}>
            {/* Label */}
            <p style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 300,
              fontSize: isMobile ? '0.65rem' : '0.7rem',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: `${current.accent}88`,
              margin: '0 0 8px',
              transition: 'color 0.5s ease',
            }}>
              Our Services
            </p>

            {SERVICES.map((service, i) => {
              const isActive = i === activeIndex
              return (
                <motion.div
                  key={service.num}
                  animate={{
                    opacity: isActive ? 1 : 0.22,
                    y: isActive ? 0 : 0,
                  }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  style={{ cursor: 'default' }}
                >
                  {/* Title row */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '14px',
                    marginBottom: isActive ? (isMobile ? '8px' : '10px') : 0,
                  }}>
                    {/* Number */}
                    <span style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontWeight: 300,
                      fontSize: isMobile ? '0.7rem' : '0.75rem',
                      color: isActive ? service.accent : 'rgba(245,240,235,0.3)',
                      letterSpacing: '0.08em',
                      transition: 'color 0.5s ease',
                      minWidth: '24px',
                    }}>
                      {service.num}
                    </span>

                    {/* Title */}
                    <motion.h3
                      animate={{
                        fontSize: isActive
                          ? (isMobile ? '1.55rem' : 'clamp(1.7rem, 2.8vw, 2.3rem)')
                          : (isMobile ? '1.1rem' : 'clamp(1.1rem, 1.8vw, 1.4rem)'),
                        color: isActive ? '#f5f0eb' : 'rgba(245,240,235,0.35)',
                      }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontWeight: isActive ? 400 : 300,
                        letterSpacing: '-0.025em',
                        lineHeight: 1.15,
                        margin: 0,
                      }}
                    >
                      {service.title}
                    </motion.h3>
                  </div>

                  {/* Description — only for active */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: 'hidden', paddingLeft: isMobile ? '0' : '38px' }}
                      >
                        {/* Divider */}
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                          style={{
                            height: '1px',
                            width: '48px',
                            background: `linear-gradient(90deg, ${service.accent}cc, transparent)`,
                            transformOrigin: 'left',
                            marginBottom: '10px',
                          }}
                        />
                        <p style={{
                          fontFamily: "'Inter', system-ui, sans-serif",
                          fontWeight: 300,
                          fontSize: isMobile ? '0.9rem' : 'clamp(0.88rem, 1.1vw, 1rem)',
                          lineHeight: 1.8,
                          color: 'rgba(245,240,235,0.5)',
                          margin: 0,
                          maxWidth: '420px',
                        }}>
                          {service.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>

          {/* ── RIGHT: clean portrait reel ── */}
          {!isMobile && (
            <div style={{
              flex: '0 0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {/* Clip container — same size as reel, hides slide travel */}
              <div style={{
                position: 'relative',
                width: 'clamp(220px, 22vw, 290px)',
                aspectRatio: '9 / 16',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: `0 32px 80px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.05)`,
                background: '#000',
              }}>
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={activeIndex}
                    initial={{ y: '100%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    style={{ position: 'absolute', inset: 0 }}
                  >
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    >
                      <source src="/asset/story.mp4" type="video/mp4" />
                    </video>

                    {/* Bottom fade */}
                    <div style={{
                      position: 'absolute', inset: 0, pointerEvents: 'none',
                      background: 'linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.5) 100%)',
                    }} />
                  </motion.div>
                </AnimatePresence>

                {/* Accent glow at bottom edge */}
                <motion.div
                  animate={{ background: `radial-gradient(ellipse at 50% 110%, ${current.accent}22 0%, transparent 55%)` }}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                  style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Scroll hint */}
        {activeIndex === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            style={{
              position: 'absolute',
              bottom: '40px', right: '40px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
              zIndex: 2,
            }}
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              style={{
                width: '16px', height: '24px', borderRadius: '10px',
                border: '1.5px solid rgba(245,240,235,0.18)',
                display: 'flex', justifyContent: 'center', paddingTop: '5px',
              }}
            >
              <div style={{
                width: '2px', height: '5px', borderRadius: '1px',
                background: 'rgba(245,240,235,0.28)',
              }} />
            </motion.div>
            <span style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.58rem', letterSpacing: '0.15em',
              color: 'rgba(245,240,235,0.18)', textTransform: 'uppercase',
            }}>Scroll</span>
          </motion.div>
        )}
      </div>
    </section>
  )
}
