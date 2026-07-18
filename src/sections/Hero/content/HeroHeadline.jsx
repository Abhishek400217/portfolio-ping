import React from 'react';
import styles from './HeroContent.module.css';

/**
 * HeroHeadline
 * Displays the main display headline.
 * Dynamically highlights matching terms passed in the `highlightWords` array.
 */
const HeroHeadline = React.forwardRef(function HeroHeadline({ text, highlightWords = [] }, ref) {
  if (!text) return null;

  // Split by whitespace preserving spaces
  const tokens = text.split(/(\s+)/);

  return (
    <h1 ref={ref} className={styles.heroHeadline}>
      {tokens.map((token, index) => {
        // Clean token of common punctuation for comparison
        const cleanToken = token.trim().toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
        
        const isHighlighted = highlightWords.some(word => {
          const cleanWord = word.trim().toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
          return cleanToken === cleanWord && cleanToken.length > 0;
        });

        return isHighlighted ? (
          <span key={index} className={styles.highlight}>
            {token}
          </span>
        ) : (
          token
        );
      })}
    </h1>
  );
});

export default HeroHeadline;
