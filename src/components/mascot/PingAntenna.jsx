import React from 'react';
import { motion } from 'framer-motion';

/**
 * PingAntenna — now integrated into PingHead.
 * This file is kept as a standalone export for any direct usage.
 *
 * Reference analysis:
 * - Thin metallic rod extending from top of helmet, tilted ~25° right
 * - Rod: brushed titanium / silver, slight taper toward tip
 * - Small spherical joint at base where rod meets helmet
 * - Tip: glowing cyan sphere, high emissive, white specular glint
 * - Soft bloom halo around the orb
 * - Micro antenna-sway idle animation
 */
export default function PingAntenna({ cx = 262, cy = 108, color = '#00F5FF' }) {
  return (
    <motion.g
      className="ping-antenna"
      animate={{ rotate: [0, 1.5, -1.5, 0] }}
      transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      <defs>
        <linearGradient id="ant_rod" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#7A8FA8" />
          <stop offset="40%"  stopColor="#D8E4F0" />
          <stop offset="70%"  stopColor="#A8B8CC" />
          <stop offset="100%" stopColor="#607080" />
        </linearGradient>

        <radialGradient id="ant_orb" cx="30%" cy="30%" r="70%">
          <stop offset="0%"   stopColor="#FFFFFF" />
          <stop offset="18%"  stopColor="#CCFFFF" />
          <stop offset="50%"  stopColor="#00F5FF" />
          <stop offset="100%" stopColor="#0080CC" />
        </radialGradient>

        <filter id="ant_bloom" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="5"  result="b1" />
          <feGaussianBlur stdDeviation="10" result="b2" />
          <feMerge>
            <feMergeNode in="b2" />
            <feMergeNode in="b1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Base socket joint */}
      <circle cx={cx} cy={cy} r="4.5" fill="#4A5A72" stroke="#8A9AB2" strokeWidth="0.8" />

      {/* Rod */}
      <path
        d={`M${cx} ${cy} L${cx + 18} ${cy - 37}`}
        stroke="url(#ant_rod)"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Outer glow halo */}
      <motion.circle
        cx={cx + 18} cy={cy - 40}
        r="14"
        fill={color}
        opacity="0.16"
        filter="url(#ant_bloom)"
        animate={{ r: [14, 17, 14], opacity: [0.14, 0.24, 0.14] }}
        transition={{ repeat: Infinity, duration: 2.0, ease: 'easeInOut' }}
      />

      {/* Core orb */}
      <motion.circle
        cx={cx + 18} cy={cy - 40}
        r="8"
        fill="url(#ant_orb)"
        filter="url(#ant_bloom)"
        animate={{ r: [8, 9, 8] }}
        transition={{ repeat: Infinity, duration: 2.0, ease: 'easeInOut' }}
      />

      {/* Specular glint */}
      <circle cx={cx + 14} cy={cy - 44} r="2.5" fill="#FFFFFF" opacity="0.95" />
    </motion.g>
  );
}
