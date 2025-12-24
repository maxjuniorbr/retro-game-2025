// Simple synth for retro sound effects
// No external assets required

const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx;

const getCtx = () => {
    if (!audioCtx && typeof window !== 'undefined') {
        audioCtx = new AudioContext();
    }
    return audioCtx;
};

export const initAudio = () => {
    const ctx = getCtx();
    if (ctx && ctx.state === 'suspended') {
        ctx.resume();
    }
};

// --- HELPER OSCILLATORS ---

const playTone = (freq, type, duration, vol = 0.1) => {
    const ctx = getCtx();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
};

const playNoise = (duration, vol = 0.2) => {
    const ctx = getCtx();
    if (!ctx) return;

    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    noise.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
};

// --- EXPORTED SFX ---

export const playJump = () => {
    // Slide up frequency for jump
    const ctx = getCtx();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(300, ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
};

export const playLand = () => {
    playTone(100, 'triangle', 0.05, 0.1);
};

export const playLaser = () => {
    // Pew pew! High to low slide
    const ctx = getCtx();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.15);
};

export const playExplosion = () => {
    playNoise(0.3, 0.1);
};

export const playVictory = () => {
    // Simple Arpeggio
    const now = getCtx()?.currentTime || 0;
    setTimeout(() => playTone(523.25, 'square', 0.1, 0.1), 0);
    setTimeout(() => playTone(659.25, 'square', 0.1, 0.1), 100);
    setTimeout(() => playTone(783.99, 'square', 0.2, 0.1), 200);
    setTimeout(() => playTone(1046.50, 'square', 0.4, 0.1), 300);
};

export const playRocketLaunch = () => {
    playNoise(1.5, 0.15); // Longer rumble
};
