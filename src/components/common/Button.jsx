import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  fullWidth = false,
  className,
  type = 'button',
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';
  
  const variants = {
    primary: 'bg-emerald-500 hover:bg-emerald-600 text-black border border-emerald-400/20 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]',
    secondary: 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700/50',
    outline: 'bg-transparent border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500 shadow-[inset_0_0_6px_rgba(16,185,129,0.05)] hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]',
    glass: 'glass glass-hover text-white',
    ghost: 'bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-800/50',
    neon: 'bg-black text-emerald-400 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] hover:bg-emerald-500 hover:text-black hover:border-emerald-400'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3 text-base'
  };

  // Hover & Tap spring animations using Framer Motion
  const motionProps = {
    whileHover: disabled || loading ? {} : { y: -2, scale: 1.02 },
    whileTap: disabled || loading ? {} : { scale: 0.98 },
    transition: { type: 'spring', stiffness: 400, damping: 15 }
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...motionProps}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {!loading && icon && iconPosition === 'left' && (
        <span className="mr-2 inline-flex items-center justify-center">{icon}</span>
      )}
      <span>{children}</span>
      {!loading && icon && iconPosition === 'right' && (
        <span className="ml-2 inline-flex items-center justify-center">{icon}</span>
      )}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;
