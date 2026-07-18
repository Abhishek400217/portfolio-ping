import React from 'react';
import { motion } from 'framer-motion';

/**
 * PingHands
 * Renders the tactile mitten hands with capacitive palm indicators.
 */
export default function PingHands({ side = 'left', pose = 'idle', color = '#2b3a30' }) {
  // Base mitten vector paths (relative to center coordinate (0, 0))
  // Left hand has thumb on right side; Right hand has thumb on left side
  const handPaths = {
    left: "M -12,-10 C -18,-10 -22,-6 -22,0 C -22,8 -16,14 -8,14 C -2,14 4,10 4,2 C 4,-2 0,-6 -4,-6 C -6,-6 -8,-4 -8,-4 C -8,-4 -7,-10 -12,-10 Z",
    right: "M 12,-10 C 18,-10 22,-6 22,0 C 22,8 16,14 8,14 C 2,14 -4,10 -4,2 C -4,-2 0,-6 4,-6 C 6,-6 8,-4 8,-4 C 8,-4 7,-10 12,-10 Z"
  };

  const path = handPaths[side];
  const capColor = '#10b981'; // Dynamic capacitive pad glow color

  return (
    <g id={`ping-hand-${side}`} transform="scale(0.6)">
      {/* 1. Main Hand Mitten Shell */}
      <motion.path
        d={path}
        fill={color}
        stroke="rgba(255, 255, 255, 0.08)"
        strokeWidth="1.2"
        style={{ transformOrigin: 'center' }}
      />

      {/* 2. Capacitive Palm Contact Pad (Glows based on active pose) */}
      <motion.circle
        cx={side === 'left' ? -4 : 4}
        cy="2"
        r="4.5"
        fill={capColor}
        opacity={pose === 'typing' || pose === 'celebrate' ? 0.85 : 0.25}
        style={{
          filter: pose === 'typing' || pose === 'celebrate'
            ? 'drop-shadow(0 0 3px #10b981)'
            : 'none'
        }}
      />
    </g>
  );
}
