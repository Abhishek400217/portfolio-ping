import React from 'react';
import styles from './HeroContent.module.css';

/**
 * HeroStat
 * Displays individual numerical values and captions.
 */
export default function HeroStat({ value, label }) {
  return (
    <div className={styles.statCard}>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}
