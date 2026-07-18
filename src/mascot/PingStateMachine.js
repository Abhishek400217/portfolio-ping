/**
 * PingStateMachine.js
 * Implements a strict Finite State Machine for Ping's behavioral flow.
 */
export class PingStateMachine {
  constructor(initialState = 'Sleeping') {
    this.currentState = initialState;
    this.listeners = [];

    // Define valid state transition boundaries
    this.transitions = {
      Sleeping: ['Booting'],
      Booting: ['Greeting'],
      Greeting: [
        'Sleeping', 'Idle', 'Watching', 'Guiding', 'Celebrating', 'Thinking', 
        'Confused', 'Waiting', 'Reading', 'ProjectGuide', 'GithubGuide', 
        'ContactGuide', 'Goodbye'
      ],
      Idle: [
        'Sleeping', 'Watching', 'Guiding', 'Celebrating', 'Thinking', 
        'Confused', 'Waiting', 'Reading', 'ProjectGuide', 'GithubGuide', 
        'ContactGuide', 'Goodbye'
      ],
      Watching: [
        'Sleeping', 'Idle', 'Guiding', 'Celebrating', 'Thinking', 
        'Confused', 'Reading', 'ProjectGuide', 'GithubGuide', 'ContactGuide', 
        'Goodbye'
      ],
      Guiding: ['Sleeping', 'Idle', 'Watching', 'ProjectGuide', 'GithubGuide', 'ContactGuide', 'Goodbye'],
      Celebrating: ['Sleeping', 'Idle', 'Watching', 'Goodbye'],
      Thinking: ['Sleeping', 'Idle', 'Watching', 'Confused', 'Reading', 'Goodbye'],
      Confused: ['Sleeping', 'Idle', 'Watching', 'Thinking', 'Goodbye'],
      Waiting: ['Sleeping', 'Idle', 'Watching', 'Celebrating', 'Goodbye'],
      Reading: ['Sleeping', 'Idle', 'Watching', 'Thinking', 'Goodbye'],
      ProjectGuide: ['Sleeping', 'Idle', 'Watching', 'Celebrating', 'Goodbye'],
      GithubGuide: ['Sleeping', 'Idle', 'Watching', 'Celebrating', 'Goodbye'],
      ContactGuide: ['Sleeping', 'Idle', 'Watching', 'Waiting', 'Celebrating', 'Goodbye'],
      Goodbye: ['Sleeping']
    };
  }

  /**
   * Attempt transition to a new state.
   * @param {string} toState - Target state name
   * @param {object} payload - Optional contextual data associated with transition
   * @returns {boolean} True if transition was successful
   */
  transition(toState, payload = {}) {
    if (this.currentState === toState) {
      return true; // No-op, already in state
    }

    const allowed = this.transitions[this.currentState] || [];
    if (allowed.includes(toState)) {
      const fromState = this.currentState;
      this.currentState = toState;
      this.notify(fromState, toState, payload);
      return true;
    }

    console.warn(`[PingStateMachine] Invalid transition requested: ${this.currentState} -> ${toState}`);
    return false;
  }

  /**
   * Force transition to a state bypassing normal rules (for reset/error recovery).
   * @param {string} toState 
   * @param {object} payload 
   */
  forceTransition(toState, payload = {}) {
    const fromState = this.currentState;
    this.currentState = toState;
    this.notify(fromState, toState, payload);
  }

  /**
   * Register listener callback for state updates.
   * @param {Function} callback - function(fromState, toState, payload)
   * @returns {Function} Unsubscribe function
   */
  onTransition(callback) {
    if (typeof callback === 'function') {
      this.listeners.push(callback);
    }
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  /**
   * Broadcast state changes to subscribers.
   */
  notify(fromState, toState, payload) {
    for (const listener of this.listeners) {
      try {
        listener(fromState, toState, payload);
      } catch (e) {
        console.error('[PingStateMachine] Error in transition listener:', e);
      }
    }
  }

  /**
   * Getter for current state.
   * @returns {string}
   */
  getCurrentState() {
    return this.currentState;
  }
}
