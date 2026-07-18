import { useEffect, useState, useRef } from 'react';
import { usePing } from './usePing.js';

/**
 * usePingLookController
 * Performs trigonometry calculations to rotate Ping's face plate toward
 * active hover targets (Headline, CTA, Mouse, Navbar, Sections).
 * Smoothly interpolates values using springs to guarantee no snapping.
 */
export function usePingLookController(containerRef) {
  const mascot = usePing();
  const { x: lookX, y: lookY } = mascot.lookRotation;

  // 2. Behavioral states
  const [expressionOverride, setExpressionOverride] = useState(null);
  const [armPoseOverride, setArmPoseOverride] = useState(null);
  const [ringSpeedOverride, setRingSpeedOverride] = useState(null);

  // Telemetry trackers
  const angleHistory = useRef([]);
  const wasNear = useRef(false);
  const dizzyTimerRef = useRef(null);
  const waveTimerRef = useRef(null);

  useEffect(() => {
    if (!containerRef || !containerRef.current) return;

    const handleMouseMove = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      // Mouse vector from center
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Resolve looked targets based on hover anchors
      let targetX = dx;
      let targetY = dy;

      // A. Look target calculations
      const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
      if (hoveredElement) {
        // Resolve closest interactive class anchors
        const interactive = hoveredElement.closest(
          '[class*="Headline"], [class*="ctaGroup"], [class*="navbar"], [class*="projects"], [class*="contact"]'
        );
        if (interactive) {
          const tRect = interactive.getBoundingClientRect();
          const tcx = tRect.left + tRect.width / 2;
          const tcy = tRect.top + tRect.height / 2;
          targetX = tcx - cx;
          targetY = tcy - cy;
        }
      }

      // Max rotation: 12 degrees
      const angleRad = Math.atan2(targetY, targetX);
      const clampDist = Math.min(dist, 250);
      const degreeScale = (clampDist / 250) * 12;
      
      const rotX = Math.cos(angleRad) * degreeScale;
      const rotY = Math.sin(angleRad) * degreeScale;

      // Update spring targets smoothly
      lookX.set(rotX);
      lookY.set(rotY);

      // B. Cursor Attraction System
      // 1. Cursor touches Ping (< 45px) -> Smile winks
      if (dist < 45) {
        setExpressionOverride('happy');
      } else {
        setExpressionOverride(null);
      }

      // 2. Cursor circles Ping -> Dizzy loops
      const timestamp = Date.now();
      const currentAngle = Math.atan2(dy, dx);
      angleHistory.current.push({ angle: currentAngle, time: timestamp });

      // Prune history > 1.5s
      angleHistory.current = angleHistory.current.filter(item => timestamp - item.time < 1500);

      if (angleHistory.current.length > 8) {
        let totalRotation = 0;
        for (let i = 1; i < angleHistory.current.length; i++) {
          let diff = angleHistory.current[i].angle - angleHistory.current[i - 1].angle;
          // Normalize angle wraps
          if (diff > Math.PI) diff -= Math.PI * 2;
          if (diff < -Math.PI) diff += Math.PI * 2;
          totalRotation += diff;
        }

        // If cumulative rotation exceeds 360 degrees (2 * PI)
        if (Math.abs(totalRotation) > Math.PI * 2) {
          setExpressionOverride('surprise');
          setRingSpeedOverride(35); // Spin ring fast!
          
          if (dizzyTimerRef.current) clearTimeout(dizzyTimerRef.current);
          dizzyTimerRef.current = setTimeout(() => {
            setExpressionOverride(null);
            setRingSpeedOverride(null);
            angleHistory.current = [];
          }, 2000);
        }
      }

      // 3. Cursor leaves (distance transition from near to far)
      const isNearNow = dist < 160;
      if (wasNear.current && !isNearNow) {
        // Just left -> wave!
        setArmPoseOverride('wave');
        if (waveTimerRef.current) clearTimeout(waveTimerRef.current);
        waveTimerRef.current = setTimeout(() => {
          setArmPoseOverride(null);
        }, 1500);
      }
      wasNear.current = isNearNow;
    };

    // Listen to document tracking
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (dizzyTimerRef.current) clearTimeout(dizzyTimerRef.current);
      if (waveTimerRef.current) clearTimeout(waveTimerRef.current);
    };
  }, [containerRef, lookX, lookY]);

  return {
    lookRotation: { x: lookX, y: lookY },
    expressionOverride,
    armPoseOverride,
    ringSpeedOverride
  };
}
