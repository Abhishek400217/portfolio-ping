import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MASCOT_CONFIG } from '../config.js';
import { usePing } from './usePing.js';

/**
 * useHeroAnimation
 * Orchestrates the unified, timeline-driven GSAP Hero Reveal sequence.
 * Choreographs background, grids, glows, cinematic boot cycles, interactive pauses,
 * and premium text blur/mask/counter reveals.
 */
export function useHeroAnimation({
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
  lookRotation
}) {
  const mascot = usePing();
  const tlRef = useRef(null);

  // Resume timeline if user clicks Ping to trigger layout reveal
  useEffect(() => {
    if (mascot.bootStep === 'ready' && tlRef.current && tlRef.current.paused()) {
      tlRef.current.play();
    }
  }, [mascot.bootStep]);

  useEffect(() => {
    if (!headlineRef || !headlineRef.current) return;

    const headlineElement = headlineRef.current;
    const originalText = headlineElement.textContent;
    headlineElement.innerHTML = '';

    // Split text into character segments for staggered cinematic entry
    originalText.split('').forEach(char => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.whiteSpace = 'pre';
      span.style.willChange = 'transform, opacity, filter';
      headlineElement.appendChild(span);
    });

    const letters = headlineElement.querySelectorAll('span');

    // 1. Initialize main GSAP timeline
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' }
    });
    tlRef.current = tl;

    const runBoot = MASCOT_CONFIG.bootEnabled && !MASCOT_CONFIG.instantHero && !MASCOT_CONFIG.skipIntro && !MASCOT_CONFIG.preview;

    // Sequence 1: Inital layout setups based on active boot states
    if (runBoot) {
      // Hide background, grid, glows, content and navbar initially (Keep screen black)
      if (backgroundRef && backgroundRef.current) gsap.set(backgroundRef.current, { opacity: 0 });
      if (gridRef && gridRef.current) gsap.set(gridRef.current, { opacity: 0 });
      if (particlesRef && particlesRef.current) gsap.set(particlesRef.current, { opacity: 0 });
      if (heroLeftRef && heroLeftRef.current) gsap.set(heroLeftRef.current, { opacity: 0 });
      
      const nav = document.querySelector('.navbar-header');
      if (nav) gsap.set(nav, { opacity: 0, y: -25 });

      // Dynamically calculate coordinate offsets to center the mascot wrapper over the viewport
      if (pingWrapperRef && pingWrapperRef.current && heroSectionRef && heroSectionRef.current) {
        const gridRect = pingWrapperRef.current.getBoundingClientRect();
        const parentRect = heroSectionRef.current.getBoundingClientRect();
        const targetX = (parentRect.width / 2) - (gridRect.left + gridRect.width / 2);
        const targetY = (parentRect.height / 2) - (gridRect.top + gridRect.height / 2);
        gsap.set(pingWrapperRef.current, { x: targetX, y: targetY });
      }

      // Execute FSM Booting step-by-step triggers
      tl.call(() => mascot.handleMascotClick(), null, '+=0.2'); // Trigger Sleeping/Booting state transitions
      tl.call(() => mascot.handleMascotClick(), null, '+=0.6'); // dock-on
      tl.call(() => mascot.handleMascotClick(), null, '+=0.6'); // ping-wakes
      tl.call(() => mascot.handleMascotClick(), null, '+=0.6'); // ring-spins
      tl.call(() => mascot.handleMascotClick(), null, '+=0.6'); // eyes-open
      tl.call(() => mascot.handleMascotClick(), null, '+=0.6'); // wave
      tl.call(() => mascot.handleMascotClick(), null, '+=0.8'); // bubble text hello there

      // Timeline pauses here, waiting for user click on Ping
      tl.addPause('+=0.1');

      // Sequence 2: Once user clicks Ping, move Ping back to grid and reveal Hero elements
      if (pingWrapperRef && pingWrapperRef.current) {
        tl.to(pingWrapperRef.current, { x: 0, y: 0, duration: 1.2, ease: 'power3.inOut' });
      }

      if (backgroundRef && backgroundRef.current) {
        tl.to(backgroundRef.current, { opacity: 1, duration: 1.0 }, '-=1.0');
      }
      if (gridRef && gridRef.current) {
        tl.to(gridRef.current, { opacity: 0.45, scale: 1, duration: 1.0 }, '-=0.8');
      }
      if (particlesRef && particlesRef.current) {
        tl.to(particlesRef.current, { opacity: 0.8, duration: 1.0 }, '-=0.8');
      }

      // Reveal Navbar
      tl.call(() => {
        const nav = document.querySelector('.navbar-header');
        if (nav) {
          gsap.to(nav, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
        }
      }, null, '-=0.6');

      // Reveal Left Content Frame
      if (heroLeftRef && heroLeftRef.current) {
        tl.to(heroLeftRef.current, { opacity: 1, x: 0, duration: 0.8 }, '-=0.6');
      }

    } else {
      // Instant reveal in preview mode
      if (backgroundRef && backgroundRef.current) {
        tl.fromTo(backgroundRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 });
      }
      if (gridRef && gridRef.current) {
        tl.fromTo(gridRef.current, { opacity: 0 }, { opacity: 0.45, duration: 0.4 }, '-=0.2');
      }
      if (particlesRef && particlesRef.current) {
        tl.fromTo(particlesRef.current, { opacity: 0 }, { opacity: 0.8, duration: 0.4 }, '-=0.2');
      }
      
      tl.call(() => {
        const nav = document.querySelector('.navbar-header');
        if (nav) {
          gsap.fromTo(nav, { y: -25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' });
        }
      }, null, '-=0.1');

      if (heroLeftRef && heroLeftRef.current) {
        tl.fromTo(heroLeftRef.current, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4 }, '-=0.1');
      }
    }

    // Sequence 3: Ping glances toward headline
    if (lookRotation && lookRotation.x && lookRotation.y) {
      const glance = { x: 0, y: 0 };
      tl.to(glance, {
        x: -9,
        y: -6,
        duration: 0.7,
        ease: 'power2.out',
        onUpdate: () => {
          lookRotation.x.set(glance.x);
          lookRotation.y.set(glance.y);
        }
      }, '-=0.3');
    }

    // Sequence 8: Headline character reveal (Blur, Y shift, spring finish)
    tl.fromTo(
      letters,
      { opacity: 0, y: 35, filter: 'blur(8px)' },
      { 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)', 
        stagger: 0.012, 
        duration: 0.8, 
        ease: 'back.out(1.4)' 
      },
      '-=0.3'
    );

    // Sequence 9: Paragraph reveals (line-reveal clip-path mask)
    if (descriptionRef && descriptionRef.current) {
      tl.fromTo(
        descriptionRef.current,
        { opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' },
        { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9 },
        '-=0.4'
      );
    }

    // Sequence 10: Glass CTA buttons reveal with shadow pulse
    if (ctaRef && ctaRef.current) {
      tl.fromTo(
        ctaRef.current,
        { scale: 0.88, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.65, ease: 'back.out(1.5)' },
        '-=0.4'
      );
      tl.to(ctaRef.current, {
        boxShadow: '0 4px 20px rgba(16, 185, 129, 0.25)',
        borderColor: 'rgba(16, 185, 129, 0.35)',
        duration: 0.4
      }, '-=0.1');
    }

    // Sequence 11: Stats card values count-up
    if (statsRef && statsRef.current) {
      const cards = statsRef.current.querySelectorAll('[class*="statCard"]');
      const valNodes = statsRef.current.querySelectorAll('[class*="statValue"]');

      tl.fromTo(cards, { opacity: 0, y: 15 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }, '-=0.3');

      valNodes.forEach((node) => {
        const rawText = node.textContent;
        const numberTarget = parseInt(rawText.replace(/[^0-9]/g, ''), 10) || 0;
        const suffix = rawText.replace(/[0-9]/g, '');

        if (numberTarget > 0) {
          const counterObj = { value: 0 };
          tl.to(counterObj, {
            value: numberTarget,
            duration: 1.2,
            ease: 'power2.out',
            onUpdate: () => {
              node.textContent = Math.floor(counterObj.value) + suffix;
            }
          }, '-=0.4');
        }
      });
    }

    // Sequence 12: Ping returns to idle gaze
    if (lookRotation && lookRotation.x && lookRotation.y) {
      const glanceReset = { x: -9, y: -6 };
      tl.to(glanceReset, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        onUpdate: () => {
          lookRotation.x.set(glanceReset.x);
          lookRotation.y.set(glanceReset.y);
        }
      }, '+=0.1');
    }

    return () => {
      tl.kill();
      if (headlineElement) {
        headlineElement.innerHTML = originalText;
      }
    };
  }, [
    backgroundRef,
    particlesRef,
    gridRef,
    heroLeftRef,
    headlineRef,
    descriptionRef,
    ctaRef,
    statsRef,
    lookRotation,
    mascot
  ]);
}
