/**
 * Face Certificats & Diplômes
 */
export function createCertificatsFace() {
  const div = document.createElement('div');

  const certifications = [
    {
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#00BFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
      title: 'HP LIFE',
      desc: "L'IA pour les professionnels",
      date: '2026',
      link: 'https://www.life-global.org/certificate/fc135c84-e07b-4d24-b742-a7af22d35943',
      badge: 'Certifié',
    },
    {
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#00BFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
      title: 'Africa Digital Academy',
      desc: 'Analyste Cybersécurité Junior',
      date: '2024',
      link: 'https://africadigitalacademy.com',
      badge: 'Certifié',
    },
    {
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#00BFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
      title: 'Coursera',
      desc: 'Programming with JavaScript',
      date: '2026',
      link: 'https://coursera.org/verify/15GZG1VRWIEU',
      badge: 'Certifié',
    },
    {
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#00BFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
      title: 'Linkedin Learning',
      desc: 'Les fondements de la programmation',
      date: '2026',
      link: '/assets/documents/CertificatDaccomplissement_Les fondements de la programmation.pdf',
      badge: 'Certifié',
      download: true
    },
    {
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#00BFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
      title: 'Linkedin Learning',
      desc: 'L\'essentiel de JavaScript',
      date: '2026',
      link: '/assets/documents/CertificatDaccomplissement_Lessentiel de JavaScript.pdf',
      badge: 'Certifié',
      download: true
    }

  ];

  const diplomes = [
    {
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#00BFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
      title: 'Licence en Développement Full-stack',
      date: '08/2025 – (en cours)',
      institution: 'Groupe CERCO - Abidjan, Côte d\'Ivoire',
    },
    {
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#00BFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
      title: 'BTS en Système Électronique et Informatique',
      date: '09/2021 – 06/2023',
      institution: 'Groupe ETIC Yopougon',
    },
    {
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#00BFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
      title: 'Baccalauréat C',
      date: '09/2020 – 05/2021',
      institution: 'Lycée Municipal Simone Ehivet Gbagbo',
    },
  ];

  let html = `
    <div style="padding: 20px; height: 100%; overflow-y: auto;">
      <h2 style="
        font-size: 1.2rem;
        color: #00BFFF;
        text-align: center;
        margin-bottom: 20px;
        font-family: 'Orbitron', sans-serif;
      ">🏅 Certificats & Diplômes</h2>

      <!-- Section Certifications -->
      <h3 style="
        font-size: 1rem;
        color: #F0F0F0;
        margin-bottom: 15px;
        font-family: 'Rajdhani', sans-serif;
      ">📜 Certifications</h3>

      <div style="
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 15px;
        margin-bottom: 30px;
      ">
  `;

  certifications.forEach(cert => {
    html += `
      <div class="cert-card" style="
        background: rgba(0,191,255,0.04);
        border: 1px solid rgba(0,191,255,0.12);
        border-radius: 10px;
        padding: 14px;
      ">
        <div style="font-size: 1.4rem; margin-bottom: 4px; width: 24px; height: 24px;">${cert.svg}</div>
        <div class="cert-title" style="
          font-family: 'Rajdhani', sans-serif;
          font-weight: 600;
          font-size: 0.9rem;
          color: #F0F0F0;
        ">${cert.title}</div>
        <div class="cert-desc" style="
          font-size: 0.78rem;
          color: #8B9AB0;
          margin: 4px 0;
        ">"${cert.desc}"</div>
        <div style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 8px;
        ">
          <span class="cert-badge" style="
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.6rem;
            padding: 2px 10px;
            border-radius: 10px;
            background: rgba(0,191,255,0.1);
            color: #00BFFF;
          ">${cert.badge}</span>
          <div style="
            display: flex;
            align-items: center;
            gap: 8px;
          ">
            <span style="
              font-family: 'JetBrains Mono', monospace;
              font-size: 0.65rem;
              color: #8B9AB0;
            ">${cert.date}</span>
            <a href="${cert.link}" ${cert.download ? 'download' : 'target="_blank"'} style="
              font-size: 0.7rem;
              color: #00BFFF;
              text-decoration: none;
            ">${cert.download ? 'Télécharger ↓' : 'Voir →'}</a>
          </div>
        </div>
      </div>
    `;
  });

  html += `
      </div>

      <!-- Section Diplômes -->
      <h3 style="
        font-size: 1rem;
        color: #F0F0F0;
        margin-bottom: 15px;
        font-family: 'Rajdhani', sans-serif;
      ">🎓 Diplômes</h3>

      <div style="display: flex; flex-direction: column; gap: 12px;">
  `;

  diplomes.forEach(diplome => {
    html += `
      <div style="
        background: rgba(0,191,255,0.04);
        border: 1px solid rgba(0,191,255,0.12);
        border-radius: 10px;
        padding: 12px;
      ">
        <div style="
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 4px;
        ">
          <div style="width: 20px; height: 20px;">${diplome.svg}</div>
          <div style="
            font-family: 'Rajdhani', sans-serif;
            font-weight: 600;
            font-size: 0.9rem;
            color: #F0F0F0;
          ">${diplome.title}</div>
          <div style="
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.7rem;
            color: #00BFFF;
          ">${diplome.date}</div>
        </div>
        <div style="
          font-size: 0.78rem;
          color: #8B9AB0;
        ">${diplome.institution}</div>
      </div>
    `;
  });

  html += `
      </div>
    </div>
  `;

  div.innerHTML = html;
  return div;
}
