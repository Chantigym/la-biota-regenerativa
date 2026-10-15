"use client";

import { m, useReducedMotion, type Variants } from "motion/react";
import { asset } from "@/lib/asset";
import { dur, easeOut } from "@/lib/motion";

// Al entrar una sección, el tractor del logo la cruza de derecha a izquierda (hacia donde mira)
// arando el surco que la separa de la anterior; detrás de él aparece el contenido.
// Solo se anima transform y opacity. Con reduced motion, Motion salta los transforms:
// el surco queda dibujado, el tractor no cruza y el contenido solo hace fundido.

const TRACTOR_W = 104; // px; el alto sale del aspect-ratio del dibujo
const pass = { duration: dur.pass, ease: [0.45, 0, 0.3, 1] as const };

const track: Variants = {
  hidden: { x: "100%" },
  shown: { x: "0%", transition: pass },
};
const furrow: Variants = {
  hidden: { scaleX: 0 },
  shown: { scaleX: 1, transition: pass },
};
// Con reduced motion el tractor no cruza: el contenido no lo espera.
const content = (reduce: boolean): Variants => ({
  hidden: { opacity: 0, y: 16 },
  shown: { opacity: 1, y: 0, transition: { duration: reduce ? dur.base : 0.5, ease: easeOut, delay: reduce ? 0 : dur.pass * 0.45 } },
});

export function TractorPass({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion() ?? false;
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -22% 0px" }}
    >
      <div aria-hidden className="relative h-[76px] overflow-hidden">
        {/* surco: crece desde la derecha, detrás del tractor */}
        <m.span variants={furrow} className="absolute inset-x-0 bottom-[3px] block h-[2px] origin-right rounded-full bg-current" />
        {/* pista: mide el ancho del surco + el tractor, así entra y sale de cuadro */}
        <m.div
          variants={track}
          className="absolute top-0 bottom-0 will-change-transform"
          style={{ left: -TRACTOR_W, right: 0 }}
        >
          <span
            className="ink-mask absolute bottom-0 left-0"
            style={{
              ["--src" as string]: `url(${asset("/brand/logo-tractor-solo.webp")})`,
              width: TRACTOR_W,
              aspectRatio: "360 / 245",
            }}
          />
        </m.div>
      </div>
      <m.div variants={content(reduce)} className="pt-10 lg:pt-14">
        {children}
      </m.div>
    </m.div>
  );
}
