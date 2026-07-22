import React from 'react';
import styles from './HeroContent.module.css';
import HeroStat from './HeroStat.jsx';

/**
 * HeroStats
 * Layout grid mapping a collection of statistics elements.
 */
const HeroStats = React.forwardRef(function HeroStats({ stats = [] }, ref) {
  if (!stats || stats.length === 0) return null;

  return (
    <div ref={ref} className={styles.statsContainer} role="list" aria-label="Key statistics">
      {stats.map((stat, index) => (
        <React.Fragment key={index}>
          <HeroStat value={stat.value} label={stat.label} />
          {index < stats.length - 1 && (
            <div className={styles.statSeparator} aria-hidden="true" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
});

export default HeroStats;
