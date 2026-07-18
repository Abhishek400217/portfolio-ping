import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Ping.module.css';

/**
 * PingBubble
 * Glassmorphic speech bubble displaying Ping's verbal dialogues.
 * Supports: typing mode, multiline text, auto resize, and auto fade transitions.
 */
export default function PingBubble({ 
  text = '', 
  visible = true, 
  typing = false 
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.bubbleWrapper}
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <div className={styles.glassmorphicBubble}>
            {typing ? (
              // Renders typing indicator dots
              <div className={styles.typingIndicator} aria-label="Ping is typing">
                <motion.span 
                  className={styles.typingDot}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                />
                <motion.span 
                  className={styles.typingDot}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0.15 }}
                />
                <motion.span 
                  className={styles.typingDot}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0.3 }}
                />
              </div>
            ) : (
              // Renders multiline dialogue text
              <p className={styles.bubbleText}>
                {text.split('\n').map((line, idx) => (
                  <React.Fragment key={idx}>
                    {line}
                    {idx < text.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
