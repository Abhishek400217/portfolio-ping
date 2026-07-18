import React from 'react';
import clsx from 'clsx';

const Divider = ({
  orientation = 'horizontal',
  text,
  gradient = true,
  className,
  ...props
}) => {
  const isHorizontal = orientation === 'horizontal';

  if (isHorizontal) {
    return (
      <div 
        className={clsx(
          'w-full flex items-center my-6',
          className
        )}
        role="separator"
        aria-orientation="horizontal"
        {...props}
      >
        {gradient ? (
          <>
            <div className="flex-grow h-[1px] bg-gradient-to-r from-transparent to-zinc-800" />
            {text && (
              <span className="px-4 text-xs font-semibold tracking-[0.15em] text-zinc-500 uppercase select-none">
                {text}
              </span>
            )}
            <div className="flex-grow h-[1px] bg-gradient-to-r from-zinc-800 to-transparent" />
          </>
        ) : (
          <>
            <div className="flex-grow h-[1px] bg-zinc-800" />
            {text && (
              <span className="px-4 text-xs font-semibold tracking-[0.15em] text-zinc-500 uppercase select-none">
                {text}
              </span>
            )}
            <div className="flex-grow h-[1px] bg-zinc-800" />
          </>
        )}
      </div>
    );
  }

  // Vertical Divider
  return (
    <div
      className={clsx(
        'inline-flex self-stretch w-[1px]',
        gradient 
          ? 'bg-gradient-to-b from-transparent via-zinc-800 to-transparent' 
          : 'bg-zinc-800',
        className
      )}
      role="separator"
      aria-orientation="vertical"
      {...props}
    />
  );
};

export default Divider;
