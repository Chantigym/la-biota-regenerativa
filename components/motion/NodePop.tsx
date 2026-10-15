"use client";

import { m } from "motion/react";
import { dur } from "@/lib/motion";

// Los hitos alcanzados se "encienden" uno por uno, a medida que el surco de la línea de tiempo llega a ellos.
export function NodePop({ children, delay, active }: { children: React.ReactNode; delay: number; active: boolean }) {
  if (!active) return <>{children}</>;
  return (
    <m.span
      className="relative z-10 block shrink-0"
      initial={{ scale: 0.4, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ type: "spring", stiffness: 420, damping: 22, delay: delay * dur.path }}
    >
      {children}
    </m.span>
  );
}
