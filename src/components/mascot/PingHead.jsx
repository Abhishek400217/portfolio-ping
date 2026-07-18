import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import PingFace from './PingFace.jsx';
import PingEyes from './PingEyes.jsx';
import PingEyebrows from './PingEyebrows.jsx';

/**
 * PingHead
 * Renders the outer squircle head shell, micro-antenna, status orb, and inner face elements.
 * Parallaxes inner/outer components to simulate 3D rotation based on lookRotation.
 */
export default function PingHead({ 
  expression = 'idle', 
  headColor = '#2b3a30', 
  accentColor = '#10b981',
  lookRotation 
}) {
  // 1. Fallback motion values to avoid useTransform errors when lookRotation is undefined
  const fallbackX = useMotionValue(0);
  const fallbackY = useMotionValue(0);

  const lx = lookRotation?.x || fallbackX;
  const ly = lookRotation?.y || fallbackY;

  // 2. Resolve parallax multipliers (simulating visual depth)
  const headX = useTransform(lx, val => val * 0.25);
  const headY = useTransform(ly, val => val * 0.25);

  const faceX = useTransform(lx, val => val * 0.7);
  const faceY = useTransform(ly, val => val * 0.7);

  const browX = useTransform(lx, val => val * 0.9);
  const browY = useTransform(ly, val => val * 0.9);

  return (
    <g id="ping-head">
      {/* Definitions for Head Shading */}
      <defs>
        {/* Apple-style bead-blasted metallic sheen gradient */}
        <linearGradient id="headSheen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#405346" />
          <stop offset="30%" stopColor={headColor} />
          <stop offset="70%" stopColor="#1a251e" />
          <stop offset="100%" stopColor="#0d1410" />
        </linearGradient>

        {/* Polished metal chamfer edge stroke */}
        <linearGradient id="headEdge" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.25)" />
          <stop offset="100%" stopColor="rgba(0, 0, 0, 0.4)" />
        </linearGradient>
      </defs>

      {/* 3. Outer Shell Casing (Antenna + Head Squircle) */}
      <motion.g style={{ x: headX, y: headY, transformOrigin: '250px 220px' }}>
        {/* Micro-Antenna (Top-Rear, tilted 15 degrees) */}
        <g id="head-antenna" transform="rotate(15, 305, 140)">
          <line
            x1="305"
            y1="145"
            x2="305"
            y2="133"
            stroke="#4b5563"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle
            cx="305"
            cy="130"
            r="3.5"
            fill={accentColor}
            style={{
              filter: expression === 'sleepy' || expression === 'sleep' 
                ? 'drop-shadow(0 0 1px #10b981)' 
                : 'drop-shadow(0 0 4px #10b981)'
            }}
          />
        </g>

        {/* Outer Squircle Casing */}
        <rect
          x="155"
          y="145"
          width="190"
          height="150"
          rx="45"
          fill="url(#headSheen)"
          stroke="url(#headEdge)"
          strokeWidth="1.5"
        />
      </motion.g>

      {/* 4. Front Glass Faceplate & OLED Digital Eyes (Intermediate Parallax Depth) */}
      <motion.g style={{ x: faceX, y: faceY, transformOrigin: '250px 220px' }}>
        <PingFace />
        <PingEyes expression={expression} color={accentColor} />
      </motion.g>

      {/* 5. Eyebrows (Floating Front Parallax Depth) */}
      <motion.g style={{ x: browX, y: browY, transformOrigin: '250px 220px' }}>
        <PingEyebrows expression={expression} />
      </motion.g>
    </g>
  );
}
