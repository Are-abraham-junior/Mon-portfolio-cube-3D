import { CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import { createPresentationFace } from '../pages/Presentation.js';
import { createCompetencesFace } from '../pages/Competences.js';
import { createCertificatsFace } from '../pages/Certificats.js';
import { createProjetsFace } from '../pages/Projets.js';
import { createContactFace } from '../pages/Contact.js';
import { createAccueilFace } from '../pages/Accueil.js';

const FACE_SIZE = 500; // px
const HALF = FACE_SIZE / 2;
// Conversion: CSS3D uses px but we need to match Three.js unit scale
// Cube is 3 units = 300px in CSS3D space conceptually
// We'll use a scale factor to match
const SCALE = 3 / FACE_SIZE; // Each face div is 500px, scaled to 3 units

export class CubeFaces {
  constructor(cssGroup) {
    this.cssGroup = cssGroup;
    this.faces = [];
    this.faceData = [
      { name: 'Présentation', create: createPresentationFace },
      { name: 'Compétences', create: createCompetencesFace },
      { name: 'Certificats', create: createCertificatsFace },
      { name: 'Projets', create: createProjetsFace },
      { name: 'Contact', create: createContactFace },
      { name: 'Expérience', create: createAccueilFace },
    ];
  }

  init() {
    const halfSize = FACE_SIZE / 2;

    // Face positions & rotations mapped to cube faces
    const faceConfigs = [
      // Front (Z+) - Présentation (default face)
      { pos: [0, 0, halfSize], rot: [0, 0, 0] },
      // Right (X+) - Compétences
      { pos: [halfSize, 0, 0], rot: [0, Math.PI / 2, 0] },
      // Back (Z-) - Certificats
      { pos: [0, 0, -halfSize], rot: [0, Math.PI, 0] },
      // Left (X-) - Projets
      { pos: [-halfSize, 0, 0], rot: [0, -Math.PI / 2, 0] },
      // Top (Y+) - Contact
      { pos: [0, halfSize, 0], rot: [-Math.PI / 2, 0, 0] },
      // Bottom (Y-) - Logo/AAJ
      { pos: [0, -halfSize, 0], rot: [Math.PI / 2, 0, 0] },
    ];

    faceConfigs.forEach((config, index) => {
      const element = this.faceData[index].create();
      element.classList.add('face-content');
      element.style.width = FACE_SIZE + 'px';
      element.style.height = FACE_SIZE + 'px';
      // Pointer events for the CSS3D content
      element.style.pointerEvents = 'auto';

      const cssObject = new CSS3DObject(element);
      cssObject.position.set(...config.pos);
      cssObject.rotation.set(...config.rot);

      // Scale the CSS3D group to match Three.js cube size
      this.cssGroup.add(cssObject);
      this.faces.push({ element, cssObject, name: this.faceData[index].name });
    });

    // Scale the entire CSS group to match Three.js units
    this.cssGroup.scale.set(SCALE, SCALE, SCALE);
  }

  getFaceNames() {
    return this.faceData.map(f => f.name);
  }
}
