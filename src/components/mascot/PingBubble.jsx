import React from 'react';
import styles from './Ping.module.css';

/**
 * PingBubble
 * Pure stateless presentation component rendering Ping's speech bubble.
 * 
 * - Zero internal state
 * - Zero timers or intervals
 * - Zero animation engine ownership
 * - Controlled exclusively by parent props (text, visible, typing)
 */
export default function PingBubble({ 
  text = '', 
  visible = true, 
  typing = false 
}) {
  if (!visible) return null;

  return (
    <div className={styles.bubbleWrapper}>
      <div className={styles.glassmorphicBubble}>
        {typing ? (
          // Renders typing indicator dots
          <div className={styles.typingIndicator} aria-label="Ping is typing">
            <span className={styles.typingDot} />
            <span className={styles.typingDot} />
            <span className={styles.typingDot} />
          </div>
        ) : (
          // Renders multiline dialogue text cleanly
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
    </div>
  );
}
