import React from 'react';
import styles from './HeroContent.module.css';
import HeroAvailability from './HeroAvailability.jsx';
import HeroEyebrow from './HeroEyebrow.jsx';
import HeroHeadline from './HeroHeadline.jsx';
import HeroDescription from './HeroDescription.jsx';
import HeroCTAGroup from './HeroCTAGroup.jsx';
import HeroSocials from './HeroSocials.jsx';
import HeroStats from './HeroStats.jsx';

/**
 * HeroContent
 * The central container for all typography, CTA, statistics, and social layouts.
 * Highly configurable via props to support reuse.
 */
export default function HeroContent({
  availability = "Available for work",
  eyebrow = "REDEFINING INTERACTIVITY",
  heading = "Hi, I'm Abhishek.",
  headline = { text: "Crafting digital experiences with Ping.", highlightWords: ["experiences", "Ping."] },
  description = [
    "Hi, I'm Abhishek. I build reusable, high-performance engines and visual interfaces.",
    "Feel free to check out my projects and resume below."
  ],
  ctas = [
    { label: "Explore Work", type: "primary", href: "#projects" },
    { label: "Read Resume", type: "secondary", href: "#resume" }
  ],
  socials = [
    { platform: "github", href: "https://github.com" },
    { platform: "linkedin", href: "https://linkedin.com" },
    { platform: "email", href: "mailto:hello@example.com" }
  ],
  stats = [
    { value: "8+", label: "Projects" },
    { value: "20+", label: "Technologies" },
    { value: "2026", label: "Graduate" }
  ],
  headlineRef,
  descriptionRef,
  ctaRef,
  statsRef
}) {
  return (
    <div className={styles.heroContent}>
      <div className={styles.topSection}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
          <HeroAvailability status="active" text={availability} />
          <HeroEyebrow text={eyebrow} />
        </div>
        <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#fff', margin: '0 0 8px 0', letterSpacing: '-0.02em', fontFamily: 'var(--font-sans)' }}>
          {heading}
        </h2>
        <HeroHeadline ref={headlineRef} text={headline.text} highlightWords={headline.highlightWords} />
        <HeroDescription ref={descriptionRef} paragraphs={description} />
        <HeroCTAGroup ref={ctaRef} ctas={ctas} />
        <HeroSocials links={socials} />
      </div>
      <HeroStats ref={statsRef} stats={stats} />
    </div>
  );
}
