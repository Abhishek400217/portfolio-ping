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
        x="238"
        y="287"
        width="24"
        height="18"
        rx="6"
        fill="url(#neckJoint)"
        stroke="rgba(0, 0, 0, 0.4)"
        strokeWidth="1"
      />
      <ellipse
        cx="250"
        cy="304"
        rx="12"
        ry="5"
        fill="#111"
      />

      <ellipse
        cx="250"
        cy="3"
        rx="8"
        ry="3"
        fill="#00F5A0"
        opacity=".6"
      />
      {/* 2. Tiny Teardrop Torso Shell (Pixar-style chibi proportions) */}
      <path
        d="
M250 312

C224 312 206 330 206 356

C206 382 224 396 250 396

C276 396 294 382 294 356

C294 330 276 312 250 312

Z
"
        fill="url(#bodySheen)"
        stroke="#ffffff18"
        strokeWidth="2"
      />
      {/* Left Shoulder */}

      <circle
        cx="214"
        cy="334"
        r="5"
        fill="#7b7b7b"
      />

      <circle
        cx="214"
        cy="334"
        r="2"
        fill="#00F5A0"
      />

      {/* Right Shoulder */}

      <circle
        cx="286"
        cy="334"
        r="5"
        fill="#7b7b7b"
      />

      <circle
        cx="286"
        cy="334"
        r="2"
        fill="#00F5A0"
      />
      <path
        d="
M228 388

Q250 396 272 388
"
        stroke="#00000055"
        strokeWidth="3"
        fill="none"
      />

      {/* Core Housing */}

      <circle
        cx="250"
        cy="352"
        r="15"
        fill="#26352d"
      />

      <circle
        cx="250"
        cy="352"
        r="9"
        fill="#00F5A0"
      />

      <circle
        cx="250"
        cy="352"
        r="18"
        fill="#00F5A0"
        opacity=".10"
      />

      <path
        d="
M225 326

Q250 315 275 326
"
        stroke="#ffffff22"
        strokeWidth="2"
        fill="none"
      />
    </g>
  );
}
