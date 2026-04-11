import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import craftBg from '../asset/craft.jpeg'
import goExtraBg from '../asset/goextra.jpeg'

function useVisibleCount() {
  const [count, setCount] = useState(() => {
    if (typeof window === 'undefined') return 3
    return window.innerWidth < 600 ? 1 : window.innerWidth < 1024 ? 2 : 3
  })
  useEffect(() => {
    const update = () => setCount(window.innerWidth < 600 ? 1 : window.innerWidth < 1024 ? 2 : 3)
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [])
  return count
}

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
  { num: '01', title: 'Brand Strategy',         desc: 'We define how you are seen.',     icon: '◎', accent: '#DB6436' },
  { num: '02', title: 'Digital Marketing',      desc: 'We make sure you are found.',     icon: '◈', accent: '#C85A30' },
  { num: '03', title: 'Content & Storytelling', desc: 'We give your brand a voice.',     icon: '❖', accent: '#C85A30' },
  { num: '04', title: 'Creative Direction',     desc: 'We shape how it feels.',          icon: '✦', accent: '#DB6436' },
  { num: '05', title: 'Social Presence',        desc: 'We build how you show up daily.', icon: '◇', accent: '#C85A30' },
]

// ─── Service card ─────────────────────────────────────────────────────────────
// Key fix: use separate motion.div for whileInView (entry) vs the interactive
// tilt/hover/tap layer — never mix whileInView, animate, and spring style on one element.
function ServiceCard({ service, index }) {
  const cardRef = useRef(null)

  // Motion values for cursor-tracked tilt — drives style directly, no animate conflict
  const tiltX = useSpring(useMotionValue(0), { stiffness: 280, damping: 24 })
  const tiltY = useSpring(useMotionValue(0), { stiffness: 280, damping: 24 })

  // Spotlight — motion values avoid re-render on every mousemove
  const spotX = useMotionValue(50)
  const spotY = useMotionValue(50)
  const spotBg = useTransform(
    [spotX, spotY],
    ([x, y]) => `radial-gradient(ellipse 55% 45% at ${x}% ${y}%, ${service.accent}1c 0%, transparent 68%)`
  )

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top)  / rect.height
    tiltY.set((x - 0.5) * 16)
    tiltX.set(-(y - 0.5) * 16)
    spotX.set(x * 100)
    spotY.set(y * 100)
  }

  const handleMouseLeave = () => {
    tiltX.set(0)
    tiltY.set(0)
    spotX.set(50)
    spotY.set(50)
  }

  return (
    // Layer 1 — entry animation only (whileInView)
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Layer 2 — hover lift + tap press (no spring style conflict) */}
      <motion.div
        whileHover={{ y: -10, scale: 1.025 }}
        whileTap={{ scale: 0.955, y: 2 }}
        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
        // Layer 3 — cursor tilt via spring motion values in style
        style={{ rotateX: tiltX, rotateY: tiltY, perspective: '900px', willChange: 'transform' }}
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Outer glow — driven by CSS :hover via framer variants */}
        <motion.div
          variants={{ rest: { opacity: 0 }, hover: { opacity: 1 }, tap: { opacity: 0.8, scale: 0.97 } }}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          transition={{ duration: 0.25 }}
          style={{
            position: 'absolute', inset: '-2px', borderRadius: '20px',
            background: `linear-gradient(135deg, ${service.accent}55, transparent 60%, ${service.accent}33)`,
            filter: 'blur(1.5px)', pointerEvents: 'none', zIndex: 0,
          }}
        />

        {/* Press ripple — rendered via whileTap scale on parent, no extra state needed */}

        {/* Card body */}
        <motion.div
          variants={{ rest: { borderColor: 'rgba(161,149,140,0.12)' }, hover: { borderColor: `${service.accent}55` }, tap: { borderColor: `${service.accent}88` } }}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          transition={{ duration: 0.25 }}
          style={{
            position: 'relative', zIndex: 1,
            width: '100%',
            minHeight: 'clamp(280px, 40vw, 340px)',
            borderRadius: '18px',
            background: 'linear-gradient(145deg, rgba(26,22,18,0.82) 0%, rgba(14,11,9,0.88) 100%)',
            border: '1px solid rgba(161,149,140,0.12)',
            padding: 'clamp(28px, 3.5vw, 42px)',
            display: 'flex', flexDirection: 'column', gap: '18px',
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
          }}
        >
          {/* Cursor-tracking inner spotlight — motion value, zero re-renders */}
          <motion.div style={{
            position: 'absolute', inset: 0, borderRadius: '18px', pointerEvents: 'none',
            background: spotBg,
          }} />

          {/* Top shimmer on hover */}
          <motion.div
            variants={{ rest: { scaleX: 0.3, opacity: 0 }, hover: { scaleX: 1, opacity: 1 } }}
            initial="rest" whileHover="hover"
            transition={{ duration: 0.4 }}
            style={{
              position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
              background: `linear-gradient(90deg, transparent, ${service.accent}cc, transparent)`,
              transformOrigin: 'center', pointerEvents: 'none',
            }}
          />

          {/* Corner dot */}
          <motion.div
            variants={{ rest: { scale: 1, opacity: 0.55 }, hover: { scale: 1.5, opacity: 1 }, tap: { scale: 2, opacity: 1 } }}
            initial="rest" whileHover="hover" whileTap="tap"
            transition={{ duration: 0.22 }}
            style={{
              position: 'absolute', top: '18px', right: '20px',
              width: '6px', height: '6px', borderRadius: '50%',
              background: service.accent,
              boxShadow: `0 0 10px 3px ${service.accent}66`,
              pointerEvents: 'none',
            }}
          />

          {/* Number */}
          <span style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 400, fontSize: '0.68rem',
            letterSpacing: '0.22em', color: service.accent,
            textTransform: 'uppercase', opacity: 0.5,
          }}>
            {service.num}
          </span>

          {/* Icon */}
          <motion.span
            variants={{ rest: { scale: 1 }, hover: { scale: 1.15 }, tap: { scale: 0.9 } }}
            initial="rest" whileHover="hover" whileTap="tap"
            transition={{ type: 'spring', stiffness: 380, damping: 18 }}
            style={{
              fontSize: 'clamp(2rem, 3.2vw, 2.7rem)',
              color: service.accent, lineHeight: 1,
              display: 'inline-block', width: 'fit-content',
              filter: `drop-shadow(0 0 0px ${service.accent})`,
            }}
          >
            {service.icon}
          </motion.span>

          {/* Title */}
          <h3 style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 500, fontSize: 'clamp(1rem, 1.8vw, 1.22rem)',
            color: '#f5f0eb', margin: 0,
          }}>
            {service.title}
          </h3>

          {/* Divider */}
          <motion.div
            variants={{ rest: { scaleX: 0.45, opacity: 0.5 }, hover: { scaleX: 1, opacity: 1 } }}
            initial="rest" whileHover="hover"
            transition={{ duration: 0.38 }}
            style={{
              height: '1px',
              background: `linear-gradient(90deg, ${service.accent}cc, transparent)`,
              borderRadius: '1px', transformOrigin: 'left',
            }}
          />

          {/* Description */}
          <p style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 300, fontSize: 'clamp(0.8rem, 1.35vw, 0.92rem)',
            lineHeight: 1.65, color: 'rgba(245,240,235,0.55)', margin: 0,
          }}>
            {service.desc}
          </p>

        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// ─── Arrow button ─────────────────────────────────────────────────────────────
function ArrowBtn({ dir, onClick, disabled }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: '44px', height: '44px', borderRadius: '50%',
        border: `1px solid ${hov && !disabled ? 'rgba(219,100,54,0.55)' : 'rgba(161,149,140,0.18)'}`,
        background: hov && !disabled ? 'rgba(219,100,54,0.08)' : 'transparent',
        color: disabled ? 'rgba(161,149,140,0.2)' : hov ? '#DB6436' : 'rgba(245,240,235,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: disabled ? 'default' : 'pointer',
        transition: 'all 0.28s ease', outline: 'none', flexShrink: 0,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        {dir === 'prev'
          ? <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          : <path d="M6 3L11 8L6 13"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        }
      </svg>
    </button>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function CraftSection({ onCenterCardChange }) {
  const [active, setActive] = useState(0)
  const dir      = useRef(1)
  const VISIBLE  = useVisibleCount()
  const isMobile = useIsMobile()
  const PAGES    = Math.ceil(SERVICES.length / VISIBLE)
  const sectionRef = useRef(null)

  const go = (next) => {
    dir.current = next > active ? 1 : -1
    setActive(Math.max(0, Math.min(next, SERVICES.length - VISIBLE)))
  }

  const page    = Math.floor(active / VISIBLE)
  const visible = SERVICES.slice(active, active + VISIBLE)

  useEffect(() => {
    const centerIdx = visible.length >= 3 ? 1 : 0
    onCenterCardChange?.(visible[centerIdx])
  }, [active]) // eslint-disable-line

  return (
    <section
      id="craft"
      ref={sectionRef}
      style={{
        position: 'relative', zIndex: 10,
        background: '#0a0806', minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        padding: isMobile ? '12px 4px 16px' : 'clamp(28px,5vw,60px) clamp(8px,3vw,28px)',
        overflow: 'hidden',
      }}
    >
      <style>{`
        .craft-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: clamp(14px,2vw,26px); width: 100%; }
        @media (max-width: 1023px) { .craft-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 599px)  { .craft-grid { grid-template-columns: 1fr; } }
      `}</style>

      {/* Craft image tint */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `url(${craftBg})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.04, pointerEvents: 'none',
      }} />

      {/* GoExtra background */}
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
          fontWeight: 300, fontSize: 'clamp(1.3rem,4vw,2.1rem)',
          letterSpacing: '-0.03em', color: '#f5f0eb',
          margin: isMobile ? '0 0 4px' : '0 0 clamp(12px,2vw,28px)',
          textAlign: 'center',
        }}
      >
        Our Services
      </motion.h2>

      {/* Card grid */}
      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '1100px', overflow: 'visible', padding: '16px 4px 4px' }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="craft-grid"
          >
            {visible.map((service, i) => (
              <ServiceCard key={service.title} service={service} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: '20px', marginTop: 'clamp(20px,3vw,44px)', flexShrink: 0 }}>
        <ArrowBtn dir="prev" onClick={() => go(active - VISIBLE)} disabled={active === 0} />
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {Array.from({ length: PAGES }).map((_, i) => (
            <button key={i} onClick={() => go(i * VISIBLE)} style={{
              width: i === page ? '24px' : '6px', height: '6px', borderRadius: '3px',
              border: 'none', background: i === page ? '#DB6436' : 'rgba(161,149,140,0.28)',
              cursor: 'pointer', padding: 0, outline: 'none',
              transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
            }} />
          ))}
        </div>
        <ArrowBtn dir="next" onClick={() => go(active + VISIBLE)} disabled={active + VISIBLE >= SERVICES.length} />
      </div>
    </section>
  )
}
