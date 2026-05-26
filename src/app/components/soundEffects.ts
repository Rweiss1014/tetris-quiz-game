class SoundEffects {
  private audioContext: AudioContext | null = null;
  private masterVolume: GainNode | null = null;
  private enabled = true;
  private volume = 0.3;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        this.masterVolume = this.audioContext.createGain();
        this.masterVolume.connect(this.audioContext.destination);
        this.masterVolume.gain.value = this.volume;
      } catch (e) { console.warn('Web Audio API not supported', e); }
    }
  }

  setVolume(v: number) { this.volume = Math.max(0, Math.min(1, v)); if (this.masterVolume) this.masterVolume.gain.value = this.volume; }
  getVolume() { return this.volume; }
  setEnabled(e: boolean) { this.enabled = e; }
  isEnabled() { return this.enabled; }

  private tone(freq: number, dur: number, type: OscillatorType = 'square', vol = 1) {
    if (!this.enabled || !this.audioContext || !this.masterVolume) return;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    osc.connect(gain); gain.connect(this.masterVolume);
    osc.type = type; osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.3 * vol, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + dur);
    osc.start(this.audioContext.currentTime); osc.stop(this.audioContext.currentTime + dur);
  }

  private sweep(f1: number, f2: number, dur: number, type: OscillatorType, vol: number) {
    if (!this.enabled || !this.audioContext || !this.masterVolume) return;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    osc.connect(gain); gain.connect(this.masterVolume);
    osc.type = type;
    osc.frequency.setValueAtTime(f1, this.audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(f2, this.audioContext.currentTime + dur);
    gain.gain.setValueAtTime(vol, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + dur);
    osc.start(this.audioContext.currentTime); osc.stop(this.audioContext.currentTime + dur);
  }

  private arpeggio(freqs: number[], spacing: number, dur: number, type: OscillatorType, vol: number) {
    if (!this.enabled || !this.audioContext || !this.masterVolume) return;
    freqs.forEach((freq, i) => {
      const osc = this.audioContext!.createOscillator();
      const gain = this.audioContext!.createGain();
      osc.connect(gain); gain.connect(this.masterVolume!);
      osc.type = type; osc.frequency.value = freq;
      const t = this.audioContext!.currentTime + i * spacing;
      gain.gain.setValueAtTime(vol, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + dur);
      osc.start(t); osc.stop(t + dur);
    });
  }

  move()       { this.tone(200, 0.05, 'square', 0.3); }
  rotate()     { this.sweep(300, 500, 0.08, 'square', 0.2); }
  hardDrop()   { this.sweep(800, 100, 0.15, 'sawtooth', 0.3); }
  land()       { this.tone(80, 0.1, 'sine', 1.3); }
  lineClear(n = 1) { this.arpeggio([523.25,659.25,783.99,1046.50].slice(0, Math.min(n,4)), 0.08, 0.15, 'square', 0.3); }
  tetris()     { this.arpeggio([523.25,659.25,783.99,1046.50,1318.51], 0.1, 0.2, 'square', 0.4); }
  levelUp()    { this.arpeggio([523.25,659.25,783.99,1046.50], 0.12, 0.25, 'triangle', 0.35); }
  gameOver()   { this.arpeggio([392,349.23,293.66,261.63], 0.2, 0.4, 'sawtooth', 0.3); }
  correct()    { this.arpeggio([659.25,783.99,1046.50], 0.08, 0.25, 'triangle', 0.35); }
  wrong()      { this.tone(150, 0.4, 'sawtooth', 1); }
  highScore()  { this.arpeggio([523.25,659.25,783.99,1046.50,783.99,1046.50,1318.51], 0.15, 0.25, 'triangle', 0.35); }
  click()      { this.tone(400, 0.05, 'square', 0.2); }
  pause()      { this.sweep(600, 300, 0.1, 'triangle', 0.2); }
  resume()     { this.sweep(300, 600, 0.1, 'triangle', 0.2); }
  timerTick()  { this.tone(800, 0.03, 'square', 0.5); }
  urgentBeep() { this.tone(1200, 0.08, 'square', 0.83); }

  gameComplete() {
    if (!this.enabled || !this.audioContext || !this.masterVolume) return;
    const melody = [{f:523.25,d:0.2},{f:659.25,d:0.2},{f:783.99,d:0.2},{f:1046.50,d:0.3},{f:783.99,d:0.15},{f:1046.50,d:0.3},{f:1318.51,d:0.4},{f:1568.00,d:0.6}];
    let t = 0;
    melody.forEach((note, i) => {
      const osc = this.audioContext!.createOscillator();
      const gain = this.audioContext!.createGain();
      osc.connect(gain); gain.connect(this.masterVolume!);
      osc.type = i === melody.length - 1 ? 'sine' : 'triangle';
      osc.frequency.value = note.f;
      const start = this.audioContext!.currentTime + t;
      const vol = i === melody.length - 1 ? 0.5 : 0.4;
      gain.gain.setValueAtTime(vol, start);
      gain.gain.exponentialRampToValueAtTime(0.01, start + note.d);
      osc.start(start); osc.stop(start + note.d);
      t += note.d * 0.8;
    });
  }
}

export const soundEffects = new SoundEffects();
