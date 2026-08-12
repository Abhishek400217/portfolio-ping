import React from "react";
import { motion } from "framer-motion";

export default function PingHands({
  side = "left",
  pose = "idle"
}) {

  const active =
    pose === "typing" ||
    pose === "celebrate" ||
    pose === "wave";

  return (

    <g id={`ping-hand-${side}`}>

      {/* ================= WRIST JOINT ================= */}

      <circle
        cx="0"
        cy="-14"
        r="5"
        fill="#727a76"
      />

      <circle
        cx="0"
        cy="-14"
        r="2"
        fill="#00F5A0"
      />

      {/* ================= METAL CONNECTOR ================= */}

      <rect
        x="-3"
        y="-14"
        width="6"
        height="10"
        rx="3"
        fill="#4d5752"
      />

      <rect
        x="-1"
        y="-13"
        width="2"
        height="8"
        rx="1"
        fill="#8d9893"
        opacity=".45"
      />

      {/* ================= PALM SHADOW ================= */}

      <ellipse
        cx="0"
        cy="8"
        rx="12"
        ry="11"
        fill="#111"
        opacity=".18"
      />

      {/* ================= MAIN PALM ================= */}

      <motion.circle
        cx="0"
        cy="8"
        r="11"
        fill="#2b3a30"
        stroke="#8a938d"
        strokeOpacity=".20"
        strokeWidth="1.3"
        animate={{
          scale: active ? [1, 1.05, 1] : 1
        }}
        transition={{
          duration: 1.3,
          repeat: Infinity
        }}
      />

      {/* ================= PALM HIGHLIGHT ================= */}

      <ellipse
        cx="-3"
        cy="4"
        rx="5"
        ry="2.5"
        fill="#ffffff25"
      />

      {/* ================= INNER RING ================= */}

      <circle
        cx="0"
        cy="8"
        r="5"
        fill="#39433e"
      />

      {/* ================= ENERGY CORE ================= */}

      <motion.circle
        cx="0"
        cy="8"
        r="2.8"
        fill="#00F5A0"
        opacity={active ? 1 : .65}
        animate={{
          scale: active
            ? [1, 1.45, 1]
            : [1, 1.15, 1],

          opacity: active
            ? [.8, 1, .8]
            : [.55, .75, .55]
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity
        }}
        style={{
          filter: "drop-shadow(0 0 8px #00F5A0)"
        }}
      />

    </g>

  );

}