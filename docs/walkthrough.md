# Walkthrough: Mascot Behavior Engine, Background, Content, Visual Rigging, State Connection, Vision Pro Dock, Boot Sequence, GSAP Hero Timelines, Look-At Parallax, Cursor Attraction, Idle Ticks, Final Hero Integration, Developer Preview Mode, Pixar-Style Chibi Rigging, & Interactive Bubble/Dock Integrations

This walkthrough covers all completed subsystems, final integration layouts, and the visual geometry upgrades of **Portfolio Ping**:
1.  The FSM Mascot Behavior Engine ("The Brain").
2.  The Hero Background System ("The Canvas").
3.  The Hero Content Architecture ("The Content Frame").
4.  The Mascot Visual System ("The Rigging").
5.  The Mascot Context-Hook Connection ("The Nervous System").
6.  The Vision Pro Holographic Dock ("The Base").
7.  The Cinematic Boot Sequence ("The Awakening").
8.  The GSAP Hero Reveal Timeline ("The Choreography").
9.  The Look-At Parallax Controller ("The Eyes").
10. The Cursor Attraction & Idle Intelligence Systems ("The Interaction").
11. The Developer Config Preview Mappings ("The Toggle").
12. The Final Hero Integration Layout ("The Experience").
13. The Full Project Integration Audit ("The Verification").
14. The Pixar-Style Chibi Visual Geometry ("The Proportions").
15. The Speech Bubble & Platform Dock Connections ("The Interface").

All subsystems are modular, production-ready, and verified to compile and run successfully.

---

## Part 1: Mascot Behavior Engine ("The Brain")

The engine is placed inside the dedicated mascot directory:
*   [src/mascot/](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/mascot/)
    *   [PingBrain.js](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/mascot/PingBrain.js) — The central coordinator that binds all modules and exposes subscription/event listener APIs.
    *   [PingStateMachine.js](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/mascot/PingStateMachine.js) — Strict finite state machine enforcing validation rules across 15 states.
    *   [PingMemory.js](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/mascot/PingMemory.js) — Tracking data (mouse speed, scrolling, visited sections, file downloads, and persistent local storage metrics).
    *   [PingMoodEngine.js](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/mascot/PingMoodEngine.js) — Calculates moods dynamically (e.g. Playful, Focused, Curious, Sleeping) based on active state and memory.
    *   [PingDialogueEngine.js](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/mascot/PingDialogueEngine.js) — Selects weighted, context-relevant lines while preventing consecutive repetition.
    *   [PingGestureEngine.js](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/mascot/PingGestureEngine.js) — Returns 3D rigging configurations (look-at angles, arm movements, eye expressions, and floating ring speeds).
    *   [PingDecisionEngine.js](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/mascot/PingDecisionEngine.js) — Standard event router converting user input triggers (scrolling, clicking links, submitting forms) into state shifts.
    *   [PingScheduler.js](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/mascot/PingScheduler.js) — Manages idle checks, micro-gesture intervals, and guided reminders.

### Testing & Verification
The engine's logic was verified using a local test harness:
*   [scratch/test_brain.js](file:///c:/Users/User/Desktop/Portfolio%20Ping/scratch/test_brain.js)

All 6 test cases (waking, booting, section entries, GitHub link celebrations, and 60-second idle timeouts to sleep) successfully passed with correct, reactive outputs.

---

## Part 2: Hero Background System ("The Canvas")

We implemented a layered, responsive background canvas for the Hero section. It is built strictly using **React and CSS Modules**, utilizing existing design system variables from `index.css`.

### Directory Structure
*   [src/sections/Hero/background/](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/sections/Hero/background/)
    *   [BackgroundRoot.jsx](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/sections/Hero/background/BackgroundRoot.jsx) — Main orchestrator stacking layers and exposing refs for GSAP/Three.js hooks.
    *   [BackgroundRoot.module.css](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/sections/Hero/background/BackgroundRoot.module.css) — Handles fullscreen bounds, `z-index`, overflow containment, and GPU hardware acceleration (`will-change: transform`).
    *   [GradientLayer.jsx](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/sections/Hero/background/GradientLayer.jsx) & [GradientLayer.module.css](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/sections/Hero/background/GradientLayer.module.css) — Renders the dark, premium linear-to-radial color backdrop layers.
    *   [GridLayer.jsx](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/sections/Hero/background/GridLayer.jsx) & [GridLayer.module.css](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/sections/Hero/background/GridLayer.module.css) — Renders a repeating 3D-ready coordinate vector grid with radial masking.
    *   [NoiseLayer.jsx](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/sections/Hero/background/NoiseLayer.jsx) & [NoiseLayer.module.css](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/sections/Hero/background/NoiseLayer.module.css) — Applies a subtle SVG turbulence noise-grain to eliminate gradient banding.
    *   [GlowLayer.jsx](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/sections/Hero/background/GlowLayer.jsx) & [GlowLayer.module.css](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/sections/Hero/background/GlowLayer.module.css) — Renders soft emerald accent glows centered on the mascot's coordinates.
    *   [MaskLayer.jsx](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/sections/Hero/background/MaskLayer.jsx) & [MaskLayer.module.css](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/sections/Hero/background/MaskLayer.module.css) — Implements linear and radial vignettes to fade the edges seamlessly into next sections.

---

## Part 3: Hero Content Architecture ("The Content Frame")

We built a highly semantic, reusable content layout system using React and CSS Modules. It maps out the left-column text grids and bottom stats bars without rendering final UI textures, animations, or colors.

### Directory Structure
*   [src/sections/Hero/content/](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/sections/Hero/content/)
    *   [HeroContent.jsx](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/sections/Hero/content/HeroContent.jsx) — Primary layout coordinator mapping typography, action buttons, and statistics.
    *   [HeroContent.module.css](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/sections/Hero/content/HeroContent.module.css) — Configures layout dimensions, alignment grids, font sizing guidelines, and responsive mobile stacking.
    *   [HeroAvailability.jsx](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/sections/Hero/content/HeroAvailability.jsx) & [HeroAvailability.module.css](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/sections/Hero/content/HeroAvailability.module.css) — Renders status badges.
    *   [HeroEyebrow.jsx](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/sections/Hero/content/HeroEyebrow.jsx) — Displays capitalizing overlines.
    *   [HeroHeadline.jsx](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/sections/Hero/content/HeroHeadline.jsx) — Processes a string and maps highlighted terms into isolated spans.
    *   [HeroDescription.jsx](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/sections/Hero/content/HeroDescription.jsx) — Generates multiline description paragraph items from arrays.
    *   [HeroCTAGroup.jsx](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/sections/Hero/content/HeroCTAGroup.jsx) — Flex-maps action targets.
    *   [HeroStats.jsx](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/sections/Hero/content/HeroStats.jsx) & [HeroStat.jsx](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/sections/Hero/content/HeroStat.jsx) — Configures horizontal metrics rows divided by line bars.
    *   [HeroSocials.jsx](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/sections/Hero/content/HeroSocials.jsx) — Displays social links with dedicated inline slots prepared for future vector icons.

---

## Part 4: Mascot Visual System ("The Rigging")

We built the standalone visual representation of Ping. Renders fully responsive SVG meshes, structured with Framer Motion hooks and custom spring configurations to support independent joint animations.

### Directory Structure
*   [src/components/mascot/](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/components/mascot/)
    *   [Ping.jsx](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/components/mascot/Ping.jsx) — Main visual coordinator nesting body parts and managing the active float cycle loop.
    *   [Ping.module.css](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/components/mascot/Ping.module.css) — Styles the mascot stage, absolute overlay offsets, and glassmorphic panels.
    *   [PingHead.jsx](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/components/mascot/PingHead.jsx) — Renders the head shell, rear signal antenna, and mounts face displays.
    *   [PingFace.jsx](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/components/mascot/PingFace.jsx) — Polished obsidian black curved screen covers with gloss gradient overlays.
    *   [PingEyes.jsx](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/components/mascot/PingEyes.jsx) — Maps expressions (idle, happy, curious, sleepy, thinking, surprise, wink) into morphable vector geometry.
    *   [PingEyebrows.jsx](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/components/mascot/PingEyebrows.jsx) — Translates and rotates physical eyebrow indicators to amplify facial expressions.
    *   [PingBody.jsx](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/components/mascot/PingBody.jsx) — Teardrop torso shells and dark metallic neck joint connectors.
    *   [PingArms.jsx](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/components/mascot/PingArms.jsx) — Flexible arm segments mapping poses (idle, wave, point, celebrate, coffee, popcorn, typing) and wiggles.
    *   [PingHands.jsx](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/components/mascot/PingHands.jsx) — Tactile mittens containing emissive, capacitive contact circles.
    *   [PingRing.jsx](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/components/mascot/PingRing.jsx) — Torus base ring animating rotation speeds (RPM), glows, and hover coordinate translation.
    *   [PingShadow.jsx](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/components/mascot/PingShadow.jsx) — Drop shadow scaling and blurring dynamically with altitude.
    *   [PingBubble.jsx](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/components/mascot/PingBubble.jsx) — Glassmorphic speech bubble managing auto-sizing text block splits and typing status loaders.
    *   [PingDock.jsx](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/components/mascot/PingDock.jsx) — Holographic tray bases rendering sizing adjustments (boot, close, expand, collapse).
    *   [PingAnimator.jsx](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/components/mascot/PingAnimator.jsx) — Exports transition springs (default, snappy, slow) and coordinates sub-motions.

---

## Part 5: Mascot Context-Hook Connection ("The Nervous System")

We integrated the FSM Mascot Behavior Engine with the Visual System using a unified context state mapping model.

### Directory Structure & Mechanics
*   [src/context/RobotContext.jsx](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/context/RobotContext.jsx) — Instantiates the `PingBrain` as a persistent lifecycle singleton. Automatically subscribes to FSM updates and converts them to React state properties. Maps out a `900ms` typing delay parameter to simulate typing before displaying dialogues.
*   [src/hooks/usePing.js](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/hooks/usePing.js) — Exposes a custom `usePing` hook wrapper to query state parameters and dispatch events.
*   [src/components/mascot/Ping.jsx](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/components/mascot/Ping.jsx) — Consumes `usePing()` context. Updates eye expressions, eyebrows, arm poses, float Y offsets, ring speeds, and speech bubble parameters in real-time.

---

## Part 6: Vision Pro Holographic Dock ("The Base")

*   [PingDock.jsx](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/components/mascot/PingDock.jsx) & [Ping.module.css](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/components/mascot/Ping.module.css)
    *   Redesigned to resemble Apple Vision Pro volumetric glass plates. Utilizes backdrop blurs ($24\text{px}$ saturate $180\%$), Specular Radial highlights, dual-layered shadow depth styling, and an animated diagonal scan laser ray overlay (`hologramRay` sweeping skew lines) to represent holographic power.
    *   Embeds a physical status LED dot (`dockStatusLed`) and companion text (`PING // OS`) along with dynamic system metrics slots.

---

## Part 7: Cinematic Boot Sequence ("The Awakening")

*   [RobotContext.jsx](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/context/RobotContext.jsx) & [Ping.jsx](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/components/mascot/Ping.jsx)
    *   Coordinates the step-by-step boot animation timeline. Upon waking up from `Sleeping`, it overrides coordinate gestures:
        1.  `Sleeping`: Eyes off, arms folded, head tilted forward, floating low, dock collapsed.
        2.  `Eyes On` ($+500\text{ms}$): Digital eyes glow sleepy horizontal lines.
        3.  `Head Up` ($+1000\text{ms}$): Head casing rotates back upright.
        4.  `Ring Start` ($+1500\text{ms}$): Base ring starts rotating ($12\text{ RPM}$) with emerald emissions.
        5.  `Body Float` ($+2000\text{ms}$): Mascot floating height shifts smoothly to standard altitude.
        6.  `Wave` ($+2500\text{ms}$): Arm waves, typing bubble triggers.
        7.  `Bubble` ($+3200\text{ms}$): Typing fades, bubble text slides up rendering `"Hello there."`.
        8.  `Wait for click`: Mascot cursor changes to pointer, waiting for input.
        9.  `Ready`: Clicking Ping wakes the mascot completely, transitioning FSM to active `Idle` states.

---

## Part 8: GSAP Hero Reveal Timeline ("The Choreography")

*   [useHeroAnimation.js](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/hooks/useHeroAnimation.js)
    *   Organizes the sequential reveal stages using a unified GSAP timeline:
        `Background wakes` $\rightarrow$ `Particles fade` $\rightarrow$ `Grid coordinate layers load` $\rightarrow$ `Navbar slides down` $\rightarrow$ `Hero Left content enters` $\rightarrow$ `Ping glances toward headline` $\rightarrow$ `Headline letters reveal` $\rightarrow$ `Description reveals` $\rightarrow$ `CTA buttons scale` $\rightarrow$ `Statistics numbers count-up` $\rightarrow$ `Ping returns to normal look`.
    *   **Premium Text Reveals**:
        *   **Headline**: Splitted text characters animated with stagger, opacity, $8\text{px}$ blur dispersion, $35\text{px}$ Y translation, and spring-finished bounces (`back.out`).
        *   **Description**: Line masks using `clipPath: inset` properties to reveal content smoothly.
        *   **CTA**: Scales up and glows with soft box-shadows.
        *   **Stats**: Counts up values from 0 using GSAP's values updater.

---

## Part 9: Look-At Parallax Controller ("The Eyes")

*   [usePingLookController.js](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/hooks/usePingLookController.js) & [PingHead.jsx](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/components/mascot/PingHead.jsx)
    *   Resolves look-at angles from Ping's screen center to targets (Headline, CTA, Mouse, Navbar, Projects, Contact).
    *   Applies a strict $12^{\circ}$ max rotation threshold.
    *   Interpolates movement using Framer Motion springs (`stiffness: 100, damping: 15`) to guarantee look tracking is smooth and never snaps or jitters.
    *   Applies physical depth parallax: shifting outer shell by `0.25`, screen faceplate by `0.7`, and eyebrows by `0.9` to emulate 3D volume turns inside SVG coordinates.

---

## Part 10: Cursor Attraction & Idle Intelligence Systems ("The Interaction")

*   **Attraction**:
    *   `Cursor near Ping` ($<200\text{px}$): Follows cursor vector.
    *   `Cursor touches Ping` ($<45\text{px}$): Sets override expression to `'happy'`.
    *   `Cursor circles Ping` ($>360^{\circ}$ rotation within $1.5\text{s}$): Triggers dizzy override for $2\text{s}$ (digital eyes set to surprise, ring rotates at high speeds).
    *   `Cursor leaves` ($>160\text{px}$): Triggers waving arm pose for $1.5\text{s}$.
*   **Idle Intelligence**:
    *   Monitors inactivity time in single ticks:
        *   $5\text{s}$: Blinks (`wink` eye expression override).
        *   $10\text{s}$: Looks around (glances at coordinates).
        *   $15\text{s}$: Looks back at user.
        *   $20\text{s}$: Displays bubble dialogue `"Still there?"`.
        *   $30\text{s}$: Triggers coffee break animation (yellow ring glow, holding mug).
        *   $45\text{s}$: Triggers stretch / celebrate animation (raises arms, leaps up).
        *   $60\text{s}$: Transitions state machine to Sleep.

---

## Part 11: Developer Config Preview Mappings ("The Toggle")

*   [config.js](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/config.js)
    *   Declares `MASCOT_CONFIG` toggles (`enableBoot`, `enableDock`, `enableAnimations`, `enableParticles`, `preview`) allowing developers to disable long wake sequences during development inside hot-reload containers.

---

## Part 12: Final Hero Integration Layout ("The Experience")

*   [Hero.jsx](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/sections/Hero.jsx) & [Hero.module.css](file:///c:/Users/User/Desktop/Portfolio%20Ping/src/sections/Hero/Hero.module.css)
    *   Coordinates the final integration. Mounts `RobotProvider` at the root, and overlays layers cleanly:
        `BackgroundRoot` (z-index: 0) $\rightarrow$ `HeroContent` (z-index: 15) $\rightarrow$ `Ping` (z-index: 20) $\rightarrow$ speech bubble / dock $\rightarrow$ fixed `Navbar` (z-index: 100).
    *   Stalls the Navbar reveal until `isBootReady` is true, animating opacity and translation through the GSAP reveal sequence.
    *   Sets absolute sizes for the mascot frame ($360\text{px}$) and maps responsive grids (two-columns on desktop, vertical stacked columns on tablet/mobile).
    *   **Centered Cinematic Boot**: If booting is enabled, calculates dynamic viewport centering coordinate vectors to lock Ping centered on a black viewport, animating smoothly back to the top-right grid columns only after the user clicks the "Hello there." bubble.

---

## Part 13: Full Project Integration Audit ("The Verification")

*   Checked all lazy-loaded chunks, imports, variables definitions, and layout configurations.
*   Verified that CSS modules sit behind typography layers correctly and build pipelines run without warnings.

---

## Part 14: Pixar-Style Chibi Visual Geometry ("The Proportions")

*   **Head**: Rounded squircle with large black glossy curved faceplate display, minimal bezel, and tiny tilt antenna.
*   **Body**: Shrinks torso casing down into a cute, minimal teardrop structure ($25\%$ smaller scale) that floats closely above the ring.
*   **Limb proportions**: Configures slender, thin floating arm segments (`strokeWidth="4"`) and shrinks mitten hands (`transform="scale(0.6)"`).
*   **Orbital Ring**: Centers the rotating base torus ring tightly underneath the tiny body at $Y=380\text{px}$ with a compact $55\text{px}$ radius.
*   **Ground Shadow**: Scales and raises shadow coordinates ($Y=408\text{px}$) to follow the chibi float height.

---

## Part 15: Speech Bubble & Platform Dock Connections ("The Interface")

*   **Capacitive Speech Bubble Pointer**: Uses a pseudo `::after` border arrow centered below the glassmorphic bubble, pointing down at Ping's head. Automatically matches transparency colors.
*   **Dock State Machine**: Integrates the volumetric dock (`PingDock`). Sits under Ping at Y=380px during booting. Emits active hologram scans (`hologramRay`). Once boot transitions complete and the FSM enters `Idle`, the dock transitions to `'collapse'`, scaling and fading down to narrow dimensions while Ping remains floating above.

---

## Testing & Verification
The entire linked system compiles successfully:
```bash
cmd.exe /c "npm run build"
```
**Result**: Compiled successfully in **569ms** with zero warnings or package errors.
