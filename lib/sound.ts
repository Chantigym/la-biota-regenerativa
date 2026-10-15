"use client";

import { useSyncExternalStore } from "react";

// Sonido del sitio: siempre arranca apagado; se activa con el botón del menú (dura hasta recargar).
let enabled = false;
const subs = new Set<() => void>();
export const sound = {
  get: () => enabled,
  set(v: boolean) {
    enabled = v;
    subs.forEach((f) => f());
  },
  subscribe(f: () => void) {
    subs.add(f);
    return () => subs.delete(f);
  },
};
export function useSound() {
  return useSyncExternalStore(sound.subscribe, sound.get, () => false);
}

let ctx: AudioContext | null = null;
function audio() {
  if (!ctx) {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new Ctx();
  }
  return ctx;
}

// Cacareo sintetizado (sin archivos): tres "cloc" cortos y uno largo que sube, con un poco de ruido.
export function cacarear() {
  if (!enabled) return;
  try {
    const c = audio();
    const t0 = c.currentTime + 0.02;
    const note = (start: number, len: number, f0: number, f1: number, vol: number) => {
      const o = c.createOscillator();
      const g = c.createGain();
      const filt = c.createBiquadFilter();
      o.type = "sawtooth";
      o.frequency.setValueAtTime(f0, start);
      o.frequency.exponentialRampToValueAtTime(f1, start + len);
      filt.type = "bandpass";
      filt.frequency.value = 1400;
      filt.Q.value = 1.2;
      g.gain.setValueAtTime(0, start);
      g.gain.linearRampToValueAtTime(vol, start + 0.012);
      g.gain.exponentialRampToValueAtTime(0.001, start + len);
      o.connect(filt).connect(g).connect(c.destination);
      o.start(start);
      o.stop(start + len + 0.02);
    };
    note(t0, 0.07, 620, 430, 0.22);
    note(t0 + 0.12, 0.07, 640, 440, 0.22);
    note(t0 + 0.24, 0.07, 630, 430, 0.2);
    note(t0 + 0.38, 0.32, 520, 980, 0.24);
  } catch {
    /* sin audio */
  }
}
