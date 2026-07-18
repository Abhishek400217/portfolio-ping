import React from 'react'

/**
 * Reusable Footer component shell
 */
export default function Footer() {
  return (
    <footer className="footer" role="contentinfo" style={{ padding: '40px 20px', textAlign: 'center' }}>
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} Portfolio. All rights reserved.</p>
      </div>
    </footer>
  )
}
