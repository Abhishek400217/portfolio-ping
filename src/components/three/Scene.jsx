import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents, Bvh } from '@react-three/drei'
import Camera from './Camera'
import Lights from './Lights'
import Environment from './Environment'
import Background from './Background'
import FloatingObjects from './FloatingObjects'
import Particles from './Particles'
import Effects from './Effects'

/**
 * Reusable 3D Scene Orchestrator Component
 * Wraps the canvas, handles core WebGL optimizations, applies dynamic DPR,
 * and mounts the full lighting, camera, environment, particle, and post-processing stack.
 */
export default function Scene({
  children,
  
  // Toggles for modular sub-systems
  showBackground = true,
  showLights = true,
  showEnvironment = true,
  showFloatingObjects = true,
  showParticles = true,
  showEffects = true,
  
  // Configuration options
  enableShadows = true,
  fogColor = '#020503',
  fogNear = 4.0,
  fogFar = 16.0,
  
  // Component configuration props
  cameraConfig = {},
  lightConfig = {},
  particleConfig = {},
  floatingConfig = {},
  effectConfig = {},
  canvasProps = {},
}) {
  return (
    <Canvas
      // Core GPU optimizations
      gl={{
        antialias: false,             // Antialiasing is offloaded to custom shader dithering/effects
        alpha: false,                 // Fully opaque dark premium canvas
        powerPreference: 'high-performance', // Requests discrete GPU
        stencil: false,               // Disables stencil buffer to free memory
        depth: true,                  // Enables Z-depth sorting
      }}
      shadows={enableShadows ? 'soft' : false}
      
      // Dynamic DPR scales resolution down during frame drops (critical for 120 FPS target)
      dpr={[1.0, 2.0]}
      
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'auto',
        background: '#020503',        // Dark theme fallback
      }}
      {...canvasProps}
    >
      {/* 1. Dynamic Performance Management */}
      {/* Degrades canvas pixel ratio temporarily on complex frame draws */}
      <AdaptiveDpr pixelated />
      {/* Toggles off pointer events during heavy camera sweeps */}
      <AdaptiveEvents />

      {/* 2. Raycasting Bounding Volume Hierarchy Acceleration */}
      <Bvh firstHitOnly>
        {/* Premium atmospheric volumetric fog feel */}
        <fog attach="fog" args={[fogColor, fogNear, fogFar]} />

        {/* 3. Screen-Space Dithered Background */}
        {showBackground && <Background />}

        {/* 4. Interpolated Parallax Camera Controller */}
        <Camera {...cameraConfig} />

        {/* 5. Studio Lighting Rig */}
        {showLights && (
          <Lights enableShadows={enableShadows} {...lightConfig} />
        )}

        {/* 6. Virtual Lightformer Environment Reflection */}
        {showEnvironment && (
          <Suspense fallback={null}>
            <Environment />
          </Suspense>
        )}

        {/* 7. Frosted Glass and Metallic Floating Physics Objects */}
        {showFloatingObjects && (
          <Suspense fallback={null}>
            <FloatingObjects {...floatingConfig} />
          </Suspense>
        )}

        {/* 8. GPU-driven Glimmer Particles System */}
        {showParticles && (
          <Suspense fallback={null}>
            <Particles {...particleConfig} />
          </Suspense>
        )}

        {/* Custom interactive elements (e.g. portfolio cards or models) overlay */}
        <Suspense fallback={null}>
          {children}
        </Suspense>

        {/* 9. Cinematic Post-Processing (Bloom + Vignette) */}
        {showEffects && <Effects {...effectConfig} />}
      </Bvh>
    </Canvas>
  )
}
