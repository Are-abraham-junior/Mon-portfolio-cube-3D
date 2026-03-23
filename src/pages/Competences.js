/**
 * Face Compétences — Barres de progression par catégorie
 */
export function createCompetencesFace() {
  const div = document.createElement('div');

  const skills = [
    {
      category: 'FRONT-END',
      items: [
        { name: 'React.js', level: 80 },
        { name: 'Tailwind CSS', level: 80 },
        { name: 'JavaScript ES6+', level: 75 },
        { name: 'HTML / CSS', level: 90 },
        { name: 'Bootstrap', level: 85 },
        { name: 'Shadcn UI', level: 70 },
      ],
    },
    {
      category: 'BACK-END',
      items: [
        { name: 'Node.js', level: 70 },
        { name: 'GraphQL', level: 60 },
        { name: 'API REST', level: 75 },
      ],
    },
    {
      category: 'BASES DE DONNÉES',
      items: [
        { name: 'MySQL', level: 65 },
        { name: 'MongoDB', level: 55 },
        { name: 'Supabase', level: 75 },
      ],
    },
    {
      category: 'IA & OUTILS',
      items: [
        { name: 'Claude API', level: 70 },
        { name: 'GitHub Copilot', level: 80 },
        { name: 'Antigravity', level: 85 },
      ],
    },
    {
      category: 'DESIGN UI/UX',
      items: [
        { name: 'Figma', level: 75 },
        { name: 'Stitch', level: 70 },
        { name: 'Canva', level: 80 },
      ],
    },
    {
      category: 'AUTOMATISATION',
      items: [
        { name: 'N8n', level: 60 },
        { name: 'Make', level: 65 },
      ],
    },
  ];

  let html = '<h2 style="font-size: 1.1rem; margin-bottom: 12px;">💡 Compétences</h2>';

  skills.forEach(cat => {
    html += `
      <div class="skill-category" style="margin-bottom: 12px;">
        <div class="skill-category-title" style="
          font-family: 'JetBrains Mono', monospace; font-size: 0.65rem;
          color: #00BFFF; letter-spacing: 0.2em; text-transform: uppercase;
          margin-bottom: 6px;
        ">${cat.category}</div>
    `;
    cat.items.forEach(skill => {
      html += `
        <div class="skill-bar" style="display: flex; align-items: center; gap: 8px; margin-bottom: 5px;">
          <span class="skill-bar-name" style="
            font-size: 0.75rem; min-width: 95px; font-family: 'Rajdhani', sans-serif;
            font-weight: 500; color: #F0F0F0;
          ">${skill.name}</span>
          <div class="skill-bar-track" style="
            flex: 1; height: 5px; background: rgba(255,255,255,0.06);
            border-radius: 3px; overflow: hidden;
          ">
            <div class="skill-bar-fill" style="
              width: ${skill.level}%; height: 100%;
              background: linear-gradient(90deg, #00BFFF, #00FFFF);
              border-radius: 3px; box-shadow: 0 0 6px rgba(0,191,255,0.3);
            "></div>
          </div>
          <span style="font-size: 0.6rem; color: #8B9AB0; font-family: 'JetBrains Mono', monospace;">${skill.level}%</span>
        </div>
      `;
    });
    html += '</div>';
  });

  div.innerHTML = html;
  return div;
}
