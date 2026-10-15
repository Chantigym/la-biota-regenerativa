"use client";

import { useRef } from "react";
import { m, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { Sprout } from "@/components/motion/Sprout";
import { asset } from "@/lib/asset";
import { dur, easeOut } from "@/lib/motion";

// Al entrar una sección, el tractor del logo la cruza de derecha a izquierda (hacia donde mira)
// guiado por el scroll: avanza si bajás y retrocede si subís. Va arando un surco ondulado y,
// detrás de él, crecen brotes. Todo con transform/opacity y pathLength sobre motion values (sin re-render).
// Con reduced motion: el surco y los brotes quedan quietos y completos, y el tractor no aparece.

const TRACTOR_W = 168; // px (en mobile se escala con CSS)
const ROW_H = 132;

// Surco ondulado, dibujado de derecha a izquierda (el mismo sentido que el tractor)
const WAVE = Array.from({ length: 20 }, (_, i) => `${i === 0 ? "Q 975 4" : "T"} ${1000 - (i + 1) * 50} 10`).join(" ");
const FURROW_D = `M 1000 10 ${WAVE}`;

// Posición de cada brote sobre el surco (0 = izquierda, 1 = derecha) y su tamaño
const SPROUTS = [
  { at: 0.82, h: 30 },
  { at: 0.64, h: 22 },
  { at: 0.43, h: 34 },
  { at: 0.21, h: 24 },
  { at: 0.07, h: 28 },
];

function GrowingSprout({ progress, at, h }: { progress: MotionValue<number>; at: number; h: number }) {
  // El tractor pasa por `at` cuando progress ≈ 1 - at; el brote crece justo después.
  const start = Math.min(0.92, 1 - at + 0.04);
  const scaleY = useTransform(progress, [start, start + 0.1], [0, 1]);
  return (
    <m.span
      className="absolute bottom-[9px] block origin-bottom"
      style={{ left: `${at * 100}%`, height: h, width: h * 0.75, scaleY }}
    >
      <Sprout className="size-full" />
    </m.span>
  );
}

export function TractorPass({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion() ?? false;
  const row = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: row, offset: ["start end", "start 20%"] });
  // un resorte corto suaviza los saltos de la rueda del mouse sin sentirse atrasado
  const smooth = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 });
  const progress = useTransform(smooth, (v) => (reduce ? 1 : v));
  const x = useTransform(progress, [0, 1], ["100%", "0%"]);

  return (
    <div className={className}>
      <div ref={row} aria-hidden className="relative overflow-hidden" style={{ height: ROW_H }}>
        {/* surco pendiente (punteado) y surco arado (sólido) */}
        <svg viewBox="0 0 1000 20" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-5 w-full" fill="none">
          <path d={FURROW_D} stroke="currentColor" strokeOpacity={0.25} strokeWidth={2} strokeDasharray="2 9" strokeLinecap="round" />
          <m.path d={FURROW_D} stroke="currentColor" strokeWidth={3} strokeLinecap="round" style={{ pathLength: progress }} />
        </svg>

        {SPROUTS.map((s) => (
          <GrowingSprout key={s.at} progress={progress} at={s.at} h={s.h} />
        ))}

        {!reduce && (
          <m.div className="absolute top-0 bottom-[10px] will-change-transform" style={{ left: -TRACTOR_W, right: 0, x }}>
            <span className="tractor-pass absolute bottom-0 left-0 block w-[120px] sm:w-[168px]" style={{ aspectRatio: "360 / 245" }}>
              <span
                className="ink-mask absolute inset-0"
                style={{ ["--src" as string]: `url(${asset("/brand/logo-tractor-solo.webp")})` }}
              />
              {/* humo: tres bocanadas que suben desde el caño de escape */}
              <span className="smoke" style={{ ["--d" as string]: "0s" }} />
              <span className="smoke" style={{ ["--d" as string]: "0.55s" }} />
              <span className="smoke" style={{ ["--d" as string]: "1.1s" }} />
            </span>
          </m.div>
        )}
      </div>

      <m.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: reduce ? dur.base : 0.5, ease: easeOut }}
        className="pt-8 lg:pt-12"
      >
        {children}
      </m.div>
    </div>
  );
}
