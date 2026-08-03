import React from 'react';

export default function PingFace() {
  return (
    <g>
      <g id="ping-face">
        <defs>
          {/* Deep OLED Screen */}
          <radialGradient
            id="screenGlow"
            cx="50%"
            cy="30%"
            r="80%"
          >
            <stop offset="0%" stopColor="#11251f" />
            <stop offset="45%" stopColor="#07110d" />
            <stop offset="100%" stopColor="#010202" />
          </radialGradient>

          {/* Glass Reflection */}
          <linearGradient
            id="glassReflection"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#ffffff18" />
            <stop offset="18%" stopColor="#ffffff08" />
            <stop offset="45%" stopColor="#ffffff00" />
            <stop offset="100%" stopColor="#00000033" />
          </linearGradient>
        </defs>

        {/* OLED Screen */}
        <rect
          x="168"
          y="158"
          width="164"
          height="124"
          rx="36"
          fill="url(#screenGlow)"
        />

        <rect
          x="170"
          y="160"
          width="160"
          height="120"
          rx="34"
          fill="#030504"
        />

        <rect
          x="166"
          y="159"
          width="168"
          height="128"
          rx="34"
          fill="none"
          stroke="#ffffff05"
          strokeWidth=".8"
        />



        {/* Reflection */}
        <path
          d="
M182 168
C215 158 278 160 308 170
C292 173 255 173 222 175
C202 176 190 180 184 186
Z"
          fill="url(#glassReflection)"
          opacity=".22"
        />

        <path
          d="
M174 168
Q182 164 190 170
"
          stroke="#ffffff18"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />


      </g>

      <rect
        x="170"
        y="160"
        width="160"
        height="120"
        rx="32"
        fill="#00F5A0"
        opacity=".008"
      />
    </g>
  );
}