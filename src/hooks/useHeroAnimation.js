import { useEffect } from 'react';
import gsap from 'gsap';

/**
 * useHeroAnimation
 * Clean, single-timeline GSAP reveal sequence for the Hero section.
 *
 * Sequence order:
 * 1. Navbar (if ref provided)
 * 2. Background (backdrop, grid, particles)
 * 3. Hero Left Content container
 * 4. Headline
 * 5. Description
 * 6. CTA Buttons
 * 7. Stats
 * 8. Ping Mascot
 * 9. Ping Dialogue
 */
export function useHeroAnimation({
  navbarRef,
  backgroundRef,
  particlesRef,
  gridRef,
  heroLeftRef,
  headlineRef,
  descriptionRef,
  ctaRef,
  statsRef,
  pingWrapperRef,
  heroSectionRef,
  dialogueRef
} = {}) {
  useEffect(() => {
    const scope = heroSectionRef?.current || undefined;

    const ctx = gsap.context(() => {
      // Single master timeline with default easing
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 0.5 }
      });

      // 1. Navbar
      if (navbarRef?.current) {
        tl.fromTo(
          navbarRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.4 }
        );
      }

      // 2. Background
      if (backgroundRef?.current) {
        tl.fromTo(
          backgroundRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          navbarRef?.current ? '>-0.2' : 0
        );
      }
      if (gridRef?.current) {
        tl.fromTo(
          gridRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 0.45, scale: 1, duration: 0.4 },
          '<'
        );
      }
      if (particlesRef?.current) {
        tl.fromTo(
          particlesRef.current,
          { opacity: 0 },
          { opacity: 0.8, duration: 0.4 },
          '<'
        );
      }

      // 3. Hero Left Content
      if (heroLeftRef?.current) {
        tl.fromTo(
          heroLeftRef.current,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5 },
          '-=0.2'
        );
      }

      // 4. Headline
      if (headlineRef?.current) {
        tl.fromTo(
          headlineRef.current,
          { opacity: 0, y: 25, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6 },
          '-=0.3'
        );
      }

      // 5. Description
      if (descriptionRef?.current) {
        tl.fromTo(
          descriptionRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.3'
        );
      }

      // 6. CTA Buttons
      if (ctaRef?.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 15, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5 },
          '-=0.3'
        );
      }

      // 7. Stats
      if (statsRef?.current) {
        tl.fromTo(
          statsRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.3'
        );
      }

      // 8. Ping Mascot (Appears AFTER Hero Content)
      if (pingWrapperRef?.current) {
        tl.fromTo(
          pingWrapperRef.current,
          { opacity: 0, scale: 0.88, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.2)' },
          '-=0.2'
        );
      }

      // 9. Ping Dialogue
      if (dialogueRef?.current) {
        tl.fromTo(
          dialogueRef.current,
          { opacity: 0, y: 10, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4 },
          '-=0.1'
        );
      }
    }, scope);

    // Return cleanup function to revert GSAP animations on unmount
    return () => {
      ctx.revert();
    };
  }, [
    navbarRef,
    backgroundRef,
    particlesRef,
    gridRef,
    heroLeftRef,
    headlineRef,
    descriptionRef,
    ctaRef,
    statsRef,
    pingWrapperRef,
    heroSectionRef,
    dialogueRef
  ]);
}
