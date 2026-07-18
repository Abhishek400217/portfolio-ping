import React from 'react';
import styles from './HeroContent.module.css';

/**
 * HeroDescription
 * Accepts an array of paragraph strings and maps them into semantic text elements.
 */
const HeroDescription = React.forwardRef(function HeroDescription({ paragraphs = [] }, ref) {
  if (!paragraphs || paragraphs.length === 0) return null;

  return (
    <div ref={ref} className={styles.heroDescription}>
      {paragraphs.map((para, index) => (
        <p key={index} className={styles.descriptionParagraph}>
          {para}
        </p>
      ))}
    </div>
  );
});

export default HeroDescription;
