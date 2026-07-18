import React from 'react';
import styles from './NoiseLayer.module.css';

/**
 * NoiseLayer
 * Injects a micro-grain noise filter to prevent gradient color banding.
 * Uses an inline SVG feTurbulence element mapped onto a textured container.
 */
export default function NoiseLayer() {
  return (
    <div className={styles.noiseLayer}>
      <svg className={styles.noiseSvg} xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.8" 
            numOctaves="3" 
            stitchTiles="stitch" 
          />
          <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.07 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}
