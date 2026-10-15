"use client";

import { m } from "motion/react";

// Frascos que se llenan: manchas de color detrás de la ilustración de Conservas (la tinta queda encima),
// ubicadas en el interior de cada frasco. Suben desde el fondo al entrar en pantalla.
const JARS = [
  { left: 10, top: 31, width: 22, height: 36, color: "#d9533a" }, // tomates
  { left: 29, top: 41, width: 27, height: 33, color: "#7f9d3c" }, // pepinos
  { left: 60, top: 38, width: 31, height: 27, color: "#8a2c4a" }, // dulce
];

export function JarFill({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {JARS.map((j, i) => (
        <m.span
          key={i}
          aria-hidden
          className="absolute block origin-bottom rounded-[30%] opacity-60"
          style={{ left: `${j.left}%`, top: `${j.top}%`, width: `${j.width}%`, height: `${j.height}%`, background: j.color }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, delay: 0.15 + i * 0.2, ease: [0.23, 1, 0.32, 1] }}
        />
      ))}
      <div className="relative">{children}</div>
    </div>
  );
}
