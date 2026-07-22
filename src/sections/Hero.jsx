import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import SectionWrapper from '../components/layout/SectionWrapper';
import { RobotProvider } from '../context/RobotContext.jsx';
import { usePing } from '../hooks/usePing.js';
import BackgroundRoot from './Hero/background/BackgroundRoot.jsx';
import HeroContent from './Hero/content/HeroContent.jsx';
import Ping from '../components/mascot/Ping.jsx';
import { useHeroAnimation } from '../hooks/useHeroAnimation.js';
import styles from './Hero/Hero.module.css';
import { MASCOT_CONFIG } from '../config.js';

/**
 * HeroInner
 * Coordinates structural content columns, backgrounds, and mascot connections.
 */
function HeroInner() {
  const mascot = usePing();

  // Create references for GSAP timeline anchors
  const backgroundRef = useRef(null);
  const particlesRef = useRef(null);
  const gridRef = useRef(null);
  const heroLeftRef = useRef(null);
  const headlineRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);
  const pingWrapperRef = useRef(null);
  const heroSectionRef = useRef(null);


  // Trigger GSAP timeline when boot is completed or bypassed in config
  const isBootReady = !MASCOT_CONFIG.bootEnabled || MASCOT_CONFIG.preview || mascot.bootStep === 'ready';

  useHeroAnimation({
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
    lookRotation: MASCOT_CONFIG.enableAnimations && isBootReady ? mascot.lookRotation : null
  });

  // Finalized production content
  const availabilityText = "OPEN TO OPPORTUNITIES";
  const roleText = "Software Engineer";
  const headingText = "Hi, I'm Abhishek.";
  const headlineData = {
    text: "From backend architecture to immersive frontend experiences.",
    highlightWords: ["backend architecture", "immersive frontend experiences."]
  };
  const descriptionParagraphs = [
    "I design and build scalable full-stack applications using Java, Spring Boot, React and modern web technologies while focusing on performance, clean architecture and exceptional user experience."
  ];
  const ctaButtons = [
    { label: "Explore Projects", href: "#projects", type: "primary" },
    { label: "Download Resume", href: "#resume", type: "secondary", download: true },
    { label: "Let's Talk", href: "#contact", type: "secondary" }
  ];
  const statsList = [
    { value: "8+", label: "Projects" },
    { value: "20+", label: "Technologies" },
    { value: "2026", label: "Graduate" }
  ];
  const socialLinks = [
    { platform: "github", href: "https://github.com/Abhishek400217" },
    { platform: "linkedin", href: "https://linkedin.com" },
    { platform: "email", href: "mailto:abhishek@example.com" },
    { platform: "resume", href: "#resume" }
  ];

  return (
    <SectionWrapper id="hero" className={styles.heroSection} ref={heroSectionRef} aria-label="Introduction">
      {/* 1. Visual Canvas Backdrop Layers (z-index: 0) */}
      <div className={styles.heroBackground} ref={backgroundRef}>
        <BackgroundRoot 
          gridRef={gridRef} 
          glowRef={particlesRef} 
        />
      </div>

      {/* 2. Responsive Content Grid (z-index: 10) */}
      <div className={styles.heroGrid}>
        
        {/* Left Column content reveals (z-index: 15) */}
        <div className={styles.leftColumn} ref={heroLeftRef}>
          <HeroContent
            availability={availabilityText}
            eyebrow={roleText}
            heading={headingText}
            headline={headlineData}
            description={descriptionParagraphs}
            ctas={ctaButtons}
            stats={statsList}
            socials={socialLinks}
            headlineRef={headlineRef}
            descriptionRef={descriptionRef}
            ctaRef={ctaRef}
            statsRef={statsRef}
          />
        </div>

        {/* Right Column: Top Right floating mascot rigging (z-index: 20) */}
        <div className={styles.rightColumn}>
          <div className={styles.pingWrapper} ref={pingWrapperRef}>
            <Ping />
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}

/**
 * Hero
 * Root Wrapper component referencing global RobotProvider context.
 */
export default function Hero() {
  return <HeroInner />;
}
