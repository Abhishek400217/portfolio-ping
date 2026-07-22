import React, { forwardRef } from 'react'
import { motion } from 'framer-motion'

/**
 * Reusable SectionWrapper layout shell.
 * Enables consistent ref-forwarding, section anchors, and intersection detection.
 */
const SectionWrapper = forwardRef(({ id, children, className = '', ...props }, ref) => {
  return (
    <motion.section
      id={id}
      ref={ref}
      className={`section-wrapper ${className}`}
      data-section-id={id}
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
      transition={{ 
        type: 'spring', 
        stiffness: 70, 
        damping: 15, 
        mass: 1, 
        duration: 0.8 
      }}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px 0',
        boxSizing: 'border-box',
      }}
      {...props}
    >
      {children}
    </motion.section>
  )
})

SectionWrapper.displayName = 'SectionWrapper'
export default SectionWrapper
