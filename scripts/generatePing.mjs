/**
 * generatePing.mjs
 *
 * Programmatic 3D GLB generator for Ping mascot.
 * Uses Three.js geometry primitives + PBR MeshStandardMaterial.
 * Exports a fully structured GLB with:
 *   - Correct mesh hierarchy (separated parts)
 *   - PBR metalness/roughness materials
 *   - Emissive cyan LED materials
 *   - Animation-ready pivot points
 *
 * Run: node generatePing.mjs
 * Output: public/models/ping.glb
 */

// ─────────────────────────────────────────
// NODE POLYFILLS (GLTFExporter needs browser APIs)
// ─────────────────────────────────────────
import { Blob } from 'buffer';
global.Blob = Blob;


import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─────────────────────────────────────────
// MATERIAL LIBRARY (PBR)
// ─────────────────────────────────────────

const MAT = {
  // White ceramic shell — high gloss, slight metallic sheen
  ceramicWhite: new THREE.MeshStandardMaterial({
    name: 'ceramic_white',
    color: new THREE.Color(0xF0F6FF),
    metalness: 0.08,
    roughness: 0.12,
    envMapIntensity: 1.4,
  }),

  // Glossy piano black — OLED visor / display
  pianoBlack: new THREE.MeshStandardMaterial({
    name: 'piano_black',
    color: new THREE.Color(0x040810),
    metalness: 0.05,
    roughness: 0.04,
    envMapIntensity: 1.8,
  }),

  // Dark graphite — joints, sockets, connectors
  graphite: new THREE.MeshStandardMaterial({
    name: 'graphite',
    color: new THREE.Color(0x1A2535),
    metalness: 0.55,
    roughness: 0.35,
    envMapIntensity: 0.9,
  }),

  // Brushed aluminium — ring rim, collar
  brushedAluminium: new THREE.MeshStandardMaterial({
    name: 'brushed_aluminium',
    color: new THREE.Color(0xCCD8EC),
    metalness: 0.82,
    roughness: 0.28,
    envMapIntensity: 1.1,
  }),

  // Electric cyan emissive — eyes, chest core, ear rings, antenna orb
  cyanEmissive: new THREE.MeshStandardMaterial({
    name: 'cyan_emissive',
    color: new THREE.Color(0x00F5FF),
    emissive: new THREE.Color(0x00F5FF),
    emissiveIntensity: 2.2,
    metalness: 0.0,
    roughness: 0.0,
    transparent: true,
    opacity: 0.95,
  }),

  // Soft white emissive — eye core specular glow
  whiteGlow: new THREE.MeshStandardMaterial({
    name: 'white_glow',
    color: new THREE.Color(0xFFFFFF),
    emissive: new THREE.Color(0xCCFFFF),
    emissiveIntensity: 1.2,
    metalness: 0.0,
    roughness: 0.0,
  }),

  // Ring inner void — very dark, slight iridescence
  ringVoid: new THREE.MeshStandardMaterial({
    name: 'ring_void',
    color: new THREE.Color(0x030810),
    metalness: 0.3,
    roughness: 0.6,
  }),

  // Soft rubber — wrist/elbow accent rings
  softRubber: new THREE.MeshStandardMaterial({
    name: 'soft_rubber',
    color: new THREE.Color(0x101820),
    metalness: 0.0,
    roughness: 0.88,
  }),
};

// ─────────────────────────────────────────
// GEOMETRY HELPERS
// ─────────────────────────────────────────

function mesh(geometry, material, name) {
  const m = new THREE.Mesh(geometry, material);
  m.name = name;
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

function group(name) {
  const g = new THREE.Group();
  g.name = name;
  return g;
}

// ─────────────────────────────────────────
// BUILD PING
// All units in meters. Ping stands ~0.55m tall.
// Head center at Y = 0.24
// Body center at Y = 0.00
// Ring at Y = -0.30
// ─────────────────────────────────────────

function buildPing() {
  const root = group('Ping');

  // ═══════════════════════════════════════
  // 1. HOVER RING (anti-gravity energy field)
  // ═══════════════════════════════════════
  const ringGroup = group('Ring');
  ringGroup.position.set(0, -0.30, 0);

  // Outer rim — titanium torus
  const rimGeo = new THREE.TorusGeometry(0.22, 0.025, 24, 80);
  const rim = mesh(rimGeo, MAT.brushedAluminium, 'Ring_Rim');
  rimGeo.rotateX(Math.PI / 2);
  ringGroup.add(rim);

  // Inner flat disc (dark void / energy field plane)
  const voidGeo = new THREE.CylinderGeometry(0.192, 0.192, 0.004, 64);
  const voidDisc = mesh(voidGeo, MAT.ringVoid, 'Ring_Void');
  ringGroup.add(voidDisc);

  // Plasma energy ring (thin emissive torus inside rim)
  const plasmaGeo = new THREE.TorusGeometry(0.192, 0.008, 12, 80);
  plasmaGeo.rotateX(Math.PI / 2);
  const plasma = mesh(plasmaGeo, MAT.cyanEmissive, 'Ring_Plasma');
  ringGroup.add(plasma);

  // Three particle orbs on the ring
  [-1, 0, 1].forEach((i) => {
    const angle = (i / 3) * Math.PI * 2;
    const particleGeo = new THREE.SphereGeometry(0.01, 8, 8);
    const particle = mesh(particleGeo, MAT.whiteGlow, `Ring_Particle_${i + 2}`);
    particle.position.set(
      Math.cos(angle) * 0.192,
      0,
      Math.sin(angle) * 0.192
    );
    ringGroup.add(particle);
  });

  root.add(ringGroup);

  // ═══════════════════════════════════════
  // 2. BODY (rounded capsule torso)
  // ═══════════════════════════════════════
  const bodyGroup = group('Body');
  bodyGroup.position.set(0, 0, 0);

  // Main torso — squashed sphere for rounded capsule feel
  const torsoGeo = new THREE.SphereGeometry(0.14, 48, 48);
  torsoGeo.scale(1, 1.1, 0.92);
  const torso = mesh(torsoGeo, MAT.ceramicWhite, 'Body_Torso');
  bodyGroup.add(torso);

  // Chest core port
  const corePortGeo = new THREE.CylinderGeometry(0.032, 0.032, 0.012, 32);
  const corePort = mesh(corePortGeo, MAT.graphite, 'Body_CorePort');
  corePort.position.set(0, 0.01, 0.135);
  corePort.rotateX(Math.PI / 2);
  bodyGroup.add(corePort);

  const coreEmissiveGeo = new THREE.SphereGeometry(0.022, 24, 24);
  const coreEmissive = mesh(coreEmissiveGeo, MAT.cyanEmissive, 'Body_CoreEmissive');
  coreEmissive.position.set(0, 0.01, 0.14);
  bodyGroup.add(coreEmissive);

  // Neck collar
  const neckGeo = new THREE.CylinderGeometry(0.048, 0.055, 0.038, 32);
  const neck = mesh(neckGeo, MAT.graphite, 'Body_Neck');
  neck.position.set(0, 0.152, 0);
  bodyGroup.add(neck);

  // Left shoulder ball joint
  const lShoulderGeo = new THREE.SphereGeometry(0.038, 24, 24);
  const lShoulder = mesh(lShoulderGeo, MAT.graphite, 'Body_ShoulderLeft');
  lShoulder.position.set(-0.165, 0.055, 0);
  bodyGroup.add(lShoulder);

  // Right shoulder ball joint
  const rShoulderGeo = new THREE.SphereGeometry(0.038, 24, 24);
  const rShoulder = mesh(rShoulderGeo, MAT.graphite, 'Body_ShoulderRight');
  rShoulder.position.set(0.165, 0.055, 0);
  bodyGroup.add(rShoulder);

  root.add(bodyGroup);

  // ═══════════════════════════════════════
  // 3. LEFT ARM
  // ═══════════════════════════════════════
  const leftArm = group('ArmLeft');
  leftArm.position.set(-0.165, 0.055, 0);

  // Upper arm
  const luArmGeo = new THREE.CapsuleGeometry(0.028, 0.09, 12, 24);
  luArmGeo.rotateZ(Math.PI / 4);
  const luArm = mesh(luArmGeo, MAT.ceramicWhite, 'ArmLeft_Upper');
  luArm.position.set(-0.055, -0.055, 0);
  leftArm.add(luArm);

  // Elbow joint
  const lElbowGeo = new THREE.SphereGeometry(0.026, 20, 20);
  const lElbow = mesh(lElbowGeo, MAT.graphite, 'ArmLeft_Elbow');
  lElbow.position.set(-0.10, -0.095, 0);
  leftArm.add(lElbow);

  // Forearm
  const lfArmGeo = new THREE.CapsuleGeometry(0.024, 0.085, 12, 24);
  lfArmGeo.rotateZ(Math.PI / 5);
  const lfArm = mesh(lfArmGeo, MAT.ceramicWhite, 'ArmLeft_Fore');
  lfArm.position.set(-0.14, -0.155, 0);
  leftArm.add(lfArm);

  // Wrist rubber ring
  const lWristGeo = new THREE.TorusGeometry(0.022, 0.007, 12, 32);
  lWristGeo.rotateX(Math.PI / 2.5);
  const lWrist = mesh(lWristGeo, MAT.softRubber, 'ArmLeft_Wrist');
  lWrist.position.set(-0.17, -0.215, 0);
  leftArm.add(lWrist);

  // Hand (rounded fist)
  const lHandGeo = new THREE.SphereGeometry(0.032, 24, 24);
  lHandGeo.scale(1.1, 0.85, 0.95);
  const lHand = mesh(lHandGeo, MAT.graphite, 'ArmLeft_Hand');
  lHand.position.set(-0.175, -0.245, 0);
  leftArm.add(lHand);

  root.add(leftArm);

  // ═══════════════════════════════════════
  // 4. RIGHT ARM (mirror of left)
  // ═══════════════════════════════════════
  const rightArm = group('ArmRight');
  rightArm.position.set(0.165, 0.055, 0);

  const ruArmGeo = new THREE.CapsuleGeometry(0.028, 0.09, 12, 24);
  ruArmGeo.rotateZ(-Math.PI / 4);
  const ruArm = mesh(ruArmGeo, MAT.ceramicWhite, 'ArmRight_Upper');
  ruArm.position.set(0.055, -0.055, 0);
  rightArm.add(ruArm);

  const rElbowGeo = new THREE.SphereGeometry(0.026, 20, 20);
  const rElbow = mesh(rElbowGeo, MAT.graphite, 'ArmRight_Elbow');
  rElbow.position.set(0.10, -0.095, 0);
  rightArm.add(rElbow);

  const rfArmGeo = new THREE.CapsuleGeometry(0.024, 0.085, 12, 24);
  rfArmGeo.rotateZ(-Math.PI / 5);
  const rfArm = mesh(rfArmGeo, MAT.ceramicWhite, 'ArmRight_Fore');
  rfArm.position.set(0.14, -0.155, 0);
  rightArm.add(rfArm);

  const rWristGeo = new THREE.TorusGeometry(0.022, 0.007, 12, 32);
  rWristGeo.rotateX(Math.PI / 2.5);
  const rWrist = mesh(rWristGeo, MAT.softRubber, 'ArmRight_Wrist');
  rWrist.position.set(0.17, -0.215, 0);
  rightArm.add(rWrist);

  const rHandGeo = new THREE.SphereGeometry(0.032, 24, 24);
  rHandGeo.scale(1.1, 0.85, 0.95);
  const rHand = mesh(rHandGeo, MAT.graphite, 'ArmRight_Hand');
  rHand.position.set(0.175, -0.245, 0);
  rightArm.add(rHand);

  root.add(rightArm);

  // ═══════════════════════════════════════
  // 5. HEAD (tall rounded helmet)
  // ═══════════════════════════════════════
  const headGroup = group('Head');
  headGroup.position.set(0, 0.24, 0);

  // Main ceramic helmet shell — tall rounded squarish sphere
  const helmetGeo = new THREE.SphereGeometry(0.155, 64, 64);
  helmetGeo.scale(1, 1.18, 0.94);
  const helmet = mesh(helmetGeo, MAT.ceramicWhite, 'Head_Helmet');
  headGroup.add(helmet);

  // OLED visor (piano black display inset)
  // Slightly convex disc sitting on the face
  const visorGeo = new THREE.SphereGeometry(0.11, 48, 48, 0, Math.PI * 2, 0, Math.PI * 0.5);
  visorGeo.scale(1, 0.7, 0.55);
  const visor = mesh(visorGeo, MAT.pianoBlack, 'Head_Visor');
  visor.position.set(0, 0, 0.105);
  visor.rotateX(Math.PI);
  headGroup.add(visor);

  // Left ear disc module
  const lEarGeo = new THREE.CylinderGeometry(0.038, 0.038, 0.018, 40);
  lEarGeo.rotateZ(Math.PI / 2);
  const lEar = mesh(lEarGeo, MAT.graphite, 'Head_EarLeft');
  lEar.position.set(-0.158, 0, 0);
  headGroup.add(lEar);

  // Left ear accent ring
  const lEarRingGeo = new THREE.TorusGeometry(0.022, 0.004, 12, 40);
  lEarRingGeo.rotateY(Math.PI / 2);
  const lEarRing = mesh(lEarRingGeo, MAT.cyanEmissive, 'Head_EarLeftRing');
  lEarRing.position.set(-0.162, 0, 0);
  headGroup.add(lEarRing);

  // Right ear disc
  const rEarGeo = new THREE.CylinderGeometry(0.038, 0.038, 0.018, 40);
  rEarGeo.rotateZ(Math.PI / 2);
  const rEar = mesh(rEarGeo, MAT.graphite, 'Head_EarRight');
  rEar.position.set(0.158, 0, 0);
  headGroup.add(rEar);

  const rEarRingGeo = new THREE.TorusGeometry(0.022, 0.004, 12, 40);
  rEarRingGeo.rotateY(Math.PI / 2);
  const rEarRing = mesh(rEarRingGeo, MAT.cyanEmissive, 'Head_EarRightRing');
  rEarRing.position.set(0.162, 0, 0);
  headGroup.add(rEarRing);

  // ═══════════════════════════════════════
  // 6. EYES (separated for morph targets)
  // ═══════════════════════════════════════
  const eyesGroup = group('Eyes');
  eyesGroup.position.set(0, 0, 0); // child of headGroup

  // Left eye — vertical oval emissive
  const lEyeGeo = new THREE.SphereGeometry(0.028, 32, 32);
  lEyeGeo.scale(0.7, 1, 0.3);
  const lEye = mesh(lEyeGeo, MAT.cyanEmissive, 'Eye_Left');
  lEye.position.set(-0.042, 0.015, 0.138);
  eyesGroup.add(lEye);

  // Left eye specular glint
  const lGlintGeo = new THREE.SphereGeometry(0.008, 12, 12);
  const lGlint = mesh(lGlintGeo, MAT.whiteGlow, 'Eye_Left_Glint');
  lGlint.position.set(-0.052, 0.028, 0.147);
  eyesGroup.add(lGlint);

  // Right eye
  const rEyeGeo = new THREE.SphereGeometry(0.028, 32, 32);
  rEyeGeo.scale(0.7, 1, 0.3);
  const rEye = mesh(rEyeGeo, MAT.cyanEmissive, 'Eye_Right');
  rEye.position.set(0.042, 0.015, 0.138);
  eyesGroup.add(rEye);

  const rGlintGeo = new THREE.SphereGeometry(0.008, 12, 12);
  const rGlint = mesh(rGlintGeo, MAT.whiteGlow, 'Eye_Right_Glint');
  rGlint.position.set(0.032, 0.028, 0.147);
  eyesGroup.add(rGlint);

  // Smile — thin torus arc
  const smileGeo = new THREE.TorusGeometry(0.022, 0.004, 8, 32, Math.PI * 0.7);
  smileGeo.rotateZ(Math.PI * 0.85);
  smileGeo.rotateX(-Math.PI / 10);
  const smile = mesh(smileGeo, MAT.cyanEmissive, 'Face_Smile');
  smile.position.set(0, -0.022, 0.148);
  eyesGroup.add(smile);

  headGroup.add(eyesGroup);

  // ═══════════════════════════════════════
  // 7. ANTENNA
  // ═══════════════════════════════════════
  const antennaGroup = group('Antenna');

  // Base socket
  const aSockGeo = new THREE.SphereGeometry(0.014, 16, 16);
  const aSock = mesh(aSockGeo, MAT.graphite, 'Antenna_Socket');
  antennaGroup.add(aSock);

  // Rod — thin tapered cylinder
  const aRodGeo = new THREE.CylinderGeometry(0.006, 0.009, 0.095, 16);
  const aRod = mesh(aRodGeo, MAT.brushedAluminium, 'Antenna_Rod');
  aRod.position.set(0, 0.052, 0);
  antennaGroup.add(aRod);

  // Tip orb — emissive cyan sphere
  const aOrbGeo = new THREE.SphereGeometry(0.016, 24, 24);
  const aOrb = mesh(aOrbGeo, MAT.cyanEmissive, 'Antenna_Orb');
  aOrb.position.set(0, 0.108, 0);
  antennaGroup.add(aOrb);

  // Position antenna on top of head, tilted
  antennaGroup.position.set(0.03, 0.168, 0);
  antennaGroup.rotateZ(0.22); // ~12° right tilt

  headGroup.add(antennaGroup);
  root.add(headGroup);

  return root;
}

// ─────────────────────────────────────────
// EXPORT
// ─────────────────────────────────────────

async function exportGLB(scene) {
  const exporter = new GLTFExporter();
  // parseAsync returns the raw result (ArrayBuffer for binary:true)
  const result = await exporter.parseAsync(scene, {
    binary: true,
    embedImages: true,
    includeCustomExtensions: false,
  });
  // result is either ArrayBuffer or object; ensure Buffer
  if (result instanceof ArrayBuffer) {
    return Buffer.from(result);
  }
  // Fallback: some versions wrap it
  if (result && result.buffer) {
    return Buffer.from(result.buffer);
  }
  throw new Error(`Unexpected GLTFExporter result type: ${typeof result}`);
}

async function main() {
  console.log('Building Ping 3D model...');

  const scene = new THREE.Scene();
  scene.name = 'PingScene';

  const ping = buildPing();
  scene.add(ping);

  console.log('Exporting GLB...');

  const glbBuffer = await exportGLB(scene);

  const outputDir = resolve(__dirname, '../public/models');
  mkdirSync(outputDir, { recursive: true });

  const outputPath = resolve(outputDir, 'ping.glb');
  writeFileSync(outputPath, glbBuffer);

  console.log(`✓ GLB exported to: ${outputPath}`);
  console.log(`  File size: ${(glbBuffer.length / 1024).toFixed(1)} KB`);

  // Print mesh hierarchy
  console.log('\nMesh Hierarchy:');
  function printHierarchy(obj, depth = 0) {
    console.log('  '.repeat(depth) + (obj.isMesh ? '◆ ' : '▸ ') + obj.name);
    obj.children.forEach(c => printHierarchy(c, depth + 1));
  }
  printHierarchy(ping);
}

main().catch(console.error);
