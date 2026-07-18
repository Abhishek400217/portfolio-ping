/**
 * PingMemory.js
 * Tracks and persists session-level and historical user behavior metrics.
 * Designed to provide context for mood, dialogue, and decision engines.
 */
export class PingMemory {
  constructor() {
    this.session = {
      mouse: {
        speed: 0,
        lastX: 0,
        lastY: 0,
        lastTime: 0,
        moveCount: 0
      },
      scroll: {
        direction: 'none', // 'up' | 'down' | 'none'
        lastScrollY: typeof window !== 'undefined' ? window.scrollY : 0,
        scrollCount: 0
      },
      visitedSections: new Set(),
      timeSpent: {}, // sectionId -> ms
      idleTime: 0,   // ms of continuous inactivity
      sessionStart: Date.now()
    };

    this.persistent = {
      visitCount: 0,
      lastVisit: null,
      resumeDownloaded: false,
      githubClicked: false,
      contactSubmitted: false
    };

    this.loadFromStorage();
    this.incrementVisitCount();
  }

  /**
   * Load persistent memory from localStorage.
   */
  loadFromStorage() {
    if (typeof window === 'undefined' || !window.localStorage) return;
    try {
      const stored = window.localStorage.getItem('ping_mascot_memory');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Safely merge properties
        this.persistent = {
          visitCount: parsed.visitCount || 0,
          lastVisit: parsed.lastVisit || null,
          resumeDownloaded: !!parsed.resumeDownloaded,
          githubClicked: !!parsed.githubClicked,
          contactSubmitted: !!parsed.contactSubmitted
        };
      }
    } catch (e) {
      console.warn('[PingMemory] Failed to load from localStorage:', e);
    }
  }

  /**
   * Write persistent memory to localStorage.
   */
  saveToStorage() {
    if (typeof window === 'undefined' || !window.localStorage) return;
    try {
      window.localStorage.setItem('ping_mascot_memory', JSON.stringify(this.persistent));
    } catch (e) {
      console.warn('[PingMemory] Failed to save to localStorage:', e);
    }
  }

  /**
   * Increment visit count for return visitor tracking.
   */
  incrementVisitCount() {
    this.persistent.visitCount++;
    this.persistent.lastVisit = Date.now();
    this.saveToStorage();
  }

  /**
   * Update mouse metrics and compute speed.
   * @param {number} x 
   * @param {number} y 
   */
  trackMouseMove(x, y) {
    const now = Date.now();
    const dt = now - this.session.mouse.lastTime;
    
    if (dt > 0 && this.session.mouse.lastTime > 0) {
      const dx = x - this.session.mouse.lastX;
      const dy = y - this.session.mouse.lastY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Speed in pixels per millisecond
      this.session.mouse.speed = distance / dt;
    }
    
    this.session.mouse.lastX = x;
    this.session.mouse.lastY = y;
    this.session.mouse.lastTime = now;
    this.session.mouse.moveCount++;
    this.resetIdleTime();
  }

  /**
   * Update scroll metrics and direction.
   * @param {number} scrollY 
   */
  trackScroll(scrollY) {
    const prev = this.session.scroll.lastScrollY;
    if (scrollY > prev) {
      this.session.scroll.direction = 'down';
    } else if (scrollY < prev) {
      this.session.scroll.direction = 'up';
    } else {
      this.session.scroll.direction = 'none';
    }
    this.session.scroll.lastScrollY = scrollY;
    this.session.scroll.scrollCount++;
    this.resetIdleTime();
  }

  /**
   * Log entry to a page section.
   * @param {string} sectionId 
   */
  visitSection(sectionId) {
    if (!sectionId) return;
    this.session.visitedSections.add(sectionId);
    if (!this.session.timeSpent[sectionId]) {
      this.session.timeSpent[sectionId] = 0;
    }
    this.resetIdleTime();
  }

  /**
   * Accumulate time spent in the active section.
   * @param {string} sectionId 
   * @param {number} ms 
   */
  updateTimeSpent(sectionId, ms) {
    if (!sectionId) return;
    if (!this.session.timeSpent[sectionId]) {
      this.session.timeSpent[sectionId] = 0;
    }
    this.session.timeSpent[sectionId] += ms;
  }

  /**
   * Set flags for custom user operations.
   */
  setResumeDownloaded() {
    this.persistent.resumeDownloaded = true;
    this.saveToStorage();
    this.resetIdleTime();
  }

  setGithubClicked() {
    this.persistent.githubClicked = true;
    this.saveToStorage();
    this.resetIdleTime();
  }

  setContactSubmitted() {
    this.persistent.contactSubmitted = true;
    this.saveToStorage();
    this.resetIdleTime();
  }

  /**
   * Accumulate or reset idle tracking.
   * @param {number} ms 
   */
  incrementIdleTime(ms) {
    this.session.idleTime += ms;
  }

  resetIdleTime() {
    this.session.idleTime = 0;
  }

  /**
   * Return clean copy of all behavior statistics.
   */
  getMetrics() {
    return {
      session: {
        mouseSpeed: this.session.mouse.speed,
        mouseMoveCount: this.session.mouse.moveCount,
        scrollDirection: this.session.scroll.direction,
        scrollCount: this.session.scroll.scrollCount,
        visitedSections: Array.from(this.session.visitedSections),
        timeSpent: { ...this.session.timeSpent },
        idleTime: this.session.idleTime,
        sessionDuration: Date.now() - this.session.sessionStart
      },
      persistent: {
        visitCount: this.persistent.visitCount,
        lastVisit: this.persistent.lastVisit,
        resumeDownloaded: this.persistent.resumeDownloaded,
        githubClicked: this.persistent.githubClicked,
        contactSubmitted: this.persistent.contactSubmitted,
        isReturnVisitor: this.persistent.visitCount > 1
      }
    };
  }

  /**
   * Clear current session tracker and reset localStorage.
   */
  resetSession() {
    this.session = {
      mouse: { speed: 0, lastX: 0, lastY: 0, lastTime: 0, moveCount: 0 },
      scroll: { direction: 'none', lastScrollY: 0, scrollCount: 0 },
      visitedSections: new Set(),
      timeSpent: {},
      idleTime: 0,
      sessionStart: Date.now()
    };
    this.persistent = {
      visitCount: 1,
      lastVisit: Date.now(),
      resumeDownloaded: false,
      githubClicked: false,
      contactSubmitted: false
    };
    this.saveToStorage();
  }
}
