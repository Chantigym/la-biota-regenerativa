"use client";

import { m } from "motion/react";

// Sello de autocertificación: entra girando y se "estampa" (rebote corto) al aparecer.
// Anillo con los tres niveles y texto en círculo. Decorativo (la sección ya explica el sistema).
export function Sello({ className = "" }: { className?: string }) {
  const ring = 2 * Math.PI * 54;
  const seg = ring / 3;
  return (
    <m.div
      aria-hidden
      className={className}
      initial={{ scale: 1.6, rotate: -40, opacity: 0 }}
      whileInView={{ scale: 1, rotate: -10, opacity: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ type: "spring", stiffness: 260, damping: 14, mass: 0.8 }}
    >
      <svg viewBox="0 0 140 140" className="block w-full">
        <defs>
          <path id="sello-texto" d="M 70 70 m -44 0 a 44 44 0 1 1 88 0 a 44 44 0 1 1 -88 0" />
        </defs>
        <circle cx="70" cy="70" r="66" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
        {["var(--cert-verde)", "var(--cert-amarillo)", "var(--cert-naranja)"].map((c, i) => (
          <circle
            key={i}
            cx="70"
            cy="70"
            r="54"
            fill="none"
            stroke={c}
            strokeWidth="8"
            strokeDasharray={`${seg - 4} ${ring - seg + 4}`}
            strokeDashoffset={-i * seg}
            transform="rotate(-90 70 70)"
          />
        ))}
        <text fontSize="8.6" fontWeight="700" letterSpacing="1.2" fill="var(--ink)" fontFamily="var(--font-sans)">
          <textPath href="#sello-texto">AUTOCERTIFICACIÓN · LA BIOTA ·</textPath>
        </text>
        <text x="70" y="66" textAnchor="middle" fontSize="15" fontWeight="800" fill="var(--ink)" fontFamily="var(--font-display)">
          La Biota
        </text>
        <text x="70" y="84" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--ink)" fontFamily="var(--font-sans)">
          Traslasierra
        </text>
      </svg>
    </m.div>
  );
}
