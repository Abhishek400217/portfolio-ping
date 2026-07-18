import React from 'react'
import { NAVIGATION_CONFIG } from '../../constants/navigation'
import useScroll from '../../hooks/useScroll'

/**
 * Reusable Navbar component shell
 * Tracks scroll intersection active state and executes scroll anchors on link click.
 */
export default function Navbar() {
  const { activeSection, scrollToSection } = useScroll()

  return (
    <header className="navbar-header" style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 100 }}>
      <nav className="navbar" role="navigation" aria-label="Main Navigation">
        <div className="navbar-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px' }}>
          <div className="navbar-logo">
            <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>
              Portfolio
            </a>
          </div>
          <ul className="navbar-links" style={{ display: 'flex', listStyle: 'none', gap: '20px', margin: 0, padding: 0 }}>
            {NAVIGATION_CONFIG.map((item) => (
              <li key={item.id}>
                <a
                  href={item.path}
                  className={activeSection === item.id ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.id)
                  }}
                  style={{ textDecoration: 'none', fontWeight: activeSection === item.id ? 'bold' : 'normal' }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}
