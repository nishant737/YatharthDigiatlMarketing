import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import logoDark from '../asset/amanlogo.png'
import logoLight from '../asset/finalblue.png'
import { useTheme } from '../ThemeContext'

function smoothScrollTo(targetY, duration = 900) {
  const startY = window.scrollY
  const diff = targetY - startY
  if (Math.abs(diff) < 1) return
  let start = null
  const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
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
  const [mobile, setMobile] = useState(window.innerWidth < 900)
  useEffect(() => {
    const h = () => setMobile(window.innerWidth < 900)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  return mobile
}

const SECTIONS = [
  { label: 'Home',         id: 'home'        },
  { label: 'Story',        id: 'story'       },
  { label: 'Craft',        id: 'craft'       },
  { label: 'Clients',      id: 'clients'     },
  { label: 'Testimonials', id: 'testimonials'},
  { label: 'About Us',     id: 'about'       },
  { label: 'Journal',      id: 'journal'     },
  { label: 'FAQ',          id: 'faq'         },
  { label: 'Contact',      id: 'contact'     },
]

const NAV_COLUMNS = [
  [
    { label: 'Story',        id: 'story'   },
    { label: 'Clients',      id: 'clients' },
  ],
  [
    { label: 'Craft',        id: 'craft'   },
    { label: 'Testimonials', id: 'testimonials' },
  ],
  [
    { label: 'About us',     id: 'about'   },
    { label: 'Insights',     id: 'journal' },
  ],
  [
    { label: 'Instagram',    href: 'https://www.instagram.com/yatharth_digitalmarketing/' },
    { label: 'LinkedIn',     href: 'https://www.linkedin.com/company/yatharth'            },
  ],
]

const MENU_LINKS = [
  { label: 'Home',      id: 'home'     },
  { label: 'Story',     id: 'story'    },
  { label: 'Our Work',  id: 'our-work' },
  { label: 'Services',  id: 'craft'    },
  { label: 'About Us',  id: 'about'    },
  { label: 'Journal',   id: 'journal'  },
  { label: 'FAQ',       id: 'faq'      },
  { label: 'Contact',   id: 'contact'  },
]

// ─── Desktop section indicator dots (right side, shown when off home) ────────
function DesktopIndicator({ active, dark }) {
  const [hovered, setHovered] = useState(null)
  const indicatorAccent = dark ? '#d49030' : '#0A5675'

  const handleClick = useCallback((id) => {
    if (id === 'home') { smoothScrollTo(0); return }
    const el = document.getElementById(id)
    if (el) smoothScrollTo(el.getBoundingClientRect().top + window.scrollY)
  }, [])

  return (
    <div style={{
      position: 'fixed',
      right: 'clamp(10px, 1vw, 18px)',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 99990,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '10px',
    }}>
      {SECTIONS.map((section, i) => {
        const isActive  = active === section.id
        const isHovered = hovered === i
        return (
          <div
            key={section.id}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '3px 0' }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleClick(section.id)}
          >
            <motion.span
              animate={{ opacity: isActive ? 1 : isHovered ? 0.85 : 0.45 }}
              transition={{ duration: 0.2 }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.5rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: isActive ? indicatorAccent : 'var(--section-label)',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              {section.label}
            </motion.span>
            <motion.div
              animate={{
                height: isActive ? 20 : 5,
                width: isActive ? 2 : 5,
                borderRadius: isActive ? '1px' : '50%',
                background: isActive ? indicatorAccent : isHovered ? (dark ? 'rgba(212,144,48,0.6)' : 'rgba(10,86,117,0.6)') : 'var(--section-dot)',
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        )
      })}
    </div>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen]   = useState(false)
  const isMobile = useIsMobile()
  const { dark } = useTheme()
  const logo = dark ? logoDark : logoLight

  useEffect(() => {
    const onScroll = () => {
      const threshold = window.innerHeight * 0.5
      let active = 'home'
      let closest = Infinity
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= threshold) {
          const dist = Math.abs(rect.top - threshold)
          if (dist < closest) { closest = dist; active = s.id }
        }
      }
      setActiveSection(active)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = useCallback((id) => {
    if (id === 'home') { smoothScrollTo(0) }
    else {
      const el = document.getElementById(id)
      if (el) smoothScrollTo(el.getBoundingClientRect().top + window.scrollY)
    }
    setMenuOpen(false)
  }, [])

  const isHome = activeSection === 'home'

  return (
    <>
      <style>{`
        .nav-link {
          font-family: 'Inter', sans-serif;
          font-weight: 300;
          font-size: clamp(0.58rem, 0.72vw, 0.68rem);
          color: var(--nav-link);
          text-decoration: none;
          transition: color 0.2s ease;
          white-space: nowrap;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          line-height: 1.8;
        }
        .nav-link:hover { color: ${dark ? '#E2725B' : '#0A5675'}; }
        .nav-col-link {
          position: relative;
        }
        .nav-col-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--text-primary);
          transition: width 0.3s ease;
        }
        .nav-col-link:hover { color: var(--text-primary); }
        .nav-col-link:hover::after { width: 100%; }
        .nav-letstalk:hover {
          background: ${dark ? '#E2725B' : '#0A5675'};
          color: #fff;
          box-shadow: 0 0 24px ${dark ? 'rgba(226,114,91,0.35)' : 'rgba(10,86,117,0.35)'};
        }
        @media (max-width: 768px) {
          .mobile-logo { height: clamp(28px, 8vw, 44px) !important; }
        }
        .nav-letstalk {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'Inter', sans-serif; font-weight: 500;
          font-size: clamp(0.62rem, 0.78vw, 0.72rem);
          letter-spacing: 0.02em;
          color: ${dark ? '#000' : '#0A5675'}; background: ${dark ? '#fff' : '#e8f4f8'};
          border: ${dark ? 'none' : '1px solid rgba(10,86,117,0.3)'};
          padding: 8px 20px; border-radius: 100px;
          text-decoration: none; white-space: nowrap;
          cursor: pointer;
          box-shadow: 0 0 0 0 rgba(255,255,255,0);
          transition: box-shadow 0.3s ease, background 0.3s ease, color 0.3s ease;
        }
        .nav-hamburger {
          background: none; border: none; cursor: pointer;
          display: flex; flex-direction: column; gap: 5px;
          padding: 4px;
        }
        .nav-hamburger span {
          display: block; width: 22px; height: 1.5px;
          background: var(--hamburger-color); border-radius: 2px;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        .menu-nav-link {
          font-family: 'Inter', sans-serif;
          font-size: clamp(1.6rem, 4vw, 3.2rem);
          font-weight: 600;
          letter-spacing: -0.03em;
          line-height: 1.1;
          text-decoration: none;
          display: block;
          cursor: pointer;
          background: none;
          border: none;
          border-bottom: 1px solid ${dark ? 'rgba(255,255,255,0.25)' : 'rgba(10,86,117,0.15)'};
          text-align: left;
          padding: clamp(10px, 1.4vh, 16px) 0;
          transition: color 0.18s ease;
          will-change: transform, opacity;
          width: 100%;
        }
        .menu-nav-link:last-child { border-bottom: none; }
        .menu-nav-link:hover { color: ${dark ? '#fff' : '#0A5675'} !important; }
      `}</style>

      {/* ── Main navbar ── */}
      <motion.nav
        id="main-navbar"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          zIndex: 99990,
          height: 'clamp(64px, 9vh, 82px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(28px, 4.5vw, 72px)',
          background: 'transparent',
          boxSizing: 'border-box',
          willChange: 'opacity, transform',
        }}
      >
        {/* Left: logo image */}
        <a
          href="#home"
          onClick={e => { e.preventDefault(); scrollTo('home') }}
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
            position: 'relative',
          }}
        >
          <img
            className="mobile-logo"
            src={logo}
            alt="Yatharth"
            style={{
              height: 'clamp(36px, 4.5vw, 62px)',
              width: 'auto',
              objectFit: 'contain',
              display: 'block',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          />
        </a>

        {/* Center: 4-column nav grid (desktop, home only) */}
        {!isMobile && isHome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'clamp(40px, 6vw, 80px)',
            }}>
            {NAV_COLUMNS.map((col, colIdx) => (
              <div key={colIdx} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(8px, 1.2vh, 14px)' }}>
                {col.map((link, linkIdx) => (
                  <motion.a
                    key={link.label}
                    href={link.href || `#${link.id}`}
                    onClick={(e) => {
                      if (!link.href) { e.preventDefault(); scrollTo(link.id) }
                    }}
                    target={link.href ? '_blank' : undefined}
                    rel={link.href ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 + colIdx * 0.08 + linkIdx * 0.04 }}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      fontSize: 'clamp(0.75rem, 0.95vw, 0.88rem)',
                      color: 'var(--nav-col-link)',
                      textDecoration: 'none',
                      cursor: 'pointer',
                      transition: 'color 0.2s ease',
                    }}
                    className="nav-col-link"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            ))}
          </motion.div>
        )}

        {/* Right side: always visible — Let's Talk on desktop home, hamburger everywhere else */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          {!isMobile && isHome && (
            <motion.button
              className="nav-letstalk"
              onClick={() => scrollTo('contact')}
              initial={{ opacity: 0, x: 22 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
              whileHover={{
                scale: 1.07,
                boxShadow: '0 0 22px rgba(255,255,255,0.28), 0 0 8px rgba(255,255,255,0.14)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              Let&rsquo;s Talk
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1.5 1.5h7v7M1.5 8.5l7-7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          )}

          {/* Hamburger — always rendered on mobile; on desktop always rendered too */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            style={{ display: 'flex' }}
          >
            <span style={{ transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span style={{ transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </motion.nav>

      {/* ── Subtle divider below navbar (hidden on hero) ── */}
      <motion.div
        id="navbar-divider"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: isHome ? 0 : 1, scaleX: isHome ? 0 : 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 'clamp(64px, 9vh, 82px)',
          left: 'clamp(28px, 4.5vw, 72px)',
          right: 'clamp(28px, 4.5vw, 72px)',
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, var(--divider-nav) 15%, var(--divider-nav) 85%, transparent 100%)',
          zIndex: 99990,
          pointerEvents: 'none',
          transformOrigin: 'center',
        }}
      />

      {/* ── Full-screen hamburger menu (mobile + desktop) ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="main-menu"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99989,
              background: dark ? '#E35336' : '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 'clamp(80px, 10vh, 110px) clamp(24px, 6vw, 88px) clamp(32px, 5vh, 56px)',
              overflowY: 'auto',
              boxSizing: 'border-box',
            }}
          >
            {/* Nav links */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2px, 0.6vh, 8px)' }}>
              {MENU_LINKS.map((link, i) => {
                const isActive = activeSection === link.id
                return (
                  <motion.button
                    key={link.label}
                    className="menu-nav-link"
                    onClick={() => scrollTo(link.id)}
                    initial={{ opacity: 0, x: -32 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1], delay: 0.06 + i * 0.055 }}
                    style={{
                      color: dark
                        ? (isActive ? '#ffffff' : 'rgba(255,255,255,0.32)')
                        : (isActive ? '#0A5675' : 'rgba(10,86,117,0.32)'),
                    }}
                  >
                    {link.label}
                  </motion.button>
                )
              })}
            </nav>

            {/* Bottom footer row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: 0.52 }}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                flexWrap: 'wrap',
                gap: '16px',
                borderTop: dark ? '1px solid rgba(255,255,255,0.22)' : '1px solid rgba(10,86,117,0.15)',
                paddingTop: 'clamp(16px, 2.5vh, 28px)',
              }}
            >
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(0.65rem, 0.9vw, 0.82rem)',
                fontWeight: 400,
                color: dark ? 'rgba(255,255,255,0.55)' : 'rgba(10,86,117,0.55)',
                letterSpacing: '0.02em',
              }}>Yatharth Digital Marketing.</span>

              <div style={{ display: 'flex', gap: '28px' }}>
                {[
                  { label: 'Instagram', href: 'https://www.instagram.com/yatharth_digitalmarketing/' },
                  { label: 'LinkedIn',  href: 'https://www.linkedin.com/company/yatharth' },
                ].map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 'clamp(0.65rem, 0.9vw, 0.82rem)',
                      fontWeight: 400,
                      color: dark ? 'rgba(255,255,255,0.55)' : 'rgba(10,86,117,0.55)',
                      textDecoration: 'none',
                      letterSpacing: '0.02em',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = dark ? '#fff' : '#0A5675'}
                    onMouseLeave={e => e.currentTarget.style.color = dark ? 'rgba(255,255,255,0.55)' : 'rgba(10,86,117,0.55)'}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  )
}
