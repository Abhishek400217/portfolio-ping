export const transitions = {
  spring: {
    type: 'spring',
    stiffness: 100,
    damping: 15,
    mass: 1,
  },
  smooth: {
    type: 'tween',
    ease: [0.16, 1, 0.3, 1], // easeOutExpo
    duration: 0.8,
  },
  fast: {
    type: 'tween',
    ease: 'easeOut',
    duration: 0.3,
  },
  bounce: {
    type: 'spring',
    stiffness: 300,
    damping: 10,
  }
};

export const variants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: transitions.smooth
    }
  },
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: transitions.smooth
    }
  },
  fadeDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: transitions.smooth
    }
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: transitions.spring
    }
  },
  staggerContainer: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      }
    }
  }
};

export const gsapConfigs = {
  ease: 'power4.out', // Equivalent to easeOutExpo
  duration: 0.8,
  stagger: 0.1,
};
