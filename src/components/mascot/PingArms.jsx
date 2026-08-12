import React from "react";
import { motion } from "framer-motion";
import PingHands from "./PingHands";

export default function PingArms({
  pose = "idle",
  color = "#2b3a30"
}) {

  /* ---------------- Shoulder Anchors ---------------- */

  const leftShoulder = { x: 214, y: 334 };
  const rightShoulder = { x: 286, y: 334 };

  /* ---------------- Arm Geometry ---------------- */

  const resolveArmGeometry = () => {

    switch (pose) {

      case "wave":
        return {
          left: {
            path: `M ${leftShoulder.x} ${leftShoulder.y}
                   Q 198 345 192 360`,
            elbow: { x: 198, y: 345 },
            wrist: { x: 192, y: 360 },
            hand: { x: 192, y: 360, rotate: 0 }
          },

          right: {
            path: `M ${rightShoulder.x} ${rightShoulder.y}
                   Q 304 308 320 276`,
            elbow: { x: 304, y: 308 },
            wrist: { x: 320, y: 276 },
            hand: { x: 320, y: 276, rotate: 28 }
          }
        };

      case "point":
        return {
          left: {
            path: `M ${leftShoulder.x} ${leftShoulder.y}
                   Q 192 324 176 320`,
            elbow: { x: 192, y: 324 },
            wrist: { x: 176, y: 320 },
            hand: { x: 176, y: 320, rotate: -42 }
          },

          right: {
            path: `M ${rightShoulder.x} ${rightShoulder.y}
                   Q 300 344 306 358`,
            elbow: { x: 300, y: 344 },
            wrist: { x: 306, y: 358 },
            hand: { x: 306, y: 358, rotate: 0 }
          }
        };

      case "celebrate":
        return {
          left: {
            path: `M ${leftShoulder.x} ${leftShoulder.y}
                   Q 194 295 186 270`,
            elbow: { x: 194, y: 295 },
            wrist: { x: 186, y: 270 },
            hand: { x: 186, y: 270, rotate: -25 }
          },

          right: {
            path: `M ${rightShoulder.x} ${rightShoulder.y}
                   Q 306 295 314 270`,
            elbow: { x: 306, y: 295 },
            wrist: { x: 314, y: 270 },
            hand: { x: 314, y: 270, rotate: 25 }
          }
        };

      case "coffee":
        return {
          left: {
            path: `M ${leftShoulder.x} ${leftShoulder.y}
                   Q 228 345 236 340`,
            elbow: { x: 228, y: 345 },
            wrist: { x: 236, y: 340 },
            hand: { x: 236, y: 340, rotate: 42 }
          },

          right: {
            path: `M ${rightShoulder.x} ${rightShoulder.y}
                   Q 272 345 264 340`,
            elbow: { x: 272, y: 345 },
            wrist: { x: 264, y: 340 },
            hand: { x: 264, y: 340, rotate: -42 }
          }
        };

      case "popcorn":
        return {
          left: {
            path: `M ${leftShoulder.x} ${leftShoulder.y}
                   Q 230 352 236 346`,
            elbow: { x: 230, y: 352 },
            wrist: { x: 236, y: 346 },
            hand: { x: 236, y: 346, rotate: 26 }
          },

          right: {
            path: `M ${rightShoulder.x} ${rightShoulder.y}
                   Q 300 298 276 272`,
            elbow: { x: 300, y: 298 },
            wrist: { x: 276, y: 272 },
            hand: { x: 276, y: 272, rotate: -58 }
          }
        };

      case "typing":
        return {
          left: {
            path: `M ${leftShoulder.x} ${leftShoulder.y}
                   Q 228 340 236 340`,
            elbow: { x: 228, y: 340 },
            wrist: { x: 236, y: 340 },
            hand: { x: 236, y: 340, rotate: 10 }
          },

          right: {
            path: `M ${rightShoulder.x} ${rightShoulder.y}
                   Q 272 340 264 340`,
            elbow: { x: 272, y: 340 },
            wrist: { x: 264, y: 340 },
            hand: { x: 264, y: 340, rotate: -10 }
          }
        };

      default:
        return {
          left: {
            path: `M ${leftShoulder.x} ${leftShoulder.y}
                   Q 206 338 202 354`,
            elbow: { x: 206, y: 338 },
            wrist: { x: 202, y: 354 },
            hand: { x: 202, y: 354, rotate: 10 }
          },

          right: {
            path: `M ${rightShoulder.x} ${rightShoulder.y}
                   Q 294 338 298 354`,
            elbow: { x: 294, y: 338 },
            wrist: { x: 298, y: 354 },
            hand: { x: 298, y: 354, rotate: -10 }
          }
        };

    }

  };

  const { left, right } = resolveArmGeometry();

  const rightRotation =
    pose === "wave"
      ? [18, 42, 18, 42, 18]
      : right.hand.rotate;
  return (
    <>
      <defs>

        <linearGradient
          id="armMetal"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#7c8d84" />
          <stop offset="35%" stopColor="#4d5d55" />
          <stop offset="70%" stopColor="#2b3a30" />
          <stop offset="100%" stopColor="#141816" />
        </linearGradient>

      </defs>

      <g id="ping-arms">

        {/* ================= LEFT ARM ================= */}

        <g>

          {/* Shoulder */}

          <circle
            cx={leftShoulder.x}
            cy={leftShoulder.y}
            r="7"
            fill="#66756d"
          />

          <circle
            cx={leftShoulder.x}
            cy={leftShoulder.y}
            r="3"
            fill="#00F5A0"
          />

          {/* Shadow */}

          <motion.path
            d={left.path}
            fill="none"
            stroke="#000"
            strokeOpacity=".18"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Metal Arm */}

          <motion.path
            d={left.path}
            fill="none"
            stroke="url(#armMetal)"
            strokeWidth="7"
            strokeLinecap="round"
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 14
            }}
          />

          {/* Highlight */}

          <motion.path
            d={left.path}
            fill="none"
            stroke="#ffffff18"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Elbow */}

          <circle
            cx={left.elbow.x}
            cy={left.elbow.y}
            r="5"
            fill="#59665f"
          />

          <circle
            cx={left.elbow.x}
            cy={left.elbow.y}
            r="2"
            fill="#00F5A0"
          />

          <motion.g
            animate={{
              x: left.hand.x,
              y: left.hand.y,
              rotate: left.hand.rotate
            }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 14
            }}
          >

            {/* Wrist */}

            <circle
              cx="0"
              cy="-9"
              r="4"
              fill="#707772"
            />

            <circle
              cx="0"
              cy="-9"
              r="1.8"
              fill="#00F5A0"
            />

            <PingHands
              side="left"
              pose={pose}
            />

          </motion.g>

        </g>

        {/* ================= RIGHT ARM ================= */}

        <g>

          {/* Shoulder */}

          <circle
            cx={rightShoulder.x}
            cy={rightShoulder.y}
            r="7"
            fill="#66756d"
          />

          <circle
            cx={rightShoulder.x}
            cy={rightShoulder.y}
            r="3"
            fill="#00F5A0"
          />

          {/* Shadow */}

          <motion.path
            d={right.path}
            fill="none"
            stroke="#000"
            strokeOpacity=".18"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Metal Arm */}

          <motion.path
            d={right.path}
            fill="none"
            stroke="url(#armMetal)"
            strokeWidth="7"
            strokeLinecap="round"
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 14
            }}
          />

          {/* Highlight */}

          <motion.path
            d={right.path}
            fill="none"
            stroke="#ffffff18"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Elbow */}

          <circle
            cx={right.elbow.x}
            cy={right.elbow.y}
            r="5"
            fill="#59665f"
          />

          <circle
            cx={right.elbow.x}
            cy={right.elbow.y}
            r="2"
            fill="#00F5A0"
          />

          <motion.g
            animate={{
              x: right.hand.x,
              y: right.hand.y,
              rotate: rightRotation
            }}
            transition={
              pose === "wave"
                ? {
                  rotate: {
                    repeat: Infinity,
                    duration: 1,
                    ease: "linear"
                  }
                }
                : {
                  type: "spring",
                  stiffness: 120,
                  damping: 14
                }
            }
          >

            {/* Wrist */}

            <circle
              cx="0"
              cy="-9"
              r="4"
              fill="#707772"
            />

            <circle
              cx="0"
              cy="-9"
              r="1.8"
              fill="#00F5A0"
            />

            <PingHands
              side="right"
              pose={pose}
            />

          </motion.g>

        </g>

      </g>

    </>
  );

}