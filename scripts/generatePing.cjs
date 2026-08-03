/**
 * generatePing.cjs
 * CommonJS GLB Generator for Ping mascot.
 * Polyfills are set up before THREE loads.
 *
 * Run: node scripts/generatePing.cjs
 * Output: public/models/ping.glb
 */
'use strict';

// ── Node polyfills must be set before requiring Three.js ──
global.Blob = require('buffer').Blob;
global.URL  = require('url').URL;

// Minimal FileReader polyfill (used by GLTFExporter.writeAsync)
global.FileReader = class FileReader {
  constructor() {
    this.result = null;
    this.onload = null;
    this.onerror = null;
  }
  readAsArrayBuffer(blob) {
    (blob.arrayBuffer
      ? blob.arrayBuffer()
      : Promise.resolve(blob)
    ).then((buf) => {
      this.result = buf instanceof ArrayBuffer ? buf : buf.buffer || buf;
      if (this.onload) this.onload({ target: { result: this.result } });
    }).catch((err) => {
      if (this.onerror) this.onerror(err);
    });
  }
  readAsDataURL(blob) {
    (blob.arrayBuffer
      ? blob.arrayBuffer()
      : Promise.resolve(blob)
    ).then((buf) => {
      const data = Buffer.from(buf instanceof Buffer ? buf : Buffer.from(buf));
      const b64  = data.toString('base64');
      const mime = (blob.type) || 'application/octet-stream';
      this.result = `data:${mime};base64,${b64}`;
      if (this.onload) this.onload({ target: { result: this.result } });
    }).catch((err) => {
      if (this.onerror) this.onerror(err);
    });
  }
};

// Now safe to load Three
const THREE = require('three');
const { GLTFExporter } = require('three/examples/jsm/exporters/GLTFExporter.js');
const { writeFileSync, mkdirSync } = require('fs');
const { resolve } = require('path');

// ─────────────────────────────────────────
// MATERIAL LIBRARY (PBR)
// ─────────────────────────────────────────
const MAT = {
  ceramicWhite: new THREE.MeshStandardMaterial({
    name: 'ceramic_white',
    color: new THREE.Color(0xF2F7FF),
    metalness: 0.06,
    roughness: 0.10,
  }),
  pianoBlack: new THREE.MeshStandardMaterial({
    name: 'piano_black',
    color: new THREE.Color(0x030710),
    metalness: 0.04,
    roughness: 0.03,
  }),
  graphite: new THREE.MeshStandardMaterial({
    name: 'graphite',
    color: new THREE.Color(0x18222F),
    metalness: 0.55,
    roughness: 0.38,
  }),
  brushedMetal: new THREE.MeshStandardMaterial({
    name: 'brushed_metal',
    color: new THREE.Color(0xC8D8EC),
    metalness: 0.80,
    roughness: 0.30,
  }),
  cyanEmissive: new THREE.MeshStandardMaterial({
    name: 'cyan_emissive',
    color: new THREE.Color(0x00F5FF),
    emissive: new THREE.Color(0x00F5FF),
    emissiveIntensity: 2.5,
    metalness: 0.0,
    roughness: 0.0,
  }),
  whiteGlow: new THREE.MeshStandardMaterial({
    name: 'white_glow',
    color: new THREE.Color(0xFFFFFF),
    emissive: new THREE.Color(0xCCFFFF),
    emissiveIntensity: 1.5,
    metalness: 0.0,
    roughness: 0.0,
  }),
  softRubber: new THREE.MeshStandardMaterial({
    name: 'soft_rubber',
    color: new THREE.Color(0x101828),
    metalness: 0.0,
    roughness: 0.92,
  }),
};

// ─────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────
function mkMesh(geo, mat, name) {
  const m = new THREE.Mesh(geo, mat);
  m.name = name;
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}
function mkGroup(name) {
  const g = new THREE.Group();
  g.name = name;
  return g;
}

// ─────────────────────────────────────────
// BUILD PING
// ─────────────────────────────────────────
function buildPing() {
  const root = mkGroup('Ping');

  // 1. HOVER RING
  const ringGroup = mkGroup('Ring');
  ringGroup.position.set(0, -0.30, 0);

  const rimGeo = new THREE.TorusGeometry(0.22, 0.024, 24, 80);
  rimGeo.rotateX(Math.PI / 2);
  ringGroup.add(mkMesh(rimGeo, MAT.brushedMetal, 'Ring_Rim'));

  const voidGeo = new THREE.CylinderGeometry(0.192, 0.192, 0.004, 64);
  ringGroup.add(mkMesh(voidGeo, MAT.graphite, 'Ring_Void'));

  const plasmaGeo = new THREE.TorusGeometry(0.192, 0.007, 12, 80);
  plasmaGeo.rotateX(Math.PI / 2);
  ringGroup.add(mkMesh(plasmaGeo, MAT.cyanEmissive, 'Ring_Plasma'));

  [0, 1, 2].forEach(i => {
    const angle = (i / 3) * Math.PI * 2;
    const pGeo = new THREE.SphereGeometry(0.009, 8, 8);
    const p = mkMesh(pGeo, MAT.whiteGlow, `Ring_Particle${i}`);
    p.position.set(Math.cos(angle) * 0.192, 0, Math.sin(angle) * 0.192);
    ringGroup.add(p);
  });
  root.add(ringGroup);

  // 2. BODY
  const bodyGroup = mkGroup('Body');

  const torsoGeo = new THREE.SphereGeometry(0.14, 48, 48);
  torsoGeo.scale(1, 1.10, 0.92);
  bodyGroup.add(mkMesh(torsoGeo, MAT.ceramicWhite, 'Body_Torso'));

  const neckGeo = new THREE.CylinderGeometry(0.047, 0.054, 0.036, 32);
  const neck = mkMesh(neckGeo, MAT.graphite, 'Body_Neck');
  neck.position.set(0, 0.148, 0);
  bodyGroup.add(neck);

  const corePortGeo = new THREE.CylinderGeometry(0.031, 0.031, 0.011, 32);
  const corePort = mkMesh(corePortGeo, MAT.graphite, 'Body_CorePort');
  corePort.position.set(0, 0.01, 0.132);
  corePort.rotateX(Math.PI / 2);
  bodyGroup.add(corePort);

  const coreGeo = new THREE.SphereGeometry(0.021, 24, 24);
  const core = mkMesh(coreGeo, MAT.cyanEmissive, 'Body_Core');
  core.position.set(0, 0.01, 0.139);
  bodyGroup.add(core);

  // Shoulder sockets
  [-1, 1].forEach(side => {
    const sg = new THREE.SphereGeometry(0.038, 24, 24);
    const s = mkMesh(sg, MAT.graphite, `Body_Shoulder${side < 0 ? 'Left' : 'Right'}`);
    s.position.set(side * 0.162, 0.052, 0);
    bodyGroup.add(s);
  });

  root.add(bodyGroup);

  // 3 + 4. ARMS
  [-1, 1].forEach(side => {
    const label = side < 0 ? 'Left' : 'Right';
    const arm = mkGroup(`Arm${label}`);
    arm.position.set(side * 0.162, 0.052, 0);

    // Upper arm
    const uaGeo = new THREE.CapsuleGeometry(0.026, 0.090, 12, 24);
    uaGeo.rotateZ(side * (-Math.PI / 4));
    const ua = mkMesh(uaGeo, MAT.ceramicWhite, `Arm${label}_Upper`);
    ua.position.set(side * 0.054, -0.054, 0);
    arm.add(ua);

    // Elbow
    const elbGeo = new THREE.SphereGeometry(0.025, 20, 20);
    const elb = mkMesh(elbGeo, MAT.graphite, `Arm${label}_Elbow`);
    elb.position.set(side * 0.098, -0.092, 0);
    arm.add(elb);

    // Forearm
    const faGeo = new THREE.CapsuleGeometry(0.022, 0.082, 12, 24);
    faGeo.rotateZ(side * (-Math.PI / 5.5));
    const fa = mkMesh(faGeo, MAT.ceramicWhite, `Arm${label}_Fore`);
    fa.position.set(side * 0.138, -0.150, 0);
    arm.add(fa);

    // Wrist
    const wrGeo = new THREE.TorusGeometry(0.020, 0.006, 12, 32);
    wrGeo.rotateX(Math.PI / 2.4);
    const wr = mkMesh(wrGeo, MAT.softRubber, `Arm${label}_Wrist`);
    wr.position.set(side * 0.168, -0.210, 0);
    arm.add(wr);

    // Hand
    const handGeo = new THREE.SphereGeometry(0.030, 24, 24);
    handGeo.scale(1.10, 0.84, 0.94);
    const hand = mkMesh(handGeo, MAT.graphite, `Arm${label}_Hand`);
    hand.position.set(side * 0.172, -0.240, 0);
    arm.add(hand);

    root.add(arm);
  });

  // 5. HEAD
  const headGroup = mkGroup('Head');
  headGroup.position.set(0, 0.24, 0);

  const helmetGeo = new THREE.SphereGeometry(0.155, 64, 64);
  helmetGeo.scale(1, 1.18, 0.94);
  headGroup.add(mkMesh(helmetGeo, MAT.ceramicWhite, 'Head_Helmet'));

  // Visor — flat-ish convex cap on the face
  const visorGeo = new THREE.SphereGeometry(0.108, 48, 32, 0, Math.PI * 2, 0, Math.PI * 0.48);
  visorGeo.scale(1, 0.68, 0.50);
  const visor = mkMesh(visorGeo, MAT.pianoBlack, 'Head_Visor');
  visor.position.set(0, 0, 0.108);
  visor.rotateX(Math.PI);
  headGroup.add(visor);

  // Ear discs
  [-1, 1].forEach(side => {
    const label = side < 0 ? 'Left' : 'Right';
    const edGeo = new THREE.CylinderGeometry(0.038, 0.038, 0.016, 40);
    edGeo.rotateZ(Math.PI / 2);
    const ed = mkMesh(edGeo, MAT.graphite, `Head_Ear${label}`);
    ed.position.set(side * 0.156, 0, 0);
    headGroup.add(ed);

    const erGeo = new THREE.TorusGeometry(0.021, 0.004, 12, 40);
    erGeo.rotateY(Math.PI / 2);
    const er = mkMesh(erGeo, MAT.cyanEmissive, `Head_Ear${label}Ring`);
    er.position.set(side * 0.160, 0, 0);
    headGroup.add(er);
  });

  // 6. EYES (inside headGroup)
  const eyeGroup = mkGroup('Eyes');

  [-1, 1].forEach(side => {
    const label = side < 0 ? 'Left' : 'Right';
    // Eye oval
    const eGeo = new THREE.SphereGeometry(0.026, 32, 32);
    eGeo.scale(0.68, 1.0, 0.28);
    const eye = mkMesh(eGeo, MAT.cyanEmissive, `Eye_${label}`);
    eye.position.set(side * 0.042, 0.014, 0.140);
    eyeGroup.add(eye);

    // Glint
    const gGeo = new THREE.SphereGeometry(0.007, 12, 12);
    const glint = mkMesh(gGeo, MAT.whiteGlow, `Eye_${label}_Glint`);
    glint.position.set(side * 0.052 + side * -0.008, 0.024, 0.148);
    eyeGroup.add(glint);
  });

  // Smile arc
  const smileGeo = new THREE.TorusGeometry(0.020, 0.0038, 8, 32, Math.PI * 0.65);
  smileGeo.rotateZ(Math.PI * 0.845);
  smileGeo.rotateX(-Math.PI / 12);
  const smile = mkMesh(smileGeo, MAT.cyanEmissive, 'Face_Smile');
  smile.position.set(0, -0.021, 0.148);
  eyeGroup.add(smile);

  headGroup.add(eyeGroup);

  // 7. ANTENNA
  const antGroup = mkGroup('Antenna');

  const sockGeo = new THREE.SphereGeometry(0.013, 16, 16);
  antGroup.add(mkMesh(sockGeo, MAT.graphite, 'Ant_Socket'));

  const rodGeo = new THREE.CylinderGeometry(0.0055, 0.009, 0.092, 16);
  const rod = mkMesh(rodGeo, MAT.brushedMetal, 'Ant_Rod');
  rod.position.set(0, 0.050, 0);
  antGroup.add(rod);

  const orbGeo = new THREE.SphereGeometry(0.015, 24, 24);
  const orb = mkMesh(orbGeo, MAT.cyanEmissive, 'Ant_Orb');
  orb.position.set(0, 0.105, 0);
  antGroup.add(orb);

  antGroup.position.set(0.030, 0.165, 0);
  antGroup.rotateZ(0.20);
  headGroup.add(antGroup);

  root.add(headGroup);

  return root;
}

// ─────────────────────────────────────────
// EXPORT
// ─────────────────────────────────────────
function exportGLB(scene) {
  return new Promise((res, rej) => {
    const exporter = new GLTFExporter();
    exporter.parse(
      scene,
      result => {
        if (result instanceof ArrayBuffer) {
          res(Buffer.from(result));
        } else {
          rej(new Error(`Unexpected result type: ${typeof result}`));
        }
      },
      err => rej(err),
      { binary: true, embedImages: false }
    );
  });
}

// ─────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────
async function main() {
  console.log('⚙  Building Ping 3D geometry...');
  const scene = new THREE.Scene();
  scene.name  = 'PingScene';
  const ping  = buildPing();
  scene.add(ping);

  console.log('📦 Exporting GLB...');
  const buf = await exportGLB(scene);

  const outDir  = resolve(__dirname, '..', 'public', 'models');
  const outPath = resolve(outDir, 'ping.glb');
  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, buf);

  const kb = (buf.length / 1024).toFixed(1);
  console.log(`✓  Saved: ${outPath} (${kb} KB)`);

  console.log('\nMesh Hierarchy:');
  function walk(obj, d = 0) {
    const icon = obj.isMesh ? '◆' : '▸';
    console.log('  '.repeat(d) + icon + ' ' + obj.name);
    obj.children.forEach(c => walk(c, d + 1));
  }
  walk(ping);
}

main().catch(err => { console.error('ERROR:', err); process.exit(1); });
