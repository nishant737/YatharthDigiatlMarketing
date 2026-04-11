import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function useIsMobile() {
  const [mobile, setMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const h = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  return mobile
}

// ─── Wave Grid — the hero element ────────────────────────────────────────────
// A dense grid of points that ripple like a 3D ocean surface
function WaveGrid({ cols = 60, rows = 36 }) {
  const ref    = useRef()
  const colRef = useRef()

  const { basePositions, count } = useMemo(() => {
    const positions = []
    const W = 26, H = 14
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c / (cols - 1) - 0.5) * W
        const y = (r / (rows - 1) - 0.5) * H
        positions.push(x, y, 0)
      }
    }
    return { basePositions: new Float32Array(positions), count: cols * rows }
  }, [cols, rows])

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(basePositions.slice(), 3))
    g.setAttribute('color',    new THREE.BufferAttribute(new Float32Array(count * 3), 3))
    return g
  }, [basePositions, count])

  const colA = new THREE.Color('#DB6436')
  const colB = new THREE.Color('#3a1a08')
  const colC = new THREE.Color('#ff9060')

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t   = clock.getElapsedTime()
    const pos = ref.current.geometry.attributes.position
    const col = ref.current.geometry.attributes.color

    for (let i = 0; i < count; i++) {
      const ox = basePositions[i * 3]
      const oy = basePositions[i * 3 + 1]

      // Multiple overlapping waves for complex surface
      const z =
        Math.sin(ox * 0.55 + t * 0.7)  * 0.9 +
        Math.sin(oy * 0.70 + t * 0.5)  * 0.7 +
        Math.sin((ox + oy) * 0.35 + t * 0.9) * 0.5 +
        Math.sin(ox * 0.22 - t * 0.4)  * 0.4 +
        Math.cos(oy * 0.45 + t * 0.6)  * 0.35

      pos.array[i * 3 + 2] = z

      // Color by height: peaks = bright orange, troughs = dark
      const n = (z + 2.8) / 5.6   // normalise 0–1
      const c = n > 0.6
        ? colC.clone().lerp(colA, (n - 0.6) / 0.4)
        : colA.clone().lerp(colB, 1 - n / 0.6)

      col.array[i * 3]     = c.r
      col.array[i * 3 + 1] = c.g
      col.array[i * 3 + 2] = c.b
    }

    pos.needsUpdate = true
    col.needsUpdate = true
  })

  return (
    <points ref={ref} geometry={geometry} position={[0, -1, -4]}>
      <pointsMaterial
        size={0.055}
        vertexColors
        transparent
        opacity={0.38}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// ─── Second wave layer — offset, slower, more transparent ─────────────────────
function WaveGridBack({ cols = 40, rows = 24 }) {
  const ref = useRef()

  const { basePositions, count } = useMemo(() => {
    const positions = []
    const W = 30, H = 16
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        positions.push(
          (c / (cols - 1) - 0.5) * W,
          (r / (rows - 1) - 0.5) * H,
          0
        )
      }
    }
    return { basePositions: new Float32Array(positions), count: cols * rows }
  }, [cols, rows])

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(basePositions.slice(), 3))
    return g
  }, [basePositions, count])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t   = clock.getElapsedTime()
    const pos = ref.current.geometry.attributes.position
    for (let i = 0; i < count; i++) {
      const ox = basePositions[i * 3]
      const oy = basePositions[i * 3 + 1]
      pos.array[i * 3 + 2] =
        Math.sin(ox * 0.3 + t * 0.35 + 1.2) * 1.1 +
        Math.sin(oy * 0.4 + t * 0.28)        * 0.8 +
        Math.cos(ox * 0.18 - oy * 0.22 + t * 0.45) * 0.6
    }
    pos.needsUpdate = true
  })

  return (
    <points ref={ref} geometry={geometry} position={[0, 0, -9]}>
      <pointsMaterial
        size={0.04}
        color="#7a3010"
        transparent
        opacity={0.18}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// ─── Floating ambient orbs ────────────────────────────────────────────────────
function AmbientOrbs({ count = 10 }) {
  const blobs = useMemo(() => Array.from({ length: count }, (_, i) => ({
    x:       (Math.random() - 0.5) * 20,
    y:       (Math.random() - 0.5) * 10,
    z:       -5 - Math.random() * 6,
    radius:  0.8 + Math.random() * 2.2,
    speed:   0.008 + Math.random() * 0.018,
    phase:   (i / count) * Math.PI * 2,
    opacity: 0.03 + Math.random() * 0.05,
    color: [
      new THREE.Color('#DB6436'),
      new THREE.Color('#c05020'),
      new THREE.Color('#ff7040'),
    ][i % 3],
  })), [count])

  return <>{blobs.map((b, i) => <Orb key={i} data={b} />)}</>
}

function Orb({ data: d }) {
  const ref = useRef()
  const geo = useMemo(() => new THREE.CircleGeometry(d.radius, 32), [d.radius])
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    ref.current.position.x = d.x + Math.sin(t * d.speed + d.phase) * 3
    ref.current.position.y = d.y + Math.cos(t * d.speed * 0.7 + d.phase) * 2
    ref.current.material.opacity = d.opacity * (0.5 + 0.5 * Math.sin(t * d.speed * 1.8 + d.phase))
  })
  return (
    <mesh ref={ref} position={[d.x, d.y, d.z]} geometry={geo}>
      <meshBasicMaterial color={d.color} transparent opacity={d.opacity} depthWrite={false} blending={THREE.AdditiveBlending} />
    </mesh>
  )
}

// ─── Sparse foreground particles — depth cue ─────────────────────────────────
function ForegroundDust({ count = 50 }) {
  const ref = useRef()

  const data = useMemo(() => {
    const pos    = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    const phases = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 18
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12
      pos[i * 3 + 2] = Math.random() * 4 - 2
      speeds[i] = 0.08 + Math.random() * 0.15
      phases[i] = Math.random() * Math.PI * 2
    }
    return { orig: pos.slice(), pos, speeds, phases }
  }, [count])

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(data.pos, 3))
    return g
  }, [data])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    for (let i = 0; i < count; i++) {
      data.pos[i * 3]     = data.orig[i * 3]     + Math.sin(t * data.speeds[i] + data.phases[i]) * 0.6
      data.pos[i * 3 + 1] = data.orig[i * 3 + 1] + Math.cos(t * data.speeds[i] * 0.8 + data.phases[i]) * 0.5
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={0.06}
        color="#ff8050"
        transparent
        opacity={0.22}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// ─── Camera — strong parallax, spring velocity, auto-orbit ───────────────────
function CameraController({ mouseX, mouseY }) {
  const state = useRef({ x: 0, y: 0, vx: 0, vy: 0 })

  useFrame(({ camera, clock }) => {
    const t  = clock.getElapsedTime()
    const mx = mouseX?.get?.() ?? 0
    const my = mouseY?.get?.() ?? 0

    // Target position driven by mouse
    const tx = mx * 2.8 + Math.sin(t * 0.09) * 0.4
    const ty = my * -1.8 + Math.cos(t * 0.07) * 0.25

    // Spring physics — snappy but weighted
    const s = state.current
    s.vx += (tx - s.x) * 0.06
    s.vy += (ty - s.y) * 0.06
    s.vx *= 0.80
    s.vy *= 0.80
    s.x  += s.vx
    s.y  += s.vy

    // Slight Z pulse for depth breathing
    const z = 9 + Math.sin(t * 0.06) * 0.4

    camera.position.set(s.x, s.y, z)
    // Look slightly ahead of movement for a cinematic feel
    camera.lookAt(s.x * 0.08, s.y * 0.08, 0)
  })
  return null
}

// ─── Scene ────────────────────────────────────────────────────────────────────
function Scene({ isMobile, mouseX, mouseY }) {
  return (
    <>
      <CameraController mouseX={mouseX} mouseY={mouseY} />
      <WaveGridBack cols={isMobile ? 24 : 40} rows={isMobile ? 14 : 24} />
      <WaveGrid     cols={isMobile ? 36 : 60} rows={isMobile ? 22 : 36} />
      <AmbientOrbs  count={isMobile ? 5 : 10} />
      <ForegroundDust count={isMobile ? 24 : 50} />
    </>
  )
}

export default function Background3D({ mouseX, mouseY }) {
  const isMobile = useIsMobile()
  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw', height: '100dvh',
        zIndex: 1,
        pointerEvents: 'none',
        opacity: 0.92,
      }}
      gl={{
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance',
        stencil: false,
        depth: false,
      }}
      dpr={isMobile ? [1, 1] : [1, 1.5]}
      camera={{ position: [0, 0, 9], fov: 62 }}
    >
      <Scene isMobile={isMobile} mouseX={mouseX} mouseY={mouseY} />
    </Canvas>
  )
}
