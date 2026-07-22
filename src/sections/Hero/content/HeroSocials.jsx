import React from 'react';
import styles from './HeroContent.module.css';
import { usePing } from '../../../hooks/usePing.js';

/**
 * HeroSocials
 * Renders social link layouts.
 * Includes explicit slots for future SVG icon injections.
 */
export default function HeroSocials({ links = [] }) {
  const mascot = usePing();
  if (!links || links.length === 0) return null;

  return (
    <nav className={styles.socialsContainer} aria-label="Social Links">
      {links.map((link, index) => {
        // Map platform names to placeholder labels
        const platformLabel = link.platform.toUpperCase();

        let descriptiveAriaLabel = `Visit Abhishek's ${link.platform}`;
        if (link.platform === 'email') {
          descriptiveAriaLabel = "Send an email to Abhishek";
        } else if (link.platform === 'resume') {
          descriptiveAriaLabel = "Download or view Abhishek's resume";
        } else if (link.platform === 'github') {
          descriptiveAriaLabel = "Visit Abhishek's GitHub profile";
        } else if (link.platform === 'linkedin') {
          descriptiveAriaLabel = "Visit Abhishek's LinkedIn profile";
        }

        const isInternalOrEmail = link.href.startsWith('mailto:') || link.href.startsWith('#');

        return (
          <a 
            key={index} 
            href={link.href} 
            className={styles.socialLink}
            target={isInternalOrEmail ? undefined : "_blank"}
            rel={isInternalOrEmail ? undefined : "noopener noreferrer"}
            aria-label={descriptiveAriaLabel}
            onClick={() => {
              if (link.platform === 'github' && mascot && mascot.triggerEvent) {
                mascot.triggerEvent('GITHUB_CLICK');
              } else if (link.platform === 'resume' && mascot && mascot.triggerEvent) {
                mascot.triggerEvent('RESUME_DOWNLOAD');
              }
            }}
          >
            {/* SVG Icon Slot Placeholder */}
            <span className={styles.iconPlaceholder} aria-hidden="true" />
            <span className={styles.linkLabel}>{platformLabel}</span>
          </a>
        );
      })}
    </nav>
  );
}
