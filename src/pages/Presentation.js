/**
 * Face Présentation — Photo, nom, bio, localisation, liens sociaux
 */
export function createPresentationFace() {
  const div = document.createElement('div');
  div.innerHTML = `
    <div style="text-align: center; padding-top: 8px;">
      <img src="/images/avatar.jpg" alt="Are Abraham Junior" style="
        width: 100px; height: 100px; margin: 0 auto 16px;
        border-radius: 50%; border: 2px solid #00BFFF;
        display: block; object-fit: cover;
        box-shadow: 0 0 20px rgba(0,191,255,0.3);
      " class="profile-photo-wrapper" />

      <h2 class="profile-name" style="font-family: 'Orbitron', sans-serif; font-size: 1.2rem; color: #fff; margin-bottom: 4px;">
        Are Abraham Junior
      </h2>
      <p class="profile-role" style="font-family: 'Rajdhani', sans-serif; color: #00BFFF; font-size: 0.9rem; letter-spacing: 0.1em; margin-bottom: 14px;">
        Développeur WEB Full-Stack
      </p>

      <p class="profile-bio" style="font-style: italic; font-size: 0.8rem; color: #8B9AB0; line-height: 1.5; margin-bottom: 14px; padding: 0 10px;">
        "Passionné par le développement web, je crée des applications performantes, modernes et accessibles. Toujours en quête d'innovation et de nouveaux défis."
      </p>

      <div class="profile-info" style="font-size: 0.78rem; color: #8B9AB0; margin-bottom: 14px;">
        <span>📍 Abidjan, Côte d'Ivoire</span><br/>
        <span>📅 21/12/2002 — Ivoirien</span><br/>
        <span>📧 areabraham225@gmail.com</span>
      </div>

      <div class="social-links" style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
        <a href="https://www.linkedin.com/in/abraham-are-junior/" target="_blank" rel="noopener" class="social-link" 
           style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; padding: 6px 14px;
                  border: 1px solid rgba(0,191,255,0.3); border-radius: 20px; color: #00BFFF; text-decoration: none;">
          LinkedIn
        </a>
        <a href="https://github.com/juniorare-KING" target="_blank" rel="noopener" class="social-link"
           style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; padding: 6px 14px;
                  border: 1px solid rgba(0,191,255,0.3); border-radius: 20px; color: #00BFFF; text-decoration: none;">
          GitHub 1
        </a>
        <a href="https://github.com/Are-abraham-junior" target="_blank" rel="noopener" class="social-link"
           style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; padding: 6px 14px;
                  border: 1px solid rgba(0,191,255,0.3); border-radius: 20px; color: #00BFFF; text-decoration: none;">
          GitHub 2
        </a>
      </div>

      <div style="text-align: center; margin-top: 12px;">
        <a href="/documents/CV_Are_Abraham_Junior.pdf" download="CV_Are_Abraham_Junior_Dev_Full_Stack.pdf" class="social-link"
           style="font-family: 'Orbitron', sans-serif; font-size: 0.72rem; font-weight: 600;
                  padding: 8px 20px; border: 1px solid #00BFFF; border-radius: 25px;
                  color: #00BFFF; text-decoration: none; display: inline-block;
                  letter-spacing: 0.05em;">
          📄 Télécharger mon CV
        </a>
      </div>
    </div>
  `;
  return div;
}
