"use client";

import { forwardRef } from "react";
import { asset } from "@/lib/asset";

// Gallinita pintada, animada cuadro a cuadro: la imagen está separada en capas (cabeza, cuerpo, patas)
// y cada pose se sostiene hasta la siguiente (animaciones con steps, ver .gl-* en globals.css).
// Poses: idle (cabecea y levanta una pata), sleep (cabeza caída, ojo cerrado, Zzz),
// wave (saluda con el ala) y search (mira a un lado y al otro). Quieta con reduced motion.
export type Pose = "idle" | "sleep" | "wave" | "search";

const img = (n: string) => asset(`/gallinita/${n}.webp`);

export const Gallinita = forwardRef<HTMLDivElement, { pose?: Pose; className?: string }>(function Gallinita(
  { pose = "idle", className = "" },
  ref
) {
  return (
    <div ref={ref} aria-hidden className={`gl gl-${pose} relative ${className}`} style={{ aspectRatio: "232 / 391" }}>
      <div className="gl-legs absolute inset-0">
        <img src={img("pata-der")} alt="" className="absolute inset-0 size-full" draggable={false} />
        <img src={img("pata-izq")} alt="" className="gl-leg absolute inset-0 size-full" draggable={false} />
      </div>
      <div className="gl-body absolute inset-0">
        <img src={img("cuerpo")} alt="" className="absolute inset-0 size-full" draggable={false} />
        {/* ala para saludar (pintada en los colores del cuerpo) */}
        <svg viewBox="0 0 232 391" className="gl-wing absolute inset-0 size-full">
          <path
            d="M150 232 C 182 214, 214 210, 226 224 C 214 236, 196 250, 170 258 C 160 252, 152 244, 150 232 Z"
            fill="#c8622b"
            stroke="#7a3a1a"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path d="M176 236 C 190 232, 204 230, 214 230" stroke="#7a3a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      </div>
      <div className="gl-head absolute inset-0">
        <img src={img("cabeza")} alt="" className="absolute inset-0 size-full" draggable={false} />
        {/* ojo cerrado (dormida) */}
        <svg viewBox="0 0 232 391" className="gl-eye absolute inset-0 size-full">
          <ellipse cx="100" cy="74" rx="9" ry="7" fill="rgb(237,150,105)" />
          <path d="M92 73 Q 100 80 108 73" stroke="#5b3220" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      </div>
      {/* Zzz (dormida) */}
      <svg viewBox="0 0 232 391" className="gl-zzz pointer-events-none absolute inset-0 size-full overflow-visible">
        {["z", "z", "Z"].map((z, i) => (
          <text key={i} x={150 + i * 22} y={40 - i * 26} fontSize={22 + i * 8} fontWeight="800" fill="currentColor" fontFamily="var(--font-display)" style={{ ["--k" as string]: i }}>
            {z}
          </text>
        ))}
      </svg>
    </div>
  );
});
