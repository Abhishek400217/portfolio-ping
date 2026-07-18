import React, { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Reusable Camera Controller
 * Provides smooth mouse parallax, a subtle natural drift, and mobile viewport responsive adjustments.
 */
export default function Camera({
  basePosition = [0, 0, 8],
  lookAt = [0, 0, 0],
  parallaxFactorX = 0.8,
  parallaxFactorY = 0.6,
  lerpSpeed = 0.05,
  autoDriftSpeed = 0.3,
  autoDriftRadius = 0.25,
}) {
  const { camera, pointer, size } = useThree()
  
  // Keep track of target and current positions to perform smooth lerping
  const targetPos = useRef(new THREE.Vector3())
  const currentPos = useRef(new THREE.Vector3(...basePosition))
  const targetLook = useRef(new THREE.Vector3(...lookAt))
  const currentLook = useRef(new THREE.Vector3(...lookAt))

  // Set initial position
  useEffect(() => {
    camera.position.set(basePosition[0], basePosition[1], basePosition[2])
    currentPos.current.set(basePosition[0], basePosition[1], basePosition[2])
  }, [camera, basePosition])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    // 1. Responsive Depth Compensation (Mobile aspect ratio optimization)
    // If screen is vertical (mobile), push camera further back to maintain content framing
    const aspect = size.width / size.height
    const responsiveZFactor = aspect < 1 ? Math.min(1.6, 1.05 / aspect) : 1.0
    const adjustedZ = basePosition[2] * responsiveZFactor

    // 2. Natural Auto-Drift
    // Subtle circular floating offset to give a physical drift effect
    const driftX = Math.sin(time * autoDriftSpeed) * autoDriftRadius
    const driftY = Math.cos(time * autoDriftSpeed * 0.85) * autoDriftRadius

    // 3. Mouse Parallax
    // pointer.x and pointer.y range from [-1, 1] mapped smoothly
    const parallaxX = pointer.x * parallaxFactorX
    const parallaxY = pointer.y * parallaxFactorY

    // Determine final target position
    targetPos.current.set(
      basePosition[0] + driftX + parallaxX,
      basePosition[1] + driftY + parallaxY,
      adjustedZ
    )

    // Smooth linear interpolation for high refresh rate display feeling (120 FPS target)
    currentPos.current.lerp(targetPos.current, lerpSpeed)
    camera.position.copy(currentPos.current)

    // Keep camera directed towards our lookAt target smoothly
    currentLook.current.lerp(targetLook.current, lerpSpeed)
    camera.lookAt(currentLook.current)
  })

  return null
}
