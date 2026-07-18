import React from 'react';
import styles from './GlowLayer.module.css';

/**
 * GlowLayer
 * Places soft, ambient emerald glows beneath Ping's anchor coordinates.
 * Designed to provide contrast behind the mascot body shell.
 */
export default function GlowLayer() {
  return (
    <div className={styles.glowLayer}>
      <div className={styles.glowCenter} />
      <div className={styles.glowMascot} />
    </div>
  );
}
