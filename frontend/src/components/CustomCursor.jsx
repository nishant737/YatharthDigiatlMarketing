import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { useTheme } from '../ThemeContext'

export default function CustomCursor() {
  const { dark } = useTheme()
  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  // Dot — snappy, near-instant
  const dotX = useSpring(mouseX, { stiffness: 2000, damping: 80, mass: 0.05 })
  const dotY = useSpring(mouseY, { stiffness: 2000, damping: 80, mass: 0.05 })

  // Ring — smooth lag
  const ringX = useSpring(mouseX, { stiffness: 180, damping: 28, mass: 0.6 })
  const ringY = useSpring(mouseY, { stiffness: 180, damping: 28, mass: 0.6 })

  const [state, setState] = useState('default') // 'default' | 'hover' | 'click'
  const [visible, setVisible] = useState(false)
  const clickTimeout = useRef(null)

  const isTouch = typeof window !== 'undefined' &&
    (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window)

  useEffect(() => {
    document.documentElement.style.cursor = 'none'

    const onMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    const onDown = () => {
      setState('click')
      clearTimeout(clickTimeout.current)
      clickTimeout.current = setTimeout(() => setState('default'), 180)
    }

    const onEnterLink = () => setState('hover')
    const onLeaveLink = () => setState('default')

    const attachHover = () => {
      document.querySelectorAll('a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]')
        .forEach(el => {
          el.addEventListener('mouseenter', onEnterLink)
          el.addEventListener('mouseleave', onLeaveLink)
        })
    }

    const observer = new MutationObserver(attachHover)
    observer.observe(document.body, { childList: true, subtree: true })
    attachHover()

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      document.documentElement.style.cursor = ''
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      observer.disconnect()
      clearTimeout(clickTimeout.current)
    }
  }, []) // eslint-disable-line

  if (isTouch) return null

  const isHover = state === 'hover'
  const isClick = state === 'click'
  const cursorColor = dark ? 'rgba(219,100,54,1)' : 'rgba(10,86,117,1)'
  const cursorBorder = dark ? 'rgba(219,100,54,0.85)' : 'rgba(10,86,117,0.85)'
  const cursorGlow   = dark ? 'rgba(219,100,54,0.2)' : 'rgba(10,86,117,0.2)'
  const cursorGlow2  = dark ? 'rgba(219,100,54,0.6)' : 'rgba(10,86,117,0.6)'
  const cursorRipple = dark ? 'rgba(219,100,54,0.75)' : 'rgba(10,86,117,0.75)'

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* ── Trailing ring ── */}
          <motion.div
            key="ring"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            style={{
              position: 'fixed',
              top: 0, left: 0,
              x: ringX, y: ringY,
              translateX: '-50%',
              translateY: '-50%',
              pointerEvents: 'none',
              zIndex: 99999,
            }}
          >
            <motion.div
              animate={{
                width:  isHover ? 48 : isClick ? 20 : 32,
                height: isHover ? 48 : isClick ? 20 : 32,
                opacity: isClick ? 0.3 : isHover ? 0.9 : 0.6,
                rotate: isHover ? 45 : 0,
                borderRadius: isHover ? '30%' : '50%',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 26 }}
              style={{
                border: `1.5px solid ${cursorBorder}`,
                translateX: '-50%',
                translateY: '-50%',
                boxShadow: `0 0 10px ${cursorGlow}`,
              }}
            />
          </motion.div>

          {/* ── Core dot ── */}
          <motion.div
            key="dot"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            style={{
              position: 'fixed',
              top: 0, left: 0,
              x: dotX, y: dotY,
              translateX: '-50%',
              translateY: '-50%',
              pointerEvents: 'none',
              zIndex: 100000,
            }}
          >
            <motion.div
              animate={{
                width:  isHover ? 7 : isClick ? 12 : 5,
                height: isHover ? 7 : isClick ? 12 : 5,
                opacity: isHover ? 0.7 : 1,
              }}
              transition={{ type: 'spring', stiffness: 600, damping: 30 }}
              style={{
                borderRadius: '50%',
                background: cursorColor,
                translateX: '-50%',
                translateY: '-50%',
                boxShadow: `0 0 8px ${cursorGlow2}`,
              }}
            />

            {/* Click ripple */}
            <AnimatePresence>
              {isClick && (
                <motion.div
                  key="ripple"
                  initial={{ width: 6, height: 6, opacity: 0.9, translateX: '-50%', translateY: '-50%' }}
                  animate={{ width: 50, height: 50, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: 'absolute',
                    top: 0, left: 0,
                    borderRadius: '50%',
                    border: `1.5px solid ${cursorRipple}`,
                    translateX: '-50%',
                    translateY: '-50%',
                    pointerEvents: 'none',
                  }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
