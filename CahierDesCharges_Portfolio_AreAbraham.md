# 📋 CAHIER DES CHARGES — Portfolio Cube Interactif
## Are Abraham Junior — Développeur WEB Full-Stack

---

## 1. PRÉSENTATION DU PROJET

| Élément | Détail |
|---|---|
| **Nom du projet** | Portfolio Cube 3D — Are Abraham Junior |
| **Type** | Application web interactive monopage (SPA) |
| **Technologie principale** | Three.js + Antigravity |
| **Propriétaire** | Are Abraham Junior |
| **Contact** | areabraham225@gmail.com |
| **Version cible** | v1.0.0 |

### Objectif
Créer un portfolio web immersif et mémorable où la navigation se fait via un cube 3D rotatif. Chaque face du cube représente une section du portfolio. L'expérience est renforcée par des effets visuels (éclairs/tonnerre) et un accueil sonore personnalisé.

---

## 2. ARCHITECTURE GÉNÉRALE

### 2.1 Structure de l'application
```
portfolio-cube/
├── index.html
├── assets/
│   ├── audio/
│   │   ├── welcome.mp3          ← "Bienvenue sur le portfolio de Mr. Are Abraham Junior !"
│   │   ├── thunder.mp3          ← Effet tonnerre
│   │   └── ambient.mp3          ← Son d'ambiance (optionnel)
│   ├── fonts/
│   ├── images/
│   │   └── avatar.jpg
│   └── icons/
├── src/
│   ├── main.js                  ← Point d'entrée
│   ├── cube/
│   │   ├── CubeEngine.js        ← Moteur Three.js principal
│   │   ├── CubeFaces.js         ← Contenu des 6 faces
│   │   └── CubeRotation.js      ← Logique de rotation
│   ├── effects/
│   │   ├── LightningEffect.js   ← Éclairs Three.js
│   │   ├── ThunderSound.js      ← Synchronisation son/visuel
│   │   └── ParticleSystem.js    ← Particules optionnelles
│   ├── pages/
│   │   ├── Presentation.js
│   │   ├── Competences.js
│   │   ├── Certificats.js
│   │   ├── Projets.js
│   │   ├── Contact.js
│   │   └── Accueil.js           ← Face centrale (logo + nom)
│   ├── audio/
│   │   └── AudioManager.js      ← Gestionnaire audio global
│   └── utils/
│       ├── Responsive.js
│       └── Antigravity.js       ← Intégration Antigravity
├── styles/
│   └── main.css
└── package.json
```

---

## 3. FONCTIONNALITÉS DÉTAILLÉES

### 3.1 — Cube 3D Central (Three.js)

#### Description
Un cube 3D flottant, centré sur la page, constituant la pièce maîtresse du portfolio. Il est rendu via Three.js avec WebGL.

#### Spécifications techniques
- **Dimensions du cube** : 3×3×3 unités Three.js (adaptable responsive)
- **Position** : Centré dans la scène (x:0, y:0, z:0)
- **Rotation initiale** : Face "Présentation" face à l'utilisateur
- **Ombre portée** : Activée (castShadow / receiveShadow)
- **Anti-aliasing** : Activé
- **Caméra** : PerspectiveCamera (FOV 60°, ratio dynamique)
- **Renderer** : WebGLRenderer avec transparence (alpha: true)

#### Faces du cube (6 faces = 5 sections + 1 logo)

| Face | Axe de rotation | Contenu |
|---|---|---|
| **Avant (Z+)** | Face par défaut | 🙋 Présentation |
| **Droite (X+)** | Rotation Y -90° | 💡 Compétences |
| **Derrière (Z-)** | Rotation Y 180° | 🏅 Certificats |
| **Gauche (X-)** | Rotation Y +90° | 🚀 Projets |
| **Dessus (Y+)** | Rotation X +90° | 📬 Contact |
| **Dessous (Y-)** | Rotation X -90° | 🔷 Logo / Initiales "AAJ" |

#### Matériaux
- Chaque face utilise un `CSS3DRenderer` superposé au `WebGLRenderer`
- Fond de chaque face : glassmorphism sombre (`rgba(10, 10, 30, 0.85)`)
- Bordure lumineuse : effet neon bleu électrique `#00BFFF`
- Contenu HTML injecté via `CSS3DObject` pour interactivité complète

---

### 3.2 — Navigation par Rotation

#### Mécanismes de navigation
Le cube se fait pivoter selon 3 méthodes complémentaires :

**A) Navigation via boutons UI**
- 4 boutons flèches (↑ ↓ ← →) autour du cube
- Bouton "↺ Reset" pour revenir à la face Présentation
- Menu latéral rétractable avec les 5 noms de sections

**B) Navigation via clavier**
| Touche | Action |
|---|---|
| `←` `→` | Rotation horizontale (Gauche/Droite) |
| `↑` `↓` | Rotation verticale (Haut/Bas) |
| `R` | Reset position initiale |
| `1` à `5` | Aller directement à une face |

**C) Navigation via Drag (glisser)**
- Clic maintenu + déplacement souris → rotation libre du cube
- Touch support mobile (toucher + glisser)
- Inertie douce après relâchement (GSAP ou Tween.js)

**D) Scroll**
- Scroll vers le bas → rotation vers la prochaine section
- Scroll vers le haut → rotation vers la section précédente

#### Animation de rotation
- **Durée** : 800ms par rotation de 90°
- **Easing** : `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (smooth deceleration)
- **Librairie** : GSAP (GreenSock) ou Three.js Tween interne
- **Blocage** : Aucune nouvelle rotation possible pendant l'animation en cours
- **Effet sonore** : Un léger "whoosh" à chaque rotation (optionnel)

---

### 3.3 — Effets Éclairs & Tonnerre ⚡

#### Description
Des éclairs électriques surgissent aléatoirement dans la scène Three.js, créant une atmosphère dramatique et mémorable. Ils sont synchronisés avec des effets sonores de tonnerre.

#### Spécifications techniques

**Génération des éclairs**
- Algorithme : Fractale récursive (Midpoint Displacement Algorithm)
- Classe : `THREE.Line` avec `BufferGeometry`
- Couleur principale : `#FFFFFF` avec halo `#00BFFF` (bleu électrique)
- Épaisseur : 1-3px selon le segment
- Nombre de branches : 3 à 7 branches secondaires par éclair principal
- Durée de vie : 80 à 200ms par flash

**Positionnement**
- Zone d'apparition : Toute la scène (hors zone centrale du cube)
- Profondeur Z : -5 à -50 (derrière le cube)
- Hauteur Y : +8 à +20 (partant du haut de la scène)

**Fréquence**
| Phase | Intervalle |
|---|---|
| Intro (0-5s) | Toutes les 0.5s (dramatique) |
| Navigation normale | Toutes les 3-8s (aléatoire) |
| Au survol d'un projet | Toutes les 1s |

**Effet de lumière**
- `THREE.PointLight` blanc intense (intensity: 5, distance: 30)
- S'allume pendant 80ms au moment du flash
- Fait rebondir la lumière sur toutes les faces du cube

**Effet de flash d'écran**
- `<div>` overlay blanc avec opacité 0.15, flash de 60ms
- Transition CSS : `opacity 0.06s ease-out`

#### Synchronisation sonore
- Délai entre éclair visuel et tonnerre : 200ms à 1200ms (aléatoire, simulant la distance)
- Volume du tonnerre : décroissant si éclairs fréquents (naturalisme)
- Format audio : MP3 + OGG (compatibilité cross-browser)

---

### 3.4 — Son de Bienvenue 🔊

#### Message audio
> **"Bienvenue sur le portfolio de Mr. Are Abraham Junior !"**

#### Implémentation

**Option A — Text-to-Speech (recommandé)**
Utilisation de l'API Web Speech (`SpeechSynthesis`) :
```javascript
const utterance = new SpeechSynthesisUtterance(
  "Bienvenue sur le portfolio de Monsieur Are Abraham Junior !"
);
utterance.lang = 'fr-FR';
utterance.rate = 0.9;
utterance.pitch = 1.1;
utterance.volume = 1.0;
```

**Option B — Fichier audio enregistré**
- Fichier `welcome.mp3` enregistré avec la voix réelle ou synthétisée
- Déclenché au premier chargement de la page
- Bibliothèque : Howler.js pour gestion avancée

#### Déclenchement
- **Trigger** : Clic sur un bouton "▶ Entrer" de l'écran d'accueil
  *(Les navigateurs modernes bloquent l'autoplay audio sans interaction utilisateur)*
- **Fallback** : Si audio bloqué, affichage d'une notification toast

#### Contrôles audio
- Bouton 🔊 / 🔇 dans le coin supérieur droit
- Barre de volume (slider HTML5)
- Possibilité de rejouer le message de bienvenue

---

### 3.5 — Intégration Antigravity

#### Rôle dans le projet
Antigravity est utilisé comme outil d'assistance au développement et à l'optimisation (IA coding assistant). Son intégration couvre :

**Phase de développement**
- Génération des composants Three.js complexes (éclairs, particules)
- Debugging des matrices de rotation du cube
- Optimisation des performances WebGL
- Génération du contenu des faces (textes, mise en page)

**Fonctionnalités dérivées**
- Section "À propos de mes outils" dans la face Compétences mentionnant Antigravity
- Badge "Built with Antigravity" dans le footer

---

### 3.6 — Contenu des Faces

#### Face 1 — Présentation 🙋
```
┌─────────────────────────────┐
│  [Photo de profil ronde]    │
│                             │
│  Are Abraham Junior         │
│  Développeur WEB Full-Stack │
│                             │
│  "Passionné par le dev web, │
│  je crée des applications   │
│  performantes..."           │
│                             │
│  📍 Abidjan, Côte d'Ivoire  │
│  📅 21/12/2002 — Ivoirien   │
│                             │
│  [LinkedIn] [GitHub]        │
└─────────────────────────────┘
```

#### Face 2 — Compétences 💡
```
┌─────────────────────────────┐
│  FRONT-END                  │
│  ████████░░ React.js        │
│  ████████░░ Tailwind CSS    │
│  ███████░░░ JavaScript ES6+ │
│                             │
│  BACK-END                   │
│  ███████░░░ Node.js         │
│  ██████░░░░ GraphQL         │
│                             │
│  BASES DE DONNÉES           │
│  MySQL  MongoDB  Supabase   │
│                             │
│  IA & OUTILS                │
│  Claude API  GitHub Copilot │
└─────────────────────────────┘
```

#### Face 3 — Certificats 🏅
```
┌─────────────────────────────┐
│  🏆 HP LIFE                 │
│     "L'IA pour les pros"    │
│                             │
│  🛡️ AFRICA DIGITAL ACADEMI  │
│     "Analyste Cybersécurité │
│      Junior"                │
│                             │
│  📜 Coursera (en cours)     │
│     "Développeur Full-Stack"│
│                             │
│  [Voir les badges]          │
└─────────────────────────────┘
```

#### Face 4 — Projets 🚀
```
┌─────────────────────────────┐
│  📚 Cours Pro CI            │
│  Plateforme parents/répét.  │
│  React · Supabase · TS      │
│  [Voir le projet →]         │
│                             │
│  🌿 Plant Shop              │
│  Boutique de plantes        │
│  React · Vite · CSS         │
│  [Voir le projet →]         │
│                             │
│  + Projet en cours...       │
└─────────────────────────────┘
```

#### Face 5 — Contact 📬
```
┌─────────────────────────────┐
│  Travaillons ensemble !     │
│                             │
│  📧 areabraham225@gmail.com │
│  📱 +225 0584384654         │
│                             │
│  ┌─────────────────────┐   │
│  │  Votre message...   │   │
│  └─────────────────────┘   │
│  [Envoyer ✉️]               │
│                             │
│  [LinkedIn] [GitHub]        │
└─────────────────────────────┘
```

#### Face 6 — Logo/Fond (Dessous)
- Initiales "AAJ" en 3D typographique
- Fond dégradé bleu électrique
- Visible uniquement lors d'une rotation complète

---

## 4. DESIGN SYSTEM

### 4.1 Palette de couleurs

| Rôle | Couleur | HEX |
|---|---|---|
| Fond principal | Noir profond | `#020209` |
| Fond des faces | Bleu nuit glassmorphism | `rgba(8, 8, 32, 0.88)` |
| Accent principal | Bleu électrique | `#00BFFF` |
| Accent secondaire | Blanc neige | `#E8F4FF` |
| Éclairs | Blanc pur + halo cyan | `#FFFFFF` / `#00FFFF` |
| Texte principal | Blanc | `#F0F0F0` |
| Texte secondaire | Gris clair | `#8B9AB0` |
| Bordures | Bleu transparent | `rgba(0, 191, 255, 0.3)` |

### 4.2 Typographie

| Usage | Police | Poids |
|---|---|---|
| Titre principal | Orbitron (Google Fonts) | 700 |
| Sous-titres | Rajdhani | 600 |
| Corps de texte | Inter / Nunito | 400 |
| Code / Badges | JetBrains Mono | 500 |

### 4.3 Effets visuels

- **Fond de scène** : Starfield (particules stellaires Three.js) — 2000 points
- **Lueur du cube** : Bloom effect via Three.js PostProcessing (UnrealBloomPass)
- **Glassmorphism** : `backdrop-filter: blur(12px)` sur les faces HTML
- **Cursor** : Curseur personnalisé en forme de croix électrique
- **Scroll bar** : Stylisée ou masquée

---

## 5. PERFORMANCE & TECHNIQUE

### 5.1 Optimisations WebGL
- `requestAnimationFrame` pour la boucle de rendu
- Frustum culling activé
- Géométries réutilisées avec `InstancedMesh` pour les particules
- `dispose()` appelé sur les éclairs après utilisation
- Limitation : 60 FPS cible, avec détection de performance et dégradation gracieuse

### 5.2 Responsive Design

| Breakpoint | Comportement |
|---|---|
| Desktop (>1024px) | Cube grand, navigation clavier + souris |
| Tablet (768-1024px) | Cube moyen, navigation touch + boutons |
| Mobile (<768px) | Cube compact, navigation swipe, menu hamburger |

### 5.3 Compatibilité

| Navigateur | Support |
|---|---|
| Chrome 90+ | ✅ Complet |
| Firefox 88+ | ✅ Complet |
| Safari 14+ | ⚠️ Partiel (WebGL limité) |
| Edge 90+ | ✅ Complet |
| Mobile Chrome | ✅ Complet |
| Mobile Safari | ⚠️ Partiel |

### 5.4 Accessibilité
- Attributs `aria-label` sur tous les boutons
- Navigation clavier complète
- Contenu textuel accessible sans WebGL (fallback HTML pur)
- `prefers-reduced-motion` : désactive les animations si activé

---

## 6. ÉCRAN D'INTRODUCTION (Splash Screen)

### Séquence de lancement (0 → 5s)
```
t=0.0s  → Fond noir total
t=0.5s  → Éclairs intenses (5-6 flashs rapides)
t=1.0s  → Apparition progressive du titre "ARE ABRAHAM JUNIOR"
           (effet machine à écrire ou glitch)
t=1.5s  → Tonnerre (son)
t=2.0s  → Sous-titre "Développeur WEB Full-Stack" apparaît
t=2.5s  → Le cube commence à se matérialiser (scale 0 → 1, GSAP)
t=3.5s  → Message de bienvenue audio : "Bienvenue sur le portfolio..."
t=4.5s  → Bouton "▶ Explorer" apparaît
t=5.0s  → L'utilisateur clique → transition vers le cube principal
```

---

## 7. FORMULAIRE DE CONTACT (Face Contact)

### Champs
| Champ | Type | Validation |
|---|---|---|
| Nom complet | text | Requis, min 2 chars |
| Email | email | Format valide |
| Objet | select | Liste prédéfinie |
| Message | textarea | Requis, min 20 chars |

### Envoi
- **Service** : EmailJS (sans backend) ou Formspree
- **Feedback** : Toast notification + animation de succès sur la face
- **Anti-spam** : Honeypot champ caché + rate limiting

---

## 8. STACK TECHNOLOGIQUE COMPLÈTE

| Couche | Technologie | Rôle |
|---|---|---|
| **Rendu 3D** | Three.js r160+ | Cube, éclairs, scène 3D |
| **HTML dans 3D** | CSS3DRenderer | Contenu interactif des faces |
| **Animations** | GSAP 3 | Rotations, transitions |
| **Post-processing** | Three.js PPE | Bloom, glitch effects |
| **Audio** | Howler.js | Gestion son multiformat |
| **Formulaire** | EmailJS | Contact sans backend |
| **Fonts** | Google Fonts | Orbitron, Rajdhani, Inter |
| **Dev assistant** | Antigravity | Génération & optimisation du code |
| **Build** | Vite 5 | Dev server + bundling |
| **Déploiement** | Vercel ou Netlify | Hosting gratuit |
| **Versioning** | Git / GitHub | Source control |

---

## 9. LIVRABLES

| Livrable | Format | Description |
|---|---|---|
| Code source | GitHub repo | Code complet versionné |
| Site en ligne | URL Vercel/Netlify | Portfolio déployé |
| Fichiers audio | MP3/OGG | Welcome + effets sonores |
| Assets design | Figma | Maquettes des 5 faces |
| Documentation | README.md | Instructions d'installation |

---

## 10. PLANNING DE DÉVELOPPEMENT

| Phase | Tâches | Durée estimée |
|---|---|---|
| **Phase 1 — Setup** | Vite + Three.js + structure projet | 1 jour |
| **Phase 2 — Cube** | Géométrie, matériaux, CSS3DRenderer | 2-3 jours |
| **Phase 3 — Navigation** | Rotation, keyboard, drag, scroll | 2 jours |
| **Phase 4 — Éclairs** | Algorithme fractal, lumières, sync son | 2 jours |
| **Phase 5 — Contenu** | 5 faces avec vraies données | 2-3 jours |
| **Phase 6 — Intro** | Splash screen, audio de bienvenue | 1 jour |
| **Phase 7 — Polish** | Bloom, responsive, accessibilité | 2 jours |
| **Phase 8 — Déploiement** | Vercel, DNS, tests cross-browser | 1 jour |
| **TOTAL** | | **~14 jours** |

---

## 11. CRITÈRES DE SUCCÈS

- [ ] Cube 3D fluide à 60 FPS sur ordinateur
- [ ] Navigation fonctionnelle via 4 méthodes (boutons, clavier, drag, scroll)
- [ ] Éclairs générés aléatoirement et synchronisés avec le tonnerre
- [ ] Message audio de bienvenue déclenché au premier clic
- [ ] 5 sections avec contenu complet et à jour
- [ ] Formulaire de contact fonctionnel (envoi réel d'email)
- [ ] Responsive sur mobile, tablette et desktop
- [ ] Déploiement en ligne avec URL accessible
- [ ] Score Lighthouse Performance > 85

---

*Document rédigé pour : Are Abraham Junior — Développeur WEB Full-Stack*
*Contact : areabraham225@gmail.com | Abidjan, Côte d'Ivoire*
