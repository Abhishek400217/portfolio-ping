import { PingMemory } from './PingMemory.js';
import { PingStateMachine } from './PingStateMachine.js';
import { PingMoodEngine } from './PingMoodEngine.js';
import { PingDialogueEngine } from './PingDialogueEngine.js';
import { PingGestureEngine } from './PingGestureEngine.js';
import { PingDecisionEngine } from './PingDecisionEngine.js';
import { PingScheduler } from './PingScheduler.js';

/**
 * PingBrain.js
 * The primary interface and orchestrator for Ping's behavioral engine.
 */
export class PingBrain {
  constructor() {
    // 1. Initialize sub-engines
    this.memory = new PingMemory();
    this.stateMachine = new PingStateMachine('Sleeping');
    this.moodEngine = new PingMoodEngine();
    this.dialogueEngine = new PingDialogueEngine();
    this.gestureEngine = new PingGestureEngine();
    this.decisionEngine = new PingDecisionEngine(this);
    this.scheduler = new PingScheduler(this);

    // Event listener storage
    this.eventListeners = {};

    // Cached outputs
    this.currentMood = 'Sleeping';
    this.currentDialogue = 'Zzz... Sleeping... Move cursor or tap to wake me up...';
    this.currentGesture = null;

    // 2. Wire State Machine transitions to update Mood, Dialogue, and Gestures
    this.stateMachine.onTransition((fromState, toState, payload) => {
      this.recalculateMascotOutputs(toState, payload);
    });

    // 3. Initialize dynamic outputs
    this.recalculateMascotOutputs('Sleeping', {});

    // 4. Start scheduler loops
    this.scheduler.start();
  }

  /**
   * Recalculates and caches mood, dialogue, and gestures.
   * Emits a comprehensive update payload for subscribers.
   */
  recalculateMascotOutputs(activeState, transitionPayload = {}) {
    const memoryMetrics = this.memory.getMetrics();

    // Mood computation
    this.currentMood = this.moodEngine.updateMood(activeState, memoryMetrics);

    // Dialogue generation
    this.currentDialogue = this.dialogueEngine.getDialogue(activeState, this.currentMood, memoryMetrics);

    // Gesture rigging targets
    this.currentGesture = this.gestureEngine.getGesture(
      activeState,
      this.currentMood,
      memoryMetrics,
      transitionPayload
    );

    // Emit global updates
    this.emit('update', {
      state: activeState,
      mood: this.currentMood,
      dialogue: this.currentDialogue,
      gesture: this.currentGesture
    });
  }

  /**
   * Handle mouse moves or scrolling updates on the watching target gesture specifically.
   */
  triggerGestureUpdate(payload) {
    const activeState = this.stateMachine.getCurrentState();
    const memoryMetrics = this.memory.getMetrics();

    this.currentGesture = this.gestureEngine.getGesture(
      activeState,
      this.currentMood,
      memoryMetrics,
      payload
    );

    this.emit('gesture-update', this.currentGesture);
  }

  // --- External API Interface ---

  /**
   * Inject external browser or user interaction triggers.
   * @param {string} eventName 
   * @param {object} payload 
   */
  triggerEvent(eventName, payload = {}) {
    this.decisionEngine.processEvent(eventName, payload);
  }

  getState() {
    return this.stateMachine.getCurrentState();
  }

  getMood() {
    return this.currentMood;
  }

  getDialogue() {
    return this.currentDialogue;
  }

  getGesture() {
    return this.currentGesture;
  }

  // --- Simple Event Emitter System ---

  /**
   * Subscribe to brain events.
   * @param {string} eventType 
   * @param {Function} callback 
   */
  addEventListener(eventType, callback) {
    if (!this.eventListeners[eventType]) {
      this.eventListeners[eventType] = [];
    }
    this.eventListeners[eventType].push(callback);

    // Return unsubscribe function
    return () => {
      this.eventListeners[eventType] = this.eventListeners[eventType].filter(cb => cb !== callback);
    };
  }

  /**
   * Trigger callbacks registered for events.
   */
  emit(eventType, data) {
    const listeners = this.eventListeners[eventType] || [];
    for (const cb of listeners) {
      try {
        cb(data);
      } catch (e) {
        console.error(`[PingBrain] Callback error on event: ${eventType}`, e);
      }
    }
  }

  /**
   * Shutdown scheduler and garbage collect listeners.
   */
  destroy() {
    this.scheduler.stop();
    this.eventListeners = {};
  }
}
