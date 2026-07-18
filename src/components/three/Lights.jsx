import React, { useRef } from 'react'

/**
 * Reusable Studio Lighting Rig
 * Provides optimized soft shadows, key studio lighting, secondary rim light,
 * and a glowing emerald accent light.
 */
export default function Lights({
  enableShadows = true,
  
  // Ambient setup
  ambientColor = '#010804',
  ambientIntensity = 0.35,

  // Key light (Directional)
  keyColor = '#ffffff',
  keyIntensity = 1.25,
  keyPosition = [6, 12, 6],

  // Emerald accent light
  accentColor = '#00ff88',
  accentIntensity = 3.5,
  accentPosition = [-4, -3, 2],
  accentDistance = 15,
  accentDecay = 2.0,

  // Rim back light (Directional from behind)
  rimColor = '#d1fae5',
  rimIntensity = 1.8,
  rimPosition = [-2, 4, -8],
}) {
  const dirLightRef = useRef()

  return (
    <group>
      {/* 1. Ambient Light - Provides a dark base glow so shadows aren't pitch black */}
      <ambientLight color={ambientColor} intensity={ambientIntensity} />

      {/* 2. Directional Key Light - Casts high-quality soft shadows */}
      <directionalLight
        ref={dirLightRef}
        color={keyColor}
        intensity={keyIntensity}
        position={keyPosition}
        castShadow={enableShadows}
        
        // Shadow map optimizations (120 FPS performance target)
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={25}
        
        // Keep the shadow camera frustum as tight as possible for maximum shadow crispness
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.0002}
      />

      {/* 3. Rim Light - Directional light shining from behind to highlight silhouettes */}
      <directionalLight
        color={rimColor}
        intensity={rimIntensity}
        position={rimPosition}
      />

      {/* 4. Emerald Accent Light - Glowing point light in the screen foreground */}
      <pointLight
        color={accentColor}
        intensity={accentIntensity}
        position={accentPosition}
        distance={accentDistance}
        decay={accentDecay}
      />

      {/* 5. Fill Light - Weak opposing directional light for subtle detail retrieval */}
      <directionalLight
        color="#081812"
        intensity={0.4}
        position={[-8, 6, 4]}
      />
    </group>
  )
}
