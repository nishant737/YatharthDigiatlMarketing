import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// ─── Styles ───────────────────────────────────────────────────────────────────
const STORY_CSS = `
  .story-section { 
    position: relative;
    width: 100%;
    background: #0a0806;
  }
  .story-video-wrap {
    position: relative;
    overflow: hidden;
    background: #000;
    width: 100%;
    height: 100%;
    will-change: transform;
    transform-origin: 50% 50%;
  }
  .story-video-wrap video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .story-content {
    font-family: 'Inter', system-ui, sans-serif;
    color: #fff;
    max-width: 600px;
  }
  .story-tagline {
    font-size: clamp(1.5rem, 2.5vw, 2rem);
    font-weight: 300;
    letter-spacing: -0.01em;
    color: #E3735E;
    margin-bottom: 1.5rem;
    will-change: opacity, transform;
  }
  .story-headline {
    font-weight: 300;
    font-size: clamp(1.5rem, 2.5vw, 2rem);
    letter-spacing: -0.01em;
    line-height: 1.4;
    margin-bottom: 1.5rem;
    will-change: opacity, transform;
  }
  .story-body {
    font-weight: 300;
    font-size: clamp(1.5rem, 2.5vw, 2rem);
    line-height: 1.4;
    color: rgba(255,255,255,0.9);
    will-change: opacity, transform;
  }
`

// ─── Story Content Data (from reference) ──────────────────────────────────────
const STORY_DATA = {
  tagline: 'Yatharth began with belief.',
  para: "Grown through people, trust, and intent — from Mangaluru to conversations beyond borders. We've never chased noise. We've built presence. Every project shaped us, every challenge refined us. Still learning. Still building.",
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function StorySection() {
  const sectionRef = useRef(null)
  const videoContainerRef = useRef(null)
  const videoRef = useRef(null)
  const contentRef = useRef(null)
  const taglineRef = useRef(null)
  const paraRef    = useRef(null)
  
  useEffect(() => {
    const section = sectionRef.current
    const videoContainer = videoContainerRef.current
    const video = videoRef.current
    
    if (!section || !videoContainer || !video) return
    
    // Create scroll timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      }
    })
    
    // Start fullscreen — only transform properties (no width/height → no layout reflow)
    gsap.set(videoContainer, {
      scaleX: 1, scaleY: 1,
      x: 0, y: 0,
      borderRadius: '0px',
      transformOrigin: '50% 50%',
    })
    
    // Compress to left using scale+translate only — GPU composited, zero reflow
    tl.to(videoContainer, {
      scaleX: 0.42,
      scaleY: 0.55,
      x: '-24vw',
      borderRadius: '38px', // compensates for scaleX(0.42): 38×0.42≈16px visual radius
      ease: 'power2.out',
      duration: 0.6,
    }, 0)
    
    // Content reveal animation - staggered elements
    const tagline = taglineRef.current
    
    // Set initial hidden state
    const para = paraRef.current
    if (tagline) gsap.set(tagline, { opacity: 0, y: 12 })
    if (para)    gsap.set(para,    { opacity: 0, y: 20 })
    
    // Animate in with stagger
    if (tagline) {
      tl.to(tagline, { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out' }, 0.38)
    }
    if (para) {
      tl.to(para, { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' }, 0.44)
    }
    
    // Autoplay video immediately and loop continuously
    video.play().catch(() => {})
    
    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === section) st.kill()
      })
    }
  }, [])
  
  return (
    <>
      <style>{STORY_CSS}</style>
      <section
        id="story"
        ref={sectionRef}
        className="story-section"
        style={{ minHeight: '220vh' }}
      >
        <div style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}>
          {/* Video Container - GSAP animated, settles on left */}
          <div 
            ref={videoContainerRef}
            className="story-video-wrap"
            style={{
              width: '100vw',
              height: '100vh',
            }}
          >
            <video
              ref={videoRef}
              src="/asset/story.mp4"
              muted
              loop
              playsInline
              style={{
                filter: 'brightness(0.5)',
              }}
            />
          </div>
          
          {/* Content Container - Positioned on right with proper spacing */}
          <div 
            ref={contentRef}
            style={{
              position: 'absolute',
              right: '5vw',
              top: '52%',
              transform: 'translateY(-50%)',
              maxWidth: '520px',
              padding: '0 20px',
              zIndex: 10,
            }}
          >
            <div className="story-content">
              <div ref={taglineRef} className="story-tagline">{STORY_DATA.tagline}</div>
              <p ref={paraRef} className="story-body" style={{ marginTop: '0.6rem' }}>{STORY_DATA.para}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
