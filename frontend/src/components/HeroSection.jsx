import { useEffect, useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import logoDark from '../asset/amanlogo.png'
import logoLight from '../asset/finalblue.png'
import { useTheme } from '../ThemeContext'

// Particle Logo Component with dispersion effect
function ParticleLogo({ logo, isHovering, mousePos, onMouseMove, onMouseEnter, onMouseLeave }) {
  const [particles, setParticles] = useState([])
  const containerRef = useRef(null)
  
  // Generate grid of particles from logo
  useEffect(() => {
    const cols = 12
    const rows = 4
    const newParticles = []
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        newParticles.push({
          id: `${i}-${j}`,
          x: (i / (cols - 1)) * 100,
          y: (j / (rows - 1)) * 100,
          originX: (i / (cols - 1)) * 100,
          originY: (j / (rows - 1)) * 100,
        })
      }
    }
    setParticles(newParticles)
  }, [])

  // Calculate particle displacement based on mouse position
  const getParticleStyle = (particle) => {
    if (!isHovering) {
      return {
        left: `${particle.originX}%`,
        top: `${particle.originY}%`,
        transform: 'translate(-50%, -50%) scale(0)',
        opacity: 0,
      }
    }
    
    // Calculate distance from mouse
    const dx = particle.originX - 50 - (mousePos.x * 30)
    const dy = particle.originY - 50 - (mousePos.y * 30)
    const distance = Math.sqrt(dx * dx + dy * dy)
    const maxDistance = 60
    const force = Math.max(0, 1 - distance / maxDistance)
    
    // Displacement based on mouse position
    const dispX = mousePos.x * 40 * force + dx * 0.3
    const dispY = mousePos.y * 40 * force + dy * 0.3
    
    return {
      left: `${particle.originX + dispX}%`,
      top: `${particle.originY + dispY}%`,
      transform: `translate(-50%, -50%) scale(${0.3 + force * 0.7})`,
      opacity: 0.6 + force * 0.4,
    }
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'relative',
        cursor: 'pointer',
        width: 'clamp(85vw, 82vw, 94vw)',
        height: 'auto',
      }}
    >
      {/* Clean logo - always visible */}
      <img
        src={logo}
        alt="Yatharth"
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'contain',
          userSelect: 'none',
          pointerEvents: 'none',
          display: 'block',
          opacity: isHovering ? 0.3 : 1,
          filter: isHovering ? 'blur(2px)' : 'none',
          transition: 'opacity 0.4s ease, filter 0.4s ease',
        }}
      />
      
      {/* Particle overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      >
        {particles.map((p) => (
          <motion.div
            key={p.id}
            style={{
              position: 'absolute',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(226, 114, 91, 0.9) 0%, rgba(195, 72, 32, 0.6) 50%, transparent 100%)',
              boxShadow: '0 0 8px rgba(226, 114, 91, 0.6)',
              ...getParticleStyle(p),
              transition: 'all 0.15s ease-out',
            }}
          />
        ))}
      </div>
    </div>
  )
}

const PARTICLES = [
  { left: '5%',  size: 5,  delay: '0.0s', dur: '3.4s', drift: '14px'  },
  { left: '10%', size: 4,  delay: '1.6s', dur: '2.8s', drift: '-9px'  },
  { left: '16%', size: 7,  delay: '0.8s', dur: '4.0s', drift: '20px'  },
  { left: '22%', size: 4,  delay: '2.3s', dur: '3.1s', drift: '-13px' },
  { left: '28%', size: 6,  delay: '0.4s', dur: '3.7s', drift: '11px'  },
  { left: '33%', size: 4,  delay: '1.9s', dur: '2.9s', drift: '-8px'  },
  { left: '39%', size: 5,  delay: '1.1s', dur: '3.5s', drift: '17px'  },
  { left: '45%', size: 4,  delay: '2.7s', dur: '3.0s', drift: '-15px' },
  { left: '51%', size: 8,  delay: '0.6s', dur: '3.8s', drift: '10px'  },
  { left: '56%', size: 4,  delay: '1.4s', dur: '2.7s', drift: '-7px'  },
  { left: '62%', size: 6,  delay: '0.2s', dur: '4.1s', drift: '14px'  },
  { left: '67%', size: 4,  delay: '2.0s', dur: '3.2s', drift: '-12px' },
  { left: '73%', size: 5,  delay: '0.9s', dur: '3.6s', drift: '9px'   },
  { left: '78%', size: 4,  delay: '1.7s', dur: '2.8s', drift: '-10px' },
  { left: '83%', size: 7,  delay: '0.5s', dur: '3.9s', drift: '16px'  },
  { left: '88%', size: 4,  delay: '2.4s', dur: '3.3s', drift: '-6px'  },
  { left: '93%', size: 5,  delay: '1.2s', dur: '2.6s', drift: '12px'  },
  { left: '37%', size: 4,  delay: '3.0s', dur: '3.4s', drift: '-18px' },
  { left: '24%', size: 6,  delay: '3.5s', dur: '4.2s', drift: '8px'   },
  { left: '71%', size: 4,  delay: '2.9s', dur: '3.1s', drift: '-14px' },
]

export default function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const [exitProgress, setExitProgress] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const { dark } = useTheme()
  const logo = dark ? logoDark : logoLight

  // GSAP-driven parallax and logo entrance refs
  const gridRef  = useRef(null)   // inner grid container — GSAP applies 3D tilt here
  const glowRef  = useRef(null)   // glow layer — GSAP translates with cursor
  const logoRef  = useRef(null)   // logo wrapper — GSAP entrance animation

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMousePos({ x: x * 20, y: y * -20 }) // max rotation degrees
  }, [])

  const handleMouseEnter = useCallback(() => setIsHovering(true), [])
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
    setMousePos({ x: 0, y: 0 })
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 200)
    return () => clearTimeout(t)
  }, [])

  // GSAP cursor parallax — quickTo for buttery smooth 3D tilt + glow drift
  useEffect(() => {
    const grid = gridRef.current
    const glow = glowRef.current
    if (!grid || !glow) return

    // quickTo creates a cached setter with built-in lerp — no rAF boilerplate needed
    const rotY   = gsap.quickTo(grid, 'rotateY',  { duration: 1.1, ease: 'power3.out' })
    const rotX   = gsap.quickTo(grid, 'rotateX',  { duration: 1.1, ease: 'power3.out' })
    const glowX  = gsap.quickTo(glow, 'x',        { duration: 1.5, ease: 'power2.out' })
    const glowY  = gsap.quickTo(glow, 'y',        { duration: 1.5, ease: 'power2.out' })

    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 2  // −1 → +1
      const y = (e.clientY / window.innerHeight - 0.5) * 2  // −1 → +1
      rotY(x * 9)          // yaw: ±9° in perspective
      rotX(y * -5)         // pitch: ±5° (neg → tilt toward viewer on down)
      glowX(x * 36)        // glow drifts with cursor (opposite layer feels deeper)
      glowY(y * 20)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      gsap.killTweensOf([grid, glow])
    }
  }, [])

  // GSAP logo entrance — falls from above with bounce landing
  useEffect(() => {
    if (!mounted || !logoRef.current) return
    const el = logoRef.current

    // Blur + opacity: smooth reveal
    gsap.fromTo(el,
      { opacity: 0, filter: 'blur(18px)' },
      { opacity: 1, filter: 'blur(0px)', duration: 0.7, ease: 'power2.out', delay: 0.15,
        onComplete: () => gsap.set(el, { clearProps: 'filter' }) }
    )

    // Fall from above: starts high + slightly rotated, lands with elastic bounce
    gsap.fromTo(el,
      { y: -180, scale: 0.88, rotation: -3 },
      { y: 0, scale: 1, rotation: 0, duration: 1.6, ease: 'bounce.out', delay: 0.15 }
    )
  }, [mounted])

  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight
      const p = Math.max(0, Math.min(1, (window.scrollY - vh * 0.30) / (vh * 0.55)))
      setExitProgress(p)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const exitStyle = {
    opacity: Math.max(0, 1 - exitProgress * 1.3),
    transform: `scale(${Math.max(0.92, 1 - exitProgress * 0.08)}) translateY(${-exitProgress * 38}px)`,
    willChange: 'opacity, transform',
    transformOrigin: 'center center',
  }

  return (
    <section id="home" style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <style>{`
        @keyframes glowBurst {
          0%   { opacity: 0; transform: scale(0.5); }
          28%  { opacity: 0.65; }
          68%  { opacity: 0.22; transform: scale(1.5); }
          100% { opacity: 0; transform: scale(2.0); }
        }
        .logo-glow-burst {
          position: absolute;
          inset: -15%;
          border-radius: 50%;
          background: radial-gradient(ellipse 60% 40% at 50% 60%, rgba(219,100,54,0.5) 0%, rgba(219,100,54,0.2) 40%, transparent 70%);
          animation: glowBurst 1.8s ease-out 0.25s both;
          pointer-events: none;
          z-index: -1;
        }
        /* ── 3D grid ── */
        @keyframes gridPulse {
          0%   { opacity: 0.18; }
          50%  { opacity: 0.32; }
          100% { opacity: 0.18; }
        }
        @keyframes sweepLight {
          0%   { transform: translateX(-120%) skewX(-18deg); opacity: 0; }
          10%  { opacity: 0.12; }
          50%  { opacity: 0.06; }
          90%  { opacity: 0; }
          100% { transform: translateX(220%) skewX(-18deg); opacity: 0; }
        }
        .hero-sweep {
          position: absolute;
          top: 0; bottom: 0;
          width: 30%;
          background: linear-gradient(90deg, transparent 0%, rgba(255,120,60,0.08) 40%, rgba(255,120,60,0.12) 50%, rgba(255,120,60,0.08) 60%, transparent 100%);
          animation: sweepLight 6s ease-in-out infinite;
          animation-delay: 1.8s;
          pointer-events: none;
          z-index: 1;
        }
        /* ── Glow keyframes ── */
        @keyframes tcPulseOuter {
          0%   { opacity: 0.55; transform: translateX(-50%) scaleX(1)    scaleY(1); }
          40%  { opacity: 0.95; transform: translateX(-50%) scaleX(1.08) scaleY(1.35); }
          70%  { opacity: 0.72; transform: translateX(-50%) scaleX(1.04) scaleY(1.15); }
          100% { opacity: 0.55; transform: translateX(-50%) scaleX(1)    scaleY(1); }
        }
        @keyframes tcSway {
          0%  { transform: translateX(-54%); } 30% { transform: translateX(-45%); }
          58% { transform: translateX(-51%); } 80% { transform: translateX(-57%); }
          100% { transform: translateX(-54%); }
        }
        @keyframes tcPulseMid {
          0%   { opacity: 0.65; transform: translateX(-50%) scaleX(1)    scaleY(1); }
          35%  { opacity: 1.0;  transform: translateX(-50%) scaleX(1.18) scaleY(1.38); }
          65%  { opacity: 0.78; transform: translateX(-50%) scaleX(1.08) scaleY(1.18); }
          100% { opacity: 0.65; transform: translateX(-50%) scaleX(1)    scaleY(1); }
        }
        @keyframes tcSwaySlow {
          0% { transform: translateX(-51%); } 45% { transform: translateX(-47%); }
          100% { transform: translateX(-51%); }
        }
        @keyframes tcCoreFlicker {
          0%   { opacity: 0.45; transform: translateX(-50%) scaleX(1)    scaleY(1); }
          22%  { opacity: 1.0;  transform: translateX(-50%) scaleX(1.28) scaleY(1.45); }
          55%  { opacity: 0.68; transform: translateX(-50%) scaleX(1.10) scaleY(1.20); }
          80%  { opacity: 0.95; transform: translateX(-50%) scaleX(1.32) scaleY(1.52); }
          100% { opacity: 0.45; transform: translateX(-50%) scaleX(1)    scaleY(1); }
        }
        /* ── Ember particle ── */
        @keyframes emberRise {
          0%   { opacity: 0;    transform: translateY(0px)    translateX(0px)               scale(1.0); }
          12%  { opacity: 0.85; }
          78%  { opacity: 0.30; }
          100% { opacity: 0;    transform: translateY(-155px) translateX(var(--p-drift, 0)) scale(0.35); }
        }
        .hero-ember {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle,
            rgba(230, 108, 58, 0.95) 0%,
            rgba(195, 72, 32, 0.55)  55%,
            transparent 100%
          );
          animation: emberRise linear infinite;
          will-change: transform, opacity;
        }
        /* ── Glow layers — dark (orange) ── */
        .hero-glow-outer {
          position: absolute; bottom: -120px; left: 50%;
          width: 140%; height: 680px;
          background: radial-gradient(ellipse 75% 56% at 50% 92%,
            rgba(195, 75, 40, 0.85) 0%,
            rgba(145, 55, 25, 0.55) 32%,
            rgba(85, 28, 12, 0.22)  58%,
            transparent 82%
          );
          filter: blur(28px);
          pointer-events: none;
          will-change: transform, opacity;
          animation: tcPulseOuter 4.8s cubic-bezier(0.45,0,0.55,1) infinite,
                     tcSway       12s  cubic-bezier(0.37,0,0.63,1) infinite;
        }
        .hero-glow-mid {
          position: absolute; bottom: -60px; left: 50%;
          width: 100%; height: 480px;
          background: radial-gradient(ellipse 70% 60% at 50% 94%,
            rgba(225, 95, 55, 0.95) 0%,
            rgba(175, 70, 35, 0.65) 28%,
            rgba(115, 45, 20, 0.30) 56%,
            transparent 70%
          );
          filter: blur(10px);
          pointer-events: none;
          will-change: transform, opacity;
          animation: tcPulseMid  3.3s cubic-bezier(0.4,0,0.6,1) infinite,
                     tcSwaySlow  9.8s ease-in-out              infinite;
        }
        .hero-glow-core {
          position: absolute; bottom: -24px; left: 50%;
          width: 62%; height: 300px;
          background: radial-gradient(ellipse 64% 58% at 50% 98%,
            rgba(240, 120, 75, 1)    0%,
            rgba(205, 88, 48, 0.85)  25%,
            rgba(155, 62, 28, 0.45)  50%,
            transparent              68%
          );
          filter: blur(4px);
          pointer-events: none;
          will-change: transform, opacity;
          animation: tcCoreFlicker 2.0s cubic-bezier(0.4,0,0.6,1) infinite;
        }
        /* ── Glow layers — light (blue) ── */
        .hero-glow-outer-blue {
          position: absolute; bottom: -120px; left: 50%;
          width: 140%; height: 680px;
          background: radial-gradient(ellipse 75% 56% at 50% 92%,
            rgba(59, 130, 246, 0.50) 0%,
            rgba(37,  99, 235, 0.28) 32%,
            rgba(29,  78, 216, 0.10) 58%,
            transparent 82%
          );
          filter: blur(28px);
          pointer-events: none;
          will-change: transform, opacity;
          animation: tcPulseOuter 4.8s cubic-bezier(0.45,0,0.55,1) infinite,
                     tcSway       12s  cubic-bezier(0.37,0,0.63,1) infinite;
        }
        .hero-glow-mid-blue {
          position: absolute; bottom: -60px; left: 50%;
          width: 100%; height: 480px;
          background: radial-gradient(ellipse 70% 60% at 50% 94%,
            rgba(59, 130, 246, 0.65) 0%,
            rgba(37,  99, 235, 0.35) 28%,
            rgba(29,  78, 216, 0.12) 56%,
            transparent 70%
          );
          filter: blur(10px);
          pointer-events: none;
          will-change: transform, opacity;
          animation: tcPulseMid  3.3s cubic-bezier(0.4,0,0.6,1) infinite,
                     tcSwaySlow  9.8s ease-in-out              infinite;
        }
        .hero-glow-core-blue {
          position: absolute; bottom: -24px; left: 50%;
          width: 62%; height: 300px;
          background: radial-gradient(ellipse 64% 58% at 50% 98%,
            rgba(96, 165, 250, 0.85) 0%,
            rgba(59, 130, 246, 0.60) 25%,
            rgba(37,  99, 235, 0.25) 50%,
            transparent              68%
          );
          filter: blur(4px);
          pointer-events: none;
          will-change: transform, opacity;
          animation: tcCoreFlicker 2.0s cubic-bezier(0.4,0,0.6,1) infinite;
        }
        /* ── Responsive ── */
        @media (max-width: 768px) {
          .hero-glow-outer, .hero-glow-outer-blue {
            width: 160%;
            height: 520px;
            bottom: -60px;
            opacity: 0.9;
          }
          .hero-glow-mid, .hero-glow-mid-blue {
            width: 120%;
            height: 380px;
            bottom: -30px;
            opacity: 0.95;
          }
          .hero-glow-core, .hero-glow-core-blue {
            width: 80%;
            height: 240px;
            opacity: 1;
          }
          .hero-text-block { display: none !important; }
          .hero-bottom-row { display: none !important; }
        }
      `}</style>

      {/* ── Hero viewport — normal scroll ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'relative',
          width: '100%', minHeight: '100vh',
          overflow: 'hidden',
          background: 'var(--bg-section)',
        }}
      >
        {/* Perspective wrapper — 3D context for children */}
        <div
          aria-hidden
          style={{
            position: 'absolute', inset: '-5%', zIndex: 0, pointerEvents: 'none',
            perspective: '520px',
            perspectiveOrigin: '50% 42%',
            overflow: 'hidden',
          }}
        >
          {/* Inner container — GSAP applies rotateX/Y here for real in-perspective 3D tilt */}
          <div
            ref={gridRef}
            style={{
              position: 'absolute', inset: 0,
              transformStyle: 'preserve-3d',
              willChange: 'transform',
            }}
          >
            {/* Converging vertical lines */}
            <div style={{
              position: 'absolute', inset: 0,
              transform: 'rotateX(28deg)',
              transformOrigin: '50% 60%',
              display: 'flex',
              animation: 'gridPulse 5s ease-in-out infinite',
            }}>
              {Array.from({ length: 26 }).map((_, i) => (
                <div key={i} style={{
                  flex: 1,
                  borderRight: `1px solid ${dark ? 'rgba(255,140,80,0.07)' : 'rgba(59,130,246,0.07)'}`,
                }} />
              ))}
            </div>
            {/* Horizontal lines on floor plane */}
            <div style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0,
              height: '58%',
              transform: 'rotateX(58deg)',
              transformOrigin: '50% 100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              animation: 'gridPulse 5s ease-in-out infinite',
              animationDelay: '0.5s',
            }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} style={{
                  width: '100%', height: '1px',
                  background: dark ? 'rgba(255,140,80,0.06)' : 'rgba(59,130,246,0.06)',
                }} />
              ))}
            </div>
            {/* Light sweep */}
            <div className="hero-sweep" />
          </div>
        </div>

        {/* ── Glow: dual-layer crossfade for smooth theme transition ── */}
        <motion.div
          ref={glowRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, ease: 'easeOut', delay: 0.6 }}
          style={{ position: 'absolute', inset: '-5%', zIndex: 1, pointerEvents: 'none', willChange: 'transform' }}
        >
          {/* Orange layer — visible in dark mode */}
          <div style={{ position: 'absolute', inset: 0, opacity: dark ? 1 : 0 }}>
            <div className="hero-glow-outer" />
            <div className="hero-glow-mid"   />
            <div className="hero-glow-core"  />
          </div>
          {/* Blue layer — visible in light mode */}
          <div style={{ position: 'absolute', inset: 0, opacity: dark ? 0 : 1 }}>
            <div className="hero-glow-outer-blue" />
            <div className="hero-glow-mid-blue"   />
            <div className="hero-glow-core-blue"  />
          </div>
        </motion.div>

        {/* ── Ember particles: appear last (z:2) ── */}
        <div
          aria-hidden
          style={{ opacity: dark ? 1 : 0 }}
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: '55vh', zIndex: 2, pointerEvents: 'none', overflow: 'hidden',
          }}
        >
          {PARTICLES.map((p, i) => (
            <div
              key={i}
              className="hero-ember"
              style={{
                left: p.left,
                bottom: `${(i % 5) * 3}%`,
                width: p.size,
                height: p.size,
                animationDelay: p.delay,
                animationDuration: p.dur,
                '--p-drift': p.drift,
              }}
            />
          ))}
        </div>

        {/* ── Combined exit wrapper (z:10) ── */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none', ...exitStyle }}>

          {/* Logo: dramatic cinematic pop-up entry ── */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div
              ref={logoRef}
              style={{ flexShrink: 0, lineHeight: 0, position: 'relative', opacity: 0 }}
            >
              {/* Glow burst on reveal */}
              {mounted && <div className="logo-glow-burst" />}
              <ParticleLogo 
                logo={logo} 
                isHovering={isHovering} 
                mousePos={mousePos}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            </div>
          </div>

          {/* Bottom row: both blocks on left side */}
          <div className="hero-bottom-row" style={{
            position: 'absolute',
            bottom: 'clamp(24px, 4vh, 48px)',
            left: 0, right: 0,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
            gap: 'clamp(56px, 9vw, 140px)',
            padding: '0 clamp(28px, 4.5vw, 72px)',
            pointerEvents: 'none',
          }}>
            {/* Left: Tagline - same font as before */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 22 }}
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.85 }}
              style={{ pointerEvents: 'auto' }}
            >
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                fontSize: 'clamp(1.3rem, 1.8vw, 1.6rem)',
                color: 'var(--text-dim)',
                lineHeight: 1.3,
                margin: 0,
              }}>
                Where strategy<br />meets design.
              </p>
            </motion.div>

            {/* Right of tagline: Description + Explore Work - smaller font */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 22 }}
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.65 }}
              style={{ pointerEvents: 'auto', textAlign: 'left' }}
            >
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                fontSize: 'clamp(0.82rem, 1.05vw, 0.95rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.65,
                margin: '0 0 8px',
                maxWidth: '280px',
              }}>
                We are a branding studio<br />that helps businesses<br />build lasting impact.
              </p>
              <a
                href="#clients"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: 'clamp(0.78rem, 0.95vw, 0.88rem)',
                  color: 'var(--text-dim)',
                  textDecoration: 'underline',
                  textUnderlineOffset: '4px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                }}
              >
                Explore Work
                <span style={{ fontSize: '1.1em' }}>→</span>
              </a>
            </motion.div>
          </div>

        </div>
      </motion.div>
    </section>
  )
}
