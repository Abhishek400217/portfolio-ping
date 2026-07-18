import React, { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';

const SmoothScrollContext = createContext({
  lenis: null,
});

/**
 * Access the initialized Lenis instance
 */
export const useSmoothScroll = () => useContext(SmoothScrollContext);

/**
 * SmoothScroll Context Provider
 * Integrates Lenis smooth scrolling inside the application layout.
 * 
 * @param {React.ReactNode} children - Target content trees
 * @param {object} options - Custom Lenis configuration settings
 */
export const SmoothScroll = ({ children, options = {} }) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Instantiate Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false, // Turn off on mobile touch gestures to preserve native feel
      touchMultiplier: 2,
      ...options,
    });

    lenisRef.current = lenis;

    // Run scrolling inside requestAnimationFrame loop (60FPS+)
    let rafId;
    const updateScroll = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(updateScroll);
    };

    rafId = requestAnimationFrame(updateScroll);

    // Keep GSAP ScrollTrigger and scroll indicators in sync
    lenis.on('scroll', () => {
      if (window.ScrollTrigger) {
        window.ScrollTrigger.update();
      }
    });

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, [options]);

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

export default SmoothScroll;
