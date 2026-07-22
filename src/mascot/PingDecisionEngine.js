/**
 * PingDecisionEngine.js
 * Processes incoming user events, logs telemetry inside memory, and routes target transitions to the State Machine.
 */
export class PingDecisionEngine {
  /**
   * @param {object} brain - Reference to parent PingBrain instance
   */
  constructor(brain) {
    if (!brain) {
      throw new Error('[PingDecisionEngine] Cannot initialize without a PingBrain reference.');
    }
    this.brain = brain;
  }

  /**
   * Primary entry point for user interaction events.
   * @param {string} eventType 
   * @param {object} payload 
   */
  processEvent(eventType, payload = {}) {
    const { stateMachine, memory } = this.brain;
    const currentState = stateMachine.getCurrentState();

    switch (eventType) {
      case 'MOUSE_MOVE':
        // Update memory coordinates and speed
        memory.trackMouseMove(payload.x || 0, payload.y || 0);

        if (currentState === 'Sleeping') {
          stateMachine.transition('Booting');
        } else if (currentState === 'Idle') {
          // Shift to watching the cursor
          stateMachine.transition('Watching', payload);
        } else if (currentState === 'Watching') {
          // Proactively trigger a gesture updates for look-at targeting
          this.brain.triggerGestureUpdate(payload);
        }
        break;

      case 'SCROLL':
        memory.trackScroll(payload.scrollY || 0);
        
        // If scrolling while sleeping, wake up
        if (currentState === 'Sleeping') {
          stateMachine.transition('Booting');
        }
        break;

      case 'SECTION_ENTER':
        const sectionId = payload.sectionId;
        memory.visitSection(sectionId);

        // Block automatic section-triggered movements while in transition modes
        if (['Sleeping', 'Booting', 'Goodbye'].includes(currentState)) break;

        if (sectionId === 'hero') {
          stateMachine.transition('Idle');
        } else if (sectionId === 'projects') {
          stateMachine.transition('ProjectGuide');
        } else if (sectionId === 'skills' || sectionId === 'about') {
          stateMachine.transition('Reading');
        } else if (sectionId === 'contact') {
          stateMachine.transition('ContactGuide');
        } else {
          stateMachine.transition('Idle');
        }
        break;

      case 'CLICK_MASCOT':
        if (currentState === 'Sleeping') {
          stateMachine.transition('Booting');
        } else if (currentState === 'Booting') {
          // Ignore clicks during loading
          break;
        } else {
          stateMachine.transition('Greeting');
        }
        break;

      case 'RESUME_DOWNLOAD':
        memory.setResumeDownloaded();
        stateMachine.transition('Celebrating', { source: 'resume' });
        break;

      case 'GITHUB_CLICK':
        memory.setGithubClicked();
        stateMachine.transition('Celebrating', { source: 'github' });
        break;

      case 'CONTACT_SUBMIT':
        memory.setContactSubmitted();
        stateMachine.transition('Celebrating', { source: 'contact' });
        break;

      case 'CONTACT_INPUT_FOCUS':
        if (['Idle', 'Watching', 'ContactGuide'].includes(currentState)) {
          stateMachine.transition('Waiting');
        }
        break;

      case 'CONTACT_INPUT_BLUR':
        if (currentState === 'Waiting') {
          stateMachine.transition('Idle');
        }
        break;

      case 'MOUSE_LEAVE':
        if (['Idle', 'Watching', 'Reading', 'ProjectGuide', 'GithubGuide', 'ContactGuide'].includes(currentState)) {
          stateMachine.transition('Confused');
        }
        break;

      case 'MOUSE_RETURN':
        if (currentState === 'Confused') {
          stateMachine.transition('Idle');
        }
        break;

      case 'WINDOW_BLUR':
        // User tabbed out, sleep to preserve resources
        stateMachine.transition('Sleeping');
        break;

      case 'WINDOW_FOCUS':
        if (currentState === 'Sleeping') {
          stateMachine.transition('Booting');
        }
        break;

      case 'GOODBYE_TRIGGER':
        stateMachine.transition('Goodbye');
        break;

      default:
        console.warn(`[PingDecisionEngine] Unknown event types rejected: ${eventType}`);
        break;
    }
  }
}
