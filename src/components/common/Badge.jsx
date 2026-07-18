import React from 'react';
import clsx from 'clsx';

const Badge = ({
  children,
  variant = 'emerald',
  size = 'md',
  glow = false,
  className,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold tracking-wide rounded uppercase select-none';

  const variants = {
    emerald: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
    danger: 'bg-red-500/10 text-red-400 border border-red-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    neutral: 'bg-zinc-800/50 text-zinc-300 border border-zinc-700/50'
  };

  const glows = {
    emerald: 'shadow-[0_0_10px_rgba(16,185,129,0.15)]',
    cyan: 'shadow-[0_0_10px_rgba(6,182,212,0.15)]',
    danger: 'shadow-[0_0_10px_rgba(239,68,68,0.15)]',
    warning: 'shadow-[0_0_10px_rgba(245,158,11,0.15)]',
    neutral: ''
  };

  const sizes = {
    sm: 'px-1.5 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs'
  };

  return (
    <span
      className={clsx(
        baseStyles,
        variants[variant],
        glow && glows[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
