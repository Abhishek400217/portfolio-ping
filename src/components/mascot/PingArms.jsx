import React from 'react';
import { motion } from 'framer-motion';
import PingHands from './PingHands.jsx';

/**
 * PingArms
 * Left and Right arms. Handles multi-pose transforms.
 * Poses: idle, wave, point, celebrate, coffee, popcorn, typing.
 */
export default function PingArms({ pose = 'idle', color = '#2b3a30' }) {
  // Shoulder joint anchors adjusted to connect to the new tiny body:
  const leftShoulder = { x: 215, y: 318 };
  const rightShoulder = { x: 285, y: 318 };

  /**
   * Resolve left and right arm target coordinates and joint angles.
   */
  const resolveArmGeometry = () => {
    switch (pose) {
      case 'wave':
        return {
          left: {
            path: `M ${leftShoulder.x} ${leftShoulder.y} Q 195 330 190 345`,
            hand: { x: 190, y: 345, rotate: 0 }
          },
          right: {
            path: `M ${rightShoulder.x} ${rightShoulder.y} Q 315 295 320 275`,
            hand: { x: 320, y: 275, rotate: 30 }
          }
        };

      case 'point':
        return {
          left: {
            path: `M ${leftShoulder.x} ${leftShoulder.y} Q 185 318 175 318`,
            hand: { x: 175, y: 318, rotate: -45 }
          },
          right: {
            path: `M ${rightShoulder.x} ${rightShoulder.y} Q 305 330 310 345`,
            hand: { x: 310, y: 345, rotate: 0 }
          }
        };

      case 'celebrate':
        return {
          left: {
            path: `M ${leftShoulder.x} ${leftShoulder.y} Q 190 290 185 270`,
            hand: { x: 185, y: 270, rotate: -30 }
          },
          right: {
            path: `M ${rightShoulder.x} ${rightShoulder.y} Q 310 290 315 270`,
            hand: { x: 315, y: 270, rotate: 30 }
          }
        };

      case 'coffee':
        return {
          left: {
            path: `M ${leftShoulder.x} ${leftShoulder.y} Q 230 345 235 340`,
            hand: { x: 235, y: 340, rotate: 45 }
          },
          right: {
            path: `M ${rightShoulder.x} ${rightShoulder.y} Q 270 345 265 340`,
            hand: { x: 265, y: 340, rotate: -45 }
          }
        };

      case 'popcorn':
        return {
          left: {
            path: `M ${leftShoulder.x} ${leftShoulder.y} Q 230 350 235 345`,
            hand: { x: 235, y: 345, rotate: 30 }
          },
          right: {
            path: `M ${rightShoulder.x} ${rightShoulder.y} Q 300 295 275 270`,
            hand: { x: 275, y: 270, rotate: -60 }
          }
        };

      case 'typing':
        return {
          left: {
            path: `M ${leftShoulder.x} ${leftShoulder.y} Q 230 338 235 338`,
            hand: { x: 235, y: 338, rotate: 15 }
          },
          right: {
            path: `M ${rightShoulder.x} ${rightShoulder.y} Q 270 338 265 338`,
            hand: { x: 265, y: 338, rotate: -15 }
          }
        };

      case 'idle':
      default:
        return {
          left: {
            path: `M ${leftShoulder.x} ${leftShoulder.y} Q 195 330 190 345`,
            hand: { x: 190, y: 345, rotate: 0 }
          },
          right: {
            path: `M ${rightShoulder.x} ${rightShoulder.y} Q 305 330 310 345`,
            hand: { x: 310, y: 345, rotate: 0 }
          }
        };
    }
  };

  const { left, right } = resolveArmGeometry();

  const isWaving = pose === 'wave';
  const rightHandRotation = isWaving 
    ? [20, 45, 20, 45, 20] 
    : right.hand.rotate;

  const isTyping = pose === 'typing';
  const leftHandJitterX = isTyping ? [0, -1, 1, 0] : 0;
  const leftHandJitterY = isTyping ? [0, 1, -1, 0] : 0;
  const rightHandJitterX = isTyping ? [0, 1, -1, 0] : 0;
  const rightHandJitterY = isTyping ? [0, -1, 1, 0] : 0;

  return (
    <g id="ping-arms">
      {/* ================= LEFT ARM ================= */}
      <g>
        <motion.path
          d={left.path}
          fill="none"
          stroke={color}
          strokeWidth="4" // Sleek, thin premium line proportions
          strokeLinecap="round"
          transition={{ type: 'spring', stiffness: 120, damping: 14 }}
        />
        <motion.g
          animate={{ 
            x: left.hand.x + (isTyping ? leftHandJitterX[0] : 0), 
            y: left.hand.y + (isTyping ? leftHandJitterY[0] : 0), 
            rotate: left.hand.rotate 
          }}
          transition={{ type: 'spring', stiffness: 120, damping: 14 }}
        >
          <PingHands side="left" pose={pose} color={color} />
        </motion.g>
      </g>

      {/* ================= RIGHT ARM ================= */}
      <g>
        <motion.path
          d={right.path}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          transition={{ type: 'spring', stiffness: 120, damping: 14 }}
        />
        <motion.g
          animate={{
            x: right.hand.x + (isTyping ? rightHandJitterX[0] : 0),
            y: right.hand.y + (isTyping ? rightHandJitterY[0] : 0),
            rotate: rightHandRotation
          }}
          transition={
            isWaving 
              ? { rotate: { repeat: Infinity, duration: 1.2, ease: "linear" } }
              : { type: 'spring', stiffness: 120, damping: 14 }
          }
        >
          <PingHands side="right" pose={pose} color={color} />
        </motion.g>
      </g>
    </g>
  );
}
