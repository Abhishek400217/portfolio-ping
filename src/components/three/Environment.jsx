import React from 'react'
import { Environment as DreiEnvironment, Lightformer } from '@react-three/drei'

/**
 * Reusable Environment Component
 * Employs virtual lightformers (glowing panels of light) to construct premium
 * studio lighting reflections for metallic and glass objects.
 * Configured for maximum performance with resolution limits and single-frame baking.
 */
export default function Environment({ resolution = 256 }) {
  return (
    // 'frames={1}' bakes the environment map exactly once and stops rendering it,
    // which prevents per-frame GPU calculations and yields massive FPS improvements.
    <DreiEnvironment resolution={resolution} frames={1}>
      {/* 1. Overhead softbox panel */}
      <Lightformer
        form="rect"
        intensity={2.0}
        position={[0, 8, 0]}
        scale={[12, 12, 1]}
        rotation={[Math.PI / 2, 0, 0]}
      />

      {/* 2. Left side emerald accent lightformer */}
      <Lightformer
        form="circle"
        intensity={3.5}
        color="#00ff88" // Emerald glow reflection
        position={[-8, 2, -3]}
        scale={[6, 6, 1]}
        rotation={[0, Math.PI / 2, 0]}
      />

      {/* 3. Right side secondary fill lightformer */}
      <Lightformer
        form="rect"
        intensity={1.5}
        color="#a7f3d0" // Soft mint-emerald reflection
        position={[8, 3, 3]}
        scale={[4, 8, 1]}
        rotation={[0, -Math.PI / 2, 0]}
      />

      {/* 4. Background rim lightformer */}
      <Lightformer
        form="rect"
        intensity={2.5}
        color="#ffffff"
        position={[0, 0, -8]}
        scale={[16, 2, 1]}
      />
    </DreiEnvironment>
  )
}
