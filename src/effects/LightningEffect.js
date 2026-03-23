import * as THREE from 'three';

/**
 * Lightning Effect using Midpoint Displacement Algorithm
 * Creates fractal lightning bolts in the Three.js scene
 */
export class LightningEffect {
  constructor(scene, engine) {
    this.scene = scene;
    this.engine = engine;
    this.bolts = [];
    this.isIntro = true;
    this.intervalId = null;
    this._flashOverlay = document.getElementById('flash-overlay');
  }

  start() {
    // Intro phase: frequent lightning
    this._scheduleNext(500);
    
    // After 5 seconds, switch to normal frequency
    setTimeout(() => {
      this.isIntro = false;
    }, 5000);
  }

  _scheduleNext(customDelay) {
    const delay = customDelay || (this.isIntro ? 
      300 + Math.random() * 400 : 
      3000 + Math.random() * 5000);

    this.intervalId = setTimeout(() => {
      this.createBolt();
      this._scheduleNext();
    }, delay);
  }

  createBolt() {
    const startX = (Math.random() - 0.5) * 30;
    const startY = 10 + Math.random() * 10;
    const startZ = -5 - Math.random() * 45;

    const endX = startX + (Math.random() - 0.5) * 8;
    const endY = -5 - Math.random() * 5;
    const endZ = startZ + (Math.random() - 0.5) * 5;

    const mainPoints = this._generateLightningPoints(
      new THREE.Vector3(startX, startY, startZ),
      new THREE.Vector3(endX, endY, endZ),
      5, // recursion depth
      1.5 // displacement
    );

    // Main bolt
    const mainBolt = this._createLine(mainPoints, 0xffffff, 2);
    this.scene.add(mainBolt);
    this.bolts.push(mainBolt);

    // Glow line
    const glowBolt = this._createLine(mainPoints, 0x00ffff, 4, 0.3);
    this.scene.add(glowBolt);
    this.bolts.push(glowBolt);

    // Branches (3-7)
    const branchCount = 3 + Math.floor(Math.random() * 5);
    for (let i = 0; i < branchCount; i++) {
      const branchStartIdx = Math.floor(Math.random() * (mainPoints.length - 2)) + 1;
      const branchStart = mainPoints[branchStartIdx].clone();
      const branchEnd = new THREE.Vector3(
        branchStart.x + (Math.random() - 0.5) * 6,
        branchStart.y - Math.random() * 4,
        branchStart.z + (Math.random() - 0.5) * 3,
      );

      const branchPoints = this._generateLightningPoints(branchStart, branchEnd, 3, 0.8);
      const branch = this._createLine(branchPoints, 0xaaddff, 1, 0.5);
      this.scene.add(branch);
      this.bolts.push(branch);
    }

    // Flash the engine light
    this.engine.triggerFlash(5, 80);

    // Screen flash
    this._screenFlash();

    // Remove after lifetime
    const lifetime = 80 + Math.random() * 120;
    setTimeout(() => this._removeBolts(), lifetime);

    return { startX, startY, startZ };
  }

  _generateLightningPoints(start, end, depth, displacement) {
    if (depth === 0) return [start, end];

    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    mid.x += (Math.random() - 0.5) * displacement;
    mid.y += (Math.random() - 0.5) * displacement;
    mid.z += (Math.random() - 0.5) * displacement * 0.5;

    const left = this._generateLightningPoints(start, mid, depth - 1, displacement * 0.5);
    const right = this._generateLightningPoints(mid, end, depth - 1, displacement * 0.5);

    return [...left, ...right.slice(1)];
  }

  _createLine(points, color, linewidth = 1, opacity = 1) {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color,
      transparent: opacity < 1,
      opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    return new THREE.Line(geometry, material);
  }

  _screenFlash() {
    if (!this._flashOverlay) return;
    this._flashOverlay.classList.add('flash');
    setTimeout(() => {
      this._flashOverlay.classList.remove('flash');
    }, 60);
  }

  _removeBolts() {
    this.bolts.forEach(bolt => {
      bolt.geometry.dispose();
      bolt.material.dispose();
      this.scene.remove(bolt);
    });
    this.bolts = [];
  }

  stop() {
    if (this.intervalId) {
      clearTimeout(this.intervalId);
      this.intervalId = null;
    }
    this._removeBolts();
  }

  dispose() {
    this.stop();
  }
}
