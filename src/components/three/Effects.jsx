import React from 'react'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { useThree } from '@react-three/fiber'

/**
 * Reusable Postprocessing Effects System
 * Configures professional cinematics using Bloom (glow) and Vignette (darkened borders).
 * Optimized with high-efficiency settings (no normal pass, no MSAA overhead, and mobile scaling).
 */
export default function Effects({
  enableBloom = true,
  enableVignette = true,
  
  // Bloom parameters
  bloomIntensity = 1.2,
  bloomLuminanceThreshold = 0.15,
  bloomLuminanceSmoothing = 0.9,
  
  // Vignette parameters
  vignetteOffset = 0.35,
  vignetteDarkness = 0.6,
}) {
  const { size } = useThree()
  
  // Scale down intensities on mobile screens to save GPU resources
  const isMobile = size.width < 768

  return (
    <EffectComposer 
      disableNormalPass     // Speeds up composition by discarding unused normal vectors
      multisampling={0}     // Disables MSAA (anti-aliasing) inside composition pass to target 120 FPS
    >
      {/* 1. Selective Bloom - Adds soft dream-like glows to glowing emerald accents */}
      {enableBloom && (
        <Bloom
          intensity={isMobile ? bloomIntensity * 0.6 : bloomIntensity}
          luminanceThreshold={bloomLuminanceThreshold}
          luminanceSmoothing={bloomLuminanceSmoothing}
          mipmapBlur        // High-fidelity progressive downscale blur (very performant)
        />
      )}

      {/* 2. Vignette - Darkens edges to create visual depth and focus the user's eye */}
      {enableVignette && (
        <Vignette
          offset={vignetteOffset}
          darkness={vignetteDarkness}
          eskil={false}      // Standard smooth vignette curve
        />
      )}
    </EffectComposer>
  )
}
