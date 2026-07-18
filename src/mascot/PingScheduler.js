/**
 * PingScheduler.js
 * Manages background timing tasks, idle tracking intervals, and automated behavioral cycles.
 */
export class PingScheduler {
  /**
   * @param {object} brain - Reference to parent PingBrain instance
   */
  constructor(brain) {
    if (!brain) {
      throw new Error('[PingScheduler] Cannot initialize without a PingBrain reference.');
    }
    this.brain = brain;
    this.intervals = [];
    this.timeouts = [];
    this.isRunning = false;

    // Define standard ranges for idle behaviors to support randomization
    this.idleActions = [
      { id: 'blink', min: 4000, max: 7000 },
      { id: 'look-left', min: 9000, max: 12000 },
      { id: 'look-user', min: 14000, max: 17000 },
      { id: 'still-there', min: 19000, max: 24000 },
      { id: 'coffee', min: 28000, max: 34000 },
      { id: 'popcorn', min: 42000, max: 50000 }
    ];
    this.randomizeThresholds();
  }

  /**
   * Randomizes the exact timing trigger for each idle behavior.
   */
  randomizeThresholds() {
    this.idleActions.forEach(action => {
      action.threshold = Math.floor(Math.random() * (action.max - action.min)) + action.min;
      action.triggered = false;
    });
  }

  /**
   * Start scheduler timers.
   */
  start() {
    if (this.isRunning) return;
    this.isRunning = true;

    // 1. Inactivity tracking accumulator (every 1 second)
    this.registerInterval(() => {
      this.brain.memory.incrementIdleTime(1000);
      this.checkIdleThresholds();
    }, 1000);

    // 2. Automated random behavior checks (every 8 seconds)
    this.registerInterval(() => {
      this.triggerRandomBehavior();
    }, 8000);

    // 3. User attention reminder checks (every 15 seconds)
    this.registerInterval(() => {
      this.checkReminders();
    }, 15000);
  }

  /**
   * Stop all timers and clear scheduler queues.
   */
  stop() {
    this.intervals.forEach(id => clearInterval(id));
    this.timeouts.forEach(id => clearTimeout(id));
    this.intervals = [];
    this.timeouts = [];
    this.isRunning = false;
  }

  /**
   * Helper to register and track interval identifiers.
   */
  registerInterval(fn, delay) {
    const id = setInterval(fn, delay);
    this.intervals.push(id);
    return id;
  }

  /**
   * Helper to register and track single timeout tasks.
   */
  registerTimeout(fn, delay) {
    const id = setTimeout(() => {
      fn();
      this.timeouts = this.timeouts.filter(t => t !== id);
    }, delay);
    this.timeouts.push(id);
    return id;
  }

  /**
   * Evaluate idle thresholds and transition states dynamically.
   */
  checkIdleThresholds() {
    const state = this.brain.stateMachine.getCurrentState();
    const metrics = this.brain.memory.getMetrics();
    const idleTime = metrics.session.idleTime;

    // Exclude states that shouldn't auto-degrade into sleep
    if (state === 'Sleeping' || state === 'Goodbye' || state === 'Booting') return;

    // Reset triggered actions when idleTime is zero (user just moved mouse/scrolled)
    if (idleTime === 0) {
      this.randomizeThresholds();
      return;
    }

    // 60 Seconds -> Auto-sleep
    if (idleTime >= 60000) {
      this.brain.stateMachine.transition('Sleeping');
      return;
    }

    // Process randomized actions
    this.idleActions.forEach(action => {
      if (!action.triggered && idleTime >= action.threshold) {
        action.triggered = true;
        this.executeIdleAction(action.id);
      }
    });
  }

  /**
   * Execute idle behaviors.
   */
  executeIdleAction(id) {
    switch (id) {
      case 'blink':
        this.brain.emit('micro-gesture', { eyeExpression: 'wink' });
        break;

      case 'look-left':
        // Glances to the left-down coordinates
        this.brain.emit('micro-gesture', { 
          eyeExpression: 'curious',
          headRotation: { x: -0.12, y: 0.1, z: -0.03 } 
        });
        break;

      case 'look-user':
        // Re-focuses target on user
        this.brain.emit('micro-gesture', { 
          eyeExpression: 'idle',
          headRotation: { x: 0, y: 0, z: 0 } 
        });
        break;

      case 'still-there':
        this.brain.emit('dialogue-prompt', { 
          text: "Still there?" 
        });
        break;

      case 'coffee':
        this.brain.emit('micro-gesture', {
          eyeExpression: 'happy',
          armAnimation: 'coffee',
          floatingRing: { speed: 10, color: '#f59e0b', height: 0 }
        });
        break;

      case 'popcorn':
        this.brain.emit('micro-gesture', {
          eyeExpression: 'surprise',
          armAnimation: 'popcorn',
          floatingRing: { speed: 20, color: '#ef4444', height: -3 }
        });
        break;
    }
  }

  /**
   * Inject life-like micro-gestures when in passive states.
   */
  triggerRandomBehavior() {
    const state = this.brain.stateMachine.getCurrentState();
    if (state !== 'Idle' && state !== 'Watching') return;

    // 40% chance to trigger micro-gesture if not already in custom action
    if (Math.random() < 0.4) {
      const randomGestures = ['WINK', 'HAPPY', 'SQUINT', 'DEFAULT'];
      const eyeOverride = randomGestures[Math.floor(Math.random() * randomGestures.length)];
      
      this.brain.emit('micro-gesture', {
        eyeExpression: eyeOverride,
        headRotation: { 
          x: (Math.random() - 0.5) * 0.1, 
          y: (Math.random() - 0.5) * 0.1, 
          z: (Math.random() - 0.5) * 0.05 
        }
      });
    }
  }

  /**
   * Monitor workflow completions and output guidance reminders.
   */
  checkReminders() {
    const state = this.brain.stateMachine.getCurrentState();
    const metrics = this.brain.memory.getMetrics();

    if (state === 'ContactGuide' && !metrics.persistent.contactSubmitted) {
      if (metrics.session.idleTime > 15000) {
        this.brain.emit('dialogue-prompt', {
          text: "Need help? Fill out the subject and message, and hit 'Send Message'."
        });
      }
    }

    if (state === 'ProjectGuide' && metrics.session.idleTime > 20000) {
      this.brain.emit('dialogue-prompt', {
        text: "You can click on any card to view detailed case studies!"
      });
    }
  }
}
