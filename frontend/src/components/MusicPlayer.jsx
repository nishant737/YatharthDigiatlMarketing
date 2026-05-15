import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import musicSrc from '../asset/flawed-mangoes---swimming-made-with-Voicemod.mp3'
import { useTheme } from '../ThemeContext'

const CSS = `
  @keyframes musicRipple {
    0%   { transform: scale(1);   opacity: 0.55; }
    100% { transform: scale(2.1); opacity: 0; }
  }
  @keyframes barBounce1 { 0%,100%{height:6px} 50%{height:14px} }
  @keyframes barBounce2 { 0%,100%{height:10px} 50%{height:5px}  }
  @keyframes barBounce3 { 0%,100%{height:7px} 50%{height:13px}  }
  .music-bar-1 { animation: barBounce1 0.7s ease-in-out infinite; }
  .music-bar-2 { animation: barBounce2 0.7s ease-in-out infinite 0.15s; }
  .music-bar-3 { animation: barBounce3 0.7s ease-in-out infinite 0.3s; }
`

function PlayingBars({ color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '16px' }}>
      {['music-bar-1', 'music-bar-2', 'music-bar-3'].map(cls => (
        <div
          key={cls}
          className={cls}
          style={{
            width: '3px',
            borderRadius: '2px',
            background: color,
            alignSelf: 'center',
          }}
        />
      ))}
    </div>
  )
}

function MusicNoteIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

export default function MusicPlayer({ loaded }) {
  const [playing, setPlaying] = useState(false)
  const [visible, setVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480)
  const audioRef = useRef(null)
  const { dark, toggle: toggleTheme } = useTheme()

  useEffect(() => {
    if (!loaded) return
    const t = setTimeout(() => setVisible(true), 1200)
    return () => clearTimeout(t)
  }, [loaded])

  useEffect(() => {
    const audio = new Audio(musicSrc)
    audio.loop = true
    audio.volume = 0.35
    audioRef.current = audio
    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 480)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().catch(() => {})
      setPlaying(true)
    }
  }

  if (!visible) return null

  const accent       = dark ? '#DB6436'                  : '#0A5675'
  const accentBorder = dark ? 'rgba(219,100,54,0.6)'     : 'rgba(10,86,117,0.6)'
  const accentBg     = dark ? 'rgba(219,100,54,0.12)'    : 'rgba(10,86,117,0.12)'
  const accentGlow   = dark ? 'rgba(219,100,54,0.3)'     : 'rgba(10,86,117,0.3)'
  const accentRipple = dark ? 'rgba(219,100,54,0.5)'     : 'rgba(10,86,117,0.5)'
  const btnBorder    = dark ? 'rgba(245,240,235,0.12)'   : 'rgba(10,86,117,0.35)'
  const btnBg        = dark ? 'rgba(15,10,6,0.82)'       : 'rgba(240,235,228,0.92)'
  const btnColor     = dark ? 'rgba(245,240,235,0.6)'    : 'rgba(10,86,117,0.7)'
  const btnSize = isMobile ? '46px' : '48px'
  const sharedBtnStyle = {
    width: btnSize,
    height: btnSize,
    borderRadius: '50%',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
    transition: 'border-color 0.3s, background 0.3s, box-shadow 0.3s, color 0.3s',
  }

  return (
    <>
      <style>{CSS}</style>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ type: 'spring', stiffness: 360, damping: 24 }}
          style={{
            position: 'fixed',
            bottom: isMobile ? '74px' : '96px',
            right: isMobile ? '12px' : '24px',
            zIndex: 99997,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: isMobile ? '6px' : '8px',
          }}
        >
          {/* Tooltip label */}
          <AnimatePresence>
            {!playing && !isMobile && (
              <motion.span
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.25 }}
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '0.64rem',
                  fontWeight: 500,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  pointerEvents: 'none',
                  userSelect: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                Ambient
              </motion.span>
            )}
          </AnimatePresence>

          {/* Theme toggle button */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{
              ...sharedBtnStyle,
              border: `1.5px solid ${btnBorder}`,
              background: btnBg,
              color: btnColor,
              boxShadow: '0 4px 16px rgba(0,0,0,0.35)',
            }}
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </motion.button>

          {/* Music button wrapper — ripple rings behind it */}
          <div style={{
            position: 'relative',
            width: btnSize,
            height: btnSize,
          }}>

            {/* Ripple rings — only when playing */}
            {playing && [0, 0.4, 0.8].map((delay, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  border: `1.5px solid ${accentRipple}`,
                  animation: `musicRipple 1.6s ease-out ${delay}s infinite`,
                  pointerEvents: 'none',
                }}
              />
            ))}

            {/* Main music button */}
            <motion.button
              onClick={toggle}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={playing ? 'Pause music' : 'Play ambient music'}
              style={{
                ...sharedBtnStyle,
                position: 'relative',
                border: playing
                  ? `1.5px solid ${accentBorder}`
                  : `1.5px solid ${btnBorder}`,
                background: playing ? accentBg : btnBg,
                color: playing ? accent : btnColor,
                boxShadow: playing
                  ? `0 0 18px ${accentGlow}, 0 4px 16px rgba(0,0,0,0.5)`
                  : '0 4px 16px rgba(0,0,0,0.35)',
                zIndex: 1,
              }}
            >
              {playing ? <PlayingBars color={accent} /> : <MusicNoteIcon />}
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  )
}
