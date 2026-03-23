import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js';

export class CubeEngine {
  constructor() {
    this.scene = new THREE.Scene();
    this.cssScene = new THREE.Scene();
    this.clock = new THREE.Clock();
    this.cubeGroup = new THREE.Group();
    this.cssGroup = new THREE.Group();
    this.flashLight = null;

    this._initCamera();
    this._initRenderers();
    this._initLights();
    this._initStarfield();
    this._initPostProcessing();

    this.scene.add(this.cubeGroup);
    this.cssScene.add(this.cssGroup);

    window.addEventListener('resize', () => this._onResize());
  }

  _initCamera() {
    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000);
    this.camera.position.set(0, 0, 8);
    this.camera.lookAt(0, 0, 0);
  }

  _initRenderers() {
    // WebGL renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    document.getElementById('webgl-container').appendChild(this.renderer.domElement);

    // CSS3D renderer
    this.cssRenderer = new CSS3DRenderer();
    this.cssRenderer.setSize(window.innerWidth, window.innerHeight);
    this.cssRenderer.domElement.style.position = 'absolute';
    this.cssRenderer.domElement.style.top = '0';
    this.cssRenderer.domElement.style.pointerEvents = 'none';
    document.getElementById('css3d-container').appendChild(this.cssRenderer.domElement);
  }

  _initLights() {
    // Ambient light
    const ambient = new THREE.AmbientLight(0x111133, 0.4);
    this.scene.add(ambient);

    // Main directional light
    const dirLight = new THREE.DirectionalLight(0x4488ff, 0.6);
    dirLight.position.set(5, 8, 5);
    dirLight.castShadow = true;
    this.scene.add(dirLight);

    // Accent rim light
    const rimLight = new THREE.DirectionalLight(0x00bfff, 0.3);
    rimLight.position.set(-3, -2, 4);
    this.scene.add(rimLight);

    // Flash point light (for lightning)
    this.flashLight = new THREE.PointLight(0xffffff, 0, 30);
    this.flashLight.position.set(0, 5, 5);
    this.scene.add(this.flashLight);
  }

  _initStarfield() {
    const starCount = 2000;
    const positions = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
      sizes[i] = Math.random() * 2 + 0.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      color: 0x8888ff,
      size: 0.15,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.starfield = new THREE.Points(geometry, material);
    this.scene.add(this.starfield);
  }

  _initPostProcessing() {
    this.composer = new EffectComposer(this.renderer);
    
    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.5,  // strength
      0.4,  // radius
      0.85  // threshold
    );
    this.composer.addPass(bloomPass);
    this.bloomPass = bloomPass;
  }

  _createCubeGeometry() {
    // Create a translucent wireframe cube for glow effect
    const size = 3;
    const geometry = new THREE.BoxGeometry(size, size, size);
    
    // Edges for neon border effect
    const edges = new THREE.EdgesGeometry(geometry);
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0x00bfff,
      transparent: true,
      opacity: 0.6,
    });
    const wireframe = new THREE.LineSegments(edges, edgeMaterial);
    this.cubeGroup.add(wireframe);

    // Transparent faces for shadow/light interaction
    const faceMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0a0a1e,
      transparent: true,
      opacity: 0.15,
      roughness: 0.3,
      metalness: 0.5,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geometry, faceMaterial);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.cubeGroup.add(mesh);
  }

  init() {
    this._createCubeGeometry();
  }

  triggerFlash(intensity = 5, duration = 80) {
    this.flashLight.intensity = intensity;
    setTimeout(() => {
      this.flashLight.intensity = 0;
    }, duration);
  }

  render() {
    const delta = this.clock.getDelta();

    // Slow starfield rotation
    if (this.starfield) {
      this.starfield.rotation.y += delta * 0.01;
      this.starfield.rotation.x += delta * 0.005;
    }

    this.composer.render();
    this.cssRenderer.render(this.cssScene, this.camera);
  }

  _onResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(w, h);
    this.cssRenderer.setSize(w, h);
    this.composer.setSize(w, h);
  }

  dispose() {
    this.renderer.dispose();
    this.composer.dispose();
  }
}
