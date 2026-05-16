import { useState, useRef, useEffect } from 'react'
import { useTheme } from '../ThemeContext'

const REEL_SRC = '/asset/reel.mp4'
// Open: smooth ease-out spring. Close: snappier compression
const OPEN_TRANSITION  = 'opacity 0.42s cubic-bezier(0.22,1,0.36,1), transform 0.42s cubic-bezier(0.22,1,0.36,1)'
const CLOSE_TRANSITION = 'opacity 0.32s cubic-bezier(0.55,0,1,0.45), transform 0.32s cubic-bezier(0.55,0,1,0.45)'

export default function ReelWidget({ loaded }) {
  const { dark } = useTheme()
  const [open, setOpen]       = useState(false)
  const [muted, setMuted]     = useState(false)
  const [playing, setPlaying] = useState(true)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  const [visible, setVisible] = useState(true) // controls thumbnail show/hide
  const videoRef = useRef(null)
  const thumbRef = useRef(null)
  const closeTimer = useRef(null)

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', h, { passive: true })
    return () => window.removeEventListener('resize', h)
  }, [])

  // Sync muted/playing with the video element
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = muted
    if (playing) v.play().catch(() => {})
    else v.pause()
  }, [muted, playing])

  // When modal opens/closes: manage video + thumbnail visibility
  useEffect(() => {
    clearTimeout(closeTimer.current)
    if (open) {
      setVisible(false)
      setPlaying(true)
      setTimeout(() => videoRef.current?.play().catch(() => {}), 50)
    } else {
      // Stop video immediately on close
      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      }
      setPlaying(false)
      // Show thumbnail after compression animation finishes
      closeTimer.current = setTimeout(() => setVisible(true), 340)
    }
    return () => clearTimeout(closeTimer.current)
  }, [open])

  if (isMobile || !loaded) return null

  const accent = dark ? '#E3735E' : '#0A5675'

  return (
    <>
      {/* ── Backdrop — always in DOM, transitions in/out ─── */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: open ? 'blur(4px)' : 'blur(0px)',
          WebkitBackdropFilter: open ? 'blur(4px)' : 'blur(0px)',
          zIndex: 998,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: open ? 'opacity 0.42s cubic-bezier(0.22,1,0.36,1)' : 'opacity 0.32s cubic-bezier(0.55,0,1,0.45)',
        }}
      />

      {/* ── Reel modal — always in DOM, transitions in/out ─── */}
      <div
        style={{
          position: 'fixed',
          bottom: '40px',
          left: '24px',
          zIndex: 999,
          width: '330px',
          height: '586px',
          borderRadius: open ? '22px' : '14px',
          overflow: 'hidden',
          background: '#000',
          boxShadow: '0 24px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.08)',
          opacity: open ? 1 : 0,
          // Compress toward bottom-left corner (where thumbnail lives)
          transform: open
            ? 'scale(1) translate(0px, 0px)'
            : 'scale(0.08) translate(-60%, 60%)',
          transformOrigin: 'bottom left',
          pointerEvents: open ? 'auto' : 'none',
          transition: open ? OPEN_TRANSITION : CLOSE_TRANSITION,
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

        {/* Bottom-to-top gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.08) 52%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* Close button */}
        <button
          onClick={() => setOpen(false)}
          style={{
            position: 'absolute', top: '14px', right: '14px',
            width: 32, height: 32, borderRadius: '50%',
            background: 'rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.22)',
            color: '#fff', fontSize: '13px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', outline: 'none',
          }}
        >✕</button>

        {/* Right controls */}
        <div style={{
          position: 'absolute', right: '13px', bottom: '138px',
          display: 'flex', flexDirection: 'column', gap: '10px',
        }}>
          <button
            onClick={() => setMuted(m => !m)}
            style={ctrlBtn}
          >
            {muted ? <MuteIcon /> : <UnmuteIcon />}
          </button>
          <button
            onClick={() => setPlaying(p => !p)}
            style={ctrlBtn}
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
        </div>

        {/* Bottom CTA */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '22px 20px 24px',
        }}>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 600,
            fontSize: '1.05rem', color: '#fff', margin: '0 0 4px',
          }}>Hello 👋</p>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 300,
            fontSize: '0.8rem', color: 'rgba(255,255,255,0.72)',
            margin: '0 0 14px', lineHeight: 1.55,
          }}>
            Need a team that delivers?<br />Reach out to us.
          </p>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            style={{
              display: 'block', textAlign: 'center',
              background: accent, color: '#fff',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500, fontSize: '0.85rem',
              textDecoration: 'none',
              padding: '12px 0', borderRadius: '100px',
              letterSpacing: '0.02em',
            }}
          >
            Contact Us Now →
          </a>
        </div>
      </div>

      {/* ── Thumbnail — always in DOM, fades in/out ────────── */}
      <div
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed',
          bottom: '96px',
          left: '24px',
          zIndex: 50,
          width: '108px',
          height: '192px',
          borderRadius: '16px',
          overflow: 'hidden',
          cursor: 'pointer',
          border: `2px solid ${dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.13)'}`,
          boxShadow: '0 8px 32px rgba(0,0,0,0.38)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1) translateY(0px)' : 'scale(0.82) translateY(12px)',
          pointerEvents: visible ? 'auto' : 'none',
          transition: visible ? OPEN_TRANSITION : CLOSE_TRANSITION,
        }}
      >
        {/* Silent looping preview */}
        <video
          ref={thumbRef}
          src={REEL_SRC}
          autoPlay
          loop
          muted
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {/* Play badge */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.58) 0%, transparent 60%)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          paddingBottom: '9px',
        }}>
          <div style={{
            width: 24, height: 24, borderRadius: '50%',
            background: 'rgba(255,255,255,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="8" height="10" viewBox="0 0 8 10" fill="none">
              <path d="M1.5 1.5L6.5 5L1.5 8.5V1.5Z" fill="#111" />
            </svg>
          </div>
        </div>
        {/* Pulse ring */}
        <PulseRing accent={accent} />
      </div>
    </>
  )
}

// ── Shared button style ──────────────────────────────────────────────────────
const ctrlBtn = {
  width: 36, height: 36, borderRadius: '50%',
  background: 'rgba(0,0,0,0.48)',
  border: '1px solid rgba(255,255,255,0.2)',
  color: '#fff',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', outline: 'none',
}

// ── Pulsing ring (CSS animation, no framer-motion) ───────────────────────────
function PulseRing({ accent }) {
  return (
    <>
      <style>{`
        @keyframes reelPulse {
          0%   { transform: scale(1);    opacity: 0.65; }
          60%  { transform: scale(1.22); opacity: 0;    }
          100% { transform: scale(1.22); opacity: 0;    }
        }
        .reel-pulse { animation: reelPulse 2.2s ease-in-out infinite; }
      `}</style>
      <div
        className="reel-pulse"
        style={{
          position: 'absolute', inset: -5,
          borderRadius: '20px',
          border: `2px solid ${accent}`,
          pointerEvents: 'none',
        }}
      />
    </>
  )
}

// ── Icons ────────────────────────────────────────────────────────────────────
function MuteIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
      <path d="M11 5L6 9H2v6h4l5 4V5z"/>
      <line x1="23" y1="9" x2="17" y2="15"/>
      <line x1="17" y1="9" x2="23" y2="15"/>
    </svg>
  )
}
function UnmuteIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
      <path d="M11 5L6 9H2v6h4l5 4V5z"/>
      <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/>
    </svg>
  )
}
function PauseIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="#fff">
      <rect x="6" y="4" width="4" height="16"/>
      <rect x="14" y="4" width="4" height="16"/>
    </svg>
  )
}
function PlayIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="#fff">
      <path d="M5 3l14 9-14 9V3z"/>
    </svg>
  )
}
