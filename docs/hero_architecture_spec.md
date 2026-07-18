# Apple Design Systems: Hero Section Architectural Specification
**Document ID**: PRT-PING-HERO-001  
**Status**: APPROVED / ARCHITECTURE SPECIFICATION  
**Authors**: Creative Director Group (Apple, IDEO, Pixar, Stripe)  
**Security Level**: Apple Internal Confidential  

---

## 1. Complete Layout Blueprint

The Hero Section is designed as a *single-page viewport canvas* ($100\text{vh}$) that transforms from a centered, minimalist greeting stage into a split-grid interactive landing site.

```
+---------------------------------------------------------------------------------+
|                                                                 [Navbar]        |
|                                                                                 |
|   +---------------------------------------+   +-----------------------------+   |
|   | [Column 1: Branding & Copy]           |   | [Column 2: Assistant Anchor]|   |
|   |                                       |   |                             |   |
|   | (Overline) REDEFINING INTERACTIVITY   |   |           +-------+         |   |
|   |                                       |   |           |  O O  |         |   |
|   | (Headline) Crafting Digital           |   |           |  ===  |         |   |
|   |            Experiences.               |   |           +-------+         |   |
|   |                                       |   |           (Ping Mascot)     |   |
|   | (Body) Hi, I'm Abhishek. I build      |   |                             |   |
|   |        reusable engines...            |   |         =============       |   |
|   |                                       |   |        [Holo-Dock]          |   |
|   | [Button: Explore]  [Button: Resume]   |   |                             |   |
|   +---------------------------------------+   +-----------------------------+   |
|                                                                                 |
|   +---------------------------------------+                                     |
|   | [Statistics Bar]                      |                                     |
|   | 99.9% UPTIME   |   50+ PROJECTS       |                                     |
|   +---------------------------------------+                                     |
+---------------------------------------------------------------------------------+
```

---

## 2. Visual Hierarchy

The visitor's eye path is directed through three distinct visual beats, matching a classic Stripe product page flow:
1.  **Primary Focal Point (Phase 1)**: Centered glassmorphic Holo-Dock and Ping's expressive OLED screen face.
2.  **Secondary Focal Point (Phase 2)**: Large typographic headline sliding from the left.
3.  **Tertiary Focal Point (Phase 3)**: Call-to-action buttons and bottom-row metrics counts.

---

## 3. Grid System

The canvas utilizes a standardized **12-column responsive layout** with a fluid grid, similar to Stripe's layout architecture:
*   **Columns**: 12.
*   **Gutter**: $32\text{px}$ (Desktop), $24\text{px}$ (Tablet), $16\text{px}$ (Mobile).
*   **Margins**: $80\text{px}$ (Desktop), $40\text{px}$ (Tablet), $24\text{px}$ (Mobile).
*   **Column Split (Post-Transition)**:
    *   *Columns 1–7*: Branding, Headline, Body Copy, CTA, and Stats.
    *   *Columns 8–12*: Ping Assistant Anchor and Holographic Dock interface.

---

## 4. Responsive Behavior

| Breakpoint | Width (px) | Grid Configuration | Mascot scale & Anchor Position |
| :--- | :--- | :--- | :--- |
| **Desktop Wide** | $\ge 1440$ | 12 Cols ($80\text{px}$ margin) | $1.0\times$ scale / Column 8–12 Center ($85\text{vw}$, $35\text{vh}$) |
| **Desktop Standard**| $1024 – 1439$| 12 Cols ($40\text{px}$ margin) | $0.85\times$ scale / Column 8–12 Center ($80\text{vw}$, $35\text{vh}$) |
| **Tablet** | $768 – 1023$ | 8 Cols ($24\text{px}$ margin) | $0.75\times$ scale / Top-Right ($85\text{vw}$, $15\text{vh}$) |
| **Mobile** | $< 768$ | 4 Cols ($16\text{px}$ margin) | $0.65\times$ scale / Floats permanently at bottom-right ($85\text{vw}$, $85\text{vh}$) |

---

## 5. Motion Choreography

The motion sequence follows a strict timeline to maintain cinematic pace and avoid overlapping visual noise:

```
[0.0s] Booting Sequence Start (Ring light up, spotlight fade-in)
  |---> [1.0s] Hello there (Ping waves, text bubble fades up)
         |---> [2.5s] (Interaction Trigger: User clicks or scrolls)
                |---> [2.6s] Dive & Translate (Ping moves to top-right)
                       |---> [3.2s] Text Reveal (Stripe-style typography slides up)
                              |---> [3.6s] Stats counters begin running
```

---

## 6. Scroll Choreography

Scroll input translates directly into viewport transitions using a scroll-dampening wrapper (similar to Lenis):
*   **0% – 20% Scroll**: Triggers the transition of Ping from the screen center to the top-right assistant anchor.
*   **20% – 60% Scroll**: Typographic assets and CTA stagger up into view with a Translate Y offset of $40\text{px}$ to $0\text{px}$.
*   **60% – 100% Scroll**: Bottom stats reveal. The background grid mesh rotates and opens up dynamically in three dimensions, providing depth.

---

## 7. Cursor Interactions

*   **Look-At Vectoring**: When in the `Watching` state, Ping's head tilts and eye elements translate within the glass bounds to point directly at the user's cursor.
*   **Ring Repulsion**: The floating ring slightly tilts away from the cursor's coordinate direction if the cursor gets closer than $80\text{px}$.
*   **Focal Depth Shifts**: The background coordinates warp and distort slightly around the cursor using a screen-space displacement shader, simulating a spatial glass plate.

---

## 8. Micro Interactions

*   **Antenna LED Pulse**: The antenna LED tip emits a soft, green breathing pulse ($0.5\text{Hz}$) under idle states, speeding up to $2.0\text{Hz}$ during page network activities or mock loading.
*   **Dock Ripple**: Hovering over the holographic dock casts a soft radial ripple light outward along the dock surface.
*   **Text Selection Reaction**: When the visitor selects page text, Ping tilts its head down ($10\text{ degrees}$) and narrows its eyes, simulating that it is "reading" along with the user.

---

## 9. Ping Positioning

*   **Greeting Stage**: Centered at coordinates $X = 50\%$, $Y = 45\%$, floating at a Z-depth that overlays standard copy text.
*   **Assistant Stage**: Anchored at $X = 82\%$, $Y = 30\%$ inside the layout container, ensuring it never overlaps copy, project grids, or menu text.

---

## 10. Ping Idle System

To make Ping feel alive (a signature Pixar trait), an idle loop runs continuously:
*   **Float Cycle**: Vertical float offset follows a sine wave:
    $$Y_{\text{offset}} = 3\text{px} \times \sin(t \times \frac{2\pi}{4.5\text{s}})$$
*   **Blink Rate**: Calculated using a random Gaussian distribution (mean = $5\text{s}$, standard deviation = $1.5\text{s}$). The blink is a rapid dual-stage closure ($0.08\text{s}$ shut, $0.05\text{s}$ open).
*   **Aesthetic Shifts**: Every $12\text{s}$ of continuous idle, Ping executes a minor posture shift (e.g., rotating its body $4\text{ degrees}$ off-axis, checking its floating ring alignment).

---

## 11. CTA Positioning

The primary action triggers are grouped on the left column (Desktop columns 1 to 6):
*   **Primary Button ("Explore Work")**: High-contrast, emerald-glowing outline, placed left.
*   **Secondary Button ("Read Resume")**: Polished glassmorphic backing with white border, placed right of the primary.
*   **Clearance**: A mandatory $48\text{px}$ vertical gap separates the bottom of the body description copy from the top of the button row to ensure legibility.

---

## 12. Typography Hierarchy

Consistent with Stripe's clean typographic system, we use **SF Pro Display** (or a premium geometric sans-serif like **Outfit** as a fallback):

| Element | Font Weight | Size (Desktop) | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- |
| **Overline** | Semibold | $14\text{px}$ | $1.2$ | $+0.12\text{em}$ (Uppercase) |
| **Headline** | Bold | $64\text{px}$ | $1.1$ | $-0.02\text{em}$ |
| **Body Copy**| Medium/Regular| $18\text{px}$ | $1.6$ | $-0.01\text{em}$ |
| **CTA Text** | Medium | $16\text{px}$ | $1.0$ | $0$ |

---

## 13. Statistics Layout

Positioned at the bottom margin (Columns 1–7):
*   **Structure**: Row-based layout separated by thin, vertical, semi-transparent separators ($1\text{px}$ wide, $40\text{px}$ high, color: `rgba(255,255,255,0.15)`).
*   **Data Count**: Numeric values use a tabular monospace font variant (`font-variant-numeric: tabular-nums`) to prevent horizontal layout shaking during counting transitions.

---

## 14. Background Depth Layers

The canvas is split into 4 distinct visual depths to establish depth:

```
[Camera]
   |---> Layer 0 (UI & Dialogue): Speech bubble overlays, Navbar text.
   |---> Layer 1 (Mascot): Ping model, Dock base, and dynamic shadows.
   |---> Layer 2 (Interactive grid): Coordinate lines, light grids.
   |---> Layer 3 (Far Space): Dark ambient background, star particles.
```

---

## 15. Camera Movement

The camera moves on a three-dimensional track:
*   **Dolly In (Startup)**: Slow push forward along the Z-axis by $50\text{ units}$ during boot.
*   **Pan & Tilt (Interaction)**: When Ping transitions to the top-right, the camera sweeps left and back ($X = -20\text{ units}$, $Z = -40\text{ units}$) to reveal the left columns.
*   **Ease Curve**: All camera adjustments use a custom bezier parameter (`cubic-bezier(0.16, 1, 0.3, 1)`) matching Apple's OS fluid layout decel.

---

## 16. Particle Behavior

*   **Density**: 300 active nodes.
*   **Scale**: Sizes vary between $1\text{px}$ and $3.5\text{px}$ using a randomized distribution.
*   **Motion**: Particles drift inside a noise field. 
*   **Interaction**: If Ping celebrates, a radial force is applied, pushing nearby particles outward by $150\text{px}$ before they drift back into position.

---

## 17. Loading Transition

1.  **Black Viewport**: Zero initial lights ($0\text{s}$).
2.  **The Pulse**: A thin, glowing ring progress circle rotates at the center.
3.  **Boot sequence**: The progress circle collapses into a single dot, flashing white ($100\text{ms}$) as the holographic dock activates, fading Ping in from the bottom of the dock.

---

## 18. Animation Timing

All transitional states utilize precise spring variables to match physical mass mechanics:
*   **Standard Spring (Positions)**:
    *   `stiffness: 120`
    *   `damping: 14`
    *   `mass: 1.0`
*   **Snappy Spring (Eye expressions & blinks)**:
    *   `stiffness: 220`
    *   `damping: 18`
    *   `mass: 0.8`

---

## 19. Apple-Level UX Reasoning

*   **Minimal Intrusion**: Ping is an assistant, not an obstacle. If the user scrolls past the Hero, Ping transitions to the corner dock and remains silent unless clicked, avoiding the disruptive UX of common chat assistants.
*   **Physical Grounding**: By giving Ping shadows, reflections, and camera parallax, the mascot feels integrated into the portfolio, rather than looking like a flat sticker on top of the browser.

---

## 20. Accessibility Decisions

*   **Motion Toggle**: If a user has `prefers-reduced-motion` enabled, all spring translates, camera pans, and floating animations are bypassed. Ping stays fixed in the top-right anchor, and expressions transition instantly without easing.
*   **Screen Reader Navigation**: All spoken dialogues are printed to a hidden, aria-live region:
    `<div aria-live="polite" class="sr-only">`
    Ensuring screen readers read Ping's greetings and tips without visual clutter.
*   **Contrast Bounds**: Glow points are calibrated to keep a $4.5:1$ contrast ratio against the deep dark-gray background.
