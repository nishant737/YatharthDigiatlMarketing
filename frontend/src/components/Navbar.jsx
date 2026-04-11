import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import logo from '../asset/logo.png'

const useIsMobile = () => {
  const [mobile, setMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const h = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  return mobile
}

const SECTIONS = [
  { label: 'Home',         id: 'home'         },
  { label: 'Story',        id: 'story'         },
  { label: 'Craft',        id: 'craft'         },
  { label: 'Clients',      id: 'clients'       },
  { label: 'Testimonials', id: 'testimonials'  },
  { label: 'About Us',     id: 'about'         },
  { label: 'Journal',      id: 'journal'       },
  { label: 'Contact',      id: 'contact'       },
]

// ─── Desktop: Section indicator dots (fixed left side) ──────────────────────
function DesktopIndicator({ active }) {
  const [hovered, setHovered] = useState(null)

  const handleClick = useCallback((id) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  return (
    <div style={{
      position: 'fixed',
      left: 'clamp(14px, 2vw, 24px)',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '12px',
    }}>
      {SECTIONS.map((section, i) => {
        const isActive = active === section.id
        const isHovered = hovered === i
        return (
          <div
            key={section.id}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              cursor: 'pointer', position: 'relative',
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleClick(section.id)}
          >
            {/* Dot / line */}
            <motion.div
              animate={{
                height: isActive ? 18 : 4,
                width: isActive ? 2 : 4,
                borderRadius: isActive ? '1px' : '50%',
                background: isActive ? '#d49030' : isHovered ? 'rgba(212,144,48,0.6)' : 'rgba(240,230,208,0.25)',
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Label tooltip */}
            <motion.span
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -6 }}
              transition={{ duration: 0.2 }}
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '0.55rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: isActive ? '#d49030' : 'rgba(240,230,208,0.5)',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              {section.label}
            </motion.span>
          </div>
        )
      })}
    </div>
  )
}

// ─── Mobile: Circular rotating wheel indicator ──────────────────────────────
function MobileWheelIndicator({ active }) {
  const activeIdx = SECTIONS.findIndex(s => s.id === active)
  const RADIUS = 32
  const SIZE = 82
  const CENTER = SIZE / 2

  const handleClick = useCallback((id) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  // Rotation so the active section's dot is at the top (12 o'clock)
  const anglePerSection = 360 / SECTIONS.length
  const rotation = -(activeIdx * anglePerSection)

  return (
    <div style={{
      position: 'fixed',
      left: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 1000,
      width: SIZE,
      height: SIZE,
    }}>
      {/* Outer ring */}
      <svg
        width={SIZE} height={SIZE}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <circle
          cx={CENTER} cy={CENTER} r={RADIUS + 6}
          fill="none" stroke="rgba(212,144,48,0.12)" strokeWidth="0.5"
        />
      </svg>

      {/* Rotating wheel */}
      <motion.div
        animate={{ rotate: rotation }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: SIZE, height: SIZE,
          position: 'relative',
        }}
      >
        {SECTIONS.map((section, i) => {
          const angle = (i * anglePerSection - 90) * (Math.PI / 180)
          const x = CENTER + RADIUS * Math.cos(angle)
          const y = CENTER + RADIUS * Math.sin(angle)
          const isActive = active === section.id

          return (
            <motion.div
              key={section.id}
              onClick={() => handleClick(section.id)}
              animate={{
                scale: isActive ? 1.6 : 1,
                background: isActive ? '#d49030' : 'rgba(240,230,208,0.25)',
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute',
                left: x - 3,
                top: y - 3,
                width: 6,
                height: 6,
                borderRadius: '50%',
                cursor: 'pointer',
              }}
            />
          )
        })}
      </motion.div>

      {/* Active label at center */}
      <motion.span
        key={active}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: '0.38rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#d49030',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
          fontWeight: 500,
        }}
      >
        {SECTIONS[activeIdx >= 0 ? activeIdx : 0].label}
      </motion.span>
    </div>
  )
}

// ─── Wrapper: desktop only ──────────────────────────────────────────────────
function SectionIndicator({ active }) {
  const isMobile = useIsMobile()
  if (isMobile) return null
  return <DesktopIndicator active={active} />
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home')
  const [showNav, setShowNav] = useState(true)

  // Track which section is in view
  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight * 0.4

      let active = 'home'
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        // Section is considered active when its top has crossed 40% down the viewport
        if (rect.top <= mid) {
          active = s.id
        }
      }
      setActiveSection(active)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Show navbar only during hero section
  useEffect(() => {
    const onScroll = () => {
      const heroEl = document.getElementById('home')
      if (heroEl) {
        const heroBottom = heroEl.offsetTop + heroEl.offsetHeight
        setShowNav(window.scrollY < heroBottom - window.innerHeight * 0.5)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: showNav ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          zIndex: 1000,
          height: 'clamp(56px, 7vh, 68px)',
          display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
          padding: '0 clamp(16px, 4vw, 56px)',
          background: 'transparent',
          boxSizing: 'border-box',
          pointerEvents: showNav ? 'auto' : 'none',
        }}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          style={{
            textDecoration: 'none',
            display: 'flex', alignItems: 'center',
            flexShrink: 1,
            minWidth: 0,
          }}
        >
          <img
            src={logo}
            alt="Yatharth"
            style={{
              height: 'clamp(24px, 4vw, 42px)',
              maxWidth: 'calc(100vw - 80px)',
              width: 'auto', objectFit: 'contain',
              display: 'block', userSelect: 'none', pointerEvents: 'none',
            }}
          />
        </a>
      </motion.nav>
      <SectionIndicator active={activeSection} />
    </>
  )
}
