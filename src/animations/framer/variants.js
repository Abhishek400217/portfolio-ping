/**
 * Reusable Framer Motion Variants and Easing Preset Utilities
 */

export const transitions = {
  default: {
    type: 'tween',
    ease: [0.16, 1, 0.3, 1], // easeOutExpo (Apple style)
    duration: 0.8
  },
  spring: {
    type: 'spring',
    stiffness: 100,
    damping: 15,
    mass: 1
  }
};

// Slide Up & Fade In
export const fadeUp = {
  hidden: { 
    opacity: 0, 
    y: 40 
  },
  visible: (custom = {}) => ({
    opacity: 1,
    y: 0,
    transition: {
      ...transitions.default,
      delay: custom.delay || 0,
      duration: custom.duration || 0.8
    }
  })
};

// Slide Left & Fade In
export const fadeLeft = {
  hidden: { 
    opacity: 0, 
    x: 40 
  },
  visible: (custom = {}) => ({
    opacity: 1,
    x: 0,
    transition: {
      ...transitions.default,
      delay: custom.delay || 0,
      duration: custom.duration || 0.8
    }
  })
};

// Slide Right & Fade In
export const fadeRight = {
  hidden: { 
    opacity: 0, 
    x: -40 
  },
  visible: (custom = {}) => ({
    opacity: 1,
    x: 0,
    transition: {
      ...transitions.default,
      delay: custom.delay || 0,
      duration: custom.duration || 0.8
    }
  })
};

// Scale In & Fade In
export const scaleIn = {
  hidden: { 
    opacity: 0, 
    scale: 0.9 
  },
  visible: (custom = {}) => ({
    opacity: 1,
    scale: 1,
    transition: {
      ...transitions.spring,
      delay: custom.delay || 0,
      duration: custom.duration || 0.8
    }
  })
};

// Blur In & Scale Out & Fade In
export const blurIn = {
  hidden: { 
    opacity: 0, 
    filter: 'blur(10px)',
    scale: 1.05
  },
  visible: (custom = {}) => ({
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      ...transitions.default,
      delay: custom.delay || 0,
      duration: custom.duration || 1
    }
  })
};

// Parent staggered timing controller
export const staggerContainer = {
  hidden: {},
  visible: (custom = {}) => ({
    transition: {
      staggerChildren: custom.staggerDelay || 0.1,
      delayChildren: custom.delayChildren || 0
    }
  })
};
