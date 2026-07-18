import React, { forwardRef } from 'react'

/**
 * Reusable SectionWrapper layout shell.
 * Enables consistent ref-forwarding, section anchors, and intersection detection.
 */
const SectionWrapper = forwardRef(({ id, children, className = '', ...props }, ref) => {
  return (
    <section
      id={id}
      ref={ref}
      className={`section-wrapper ${className}`}
      data-section-id={id}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px 0', // standard spacing shell
        boxSizing: 'border-box',
      }}
      {...props}
    >
      {children}
    </section>
  )
})

SectionWrapper.displayName = 'SectionWrapper'
export default SectionWrapper
