"use client";

import { LazyMotion, MotionConfig } from "motion/react";

// domMax (layout animations: menú activo y lista que se reordena) se carga aparte, después de la página,
// para no sumar peso a la carga inicial en celulares.
const loadFeatures = () => import("@/lib/motion-features").then((mod) => mod.default);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
