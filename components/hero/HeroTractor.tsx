"use client";

import { useRef, useState } from "react";
import { m, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

// El tractor del hero reacciona al mouse: se inclina y se balancea apenas hacia donde está el cursor.
// Easter egg: 5 clics seguidos y toca la bocina y suelta una bocanada de humo extra.
function bocina() {
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    const beep = (t0: number) => {
      const gain = ctx.createGain();
      gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0, t0);
      gain.gain.linearRampToValueAtTime(0.18, t0 + 0.02);
      gain.gain.setValueAtTime(0.18, t0 + 0.2);
      gain.gain.linearRampToValueAtTime(0, t0 + 0.26);
      for (const f of [392, 494]) {
        const o = ctx.createOscillator();
        o.type = "sawtooth";
        o.frequency.value = f;
        o.connect(gain);
        o.start(t0);
        o.stop(t0 + 0.28);
      }
    };
    beep(ctx.currentTime);
    beep(ctx.currentTime + 0.34);
    setTimeout(() => ctx.close(), 1200);
  } catch {
    /* sin audio: queda solo el humo */
  }
}

export function HeroTractor({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion() ?? false;
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotate = useSpring(useTransform(px, [-1, 1], [-2.5, 2.5]), { stiffness: 120, damping: 14 });
  const x = useSpring(useTransform(px, [-1, 1], [-10, 10]), { stiffness: 120, damping: 18 });
  const y = useSpring(useTransform(py, [-1, 1], [-6, 6]), { stiffness: 120, damping: 18 });
  const clicks = useRef<number[]>([]);
  const [burst, setBurst] = useState(0);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width) * 2 - 1);
    py.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };
  const onClick = () => {
    const now = Date.now();
    clicks.current = [...clicks.current.filter((t) => now - t < 1800), now];
    if (clicks.current.length >= 5) {
      clicks.current = [];
      bocina();
      setBurst((b) => b + 1);
    }
  };

  return (
    <div className="relative" onPointerMove={onMove} onPointerLeave={onLeave} onClick={onClick}>
      <m.div style={{ rotate, x, y, transformOrigin: "50% 90%" }} className="relative">
        {children}
        {burst > 0 && !reduce && (
          <span key={burst} aria-hidden className="pointer-events-none absolute inset-0">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <span key={i} className="humo-extra" style={{ ["--k" as string]: i }} />
            ))}
          </span>
        )}
      </m.div>
    </div>
  );
}
