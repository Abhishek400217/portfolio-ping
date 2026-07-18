import React from 'react';
import styles from './HeroContent.module.css';

/**
 * HeroEyebrow
 * Renders a semantic overline text indicator.
 */
export default function HeroEyebrow({ text }) {
  if (!text) return null;
  return (
    <p className={styles.heroEyebrow}>
      {text}
    </p>
  );
}
