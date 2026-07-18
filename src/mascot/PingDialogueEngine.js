/**
 * PingDialogueEngine.js
 * Generates context-aware, memory-sensitive, non-repeating textual dialogue.
 */
export class PingDialogueEngine {
  constructor() {
    this.lastDialogueId = null;

    // Rich database of dialogues with conditional states, moods, and memory criteria
    this.dialoguePool = [
      // --- Booting & Greeting ---
      {
        id: 'booting_default',
        states: ['Booting'],
        moods: ['Relaxed', 'Thinking'],
        text: 'Systems loading... Powering up standard matrices...',
        weight: 1
      },
      {
        id: 'greet_new',
        states: ['Greeting'],
        moods: ['Happy', 'Curious'],
        condition: (m) => !m.persistent.isReturnVisitor,
        text: "Hello there! I'm Ping. Welcome to the portfolio. Let's make something amazing!",
        weight: 3
      },
      {
        id: 'greet_return',
        states: ['Greeting'],
        moods: ['Happy', 'Curious'],
        condition: (m) => m.persistent.isReturnVisitor,
        text: "Welcome back! Good to see you again. Where should we head first?",
        weight: 3
      },
      {
        id: 'greet_generic',
        states: ['Greeting'],
        moods: ['Happy', 'Relaxed'],
        text: "Hey there! Ready to explore? Click anywhere to begin our journey.",
        weight: 1
      },

      // --- Idle States ---
      {
        id: 'idle_new',
        states: ['Idle'],
        moods: ['Relaxed'],
        condition: (m) => m.session.visitedSections.length === 0,
        text: 'Feel free to scroll down. I will guide you through the projects!',
        weight: 2
      },
      {
        id: 'idle_long',
        states: ['Idle'],
        moods: ['Relaxed'],
        condition: (m) => m.session.idleTime > 20000,
        text: "Are you still there? I'm just hanging out, keeping things floating.",
        weight: 1
      },
      {
        id: 'idle_resume_prompt',
        states: ['Idle'],
        moods: ['Playful'],
        condition: (m) => !m.persistent.resumeDownloaded,
        text: "Psst! Have you checked out Abhishek's PDF resume yet? It's pretty sleek.",
        weight: 1.5
      },
      {
        id: 'idle_generic_1',
        states: ['Idle'],
        moods: ['Relaxed'],
        text: 'Hover over the cards to see interactive details!',
        weight: 1
      },
      {
        id: 'idle_generic_2',
        states: ['Idle'],
        moods: ['Playful'],
        text: 'My floating ring is powered by clean kinetic energy. Nice, right?',
        weight: 1
      },

      // --- Watching State ---
      {
        id: 'watching_fast_mouse',
        states: ['Watching'],
        moods: ['Playful'],
        condition: (m) => m.session.mouseSpeed > 2.5,
        text: 'Whoa! That is some fast cursor action. Trying to dizzy me?',
        weight: 2
      },
      {
        id: 'watching_default',
        states: ['Watching'],
        moods: ['Curious', 'Relaxed'],
        text: 'Watching your cursor... Go ahead, point at something interesting!',
        weight: 1
      },

      // --- Guiding State ---
      {
        id: 'guiding_intro',
        states: ['Guiding'],
        moods: ['Curious'],
        text: "Let me show you around. We have skills, projects, and custom certifications.",
        weight: 1
      },

      // --- Celebrating State ---
      {
        id: 'celebrating_resume',
        states: ['Celebrating'],
        moods: ['Excited', 'Proud'],
        condition: (m) => m.persistent.resumeDownloaded,
        text: 'Awesome! Resume downloaded. Hope you like it!',
        weight: 3
      },
      {
        id: 'celebrating_contact',
        states: ['Celebrating'],
        moods: ['Excited', 'Proud'],
        condition: (m) => m.persistent.contactSubmitted,
        text: 'Bingo! Message sent successfully. I will make sure Abhishek reads it!',
        weight: 3
      },
      {
        id: 'celebrating_github',
        states: ['Celebrating'],
        moods: ['Excited'],
        text: 'Launching GitHub repository. Let us inspect some code!',
        weight: 2
      },
      {
        id: 'celebrating_generic',
        states: ['Celebrating'],
        moods: ['Happy', 'Excited'],
        text: 'Woohoo! That was amazing!',
        weight: 1
      },

      // --- Thinking & Confused ---
      {
        id: 'thinking_default',
        states: ['Thinking'],
        moods: ['Thinking'],
        text: 'Processing background telemetry... Calculating optimal layout path...',
        weight: 1
      },
      {
        id: 'confused_long_idle',
        states: ['Confused'],
        moods: ['Thinking'],
        condition: (m) => m.session.idleTime > 30000,
        text: 'Did we lose connection? Or did you wander off for a coffee?',
        weight: 2
      },
      {
        id: 'confused_default',
        states: ['Confused'],
        moods: ['Thinking'],
        text: 'Wait... where did the cursor go? Hmm, fascinating.',
        weight: 1
      },

      // --- Waiting State ---
      {
        id: 'waiting_contact',
        states: ['Waiting'],
        moods: ['Curious', 'Focused'],
        text: 'Waiting for you to fill in the message details. Take your time!',
        weight: 1
      },

      // --- Reading State ---
      {
        id: 'reading_skills',
        states: ['Reading'],
        moods: ['Focused'],
        condition: (m) => m.session.visitedSections.includes('skills'),
        text: 'Inspecting core competencies. He is quite proficient in Javascript and WebGL!',
        weight: 2
      },
      {
        id: 'reading_default',
        states: ['Reading'],
        moods: ['Focused'],
        text: 'Scanning page content... Looks like highly optimized structures.',
        weight: 1
      },

      // --- Section Specific Guides ---
      {
        id: 'guide_projects',
        states: ['ProjectGuide'],
        moods: ['Curious', 'Focused'],
        text: 'These projects are live! Click on the display links to see them in action.',
        weight: 2
      },
      {
        id: 'guide_github',
        states: ['GithubGuide'],
        moods: ['Curious', 'Playful'],
        text: 'GitHub has all open-source repositories. Feel free to fork or drop a star!',
        weight: 2
      },
      {
        id: 'guide_contact',
        states: ['ContactGuide'],
        moods: ['Curious', 'Relaxed'],
        text: 'You can write a direct email here. I will handle the transit pipelines.',
        weight: 2
      },

      // --- Goodbye & Sleeping ---
      {
        id: 'goodbye_default',
        states: ['Goodbye'],
        moods: ['Relaxed'],
        text: 'Shutting down operational arrays. Goodbye for now, friend!',
        weight: 1
      },
      {
        id: 'sleeping_default',
        states: ['Sleeping'],
        moods: ['Sleeping'],
        text: 'Zzz... Sleeping... Move cursor or tap to wake me up...',
        weight: 1
      }
    ];
  }

  /**
   * Resolve a dialogue string dynamically.
   * @param {string} stateName 
   * @param {string} moodName 
   * @param {object} memoryMetrics - Outputs from PingMemory
   * @returns {string} Dialog text
   */
  getDialogue(stateName, moodName, memoryMetrics) {
    // 1. Filter candidates matching current state
    let candidates = this.dialoguePool.filter(d => {
      // Must match state
      if (!d.states.includes(stateName)) return false;
      
      // Must match mood if moods constraint exists
      if (d.moods && !d.moods.includes(moodName)) return false;

      // Must satisfy custom memory conditions
      if (d.condition && !d.condition(memoryMetrics)) return false;

      return true;
    });

    // Fallback: If no candidate matches this state-mood-condition, broaden search to state-only
    if (candidates.length === 0) {
      candidates = this.dialoguePool.filter(d => d.states.includes(stateName));
    }

    // Fallback 2: If still empty, return a generic fallback
    if (candidates.length === 0) {
      return 'Initializing query protocols...';
    }

    // 2. Filter out the last spoken dialogue ID if there are multiple options
    if (candidates.length > 1) {
      const nonRepeating = candidates.filter(d => d.id !== this.lastDialogueId);
      if (nonRepeating.length > 0) {
        candidates = nonRepeating;
      }
    }

    // 3. Select via weighted random picker
    const selected = this.weightedRandomSelect(candidates);
    this.lastDialogueId = selected.id;

    return selected.text;
  }

  /**
   * Helper to select item based on relative weight properties.
   * @param {Array} list 
   * @returns {Object}
   */
  weightedRandomSelect(list) {
    const totalWeight = list.reduce((sum, item) => sum + (item.weight || 1), 0);
    let r = Math.random() * totalWeight;
    
    for (const item of list) {
      const w = item.weight || 1;
      if (r <= w) {
        return item;
      }
      r -= w;
    }
    return list[0];
  }
}
