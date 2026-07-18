import React, { forwardRef } from 'react';
import styles from './BackgroundRoot.module.css';
import GradientLayer from './GradientLayer.jsx';
import GridLayer from './GridLayer.jsx';
import NoiseLayer from './NoiseLayer.jsx';
import GlowLayer from './GlowLayer.jsx';
import MaskLayer from './MaskLayer.jsx';

/**
 * BackgroundRoot
 * Houses and manages the layering depth order (Z-index stacking)
 * of the portfolio hero background. Exposes a ref to allow GSAP animations.
 */
const BackgroundRoot = forwardRef(({ children, ...props }, ref) => {
  return (
    <div ref={ref} className={styles.backgroundRoot} {...props}>
      <GradientLayer />
      <GlowLayer />
      <GridLayer />
      <NoiseLayer />
      <MaskLayer />
      {children}
    </div>
  );
});

BackgroundRoot.displayName = 'BackgroundRoot';
export default BackgroundRoot;
