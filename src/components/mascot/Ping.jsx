import React, { useRef } from 'react';
import { motion, useTransform } from 'framer-motion';
import styles from './Ping.module.css';
import PingHead from './PingHead.jsx';
import PingBody from './PingBody.jsx';
import PingArms from './PingArms.jsx';
import PingRing from './PingRing.jsx';
import PingShadow from './PingShadow.jsx';
import PingBubble from './PingBubble.jsx';
import PingDock from './PingDock.jsx';
import { usePing } from '../../hooks/usePing.js';
import { usePingLookController } from '../../hooks/usePingLookController.js';
import { MASCOT_CONFIG } from '../../config.js';

/**
 * Ping
 * The visual coordinator assembling all body parts and interfaces.
 * Dynamically binds state telemetry and interactive look/attraction controllers.
 */
export default function Ping({
  expression,
  armPose,
  ringSpeed,
  ringGlowColor,
  dockState,
  bubbleText,
  bubbleVisible,
  bubbleTyping,
  hoverHeight = 0
}) {
  const containerRef = useRef(null);

  // 1. Hook up the mascot behavior brain context
  const mascot = usePing();

  // 2. Hook up look tracking & cursor attraction controller
  const lookController = usePingLookController(containerRef);

  // 3. Resolve props and fall back to controller overrides or usePing context indicators
  const activeExpression = expression || lookController.expressionOverride || mascot.gesture?.eyeExpression || 'idle';
  const activeArmPose = armPose || lookController.armPoseOverride || mascot.gesture?.armAnimation || 'idle';
  const activeRingSpeed = typeof ringSpeed === 'number' ? ringSpeed : lookController.ringSpeedOverride || mascot.gesture?.floatingRing?.speed || 10;
  const activeGlowColor = ringGlowColor || mascot.gesture?.floatingRing?.color || '#10b981';
  
  // Resolve dock layouts based on FSM active state
  let resolvedDockState = 'collapse'; // Default collapse state after boot sequence finishes
  if (mascot.state === 'Sleeping') {
    resolvedDockState = 'close';
  } else if (mascot.state === 'Celebrating') {
    resolvedDockState = 'glow';
  }
  const activeDockState = dockState || mascot.gesture?.dockState || resolvedDockState;

  // Resolve speech bubble text and visibility
  const activeBubbleText = bubbleText || mascot.dialogue || '';
  const activeBubbleVisible = typeof bubbleVisible === 'boolean' 
    ? bubbleVisible 
    : (mascot.state !== 'Sleeping' && (mascot.state !== 'Booting' || mascot.bootStep === 'bubble') && !!activeBubbleText);
  const activeBubbleTyping = typeof bubbleTyping === 'boolean' ? bubbleTyping : mascot.typing;

  // 4. Repeating soft float loop matching design rules (breathing weight)
  const floatOffset = {
    y: [0, -8, 0],
    transition: {
      repeat: Infinity,
      duration: 4.5,
      ease: 'easeInOut'
    }
  };

  const gestureY = mascot.gesture?.floatingRing?.height || 0;
  
  // Merge static Y offsets from FSM with repeating sinusoidal float offsets
  const activeHoverY = hoverHeight !== 0
    ? hoverHeight
    : {
        y: floatOffset.y.map(val => val + (gestureY * 3)), // Amplify standard mm offsets for screen layout visual clarity
        transition: floatOffset.transition
      };

  // 4. Transform springs for body and suspended ring parallax
  const bodyX = useTransform(lookController.lookRotation.x, val => val * 0.1);
  const bodyY = useTransform(lookController.lookRotation.y, val => val * 0.1);
  
  const ringX = useTransform(lookController.lookRotation.x, val => val * 0.4);
  const ringY = useTransform(lookController.lookRotation.y, val => val * 0.4);

  // Cursor indicator styling
  const isClickable = mascot.state === 'Sleeping' || mascot.bootStep === 'bubble';

  return (
    <div 
      ref={containerRef}
      className={styles.pingContainer}
      style={{ cursor: isClickable ? 'pointer' : 'default' }}
      onClick={mascot.handleMascotClick}
    >
      {/* 1. Speech Bubble Layer */}
      <PingBubble 
        text={activeBubbleText} 
        visible={activeBubbleVisible} 
        typing={activeBubbleTyping} 
      />

      {/* 2. Visual Character Stage SVG (500x500 layout grid) */}
      <svg 
        viewBox="0 0 500 500" 
        className={styles.mascotStage}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ambient Ground Shadow (Scales inversely with height offsets) */}
        <PingShadow hoverHeight={hoverHeight !== 0 ? hoverHeight : gestureY * 3} />

        {/* Floating Mascot Rigging Group */}
        <motion.g
          animate={activeHoverY}
          style={{ transformOrigin: '250px 300px' }}
        >
          {/* Torso Base with Parallax */}
          <motion.g style={{ x: bodyX, y: bodyY, transformOrigin: '250px 350px' }}>
            <PingBody />
          </motion.g>

          {/* Segmented/Curved Arms & Mittens */}
          <PingArms pose={activeArmPose} />

          {/* Squircle Head & Face Display & Eyebrows with parallax lookRotation */}
          <PingHead 
            expression={activeExpression} 
            accentColor={activeGlowColor} 
            lookRotation={lookController.lookRotation}
          />

          {/* suspended Ring with separate Parallax */}
          <motion.g style={{ x: ringX, y: ringY, transformOrigin: '250px 420px' }}>
            <PingRing 
              rotationSpeed={activeRingSpeed} 
              glow={true} 
              glowColor={activeGlowColor} 
            />
          </motion.g>
        </motion.g>
      </svg>

      {/* 3. Holographic Dock Base Plate Layer */}
      {MASCOT_CONFIG.enableDock && <PingDock state={activeDockState} />}
    </div>
  );
}
