import React from 'react';
import styles from './GradientLayer.module.css';

/**
 * GradientLayer
 * Renders the baseline gradient layers to build spatial lighting depth.
 */
export default function GradientLayer() {
  return (
    <div className={styles.gradientLayer}>
      <div className={styles.baseLinear} />
      <div className={styles.ambientRadial} />
    </div>
  );
}
