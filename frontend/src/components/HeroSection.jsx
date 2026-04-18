import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { motion, AnimatePresence } from 'framer-motion'
import bgImage from '../asset/bg.jpeg'

// ─── Typewriter frames ────────────────────────────────────────────────────────
const FRAMES = [
  { id: 0, lines: ['Everything begins', 'with an idea.']                      },
  { id: 1, lines: ['Some stay ideas.', 'Some become presence.']               },
  { id: 2, lines: ['We work on the ones', 'that matter.']                     },
  { id: 3, lines: ['In a digital world,', 'how you are seen is everything.']  },
  { id: 4, lines: ['So we shape that.', 'Carefully.']                         },
  { id: 5, lines: ['Strategy. Story. Design.']                                },
  { id: 6, lines: ['This is Yatharth.']                                       },
]

const SCROLL_PER_FRAME = 400

// ─── Typewriter hook ──────────────────────────────────────────────────────────
function useTypewriter(text, charDelay = 38) {
  const [count, setCount] = useState(0)
  const [done,  setDone]  = useState(false)
  const timer = useRef(null)

  useEffect(() => {
    setCount(0)
    setDone(false)
    let i = 0, cancelled = false

    const tick = () => {
      if (cancelled) return
      if (i >= text.length) { setDone(true); return }
      i++
      setCount(i)
      const ch    = text[i - 1]
      const delay = /[.!?]/.test(ch) ? charDelay * 5
        : ch === ',' ? charDelay * 2.5
        : ch === ' ' ? charDelay * 0.4
        : charDelay + Math.random() * 14
      timer.current = setTimeout(tick, delay)
    }
    timer.current = setTimeout(tick, 60)
    return () => { cancelled = true; clearTimeout(timer.current) }
  }, [text]) // eslint-disable-line

  return { count, done }
}

// ─── Cursor ───────────────────────────────────────────────────────────────────
function TypeCursor() {
  return (
    <motion.span
      aria-hidden
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.55, repeat: Infinity, repeatType: 'reverse', ease: 'steps(1)' }}
      style={{
        display: 'inline-block', width: '2px', height: '0.78em',
        background: '#d49030', marginLeft: '3px', verticalAlign: 'middle',
        borderRadius: '1px', boxShadow: '0 0 8px rgba(212,144,48,0.7)',
      }}
    />
  )
}

// ─── Story frame ──────────────────────────────────────────────────────────────
function StoryFrame({ frame }) {
  const fullText  = frame.lines.join('\n')
  const { count, done } = useTypewriter(fullText)
  const typed     = fullText.slice(0, count)
  const typedLines = typed.split('\n')

  return (
    <motion.div
      key={frame.id}
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '0 clamp(20px, 8vw, 120px)',
        gap: 'clamp(4px, 1vw, 10px)',
      }}
    >
      {frame.lines.map((fullLine, li) => {
        const typedLine        = typedLines[li] ?? ''
        const isLastTypingLine = !done && li === typedLines.length - 1
        return (
          <p key={li} style={{
            margin: 0,
            fontFamily: "Georgia, 'Times New Roman', Times, serif",
            fontWeight: 400,
            fontSize: 'clamp(1.8rem, 5vw, 5rem)',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            textAlign: 'center',
            color: '#f0e6d0',
            userSelect: 'none',
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            maxWidth: '820px',
            width: '100%',
            minHeight: '1.2em',
          }}>
            {typedLine}
            {isLastTypingLine && <TypeCursor />}
            {typedLine === '' && (
              <span aria-hidden style={{ visibility: 'hidden' }}>{fullLine}</span>
            )}
          </p>
        )
      })}

      {/* Accent line */}
      <motion.div
        animate={{ scaleX: done ? 1 : 0, opacity: done ? 0.5 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          marginTop: 'clamp(8px, 1.5vw, 16px)',
          height: '1px', width: 'clamp(32px, 6vw, 64px)',
          background: 'linear-gradient(90deg, transparent, #d49030, transparent)',
          transformOrigin: 'center',
        }}
      />
    </motion.div>
  )
}

// ─── Three.js scene builder ───────────────────────────────────────────────────
const NODE_COUNT   = 38
const CONNECT_DIST = 5.5
const SPREAD       = { x: 18, y: 11, z: 6 }
const PULSE_NODES  = [2, 8, 15, 24, 33]

function buildScene(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.toneMapping         = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.2
  renderer.setClearColor(0x000000, 0)

  const scene = new THREE.Scene()
  scene.background = null
  scene.fog        = new THREE.FogExp2('#0d0a05', 0.055)

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.set(0, 0, 14)

  // Lights
  scene.add(new THREE.AmbientLight('#ff9944', 0.55))
  const keyLight = new THREE.DirectionalLight('#ffaa44', 1.4)
  keyLight.position.set(6, 8, 4); scene.add(keyLight)
  const fillLight = new THREE.DirectionalLight('#ff7722', 0.6)
  fillLight.position.set(-5, -4, 3); scene.add(fillLight)
  const rimLight = new THREE.DirectionalLight('#ffeebb', 0.45)
  rimLight.position.set(0, 0, -8); scene.add(rimLight)
  const orb1 = new THREE.PointLight('#ffcc55', 2.2, 18)
  const orb2 = new THREE.PointLight('#ff8833', 1.8, 18)
  scene.add(orb1, orb2)

  // Network group
  const group = new THREE.Group()
  scene.add(group)

  const positions = Array.from({ length: NODE_COUNT }, () => new THREE.Vector3(
    (Math.random() - 0.5) * SPREAD.x,
    (Math.random() - 0.5) * SPREAD.y,
    (Math.random() - 0.5) * SPREAD.z,
  ))

  const nodeMat = new THREE.MeshStandardMaterial({
    color: '#d49030', metalness: 0.8, roughness: 0.2,
    emissive: '#3a1a00', emissiveIntensity: 0.25,
  })

  const nodeMeshes = positions.map((pos) => {
    const r    = 0.12 + Math.random() * 0.20
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(r, 18, 12), nodeMat.clone())
    mesh.position.copy(pos)
    group.add(mesh)
    return mesh
  })

  // Edges
  const edgeVerts = []
  for (let i = 0; i < NODE_COUNT; i++)
    for (let j = i + 1; j < NODE_COUNT; j++)
      if (positions[i].distanceTo(positions[j]) < CONNECT_DIST) {
        edgeVerts.push(positions[i].x, positions[i].y, positions[i].z)
        edgeVerts.push(positions[j].x, positions[j].y, positions[j].z)
      }
  const edgeGeo = new THREE.BufferGeometry()
  edgeGeo.setAttribute('position', new THREE.Float32BufferAttribute(edgeVerts, 3))
  group.add(new THREE.LineSegments(edgeGeo, new THREE.LineBasicMaterial({
    color: '#cc8833', transparent: true, opacity: 0.35,
  })))

  // Pulse rings
  const rings = []
  PULSE_NODES.forEach(ni => {
    const mat  = new THREE.MeshBasicMaterial({ color: '#ffdd88', transparent: true, opacity: 0.5, side: THREE.DoubleSide })
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.28, 0.38, 32), mat)
    ring.position.copy(positions[ni])
    group.add(ring)
    rings.push(ring)
    const tl = gsap.timeline({ repeat: -1, delay: Math.random() * 2 })
    tl.fromTo(ring.scale,   { x:1, y:1, z:1 }, { x:3, y:3, z:3, duration:2.2, ease:'power2.out' }, 0)
    tl.fromTo(mat,          { opacity:.5 },     { opacity:0, duration:2.2, ease:'power2.out' }, 0)
  })

  // Entry spring
  group.scale.setScalar(0)
  gsap.to(group.scale, { x:1, y:1, z:1, duration:2, ease:'elastic.out(1, 0.6)', delay:0.3 })

  return { renderer, scene, camera, group, nodeMeshes, orb1, orb2, rings }
}


// ─── Main hero ────────────────────────────────────────────────────────────────
export default function HeroSection() {
  const canvasRef  = useRef(null)
  const mouseRef   = useRef({ x: 0, y: 0 })
  const camTarget  = useRef({ x: 0, y: 0 })
  const rafRef     = useRef(null)

  const [frameIdx, setFrameIdx] = useState(0)
  const [ready,    setReady]    = useState(false)

  // ── Build Three.js scene ──
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const s = buildScene(canvas)
    setTimeout(() => setReady(true), 500)

    const onMouse = (e) => {
      mouseRef.current.x =  (e.clientX / window.innerWidth  - 0.5) * 2
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    const onResize = () => {
      s.camera.aspect = window.innerWidth / window.innerHeight
      s.camera.updateProjectionMatrix()
      s.renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('mousemove', onMouse, { passive: true })
    window.addEventListener('resize',    onResize)

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate)
      const t = performance.now() * 0.001
      const LF = 0.04
      camTarget.current.x += (mouseRef.current.x * 2.8 - camTarget.current.x) * LF
      camTarget.current.y += (mouseRef.current.y * 1.6 - camTarget.current.y) * LF
      s.camera.position.x = camTarget.current.x
      s.camera.position.y = camTarget.current.y
      s.camera.lookAt(0, 0, 0)
      s.group.rotation.y = t * 0.06 + mouseRef.current.x * 0.12
      s.nodeMeshes.forEach((m, i) => m.scale.setScalar(1 + Math.sin(t * 1.1 + i * 0.7) * 0.06))
      s.orb1.position.set(Math.sin(t * 0.55) * 9, Math.cos(t * 0.38) * 6,  5)
      s.orb2.position.set(Math.cos(t * 0.42) * 8, Math.sin(t * 0.60) * 5, -4)
      s.rings.forEach(r => r.lookAt(s.camera.position))
      s.renderer.render(s.scene, s.camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize',    onResize)
      gsap.killTweensOf(s.group.scale)
      s.renderer.dispose()
    }
  }, [])

  // ── Scroll → frame ──
  useEffect(() => {
    const onScroll = () => {
      const idx = Math.min(
        Math.max(Math.floor(window.scrollY / SCROLL_PER_FRAME), 0),
        FRAMES.length - 1
      )
      setFrameIdx(idx)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div id="home" style={{ height: `${FRAMES.length * SCROLL_PER_FRAME + window.innerHeight * 2}px`, position: 'relative', zIndex: 1, background: '#060503' }}>
      <style>{`
        @media (max-width: 768px) {
          .hero-subtitle { margin-bottom: 8px !important; }
        }
      `}</style>

      <div style={{
        position: 'sticky', top: 0,
        width: '100%', height: '100vh',
        overflow: 'hidden', background: '#0d0a05',
      }}>
        {/* Background image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.18,
        }} />

        {/* Three.js canvas */}
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
        />

        {/* Dark gradient so text is always readable */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(13,10,5,0.35) 0%, rgba(13,10,5,0.58) 100%)',
        }} />

        {/* Bottom fade to hide orange glow */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '18%', zIndex: 1, pointerEvents: 'none',
          background: 'linear-gradient(to bottom, transparent, #0d0a05)',
        }} />

        {/* ── Overlay ── */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: 'clamp(20px, 4vw, 52px)',
        }}>
          {/* Top label */}
          <p className="hero-subtitle" style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(0.42rem, 0.85vw, 0.65rem)',
            letterSpacing: 'clamp(0.12em, 0.3vw, 0.3em)',
            textTransform: 'uppercase',
            color: 'rgba(212,144,48,0.6)',
            margin: '0 0 clamp(8px, 8vh, 80px)',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            opacity: ready ? 1 : 0,
            transition: 'opacity 1s ease 0.8s',
          }}>
            Digital Marketing &nbsp;·&nbsp; Brand Strategy &nbsp;·&nbsp; Creative Direction
          </p>

          {/* Typewriter area */}
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '900px',
            height: 'clamp(100px, 18vh, 200px)',
            opacity: ready ? 1 : 0,
            transition: 'opacity 0.8s ease 0.4s',
          }}>
            <AnimatePresence mode="sync">
              <StoryFrame key={frameIdx} frame={FRAMES[frameIdx]} />
            </AnimatePresence>
          </div>
          {/* Simple Scroll to Explore text */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              bottom: 'clamp(24px, 7vh, 54px)',
              transform: 'translateX(-50%)',
              zIndex: 3,
              fontSize: 'clamp(0.50rem, 1.1vw, 0.70rem)',
              color: 'rgba(245,240,235,0.7)',
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 200,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              background: 'rgba(13,10,5,0.32)',
              borderRadius: '12px',
              padding: '7px 18px 7px',
              boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            Scroll to Explore
          </div>
        </div>
      </div>
    </div>
  )
}

