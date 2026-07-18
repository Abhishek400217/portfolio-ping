import React from 'react';
import { motion } from 'framer-motion';

/**
 * Spring configurations matching physical mass mechanics.
 */
export const springPresets = {
  default: { type: 'spring', stiffness: 120, damping: 14, mass: 1 },
  snappy: { type: 'spring', stiffness: 220, damping: 18, mass: 0.8 },
  slow: { type: 'spring', stiffness: 80, damping: 12, mass: 1.2 }
};

/**
 * PingAnimator
 * Visual layer wrapper utilizing Framer Motion animation bounds to drive layout targets.
 */
export default function PingAnimator({ children, animateProps, preset = 'default', ...props }) {
  return (
    <motion.g
      animate={animateProps}
      transition={springPresets[preset] || springPresets.default}
      {...props}
    >
      {children}
    </motion.g>
  );
}
