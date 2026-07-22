import { useEffect } from 'react';
import gsap from 'gsap';
import { INTRO_DIALOGUE } from './introData.js';

/**
 * useIntroSequence
 * Single GSAP Master Timeline controlling the Cinematic Intro Experience.
 *
 * Single Source of Truth for:
 * - Text content
 * - Bubble visibility & typing state
 * - Bubble entry, hold, and destruction transitions
 * - Mascot reveal and flight physics
 * - Parallel Hero reveal trigger (onStartHero)
 * - Complete unmount signal (onComplete)
 */
export function useIntroSequence({
  containerRef,
  glowRef,
  mascotRef,
  bubbleRef,
  setDialogueText,
  setBubbleVisible,
  setBubbleTyping,
  onStartHero,
  onComplete
}) {
  useEffect(() => {
    if (!containerRef?.current) return;

    const ctx = gsap.context(() => {
      // Single Master Timeline
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        onComplete: () => {
          if (typeof onComplete === 'function') {
            onComplete();
          }
        }
      });

      // 1. Ambient Glow Reveal
      tl.addLabel('glow');
      if (glowRef?.current) {
        tl.to(glowRef.current, {
          opacity: 0.85,
          scale: 1,
          duration: 0.9,
          ease: 'power2.out'
        }, 'glow');
      }

      // 2. Ping Mascot Reveal
      if (mascotRef?.current) {
        tl.to(mascotRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out'
        }, 'glow+=0.2');
      }

      // 3. Sequential Speech Pipeline (Show -> Reveal Text -> Hold -> Hide -> Next)
      INTRO_DIALOGUE.forEach((text, index) => {
        const label = `phrase-${index}`;
        tl.addLabel(label);

        // Step A: Set Text & Make Visible
        tl.add(() => {
          setDialogueText(text);
          setBubbleTyping(false);
          setBubbleVisible(true);
        });

        // Step B: Bubble Animate In via GSAP
        if (bubbleRef?.current) {
          tl.fromTo(
            bubbleRef.current,
            { opacity: 0, y: 12, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.4,
              ease: 'back.out(1.3)'
            }
          );

          // Step C: Hold Text (1.6s breathing room)
          tl.to({}, { duration: 1.6 });

          // Step D: Bubble Animate Out
          tl.to(bubbleRef.current, {
            opacity: 0,
            y: -8,
            scale: 0.95,
            duration: 0.3,
            ease: 'power2.in'
          });

          // Step E: Hide & Destroy Bubble State before next phrase
          tl.add(() => {
            setBubbleVisible(false);
          });
        }
      });

      // 4. Label 'flyToHero' - Ping guides visitor into Hero section
      tl.addLabel('flyToHero');

      // Trigger parallel Hero reveal callback right as flight starts
      tl.add(() => {
        if (typeof onStartHero === 'function') {
          onStartHero();
        }
      }, 'flyToHero');

      // Smooth flight trajectory toward top-right hero position
      if (mascotRef?.current) {
        tl.to(mascotRef.current, {
          x: window.innerWidth > 768 ? '35vw' : '0vw',
          y: '-32vh',
          scale: 0.45,
          opacity: 0,
          duration: 1.0,
          ease: 'power3.inOut'
        }, 'flyToHero');
      }

      // Fade out intro container overlay
      if (containerRef?.current) {
        tl.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut'
        }, 'flyToHero+=0.4');
      }
    }, containerRef);

    // Clean up all GSAP timelines, tweens, and labels on unmount
    return () => {
      ctx.revert();
    };
  }, [
    containerRef,
    glowRef,
    mascotRef,
    bubbleRef,
    setDialogueText,
    setBubbleVisible,
    setBubbleTyping,
    onStartHero,
    onComplete
  ]);
}

export default useIntroSequence;
