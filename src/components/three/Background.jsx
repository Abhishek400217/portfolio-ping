import React, { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Custom shader for smooth, dark, dithered radial gradient
const BackgroundShader = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uColorBg: { value: new THREE.Color('#020503') }, // extremely dark charcoal-emerald
    uColorGlow: { value: new THREE.Color('#012513') }, // subtle emerald glow
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      // Fit full screen
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    uniform vec3 uColorBg;
    uniform vec3 uColorGlow;
    varying vec2 vUv;

    // Standard high-performance pseudo-random generator
    float rand(vec2 co) {
      return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
      // Normalize coordinate system with center at 0
      vec2 uv = vUv - 0.5;
      
      // Correct for aspect ratio to keep radial gradient circular
      float aspect = uResolution.x / uResolution.y;
      uv.x *= aspect;

      // Subtle mouse interaction (influence is scaled to keep it elegant)
      vec2 targetMouse = uMouse * 0.15;
      
      // Calculate distance to the glowing center
      float dist = length(uv - targetMouse);

      // Radial gradient distribution
      float glow = smoothstep(0.8, 0.0, dist);
      
      // Extremely subtle slow pulse
      glow *= 0.9 + 0.1 * sin(uTime * 0.4);

      // Blend primary background with emerald glow
      vec3 finalColor = mix(uColorBg, uColorGlow, glow * 0.4);

      // Screen space dithering to completely eliminate color banding in deep grays
      float noise = rand(vUv * (1.0 + uTime * 0.00001)) - 0.5;
      finalColor += vec3(noise * (1.0 / 255.0) * 1.8);

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
}

export default function Background() {
  const { size } = useThree()
  const materialRef = useRef()

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime()
      
      // Smoothly interpolate mouse target position to avoid jumps
      const currentMouse = materialRef.current.uniforms.uMouse.value
      currentMouse.lerp(state.pointer, 0.05)
      
      // Dynamic window resizing update
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height)
    }
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={BackgroundShader.vertexShader}
        fragmentShader={BackgroundShader.fragmentShader}
        uniforms={BackgroundShader.uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  )
}
