import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue } from 'framer-motion'
import craftBg from '../asset/bg.jpeg'
import imgPrakash from '../asset/Dr. K. Prakash Shetty.png'
import imgBrijesh from '../asset/Captain Brijesh Chowta.png'
import imgGurme   from '../asset/Gurme Suresh Shetty.png'
import imgNitik   from '../asset/Nitik Ratnakar.png'

const TESTIMONIALS = [
  {
    quote: "I have had the opportunity to closely observe the work Yatharth has been doing over the years. There is a sense of clarity and discipline in their approach, backed by a young and energetic team. It is good to see them grow with such focus and intent.",
    name: 'Dr. K. Prakash Shetty',
    role: 'Founder Chairman, MRG Group',
    img: imgPrakash,
  },
  {
    quote: "I have seen Yatharth's work from close quarters, and what stands out is their understanding of communication in today's digital space. The team brings both energy and responsibility to what they do, which reflects in the way they execute and present ideas.",
    name: 'Captain Brijesh Chowta',
    role: 'Member of Parliament, Dakshina Kannada',
    img: imgBrijesh,
  },
  {
    quote: "Yatharth has been actively involved in handling digital presence and communication, and their work reflects consistency and attention to detail. It is encouraging to see a young team take ownership and deliver with such commitment.",
    name: 'Gurme Suresh Shetty',
    role: 'MLA, Kapu',
    img: imgGurme,
  },
  {
    quote: "Yatharth played a key role in supporting us during the NetZero Summit held in Mangaluru in February 2026. It was a one-of-a-kind initiative, and their team brought in the right mix of creativity, coordination, and responsiveness throughout. Their contribution added real value to the overall experience.",
    name: 'Nitik Ratnakar',
    role: 'Executive Director – India & Dubai, MIR Group (Italy)',
    img: imgNitik,
  },
]

const N = TESTIMONIALS.length

function StarRow() {
  return (
    <div style={{ display: 'flex', gap: '3px' }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 16 16" fill="#DB6436">
          <path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4l-3.7 1.9.7-4.1L2 5.3l4.2-.7z" />
        </svg>
      ))}
    </div>
  )
}

function QuoteIcon({ size = 28, opacity = 0.9 }) {
  return (
    <svg width={size} height={size * 0.75} viewBox="0 0 32 24" fill="none" style={{ opacity }}>
      <path
        d="M0 24V14.4C0 10.56 1.04 7.28 3.12 4.56 5.2 1.84 8.24 0.16 12.24 0L13.44 2.16C11.04 2.64 9.12 3.76 7.68 5.52 6.32 7.28 5.6 9.28 5.52 11.52H10.56V24H0ZM18.56 24V14.4C18.56 10.56 19.6 7.28 21.68 4.56 23.76 1.84 26.8 0.16 30.8 0L32 2.16C29.6 2.64 27.68 3.76 26.24 5.52 24.88 7.28 24.16 9.28 24.08 11.52H29.12V24H18.56Z"
        fill="#DB6436"
      />
    </svg>
  )
}

function CardContent({ t, isActive, direction }) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={t.name}
        custom={direction}
        initial={{ opacity: 0, x: direction > 0 ? 28 : -28 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: direction > 0 ? -28 : 28 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: 'flex', flexDirection: 'column', gap: isActive ? '20px' : '14px', height: '100%' }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <QuoteIcon size={isActive ? 28 : 20} opacity={isActive ? 0.9 : 0.45} />
          {isActive && <StarRow />}
        </div>

        <p style={{
          fontFamily: '"Inter", system-ui, sans-serif',
          fontWeight: 300,
          fontSize: isActive ? 'clamp(0.92rem, 1.5vw, 1.08rem)' : 'clamp(0.78rem, 1.1vw, 0.86rem)',
          lineHeight: 1.82,
          color: isActive ? 'rgba(245,240,235,0.88)' : 'rgba(245,240,235,0.42)',
          margin: 0,
          letterSpacing: '-0.01em',
          display: '-webkit-box',
          WebkitLineClamp: isActive ? 'unset' : 4,
          WebkitBoxOrient: 'vertical',
          overflow: isActive ? 'visible' : 'hidden',
        }}>
          "{t.quote}"
        </p>

        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          paddingTop: isActive ? '12px' : '8px',
          borderTop: `1px solid ${isActive ? 'rgba(219,100,54,0.15)' : 'rgba(219,100,54,0.06)'}`,
          marginTop: 'auto',
        }}>
          <div style={{
            width: isActive ? '54px' : '38px',
            height: isActive ? '54px' : '38px',
            borderRadius: '10px', flexShrink: 0,
            overflow: 'hidden',
            border: `1.5px solid ${isActive ? 'rgba(219,100,54,0.45)' : 'rgba(219,100,54,0.18)'}`,
            transition: 'width 0.65s ease, height 0.65s ease',
          }}>
            <img src={t.img} alt={t.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{
              fontFamily: '"Inter", system-ui, sans-serif',
              fontWeight: 500,
              fontSize: isActive ? 'clamp(0.85rem, 1.2vw, 0.96rem)' : '0.76rem',
              color: isActive ? '#f5f0eb' : 'rgba(245,240,235,0.45)',
              marginBottom: '3px',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>{t.name}</div>
            <div style={{
              fontFamily: '"Inter", system-ui, sans-serif',
              fontWeight: 300,
              fontSize: isActive ? 'clamp(0.68rem, 0.9vw, 0.78rem)' : '0.64rem',
              color: isActive ? 'rgba(219,100,54,0.8)' : 'rgba(219,100,54,0.35)',
              letterSpacing: '0.02em',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>{t.role}</div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

function CardSlot({ position, t, direction, onClick }) {
  const isActive = position === 0
  return (
    <motion.div
      onClick={!isActive ? onClick : undefined}
      animate={{
        scale:   isActive ? 1 : 0.87,
        opacity: isActive ? 1 : 0.48,
        y:       isActive ? 0 : 22,
        filter:  isActive ? 'blur(0px)' : 'blur(0.8px)',
      }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        flex: isActive ? '0 0 44%' : '0 0 26%',
        transition: 'flex 0.7s cubic-bezier(0.22,1,0.36,1)',
        borderRadius: '22px',
        padding: isActive ? 'clamp(28px, 3vw, 42px)' : 'clamp(20px, 2.5vw, 30px)',
        background: isActive
          ? 'linear-gradient(145deg, rgba(34,26,20,0.98) 0%, rgba(16,11,8,0.99) 100%)'
          : 'linear-gradient(145deg, rgba(20,16,12,0.85) 0%, rgba(10,8,6,0.88) 100%)',
        border: isActive
          ? '1px solid rgba(219,100,54,0.42)'
          : '1px solid rgba(219,100,54,0.1)',
        boxShadow: isActive
          ? '0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(219,100,54,0.1), 0 4px 24px rgba(219,100,54,0.07)'
          : '0 4px 16px rgba(0,0,0,0.28)',
        cursor: isActive ? 'default' : 'pointer',
        overflow: 'hidden',
        position: 'relative',
        zIndex: isActive ? 2 : 1,
        minHeight: isActive ? '320px' : '280px',
      }}
    >
      <CardContent t={t} isActive={isActive} direction={direction} />
    </motion.div>
  )
}

export default function TestimonialsSection() {
  const sectionRef = useRef(null)
  const [active, setActive]       = useState(0)
  const [direction, setDirection] = useState(1)
  const [isMobile, setIsMobile]   = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)
  const dragX = useMotionValue(0)

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [])

  const goDir = useCallback((next, dir) => {
    setDirection(dir)
    setActive(((next % N) + N) % N)
  }, [])

  useEffect(() => {
    const t = setInterval(() => {
      setDirection(1)
      setActive(prev => (prev + 1) % N)
    }, 4000)
    return () => clearInterval(t)
  }, [])

  const onDragEnd = (_, info) => {
    if (info.offset.x < -60)     goDir((active + 1) % N, 1)
    else if (info.offset.x > 60) goDir(((active - 1) + N) % N, -1)
  }

  const leftIdx  = ((active - 1) + N) % N
  const rightIdx = (active + 1) % N

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      style={{
        position: 'relative', zIndex: 20,
        minHeight: '100vh', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        background: '#060503',
        padding: 'clamp(60px, 8vh, 100px) clamp(16px, 4vw, 48px)',
      }}
    >
      {/* bg.jpeg background */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `url(${craftBg})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.45,
      }} />
      <div aria-hidden style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(180deg, rgba(6,5,3,0.72) 0%, rgba(6,5,3,0.52) 50%, rgba(6,5,3,0.72) 100%)',
      }} />
      <div aria-hidden style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '50%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(219,100,54,0.4), transparent)',
        zIndex: 2,
      }} />

      <div style={{
        position: 'relative', zIndex: 2,
        width: '100%', maxWidth: '1200px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 'clamp(36px, 5vh, 56px)',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center' }}
        >
          <p style={{
            fontFamily: '"Inter", system-ui, sans-serif',
            fontWeight: 400, fontSize: 'clamp(0.54rem, 0.9vw, 0.66rem)',
            letterSpacing: '0.32em', textTransform: 'uppercase',
            color: 'rgba(219,100,54,0.65)', margin: '0 0 14px',
          }}>Client Feedback</p>
          <h2 style={{
            fontFamily: '"Inter", system-ui, sans-serif',
            fontWeight: 300, fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
            letterSpacing: '-0.03em', color: '#f5f0eb', margin: '0 0 10px',
          }}>
            Words from the <span style={{ color: '#DB6436' }}>brands we've built</span>
          </h2>
          <p style={{
            fontFamily: '"Inter", system-ui, sans-serif',
            fontWeight: 300, fontSize: 'clamp(0.8rem, 1.4vw, 0.96rem)',
            color: 'rgba(245,240,235,0.38)', margin: 0,
          }}>
            Real stories, real results — straight from our clients.
          </p>
        </motion.div>

        {isMobile ? (
          <div style={{ width: '100%', overflow: 'hidden' }}>
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              style={{ x: dragX }}
              onDragEnd={onDragEnd}
            >
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={active}
                  custom={direction}
                  initial={d => ({ opacity: 0, x: d > 0 ? '55%' : '-55%' })}
                  animate={{ opacity: 1, x: 0 }}
                  exit={d => ({ opacity: 0, x: d > 0 ? '-55%' : '55%' })}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    borderRadius: '20px',
                    padding: '28px 24px',
                    background: 'linear-gradient(145deg, rgba(30,24,18,0.95), rgba(14,10,7,0.98))',
                    border: '1px solid rgba(219,100,54,0.35)',
                    boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
                    display: 'flex', flexDirection: 'column', gap: '18px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <QuoteIcon size={24} />
                    <StarRow />
                  </div>
                  <p style={{
                    fontFamily: '"Inter", system-ui, sans-serif',
                    fontWeight: 300, fontSize: '0.95rem', lineHeight: 1.8,
                    color: 'rgba(245,240,235,0.88)', margin: 0, letterSpacing: '-0.01em',
                  }}>
                    "{TESTIMONIALS[active].quote}"
                  </p>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    paddingTop: '12px', borderTop: '1px solid rgba(219,100,54,0.12)',
                  }}>
                    <div style={{
                      width: '52px', height: '52px', borderRadius: '10px', flexShrink: 0,
                      overflow: 'hidden', border: '1.5px solid rgba(219,100,54,0.4)',
                    }}>
                      <img src={TESTIMONIALS[active].img} alt={TESTIMONIALS[active].name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: '"Inter", system-ui, sans-serif', fontWeight: 500, fontSize: '0.92rem', color: '#f5f0eb', marginBottom: '3px' }}>
                        {TESTIMONIALS[active].name}
                      </div>
                      <div style={{ fontFamily: '"Inter", system-ui, sans-serif', fontWeight: 300, fontSize: '0.72rem', color: 'rgba(219,100,54,0.8)' }}>
                        {TESTIMONIALS[active].role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        ) : (
          <div style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(14px, 2vw, 24px)',
          }}>
            <CardSlot key="slot-left"   position={-1} t={TESTIMONIALS[leftIdx]}  direction={direction} onClick={() => goDir(leftIdx, -1)} />
            <CardSlot key="slot-center" position={0}  t={TESTIMONIALS[active]}   direction={direction} />
            <CardSlot key="slot-right"  position={1}  t={TESTIMONIALS[rightIdx]} direction={direction} onClick={() => goDir(rightIdx, 1)} />
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => goDir(i, i > active ? 1 : -1)}
                style={{
                  width: i === active ? '28px' : '8px',
                  height: '8px', borderRadius: '4px', border: 'none', padding: 0, outline: 'none',
                  background: i === active ? '#DB6436' : 'rgba(219,100,54,0.25)',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                }}
              />
            ))}
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {[
              { dir: 'prev', fn: () => goDir(((active - 1) + N) % N, -1) },
              { dir: 'next', fn: () => goDir((active + 1) % N, 1) },
            ].map(({ dir, fn }) => (
              <button
                key={dir}
                onClick={fn}
                style={{
                  width: '44px', height: '44px', borderRadius: '50%',
                  border: '1px solid rgba(219,100,54,0.3)',
                  background: 'rgba(219,100,54,0.06)',
                  color: 'rgba(245,240,235,0.6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', outline: 'none',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(219,100,54,0.7)'; e.currentTarget.style.color = '#DB6436'; e.currentTarget.style.background = 'rgba(219,100,54,0.12)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(219,100,54,0.3)'; e.currentTarget.style.color = 'rgba(245,240,235,0.6)'; e.currentTarget.style.background = 'rgba(219,100,54,0.06)' }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  {dir === 'prev'
                    ? <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    : <path d="M6 3L11 8L6 13"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  }
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div aria-hidden style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '40%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(219,100,54,0.25), transparent)',
        zIndex: 2,
      }} />
    </section>
  )
}
