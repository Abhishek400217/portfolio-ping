import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

/**
 * Reusable MainLayout structural container.
 * Wraps Navbar header, main content elements, and Footer.
 */
export default function MainLayout({ children }) {
  return (
    <div className="main-layout" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Structural navigation header */}
      <Navbar />

      {/* Main scrolling viewport container */}
      <main className="main-content" style={{ flex: '1 0 auto', width: '100%' }}>
        {children}
      </main>

      {/* Contentinfo footer */}
      <Footer />
    </div>
  )
}
