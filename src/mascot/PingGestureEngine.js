/**
 * PingGestureEngine.js
 * Generates coordinate matrices and expression identifiers for Ping's visual rigging.
 */
export class PingGestureEngine {
  /**
   * Calculate precise posing telemetry for renderer mapping.
   * @param {string} stateName - Current state machine state
   * @param {string} moodName - Current mood engine mood
   * @param {object} memoryMetrics - Calculated behavior stats from Memory
   * @param {object} transitionPayload - Data payload passed during the transition (e.g. normalized target mouse coordinates)
   * @returns {object} Posing package containing eye, head, arm, body, and ring parameters.
   */
  getGesture(stateName, moodName, memoryMetrics, transitionPayload = {}) {
    // Default / Neutral gesture baseline
    const gesture = {
      eyeExpression: 'DEFAULT',
      headRotation: { x: 0, y: 0, z: 0 },
      armAnimation: 'RELAXED',
      bodyPose: 'HOVER_NORMAL',
      floatingRing: {
        speed: 10,       // RPM
        color: '#E1E1E1', // Default warm white
        pulse: false,
        height: 0        // mm offset
      }
    };

    // 1. Resolve basic layout and posing overrides based on State
    switch (stateName) {
      case 'Sleeping':
        gesture.eyeExpression = 'SLEEPING';
        gesture.headRotation = { x: -0.25, y: 0, z: 0 };
        gesture.armAnimation = 'FOLDED';
        gesture.bodyPose = 'FLOAT_LOW';
        gesture.floatingRing = { speed: 3, color: '#005522', pulse: true, height: -3 };
        break;

      case 'Booting':
        gesture.eyeExpression = 'SLEEPING';
        gesture.headRotation = { x: -0.1, y: 0, z: 0 };
        gesture.armAnimation = 'RELAXED';
        gesture.bodyPose = 'HOVER_NORMAL';
        gesture.floatingRing = { speed: 12, color: '#666666', pulse: true, height: 0 };
        break;

      case 'Greeting':
        gesture.eyeExpression = 'HAPPY';
        gesture.headRotation = { x: 0.05, y: 0, z: 0 };
        gesture.armAnimation = 'WAVE';
        gesture.bodyPose = 'HOVER_NORMAL';
        gesture.floatingRing = { speed: 20, color: '#00FF88', pulse: false, height: 2 };
        break;

      case 'Celebrating':
        gesture.eyeExpression = 'HAPPY';
        gesture.headRotation = { x: 0.15, y: 0, z: 0.05 };
        gesture.armAnimation = 'CELEBRATE';
        gesture.bodyPose = 'HOP';
        gesture.floatingRing = { speed: 50, color: '#00FF88', pulse: true, height: 4 };
        break;

      case 'Thinking':
        gesture.eyeExpression = 'SQUINT';
        gesture.headRotation = { x: 0.1, y: -0.15, z: 0.08 };
        gesture.armAnimation = 'THINKING';
        gesture.bodyPose = 'HOVER_NORMAL';
        gesture.floatingRing = { speed: 5, color: '#FFCC00', pulse: true, height: -1 };
        break;

      case 'Confused':
        gesture.eyeExpression = 'SQUINT';
        gesture.headRotation = { x: -0.05, y: 0.2, z: -0.1 };
        gesture.armAnimation = 'RELAXED';
        gesture.bodyPose = 'HOVER_NORMAL';
        gesture.floatingRing = { speed: 4, color: '#FF5500', pulse: true, height: 0 };
        break;

      case 'Waiting':
        gesture.eyeExpression = 'DEFAULT';
        gesture.headRotation = { x: -0.1, y: 0, z: 0 };
        gesture.armAnimation = 'FOLDED';
        gesture.bodyPose = 'HOVER_NORMAL';
        gesture.floatingRing = { speed: 8, color: '#999999', pulse: true, height: -1 };
        break;

      case 'Reading':
      case 'ProjectGuide':
        gesture.eyeExpression = 'SQUINT';
        gesture.headRotation = { x: -0.15, y: -0.2, z: 0 };
        gesture.armAnimation = 'FOLDED';
        gesture.bodyPose = 'LEAN_FORWARD';
        gesture.floatingRing = { speed: 12, color: '#00AAFF', pulse: false, height: 1 };
        break;

      case 'GithubGuide':
        gesture.eyeExpression = 'HAPPY';
        gesture.headRotation = { x: 0.05, y: 0.25, z: 0.05 };
        gesture.armAnimation = 'WAVE';
        gesture.bodyPose = 'HOVER_NORMAL';
        gesture.floatingRing = { speed: 22, color: '#00FF88', pulse: false, height: 1 };
        break;

      case 'ContactGuide':
        gesture.eyeExpression = 'CURIOUS';
        gesture.headRotation = { x: 0.1, y: -0.1, z: 0 };
        gesture.armAnimation = 'RELAXED';
        gesture.bodyPose = 'LEAN_FORWARD';
        gesture.floatingRing = { speed: 15, color: '#E1E1E1', pulse: true, height: 0 };
        break;

      case 'Watching':
        gesture.eyeExpression = 'CURIOUS';
        gesture.bodyPose = 'HOVER_NORMAL';
        gesture.floatingRing = { speed: 10, color: '#00FF88', pulse: false, height: 0 };
        
        // Dynamic look-at targeting if mouse coordinates are available
        // Coordinates should be normalized between -1.0 and 1.0
        if (typeof transitionPayload.mouseX === 'number' && typeof transitionPayload.mouseY === 'number') {
          // Map range [-1, 1] to physical rotation limits (approx +/- 22 degrees in radians)
          gesture.headRotation.y = transitionPayload.mouseX * 0.4;
          gesture.headRotation.x = -transitionPayload.mouseY * 0.3; // Invert pitch
          gesture.headRotation.z = transitionPayload.mouseX * 0.1; // Add subtle head tilt
        }
        break;

      case 'Goodbye':
        gesture.eyeExpression = 'HAPPY';
        gesture.headRotation = { x: -0.1, y: 0, z: 0 };
        gesture.armAnimation = 'WAVE';
        gesture.bodyPose = 'FLOAT_LOW';
        gesture.floatingRing = { speed: 5, color: '#888888', pulse: false, height: -2 };
        break;

      default:
        // Idle default
        gesture.eyeExpression = 'DEFAULT';
        gesture.bodyPose = 'HOVER_NORMAL';
        break;
    }

    // 2. Adjust gesture characteristics based on active Mood triggers
    if (stateName !== 'Sleeping' && stateName !== 'Goodbye') {
      if (moodName === 'Excited') {
        gesture.eyeExpression = 'HAPPY';
        gesture.floatingRing.speed = Math.max(gesture.floatingRing.speed, 35);
        gesture.floatingRing.color = '#00FF88';
      } else if (moodName === 'Playful') {
        gesture.eyeExpression = 'WINK';
        gesture.floatingRing.speed = Math.max(gesture.floatingRing.speed, 20);
        gesture.headRotation.z += 0.1; // Tilt head playfully
      } else if (moodName === 'Focused') {
        gesture.eyeExpression = 'SQUINT';
        gesture.floatingRing.color = '#00AAFF';
      } else if (moodName === 'Proud') {
        gesture.eyeExpression = 'HAPPY';
        gesture.bodyPose = 'HOP';
        gesture.floatingRing.color = '#00FF88';
      } else if (moodName === 'Curious') {
        gesture.eyeExpression = 'CURIOUS';
        gesture.headRotation.x += 0.05;
      }
    }

    return gesture;
  }
}
