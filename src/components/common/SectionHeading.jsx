import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const SectionHeading = ({
  title,
  subtitle,
  align = 'center',
  glow = true,
  className,
  ...props
}) => {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  };

  return (
    <div 
      className={clsx(
        'relative flex flex-col mb-12 md:mb-16 select-none',
        alignmentClasses[align],
        className
      )}
      {...props}
    >
      {/* Background Ambient Glow */}
      {glow && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      )}

      {subtitle && (
        <motion.span
          className="text-xs md:text-sm font-bold tracking-[0.2em] text-emerald-400 uppercase mb-3 block"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {subtitle}
        </motion.span>
      )}

      {title && (
        <motion.h2
          className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {title.split(' ').map((word, i, arr) => {
            const isLast = i === arr.length - 1;
            return (
              <span key={i} className={clsx(isLast && 'text-gradient-neon', 'mr-[0.25em] last:mr-0 inline-block')}>
                {word}
              </span>
            );
          })}
        </motion.h2>
      )}

      {/* Decorative Line */}
      <motion.div 
        className={clsx(
          "h-[2px] bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-emerald-500/0 mt-4",
          align === 'left' ? 'w-16 origin-left' : align === 'right' ? 'w-16 origin-right' : 'w-24'
        )}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
};

export default SectionHeading;
