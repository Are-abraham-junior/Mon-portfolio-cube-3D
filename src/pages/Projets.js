/**
 * Face Projets — Cartes de projets
 */
export function createProjetsFace() {
  const div = document.createElement('div');

  const projects = [
    {
      emoji: '📚',
      title: 'Cours Pro CI',
      desc: 'Plateforme de mise en relation parents / répétiteurs.',
      tech: ['React', 'Supabase', 'TypeScript'],
      link: '#',
    },
    {
      emoji: '🌿',
      title: 'Plant Shop',
      desc: 'Boutique en ligne de plantes avec panier interactif.',
      tech: ['React', 'Vite', 'CSS'],
      link: '#',
    },
    {
      emoji: '🔷',
      title: 'Portfolio Cube 3D',
      desc: 'Ce portfolio interactif avec cube 3D rotatif.',
      tech: ['Three.js', 'GSAP', 'Vite'],
      link: '#',
    },
  ];

  let html = '<h2 style="font-size: 1.1rem; margin-bottom: 14px;">🚀 Projets</h2>';

  projects.forEach(project => {
    const techTags = project.tech.map(t => `
      <span class="tech-tag" style="
        font-family: 'JetBrains Mono', monospace; font-size: 0.6rem;
        padding: 2px 8px; border-radius: 12px;
        background: rgba(0,191,255,0.1); color: #00BFFF;
        border: 1px solid rgba(0,191,255,0.15);
      ">${t}</span>
    `).join('');

    html += `
      <div class="project-card" style="
        background: rgba(0,191,255,0.04); border: 1px solid rgba(0,191,255,0.12);
        border-radius: 10px; padding: 14px; margin-bottom: 10px;
      ">
        <div class="project-title" style="
          font-family: 'Rajdhani', sans-serif; font-weight: 600;
          font-size: 0.92rem; color: #F0F0F0; margin-bottom: 4px;
        ">${project.emoji} ${project.title}</div>
        <div class="project-desc" style="font-size: 0.75rem; color: #8B9AB0; margin-bottom: 8px;">
          ${project.desc}
        </div>
        <div class="project-tech" style="display: flex; gap: 5px; flex-wrap: wrap; margin-bottom: 8px;">
          ${techTags}
        </div>
        <a href="${project.link}" class="project-link" style="
          font-family: 'JetBrains Mono', monospace; font-size: 0.72rem;
          color: #00BFFF; text-decoration: none;
        ">Voir le projet →</a>
      </div>
    `;
  });

  div.innerHTML = html;
  return div;
}
