import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Ping.module.css';

/**
 * PingDock
 * Holographic base platform (Apple Vision Pro Glass quality).
 * Supports: boot, close, idle, glow, expand, collapse layouts.
 */
export default function PingDock({ state = 'idle', children }) {
  // Map dock state transitions to Framer Motion animations
  const resolveDockVariants = () => {
    switch (state) {
      case 'boot':
        return {
          scaleX: [0.1, 1],
          opacity: [0, 0.8],
          width: '180px',
          boxShadow: '0 0 15px var(--color-emerald-glow, rgba(16, 185, 129, 0.18))'
        };

      case 'close':
        return {
          scale: 0,
          opacity: 0,
          width: '80px'
        };

      case 'off':
        return {
          scale: 1,
          opacity: 0.3,
          width: '180px',
          boxShadow: '0 0 0px transparent'
        };

      case 'glow':
        return {
          scale: 1,
          opacity: 1,
          width: '240px',
          boxShadow: '0 0 25px var(--color-emerald-glow-strong, rgba(16, 185, 129, 0.45))'
        };

      case 'expand':
        return {
          scale: 1,
          opacity: 1,
          width: '320px',
          boxShadow: '0 0 15px var(--color-emerald-glow, rgba(16, 185, 129, 0.18))'
        };

      case 'collapse':
        return {
          scale: 1,
          opacity: 0.6,
          width: '100px',
          boxShadow: '0 0 0px transparent'
        };

      case 'idle':
      default:
        return {
          scale: 1,
          opacity: 0.9,
          width: '240px',
          boxShadow: '0 0 10px var(--color-emerald-glow, rgba(16, 185, 129, 0.18))'
        };
    }
  };

  const isClosed = state === 'close';
  const isCollapsed = state === 'collapse';
  const isOff = state === 'off';

  return (
    <AnimatePresence>
      {!isClosed && (
        <motion.div
          className={styles.dockWrapper}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={resolveDockVariants()}
          exit={{ opacity: 0, scaleY: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 14 }}
        >
          <div className={styles.glassmorphicDock}>
            {/* 1. Holographic Laser Sweep Overlay */}
            {!isOff && <div className={styles.hologramRay} />}

            {/* 2. Left side: Led and Title */}
            <div className={styles.dockStatusGroup}>
              <span 
                className={styles.dockStatusLed} 
                style={isOff ? { backgroundColor: '#4b5563', boxShadow: 'none' } : undefined}
                aria-hidden="true" 
              />
              {!isCollapsed && (
                <span 
                  className={styles.dockTitle}
                  style={isOff ? { color: '#4b5563' } : undefined}
                >
                  PING // OS
                </span>
              )}
            </div>

            {/* 3. Center Slot for Custom Children */}
            {children}

            {/* 4. Right side: Mini Metrics System */}
            {!isCollapsed && (
              <div className={styles.dockStatsGroup}>
                <span 
                  className={styles.dockMetricsIndicator}
                  style={isOff ? { color: '#4b5563', opacity: 0.5 } : undefined}
                >
                  SYS.OK
                </span>
                <span 
                  className={styles.dockMetricsIndicator}
                  style={isOff ? { color: '#4b5563', opacity: 0.5 } : undefined}
                >
                  v1.0.0
                </span>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
