import React from 'react';

/**
 * PingBody
 * Renders the teardrop torso shell and neck collar.
 */
export default function PingBody({ headColor = '#2b3a30' }) {
  return (
    <g id="ping-body">
      <defs>
        {/* Torso metal body sheen */}
        <linearGradient id="bodySheen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3d4f43" />
          <stop offset="30%" stopColor={headColor} />
          <stop offset="70%" stopColor="#17221b" />
          <stop offset="100%" stopColor="#0b110d" />
        </linearGradient>

        {/* Neck connector joint gradient */}
        <linearGradient id="neckJoint" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#555555" />
          <stop offset="50%" stopColor="#cccccc" />
          <stop offset="100%" stopColor="#333333" />
        </linearGradient>
      </defs>

      {/* 1. Neck Connector Structure */}
      <rect
        x="242"
        y="292"
        width="16"
        height="15"
        rx="3"
        fill="url(#neckJoint)"
        stroke="rgba(0, 0, 0, 0.4)"
        strokeWidth="1"
      />

      {/* 2. Tiny Teardrop Torso Shell (Pixar-style chibi proportions) */}
      <path
        d="M 250,302 C 235,302 212,320 207,338 C 202,356 225,366 250,366 C 275,366 298,356 293,338 C 288,320 265,302 250,302 Z"
        fill="url(#bodySheen)"
        stroke="rgba(255, 255, 255, 0.08)"
        strokeWidth="1.5"
      />
    </g>
  );
}
