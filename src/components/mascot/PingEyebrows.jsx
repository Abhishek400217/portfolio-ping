import React from 'react';
import { motion } from 'framer-motion';

/**
 * PingEyebrows
 * Levitaling eyebrow segments floating above the screen glass.
 */
export default function PingEyebrows({ expression = 'idle', color = '#9ca3af' }) {
  // Eyebrow geometry presets mapped to expressions
  const eyebrowPresets = {
    idle: {
      left: { y: 0, rotate: 0 },
      right: { y: 0, rotate: 0 }
    },
    happy: {
      left: { y: -8, rotate: 12 },
      right: { y: -8, rotate: -12 }
    },
    curious: {
      left: { y: -14, rotate: 15 },
      right: { y: 2, rotate: -5 }
    },
    sleepy: {
      left: { y: 4, rotate: -8 },
      right: { y: 4, rotate: 8 }
    },
    thinking: {
      left: { y: 5, rotate: -12 },
      right: { y: -10, rotate: 18 }
    },
    surprise: {
      left: { y: -18, rotate: 5 },
      right: { y: -18, rotate: -5 }
    },
    wink: {
      left: { y: 0, rotate: 0 },
      right: { y: 6, rotate: 8 }
    }
  };

  const active = eyebrowPresets[expression] || eyebrowPresets[expression === 'sleeping' ? 'sleepy' : 'idle'] || eyebrowPresets.idle;

  // Eyebrow shapes: horizontal rounded lines
  // Left anchor center (210, 180), Right anchor center (290, 180)
  return (
    <g id="ping-eyebrows">
      {/* Left Eyebrow */}
      <motion.g
        style={{ transformOrigin: '210px 180px' }}
        animate={active.left}
        transition={{ type: 'spring', stiffness: 180, damping: 14 }}
      >
        <line
          x1="190"
          y1="180"
          x2="230"
          y2="180"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
        />
      </motion.g>

      {/* Right Eyebrow */}
      <motion.g
        style={{ transformOrigin: '290px 180px' }}
        animate={active.right}
        transition={{ type: 'spring', stiffness: 180, damping: 14 }}
      >
        <line
          x1="270"
          y1="180"
          x2="310"
          y2="180"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
        />
      </motion.g>
    </g>
  );
}
