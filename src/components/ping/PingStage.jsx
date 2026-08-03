import React, { forwardRef } from 'react';
import Ping from '../mascot/Ping.jsx';

/**
 * PingStage
 * Global persistent mascot stage component mounted EXACTLY ONCE.
 * Renders <Ping /> only one time throughout the application lifecycle.
 *
 * GSAP Intro and Hero timelines transform this stage directly
 * (x, y, scale, opacity) without ever mounting or unmounting Ping.
 */
const PingStage = forwardRef(({
  bubbleText = '',
  bubbleVisible = false,
  bubbleTyping = false,
  bubbleRef = null,
  style = {},
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate3d(-50%, -50%, 0)',
        willChange: 'transform',
        width: 380,
        height: 380,
        zIndex: 10000,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style
      }}
      {...props}
    >
      <div style={{ pointerEvents: 'auto', width: '100%', height: '100%' }}>
        <Ping
          bubbleText={bubbleText}
          bubbleVisible={bubbleVisible}
          bubbleTyping={bubbleTyping}
          bubbleRef={bubbleRef}
          expression="happy"
          armPose="wave"
        />
      </div>
    </div>
  );
});

PingStage.displayName = 'PingStage';
export default PingStage;
