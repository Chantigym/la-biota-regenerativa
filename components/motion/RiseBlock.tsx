"use client";

import { m } from "motion/react";

// Bloque de color que sube y se "apoya" sobre la sección anterior al llegar (una sola vez).
export function RiseBlock({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <m.div
      className={className}
      initial={{ y: 56, scale: 0.985 }}
      whileInView={{ y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ type: "spring", stiffness: 140, damping: 24 }}
    >
      {children}
    </m.div>
  );
}
