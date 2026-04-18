import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import logo from '../asset/l90.png'

function smoothScrollTo(targetY, duration = 700) {
  const startY = window.scrollY
  const diff = targetY - startY
  if (diff === 0) return
  let start = null
  const ease = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  function step(ts) {
    if (!start) start = ts
    const elapsed = ts - start
    const progress = Math.min(elapsed / duration, 1)
    window.scrollTo(0, startY + diff * ease(progress))
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

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
      smoothScrollTo(0)
    } else {
      const el = document.getElementById(id)
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY
        smoothScrollTo(top)
      }
    }
  }, [])

  return (
    <div style={{
      position: 'fixed',
      right: 'clamp(10px, 1vw, 18px)',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '10px',
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
              padding: '3px 0',
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleClick(section.id)}
          >
            {/* Label */}
            <motion.span
              animate={{ opacity: isActive ? 1 : isHovered ? 0.85 : 0.45 }}
              transition={{ duration: 0.2 }}
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '0.5rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: isActive ? '#d49030' : 'rgba(240,230,208,0.6)',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              {section.label}
            </motion.span>

            {/* Dot / line */}
            <motion.div
              animate={{
                height: isActive ? 20 : 5,
                width: isActive ? 2 : 5,
                borderRadius: isActive ? '1px' : '50%',
                background: isActive ? '#d49030' : isHovered ? 'rgba(212,144,48,0.6)' : 'rgba(240,230,208,0.3)',
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
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
      smoothScrollTo(0)
    } else {
      const el = document.getElementById(id)
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY
        smoothScrollTo(top)
      }
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

  return (
    <>
      <motion.nav
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: activeSection === 'home' ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          zIndex: 1000,
          height: 'clamp(56px, 7vh, 68px)',
          display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
          padding: '0 clamp(16px, 4vw, 56px)',
          background: 'transparent',
          boxSizing: 'border-box',
          pointerEvents: activeSection === 'home' ? 'auto' : 'none',
        }}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={e => { e.preventDefault(); smoothScrollTo(0) }}
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
              height: 'clamp(80px, 12vw, 140px)',
              maxWidth: 'calc(100vw - 80px)',
              width: 'auto', objectFit: 'contain',
              display: 'block', userSelect: 'none', pointerEvents: 'none',
              marginTop: '30px',    // ← add this
  marginBottom: '10px', // ← add this
  marginLeft: "1px",
  

            }}
          />
        </a>
      </motion.nav>
      <SectionIndicator active={activeSection} />
    </>
  )
}
