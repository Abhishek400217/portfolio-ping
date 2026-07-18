import React from 'react';
import styles from './MaskLayer.module.css';

/**
 * MaskLayer
 * Renders radial and linear vignettes along page boundaries.
 * Blends the background canvas into adjacent section flows.
 */
export default function MaskLayer() {
  return (
    <div className={styles.maskLayer}>
      <div className={styles.vignetteRadial} />
      <div className={styles.edgeLinearBottom} />
    </div>
  );
}
