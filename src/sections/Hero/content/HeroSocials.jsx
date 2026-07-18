import React from 'react';
import styles from './HeroContent.module.css';

/**
 * HeroSocials
 * Renders social link layouts.
 * Includes explicit slots for future SVG icon injections.
 */
export default function HeroSocials({ links = [] }) {
  if (!links || links.length === 0) return null;

  return (
    <div className={styles.socialsContainer}>
      {links.map((link, index) => {
        // Map platform names to placeholder labels
        const platformLabel = link.platform.toUpperCase();

        return (
          <a 
            key={index} 
            href={link.href} 
            className={styles.socialLink}
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={`Visit Abhishek's ${link.platform}`}
          >
            {/* SVG Icon Slot Placeholder */}
            <span className={styles.iconPlaceholder} aria-hidden="true" />
            <span className={styles.linkLabel}>{platformLabel}</span>
          </a>
        );
      })}
    </div>
  );
}
