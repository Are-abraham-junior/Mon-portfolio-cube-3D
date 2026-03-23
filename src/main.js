import { CubeEngine } from './cube/CubeEngine.js';
import { CubeFaces } from './cube/CubeFaces.js';
import { CubeRotation } from './cube/CubeRotation.js';
import { LightningEffect } from './effects/LightningEffect.js';
import { ThunderSound } from './effects/ThunderSound.js';
import { AudioManager } from './audio/AudioManager.js';
import { handleContactSubmit } from './pages/Contact.js';

// ===== State =====
let engine, faces, rotation, lightning, thunder, audio;
let animationId;

// ===== SPLASH SCREEN SEQUENCE =====
function runSplashSequence() {
  const splashScreen = document.getElementById('splash-screen');
  const splashFlash = document.getElementById('splash-flash-overlay');
  const title = document.getElementById('splash-title');
  const subtitle = document.getElementById('splash-subtitle');
  const enterBtn = document.getElementById('splash-enter-btn');

  // t=0.5s — Flash effects
  setTimeout(() => {
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        splashFlash.classList.add('flash');
        setTimeout(() => splashFlash.classList.remove('flash'), 60);
      }, i * 150);
    }
  }, 500);

  // t=1.0s — Title appears with typewriter effect
  setTimeout(() => {
    title.classList.remove('hidden');
    title.classList.add('visible', 'typewriter');
  }, 1000);

  // t=2.0s — Subtitle appears
  setTimeout(() => {
    subtitle.classList.remove('hidden');
    subtitle.classList.add('visible');
  }, 2000);

  // t=3.0s — Enter button appears
  setTimeout(() => {
    enterBtn.classList.remove('hidden');
    enterBtn.classList.add('visible');
  }, 3000);

  // Click handler for Enter button
  enterBtn.addEventListener('click', () => {
    // Start audio context (requires user interaction)
    startApp();
    
    // Fade out splash
    splashScreen.classList.add('fade-out');
    setTimeout(() => {
      splashScreen.style.display = 'none';
    }, 800);
  });
}

// ===== APP INITIALIZATION =====
function startApp() {
  const app = document.getElementById('app');
  app.classList.remove('hidden');
  app.classList.add('visible');

  // Initialize engine
  engine = new CubeEngine();
  engine.init();

  // Initialize faces
  faces = new CubeFaces(engine.cssGroup);
  faces.init();

  // Initialize rotation
  rotation = new CubeRotation(engine.cubeGroup, engine.cssGroup);
  rotation.initButtonNavigation();
  rotation.initKeyboardNavigation();
  rotation.initScrollNavigation();
  rotation.initDragNavigation(document.body);
  rotation.initMenuNavigation();

  // Face change callback — update UI
  rotation.onFaceChange = (index, name) => {
    updateFaceIndicator(name);
    updateMenuActive(index);
  };

  // Initialize effects
  thunder = new ThunderSound();
  thunder.init();

  lightning = new LightningEffect(engine.scene, engine);
  // Hook thunder to lightning
  const originalCreate = lightning.createBolt.bind(lightning);
  lightning.createBolt = function () {
    const result = originalCreate();
    if (audio && !audio.getIsMuted()) {
      thunder.playThunder();
    }
    return result;
  };
  lightning.start();

  // Initialize audio
  audio = new AudioManager();
  
  // Play welcome message
  // Load voices first (they may load async)
  if ('speechSynthesis' in window) {
    // Voices may not be ready yet
    window.speechSynthesis.onvoiceschanged = () => {
      // Voices loaded
    };
    window.speechSynthesis.getVoices(); // Trigger load
  }
  setTimeout(() => {
    audio.playWelcome();
  }, 500);

  // Wire audio toggle to thunder
  const audioToggle = document.getElementById('audio-toggle');
  if (audioToggle) {
    const originalToggle = audio.toggleMute.bind(audio);
    audio.toggleMute = function () {
      const muted = originalToggle();
      thunder.setEnabled(!muted);
      return muted;
    };
  }

  // Initialize side menu toggle
  initSideMenu();

  // Initialize expanded panel (click face → full page)
  initExpandedPanel();

  // Start render loop
  animate();
}

// ===== RENDER LOOP =====
function animate() {
  animationId = requestAnimationFrame(animate);
  engine.render();
}

// ===== EXPANDED PANEL =====
let isExpanded = false;

function initExpandedPanel() {
  const panel = document.getElementById('expanded-panel');
  const closeBtn = document.getElementById('expanded-close');
  const expandedContent = document.getElementById('expanded-content');

  // Close button
  closeBtn.addEventListener('click', closeExpanded);

  // Escape key to close
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isExpanded) {
      closeExpanded();
    }
  });

  // Click on backdrop to close
  panel.addEventListener('click', (e) => {
    if (e.target === panel) {
      closeExpanded();
    }
  });

  // Add click listeners on each cube face content
  // We wait a moment for faces to be initialized
  setTimeout(() => {
    const faceElements = document.querySelectorAll('.face-content');
    faceElements.forEach((faceEl, index) => {
      // All faces can be expanded

      faceEl.style.cursor = 'pointer';

      faceEl.addEventListener('click', (e) => {
        // Don't expand if user is interacting with form elements or links
        if (e.target.closest('input, select, textarea, button, a')) return;

        openExpanded(faceEl, index);
      });
    });
  }, 500);
}

function openExpanded(faceEl, faceIndex) {
  if (isExpanded) return;
  isExpanded = true;

  const panel = document.getElementById('expanded-panel');
  const expandedContent = document.getElementById('expanded-content');

  // Clone the face content into the expanded panel
  expandedContent.innerHTML = faceEl.innerHTML;

  // Re-attach contact form handler if this is the contact face
  if (faceIndex === 4) {
    const form = expandedContent.querySelector('#contact-form');
    if (form) {
      // Remove old id to avoid duplicate, give new one
      form.id = 'contact-form-expanded';
      form.addEventListener('submit', (e) => handleContactSubmit(e, form));
    }
  }

  // Open panel with animation
  panel.classList.add('open');

  // Hide cube navigation while expanded
  document.querySelectorAll('.nav-arrow, .nav-reset-btn, .face-indicator').forEach(el => {
    el.style.opacity = '0';
    el.style.pointerEvents = 'none';
  });
}

function closeExpanded() {
  if (!isExpanded) return;
  isExpanded = false;

  const panel = document.getElementById('expanded-panel');
  panel.classList.remove('open');

  // Restore cube navigation
  document.querySelectorAll('.nav-arrow, .nav-reset-btn, .face-indicator').forEach(el => {
    el.style.opacity = '';
    el.style.pointerEvents = '';
  });

  // Clear content after animation
  setTimeout(() => {
    document.getElementById('expanded-content').innerHTML = '';
  }, 400);
}

function showToastGlobal(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

// ===== UI HELPERS =====
function updateFaceIndicator(name) {
  const indicator = document.getElementById('face-name');
  if (indicator) {
    indicator.textContent = name;
  }
}

function updateMenuActive(index) {
  const items = document.querySelectorAll('.menu-item');
  items.forEach((item, i) => {
    item.classList.toggle('active', parseInt(item.dataset.face) === index);
  });
}

function initSideMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('side-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      menu.classList.toggle('open');
    });

    // Handle menu item clicks
    menu.querySelectorAll('.menu-item').forEach(item => {
      item.addEventListener('click', () => {
        toggle.classList.remove('open');
        menu.classList.remove('open');
        
        // Get face index and element
        const faceIndex = parseInt(item.dataset.face);
        const faceElement = document.querySelectorAll('.face-content')[faceIndex];
        
        // If it's the contact face or any other face, open expanded view
        if (faceElement) {
          // First rotate to the face
          rotation.goToFace(faceIndex);
          
          // Then open the expanded view after rotation
          setTimeout(() => {
            openExpanded(faceElement, faceIndex);
          }, 800); // Same duration as cube rotation
        }
      });
    });
  }
}

// ===== START =====
document.addEventListener('DOMContentLoaded', () => {
  runSplashSequence();
});
