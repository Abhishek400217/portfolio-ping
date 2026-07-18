import React from 'react';
import { motion } from 'framer-motion';

/**
 * PingRing
 * Magnetically suspended base ring.
 * Props: rotationSpeed (RPM), glow (bool/color), hoverHeight (px).
 */
export default function PingRing({ 
  rotationSpeed = 10, 
  glow = true, 
  hoverHeight = 0,
  glowColor = '#10b981'
}) {
  // Translate RPM to animate loop duration (seconds per rev)
  const duration = rotationSpeed > 0 ? 60 / rotationSpeed : 0;

  return (
    <motion.g
      id="ping-ring"
      animate={{ y: hoverHeight }}
      transition={{ type: 'spring', stiffness: 100, damping: 12 }}
    >
      <defs>
        {/* Chrome material ring gradient */}
        <linearGradient id="chromeRing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#6b7280" />
          <stop offset="100%" stopColor="#111827" />
        </linearGradient>

        {/* Ring glow filter */}
        <filter id="ringGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 1. Underlying Glow Ring (Emissive background overlay) */}
      {glow && (
        <ellipse
          cx="250"
          cy="380"
          rx="55"
          ry="11"
          fill="none"
          stroke={glowColor}
          strokeWidth="8"
          opacity="0.35"
          filter="url(#ringGlow)"
          pointerEvents="none"
        />
      )}

      {/* 2. Core Solid Torus Ring */}
      <ellipse
        cx="250"
        cy="380"
        rx="55"
        ry="11"
        fill="none"
        stroke="url(#chromeRing)"
        strokeWidth="4"
      />

      {/* 3. Rotating Highlight Bead (Simulates mechanical rotation) */}
      {rotationSpeed > 0 && (
        <motion.ellipse
          cx="250"
          cy="380"
          rx="55"
          ry="11"
          fill="none"
          stroke={glowColor}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="10 350"
          animate={{ strokeDashoffset: [0, -360] }}
          transition={{
            repeat: Infinity,
            duration: duration,
            ease: 'linear'
          }}
          style={{
            filter: `drop-shadow(0 0 4px ${glowColor})`
          }}
        />
      )}
    </motion.g>
  );
}
