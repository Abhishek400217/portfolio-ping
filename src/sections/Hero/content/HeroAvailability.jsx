import React from 'react';
import styles from './HeroAvailability.module.css';

/**
 * HeroAvailability
 * Renders a visual status indicator badge layout.
 * Configured with dynamic slots for status rings and messages.
 */
export default function HeroAvailability({ status = "active", text = "Available for work" }) {
  return (
    <div className={styles.availabilityBadge} data-status={status}>
      <span className={styles.statusDot} aria-hidden="true" />
      <span className={styles.badgeText}>{text}</span>
    </div>
  );
}
