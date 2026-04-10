import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import logo from '../asset/logo.png'

const NAV_LINKS = [
  { label: 'Home',         href: '#home'         },
  { label: 'Story',        href: '#story'         },
  { label: 'Craft',        href: '#craft'         },
  { label: 'Clients',      href: '#clients'       },
  { label: 'Testimonials', href: '#testimonials'  },
  { label: 'About Us',     href: '#about'         },
  { label: 'Contact',      href: '#contact'       },
]

const SOCIALS = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 10v7M7 7v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M11 17v-4c0-1.5 1-2 2-2s2 .5 2 2v4M11 10v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

// ─── Hamburger bars → X ───────────────────────────────────────────────────────
function HamburgerIcon({ open }) {
  return (
    <div style={{ width: 26, height: 18, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
      <motion.span
        animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: 'block', height: '1.5px', background: '#f5f0eb', borderRadius: 2, transformOrigin: 'center' }}
      />
      <motion.span
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.25 }}
        style={{ display: 'block', height: '1.5px', background: '#f5f0eb', borderRadius: 2, width: '65%', alignSelf: 'flex-end' }}
      />
      <motion.span
        animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: 'block', height: '1.5px', background: '#f5f0eb', borderRadius: 2, transformOrigin: 'center' }}
      />
    </div>
  )
}

// ─── Single parallax orb ─────────────────────────────────────────────────────
function ParallaxOrb({ orb, smoothX, smoothY }) {
  const tx = useTransform(smoothX, v => (v - 0.5) * orb.depth * -300)
  const ty = useTransform(smoothY, v => (v - 0.5) * orb.depth * -300)
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: orb.x, top: orb.y,
        width: orb.w, height: orb.h,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
        filter: 'blur(40px)',
        x: tx, y: ty,
        translateX: '-50%', translateY: '-50%',
      }}
    />
  )
}

// ─── Parallax background for drawer ──────────────────────────────────────────
function DrawerParallaxBg() {
  const ref = useRef(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  useEffect(() => {
    const onMove = (e) => {
      const rect = ref.current?.getBoundingClientRect()
      if (!rect) return
      mouseX.set((e.clientX - rect.left) / rect.width)
      mouseY.set((e.clientY - rect.top) / rect.height)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY])

  const ORBS = [
    { x: '10%',  y: '15%',  w: 280, h: 280, depth: 0.08, color: 'rgba(219,100,54,0.18)' },
    { x: '60%',  y: '60%',  w: 320, h: 320, depth: 0.12, color: 'rgba(219,100,54,0.10)' },
    { x: '30%',  y: '80%',  w: 200, h: 200, depth: 0.06, color: 'rgba(200,90,48,0.14)'  },
    { x: '75%',  y: '20%',  w: 180, h: 180, depth: 0.14, color: 'rgba(245,200,150,0.07)'},
  ]

  return (
    <div ref={ref} style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {/* Base dark background */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg, #130e09 0%, #1e1208 60%, #0d0905 100%)' }} />

      {/* Parallax orbs */}
      {ORBS.map((orb, i) => (
        <ParallaxOrb key={i} orb={orb} smoothX={smoothX} smoothY={smoothY} />
      ))}

      {/* Slow drifting rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', top: '25%', right: '-60px',
          width: 220, height: 220,
          border: '1px solid rgba(219,100,54,0.12)',
          borderRadius: '50%',
        }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', bottom: '18%', left: '8%',
          width: 140, height: 140,
          border: '1px solid rgba(219,100,54,0.08)',
          borderRadius: '50%',
        }}
      />

      {/* Dot grid overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(219,100,54,0.1) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        opacity: 0.6,
      }} />

      {/* Orange accent glow top-right */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: 200, height: 200,
        background: 'radial-gradient(circle, rgba(219,100,54,0.15) 0%, transparent 70%)',
        filter: 'blur(30px)',
      }} />
    </div>
  )
}

// ─── Right-side drawer ────────────────────────────────────────────────────────
function MenuDrawer({ open, onClose }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0,
              zIndex: 998,
              background: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
          />

          {/* Drawer panel with animated background */}
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              top: 0, right: 0, bottom: 0,
              zIndex: 999,
              width: 'clamp(300px, 50vw, 520px)',
              background: 'none',
              display: 'flex',
              overflow: 'hidden',
            }}
          >
            {/* Parallax animated background */}
            <DrawerParallaxBg />
            {/* ── Left: dot grid column ── */}
            <div style={{
              width: 'clamp(60px, 10vw, 90px)',
              flexShrink: 0,
              borderRight: '1px solid rgba(219,100,54,0.08)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingTop: 'clamp(80px,12vh,110px)',
              gap: '28px',
            }}>
              {/* Dot grid pattern */}
              <div aria-hidden style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'radial-gradient(circle, rgba(219,100,54,0.18) 1.2px, transparent 1.2px)',
                backgroundSize: '22px 22px',
                backgroundPosition: '50% 50%',
              }} />

              {/* Vertical number track */}
              <div style={{
                position: 'relative', zIndex: 1,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '0',
              }}>
                {/* Top circle */}
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ delay: 0.35, duration: 0.4, ease: [0.22,1,0.36,1] }}
                  style={{
                    width: 10, height: 10, borderRadius: '50%',
                    border: '1.5px solid rgba(219,100,54,0.6)',
                    background: 'transparent',
                  }}
                />
                {/* Line */}
                <motion.div
                  initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                  transition={{ delay: 0.4, duration: 0.6, ease: [0.22,1,0.36,1] }}
                  style={{
                    width: '1px',
                    height: `${NAV_LINKS.length * 52}px`,
                    background: 'linear-gradient(to bottom, rgba(219,100,54,0.4), rgba(219,100,54,0.08))',
                    transformOrigin: 'top',
                  }}
                />
                {/* Bottom circle */}
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ delay: 0.65, duration: 0.4, ease: [0.22,1,0.36,1] }}
                  style={{
                    width: 10, height: 10, borderRadius: '50%',
                    border: '1.5px solid rgba(219,100,54,0.25)',
                    background: 'transparent',
                  }}
                />
              </div>
            </div>

            {/* ── Right: nav content ── */}
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              padding: 'clamp(70px,10vh,100px) clamp(28px,5vw,52px) clamp(32px,5vh,48px)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Subtle top border accent */}
              <motion.div
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ delay: 0.2, duration: 0.7, ease: [0.22,1,0.36,1] }}
                style={{
                  position: 'absolute', top: 0, left: 0, right: 0,
                  height: '1px',
                  background: 'linear-gradient(90deg, rgba(219,100,54,0.4), transparent)',
                  transformOrigin: 'left',
                }}
              />

              {/* Nav links */}
              <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 0 }}>
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={e => { e.preventDefault(); scrollTo(link.href, onClose) }}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 24 }}
                    transition={{ delay: 0.18 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontWeight: 300,
                      fontSize: 'clamp(1.5rem, 4vw, 2.4rem)',
                      letterSpacing: '-0.02em',
                      color: 'rgba(245,240,235,0.85)',
                      textDecoration: 'none',
                      padding: '10px 0',
                      borderBottom: '1px solid rgba(245,240,235,0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      transition: 'color 0.25s, padding-left 0.25s',
                      position: 'relative',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = '#f5f0eb'
                      e.currentTarget.style.paddingLeft = '10px'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = 'rgba(245,240,235,0.85)'
                      e.currentTarget.style.paddingLeft = '0px'
                    }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              {/* Social icons row */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.62, duration: 0.5, ease: [0.22,1,0.36,1] }}
                style={{ display: 'flex', gap: 16, paddingTop: 28 }}
              >
                {SOCIALS.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    style={{
                      width: 40, height: 40,
                      borderRadius: '50%',
                      border: '1px solid rgba(245,240,235,0.12)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'rgba(245,240,235,0.4)',
                      textDecoration: 'none',
                      transition: 'color 0.25s, border-color 0.25s, background 0.25s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = '#DB6436'
                      e.currentTarget.style.borderColor = 'rgba(219,100,54,0.45)'
                      e.currentTarget.style.background = 'rgba(219,100,54,0.07)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = 'rgba(245,240,235,0.4)'
                      e.currentTarget.style.borderColor = 'rgba(245,240,235,0.12)'
                      e.currentTarget.style.background = 'transparent'
                    }}
                  >
                    {icon}
                  </a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ─── Smooth scroll helper ─────────────────────────────────────────────────────
function scrollTo(href, onClose) {
  onClose()
  if (href === '#' || href === '#home') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  const id = href.replace('#', '')
  // Small delay so drawer closes before scroll
  setTimeout(() => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 320)
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.nav
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          zIndex: 1000,
          height: 'clamp(56px, 7vh, 68px)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 clamp(16px, 4vw, 56px)',
          background: 'transparent',
          boxSizing: 'border-box',
        }}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={e => { e.preventDefault(); scrollTo('#home', () => setOpen(false)) }}
          style={{
            textDecoration: 'none',
            display: 'flex', alignItems: 'center',
            flexShrink: 1,
            minWidth: 0,
            marginRight: '12px',
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

        {/* Hamburger button - hide when menu is open */}
        {!open && (
          <button
            onClick={() => setOpen(v => !v)}
            aria-label="Open menu"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
              zIndex: 1001,
            }}
          >
            <HamburgerIcon open={open} />
          </button>
        )}
      </motion.nav>

      <MenuDrawer open={open} onClose={() => setOpen(false)} />
    </>
  )
}
