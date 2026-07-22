import React, { useRef, useState } from 'react';
import styles from './Intro.module.css';
import Ping from '../mascot/Ping.jsx';
import { useIntroSequence } from './useIntroSequence.js';

/**
 * Intro Component
 * Standalone, single-engine Cinematic Intro Experience.
 * 
 * - Single dialogue bubble element (rendered by Ping)
 * - Controlled exclusively by useIntroSequence master GSAP timeline
 * - Zero duplicate components or competing animation engines
 */
export default function Intro({ onStartHero, onComplete }) {
  const containerRef = useRef(null);
  const glowRef = useRef(null);
  const mascotRef = useRef(null);
  const bubbleRef = useRef(null);

  const [dialogueText, setDialogueText] = useState('');
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [bubbleTyping, setBubbleTyping] = useState(false);

  // Attach master GSAP intro timeline
  useIntroSequence({
    containerRef,
    glowRef,
    mascotRef,
    bubbleRef,
    setDialogueText,
    setBubbleVisible,
    setBubbleTyping,
    onStartHero,
    onComplete
  });

  return (
    <div className={styles.introContainer} ref={containerRef} aria-label="Intro Experience">
      {/* 1. Ambient Glow Layer */}
      <div className={styles.ambientGlow} ref={glowRef} />

      {/* 2. Mascot Stage (Renders SINGLE Ping component with integrated bubbleRef) */}
      <div className={styles.mascotStage} ref={mascotRef}>
        <Ping 
          bubbleText={dialogueText}
          bubbleVisible={bubbleVisible}
          bubbleTyping={bubbleTyping}
          bubbleRef={bubbleRef}
          expression="happy"
          armPose="wave"
        />
      </div>
    </div>
  );
}
