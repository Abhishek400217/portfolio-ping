import React from 'react'

/**
 * Reusable PageContainer component shell.
 * Restricts maximum layout widths and aligns margins.
 */
export default function PageContainer({ children, className = '' }) {
  return (
    <div
      className={`page-container ${className}`}
      style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </div>
  )
}
