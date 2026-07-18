import { useContext } from 'react';
import { RobotContext } from '../context/RobotContext.jsx';

/**
 * usePing
 * Returns the current RobotContext value containing state, mood, gestures,
 * dialogue text, and event trigger functions.
 */
export function usePing() {
  const context = useContext(RobotContext);
  if (!context) {
    throw new Error('[usePing] must be used within a RobotProvider.');
  }
  return context;
}
