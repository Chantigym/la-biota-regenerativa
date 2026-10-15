"use client";

import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { asset } from "@/lib/asset";

// Árbol del monte nativo en el margen: se desplaza apenas más lento que el texto al scrollear.
export function ParallaxTree({ src, className = "", label }: { src: string; className?: string; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [70, -70]);
  return (
    <div ref={ref} className={`pointer-events-none ${className}`} aria-hidden={label ? undefined : true}>
      <m.span
        role={label ? "img" : undefined}
        aria-label={label}
        className="ink-mask aspect-square w-full"
        style={{ ["--src" as string]: `url(${asset(src)})`, y }}
      />
    </div>
  );
}
