import React from 'react';
import styles from './HeroContent.module.css';

/**
 * HeroCTAGroup
 * Renders CTA button layout blocks.
 * Supports primary, secondary, and glass button actions via mapping profiles.
 */
const HeroCTAGroup = React.forwardRef(function HeroCTAGroup({ ctas = [] }, ref) {
  if (!ctas || ctas.length === 0) return null;

  const handleCTAClick = (e, cta) => {
    if (cta.download) {
      return; // Allow native download behavior
    }
    if (cta.href.startsWith('#')) {
      e.preventDefault();
      const targetElement = document.querySelector(cta.href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div ref={ref} className={styles.ctaGroup}>
      {ctas.map((cta, index) => {
        // Map button type to styles
        const buttonClass = cta.type === 'primary' 
          ? styles.primaryBtn 
          : styles.secondaryBtn;

        return (
          <a 
            key={index} 
            href={cta.href} 
            className={`${styles.ctaButton} ${buttonClass}`}
            onClick={(e) => handleCTAClick(e, cta)}
            download={cta.download || undefined}
          >
            {cta.label}
          </a>
        );
      })}
    </div>
  );
});

export default HeroCTAGroup;
