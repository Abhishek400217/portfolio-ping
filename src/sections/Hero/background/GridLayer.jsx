import React from 'react';
import styles from './GridLayer.module.css';

/**
 * GridLayer
 * Draws a highly precise, dark-themed structural vector grid line overlay.
 * Uses hardware-accelerated CSS backgrounds instead of heavy canvas render loops.
 */
export default function GridLayer() {
  return (
    <div className={styles.gridLayer}>
      <div className={styles.coordinateMesh} />
    </div>
  );
}
