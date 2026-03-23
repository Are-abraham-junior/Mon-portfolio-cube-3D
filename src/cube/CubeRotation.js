import gsap from 'gsap';

const FACE_NAMES = ['Présentation', 'Compétences', 'Certificats', 'Projets', 'Contact', 'Logo'];

// Rotation targets for each face (euler angles for the cube group)
// The cube group is rotated so the target face faces the camera (Z+ direction)
const FACE_ROTATIONS = {
  0: { x: 0, y: 0 },           // Front  (Présentation)
  1: { x: 0, y: -Math.PI / 2 }, // Right  (Compétences)
  2: { x: 0, y: -Math.PI },     // Back   (Certificats)
  3: { x: 0, y: Math.PI / 2 },  // Left   (Projets)
  4: { x: -Math.PI / 2, y: 0 }, // Top    (Contact)
  5: { x: Math.PI / 2, y: 0 },  // Bottom (Logo)
};

export class CubeRotation {
  constructor(cubeGroup, cssGroup) {
    this.cubeGroup = cubeGroup;
    this.cssGroup = cssGroup;
    this.currentFace = 0;
    this.isAnimating = false;
    this.onFaceChange = null; // callback

    // Current accumulated rotation
    this._targetRotX = 0;
    this._targetRotY = 0;

    // Drag state
    this._isDragging = false;
    this._dragStart = { x: 0, y: 0 };
    this._dragRotStart = { x: 0, y: 0 };
  }

  rotateLeft() {
    if (this.isAnimating) return;
    // Prevent horizontal rotation if we're on top/bottom face
    if (this.currentFace === 4 || this.currentFace === 5) {
      // Go to left face
      this.goToFace(3);
      return;
    }
    // Cycle through: 0 -> 3 -> 2 -> 1 -> 0
    const faceOrder = [0, 1, 2, 3];
    const idx = faceOrder.indexOf(this.currentFace);
    const next = faceOrder[(idx + 3) % 4]; // prev in order
    this.goToFace(next);
  }

  rotateRight() {
    if (this.isAnimating) return;
    if (this.currentFace === 4 || this.currentFace === 5) {
      this.goToFace(1);
      return;
    }
    const faceOrder = [0, 1, 2, 3];
    const idx = faceOrder.indexOf(this.currentFace);
    const next = faceOrder[(idx + 1) % 4];
    this.goToFace(next);
  }

  rotateUp() {
    if (this.isAnimating) return;
    if (this.currentFace === 4) return; // Already on top
    if (this.currentFace === 5) {
      this.goToFace(0); // Go from bottom to front
      return;
    }
    this.goToFace(4);
  }

  rotateDown() {
    if (this.isAnimating) return;
    if (this.currentFace === 5) return; // Already on bottom
    if (this.currentFace === 4) {
      this.goToFace(0); // Go from top to front
      return;
    }
    this.goToFace(5);
  }

  reset() {
    this.goToFace(0);
  }

  goToFace(index) {
    if (this.isAnimating || index === this.currentFace) return;
    if (index < 0 || index > 5) return;

    this.isAnimating = true;
    const target = FACE_ROTATIONS[index];

    // Smooth shortest path for Y rotation
    let targetY = target.y;
    const currentY = this._targetRotY;
    // Find shortest path
    while (targetY - currentY > Math.PI) targetY -= 2 * Math.PI;
    while (targetY - currentY < -Math.PI) targetY += 2 * Math.PI;

    this._targetRotX = target.x;
    this._targetRotY = targetY;

    const tl = gsap.timeline({
      onComplete: () => {
        this.currentFace = index;
        this.isAnimating = false;
        if (this.onFaceChange) {
          this.onFaceChange(index, FACE_NAMES[index]);
        }
      },
    });

    tl.to([this.cubeGroup.rotation, this.cssGroup.rotation], {
      x: this._targetRotX,
      y: this._targetRotY,
      duration: 0.8,
      ease: 'power2.inOut',
    });
  }

  // ===== Scroll navigation =====
  initScrollNavigation() {
    let scrollCooldown = false;
    window.addEventListener('wheel', (e) => {
      if (scrollCooldown || this.isAnimating) return;
      scrollCooldown = true;
      setTimeout(() => { scrollCooldown = false; }, 1000);

      if (e.deltaY > 0) {
        this._scrollNext();
      } else {
        this._scrollPrev();
      }
    }, { passive: true });
  }

  _scrollNext() {
    const order = [0, 1, 2, 3, 4];
    const idx = order.indexOf(this.currentFace);
    if (idx < order.length - 1) {
      this.goToFace(order[idx + 1]);
    }
  }

  _scrollPrev() {
    const order = [0, 1, 2, 3, 4];
    const idx = order.indexOf(this.currentFace);
    if (idx > 0) {
      this.goToFace(order[idx - 1]);
    }
  }

  // ===== Keyboard navigation =====
  initKeyboardNavigation() {
    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          this.rotateLeft();
          break;
        case 'ArrowRight':
          e.preventDefault();
          this.rotateRight();
          break;
        case 'ArrowUp':
          e.preventDefault();
          this.rotateUp();
          break;
        case 'ArrowDown':
          e.preventDefault();
          this.rotateDown();
          break;
        case 'r':
        case 'R':
          this.reset();
          break;
        case '1':
          this.goToFace(0);
          break;
        case '2':
          this.goToFace(1);
          break;
        case '3':
          this.goToFace(2);
          break;
        case '4':
          this.goToFace(3);
          break;
        case '5':
          this.goToFace(4);
          break;
      }
    });
  }

  // ===== Drag navigation =====
  initDragNavigation(domElement) {
    const sensitivity = 0.005;

    const onPointerDown = (e) => {
      // Don't start drag on buttons or form elements
      if (e.target.closest('button, input, select, textarea, a, .face-content')) return;
      this._isDragging = true;
      this._dragStart = { x: e.clientX, y: e.clientY };
      this._dragRotStart = {
        x: this.cubeGroup.rotation.x,
        y: this.cubeGroup.rotation.y,
      };
      domElement.style.cursor = 'grabbing';
    };

    const onPointerMove = (e) => {
      if (!this._isDragging || this.isAnimating) return;
      const dx = e.clientX - this._dragStart.x;
      const dy = e.clientY - this._dragStart.y;

      this.cubeGroup.rotation.y = this._dragRotStart.y + dx * sensitivity;
      this.cubeGroup.rotation.x = this._dragRotStart.x + dy * sensitivity;
      this.cssGroup.rotation.y = this.cubeGroup.rotation.y;
      this.cssGroup.rotation.x = this.cubeGroup.rotation.x;
    };

    const onPointerUp = () => {
      if (!this._isDragging) return;
      this._isDragging = false;
      domElement.style.cursor = 'crosshair';
      this._snapToNearestFace();
    };

    domElement.addEventListener('pointerdown', onPointerDown);
    domElement.addEventListener('pointermove', onPointerMove);
    domElement.addEventListener('pointerup', onPointerUp);
    domElement.addEventListener('pointerleave', onPointerUp);

    // Touch support
    domElement.addEventListener('touchstart', (e) => {
      if (e.target.closest('button, input, select, textarea, a, .face-content')) return;
      const touch = e.touches[0];
      onPointerDown({ clientX: touch.clientX, clientY: touch.clientY, target: e.target });
    }, { passive: true });

    domElement.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      onPointerMove({ clientX: touch.clientX, clientY: touch.clientY });
    }, { passive: true });

    domElement.addEventListener('touchend', onPointerUp);
  }

  _snapToNearestFace() {
    const rotX = this.cubeGroup.rotation.x;
    const rotY = this.cubeGroup.rotation.y;

    // Find closest face based on rotation
    let closestFace = 0;
    let minDist = Infinity;

    for (const [index, target] of Object.entries(FACE_ROTATIONS)) {
      // Normalize angles for comparison
      let dy = target.y - rotY;
      while (dy > Math.PI) dy -= 2 * Math.PI;
      while (dy < -Math.PI) dy += 2 * Math.PI;

      const dx = target.x - rotX;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < minDist) {
        minDist = dist;
        closestFace = parseInt(index);
      }
    }

    // Force animation to nearest face
    this.isAnimating = false;
    this.currentFace = -1; // Reset to force goToFace
    this.goToFace(closestFace);
  }

  // ===== Button navigation =====
  initButtonNavigation() {
    document.getElementById('nav-up')?.addEventListener('click', () => this.rotateUp());
    document.getElementById('nav-down')?.addEventListener('click', () => this.rotateDown());
    document.getElementById('nav-left')?.addEventListener('click', () => this.rotateLeft());
    document.getElementById('nav-right')?.addEventListener('click', () => this.rotateRight());
    document.getElementById('nav-reset')?.addEventListener('click', () => this.reset());
  }

  // ===== Menu navigation =====
  initMenuNavigation() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
      item.addEventListener('click', () => {
        const faceIndex = parseInt(item.dataset.face);
        this.goToFace(faceIndex);
      });
    });
  }

  getCurrentFaceName() {
    return FACE_NAMES[this.currentFace];
  }
}
