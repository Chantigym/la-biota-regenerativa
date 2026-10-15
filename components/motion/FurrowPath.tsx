"use client";

import { m } from "motion/react";
import { dur, easeOut } from "@/lib/motion";

// Surco ondulado que une los hitos (solo desktop). La parte recorrida se dibuja al entrar en pantalla
// y se detiene en el hito actual; el resto queda punteado.
const WAVE = Array.from({ length: 10 }, (_, i) => `${i === 0 ? "Q 50 2" : "T"} ${(i + 1) * 100} 12`).join(" ");
const D = `M 0 12 ${WAVE}`;

export function FurrowPath({ progress }: { progress: number }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1000 24"
      preserveAspectRatio="none"
      className="pointer-events-none absolute top-[10px] h-6 w-full"
      fill="none"
    >
      <path d={D} stroke="currentColor" strokeOpacity={0.45} strokeWidth={2} strokeDasharray="2 8" strokeLinecap="round" />
      <m.path
        d={D}
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: progress }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: dur.path, ease: easeOut }}
      />
    </svg>
  );
}
