import { useRef, useEffect, useState } from 'react'
import img1 from '../asset/final1.png'
import img2 from '../asset/final2.png'
import img3 from '../asset/final3.png'
import img4 from '../asset/mywork.jpeg'
import img5 from '../asset/GOO.jpeg'

function useIsMobile() {
  const [mobile, setMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)
  useEffect(() => {
    const update = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [])
  return mobile
}

const PROJECTS = [
  {
    title: 'BOLPU',
    category: 'Brand Strategy',
    tag: 'Digital Marketing',
    year: '2024',
    image: img1,
  },
  {
    title: 'ETA',
    category: 'Digital Campaigns',
    tag: 'Performance Marketing',
    year: '2024',
    image: img2,
  },
  {
    title: 'NET ZERO',
    category: 'Event Marketing',
    tag: 'Brand & Promotion',
    year: '2023',
    image: img3,
  },
  {
    title: 'KADALA PARBHA',
    category: 'Social Media',
    tag: 'Content Strategy',
    year: '2024',
    image: img4,
  },
  {
    title: 'MIT KUNDAPURA',
    category: 'Content Strategy',
    tag: 'Educational Marketing',
    year: '2024',
    image: img5,
  },
]

function ProjectCard({ project, imageRef, footerRef }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: 'pointer',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.1)',
        boxSizing: 'border-box',
      }}
    >
      {/* Full-bleed image layer */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        {/* Hover-zoom wrapper */}
        <div style={{
          position: 'absolute', inset: 0,
          transition: 'transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
        }}>
          {/* Parallax img — translateY driven by rAF */}
          <img
            ref={imageRef}
            src={project.image}
            alt={project.title}
            style={{
              position: 'absolute',
              top: '-32px', left: 0,
              width: '100%',
              height: 'calc(100% + 64px)',
              objectFit: 'cover',
              display: 'block',
              willChange: 'transform',
              transform: 'translateY(0px)',
            }}
          />
        </div>
        {/* Bottom gradient for footer legibility */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.78) 100%)',
          pointerEvents: 'none',
        }} />
        {/* Hover scrim */}
        <div style={{
          position: 'absolute', inset: 0,
          background: hovered ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0)',
          transition: 'background 0.5s ease',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Footer — pinned to bottom, reveal driven by rAF via footerRef */}
      <div
        ref={footerRef}
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          padding: 'clamp(18px, 2.5vh, 28px) clamp(32px, 5vw, 80px) clamp(24px, 3.5vh, 40px)',
          willChange: 'transform, opacity',
        }}
      >
        {/* Labels row */}
        <div style={{
          display: 'flex',
          gap: 'clamp(20px, 3vw, 40px)',
          alignItems: 'center',
          marginBottom: 'clamp(10px, 1.6vh, 16px)',
          paddingBottom: 'clamp(10px, 1.6vh, 14px)',
          borderBottom: '1px solid rgba(255,255,255,0.15)',
        }}>
          <span style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: 'clamp(0.6rem, 0.75vw, 0.72rem)',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.06em',
          }}>{project.year}</span>
          <span style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: 'clamp(0.6rem, 0.75vw, 0.72rem)',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.13em',
            textTransform: 'uppercase',
          }}>{project.category}</span>
          <span style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: 'clamp(0.6rem, 0.75vw, 0.72rem)',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.13em',
            textTransform: 'uppercase',
          }}>{project.tag}</span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(2rem, 5vw, 5rem)',
          color: '#ffffff',
          margin: 0,
          letterSpacing: '-0.03em',
          lineHeight: 1,
        }}>{project.title}</h3>
      </div>
    </div>
  )
}

export default function OurWorkSection() {
  const sectionRef   = useRef(null)
  const trackRef     = useRef(null)
  const imageRefs    = useRef([])
  const footerRefs   = useRef([])
  const headerRef    = useRef(null)
  const cardsZoneRef = useRef(null)
  const outroRef     = useRef(null)
  const isMobile     = useIsMobile()

  const targetG    = useRef(0)
  const currentG   = useRef(0)
  const rawScrollR = useRef(0)
  const rafRef     = useRef(null)

  // 100 vw per card, no gap — seamless full-screen gallery
  const CARD_VW = 100
  const STEP_VW = 100

  useEffect(() => {
    if (isMobile) return

    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const totalScroll = Math.max(el.offsetHeight - window.innerHeight, 1)
      const raw  = Math.max(0, Math.min(1, -rect.top / totalScroll))
      rawScrollR.current = raw
      const hRaw = Math.min(1, raw / 0.78)
      targetG.current = 1 - Math.pow(1 - hRaw, 2.5)
    }

    const tick = () => {
      const diff = targetG.current - currentG.current
      if (Math.abs(diff) > 0.00004) {
        currentG.current += diff * 0.15

        // Horizontal track (pure X, no Y)
        if (trackRef.current) {
          const tx = -(currentG.current * (PROJECTS.length - 1) * STEP_VW)
          trackRef.current.style.transform = `translate3d(${tx}vw, 0, 0)`
        }

        // Per-card parallax on images
        const G = currentG.current * (PROJECTS.length - 1)
        imageRefs.current.forEach((img, i) => {
          if (!img) return
          const offset = Math.max(-1.5, Math.min(1.5, G - i))
          img.style.transform = `translateY(${offset * 32}px)`
        })

        // Footer reveal: slides up + fades in as card enters from the right
        footerRefs.current.forEach((footer, i) => {
          if (!footer) return
          const G2 = currentG.current * (PROJECTS.length - 1)
          const enterT = Math.max(0, Math.min(1, -(G2 - i)))   // 1=offscreen-right, 0=active
          footer.style.transform = `translateY(${enterT * 52}px)`
          footer.style.opacity   = String(1 - enterT)
        })
      }

      // Outro fade: raw 0.78 → 0.92
      const outroT = Math.max(0, Math.min(1, (rawScrollR.current - 0.78) / 0.14))
      const cardsT = 1 - outroT

      if (outroRef.current)     outroRef.current.style.opacity     = String(outroT)
      if (outroRef.current)     outroRef.current.style.pointerEvents = outroT > 0.1 ? 'auto' : 'none'
      if (headerRef.current)    headerRef.current.style.opacity    = String(cardsT)
      if (cardsZoneRef.current) cardsZoneRef.current.style.opacity = String(cardsT)

      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    onScroll()
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isMobile])

  // ── Mobile ──────────────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <section
        id="our-work"
        style={{
          background: '#000',
          position: 'relative',
          zIndex: 80,
          padding: 'clamp(60px, 10vh, 100px) 24px clamp(80px, 12vh, 120px)',
        }}
      >
        <h2 style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontWeight: 300,
          fontSize: 'clamp(2.2rem, 8vw, 3rem)',
          letterSpacing: '-0.04em',
          color: '#f5f0eb',
          margin: '0 0 10px',
        }}>Success Stories</h2>
        <p style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontWeight: 300,
          fontSize: '0.88rem',
          color: 'rgba(245,240,235,0.4)',
          margin: '0 0 48px',
        }}>See how we have helped businesses like yours</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </div>
      </section>
    )
  }

  // ── Desktop ──────────────────────────────────────────────────────────────────
  return (
    <section
      id="our-work"
      ref={sectionRef}
      style={{
        height: `${PROJECTS.length * 100 + 280}vh`,
        position: 'relative',
        zIndex: 80,
      }}
    >
      {/* Sticky full-viewport frame — flex column keeps header above cards */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
        background: '#000',
        isolation: 'isolate',
        display: 'flex',
        flexDirection: 'column',
      }}>

        {/* Row 1 — Header (never overlaps cards) */}
        <div
          ref={headerRef}
          style={{
            flexShrink: 0,
            padding: 'clamp(28px, 4.5vh, 48px) clamp(28px, 4vw, 56px) clamp(14px, 2vh, 22px)',
            background: '#000',
            zIndex: 2,
            position: 'relative',
          }}
        >
          <h2 style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(1.3rem, 2.2vw, 2.1rem)',
            letterSpacing: '-0.04em',
            color: '#f5f0eb',
            lineHeight: 1.05,
            margin: 0,
          }}>Success Stories</h2>
          <p style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(0.68rem, 0.9vw, 0.84rem)',
            color: 'rgba(245,240,235,0.45)',
            margin: '5px 0 0',
          }}>See how we have helped businesses like yours</p>
        </div>

        {/* Row 2 — Cards zone fills all remaining space */}
        <div
          ref={cardsZoneRef}
          style={{
            flex: 1,
            position: 'relative',
            overflow: 'hidden',
            minHeight: 0,
          }}
        >
          <div
            ref={trackRef}
            style={{
              position: 'absolute',
              top: 0, left: 0,
              height: '100%',
              display: 'flex',
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)',
            }}
          >
            {PROJECTS.map((project, i) => (
              <div
                key={i}
                style={{ width: '100vw', height: '100%', flexShrink: 0 }}
              >
                <ProjectCard
                  project={project}
                  imageRef={el => { imageRefs.current[i] = el }}
                  footerRef={el => { footerRefs.current[i] = el }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Outro panel — covers entire sticky frame */}
        <style>{`
          @keyframes bounceDown {
            0%, 100% { transform: translateY(0); }
            50%       { transform: translateY(7px); }
          }
        `}</style>
        <div
          ref={outroRef}
          style={{
            position: 'absolute',
            inset: 0,
            background: '#000',
            opacity: 0,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            padding: `0 clamp(28px, 6vw, 80px)`,
            zIndex: 10,
          }}
        >
          <p style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(1.8rem, 3.8vw, 4.2rem)',
            color: '#ffffff',
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            margin: 0,
            maxWidth: '1100px',
          }}>
            These are not just projects, they are stories of our
            clients, our work, and the impact we made.{' '}
            <a
              href="#our-work"
              style={{ color: '#DB6436', textDecoration: 'none', whiteSpace: 'nowrap' }}
            >
              See More{' '}
              <span style={{
                display: 'inline-block',
                animation: 'bounceDown 1.4s ease-in-out infinite',
              }}>↓</span>
            </a>
          </p>
        </div>

      </div>
    </section>
  )
}
