# Ping Character Bible v1: Official Mascot Specifications

This document serves as the permanent source of truth for the visual representation, emotional design language, and interactive behavioral systems of **Ping**, Abhishek's intelligent digital companion.

---

## Part 1: Visual Design & Proportions

### 1. Overall Design Philosophy
Ping is a cute, minimal, highly responsive digital companion that merges the sleek industrial design language of Apple (bead-blasted metals, polished glass surfaces, and premium finishes) with the warm, expressive character design principles of Pixar (oversized features, organic micro-gestures, and physics-driven personality wiggles). It is not a generic mechanical robot, but an empathetic helper that guides users through the engineering portfolio.

### 2. Silhouette
The silhouette is defined by a heavy chibi-ratio top-half and a tiny bottom-half:
*   An oversized head casing resembling a premium curved desktop monitor or display.
*   A tiny teardrop torso base that floats.
*   Slender, thin segmented arms that hover close to the sides, capped with rounded mitten hands.
*   An orbital torus ring floating closely underneath the torso.
*   This creates an instantly recognizable, high-contrast bulbous outline that evokes cute, friendly helper characteristics.

### 3. Height Ratio
The total height is divided into distinct structural layers:
*   **Head**: $45\%$ of total height ($150\text{px}$ shell height).
*   **Torso**: $20\%$ of total height ($65\text{px}$ body height).
*   **Suspended Space / Joint**: $5\%$ of total height ($15\text{px}$ collar gap).
*   **Orbital Ring Clearance**: $15\%$ of total height ($50\text{px}$ orbit clearance).
*   **Ground Shadow Gap**: $15\%$ of total height ($50\text{px}$ shadow clearance).

### 4. Width Ratio
*   **Head Casing**: $190\text{px}$ maximum horizontal width.
*   **Obsidian Faceplate**: $170\text{px}$ horizontal width ($10\text{px}$ thin outer bezel border).
*   **Teardrop Torso**: $86\text{px}$ maximum horizontal width.
*   **Mit Hands**: $15\text{px}$ width.
*   **Orbital Torus**: $110\text{px}$ horizontal diameter.

### 5. Head Shape
The head is a highly polished rounded squircle casing:
*   Dimensions: $190\text{px}$ width $\times$ $150\text{px}$ height.
*   Corner Radius (`rx` / `ry`): $45\text{px}$.
*   Finished with a bead-blasted metallic sheen gradient and an anti-reflective polished bevel stroke border.

### 6. Faceplate Shape
The faceplate is a large obsidian curved display screen nested inside the squircle casing:
*   Dimensions: $170\text{px}$ width $\times$ $130\text{px}$ height.
*   Corner Radius (`rx` / `ry`): $38\text{px}$.
*   Bezel: Minimal $10\text{px}$ border margins around all edges.

### 7. Screen Curvature
*   Simulated using a deep, dark radial backdrop gradient centered at $Y=40\%$, transitioning from emerald-tinted black (`#0d1f14`) to core onyx-black (`#020704`).
*   Layered with a diagonal specular linear gradient highlight (`rgba(255, 255, 255, 0.12)` down to transparent) to emulate curved, reflective volumetric glass cover panels.

### 8. Eye Positions
The digital OLED eyes sit horizontally centered on the faceplate coordinate canvas:
*   **Left Eye Center**: $X=210\text{px}$, $Y=220\text{px}$.
*   **Right Eye Center**: $X=290\text{px}$, $Y=220\text{px}$.
*   **Spacing**: Inter-pupillary distance is exactly $80\text{px}$.

### 9. Eye Sizes
*   **Default Idle State**: Circular coordinates with radius $R=12\text{px}$.
*   **Glow**: Layered with a soft, bright green drop-shadow box filter (`#10b981`) to simulate bright emissive digital pixels.

### 10. Eye Expressions (7 Core States)
1.  **Idle**: Two circular emissive green rings ($R=12\text{px}$, stroke width $4\text{px}$).
2.  **Happy**: Upward curved arcs or half-circles.
3.  **Curious**: Slightly widened circles or slanted ovals.
4.  **Sleepy**: Thin horizontal dashes ($2\text{px}$ height) indicating heavy eyelids.
5.  **Thinking**: Vertical oval pupils looking upward.
6.  **Surprise**: Large, hollow outer circular rings with small centered dot pupils.
7.  **Wink**: Left eye circular, right eye a flat horizontal dash ($1.5\text{px}$ height).

### 11. Smile Geometry
*   Ping has no physical mouth.
*   Empathy is expressed entirely through eye expressions, eyebrow tilts, and arm wiggles.
*   Expressions like "Smile" or "Joy" are represented by curved, squinting arch-like vector eyes.

### 12. Antenna Design
A single, tiny mechanical antenna sits tilted $15^{\circ}$ on the top-rear side of the head shell:
*   Base joint: tilted connector socket.
*   Stalk: thin line ($12\text{px}$ length, stroke width $3\text{px}$).
*   Tip: Tiny spherical emission orb ($R=3.5\text{px}$) that glows emerald to mirror active brain computations.

---

## Part 2: Torso, Limbs & Shadows

### 13. Body Shape
The body is a minimal, cute teardrop torso casing:
*   Dimensions: $86\text{px}$ width $\times$ $64\text{px}$ height.
*   Connected to the head shell through a thin mechanical collar connector ($16\text{px}$ width, $15\text{px}$ height).
*   Enforces a heavy chibi scale (less than half the head width) to ensure cute proportions.

### 14. Arm Length
*   Slender, thin floating arm bones constructed using smooth quadratic Bezier paths (`strokeWidth="4"`).
*   Span: average $40\text{px}$ length from shoulder socket to hand node.
*   Poses are mapped dynamically to quadratic control vectors to prevent straight, rigid joints.

### 15. Hand Design
*   Tactile rounded mittens styled with scale $0.6$ of base layout template.
*   Left and right mitten shells are mirror-reversed.
*   Capped with a center capacitive palm pad circle ($R=4.5\text{px}$) that glows bright emerald during interaction.

### 16. Ring Design
A magnetically suspended orbital torus ring floats underneath the body:
*   Dimensions: $rx=55\text{px}$ horizontal radius, $ry=11\text{px}$ vertical radius.
*   Position: centered around $Y=380\text{px}$ ($30\text{px}$ below body shell).
*   Chrome gradient surface texture overlaid with a rotating emerald bead indicator that spins around the ring loop.

### 17. Floating Height
*   **Idle float**: Smooth, sinusoidal vertical hover loop.
*   **Frequency**: $4.5\text{s}$ per cycle.
*   **Amplitude**: $+0\text{px}$ to $-8\text{px}$ vertical offset.
*   **Transitions**: Controlled using spring coordinates (`stiffness: 100, damping: 15`).

### 18. Color Palette
*   **Primary Casing**: Deep pine-green metal (`#2b3a30` core, transitioning to `#0d1410` shadows).
*   **Faceplate Glass**: Onyx obsidian black (`#020704` to `#0d1f14` core glow).
*   **Pixel Glows**: Vibrant emerald green (`#10b981` primary, `#34d399` highlight).
*   **Platform Tray**: Frosted glass panels (`rgba(5, 12, 7, 0.4)` background, `rgba(255, 255, 255, 0.08)` borders).

### 19. Materials
*   **Torso & Head Casing**: Bead-blasted, satin-finished aluminum with specular highlights.
*   **Faceplate**: High-gloss, chemically tempered sheet glass.
*   **Torus Ring**: Polished reflective chrome metal.
*   **Speech Bubble**: Frosted glass (radial blur, saturated reflections, and border refractions).

### 20. Shadows
A soft, dark ground drop-shadow sits underneath the ring:
*   Dimensions: $rx=45\text{px}$, $ry=7\text{px}$ centered around $Y=408\text{px}$.
*   Dynamic: scale and opacity are mapped inversely to Ping's floating height.
*   Filter: feathered Gaussian blur (`blurStd = 6`).

### 21. Glow Rules
Glow is reserved for digital elements:
*   OLED eyes, antenna tip, platform status lights, and the rotating ring bead.
*   Glow must use soft emerald tones. Harsh primary green is prohibited.

### 22. Dock Design
An Apple Vision Pro volumetric glass base dock tray:
*   Volumetric glass plate styled with SAT blurs and thin border lines.
*   Features a scan laser sweeping line that sweeps across the dock at $Y=380\text{px}$ during the boot phase.
*   Transitions: collapses into a narrow capsule ($100\text{px}$ width) after layout reveal.

---

## Part 3: Emotional Design Language & Behaviors

### 23. Emotional Design Language
Ping communicates through structural, non-verbal indicators:
*   **Tilt**: Tilting head forward indicates sleeping or thinking. Tilting back indicates focus.
*   **Wiggle**: Small, high-frequency arm poses amplify joy or excitement.
*   **Pixel Change**: Eyes transition morphing between expressions using spring transitions.

### 24. Animation Principles
*   **No Linear Delays**: Hard coded timeout chains are prohibited.
*   **Physics-Based Springs**: All joint movements use springs (`damping: 15, stiffness: 100`) to prevent mechanical snaps.
*   **Layered Parallax**: Target eye-tracking shifts different parts at different rates (Head casing $0.25$, Ring $0.4$, Faceplate $0.7$, Eyebrows $0.9$).

### 25. Idle Behaviour
*   Blinks every $5\text{s}$ (briefly transitions to `'wink'`).
*   Glances around every $10\text{s}$.
*   Looks back at user at $15\text{s}$.
*   Greets user with bubble prompt `"Still there?"` at $20\text{s}$.

### 26. Walking Behaviour
*   Ping does not walk.
*   Travels via frictionless horizontal hover translations.
*   Smoothly shifts coordinates to follow layout grids.

### 27. Hover Behaviour
*   Idle float wiggles up and down sinusoidally.
*   Reacts to cursor attraction.
*   If cursor is close ($<200\text{px}$), Ping turns head and screen towards cursor coordinate.

### 28. Celebration Behaviour
*   Triggers when user completes an action (form submit, link download).
*   Raises both arms high (`celebrate` pose).
*   Torus ring rotates at high speeds ($25\text{ RPM}$).
*   Pixel eyes morph to happy arch indicators.

### 39. Thinking Behaviour
*   Triggers during loading states.
*   Tilts head casing forward ($10^{\circ}$ angle).
*   Eyebrows tilt inward.
*   Eyes look up and right.

### 30. Sleep Behaviour
*   Triggers after $60\text{s}$ of inactivity.
*   Dock collapses.
*   Ping floats low ($Y=9\text{mm}$ offset).
*   Head tilts down, eyes turn off, ring stops rotating.

### 31. Coffee Behaviour
*   Triggers at $30\text{s}$ of idle time.
*   Brings hands together holding a small warm mug vector graphic near chest center.
*   Torus ring glows warm amber color (`#f59e0b`).

### 32. Popcorn Behaviour
*   Triggers at $45\text{s}$ of idle time.
*   Holds a small popcorn box, wiggling right hand to mouth to eat.
*   Torus ring glows red (`#ef4444`).

### 33. Guiding Behaviour
*   Ping positions itself adjacent to active text blocks to direct reading attention.
*   Glances toward text headlines when they reveal.

### 34. Pointing Behaviour
*   Extends left/right arm outward to guide attention to click targets.
*   Framer Motion springs translate arm bone paths smoothly.

### 35. Looking Behaviour
*   Follows cursor dynamically.
*   Clamped to maximum $12^{\circ}$ rotation to prevent head wrapping.
*   Glances back at user when focus changes.

### 36. Expression Rules
*   Override expressions (like touch or dizzy) take priority.
*   After override finishes, eye expression decays back to active FSM state default.
*   Blinking overrides standard looking expressions momentarily.

---

## Part 4: Boundary Rules

### 37. Things Ping will NEVER do
*   **Never speak with a robotic voice**: dialogue is text-only inside glass bubbles.
*   **Never snap joints**: all animations must use physical springs.
*   **Never block text**: layout bounds enforce z-index separations (Ping sits beside content).
*   **Never render human proportions**: Ping has no legs, a chibi body, and a large head casing.
*   **Never shadow-cast upwards**: ground shadows are oriented strictly below coordinates.
*   **Never jitter**: target look calculations are filtered to prevent mouse jitter feedback loops.
