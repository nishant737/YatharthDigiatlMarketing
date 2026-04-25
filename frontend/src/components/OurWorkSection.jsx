import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

function useIsMobile() {
  const [mobile, setMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)
  useEffect(() => {
    const update = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [])
  return mobile
}

const PROJECTS = [
  {
    title: 'Transforming the Digital Landscape for Bolpu',
    desc: 'Complete brand identity and launch campaign for a sustainable fashion label. We crafted their visual identity, messaging, and go-to-market strategy from ground zero.',
    video: '/asset/story.mp4',
  },
  {
    title: 'ETA — Multi-Channel Digital Campaign',
    desc: 'Multi-channel digital campaign driving 300% increase in engagement. Through targeted ads, SEO optimization, and compelling content, we transformed their digital presence.',
    video: '/asset/story.mp4',
  },
  {
    title: 'Net Zero Summit — Event Branding & Promotion',
    desc: 'Organized and marketed a sustainability summit with 500+ attendees. From event branding to social promotion, we created a movement around climate action.',
    video: '/asset/story.mp4',
  },
  {
    title: 'Kadala Parbha — Social Media Growth',
    desc: 'Social media strategy that grew followers from 1K to 25K in 6 months. We developed a content ecosystem that turned casual scrollers into loyal community members.',
    video: '/asset/story.mp4',
  },
  {
    title: 'MIT Kundapura — Content & Storytelling',
    desc: 'Video series and content strategy for educational institution awareness. Our storytelling approach made complex educational content engaging and shareable.',
    video: '/asset/story.mp4',
  },
]

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-10% 0px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'pointer' }}
    >
      {/* Video / Screenshot area */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16 / 10',
        borderRadius: '14px',
        overflow: 'hidden',
        background: '#111',
        border: '1px solid rgba(245,240,235,0.08)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
      }}>
        <video
          autoPlay muted loop playsInline
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transition: 'transform 0.6s ease',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
          }}
        >
          <source src={project.video} type="video/mp4" />
        </video>

        {/* Hover overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: hovered
            ? 'rgba(0,0,0,0.5)'
            : 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.3) 100%)',
          transition: 'background 0.4s ease',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          {/* View button on hover */}
          <motion.div
            initial={false}
            animate={{
              opacity: hovered ? 1 : 0,
              scale: hovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: '72px', height: '72px', borderRadius: '50%',
              background: 'rgba(219,100,54,0.9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 30px rgba(219,100,54,0.4)',
            }}
          >
            <span style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 500,
              fontSize: '0.78rem',
              color: '#fff',
              letterSpacing: '0.02em',
            }}>View</span>
          </motion.div>
        </div>

        {/* Expand icon — bottom right */}
        <div style={{
          position: 'absolute', bottom: '12px', right: '12px',
          width: '28px', height: '28px', borderRadius: '8px',
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1px solid rgba(245,240,235,0.1)',
          opacity: hovered ? 0 : 0.7,
          transition: 'opacity 0.3s ease',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(245,240,235,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
        </div>
      </div>

      {/* Title + description reveal */}
      <div style={{ padding: '20px 4px 0' }}>
        <h3 style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontWeight: 400,
          fontSize: 'clamp(1.15rem, 2vw, 1.45rem)',
          letterSpacing: '-0.02em',
          color: '#f5f0eb',
          margin: '0 0 8px',
          lineHeight: 1.3,
          transition: 'color 0.3s ease',
          ...(hovered ? { color: '#DB6436' } : {}),
        }}>
          {project.title}
        </h3>

        {/* Description — visible on hover */}
        <motion.div
          initial={false}
          animate={{
            height: hovered ? 'auto' : 0,
            opacity: hovered ? 1 : 0,
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: 'hidden' }}
        >
          <p style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(0.82rem, 1.1vw, 0.92rem)',
            lineHeight: 1.7,
            color: 'rgba(245,240,235,0.45)',
            margin: '0 0 12px',
            maxWidth: '480px',
          }}>
            {project.desc}
          </p>
        </motion.div>

      </div>
    </motion.div>
  )
}

export default function OurWorkSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-5% 0px' })
  const isMobile = useIsMobile()

  return (
    <section
      id="our-work"
      ref={ref}
      style={{
        background: '#060503',
        position: 'relative',
        zIndex: 20,
      }}
    >
      {/* Background image */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'url(src/asset/mywork.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.1,
        zIndex: 0,
      }} />

      {/* Background glow */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 20% 30%, rgba(219,100,54,0.03) 0%, transparent 55%)',
        zIndex: 0,
      }} />

      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        maxWidth: '1240px',
        margin: '0 auto',
        padding: isMobile
          ? 'clamp(60px, 10vh, 100px) 24px clamp(60px, 10vh, 100px)'
          : 'clamp(100px, 14vh, 160px) clamp(32px, 4vw, 64px)',
        gap: isMobile ? '48px' : 'clamp(48px, 6vw, 100px)',
        position: 'relative',
      }}>
        {/* ── LEFT: Sticky heading ── */}
        <div style={{
          flex: isMobile ? 'none' : '0 0 auto',
          width: isMobile ? '100%' : 'clamp(260px, 28vw, 340px)',
          ...(isMobile ? {} : {
            position: 'sticky',
            top: 'clamp(120px, 18vh, 200px)',
            alignSelf: 'flex-start',
          }),
        }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(2.4rem, 5.5vw, 4rem)',
              letterSpacing: '-0.04em',
              color: '#f5f0eb',
              lineHeight: 1.05,
              margin: '0 0 20px',
            }}
          >
            Success{isMobile ? ' ' : <br />}Stories
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)',
              color: 'rgba(245,240,235,0.4)',
              lineHeight: 1.7,
              margin: 0,
              maxWidth: '300px',
            }}
          >
            See how we have helped businesses like yours
          </motion.p>
        </div>

        {/* ── RIGHT: Scrollable project cards ── */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(48px, 7vh, 72px)',
        }}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
