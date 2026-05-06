import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function useIsMobile() {
  const [mobile, setMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)
  useEffect(() => {
    const update = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [])
  return mobile
}

// Split into individual word spans for per-word animation
const TEXT = "Ready to experience Yatharth? Let's turn your vision into something the world remembers."

const ACCENT_WORD = 'Yatharth?'

export default function ClosingSection() {
  const sectionRef = useRef(null)
  const bgRef      = useRef(null)
  const wordsRef   = useRef(null)
  const isMobile   = useIsMobile()

  useEffect(() => {
    if (isMobile) return

    const section = sectionRef.current
    const bg      = bgRef.current
    const wrap    = wordsRef.current
    if (!section || !bg || !wrap) return

    const wordEls = wrap.querySelectorAll('.closing-word')
    const count   = wordEls.length

    // Initial state — each word offset to the right + invisible
    wordEls.forEach((el, i) => {
      gsap.set(el, { opacity: 0, x: 80 + i * 10 })
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.0,
      },
    })

    // Background dark → white
    tl.fromTo(bg,
      { backgroundColor: '#0a0806' },
      { backgroundColor: '#ffffff', duration: 0.3, ease: 'power1.inOut' },
      0
    )

    // Each word floats in from right → center, staggered
    const wordDuration = 0.06
    const totalWordTime = 0.5
    const stagger = count > 1 ? (totalWordTime - wordDuration) / (count - 1) : 0

    wordEls.forEach((el, i) => {
      tl.to(el, {
        opacity: 1, x: 0,
        duration: wordDuration,
        ease: 'power3.out',
      }, 0.12 + i * stagger)
    })

    // Hold visible, then exit upward
    tl.to(Array.from(wordEls), {
      opacity: 0, y: -50,
      duration: 0.2,
      ease: 'power2.in',
      stagger: 0.008,
    }, 0.78)

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === section) st.kill()
      })
    }
  }, [isMobile])

  const words = TEXT.split(' ')

  // ── Mobile: hidden entirely ─────────────────────────────────────────────────
  if (isMobile) return null

  // ── Desktop ─────────────────────────────────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      style={{ position: 'relative', height: '380vh' }}
    >
      <div
        ref={bgRef}
        style={{
          position: 'sticky', top: 0, height: '100vh',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: '#0a0806',
        }}
      >
        <p
          ref={wordsRef}
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 600,
            fontSize: 'clamp(2rem, 4.5vw, 4rem)',
            letterSpacing: '-0.04em',
            lineHeight: 1.25,
            color: '#0a0806',
            textAlign: 'center',
            margin: 0,
            maxWidth: '900px',
            padding: '0 clamp(24px, 4vw, 64px)',
          }}
        >
          {words.map((w, i) => (
            <span
              key={i}
              className="closing-word"
              style={{
                display: 'inline-block',
                marginRight: '0.3em',
                color: w === ACCENT_WORD ? '#E3735E' : undefined,
                willChange: 'transform, opacity',
              }}
            >
              {w}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
