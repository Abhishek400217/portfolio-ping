import React from 'react';
import { motion } from 'framer-motion';

/**
 * PingShadow
 * Ground shadow layer. Dynamically adjusts scale and opacity based on hoverHeight.
 */
export default function PingShadow({ hoverHeight = 0 }) {
  // Convert hoverHeight offset (e.g. 0 to -30px) into opacity and scale factors
  // Higher floating height = larger, more blurred, and fainter shadow.
  // Lower floating height = smaller, sharper, and darker shadow.
  
  const rawOffset = Math.abs(hoverHeight); // Map negative coordinates to positive distance
  const opacity = Math.max(0.1, 0.45 - (rawOffset * 0.008));
  const scale = Math.max(0.6, 1.0 - (rawOffset * 0.005));
  const blurStd = Math.max(4, 6 + (rawOffset * 0.2));

  return (
    <g id="ping-shadow">
      <defs>
        {/* Dynamic blur filter using props stdDeviation */}
        <filter id="shadowBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={blurStd} />
        </filter>
      </defs>

      <motion.ellipse
        cx="250"
        cy="408"
        rx="45"
        ry="7"
        fill="black"
        animate={{
          opacity: opacity,
          scaleX: scale,
          scaleY: scale
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 12 }}
        filter="url(#shadowBlur)"
        style={{ transformOrigin: '250px 408px' }}
      />
    </g>
  );
}
