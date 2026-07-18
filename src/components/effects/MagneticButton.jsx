import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * MagneticButton Component
 * Wraps any button or element to add an elastic magnetic pull effect tracking the cursor.
 * 
 * @param {React.ReactNode} children - The target element to apply the magnetic effect on
 * @param {number} range - Distance threshold in pixels where magnetic pull initiates (default: 80)
 * @param {number} strength - Fractional multiplier for movement offset (default: 0.35)
 * @param {string} className - Optional class names for wrapper style overrides
 */
const MagneticButton = ({
  children,
  range = 80,
  strength = 0.35,
  className,
  ...props
}) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Position motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring settings matching Apple elastic cursor parameters
  const springConfig = { type: 'spring', stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Find the center coordinates of the wrapped component
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance < range) {
      setIsHovered(true);
      // Translate the button towards the pointer
      x.set(deltaX * strength);
      y.set(deltaY * strength);
    } else {
      resetPosition();
    }
  };

  const resetPosition = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetPosition}
      style={{
        x: springX,
        y: springY,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
