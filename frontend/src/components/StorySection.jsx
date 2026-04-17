import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STORY_CSS = `
  .story-section { display:flex; flex-direction:row; }
  .story-right   { min-height: 100vh; }

  @media (max-width: 768px) {
    .story-section {
      flex-direction: column !important;
      min-height: 100vh !important;
      max-height: 100vh !important;
      height: 100vh !important;
      overflow: hidden !important;
    }
    .story-left {
      flex: 0 0 40% !important;
      max-height: 40% !important;
      width: 100% !important;
      min-height: unset !important;
      align-items: center !important;
      text-align: center !important;
      padding: 18px 20px 10px !important;
      justify-content: flex-start !important;
      overflow: hidden !important;
    }
    .story-left .lamp-wrap {
      width: 60px !important;
      height: 60px !important;
      margin: 0 auto 6px auto !important;
    }
    .story-text-block {
      align-items: center !important;
      gap: 4px !important;
      overflow: hidden !important;
    }
    .story-text-block p {
      font-size: 0.72rem !important;
      line-height: 1.35 !important;
      margin: 0 !important;
    }
    .story-text-block p:first-child {
      font-size: 0.9rem !important;
      margin-bottom: 4px !important;
    }
    .story-text-block p:last-child {
      margin-top: 4px !important;
    }
    /* Hide some middle lines on very small screens */
    .story-text-block p:nth-child(n+5):nth-child(-n+7) {
      display: none !important;
    }
    .story-right {
      flex: 0 0 60% !important;
      max-height: 60% !important;
      width: 100% !important;
      height: unset !important;
      min-height: unset !important;
      position: relative !important;
      padding: 8px 14px 14px !important;
    }
    .story-right > div {
      border-radius: 14px !important;
      overflow: hidden !important;
      box-shadow: 0 4px 24px rgba(0,0,0,0.5), 0 1px 6px rgba(219,100,54,0.12) !important;
    }
  }
`

const OPENING = 'Yatharth began with belief.'
const SCROLL_LINES = [
  'Built in 2020.',
  'Grown through people, trust, and intent.',
  'From Mangaluru to conversations beyond borders.',
  "We've never chased noise.",
  "We've built presence.",
  'Every project shaped us.',
  'Every challenge refined us.',
]
const CLOSING = 'Still learning. Still building.'

function useLampTrigger(sectionRef) {
  const [lit, setLit] = useState(false)
  useEffect(() => {
    const check = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const vh = window.innerHeight
      setLit(rect.top <= vh * 0.3 && rect.bottom > 0)
    }
    window.addEventListener('scroll', check, { passive: true })
    check()
    return () => window.removeEventListener('scroll', check)
  }, [sectionRef])
  return lit
}

// ─── Dust particles ───────────────────────────────────────────────────────────
const PARTICLES = [
  { id: 0, x: '8%',  size: 5,  dur: 6.5, delay: 0   },
  { id: 1, x: '22%', size: 4,  dur: 8.5, delay: 1.2 },
  { id: 2, x: '38%', size: 6,  dur: 7.2, delay: 0.5 },
  { id: 3, x: '55%', size: 3,  dur: 10,  delay: 2.0 },
  { id: 4, x: '70%', size: 5,  dur: 6.0, delay: 0.2 },
  { id: 5, x: '84%', size: 4,  dur: 8.0, delay: 1.6 },
  { id: 6, x: '16%', size: 4,  dur: 9.0, delay: 3.0 },
  { id: 7, x: '48%', size: 3,  dur: 7.8, delay: 2.4 },
  { id: 8, x: '64%', size: 5,  dur: 6.8, delay: 0.9 },
  { id: 9, x: '32%', size: 4,  dur: 11,  delay: 3.5 },
]

function Particle({ p, lit }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: p.x,
        bottom: '-10px',
        width: p.size,
        height: p.size,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,220,130,1) 0%, rgba(255,175,65,0.5) 55%, transparent 100%)',
        filter: 'blur(1px)',
        pointerEvents: 'none',
      }}
      animate={lit ? {
        y: [0, -600],
        opacity: [0, 0.8, 0.6, 0.8, 0],
      } : { opacity: 0, y: 0 }}
      transition={lit ? {
        duration: p.dur,
        delay: p.delay,
        repeat: Infinity,
        ease: 'linear',
        opacity: { times: [0, 0.1, 0.5, 0.9, 1] },
      } : { duration: 0.3 }}
    />
  )
}

function DustParticles({ lit }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      pointerEvents: 'none', overflow: 'hidden', zIndex: 1,
    }}>
      {PARTICLES.map(p => <Particle key={p.id} p={p} lit={lit} />)}
    </div>
  )
}

// ─── Tubelight glitch sequence then steady glow ──────────────────────────────
// Returns opacity keyframes simulating a fluorescent tube startup
const GLITCH_OPACITY = [0,1,0,0,1,0.3,0,1,0.6,0,0.8,0,1]
const GLITCH_TIMES   = [0,0.05,0.09,0.13,0.18,0.24,0.30,0.38,0.50,0.60,0.75,0.88,1]

function WallLamp({ lit }) {
  return (
    <div
      aria-hidden
      className="lamp-wrap"
      style={{
        position: 'relative',
        width: 'clamp(110px, 15vw, 180px)',
        height: 'clamp(110px, 15vw, 180px)',
        margin: '0 auto clamp(16px, 2vw, 24px) auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    >
      {/* ── Wide outer light cone falling downward ── */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0.4 }}
        animate={lit ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0.4 }}
        transition={lit ? { duration: 2.2, ease: [0.4, 0, 0.2, 1] } : { duration: 0.3 }}
        style={{
          position: 'absolute',
          top: '88%',
          left: '50%',
          transform: 'translateX(-50%)',
          transformOrigin: 'top center',
          width: 'clamp(20px, 4vw, 40px)',
          height: 'clamp(500px, 80vh, 900px)',
          background: 'linear-gradient(to bottom, rgba(255,210,110,0.22) 0%, rgba(255,180,80,0.08) 30%, rgba(219,100,54,0.03) 70%, transparent 100%)',
          clipPath: 'polygon(0% 0%, 100% 0%, 180% 100%, -80% 100%)',
          filter: 'blur(20px)',
          zIndex: 0,
        }}
      />

      {/* ── Focused inner beam ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={lit ? { opacity: GLITCH_OPACITY } : { opacity: 0 }}
        transition={lit ? { duration: 1.6, times: GLITCH_TIMES } : { duration: 0.3 }}
        style={{
          position: 'absolute',
          top: '86%',
          left: '50%',
          transform: 'translateX(-50%)',
          transformOrigin: 'top center',
          width: 'clamp(10px, 2vw, 20px)',
          height: 'clamp(400px, 65vh, 750px)',
          background: 'linear-gradient(to bottom, rgba(255,220,130,0.3) 0%, rgba(255,190,90,0.1) 40%, transparent 100%)',
          clipPath: 'polygon(0% 0%, 100% 0%, 160% 100%, -60% 100%)',
          filter: 'blur(14px)',
          zIndex: 0,
        }}
      />

      {/* ── Warm ambient spread around beam ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={lit ? { opacity: 0.6 } : { opacity: 0 }}
        transition={{ duration: 1.4, delay: lit ? 0.8 : 0 }}
        style={{
          position: 'absolute',
          top: '90%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'clamp(200px, 38vw, 480px)',
          height: 'clamp(350px, 60vh, 700px)',
          background: 'radial-gradient(ellipse 45% 100% at 50% 0%, rgba(255,200,100,0.1) 0%, rgba(255,170,70,0.04) 45%, transparent 80%)',
          filter: 'blur(16px)',
          zIndex: 0,
        }}
      />

      {/* ── Warm halo behind the lamp ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.4 }}
        animate={lit ? { opacity: GLITCH_OPACITY, scale: 1 } : { opacity: 0, scale: 0.4 }}
        transition={lit ? { duration: 1.6, times: GLITCH_TIMES } : { duration: 0.3 }}
        style={{
          position: 'absolute',
          top: '52%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(80px, 14vw, 160px)',
          height: 'clamp(80px, 14vw, 160px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,200,90,0.6) 0%, rgba(219,100,54,0.15) 45%, transparent 70%)',
          filter: 'blur(24px)',
          zIndex: 0,
        }}
      />

      {/* ── SVG — vintage industrial hanging lamp ── */}
      <svg viewBox="0 0 200 180" fill="none"
        style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}>
        <defs>
          <filter id="lampGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <linearGradient id="cordGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a2a18"/>
            <stop offset="100%" stopColor="#1a1208"/>
          </linearGradient>
          <linearGradient id="shadeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e1610"/>
            <stop offset="50%" stopColor="#141008"/>
            <stop offset="100%" stopColor="#0e0a06"/>
          </linearGradient>
        </defs>

        {/* Ceiling hook / mount */}
        <path d="M94 2 Q100 -1 106 2 L106 8 Q100 11 94 8 Z" fill="#2a2018" stroke="#3a2a18" strokeWidth="0.5"/>
        <circle cx="100" cy="5" r="3" fill="#221a12" stroke="#3a2a18" strokeWidth="0.5"/>

        {/* Twisted cord */}
        <path d="M100 8 Q97 20 103 32 Q97 44 103 56 Q97 62 100 68"
          fill="none" stroke="url(#cordGrad)" strokeWidth="2" strokeLinecap="round"/>
        {/* Cord shadow */}
        <path d="M101 8 Q98 20 104 32 Q98 44 104 56 Q98 62 101 68"
          fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5"/>

        {/* Socket / fitting */}
        <rect x="94" y="66" width="12" height="10" rx="2" fill="#2a2018" stroke="#3a2a18" strokeWidth="0.6"/>
        <rect x="92" y="74" width="16" height="4" rx="1" fill="#221810" stroke="#3a2a18" strokeWidth="0.5"/>

        {/* ── Shade — wide industrial cone ── */}
        <path d="M96 78 L56 134 Q56 140 62 142 L138 142 Q144 140 144 134 L104 78 Z"
          fill="url(#shadeGrad)" stroke="#2e2218" strokeWidth="0.8"/>
        {/* Inner shade surface */}
        <path d="M97 80 L62 132 Q62 138 66 139 L134 139 Q138 138 138 132 L103 80 Z"
          fill="#120e08" stroke="none"/>
        {/* Shade rivet details */}
        {[72, 82, 92, 108, 118, 128].map((x, i) => (
          <circle key={i} cx={x} cy="140" r="1.2" fill="#2a2018" stroke="#3a2818" strokeWidth="0.3"/>
        ))}
        {/* Inner shade left highlight */}
        <path d="M97 82 L66 130" fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="2.5"/>
        {/* Bottom rim — industrial thick band */}
        <rect x="54" y="139" width="92" height="5" rx="1.5" fill="#1a1410" stroke="#2e2218" strokeWidth="0.6"/>
        <rect x="56" y="140" width="88" height="3" rx="1" fill="#0e0a06"/>

        {/* ── Warm inner glow when lit ── */}
        <motion.path
          d="M97 80 L62 132 Q62 138 66 139 L134 139 Q138 138 138 132 L103 80 Z"
          initial={{ fill: 'rgba(0,0,0,0)' }}
          animate={lit ? { fill: 'rgba(255,175,70,0.2)' } : { fill: 'rgba(0,0,0,0)' }}
          transition={lit ? { duration: 1.4 } : { duration: 0.2 }}
        />

        {/* Edison bulb — glass body */}
        <motion.path
          d="M94 78 Q94 84 91 92 Q88 102 91 110 Q94 115 100 116 Q106 115 109 110 Q112 102 109 92 Q106 84 106 78"
          initial={{ fill: '#1a1008', stroke: '#2a2018' }}
          animate={lit
            ? { fill: 'rgba(255,230,170,0.85)', stroke: 'rgba(255,210,120,0.4)' }
            : { fill: '#1a1008', stroke: '#2a2018' }}
          transition={lit ? { duration: 1.2 } : { duration: 0.2 }}
          strokeWidth="0.8"
        />
        {/* Edison filament — zigzag wire */}
        <motion.path
          d="M96 86 L98 90 L96 94 L98 98 L96 102 L98 106 M104 86 L102 90 L104 94 L102 98 L104 102 L102 106"
          fill="none"
          initial={{ stroke: '#3a2a18', strokeWidth: 0.6 }}
          animate={lit
            ? { stroke: '#ffdd88', strokeWidth: 0.9 }
            : { stroke: '#3a2a18', strokeWidth: 0.6 }}
          transition={lit ? { duration: 1.2 } : { duration: 0.2 }}
        />
        {/* Filament center connector */}
        <motion.line x1="98" y1="106" x2="102" y2="106"
          initial={{ stroke: '#3a2a18' }}
          animate={lit ? { stroke: '#ffcc66' } : { stroke: '#3a2a18' }}
          transition={lit ? { duration: 1.2 } : { duration: 0.2 }}
          strokeWidth="0.8"
        />

        {/* Bulb glow halo */}
        <motion.ellipse cx="100" cy="96" rx="24" ry="30"
          initial={{ opacity: 0 }}
          animate={lit ? { opacity: 0.55 } : { opacity: 0 }}
          transition={lit ? { duration: 1.4 } : { duration: 0.2 }}
          fill="rgba(255,215,100,0.3)" filter="url(#lampGlow)"
        />
        {/* Bright filament core glow */}
        <motion.ellipse cx="100" cy="96" rx="8" ry="12"
          initial={{ opacity: 0 }}
          animate={lit ? { opacity: 0.85 } : { opacity: 0 }}
          transition={lit ? { duration: 1 } : { duration: 0.2 }}
          fill="rgba(255,240,190,0.7)" filter="url(#lampGlow)"
        />
      </svg>

      {/* ── Breathing pulse overlay ── */}
      <AnimatePresence>
        {lit && (
          <motion.div
            key="pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 0.85, 0.4] }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            style={{
              position: 'absolute',
              top: '54%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'clamp(22px, 4vw, 40px)',
              height: 'clamp(22px, 4vw, 40px)',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,230,150,0.9) 0%, rgba(255,195,70,0.3) 50%, transparent 80%)',
              filter: 'blur(8px)',
              zIndex: 2,
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Video panel ───────────────────────────────────────────────────────────────
function StoryVideo({ lit }) {
  const videoRef = useRef(null)
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (lit) { v.currentTime = 0; v.play().catch(() => {}) }
    else v.pause()
  }, [lit])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={lit ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: lit ? 0.9 : 0.35, delay: lit ? 0.55 : 0 }}
      style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
    >
      <video
        ref={videoRef}
        src={'/asset/story.mp4'}
        muted
        loop
        playsInline
        style={{ width: '100%', height: '100%', objectFit: 'contain', aspectRatio: '9/16', background: '#000', display: 'block' }}
      />
      {/* Desktop: fade left edge into text. Mobile: fade top edge into text above */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, #0a0806 0%, transparent 20%), linear-gradient(to bottom, #0a0806 0%, transparent 18%)',
        pointerEvents: 'none',
      }}/>
    </motion.div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function StorySection() {
  const sectionRef = useRef(null)
  const lit = useLampTrigger(sectionRef)

  const fadeText = (delayOn) => ({
    initial: { opacity: 0 },
    animate: lit ? { opacity: 1 } : { opacity: 0 },
    transition: lit
      ? { duration: 0.65, delay: delayOn, ease: [0.25, 0.46, 0.45, 0.94] }
      : { duration: 0.3, ease: 'easeIn' },
  })

  return (
    <>
    <style>{STORY_CSS}</style>
    <section
      id="story"
      ref={sectionRef}
      className="story-section"
      style={{
        position: 'relative',
        zIndex: 10,
        background: '#0a0806',
        minHeight: '100vh',
        alignItems: 'stretch',
        borderRadius: '0px',
        scrollBehavior: 'smooth',
        boxShadow: '0 -8px 40px rgba(0,0,0,0.9)',
        overflow: 'hidden',
      }}
    >
      {/* ── Left: lamp + text in flow ── */}
      <div
        className="story-left"
        style={{
          flex: '0 0 clamp(280px, 42%, 520px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 'clamp(40px, 6vw, 72px) clamp(28px, 5vw, 72px)',
          minHeight: '100vh',
          minWidth: 0,
          position: 'relative',
          zIndex: 3,
          transition: 'padding 0.4s ease',
        }}
      >
        {/* ── Moving light background ── */}
        <AnimatePresence>
          {lit && (
            <motion.div
              key="wall-lights"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              aria-hidden
              style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}
            >
              {/* Slow drifting orb 1 — warm orange */}
              <motion.div
                animate={{ x: ['0%', '18%', '-10%', '0%'], y: ['0%', '-20%', '14%', '0%'] }}
                transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute', top: '20%', left: '15%',
                  width: '55%', height: '40%',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(219,100,54,0.07) 0%, transparent 70%)',
                  filter: 'blur(28px)',
                }}
              />

              {/* Slow drifting orb 2 — amber */}
              <motion.div
                animate={{ x: ['0%', '-15%', '20%', '0%'], y: ['0%', '18%', '-12%', '0%'] }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                style={{
                  position: 'absolute', top: '45%', left: '30%',
                  width: '60%', height: '45%',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(200,140,60,0.05) 0%, transparent 68%)',
                  filter: 'blur(34px)',
                }}
              />

              {/* Slow drifting orb 3 — cool white edge */}
              <motion.div
                animate={{ x: ['0%', '12%', '-18%', '0%'], y: ['0%', '-14%', '10%', '0%'] }}
                transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
                style={{
                  position: 'absolute', top: '10%', left: '40%',
                  width: '50%', height: '50%',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(240,210,170,0.03) 0%, transparent 65%)',
                  filter: 'blur(40px)',
                }}
              />

              {/* Thin vertical light ray sweeping slowly */}
              <motion.div
                animate={{ x: ['-10%', '110%'] }}
                transition={{ duration: 9, repeat: Infinity, ease: 'linear', delay: 1 }}
                style={{
                  position: 'absolute', top: 0, bottom: 0,
                  left: 0, width: '3%',
                  background: 'linear-gradient(to right, transparent, rgba(219,100,54,0.07), transparent)',
                  filter: 'blur(6px)',
                }}
              />

              {/* Second slower ray */}
              <motion.div
                animate={{ x: ['-10%', '110%'] }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear', delay: 5 }}
                style={{
                  position: 'absolute', top: 0, bottom: 0,
                  left: 0, width: '2%',
                  background: 'linear-gradient(to right, transparent, rgba(240,180,100,0.05), transparent)',
                  filter: 'blur(8px)',
                }}
              />

              {/* Wall text — exact center */}
              <div style={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                zIndex: 2,
                width: '100%',
              }}>
                <span style={{
                  fontFamily: "'Georgia', serif",
                  fontSize: 'clamp(9px, 0.8vw, 12px)',
                  letterSpacing: '0.13em',
                  color: 'rgba(255, 220, 130, 0.38)',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  textShadow: '0 1px 8px rgba(255,220,130,0.13)',
                  filter: 'drop-shadow(0 1px 6px rgba(219,100,54,0.07))',
                  marginBottom: '0.10em',
                  fontWeight: 600,
                  background: 'none',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  opacity: 0.7,
                  display: 'block',
                  textAlign: 'center',
                }}>Where The Magic Happens</span>
                <span style={{
                  fontFamily: "'Georgia', 'Times New Roman', serif",
                  fontSize: 'clamp(14px, 2vw, 28px)',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: '#fff',
                  whiteSpace: 'nowrap',
                  textShadow: '0 2px 8px rgba(219,100,54,0.08)',
                  filter: 'drop-shadow(0 1px 8px rgba(255,220,130,0.06))',
                  background: 'none',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  padding: '0.03em 0.07em',
                  borderRadius: '0.07em',
                  marginTop: '0.06em',
                  opacity: 0.5,
                  display: 'block',
                  textAlign: 'center',
                }}>yatharth</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dust particles in background */}
        <DustParticles lit={lit} />

        {/* Lamp sits here in flow — above the heading */}
        <WallLamp lit={lit} />

        {/* Text block */}
        <div className="story-text-block" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(10px, 1.6vw, 20px)', width: '100%' }}>

          <motion.p
            {...fadeText(0.38)}
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(1.2rem, 2.4vw, 2rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1.3,
              color: '#ffffff',
              margin: '0 0 clamp(12px, 2vw, 24px) 0',
            }}
          >
            {OPENING}
          </motion.p>

          {SCROLL_LINES.map((line, i) => (
            <motion.p
              key={i}
              {...fadeText(0.46 + i * 0.065)}
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: 'clamp(0.85rem, 1.7vw, 1.2rem)',
                letterSpacing: '-0.01em',
                lineHeight: 1.55,
                color: 'rgba(255,255,255,0.68)',
                margin: 0,
              }}
            >
              {line}
            </motion.p>
          ))}

          <motion.p
            {...fadeText(0.46 + SCROLL_LINES.length * 0.065 + 0.1)}
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(0.95rem, 1.9vw, 1.4rem)',
              letterSpacing: '-0.015em',
              lineHeight: 1.4,
              color: 'rgba(219,100,54,0.9)',
              margin: 'clamp(12px, 2vw, 24px) 0 0 0',
            }}
          >
            {CLOSING}
          </motion.p>
        </div>
      </div>

      {/* ── Right: video fills remaining space ── */}
      <div
        className="story-right"
        style={{ flex: '1 1 0', minWidth: 0, position: 'relative' }}
      >
        <StoryVideo lit={lit} />
      </div>
    </section>
    </>
  )
}
