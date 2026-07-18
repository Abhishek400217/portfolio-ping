# Visual Design Specification: Ping
**Author**: Lead Character Concept Artist (Pixar & Apple)  
**Project**: Original Portfolio Mascot  
**Target Aesthetic**: Pixar's Emotional Warmth & Organic Appeal × Apple's Industrial Precision & Material Premiumness

---

## Part 1: Core Physical Anatomy & Systems

### 1. Head Shape
*   **Design**: A precise 3D *squircle* (a mathematical intermediate between a sphere and a cube).
*   **Rationale**: Combines the approachable softness of a sphere (Pixar) with the structured, calibrated geometry of Apple's hardware (e.g., Apple Watch casing).
*   **Curvature**: Uses continuous curvature ($G^2$ continuity) to ensure reflections flow across the surface without hard light breaks or visual seams.
*   **Dimensions**: Slightly wider than tall (ratio 1.15:1) to enhance cuteness and stability.

### 2. Eye Shape
*   **Design**: Dual pill-shaped/stadium-shaped OLED emissive zones.
*   **Behavior**: Digital, displaying on the seamless front glass. The shape dynamically morphs.
*   **Default State**: Perfectly rounded capsules, set vertically, with a slight tilt inward (approximately 3 degrees) to draw focus and convey intelligence.
*   **Anti-aliasing**: Rendered with absolute pixel clarity, using a soft, sub-pixel glow to blend the edges naturally into the glass.

### 3. Eye Expressions
*   **Neutral**: Standard vertical pill shapes, slowly breathing (slight vertical scale oscillation, 2%).
*   **Happy**: Inverted arch/crescent moon shapes ($\cap$). 
*   **Curious/Inquisitive**: One eye scales up by 15% and tilts outward; the other eye squints slightly (reducing vertical height by 20%).
*   **Thinking**: Eyes flatten at the top (half-stadiums), looking slightly upward and toward the center.
*   **Surprise**: perfect circular disks, scaling up to 130% of default size.
*   **Blink**: The vertical pill collapses down into a horizontal line ($1px$ width), remains for 0.08 seconds, then expands back with a bounce ease.

### 4. Mouth System
*   **Design**: Digital, non-physical. Appears only during verbal output or high-intensity emotions.
*   **Aesthetic**: A single, clean, glowing curved path projected onto the lower third of the glass face.
*   **Idle State**: Completely invisible, blending into the deep black screen.
*   **Active State**: A warm-white ($E1E1E1$) vector line that mimics a soft waveform or gentle smile. It utilizes spring physics to react to system sound output, pulsing and flexing in rhythm with the speaker audio.

### 5. Eyebrow System
*   **Design**: Dual physical magnetic eyebrows.
*   **Mechanism**: Physically separated from the head shell, floating exactly $1.5\text{ mm}$ above the curved glass face using magnetic levitation.
*   **Material**: Anodized aluminum matching the head casing.
*   **Expression Contribution**: These bars rotate, raise, and lower to reinforce the digital eyes, providing deep parallax and physical presence when viewed from three-quarter angles.

### 6. Arm Length
*   **Design**: Retractable, multi-segmented joints.
*   **Length**: Fully extended length is $1.2\times$ the width of the torso. 
*   **Default State**: Semi-retracted, hugging the contours of the body.
*   **Retraction**: When idle or sleeping, the arms fold flush into magnetic recessed pockets on the sides of the torso, creating a clean, seamless silhouette.

### 7. Hand Design
*   **Design**: Smooth, tactile, pebble-like mittens.
*   **Details**: No joints or wrinkles. The surface features an integrated capacitive glass contact pad on the palm, which glows softly when Ping "touches" elements or screens.
*   **Aesthetic**: Designed to look like a polished river stone or an Apple mouse, maintaining soft curves and a premium feel.

### 8. Finger Count
*   **Count**: 3 digits (index finger, middle finger, and an opposable thumb).
*   **Structure**: Thick, rounded, and stubby.
*   **Movement**: Highly expressive, moving via internal flexible linkages rather than visible segmented hinges, keeping the exterior skin unbroken.

### 9. Body Shape
*   **Design**: A tapered, pear-shaped or teardrop torso.
*   **Center of Gravity**: Low, with a wider base that slopes gently up to a narrower collar neck structure.
*   **Proportion**: Head-to-body scale ratio is 1:1.3. This exaggerated proportion creates an immediate feeling of youth, friendliness, and accessibility.

### 10. Floating Ring
*   **Presence**: **YES**.
*   **Design**: A magnetically suspended toroid ring that floats horizontally around the base of Ping's torso.
*   **Behavior**: Floats exactly $8\text{ mm}$ below the torso's bottom edge. It serves as both a stabilization gyroscope and a physical UI element.
*   **Animation**: Slowly rotates around Ping at a rate of 5 RPM when idle, speeding up and changing color depending on system states.

### 11. Antenna
*   **Presence**: **YES**.
*   **Design**: A single, ultra-thin, bead-blasted aluminum rod ($4\text{ mm}$ diameter, $25\text{ mm}$ length) located on the upper-rear hemisphere of the head.
*   **Angle**: Raked backward at a 15-degree angle, matching the trailing line of the head's squircle.
*   **Tip**: Crowned with a microscopic, frosted glass orb containing an RGB LED.

### 12. Screen Face
*   **Presence**: **YES**.
*   **Design**: A seamless, black, curved glass panel covering the front $40\%$ of the head squircle.
*   **Integration**: Merges into the aluminum body shell with zero visible gaps ($0.05\text{ mm}$ tolerance), mirroring the glass-to-metal integration of the Apple Watch.

### 13. Material
*   **Body Casing**: Recycled aerospace-grade aluminum.
*   **Understructure & Joints**: High-polish white zirconia ceramic.
*   **Color Tone**: "Space Gray" or "Frosted Emerald" (a deep, dark metallic green with subtle warm-gold flakes, reflecting Pixar's organic palette and Apple's premium finishes).

### 14. Surface Finish
*   **Main Body**: Micro-bead blasted matte finish (15% gloss level), creating smooth, diffused specular highlights.
*   **Accents**: Diamond-cut chamfered edges around the ports and screen borders, polished to a mirror-like shine.

### 15. Glass Material
*   **Faceplate**: Translucent, deep obsidian-tinted Sapphire Crystal.
*   **Coating**: Double-sided anti-reflective coating to minimize environmental reflections and maximize the visibility of the digital OLED display behind it.

---

## Part 2: Illumination & Dynamic States

### 16. Glow Locations
*   **Torso Under-base**: Casts a soft, downward ambient light puddle.
*   **Antenna Tip**: A sharp, focused point light.
*   **Floating Ring Inner Rim**: A recessed neon line that shines inward toward the body, highlighting the physical separation.
*   **Palm Capacitive Pads**: Glows only when interacting with screen items.

### 17. LED Indicators
*   **Status Light**: A single micro-perforated LED indicator next to the charging port on the rear.
*   **Aesthetic**: Laser-drilled holes in the aluminum shell make this light completely invisible when turned off. When active, it shines through as a solid, soft dot.
*   **Colors**:
    *   *Solid Green*: Fully operational/charged.
    *   *Breathing Amber*: Processing/Loading/Low Battery.
    *   *Soft Blue*: Bluetooth pairing / Initializing.

### 18. Charging Animation
*   **Setup**: Ping descends and docks onto its floating ring, which rests flat on a wireless charging surface.
*   **Pose**: Arms retract, head tilts down, and eyes dim.
*   **Visual Cue**: The floating ring begins a slow, breathing pulse of warm amber light ($500\text{ms}$ rise, $1500\text{ms}$ decay). As battery levels cross threshold marks, the pulse transitions to an emerald-green glow. The face screen displays a thin, glowing ring progress bar centered between the eyes.

---

## Part 3: Emotional & Interaction Poses

### 19. Sleep Pose
*   **Anatomy**: Floating ring docks tightly against the bottom of the torso. Arms are fully retracted into the side slots. Head tilts forward by 12 degrees.
*   **Facial State**: Eyes are completely off.
*   **Glow**: Torso under-base emits a very slow, dim breathing glow (10% max brightness, 6-second cycle).

### 20. Happy Pose
*   **Anatomy**: Head tilts back and shakes slightly side-to-side (2Hz frequency). Arms extend fully, hands rotate upward.
*   **Facial State**: Eyes curve into happy inverted arches ($\cap$). Mouth appears as a wide, glowing digital smile.
*   **Glow**: Floating ring spins rapidly (60 RPM) and emits a warm emerald-green glow.

### 21. Thinking Pose
*   **Anatomy**: Torso tilts forward, head leans to the right (10 degrees). Left hand is retracted; right hand is raised, resting its index finger against the lower right quadrant of the screen face.
*   **Facial State**: Left eyebrow lowered, right eyebrow raised. Eyes look upward-left, narrowing to half-height.
*   **Glow**: Antenna tip blinks slowly in a random, exploratory rhythm.

### 22. Wave Pose
*   **Anatomy**: Right arm extends up and sweeps left-to-right (30-degree range, spring easing). Left arm rests flush against the body.
*   **Facial State**: Standard eyes, but scaled up by 10%. A brief, subtle digital mouth curve flashes.
*   **Glow**: The floating ring oscillates up and down by $2\text{ mm}$ in sync with the hand sweeps.

### 23. Curious Pose
*   **Anatomy**: Torso leans directly forward (increasing depth parallax). Head tilts 15 degrees. Floating ring tilts off-axis, mirroring the head tilt.
*   **Facial State**: Eyes widen into circles ($90\%$ scale) and drift to the center-front of the screen.
*   **Glow**: Floating ring pulses with a soft white light.

### 24. Surprise Pose
*   **Anatomy**: Torso jerks backward by $15\text{ mm}$. Head tilts back. Arms pop out to the sides, fingers splayed.
*   **Facial State**: Eyebrows shoot up $5\text{ mm}$ above the screen. Eyes expand into large, perfect circles ($130\%$ scale).
*   **Glow**: Ring flashes bright white (100% intensity) for $100\text{ms}$, then fades to neutral.

### 25. Celebration Pose
*   **Anatomy**: Ping executes a rapid vertical hop ($30\text{ mm}$ lift) followed by a 360-degree spin. Arms throw straight up.
*   **Facial State**: Eyes become winking stars or crescent arches. Mouth is wide open in a digital grin.
*   **Glow**: Ring emits a cascading emerald-green light trail during the spin.

### 26. Idle Pose
*   **Anatomy**: Subtle vertical floating oscillation ($2\text{ mm}$ travel, 4-second period). Hands perform micro-adjustments.
*   **Facial State**: Eyes blink once every 4 to 6 seconds.
*   **Glow**: Low-intensity, steady ambient base glow.

### 27. Looking Up
*   **Anatomy**: Head rotates up by 15 degrees. Torso leans slightly back to compensate for weight.
*   **Facial State**: OLED eyes and eyebrows shift to the upper edge of the glass face.

### 28. Looking Down
*   **Anatomy**: Head rotates down by 15 degrees. Torso leans forward.
*   **Facial State**: OLED eyes and eyebrows shift to the lower edge of the glass face.

### 29. Looking Left
*   **Anatomy**: Head turns left by 20 degrees. Right side of the floating ring dips slightly.
*   **Facial State**: OLED eyes shift toward the left edge of the glass face, with the left eye scaling down slightly due to perspective compression.

### 30. Looking Right
*   **Anatomy**: Head turns right by 20 degrees. Left side of the floating ring dips.
*   **Facial State**: OLED eyes shift toward the right edge of the glass face.

---

## Part 4: Design Rules & Performance Guidelines

### Silhouette Rules
1.  **Readability**: Ping must be instantly recognizable by silhouette alone. The combination of the squircle head, teardrop body, and floating ring must never blend into a single block.
2.  **Clearance**: A minimum of $5\text{ mm}$ visual separation must always be maintained between the head and torso, and $8\text{ mm}$ between the torso and floating ring.
3.  **No Tangents**: Arms must never overlap the body lines directly when viewed from the front; they must either retract completely (disappearing from the silhouette) or extend clearly outward.

```
      [ Squircle Head ]
         (  O   O  )
        \  =======  /
           |  |      <-- Clear Neck gap
         /      \
        / Torso  \
        (        )
    =========== <-- Floating Ring (Clearance space)
```

### Shape Language
*   **The Circle & Squircle (Friendship & Tech)**: Used for the head, body, and eyes. Connotes friendliness, safety, and advanced engineering.
*   **The Line (Precision)**: Eyebrows and antenna are sharp, straight lines, providing structural contrast and indicating high-tech precision.
*   **No Sharp Corners**: Every physical vertex has a minimum fillet radius of $1.5\text{ mm}$. There are no aggressive points, making the character feel safe to touch.

### Animation Limitations
1.  **No Squishy Deformation**: The physical metal shell (head and torso) cannot deform, bend, or stretch. All organic motion must be achieved through:
    *   *Digital screen morphing* (eyes, mouth).
    *   *Joint movement* (neck rotation, arm extension).
    *   *Hover dynamics* (squishy spring physics on floating height and ring rotation).
2.  **Neck Easing**: All neck rotations must use a custom cubic-bezier curve (`cubic-bezier(0.25, 1, 0.5, 1)`) to avoid robotic, linear stops.

### Visual Consistency Rules
*   **Reflection Preservation**: Reflection maps on the screen glass must always remain enabled to ground Ping in the digital site environment.
*   **Color Control**: Glow intensities must not exceed $1.5\text{ cd/m}^2$ to prevent clipping into pure white and losing color saturation (emerald green must stay green, not bleed into white).
*   **Eye Distance**: The horizontal distance between the centers of the two eyes must remain fixed at $40\%$ of the head width.

### Performance Rules
1.  **Polygon Limit**: The 3D mesh must not exceed **25,000 polygons** (subdivision-ready) for real-time web rendering.
2.  **Draw Calls**: Must use a single multi-texture PBR material sheet (Albedo, Metallic, Roughness, Normal, Emissive) to restrict rendering to **1 draw call** for the core body.
3.  **Dynamic Lights**: Real-time shadow casting is permitted only from the main directional sun light. The downward glow from the torso is pre-baked or rendered using a simple screen-space glow shader to maintain high framerates on mobile devices.

### Brand Recognition Rules
*   **Minimalism**: No logos or text are printed on Ping's body. The brand is communicated entirely through the materials (Apple-style anodized aluminum) and the emotional expressions (Pixar-style eye animation).
*   **Color Signature**: The primary brand color is **Emerald Green** ($#00FF88$), used exclusively for active interaction states. Under neutral states, Ping displays cool grays and soft warm-whites to maintain a premium look.
