import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../ThemeContext'

// Place reel.mp4 in /public/asset/reel.mp4
const REEL_SRC = '/asset/reel.mp4'

export default function ReelWidget({ loaded }) {
  const { dark } = useTheme()
  const [open, setOpen]       = useState(false)
  const [muted, setMuted]     = useState(false)
  const [playing, setPlaying] = useState(true)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  const videoRef   = useRef(null)
  const thumbRef   = useRef(null)

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', h, { passive: true })
    return () => window.removeEventListener('resize', h)
  }, [])

  // Sync muted/playing state with video element
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = muted
    if (playing) v.play().catch(() => {})
    else v.pause()
  }, [muted, playing, open])

  // Auto-play when modal opens
  useEffect(() => {
    if (open) {
      setPlaying(true)
      setTimeout(() => {
        if (videoRef.current) videoRef.current.play().catch(() => {})
      }, 350)
    }
  }, [open])

  // Desktop only
  if (isMobile || !loaded) return null

  const accent = dark ? '#E3735E' : '#0A5675'
  const accentBg = dark ? 'rgba(227,115,94,0.15)' : 'rgba(10,86,117,0.15)'

  return (
    <>
      {/* ── Thumbnail (collapsed) ─────────────────────────────── */}
      <AnimatePresence>
        {!open && (
          <motion.div
            key="thumb"
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.88 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            onClick={() => setOpen(true)}
            style={{
              position: 'fixed',
              bottom: '96px',
              left: '24px',
              zIndex: 50,
              width: '72px',
              height: '116px',
              borderRadius: '14px',
              overflow: 'hidden',
              cursor: 'pointer',
              border: `2px solid ${dark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.12)'}`,
              boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
            }}
          >
            {/* Looping silent preview */}
            <video
              ref={thumbRef}
              src={REEL_SRC}
              autoPlay
              loop
              muted
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            {/* Play badge overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)',
              display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
              paddingBottom: '8px',
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: '50%',
                background: 'rgba(255,255,255,0.92)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="8" height="10" viewBox="0 0 8 10" fill="none">
                  <path d="M1.5 1.5L6.5 5L1.5 8.5V1.5Z" fill="#111" />
                </svg>
              </div>
            </div>
            {/* Pulse ring */}
            <motion.div
              animate={{ scale: [1, 1.18, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', inset: -4,
                borderRadius: '18px',
                border: `2px solid ${accent}`,
                pointerEvents: 'none',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Full Reel Modal ───────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              style={{
                position: 'fixed', inset: 0,
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
                zIndex: 998,
              }}
            />

            {/* Reel player */}
            <motion.div
              key="reel"
              initial={{ opacity: 0, scale: 0.88, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 24 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'fixed',
                bottom: '40px',
                left: '24px',
                zIndex: 999,
                width: '300px',
                height: '532px',
                borderRadius: '20px',
                overflow: 'hidden',
                background: '#000',
                boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)',
              }}
            >
              {/* Video */}
              <video
                ref={videoRef}
                src={REEL_SRC}
                loop
                playsInline
                muted={muted}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />

              {/* Gradient overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
                pointerEvents: 'none',
              }} />

              {/* Top bar: close */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                padding: '14px 14px 0',
                display: 'flex', justifyContent: 'flex-end',
              }}>
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    width: 30, height: 30, borderRadius: '50%',
                    background: 'rgba(0,0,0,0.45)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#fff', fontSize: '14px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', outline: 'none',
                  }}
                >✕</button>
              </div>

              {/* Right controls: mute + pause */}
              <div style={{
                position: 'absolute', right: '12px', bottom: '130px',
                display: 'flex', flexDirection: 'column', gap: '10px',
              }}>
                <button
                  onClick={() => setMuted(m => !m)}
                  style={{
                    width: 34, height: 34, borderRadius: '50%',
                    background: 'rgba(0,0,0,0.45)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#fff', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', cursor: 'pointer', outline: 'none',
                  }}
                >
                  {muted ? (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                      <path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
                    </svg>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                      <path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/>
                    </svg>
                  )}
                </button>
                <button
                  onClick={() => setPlaying(p => !p)}
                  style={{
                    width: 34, height: 34, borderRadius: '50%',
                    background: 'rgba(0,0,0,0.45)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#fff', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', cursor: 'pointer', outline: 'none',
                  }}
                >
                  {playing ? (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="#fff"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                  ) : (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="#fff"><path d="M5 3l14 9-14 9V3z"/></svg>
                  )}
                </button>
              </div>

              {/* Bottom CTA */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '20px 18px 22px',
                display: 'flex', flexDirection: 'column', gap: '6px',
              }}>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600, fontSize: '1rem',
                  color: '#fff', margin: 0, lineHeight: 1.3,
                }}>Hello 👋</p>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300, fontSize: '0.78rem',
                  color: 'rgba(255,255,255,0.75)', margin: '0 0 10px', lineHeight: 1.5,
                }}>Need a team that delivers?<br />Reach out to us.</p>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  style={{
                    display: 'block', textAlign: 'center',
                    background: accent,
                    color: '#fff',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500, fontSize: '0.82rem',
                    textDecoration: 'none',
                    padding: '11px 0',
                    borderRadius: '100px',
                    letterSpacing: '0.02em',
                  }}
                >
                  Contact Us Now →
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
