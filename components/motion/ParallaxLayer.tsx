"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";

// Capa que se desplaza según el scroll de la página (pensada para el hero, que está arriba de todo).
// x/y: desplazamiento en px al recorrer `range` px de scroll. Solo transform; quieta con reduced motion.
export function ParallaxLayer({
  children,
  className = "",
  x = [0, 0],
  y = [0, 0],
  range = 800,
}: {
  children: React.ReactNode;
  className?: string;
  x?: [number, number];
  y?: [number, number];
  range?: number;
}) {
  const reduce = useReducedMotion() ?? false;
  const { scrollY } = useScroll();
  const tx = useTransform(scrollY, [0, range], reduce ? [0, 0] : x);
  const ty = useTransform(scrollY, [0, range], reduce ? [0, 0] : y);
  return (
    <m.div className={className} style={{ x: tx, y: ty }}>
      {children}
    </m.div>
  );
}
