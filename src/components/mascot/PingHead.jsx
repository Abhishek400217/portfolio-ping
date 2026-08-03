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

        <filter
          id="outerGlow"
          x="-60%"
          y="-60%"
          width="220%"
          height="220%"
        >

          <feGaussianBlur
            stdDeviation="10"
          />

        </filter>

        {/* Polished metal chamfer edge stroke */}
        <linearGradient id="headEdge" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.25)" />
          <stop offset="100%" stopColor="rgba(0, 0, 0, 0.4)" />
        </linearGradient>
      </defs>
      <linearGradient id="headMetal" x1="0%" y1="0%" x2="100%" y2="100%">

        <stop offset="0%" stopColor="#596f62" />

        <stop offset="18%" stopColor="#415447" />

        <stop offset="48%" stopColor="#2b3a30" />

        <stop offset="72%" stopColor="#1a241e" />

        <stop offset="100%" stopColor="#0d1410" />

      </linearGradient>

      <filter id="headShadow" x="-40%" y="-40%" width="180%" height="180%">

        <feGaussianBlur stdDeviation="8" />

      </filter>
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
            r="5"
            fill="#00F5A0"
            style={{
              filter: "drop-shadow(0 0 12px #00F5A0)"
            }}
          />
        </g>
        {/* Main Head Shadow */}

        <ellipse
          cx="250"
          cy="226"
          rx="102"
          ry="84"
          fill="#08110d"
          opacity=".15"
          filter="url(#headShadow)"
        />

        {/* Main Metallic Head */}

        <rect
          x="154"
          y="147"
          width="192"
          height="150"
          rx="44"
          fill="url(#headMetal)"
          opacity=".98"
        />
        <rect
          x="160"
          y="150"
          width="180"
          height="140"
          rx="40"
          fill="#202b25"
        />

        <rect
          x="162"
          y="152"
          width="176"
          height="136"
          rx="38"
          fill="#101513"
        />
        <rect

          x="156"

          y="149"

          width="188"

          height="146"

          rx="45"

          fill="none"

          stroke="#ffffff08"

          strokeWidth="2"

        />
        <path

          d="

M330 165

Q345 220

330 278

"

          stroke="#00000055"

          strokeWidth="5"

          fill="none"

        />

        <path

          d="

M170 165

Q158 220

170 278

"

          stroke="#ffffff08"

          strokeWidth="3"

          fill="none"

        />
        {/* LEFT EAR */}

        <g>

          <ellipse
            cx="149"
            cy="222"
            rx="8"
            ry="19"
            fill="#4e5f56"
          />

          <ellipse
            cx="142"
            cy="222"
            rx="7"
            ry="15"
            fill="#27352f"
          />

          <circle
            cx="149"
            cy="222"
            r="3"
            fill="#00F5A0"
          />

        </g>

        {/* RIGHT EAR */}

        <g>

          <ellipse
            cx="351"
            cy="222"
            rx="8"
            ry="19"
            fill="#4e5f56"
          />

          <ellipse
            cx="358"
            cy="222"
            rx="7"
            ry="15"
            fill="#27352f"
          />

          <circle
            cx="358"
            cy="222"
            r="3"
            fill="#00F5A0"
          />

        </g>
        {/* Soft Top Highlight */}

        <path
          d="
M168 158
Q250 142
332 158
"
          stroke="#ffffff18"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        {/* Left Side Chamfer */}

        <path
          d="
M156 176
Q160 150
184 148
"
          stroke="#ffffff10"
          strokeWidth="2"
          fill="none"
        />

        {/* Right Side Chamfer */}

        <path
          d="
M344 176
Q340 150
316 148
"
          stroke="#00000055"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="
            M175 286
            Q250 304
            325 286
            "
          stroke="#ffffff18"
          strokeWidth="3"
          fill="none"
        />
        {/* Metallic Inner Rim */}

        <rect
          x="155"
          y="148"
          width="190"
          height="150"
          rx="46"
          fill="none"
          stroke="#ffffff10"
          strokeWidth="0.8"
        />
        {/* Inner Rim */}
        <rect
          x="164"
          y="157"
          width="172"
          height="132"
          rx="36"
          fill="none"
          stroke="#ffffff08"
          strokeWidth="1"
        />

        {/* Soft Bottom Shadow */}
        <path
          d="
M170 286
Q250 298
330 286
"
          stroke="#00000055"
          strokeWidth="4"
          fill="none"
        />

        {/* Top Highlight */}
        <path
          d="
      M172 158
      C205 148 295 148 327 158
    "
          fill="none"
          stroke="#ffffff"
          strokeOpacity=".20"
          strokeWidth="3"
          strokeLinecap="round"
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
