/**
 * Audio Manager — Controls welcome message and global audio state
 */
export class AudioManager {
  constructor() {
    this.isMuted = false;
    this.hasPlayedWelcome = false;
    this._toggleBtn = document.getElementById('audio-toggle');
    this._initUI();
  }

  _initUI() {
    if (this._toggleBtn) {
      this._toggleBtn.addEventListener('click', () => {
        this.toggleMute();
      });
    }
  }

  playWelcome() {
    if (this.hasPlayedWelcome || this.isMuted) return;
    this.hasPlayedWelcome = true;

    if ('speechSynthesis' in window) {
      // Cancel any pending speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(
        'Bienvenue sur le portfolio de Monsieur Aré Abraham Junior !'
      );
      utterance.lang = 'fr-FR';
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 1.0;

      // Try to use a French voice
      const voices = window.speechSynthesis.getVoices();
      const frenchVoice = voices.find(v => v.lang.startsWith('fr'));
      if (frenchVoice) {
        utterance.voice = frenchVoice;
      }

      window.speechSynthesis.speak(utterance);
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this._toggleBtn) {
      this._toggleBtn.textContent = this.isMuted ? '🔇' : '🔊';
    }

    // Stop any ongoing speech
    if (this.isMuted && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    return this.isMuted;
  }

  getIsMuted() {
    return this.isMuted;
  }
}
