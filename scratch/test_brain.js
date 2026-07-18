import { PingBrain } from '../src/mascot/PingBrain.js';

console.log('=== INITIALIZING PING MASCOT BRAIN TEST ===\n');

const brain = new PingBrain();

// Keep track of assertions
let testPassed = true;
const logState = (evt) => {
  console.log(`[Update Event]`);
  console.log(`  State:    ${evt.state}`);
  console.log(`  Mood:     ${evt.mood}`);
  console.log(`  Dialogue: "${evt.dialogue}"`);
  if (evt.gesture) {
    console.log(`  Gesture:  Eyes=${evt.gesture.eyeExpression}, Arm=${evt.gesture.armAnimation}, RingSpeed=${evt.gesture.floatingRing.speed}`);
  }
  console.log('--------------------------------------------------');
};

// Subscribe to state updates
brain.addEventListener('update', logState);

try {
  // Test 1: Initial state is Sleeping
  console.log('Test 1: Verify Initial State');
  if (brain.getState() !== 'Sleeping') {
    console.error('FAIL: Initial state is not Sleeping!');
    testPassed = false;
  } else {
    console.log('PASS: Initial state is Sleeping.');
  }

  // Test 2: Wake up via mouse movement
  console.log('\nTest 2: Wake up via MOUSE_MOVE');
  brain.triggerEvent('MOUSE_MOVE', { x: 0.1, y: -0.2 });
  if (brain.getState() !== 'Booting') {
    console.error('FAIL: Did not transition to Booting on MOUSE_MOVE!');
    testPassed = false;
  } else {
    console.log('PASS: Transitioned to Booting.');
  }

  // Test 3: Complete Booting transition
  console.log('\nTest 3: Transition Booting -> Greeting');
  brain.stateMachine.transition('Greeting');
  if (brain.getState() !== 'Greeting') {
    console.error('FAIL: Did not transition to Greeting!');
    testPassed = false;
  } else {
    console.log('PASS: Transitioned to Greeting.');
  }

  // Test 4: Section enters "projects"
  console.log('\nTest 4: User scrolls to Projects section');
  brain.triggerEvent('SECTION_ENTER', { sectionId: 'projects' });
  if (brain.getState() !== 'ProjectGuide') {
    console.error('FAIL: Did not transition to ProjectGuide!');
    testPassed = false;
  } else {
    console.log('PASS: Transitioned to ProjectGuide.');
  }

  // Test 5: Click GitHub link -> celebrating
  console.log('\nTest 5: Trigger GITHUB_CLICK');
  brain.triggerEvent('GITHUB_CLICK');
  if (brain.getState() !== 'Celebrating') {
    console.error('FAIL: Did not transition to Celebrating on GitHub click!');
    testPassed = false;
  } else {
    console.log('PASS: Transitioned to Celebrating.');
  }

  // Test 6: Inactivity trigger -> Sleeping
  console.log('\nTest 6: Simulating Idle Timeout (60 seconds)');
  // We can manually manipulate idle time and trigger a scheduler check
  brain.memory.incrementIdleTime(60000);
  brain.scheduler.checkIdleThresholds();
  if (brain.getState() !== 'Sleeping') {
    console.error('FAIL: Idle check did not transition to Sleeping after 60s!');
    testPassed = false;
  } else {
    console.log('PASS: Transitioned to Sleeping after idle timeout.');
  }

  // Final summary
  console.log('\n==================================================');
  if (testPassed) {
    console.log('SUCCESS: All mascot brain logic validation tests passed!');
  } else {
    console.log('FAILURE: One or more tests failed.');
  }
  console.log('==================================================');

} catch (error) {
  console.error('An error occurred during brain testing:', error);
  testPassed = false;
} finally {
  // Clean up timers
  brain.destroy();
}
