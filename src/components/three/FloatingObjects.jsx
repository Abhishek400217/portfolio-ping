import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { MeshTransmissionMaterial } from '@react-three/drei'

/**
 * Individual Floating Object Component
 * Calculates realistic, slow, physics-like floating animations with inertial decay.
 */
function FloatingMesh({ geometry, materialProps, initialPos, rotationSpeed, floatSpeed, driftRange, scale }) {
  const ref = useRef()
  const { pointer } = useThree()
  
  // Custom unique time offsets so they do not float in unison
  const phase = useMemo(() => Math.random() * Math.PI * 2, [])
  
  // Track positional deviations to smooth out movement
  const currentPos = useRef(new THREE.Vector3(...initialPos))
  const targetPos = useRef(new THREE.Vector3(...initialPos))

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime() * floatSpeed + phase

    // 1. Slow organic float translations (physics feeling)
    const hoverX = Math.sin(t * 0.7) * driftRange[0]
    const hoverY = Math.cos(t * 0.8) * driftRange[1]
    const hoverZ = Math.sin(t * 0.5) * driftRange[2]

    // 2. Mouse Parallax (objects drift slightly opposite to cursor pointer)
    const parallaxX = -pointer.x * 0.5
    const parallaxY = -pointer.y * 0.4

    // Combine floating and mouse parallax offsets
    targetPos.current.set(
      initialPos[0] + hoverX + parallaxX,
      initialPos[1] + hoverY + parallaxY,
      initialPos[2] + hoverZ
    )

    // Smooth position interpolation
    currentPos.current.lerp(targetPos.current, 0.05)
    ref.current.position.copy(currentPos.current)

    // 3. Multi-axis continuous rotation (gives a sense of low-gravity angular momentum)
    ref.current.rotation.x = t * rotationSpeed[0]
    ref.current.rotation.y = t * rotationSpeed[1]
    ref.current.rotation.z = t * rotationSpeed[2]
  })

  return (
    <mesh ref={ref} position={initialPos} scale={scale} castShadow receiveShadow>
      {geometry}
      {materialProps.glass ? (
        // Premium Frosted Glassmorphism (highly optimized for mobile/120 FPS target)
        <MeshTransmissionMaterial
          backside
          samples={4}               // Low samples for high framerates
          resolution={128}          // Compact refraction texture resolution
          thickness={0.6}
          roughness={0.18}
          anisotropy={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          distortion={0.3}
          distortionScale={0.3}
          temporalDistortion={0.15}
          color="#d1fae5"           // Light mint-emerald glass shade
        />
      ) : (
        // Apple-style metallic emerald material
        <meshStandardMaterial {...materialProps} />
      )}
    </mesh>
  )
}

/**
 * Reusable Floating Objects Container
 */
export default function FloatingObjects({ count = 6 }) {
  // Performance Optimization: Cache geometries to avoid re-allocating them in memory
  const geometries = useMemo(() => [
    new THREE.IcosahedronGeometry(0.8, 0),
    new THREE.TorusGeometry(0.6, 0.2, 16, 64),
    new THREE.OctahedronGeometry(0.8, 0),
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    new THREE.ConeGeometry(0.6, 1.2, 4),
  ], [])

  const items = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      // Rotate through the cached geometries
      const geometry = geometries[i % geometries.length]

      // Decide material characteristics (frosted glass vs metallic emerald)
      const isGlass = i % 3 === 0
      const materialProps = isGlass
        ? { glass: true }
        : {
            color: new THREE.Color(i % 2 === 0 ? '#10b981' : '#059669'), // Emerald palette
            metalness: 0.95,
            roughness: 0.12,
            envMapIntensity: 2.0, // Multiplies lightformer reflections
          }

      // Spread layout positioning inside a virtual box
      const initialPos = [
        ((i % 3) - 1) * 3.5 + (Math.random() - 0.5) * 1.5, // X distributed
        (Math.random() - 0.5) * 5.0,                        // Y spread
        (Math.random() - 0.5) * 3.0 - 1.5,                  // Z spread (behind interface layers)
      ]

      return {
        key: i,
        geometry,
        materialProps,
        initialPos,
        rotationSpeed: [
          (Math.random() - 0.5) * 0.25,
          (Math.random() - 0.5) * 0.25,
          (Math.random() - 0.5) * 0.25,
        ],
        floatSpeed: 0.15 + Math.random() * 0.2,
        driftRange: [
          0.3 + Math.random() * 0.5,
          0.3 + Math.random() * 0.5,
          0.2 + Math.random() * 0.3,
        ],
        scale: 0.65 + Math.random() * 0.55,
      }
    })
  }, [count, geometries])

  return (
    <group>
      {items.map((item) => (
        <FloatingMesh key={item.key} {...item} />
      ))}
    </group>
  )
}
