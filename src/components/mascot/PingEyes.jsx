import React from 'react';
import { motion } from 'framer-motion';

/**
 * PingEyes
 * Digital OLED screen eyes.
 * Supports: idle, happy, curious, sleepy, thinking, surprise, wink.
 */
export default function PingEyes({ expression = 'idle', color = '#10b981' }) {
  // Local coordinate anchors for left and right eyes
  const eyes = {
    left: { cx: 210, cy: 215 },
    right: { cx: 290, cy: 215 }
  };

  /**
   * Helper to return appropriate SVG elements based on expression states.
   */
  const renderEye = (side, cx, cy) => {
    const isWinkingSide = expression === 'wink' && side === 'right';

    if (isWinkingSide) {
      // Horizontal line for winked state
      return (
        <motion.line
          key={`${side}-wink`}
          x1={cx - 15}
          y1={cy}
          x2={cx + 15}
          y2={cy}
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ scaleY: 0.1 }}
          animate={{ scaleY: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        />
      );
    }

    switch (expression) {
      case 'happy':
        // Inverted arc (crescent moon)
        return (
          <motion.path
            key={`${side}-happy`}
            d={`M ${cx - 18} ${cy + 8} Q ${cx} ${cy - 12} ${cx + 18} ${cy + 8}`}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ type: 'spring', stiffness: 150, damping: 15 }}
          />
        );

      case 'curious':
        // Expanded, round stadium eyes
        return (
          <motion.rect
            key={`${side}-curious`}
            x={cx - 15}
            y={cy - 20}
            width="30"
            height="40"
            rx="15"
            fill={color}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 180, damping: 12 }}
          />
        );

      case 'sleepy':
        // Drooping flat-topped half circles
        return (
          <motion.path
            key={`${side}-sleepy`}
            d={`M ${cx - 16} ${cy - 5} L ${cx + 16} ${cy - 5} A 16 16 0 0 1 ${cx} ${cy + 11} Z`}
            fill={color}
            initial={{ scaleY: 0.5 }}
            animate={{ scaleY: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          />
        );

      case 'thinking':
        // Asymmetric squints (angled stadium)
        const tilt = side === 'left' ? -15 : 15;
        return (
          <motion.rect
            key={`${side}-thinking`}
            x={cx - 10}
            y={cy - 15}
            width="20"
            height="30"
            rx="10"
            fill={color}
            initial={{ rotate: 0 }}
            animate={{ rotate: tilt }}
            transition={{ type: 'spring', stiffness: 120, damping: 10 }}
          />
        );

      case 'surprise':
        // Perfect circular disks
        return (
          <motion.circle
            key={`${side}-surprise`}
            cx={cx}
            cy={cy}
            r="20"
            fill={color}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 250, damping: 15 }}
          />
        );

      case 'idle':
      default:
        // Default vertical stadium pills
        return (
          <motion.rect
            key={`${side}-idle`}
            x={cx - 10}
            y={cy - 20}
            width="20"
            height="40"
            rx="10"
            fill={color}
            initial={{ scaleY: 0.1 }}
            animate={{ scaleY: 1 }}
            transition={{ type: 'spring', stiffness: 150, damping: 12 }}
          />
        );
    }
  };

  return (
    <g id="ping-eyes">
      {renderEye('left', eyes.left.cx, eyes.left.cy)}
      {renderEye('right', eyes.right.cx, eyes.right.cy)}
    </g>
  );
}
