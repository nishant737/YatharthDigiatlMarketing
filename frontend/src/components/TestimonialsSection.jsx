import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import goextraBg from '../asset/goextra.jpeg'

const TESTIMONIALS = [
  {
    quote:
      "I have had the opportunity to closely observe the work Yatharth has been doing over the years. There is a sense of clarity and discipline in their approach, backed by a young and energetic team. It is good to see them grow with such focus and intent.",
    name: 'Dr. K. Prakash Shetty',
    role: 'Founder Chairman, MRG Group',
    initials: 'KP',
  },
  {
    quote:
      "I have seen Yatharth's work from close quarters, and what stands out is their understanding of communication in today's digital space. The team brings both energy and responsibility to what they do, which reflects in the way they execute and present ideas.",
    name: 'Captain Brijesh Chowta',
    role: 'Member of Parliament, Dakshina Kannada',
    initials: 'BC',
  },
  {
    quote:
      "Yatharth has been actively involved in handling digital presence and communication, and their work reflects consistency and attention to detail. It is encouraging to see a young team take ownership and deliver with such commitment.",
    name: 'Gurme Suresh Shetty',
    role: 'MLA, Kapu',
    initials: 'GS',
  },
  {
    quote:
      "Yatharth played a key role in supporting us during the NetZero Summit held in Mangaluru in February 2026. It was a one-of-a-kind initiative, and their team brought in the right mix of creativity, coordination, and responsiveness throughout. Their contribution added real value to the overall experience.",
    name: 'Nitik Ratnakar',
    role: 'Executive Director – India & Dubai, MIR Group (Italy)',
    initials: 'NR',
  },
]

const N = TESTIMONIALS.length

// Rotation variants — direction: 1 = scrolling down, -1 = scrolling up
const variants = {
  enter: (dir) => ({
    opacity: 0,
    rotateX: dir > 0 ? 28 : -28,
    y: dir > 0 ? 60 : -60,
    scale: 0.93,
    filter: 'blur(4px)',
  }),
  center: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
      opacity: { duration: 0.5, ease: 'easeOut' },
      filter: { duration: 0.5 },
    },
  },
  exit: (dir) => ({
    opacity: 0,
    rotateX: dir > 0 ? -28 : 28,
    y: dir > 0 ? -60 : 60,
    scale: 0.93,
    filter: 'blur(4px)',
    transition: {
      duration: 0.55,
      ease: [0.7, 0, 0.84, 0],
      opacity: { duration: 0.35, ease: 'easeIn' },
      filter: { duration: 0.35 },
    },
  }),
}

// ─── Ember particles ──────────────────────────────────────────────────────────
const EMBERS = [
  { left: '8%',  dur: 7.5, delay: 0,   size: 3 },
  { left: '18%', dur: 9.0, delay: 1.4, size: 2 },
  { left: '29%', dur: 6.8, delay: 0.6, size: 4 },
  { left: '41%', dur: 11,  delay: 2.5, size: 2 },
  { left: '53%', dur: 8.2, delay: 0.2, size: 3 },
  { left: '63%', dur: 7.0, delay: 3.1, size: 2 },
  { left: '74%', dur: 10,  delay: 1.0, size: 4 },
  { left: '84%', dur: 6.5, delay: 2.0, size: 3 },
  { left: '92%', dur: 8.8, delay: 0.8, size: 2 },
  { left: '35%', dur: 9.5, delay: 4.0, size: 3 },
  { left: '57%', dur: 7.2, delay: 3.6, size: 2 },
  { left: '78%', dur: 11,  delay: 1.8, size: 4 },
]

// ─── Geometric shapes ─────────────────────────────────────────────────────────
const SHAPES = [
  { x: '8%',  y: '12%', size: 90,  rot: 0,   dur: 30, type: 'ring',    opacity: 0.18 },
  { x: '88%', y: '18%', size: 60,  rot: 45,  dur: 22, type: 'diamond', opacity: 0.14 },
  { x: '5%',  y: '72%', size: 70,  rot: 20,  dur: 38, type: 'ring',    opacity: 0.12 },
  { x: '92%', y: '65%', size: 50,  rot: -30, dur: 26, type: 'diamond', opacity: 0.16 },
  { x: '48%', y: '8%',  size: 110, rot: 0,   dur: 45, type: 'ring',    opacity: 0.08 },
  { x: '20%', y: '88%', size: 55,  rot: 15,  dur: 20, type: 'cross',   opacity: 0.13 },
  { x: '78%', y: '85%', size: 75,  rot: -20, dur: 34, type: 'ring',    opacity: 0.10 },
  { x: '50%', y: '50%', size: 260, rot: 0,   dur: 60, type: 'ring',    opacity: 0.04 },
]

function AnimatedBackground({ mouseX, mouseY }) {
  // Parallax offsets for each orb depth level
  const slowX  = useTransform(mouseX, v => v * -18)
  const slowY  = useTransform(mouseY, v => v * -18)
  const midX   = useTransform(mouseX, v => v * -32)
  const midY   = useTransform(mouseY, v => v * -32)
  const fastX  = useTransform(mouseX, v => v * -50)
  const fastY  = useTransform(mouseY, v => v * -50)

  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 1, pointerEvents: 'none' }}>

      {/* ── Noise grain overlay ── */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04 }}>
        <filter id="tgrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#tgrain)"/>
      </svg>

      {/* ── Dot mesh grid that breathes ── */}
      <motion.div
        animate={{ opacity: [0.22, 0.38, 0.22], scale: [1, 1.04, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(219,100,54,0.55) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          maskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%, black 10%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%, black 10%, transparent 100%)',
        }}
      />

      {/* ── Large deep orbs with mouse parallax ── */}
      <motion.div style={{ x: slowX, y: slowY, position: 'absolute', top: '0%', left: '0%', width: '60%', height: '60%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(219,100,54,0.13) 0%, transparent 65%)',
        filter: 'blur(70px)',
      }}/>
      <motion.div style={{ x: fastX, y: fastY, position: 'absolute', bottom: '0%', right: '0%', width: '55%', height: '55%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(180,75,30,0.11) 0%, transparent 65%)',
        filter: 'blur(80px)',
      }}/>
      <motion.div style={{ x: midX, y: midY, position: 'absolute', top: '30%', left: '25%', width: '50%', height: '50%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(219,100,54,0.07) 0%, transparent 65%)',
        filter: 'blur(60px)',
      }}/>

      {/* ── Drifting mid orbs ── */}
      <motion.div
        animate={{ x: [0, 55, -35, 0], y: [0, -45, 30, 0], scale: [1, 1.18, 0.88, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '10%', right: '15%',
          width: '320px', height: '320px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(219,100,54,0.11) 0%, transparent 68%)',
          filter: 'blur(55px)',
        }}
      />
      <motion.div
        animate={{ x: [0, -40, 25, 0], y: [0, 50, -20, 0], scale: [1, 0.82, 1.22, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        style={{
          position: 'absolute', bottom: '15%', left: '8%',
          width: '280px', height: '280px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,80,40,0.09) 0%, transparent 68%)',
          filter: 'blur(45px)',
        }}
      />
      <motion.div
        animate={{ x: [0, 30, -50, 0], y: [0, -60, 20, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
        style={{
          position: 'absolute', top: '50%', right: '5%',
          width: '240px', height: '240px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(219,100,54,0.08) 0%, transparent 68%)',
          filter: 'blur(40px)',
        }}
      />

      {/* ── Sweeping horizontal light ray ── */}
      <motion.div
        animate={{ x: ['-15%', '115%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear', delay: 1 }}
        style={{
          position: 'absolute', top: 0, bottom: 0, left: 0,
          width: '4%',
          background: 'linear-gradient(to right, transparent, rgba(219,100,54,0.06), transparent)',
          filter: 'blur(8px)',
        }}
      />
      <motion.div
        animate={{ x: ['-15%', '115%'] }}
        transition={{ duration: 17, repeat: Infinity, ease: 'linear', delay: 6 }}
        style={{
          position: 'absolute', top: 0, bottom: 0, left: 0,
          width: '2.5%',
          background: 'linear-gradient(to right, transparent, rgba(245,200,150,0.04), transparent)',
          filter: 'blur(12px)',
        }}
      />

      {/* ── Rotating / floating geometric shapes ── */}
      {SHAPES.map((s, i) => (
        <motion.div
          key={i}
          animate={{ rotate: s.type === 'cross' ? [s.rot, s.rot + 180] : [s.rot, s.rot + 360] }}
          transition={{ duration: s.dur, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            left: s.x, top: s.y,
            width: s.size, height: s.size,
            opacity: s.opacity,
            translateX: '-50%', translateY: '-50%',
          }}
        >
          {s.type === 'ring' && (
            <svg width={s.size} height={s.size} viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="46" stroke="#DB6436" strokeWidth="1.2"/>
              <circle cx="50" cy="50" r="34" stroke="rgba(219,100,54,0.5)" strokeWidth="0.6" strokeDasharray="5 4"/>
            </svg>
          )}
          {s.type === 'diamond' && (
            <svg width={s.size} height={s.size} viewBox="0 0 100 100" fill="none">
              <rect x="18" y="18" width="64" height="64" transform="rotate(45 50 50)" stroke="#DB6436" strokeWidth="1.2"/>
              <rect x="30" y="30" width="40" height="40" transform="rotate(45 50 50)" stroke="rgba(219,100,54,0.4)" strokeWidth="0.6"/>
            </svg>
          )}
          {s.type === 'cross' && (
            <svg width={s.size} height={s.size} viewBox="0 0 100 100" fill="none">
              <line x1="50" y1="5"  x2="50" y2="95" stroke="#DB6436" strokeWidth="1.2"/>
              <line x1="5"  y1="50" x2="95" y2="50" stroke="#DB6436" strokeWidth="1.2"/>
              <circle cx="50" cy="50" r="5" fill="rgba(219,100,54,0.5)"/>
            </svg>
          )}
        </motion.div>
      ))}

      {/* ── Pulsing concentric rings at center ── */}
      {[380, 550, 720].map((size, i) => (
        <motion.div
          key={`ring-${i}`}
          animate={{ scale: [1, 1.06, 1], opacity: [0.06 - i * 0.015, 0.12 - i * 0.02, 0.06 - i * 0.015] }}
          transition={{ duration: 5 + i * 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 1.2 }}
          style={{
            position: 'absolute', top: '50%', left: '50%',
            width: size, height: size,
            translateX: '-50%', translateY: '-50%',
            borderRadius: '50%',
            border: '1px solid rgba(219,100,54,0.4)',
          }}
        />
      ))}

      {/* ── Rising ember particles ── */}
      {EMBERS.map((p, i) => (
        <motion.div
          key={`ember-${i}`}
          animate={{ y: [0, -700], opacity: [0, 0.7, 0.5, 0] }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
            opacity: { times: [0, 0.1, 0.8, 1] },
          }}
          style={{
            position: 'absolute',
            left: p.left, bottom: '-8px',
            width: p.size, height: p.size,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,170,80,1) 0%, rgba(219,100,54,0.6) 50%, transparent 100%)',
            filter: 'blur(1px)',
            boxShadow: `0 0 ${p.size * 2}px rgba(219,100,54,0.8)`,
          }}
        />
      ))}

    </div>
  )
}

function StarRow() {
  return (
    <div style={{ display: 'flex', gap: '4px', marginBottom: '24px' }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="#DB6436">
          <path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4l-3.7 1.9.7-4.1L2 5.3l4.2-.7z" />
        </svg>
      ))}
    </div>
  )
}

function QuoteIcon() {
  return (
    <svg
      width="32"
      height="24"
      viewBox="0 0 32 24"
      fill="none"
      style={{ marginBottom: '20px', opacity: 0.35 }}
    >
      <path
        d="M0 24V14.4C0 10.56 1.04 7.28 3.12 4.56 5.2 1.84 8.24 0.16 12.24 0L13.44 2.16C11.04 2.64 9.12 3.76 7.68 5.52 6.32 7.28 5.6 9.28 5.52 11.52H10.56V24H0ZM18.56 24V14.4C18.56 10.56 19.6 7.28 21.68 4.56 23.76 1.84 26.8 0.16 30.8 0L32 2.16C29.6 2.64 27.68 3.76 26.24 5.52 24.88 7.28 24.16 9.28 24.08 11.52H29.12V24H18.56Z"
        fill="#DB6436"
      />
    </svg>
  )
}

export default function TestimonialsSection() {
  const scrollRef = useRef(null)
  const stickyRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: scrollRef })

  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)

  // Mouse parallax for background orbs
  const rawMouseX = useMotionValue(0)
  const rawMouseY = useMotionValue(0)
  const mouseX = useSpring(rawMouseX, { stiffness: 55, damping: 22 })
  const mouseY = useSpring(rawMouseY, { stiffness: 55, damping: 22 })

  useEffect(() => {
    const onMove = (e) => {
      const rect = stickyRef.current?.getBoundingClientRect()
      if (!rect) return
      rawMouseX.set((e.clientX - rect.left) / rect.width  - 0.5)
      rawMouseY.set((e.clientY - rect.top)  / rect.height - 0.5)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [rawMouseX, rawMouseY])

  // Map scroll progress [0,1] → index [0, N-1]
  const rawIndex = useTransform(scrollYProgress, [0, 1], [0, N - 0.001])

  useEffect(() => {
    const unsub = rawIndex.on('change', (val) => {
      const next = Math.floor(val)
      setActive((prev) => {
        if (next !== prev) {
          setDirection(next > prev ? 1 : -1)
          return next
        }
        return prev
      })
    })
    return unsub
  }, [rawIndex])

  // Progress bar width derived from scroll
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const t = TESTIMONIALS[active]

  return (
    // ── Outer tall container — provides the scroll room ──────────────────────
    <div
      ref={scrollRef}
      id="testimonials"
      style={{ height: `${N * 100}vh`, position: 'relative', zIndex: 20 }}
    >
      {/* ── Sticky panel — stays fixed while user scrolls through cards ──── */}
      <div
        ref={stickyRef}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#060503',
        }}
      >
        {/* Background image */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${goextraBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            zIndex: 0,
          }}
        />
        {/* Dark overlay */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(6,5,3,0.92) 0%, rgba(6,5,3,0.78) 40%, rgba(6,5,3,0.85) 75%, rgba(6,5,3,0.97) 100%)',
            zIndex: 1,
          }}
        />

        {/* Rich animated background */}
        <AnimatedBackground mouseX={mouseX} mouseY={mouseY} />

        {/* Top glow line */}
        <div aria-hidden style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '50%', height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(219,100,54,0.4), transparent)',
          zIndex: 2,
        }} />

        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: '900px',
          padding: '0 clamp(20px, 6vw, 80px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>

          {/* Heading — static */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vh, 64px)', width: '100%' }}>
            <p style={{
              fontFamily: '"Inter", system-ui, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(0.54rem, 0.9vw, 0.66rem)',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: 'rgba(219,100,54,0.55)',
              margin: '0 0 14px',
            }}>
              Client Feedback
            </p>
            <h2 style={{
              fontFamily: '"Inter", system-ui, sans-serif',
              fontWeight: 300,
              fontSize: 'clamp(1.8rem, 4.5vw, 3rem)',
              letterSpacing: '-0.03em',
              color: '#f5f0eb',
              margin: '0 0 12px',
            }}>
              Words from the{' '}
              <span style={{ color: '#DB6436' }}>brands we've built</span>
            </h2>
            <p style={{
              fontFamily: '"Inter", system-ui, sans-serif',
              fontWeight: 300,
              fontSize: 'clamp(0.82rem, 1.4vw, 1rem)',
              color: 'rgba(245,240,235,0.38)',
              margin: 0,
            }}>
              Real stories, real results — straight from our clients.
            </p>
          </div>

          {/* Wheel card — perspective wrapper enables 3D rotation feel */}
          <div style={{ perspective: '1200px', width: '100%', maxWidth: '780px' }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{
                  borderRadius: '20px',
                  padding: 'clamp(32px, 4vw, 48px)',
                  background: 'rgba(245,240,235,0.04)',
                  border: '1px solid rgba(219,100,54,0.14)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform, opacity',
                }}
              >
                <QuoteIcon />
                <StarRow />

                <p style={{
                  fontFamily: '"Inter", system-ui, sans-serif',
                  fontWeight: 300,
                  fontSize: 'clamp(1rem, 2vw, 1.22rem)',
                  lineHeight: 1.78,
                  color: 'rgba(245,240,235,0.83)',
                  margin: '0 0 36px',
                  letterSpacing: '-0.01em',
                }}>
                  "{t.quote}"
                </p>

                {/* Author row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '50%', flexShrink: 0,
                    background: 'linear-gradient(135deg, rgba(219,100,54,0.3), rgba(219,100,54,0.08))',
                    border: '1px solid rgba(219,100,54,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: '"Inter", system-ui, sans-serif',
                    fontWeight: 500, fontSize: '0.7rem', letterSpacing: '0.05em',
                    color: '#DB6436',
                  }}>
                    {t.initials}
                  </div>
                  <div>
                    <div style={{
                      fontFamily: '"Inter", system-ui, sans-serif',
                      fontWeight: 500, fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)',
                      color: '#f5f0eb', marginBottom: '2px',
                    }}>
                      {t.name}
                    </div>
                    <div style={{
                      fontFamily: '"Inter", system-ui, sans-serif',
                      fontWeight: 300, fontSize: 'clamp(0.7rem, 1vw, 0.8rem)',
                      color: 'rgba(245,240,235,0.35)', letterSpacing: '0.04em',
                    }}>
                      {t.role}
                    </div>
                  </div>
                  <div style={{
                    marginLeft: 'auto',
                    fontFamily: '"Inter", system-ui, sans-serif',
                    fontWeight: 300, fontSize: '0.72rem', letterSpacing: '0.1em',
                    color: 'rgba(245,240,235,0.2)',
                  }}>
                    {String(active + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Scroll progress bar + dot indicators */}
          <div style={{
            marginTop: '36px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            width: '100%',
            maxWidth: '780px',
          }}>
            {/* Thin progress bar */}
            <div style={{
              width: '100%', height: '2px',
              background: 'rgba(219,100,54,0.1)',
              borderRadius: '2px',
              overflow: 'hidden',
            }}>
              <motion.div
                style={{
                  height: '100%',
                  width: progressWidth,
                  background: 'linear-gradient(90deg, rgba(219,100,54,0.6), #DB6436)',
                  borderRadius: '2px',
                }}
              />
            </div>

            {/* Dots */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {TESTIMONIALS.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: i === active ? '20px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: i === active ? '#DB6436' : 'rgba(219,100,54,0.25)',
                    transition: 'all 0.35s ease',
                  }}
                />
              ))}
            </div>

            {/* Scroll hint — fades out after first card */}
            <motion.p
              animate={{ opacity: active === 0 ? 0.4 : 0 }}
              transition={{ duration: 0.4 }}
              style={{
                fontFamily: '"Inter", system-ui, sans-serif',
                fontWeight: 300, fontSize: '0.68rem', letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(245,240,235,0.4)',
                margin: 0,
                display: 'flex', alignItems: 'center', gap: '6px',
              }}
            >
              <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
                <path d="M6 1v10M2 8l4 5 4-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Scroll to explore
            </motion.p>
          </div>
        </div>

        {/* Bottom glow line */}
        <div aria-hidden style={{
          position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          width: '40%', height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(219,100,54,0.25), transparent)',
          zIndex: 2,
        }} />
      </div>
    </div>
  )
}
