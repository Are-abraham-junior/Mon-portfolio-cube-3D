import emailjs from '@emailjs/browser';

/**
 * Face Contact — Formulaire de contact avec validation et intégration EmailJS
 */
export function createContactFace() {
  const div = document.createElement('div');

  div.innerHTML = `
    <h2 style="font-size: 1.1rem; margin-bottom: 10px;">📬 Contact</h2>

    <div class="contact-info" style="font-size: 0.78rem; color: #8B9AB0; margin-bottom: 16px; line-height: 1.6;">
      <span>📧 areabraham225@gmail.com</span><br/>
      <span>📞 Téléphone : +225 0584384654</span><br/>
      <span>💬 WhatsApp : <a href="https://wa.me/2250584384654" target="_blank" style="color: #00BFFF; text-decoration: none;">+225 0584384654</a></span><br/>
      <span>📍 Abidjan, Côte d'Ivoire</span>
    </div>

    <form id="contact-form" class="contact-form" style="display: flex; flex-direction: column; gap: 8px;">
      <!-- Honeypot -->
      <input type="text" name="hp_field" class="hp-field" tabindex="-1" autocomplete="off" style="display: none !important;" />

      <div style="display: flex; gap: 8px; width: 100%;">
        <div class="form-group" style="display: flex; flex-direction: column; gap: 3px; flex: 1;">
          <label style="font-family: 'Rajdhani', sans-serif; font-size: 0.75rem; color: #8B9AB0;">Nom</label>
          <input type="text" name="nom" required minlength="2" placeholder="Votre nom" style="
            background: rgba(0,191,255,0.04); border: 1px solid rgba(0,191,255,0.15);
            border-radius: 8px; padding: 8px 12px; color: #F0F0F0;
            font-family: 'Inter', sans-serif; font-size: 0.78rem; outline: none; width: 100%;
          " />
        </div>
        
        <div class="form-group" style="display: flex; flex-direction: column; gap: 3px; flex: 1;">
          <label style="font-family: 'Rajdhani', sans-serif; font-size: 0.75rem; color: #8B9AB0;">Prénom</label>
          <input type="text" name="prenom" required minlength="2" placeholder="Votre prénom" style="
            background: rgba(0,191,255,0.04); border: 1px solid rgba(0,191,255,0.15);
            border-radius: 8px; padding: 8px 12px; color: #F0F0F0;
            font-family: 'Inter', sans-serif; font-size: 0.78rem; outline: none; width: 100%;
          " />
        </div>
      </div>

      <div class="form-group" style="display: flex; flex-direction: column; gap: 3px;">
        <label style="font-family: 'Rajdhani', sans-serif; font-size: 0.75rem; color: #8B9AB0;">Email</label>
        <input type="email" name="email" required placeholder="votre@email.com" style="
          background: rgba(0,191,255,0.04); border: 1px solid rgba(0,191,255,0.15);
          border-radius: 8px; padding: 8px 12px; color: #F0F0F0;
          font-family: 'Inter', sans-serif; font-size: 0.78rem; outline: none;
        " />
      </div>

      <div class="form-group" style="display: flex; flex-direction: column; gap: 3px;">
        <label style="font-family: 'Rajdhani', sans-serif; font-size: 0.75rem; color: #8B9AB0;">Message</label>
        <textarea name="message" required minlength="10" placeholder="Votre message..." rows="3" style="
          background: rgba(0,191,255,0.04); border: 1px solid rgba(0,191,255,0.15);
          border-radius: 8px; padding: 8px 12px; color: #F0F0F0;
          font-family: 'Inter', sans-serif; font-size: 0.78rem; outline: none;
          resize: vertical; min-height: 80px;
        "></textarea>
      </div>

      <button type="submit" style="
        font-family: 'Orbitron', sans-serif; font-size: 0.8rem; font-weight: 600;
        padding: 10px 20px; border: 1px solid #00BFFF; border-radius: 25px;
        background: transparent; color: #00BFFF; letter-spacing: 0.08em;
        margin-top: 4px; cursor: pointer;
      ">Envoyer ✉️</button>
    </form>
  `;

  // Attachement de l'événement submit
  setTimeout(() => {
    const form = div.querySelector('#contact-form');
    if (form) {
      form.addEventListener('submit', (e) => handleContactSubmit(e, form));
    }
  }, 100);

  return div;
}

export function handleContactSubmit(e, form) {
  e.preventDefault();

  // Vérifier le honeypot (protection anti-spam basique)
  const hp = form.querySelector('[name="hp_field"]');
  if (hp && hp.value) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Envoi en cours... ⏳';
  submitBtn.disabled = true;

  // Remplacez ces clés par celles que EmailJS vous donne (dans EmailJS > Integration)
  const SERVICE_ID = 'service_p3z49kc';
  const TEMPLATE_ID = 'template_kunma9a';
  const PUBLIC_KEY = 'aQXQn95o5ixkHwoy6';

  if (SERVICE_ID === 'VOTRE_SERVICE_ID') {
    // Mode simulation locale
    setTimeout(() => {
      showToast('Message envoyé ! ✉️ (Simulation Locale)');
      form.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1200);
    console.warn("⚠️ Attention: Configurez vos clés EmailJS pour recevoir les vrais e-mails !");
    return;
  }

  // Envoi réel avec EmailJS
  emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, PUBLIC_KEY)
    .then((result) => {
      showToast('Message envoyé avec succès ! ✉️');
      form.reset();
    })
    .catch((error) => {
      showToast("Erreur lors de l'envoi. Réessayez.");
      console.error(error.text);
    })
    .finally(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
}

export function showToast(message) {
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
