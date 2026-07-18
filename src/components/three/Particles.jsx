import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// GPU Particle Custom Shader Definition
const ParticleShader = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uPixelRatio: { value: 1.0 },
    uSize: { value: 16.0 },
    uColor: { value: new THREE.Color('#10b981') }, // Vibrant emerald
  },
  vertexShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uPixelRatio;
    uniform float uSize;
    
    attribute float aSpeed;
    attribute float aOffset;
    attribute vec3 aDrift;
    
    varying float vAlpha;

    void main() {
      vec3 pos = position;
      
      // 1. Slow upward floating animation
      pos.y += uTime * aSpeed * 0.15;
      
      // Wrap coordinates inside a 16 unit bounding box [-8 to +8]
      pos.y = mod(pos.y + 8.0, 16.0) - 8.0;
      
      // 2. Wave-like horizontal drift on X and Z axes
      pos.x += sin(uTime * 0.25 + aOffset) * aDrift.x * 0.5;
      pos.z += cos(uTime * 0.2 + aOffset) * aDrift.z * 0.5;

      // 3. Smooth Mouse interaction (push away effect)
      // Map pointer coordinates ([-1, 1]) to scale with scene bounds (roughly 8x6 units)
      vec2 mouseWorld = uMouse * vec2(8.0, 6.0);
      float distToMouse = distance(pos.xy, mouseWorld);
      
      if (distToMouse < 3.0) {
        float force = (1.0 - (distToMouse / 3.0));
        vec2 dir = normalize(pos.xy - mouseWorld);
        // Push particles along the vector away from the mouse
        pos.xy += dir * force * 0.75;
      }

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;

      // 4. Perspective size attenuation (particles further from camera look smaller)
      // Pulse the size slightly over time for a glimmer/sparkle effect
      float pulse = 0.85 + 0.15 * sin(uTime * 2.0 + aOffset);
      gl_PointSize = uSize * uPixelRatio * (1.0 / -mvPosition.z) * pulse;

      // 5. Alpha boundary fading (fades out at borders to avoid sudden visual clipping)
      float fadeY = smoothstep(-8.0, -5.5, pos.y) * smoothstep(8.0, 5.5, pos.y);
      float fadeX = smoothstep(-8.0, -5.5, pos.x) * smoothstep(8.0, 5.5, pos.x);
      
      vAlpha = fadeY * fadeX * (0.2 + 0.8 * aSpeed); // Fast particles have higher baseline brightness
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    varying float vAlpha;

    void main() {
      // Create a smooth circular particle instead of default WebGL square points
      vec2 center = gl_PointCoord - vec2(0.5);
      float dist = length(center);
      
      // Soft radial falloff edge
      float strength = smoothstep(0.5, 0.08, dist);
      
      // Discard pixels outside the radius to optimize transparent drawing
      if (strength < 0.01) discard;

      // Blend color with calculated GPU opacity
      gl_FragColor = vec4(uColor, strength * vAlpha * 0.65);
    }
  `
}

/**
 * Reusable Particle Engine Component
 */
export default function Particles({ count = 280, size = 18.0 }) {
  const pointsRef = useRef()
  const { size: viewportSize } = useThree()

  // Generate attribute buffers once to avoid re-allocation garbage collection spikes
  const [positions, speeds, offsets, drifts] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const spd = new Float32Array(count)
    const off = new Float32Array(count)
    const drf = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      // Spread positions throughout volume box
      pos[i * 3] = (Math.random() - 0.5) * 16.0     // X
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16.0 // Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6.0 - 2.0 // Z (stays in front of background, behind camera)

      // Random speed speeds floating up
      spd[i] = 0.2 + Math.random() * 0.8

      // Phase offset for sinusoids
      off[i] = Math.random() * Math.PI * 2.0

      // Side drift factors
      drf[i * 3] = 0.4 + Math.random() * 1.2     // X drift range
      drf[i * 3 + 1] = 0.4 + Math.random() * 1.2 // Y drift range
      drf[i * 3 + 2] = 0.4 + Math.random() * 1.2 // Z drift range
    }

    return [pos, spd, off, drf]
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      const material = pointsRef.current.material
      material.uniforms.uTime.value = state.clock.getElapsedTime()

      // Smoothly update mouse coordinates
      const currentMouse = material.uniforms.uMouse.value
      currentMouse.lerp(state.pointer, 0.08)

      // Dynamic pixel ratio fallback to prevent performance drops on dense screens (Retina)
      material.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2)
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aSpeed"
          args={[speeds, 1]}
        />
        <bufferAttribute
          attach="attributes-aOffset"
          args={[offsets, 1]}
        />
        <bufferAttribute
          attach="attributes-aDrift"
          args={[drifts, 3]}
        />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={ParticleShader.vertexShader}
        fragmentShader={ParticleShader.fragmentShader}
        uniforms={ParticleShader.uniforms}
      />
    </points>
  )
}
