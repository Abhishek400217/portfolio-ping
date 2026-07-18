import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * CursorGlow Component
 * Renders a GPU-accelerated, smoothly-interpolated ambient background glow tracking the mouse.
 * Automatically disabled on touch screens.
 * 
 * @param {number} size - Width/Height of the glow circle in px (default: 400)
 * @param {string} color - CSS color value of the glow (default: rgba(16, 185, 129, 0.15) emerald)
 * @param {string} glowStrength - Tailwind blur class defining the glow radius (default: blur-[80px])
 * @param {number} opacity - Maximum opacity of the glow element (default: 0.6)
 * @param {object} springConfig - Interpolation spring dynamics (default: light inertia spring)
 */
const CursorGlow = ({
  size = 400,
  color = 'rgba(16, 185, 129, 0.15)',
  glowStrength = 'blur-[100px]',
  opacity = 0.6,
  springConfig = { stiffness: 120, damping: 30, mass: 0.4 }
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true); // Default true until checked in client side

  // Framer Motion Values for direct DOM property writing without re-renders
  const mouseX = useMotionValue(-size);
  const mouseY = useMotionValue(-size);

  // Smooth mechanical interpolation (60FPS+)
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if the current device has touch capabilities
    const checkTouchDevice = () => {
      return (
        window.matchMedia('(pointer: coarse)').matches || 
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0
      );
    };

    const hasTouch = checkTouchDevice();
    setIsTouch(hasTouch);

    if (hasTouch) return;

    const handleMouseMove = (e) => {
      // Center the glow at mouse pointer
      mouseX.set(e.clientX - size / 2);
      mouseY.set(e.clientY - size / 2);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, size, isVisible]);

  // Render nothing on touch screens or prior to visibility initialization
  if (isTouch || !isVisible) return null;

  return (
    <motion.div
      className={`fixed top-0 left-0 rounded-full pointer-events-none z-50 ${glowStrength} mix-blend-screen`}
      style={{
        x,
        y,
        width: size,
        height: size,
        backgroundColor: color,
        opacity,
        willChange: 'transform', // Forces the GPU thread to render as a distinct layer
      }}
    />
  );
};

export default CursorGlow;
