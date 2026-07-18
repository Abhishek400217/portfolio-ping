/**
 * PingMoodEngine.js
 * Calculates the mascot's current emotional mood based on internal state and memory metrics.
 */
export class PingMoodEngine {
  constructor() {
    this.currentMood = 'Relaxed'; // Default mood
  }

  /**
   * Determine the current mood of the mascot.
   * @param {string} stateName - The active State Machine state
   * @param {object} memoryMetrics - The current memory profile from PingMemory.getMetrics()
   */
  updateMood(stateName, memoryMetrics) {
    const { session, persistent } = memoryMetrics;

    // Rule 1: Sleep state dictates sleep mood immediately
    if (stateName === 'Sleeping') {
      this.currentMood = 'Sleeping';
      return this.currentMood;
    }

    // Rule 2: Celebration triggers Excited / Happy mood
    if (stateName === 'Celebrating') {
      this.currentMood = 'Excited';
      return this.currentMood;
    }

    // Rule 3: Direct state-to-mood guides
    if (stateName === 'Thinking' || stateName === 'Confused') {
      this.currentMood = 'Thinking';
      return this.currentMood;
    }

    if (stateName === 'Reading' || stateName === 'ProjectGuide') {
      this.currentMood = 'Focused';
      return this.currentMood;
    }

    // Rule 4: Action-based triggers (Recent contact submit / resume download / github click)
    if (persistent.contactSubmitted && session.idleTime < 5000) {
      this.currentMood = 'Proud';
      return this.currentMood;
    }

    if ((persistent.resumeDownloaded || persistent.githubClicked) && session.idleTime < 8000) {
      this.currentMood = 'Excited';
      return this.currentMood;
    }

    // Rule 5: Idle timeout degrades mood
    if (session.idleTime > 45000) {
      this.currentMood = 'Relaxed';
      return this.currentMood;
    }

    // Rule 6: High mouse speed triggers Playful mood
    if (session.mouseSpeed > 3) {
      this.currentMood = 'Playful';
      return this.currentMood;
    }

    // Rule 7: Movement and activity trigger Curious mood
    if (session.scrollDirection !== 'none' || (session.mouseSpeed > 0.5 && session.mouseSpeed <= 3)) {
      this.currentMood = 'Curious';
      return this.currentMood;
    }

    // Rule 8: Section guided moods
    if (stateName === 'GithubGuide' || stateName === 'ContactGuide') {
      this.currentMood = 'Curious';
      return this.currentMood;
    }

    if (stateName === 'Greeting') {
      this.currentMood = 'Happy';
      return this.currentMood;
    }

    // Default Fallback
    this.currentMood = 'Relaxed';
    return this.currentMood;
  }

  /**
   * Getter for current calculated mood.
   * @returns {string}
   */
  getCurrentMood() {
    return this.currentMood;
  }
}
