/**
 * Piano Melody Sound Effect Manager
 * Plays a soft piano melody synchronized with lightning effect
 */
export class ThunderSound {
  constructor() {
    this.audioCtx = null;
    this.isEnabled = true;
    this.volume = 0.6;
    this.lastPlayTime = 0;
  }

  async init() {
    try {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.warn('Audio context not available:', e);
    }
  }

  playThunder() {
    if (!this.audioCtx || !this.isEnabled) return;

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    // Play a soft piano-like arpeggio (C major 7)
    // Notes: C4, E4, G4, B4
    const frequencies = [261.63, 329.63, 392.00, 493.88];
    const delays = [0, 0.15, 0.3, 0.45];
    
    // Short delay
    const delaySim = 100 + Math.random() * 300;

    setTimeout(() => {
        const audioNow = this.audioCtx.currentTime;
        frequencies.forEach((freq, i) => {
          this._playTone(freq, audioNow + delays[i], 2.0);
        });
        
        // A lower octave root note for bass
        this._playTone(130.81, audioNow, 3.0);
    }, delaySim);
  }

  _playTone(frequency, startTime, duration) {
    if (!this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();

    // Triangle wave for a soft, flute/piano-like tone
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(frequency, startTime);

    // Envelope for soft attack and decay
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(this.volume * 0.3, startTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  setEnabled(enabled) {
    this.isEnabled = enabled;
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  dispose() {
    if (this.audioCtx) {
      this.audioCtx.close();
    }
  }
}
