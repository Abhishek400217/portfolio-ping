import React from 'react';
import clsx from 'clsx';

const Loader = ({
  size = 'md',
  color = 'emerald',
  fullscreen = false,
  className,
  ...props
}) => {
  const sizes = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-[3px]',
    lg: 'w-16 h-16 border-4'
  };

  const colors = {
    emerald: 'border-emerald-500/20 border-t-emerald-500',
    cyan: 'border-cyan-500/20 border-t-cyan-500',
    white: 'border-zinc-800/50 border-t-white'
  };

  const loaderElement = (
    <div
      className={clsx(
        'rounded-full animate-spin',
        sizes[size],
        colors[color],
        className
      )}
      role="status"
      aria-label="Loading"
      {...props}
    />
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
        <div className="flex flex-col items-center gap-4">
          {loaderElement}
          <span className="text-sm font-semibold tracking-wider text-emerald-400 animate-pulse">
            LOADING EXPERIENCE...
          </span>
        </div>
      </div>
    );
  }

  return loaderElement;
};

export default Loader;
