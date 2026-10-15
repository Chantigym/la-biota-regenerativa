"use client";

import { m, useScroll, useSpring, useTransform } from "motion/react";

// Surco vertical fijo al costado (solo en pantallas anchas, donde hay margen): se va dibujando
// a medida que bajás por la página, con una semilla que marca por dónde vas. Es un indicador de
// progreso (sigue al scroll también con reduced motion: no hay movimiento propio).
const WAVE = Array.from({ length: 20 }, (_, i) => `${i === 0 ? "Q 4 25" : "T"} 12 ${(i + 1) * 50}`).join(" ");
const D = `M 12 0 ${WAVE}`;

export function PageFurrow() {
  const { scrollY, scrollYProgress } = useScroll();
  // aparece recién al dejar atrás el hero (que ocupa todo el ancho)
  const opacity = useTransform(scrollY, [450, 750], [0, 1]);
  const smooth = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  const y = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <m.div aria-hidden style={{ opacity }} className="pointer-events-none fixed top-24 bottom-8 left-5 z-10 hidden w-6 text-ink min-[1360px]:block">
      <svg viewBox="0 0 24 1000" preserveAspectRatio="none" className="absolute inset-0 size-full" fill="none">
        <path d={D} stroke="currentColor" strokeOpacity={0.2} strokeWidth={2} strokeDasharray="2 9" strokeLinecap="round" />
        <m.path d={D} stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" style={{ pathLength: smooth }} />
      </svg>
      <m.div className="absolute inset-x-0 top-0 h-full" style={{ y }}>
        <span className="absolute left-1/2 block size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yema shadow-[0_0_0_2px_var(--ink)]" />
      </m.div>
    </m.div>
  );
}
