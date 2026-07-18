import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { IoCloseOutline } from 'react-icons/io5';

const Chip = ({
  label,
  icon,
  variant = 'glass',
  color = 'emerald',
  className,
  clickable = false,
  onClick,
  onDelete,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full select-none transition-all duration-300 border';

  const variants = {
    filled: {
      emerald: 'bg-emerald-500 text-black border-emerald-400',
      cyan: 'bg-cyan-500 text-black border-cyan-400',
      neutral: 'bg-zinc-800 text-white border-zinc-700'
    },
    outline: {
      emerald: 'bg-transparent text-emerald-400 border-emerald-500/30 hover:border-emerald-500/60',
      cyan: 'bg-transparent text-cyan-400 border-cyan-500/30 hover:border-cyan-500/60',
      neutral: 'bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-700'
    },
    glass: {
      emerald: 'bg-emerald-950/20 text-emerald-400 border-emerald-500/20 backdrop-blur-sm',
      cyan: 'bg-cyan-950/20 text-cyan-400 border-cyan-500/20 backdrop-blur-sm',
      neutral: 'bg-zinc-900/40 text-zinc-300 border-white/5 backdrop-blur-sm'
    }
  };

  const Component = clickable ? motion.button : 'span';
  const interactiveProps = clickable
    ? {
        whileHover: { scale: 1.05, y: -1 },
        whileTap: { scale: 0.95 },
        onClick,
        className: clsx(baseStyles, variants[variant][color], 'cursor-pointer hover:shadow-md', className),
        ...props
      }
    : {
        className: clsx(baseStyles, variants[variant][color], className),
        ...props
      };

  return (
    <Component {...interactiveProps}>
      {icon && <span className="inline-flex items-center justify-center text-[1.1em]">{icon}</span>}
      <span>{label}</span>
      {onDelete && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="ml-1 inline-flex items-center justify-center p-0.5 rounded-full hover:bg-white/10 text-current transition-colors cursor-pointer"
          aria-label="Remove tag"
        >
          <IoCloseOutline className="w-3.5 h-3.5" />
        </button>
      )}
    </Component>
  );
};

export default Chip;
