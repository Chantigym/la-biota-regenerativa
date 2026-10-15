"use client";

import { m } from "motion/react";
import { easeOut } from "@/lib/motion";

// Surco ondulado que se traza de izquierda a derecha al entrar en pantalla (una sola vez).
const WAVE = Array.from({ length: 20 }, (_, i) => `${i === 0 ? "Q 25 4" : "T"} ${(i + 1) * 50} 10`).join(" ");
const D = `M 0 10 ${WAVE}`;

export function FurrowLine() {
  return (
    <svg aria-hidden viewBox="0 0 1000 20" preserveAspectRatio="none" className="block h-5 w-full" fill="none">
      <m.path
        d={D}
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.7, ease: easeOut }}
      />
    </svg>
  );
}
