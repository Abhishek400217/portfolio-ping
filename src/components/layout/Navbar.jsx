import React from 'react';
import { motion } from 'framer-motion';
import { NAVIGATION_CONFIG } from '../../constants/navigation';
import useScroll from '../../hooks/useScroll';
import { usePing } from '../../hooks/usePing.js';

export default function Navbar() {
  const { activeSection, scrollToSection, y, direction } = useScroll();
  const mascot = usePing();

  // Scroll hide/show check
  const isHidden = y > 80 && direction === 'down';

  const handleResumeClick = (e) => {
    e.preventDefault();
    if (mascot && mascot.triggerEvent) {
      mascot.triggerEvent('RESUME_DOWNLOAD');
    }
    const targetElement = document.querySelector('#resume');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className="navbar-header" 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        zIndex: 1000,
        transform: isHidden ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        background: 'rgba(3, 3, 3, 0.7)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      <nav className="navbar" role="navigation" aria-label="Main Navigation">
        <div className="navbar-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px', padding: '0 40px', maxWidth: '1440px', margin: '0 auto' }}>
          
          {/* Logo Left */}
          <div className="navbar-logo" style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.02em', background: 'linear-gradient(90deg, #fff 0%, #10b981 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            <a 
              href="#hero" 
              onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              PING // DEV
            </a>
          </div>

          {/* Menu Center */}
          <ul className="navbar-links" style={{ display: 'flex', listStyle: 'none', gap: '24px', margin: 0, padding: 0, position: 'relative', alignItems: 'center' }}>
            {NAVIGATION_CONFIG.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id} style={{ position: 'relative', padding: '6px 0' }}>
                  <a
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }}
                    style={{ 
                      textDecoration: 'none', 
                      fontSize: '14px',
                      fontWeight: 500,
                      color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.65)',
                      transition: 'color 0.3s ease',
                      padding: '4px 8px'
                    }}
                  >
                    {item.label}
                  </a>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-underline"
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '8px',
                        right: '8px',
                        height: '2px',
                        backgroundColor: '#10b981',
                        borderRadius: '1px',
                        boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)'
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          {/* Resume Button Right */}
          <div className="navbar-action">
            <a 
              href="#resume" 
              onClick={handleResumeClick}
              style={{ 
                textDecoration: 'none', 
                fontSize: '13px', 
                fontWeight: 600, 
                color: '#fff', 
                background: 'rgba(255, 255, 255, 0.05)', 
                padding: '8px 16px', 
                borderRadius: '99px', 
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              Resume
            </a>
          </div>

        </div>
      </nav>
    </header>
  );
}
