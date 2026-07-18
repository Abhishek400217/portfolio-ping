import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const GlassCard = forwardRef(({
  children,
  className,
  hoverEffect = true,
  glowColor = 'none',
  animate = true,
  ...props
}, ref) => {
  const glowClasses = {
    none: '',
    emerald: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] hover:border-emerald-500/30',
    cyan: 'hover:shadow-[0_0_30px_rgba(0,242,254,0.15)] hover:border-cyan-500/30'
  };

  const cardClasses = clsx(
    'glass-card relative overflow-hidden rounded-xl border border-white/5 bg-zinc-950/40 backdrop-blur-xl p-6 transition-all duration-300',
    hoverEffect && 'hover:border-white/10 hover:bg-zinc-900/50',
    glowColor !== 'none' && glowClasses[glowColor],
    className
  );

  if (animate) {
    return (
      <motion.div
        ref={ref}
        className={cardClasses}
        whileHover={hoverEffect ? { y: -4, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } } : {}}
        {...props}
      >
        {/* Glow Ambient Effect */}
        {glowColor !== 'none' && (
          <div 
            className={clsx(
              "absolute -inset-px opacity-0 hover:opacity-100 transition-opacity duration-500 -z-10 pointer-events-none rounded-xl blur-lg",
              glowColor === 'emerald' ? 'bg-emerald-500/10' : 'bg-cyan-500/10'
            )} 
          />
        )}
        {children}
      </motion.div>
    );
  }

  return (
    <div ref={ref} className={cardClasses} {...props}>
      {children}
    </div>
  );
});

GlassCard.displayName = 'GlassCard';

export default GlassCard;
