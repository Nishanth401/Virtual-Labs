// Web Audio API Synthesizer for DSA Visualizer Sound FX
class SoundFxEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public playTone(freq: number, durationMs = 80, type: OscillatorType = "sine") {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + durationMs / 1000);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + durationMs / 1000);
    } catch {
      // Audio context silenced or browser gesture policy
    }
  }

  public playStepSound(value: number, maxVal = 100) {
    const pitch = 180 + (value / Math.max(maxVal, 1)) * 720;
    this.playTone(pitch, 60, "sine");
  }

  public playSwapSound(val1: number, val2: number, maxVal = 100) {
    const pitch = 300 + ((val1 + val2) / (2 * Math.max(maxVal, 1))) * 600;
    this.playTone(pitch, 90, "triangle");
  }

  public playSuccessSound() {
    this.playTone(523.25, 120, "sine");
    setTimeout(() => this.playTone(659.25, 120, "sine"), 100);
    setTimeout(() => this.playTone(783.99, 220, "sine"), 200);
  }
}

export const soundFx = new SoundFxEngine();
