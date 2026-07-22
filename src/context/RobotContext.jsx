import React, { createContext, useState, useEffect, useMemo, useRef } from 'react';
import { useSpring } from 'framer-motion';
import { PingBrain } from '../mascot/PingBrain.js';
import { MASCOT_CONFIG } from '../config.js';
import useScroll from '../hooks/useScroll.js';

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

  // Determine initial boot state
  const initBoot = false;

  // 2. React states matching FSM updates
  const [stateName, setStateName] = useState('Idle');
  const [moodName, setMoodName] = useState('Relaxed');
  const [gesture, setGesture] = useState(null);
  const [typing, setTyping] = useState(false);
  const [displayText, setDisplayText] = useState('');

  // Boot sequence animation step state ('intro' | 'ready')
  const [bootStep, setBootStep] = useState('intro');
  const [clickSmiled, setClickSmiled] = useState(false);
  const [microGesture, setMicroGesture] = useState(null);

  const typingTimerRef = useRef(null);
  const autoHideTimerRef = useRef(null);
  const bootTimersRef = useRef([]);

  // Clear helper for active boot sequence timers
  const clearBootTimers = () => {
    if (bootTimersRef.current.length > 0) {
      bootTimersRef.current.forEach(clearTimeout);
      bootTimersRef.current = [];
    }
  };

  // Scroll lock during boot sequence
  useEffect(() => {
    if (initBoot && bootStep && bootStep !== 'ready') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [bootStep, initBoot]);

  // Click handler coordinating transition exits from the boot greeting phase
  const handleMascotClick = () => {
    if (bootStep === 'bubble') {
      clearBootTimers();
      setBootStep('ready');
      setDisplayText('');
      setClickSmiled(true);
      setTimeout(() => {
        setClickSmiled(false);
      }, 2000); // Keep smile and wave active during 1.2s flight duration + offset
      brain.stateMachine.forceTransition('Idle');
    } else if (stateName === 'Sleeping') {
      triggerEvent('MOUSE_MOVE', { x: 0, y: 0 }); // Wakes up
    } else {
      triggerEvent('CLICK_MASCOT');
    }
  };

  // Global click anywhere listener when bootStep is 'bubble'
  useEffect(() => {
    if (bootStep === 'bubble') {
      const handleGlobalClick = () => {
        handleMascotClick();
      };
      const timer = setTimeout(() => {
        window.addEventListener('click', handleGlobalClick);
        window.addEventListener('touchend', handleGlobalClick);
      }, 100);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('click', handleGlobalClick);
        window.removeEventListener('touchend', handleGlobalClick);
      };
    }
  }, [bootStep]);

  // 3. Connect update listener
  useEffect(() => {
    if (!initBoot) {
      brain.stateMachine.forceTransition('Idle');
    }

    const unsubscribe = brain.addEventListener('update', (data) => {
      // Clear trailing typing timers
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      
      // Mute dialogue updates during Intro phase
      if (bootStep === 'intro') {
        setStateName(data.state || 'Idle');
        setMoodName(data.mood || 'Relaxed');
        setGesture(data.gesture || null);
        return;
      }

      // Standard operational transitions after Intro completes
      setStateName(data.state);
      setMoodName(data.mood);
      setGesture(data.gesture);

      if (autoHideTimerRef.current) clearTimeout(autoHideTimerRef.current);

      setTyping(true);
      typingTimerRef.current = setTimeout(() => {
        setTyping(false);
        setDisplayText(data.dialogue);

        if (data.dialogue) {
          autoHideTimerRef.current = setTimeout(() => {
            setDisplayText('');
          }, 6000);
        }
      }, 900);
    });

    const unsubscribePrompt = brain.addEventListener('dialogue-prompt', (data) => {
      if (bootStep === 'intro') return;
      if (autoHideTimerRef.current) clearTimeout(autoHideTimerRef.current);

      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setDisplayText(data.text);

        // Auto hide after 6 seconds
        autoHideTimerRef.current = setTimeout(() => {
          setDisplayText('');
        }, 6000);
      }, 900);
    });

    const unsubscribeMicro = brain.addEventListener('micro-gesture', (data) => {
      setMicroGesture(data);
      const duration = data.eyeExpression === 'wink' ? 800 : 2500;
      setTimeout(() => {
        setMicroGesture(null);
      }, duration);
    });

    return () => {
      unsubscribe();
      unsubscribePrompt();
      unsubscribeMicro();
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      if (autoHideTimerRef.current) clearTimeout(autoHideTimerRef.current);
      clearBootTimers();
      brain.destroy();
    };
  }, [brain, initBoot]);

  // Hook up global activeSection scroll triggers
  const { activeSection } = useScroll();

  useEffect(() => {
    if (activeSection && bootStep === 'ready') {
      triggerEvent('SECTION_ENTER', { sectionId: activeSection });
    }
  }, [activeSection, bootStep]);

  // Hook up global document events (mouseleave, mouseenter, scroll)
  useEffect(() => {
    const handleMouseLeave = () => {
      triggerEvent('MOUSE_LEAVE');
    };
    const handleMouseEnter = () => {
      triggerEvent('MOUSE_RETURN');
    };
    const handleScroll = () => {
      triggerEvent('SCROLL', { scrollY: window.scrollY });
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 4. Resolve visual gestures dynamically based on the active boot sequence step
  const activeGesture = useMemo(() => {
    let resolved = gesture;

    if (microGesture && resolved) {
      resolved = {
        ...resolved,
        ...microGesture,
        floatingRing: {
          ...resolved.floatingRing,
          ...microGesture.floatingRing
        }
      };
    }

    if (bootStep && bootStep !== 'ready') {
      const baseGesture = {
        eyeExpression: 'DEFAULT',
        headRotation: { x: 0, y: 0, z: 0 },
        armAnimation: 'RELAXED',
        bodyPose: 'HOVER_NORMAL',
        floatingRing: { speed: 0, color: '#005522', pulse: true, height: 3 }
      };

      switch (bootStep) {
        case 'black-screen':
          resolved = {
            ...baseGesture,
            eyeExpression: 'sleeping',
            headRotation: { x: -0.25, y: 0, z: 0 },
            armAnimation: 'FOLDED',
            bodyPose: 'FLOAT_LOW',
            floatingRing: { speed: 0, color: 'transparent', pulse: false, height: 9 },
            dockState: 'off'
          };
          break;

        case 'dock-on':
          resolved = {
            ...baseGesture,
            eyeExpression: 'sleeping',
            headRotation: { x: -0.25, y: 0, z: 0 },
            armAnimation: 'FOLDED',
            bodyPose: 'FLOAT_LOW',
            floatingRing: { speed: 0, color: 'transparent', pulse: false, height: 9 },
            dockState: 'boot'
          };
          break;

        case 'ping-boot':
          resolved = {
            ...baseGesture,
            eyeExpression: 'sleeping',
            headRotation: { x: -0.25, y: 0, z: 0 },
            armAnimation: 'FOLDED',
            bodyPose: 'FLOAT_LOW',
            floatingRing: { speed: 10, color: '#10b981', pulse: true, height: 9 },
            dockState: 'boot'
          };
          break;

        case 'ping-wake':
          resolved = {
            ...baseGesture,
            eyeExpression: 'sleepy',
            headRotation: { x: 0, y: 0, z: 0 },
            armAnimation: 'RELAXED',
            bodyPose: 'HOVER_NORMAL',
            floatingRing: { speed: 12, color: '#10b981', pulse: false, height: 0 },
            dockState: 'idle'
          };
          break;

        case 'bubble-typing':
        case 'bubble':
          resolved = {
            ...baseGesture,
            eyeExpression: 'happy',
            headRotation: { x: 0, y: 0, z: 0 },
            armAnimation: 'wave',
            bodyPose: 'HOVER_NORMAL',
            floatingRing: { speed: 20, color: '#00FF88', pulse: false, height: 0 },
            dockState: 'idle'
          };
          break;

        default:
          resolved = baseGesture;
          break;
      }
    }

    if (clickSmiled && resolved) {
      return {
        ...resolved,
        eyeExpression: 'happy',
        armAnimation: 'wave'
      };
    }

    return resolved;
  }, [bootStep, gesture, clickSmiled]);

  // 5. Exposed interaction triggers
  const triggerEvent = (eventName, payload = {}) => {
    brain.triggerEvent(eventName, payload);
  };

  const completeIntro = () => {
    setBootStep('ready');
  };

  const contextValue = {
    state: stateName,
    mood: moodName,
    dialogue: displayText,
    gesture: activeGesture,
    typing,
    triggerEvent,
    bootStep,
    completeIntro,
    handleMascotClick,
    lookRotation
  };

  return (
    <RobotContext.Provider value={contextValue}>
      {children}
    </RobotContext.Provider>
  );
}
