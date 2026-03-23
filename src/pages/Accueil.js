/**
 * Face Expérience Professionnelle
 */
export function createAccueilFace() {
  const div = document.createElement('div');

  div.innerHTML = `
    <div class="experience-container" style="
      display: flex;
      flex-direction: column;
      padding: 20px;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #020209, #0a0a2e, #001a33);
      border-radius: 12px;
      overflow-y: auto;
    ">
      <h2 style="
        font-family: 'Orbitron', sans-serif;
        color: #00BFFF;
        margin-bottom: 20px;
        text-align: center;
      ">Expérience Professionnelle</h2>

      <div class="experience-item" style="
        background: rgba(255, 255, 255, 0.05);
        border-radius: 8px;
        padding: 15px;
        margin-bottom: 15px;
      ">
        <h3 style="color: #00FFFF; margin-bottom: 5px;">Développeur Web</h3>
        <p style="color: #00BFFF; font-weight: 500; margin-bottom: 5px;">chez OPEN</p>
        <p style="color: #8B9AB0; font-size: 0.85rem; margin-bottom: 10px;">06/2025 – aujourd'hui | Abidjan, Côte d'ivoire</p>
        <ul style="color: #8B9AB0; padding-left: 20px; font-size: 0.9rem; line-height: 1.5;">
          <li>Développement d'applications web avec HTML, CSS, JavaScript et React.js</li>
          <li>Optimisation des performances (-25% de temps de chargement)</li>
          <li>Collaboration avec designers et équipes marketing</li>
          <li>Gestion de bases de données et intégration d'APIs</li>
        </ul>
      </div>

      <div class="experience-item" style="
        background: rgba(255, 255, 255, 0.05);
        border-radius: 8px;
        padding: 15px;
        margin-bottom: 15px;
      ">
        <h3 style="color: #00FFFF; margin-bottom: 5px;">Agent Technicien Instrumentation</h3>
        <p style="color: #00BFFF; font-weight: 500; margin-bottom: 5px;">Société Ivoirienne de Raffinage (SIR)</p>
        <p style="color: #8B9AB0; font-size: 0.85rem; margin-bottom: 10px;">09/2024 – 12/2024 | Abidjan, Côte d'ivoire</p>
        <ul style="color: #8B9AB0; padding-left: 20px; font-size: 0.9rem; line-height: 1.5;">
          <li>Maintenance préventive et curative des vannes automatiques</li>
          <li>Diagnostic et dépannage sur site ou en atelier</li>
          <li>Collaboration en équipe dans les unités de production</li>
        </ul>
      </div>

      <div class="experience-item" style="
        background: rgba(255, 255, 255, 0.05);
        border-radius: 8px;
        padding: 15px;
        margin-bottom: 15px;
      ">
        <h3 style="color: #00FFFF; margin-bottom: 5px;">Agent Commercial</h3>
        <p style="color: #00BFFF; font-weight: 500; margin-bottom: 5px;">MTN CI</p>
        <p style="color: #8B9AB0; font-size: 0.85rem; margin-bottom: 10px;">06/2022 – 09/2022</p>
        <ul style="color: #8B9AB0; padding-left: 20px; font-size: 0.9rem; line-height: 1.5;">
          <li>Prospection active et vente de kits MTN auprès d'une clientèle variée</li>
          <li>Recueil et analyse des avis clients pour améliorer la satisfaction globale</li>
        </ul>
      </div>
    </div>
  `;

  return div;
}
