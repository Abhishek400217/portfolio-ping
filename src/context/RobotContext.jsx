import React, { createContext, useState, useEffect, useMemo, useRef } from 'react';
import { useSpring } from 'framer-motion';
import { PingBrain } from '../mascot/PingBrain.js';
import { MASCOT_CONFIG } from '../config.js';

export const RobotContext = createContext(null);

/**
 * RobotProvider
 * Coordinates the singleton lifecycle of PingBrain in React.
 * Executes the cinematic mascot boot sequence timers.
 */
export function RobotProvider({ children }) {
  // 1. Memoize brain instance to guarantee single-instance lifespan
  const brain = useMemo(() => new PingBrain(), []);

  // Shared look-at spring motion values
  const lookX = useSpring(0, { stiffness: 100, damping: 15, mass: 0.8 });
  const lookY = useSpring(0, { stiffness: 100, damping: 15, mass: 0.8 });
  const lookRotation = useMemo(() => ({ x: lookX, y: lookY }), [lookX, lookY]);

  // Determine initial boot state from developer config
  const initBoot = MASCOT_CONFIG.bootEnabled && !MASCOT_CONFIG.instantHero && !MASCOT_CONFIG.preview;

  // 2. React states matching FSM updates
  const [stateName, setStateName] = useState(initBoot ? 'Sleeping' : 'Idle');
  const [moodName, setMoodName] = useState(initBoot ? 'Sleeping' : 'Relaxed');
  const [gesture, setGesture] = useState(null);
  const [typing, setTyping] = useState(false);
  const [displayText, setDisplayText] = useState(
    initBoot 
      ? 'Zzz... Sleeping... Move cursor or tap to wake me up...' 
      : 'Welcome! Abhishek is ready to take on new projects.'
  );

  // Boot sequence animation step state
  // 'black-screen' | 'dock-on' | 'ping-wakes' | 'ring-spins' | 'eyes-open' | 'wave' | 'bubble' | 'ready'
  const [bootStep, setBootStep] = useState(initBoot ? null : 'ready');

  const typingTimerRef = useRef(null);
  const bootTimersRef = useRef([]);

  // Clear helper for active boot sequence timers
  const clearBootTimers = () => {
    if (bootTimersRef.current.length > 0) {
      bootTimersRef.current.forEach(clearTimeout);
      bootTimersRef.current = [];
    }
  };

  // 3. Connect update listener
  useEffect(() => {
    if (!initBoot) {
      brain.stateMachine.forceTransition('Idle');
    }

    const unsubscribe = brain.addEventListener('update', (data) => {
      // Clear trailing typing and boot timers
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      
      // If FSM goes to Sleeping, reset boot step
      if (data.state === 'Sleeping') {
        clearBootTimers();
        setBootStep(initBoot ? null : 'ready');
        setTyping(false);
        setStateName(data.state);
        setMoodName(data.mood);
        setGesture(data.gesture);
        setDisplayText(data.dialogue);
        return;
      }

      // If FSM triggers Booting, execute the cinematic timeline
      if (data.state === 'Booting') {
        clearBootTimers();

        // Support preview mode bypass
        if (MASCOT_CONFIG.skipIntro || MASCOT_CONFIG.instantHero) {
          setBootStep('ready');
          brain.stateMachine.forceTransition('Idle');
          return;
        }

        // Timeline: Black screen -> Dock powers on -> Ping wakes -> Ring spins -> Eyes open -> Wave -> Bubble types -> Wait for click -> Hero reveal
        setBootStep('black-screen');
        setTyping(false);
        setDisplayText('');
        setStateName('Booting');
        setMoodName('Sleeping');

        const t1 = setTimeout(() => setBootStep('dock-on'), 600);
        const t2 = setTimeout(() => setBootStep('ping-wakes'), 1200);
        const t3 = setTimeout(() => setBootStep('ring-spins'), 1800);
        const t4 = setTimeout(() => setBootStep('eyes-open'), 2400);
        const t5 = setTimeout(() => {
          setBootStep('wave');
          setTyping(true);
        }, 3000);
        const t6 = setTimeout(() => {
          setBootStep('bubble');
          setTyping(false);
          setDisplayText("Hello there.");
        }, 3800);

        bootTimersRef.current = [t1, t2, t3, t4, t5, t6];
        return;
      }

      // Standard operational transitions
      setStateName(data.state);
      setMoodName(data.mood);
      setGesture(data.gesture);

      setTyping(true);
      typingTimerRef.current = setTimeout(() => {
        setTyping(false);
        setDisplayText(data.dialogue);
      }, 900);
    });

    return () => {
      unsubscribe();
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      clearBootTimers();
      brain.destroy();
    };
  }, [brain, initBoot]);

  // 4. Resolve visual gestures dynamically based on the active boot sequence step
  const activeGesture = useMemo(() => {
    if (!bootStep || bootStep === 'ready') return gesture;

    const baseGesture = {
      eyeExpression: 'DEFAULT',
      headRotation: { x: 0, y: 0, z: 0 },
      armAnimation: 'RELAXED',
      bodyPose: 'HOVER_NORMAL',
      floatingRing: { speed: 0, color: '#005522', pulse: true, height: 3 }
    };

    switch (bootStep) {
      case 'black-screen':
        return {
          ...baseGesture,
          eyeExpression: 'wink', // Closed/Off look
          headRotation: { x: -0.25, y: 0, z: 0 },
          armAnimation: 'FOLDED',
          bodyPose: 'FLOAT_LOW',
          floatingRing: { speed: 0, color: 'transparent', pulse: false, height: 9 },
          dockState: 'close' // Hidden
        };

      case 'dock-on':
        return {
          ...baseGesture,
          eyeExpression: 'wink', // Closed/Off look
          headRotation: { x: -0.25, y: 0, z: 0 },
          armAnimation: 'FOLDED',
          bodyPose: 'FLOAT_LOW',
          floatingRing: { speed: 0, color: 'transparent', pulse: false, height: 9 },
          dockState: 'boot' // Powers on
        };

      case 'ping-wakes':
        return {
          ...baseGesture,
          eyeExpression: 'wink', // Blinks first
          headRotation: { x: -0.25, y: 0, z: 0 },
          armAnimation: 'FOLDED',
          bodyPose: 'FLOAT_LOW',
          floatingRing: { speed: 0, color: '#005522', pulse: true, height: 9 },
          dockState: 'boot'
        };

      case 'ring-spins':
        return {
          ...baseGesture,
          eyeExpression: 'wink',
          headRotation: { x: 0, y: 0, z: 0 }, // Head upright
          armAnimation: 'FOLDED',
          bodyPose: 'FLOAT_LOW',
          floatingRing: { speed: 15, color: '#10b981', pulse: true, height: 9 },
          dockState: 'boot'
        };

      case 'eyes-open':
        return {
          ...baseGesture,
          eyeExpression: 'sleepy', // Eyes open
          headRotation: { x: 0, y: 0, z: 0 },
          armAnimation: 'RELAXED',
          bodyPose: 'HOVER_NORMAL', // Body floats
          floatingRing: { speed: 12, color: '#10b981', pulse: false, height: 0 },
          dockState: 'idle'
        };

      case 'wave':
      case 'bubble':
        return {
          ...baseGesture,
          eyeExpression: 'happy',
          headRotation: { x: 0, y: 0, z: 0 },
          armAnimation: 'wave',
          bodyPose: 'HOVER_NORMAL',
          floatingRing: { speed: 20, color: '#00FF88', pulse: false, height: 0 },
          dockState: 'idle'
        };

      default:
        return baseGesture;
    }
  }, [bootStep, gesture]);

  // 5. Exposed interaction triggers
  const triggerEvent = (eventName, payload = {}) => {
    brain.triggerEvent(eventName, payload);
  };

  // Click handler coordinating transition exits from the boot greeting phase
  const handleMascotClick = () => {
    if (bootStep === 'bubble') {
      clearBootTimers();
      setBootStep('ready');
      brain.stateMachine.forceTransition('Idle');
    } else if (stateName === 'Sleeping') {
      triggerEvent('MOUSE_MOVE', { x: 0, y: 0 }); // Wakes up
    } else {
      triggerEvent('CLICK_MASCOT');
    }
  };

  const contextValue = {
    state: stateName,
    mood: moodName,
    dialogue: displayText,
    gesture: activeGesture,
    typing,
    triggerEvent,
    bootStep,
    handleMascotClick,
    lookRotation
  };

  return (
    <RobotContext.Provider value={contextValue}>
      {children}
    </RobotContext.Provider>
  );
}
