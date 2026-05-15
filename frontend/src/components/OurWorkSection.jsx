import { useRef, useEffect, useState } from 'react'
import { useTheme } from '../ThemeContext'
import img1 from '../asset/bolpupic.jpeg'
import img2 from '../asset/eta01.jpg'
import img3 from '../asset/netzeropic.jpeg'
import img6 from '../asset/amatapic.jpg'


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
    title: 'AMATA BUILDING CARE',
    category: 'Brand Strategy',
    tag: 'Digital Marketing',
    year: '2024',
    image: img6,
  },
]

function ProjectCard({ project, imageRef, footerRef, textMain, textSub, borderC }) {
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
        border: '1px solid var(--card-border3)',
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
          borderBottom: `1px solid ${borderC}`,
        }}>
          <span style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: 'clamp(0.6rem, 0.75vw, 0.72rem)',
            fontWeight: 400,
            color: textSub,
            letterSpacing: '0.06em',
          }}>{project.year}</span>
          <span style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: 'clamp(0.6rem, 0.75vw, 0.72rem)',
            fontWeight: 500,
            color: textSub,
            letterSpacing: '0.13em',
            textTransform: 'uppercase',
          }}>{project.category}</span>
          <span style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: 'clamp(0.6rem, 0.75vw, 0.72rem)',
            fontWeight: 500,
            color: textSub,
            letterSpacing: '0.13em',
            textTransform: 'uppercase',
          }}>{project.tag}</span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(2rem, 5vw, 5rem)',
          color: textMain,
          margin: 0,
          letterSpacing: '-0.03em',
          lineHeight: 1,
        }}>{project.title}</h3>
      </div>
    </div>
  )
}

export default function OurWorkSection() {
  const { dark } = useTheme()
  const accent   = dark ? '#E3735E' : '#0A5675'
  const textMain = dark ? '#ffffff' : 'var(--text-primary)'
  const textSub  = dark ? 'rgba(255,255,255,0.5)' : 'rgba(26,15,6,0.45)'
  const borderC  = dark ? 'rgba(255,255,255,0.15)' : 'rgba(26,15,6,0.12)'

  const sectionRef   = useRef(null)
  const trackRef     = useRef(null)
  const imageRefs    = useRef([])
  const footerRefs   = useRef([])
  const headerRef    = useRef(null)
  const cardsZoneRef = useRef(null)
  const outroRef     = useRef(null)

  const targetG      = useRef(0)
  const currentG     = useRef(0)
  const rawScrollR   = useRef(0)
  const rafRef       = useRef(null)
  const totalScrollR = useRef(1)
  const lastCollapseH = useRef(-1)
  const navbarRef      = useRef(null)
  const dividerRef     = useRef(null)

  const CARD_VW = 100
  const STEP_VW = 100

  useEffect(() => {

    const recacheTotalScroll = () => {
      const el = sectionRef.current
      if (el) totalScrollR.current = Math.max(el.offsetHeight - window.innerHeight, 1)
    }

    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const raw  = Math.max(0, Math.min(1, -el.getBoundingClientRect().top / totalScrollR.current))
      rawScrollR.current = raw
      const hRaw = Math.min(1, raw / 0.90)
      targetG.current = 1 - Math.pow(1 - hRaw, 2.5)
    }

    const tick = () => {
      const diff = targetG.current - currentG.current
      const TOTAL_STEPS = PROJECTS.length
      if (Math.abs(diff) > 0.00004) {
        currentG.current += diff * 0.18

        if (trackRef.current) {
          const tx = -(currentG.current * TOTAL_STEPS * STEP_VW)
          trackRef.current.style.transform = `translate3d(${tx}vw, 0, 0)`
        }

        const G = currentG.current * TOTAL_STEPS
        imageRefs.current.forEach((img, i) => {
          if (!img) return
          const offset = Math.max(-1.5, Math.min(1.5, G - i))
          img.style.transform = `translateY(${offset * 32}px)`
        })

        footerRefs.current.forEach((footer, i) => {
          if (!footer) return
          const G2 = currentG.current * TOTAL_STEPS
          const enterT = Math.max(0, Math.min(1, -(G2 - i)))
          footer.style.transform = `translateY(${enterT * 52}px)`
          footer.style.opacity   = String(1 - enterT)
        })
      }

      const raw = rawScrollR.current
      const collapseT  = Math.min(1, Math.max(0, raw / 0.10))
      const eased      = collapseT * collapseT
      const headerOpac = Math.max(0, 1 - eased)
      const headerY    = -(eased * 35)
      if (Math.abs(headerOpac - lastCollapseH.current) > 0.004) {
        lastCollapseH.current = headerOpac
        if (headerRef.current) {
          headerRef.current.style.opacity       = String(headerOpac)
          headerRef.current.style.transform     = `translateY(${headerY}px)`
          headerRef.current.style.pointerEvents = headerOpac < 0.05 ? 'none' : 'auto'
        }
        if (navbarRef.current) {
          navbarRef.current.style.opacity       = String(headerOpac)
          navbarRef.current.style.transform     = `translateY(${headerY * 0.5}px)`
          navbarRef.current.style.pointerEvents = headerOpac < 0.05 ? 'none' : 'auto'
        }
        if (dividerRef.current) {
          dividerRef.current.style.opacity = String(headerOpac)
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', () => { recacheTotalScroll(); onScroll() }, { passive: true })
    navbarRef.current  = document.getElementById('main-navbar')
    dividerRef.current = document.getElementById('navbar-divider')
    recacheTotalScroll()
    onScroll()
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (navbarRef.current) {
        navbarRef.current.style.opacity       = '1'
        navbarRef.current.style.transform     = 'translateY(0px)'
        navbarRef.current.style.pointerEvents = 'auto'
      }
      if (dividerRef.current) {
        dividerRef.current.style.opacity = '1'
      }
    }
  }, [])

  // ── Same layout for both mobile and desktop ──────────────────────────────────
  return (
    <section
      id="our-work"
      ref={sectionRef}
      style={{
        height: `${(PROJECTS.length + 1) * 120 + 200}vh`,
        position: 'relative',
        zIndex: 80,
      }}
    >
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
        background: 'var(--bg-section)',
        isolation: 'isolate',
        display: 'flex',
        flexDirection: 'column',
      }}>

        {/* Header */}
        <div
          ref={headerRef}
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            zIndex: 5,
            padding: 'clamp(72px, 10vh, 112px) clamp(20px, 4vw, 56px) clamp(10px, 2vh, 22px)',
            background: 'var(--bg-section)',
            willChange: 'opacity, transform',
          }}
        >
          <h2 style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(1.3rem, 2.2vw, 2.1rem)',
            letterSpacing: '-0.04em',
            color: 'var(--text-primary)',
            lineHeight: 1.05,
            margin: 0,
          }}><span style={{ color: 'var(--text-primary)' }}>Success </span><span style={{ color: accent }}>Stories</span></h2>
          <p style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(0.68rem, 0.9vw, 0.84rem)',
            color: 'var(--text-muted)',
            margin: '5px 0 0',
          }}>See how we have helped businesses like yours</p>
        </div>

        {/* Cards zone */}
        <div
          ref={cardsZoneRef}
          style={{
            flex: 1,
            position: 'relative',
            overflow: 'hidden',
            minHeight: 0,
            willChange: 'opacity',
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
                  textMain={textMain}
                  textSub={textSub}
                  borderC={borderC}
                />
              </div>
            ))}
            {/* Outro slide */}
            <div
              style={{
                width: '100vw',
                height: '100%',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                padding: `0 clamp(48px, 8vw, 120px)`,
                background: 'var(--bg-section)',
                boxSizing: 'border-box',
              }}
            >
              <style>{`
                @keyframes bounceDown {
                  0%, 100% { transform: translateY(0); }
                  50%       { transform: translateY(7px); }
                }
              `}</style>
              <p style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(1.8rem, 3.8vw, 4.2rem)',
                color: textMain,
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                margin: 0,
                maxWidth: '1100px',
              }}>
                These are not just projects, they are stories of our
                clients, our work, and the impact we made.{' '}
                <a
                  href="#our-work"
                  style={{ color: accent, textDecoration: 'none', whiteSpace: 'nowrap' }}
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
        </div>

      </div>
    </section>
  )
}
