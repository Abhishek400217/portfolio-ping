import React from 'react';

/**
 * PingFace
 * Renders the front obsidian curved glass faceplate vector structure.
 */
export default function PingFace() {
  return (
    <g id="ping-face">
      {/* Definitions for reflections and gradients */}
      <defs>
        {/* Dark deep obsidian screen backing gradient */}
        <radialGradient id="screenBacking" cx="50%" cy="40%" r="60%" fx="50%" fy="30%">
          <stop offset="0%" stopColor="#0d1f14" />
          <stop offset="100%" stopColor="#020704" />
        </radialGradient>

        {/* Diagonal specular glare highlights */}
        <linearGradient id="glassReflection" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.12)" />
          <stop offset="40%" stopColor="rgba(255, 255, 255, 0.02)" />
          <stop offset="60%" stopColor="rgba(0, 0, 0, 0)" />
          <stop offset="100%" stopColor="rgba(0, 0, 0, 0.3)" />
        </linearGradient>

        {/* Continuous glass anti-reflective outline border */}
        <linearGradient id="glassBorder" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.15)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.03)" />
        </linearGradient>
      </defs>

      {/* 1. Base Obsidian screen layer */}
      <rect
        x="165"
        y="155"
        width="170"
        height="130"
        rx="38"
        fill="url(#screenBacking)"
      />

      {/* 2. Glass border outline */}
      <rect
        x="165"
        y="155"
        width="170"
        height="130"
        rx="38"
        fill="none"
        stroke="url(#glassBorder)"
        strokeWidth="1.5"
      />

      {/* 3. Volumetric gloss reflections layer */}
      <rect
        x="165"
        y="155"
        width="170"
        height="130"
        rx="38"
        fill="url(#glassReflection)"
        pointerEvents="none"
      />
    </g>
  );
}
