"use client";

import { useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";

// ease-out quint (mismo carácter que --ease-out)
const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

// Cuenta desde 0 hasta el número inicial del valor ("20 ha" → 0…20 ha) al entrar en pantalla.
// Si el valor no empieza con un número (p. ej. "XX %"), se muestra tal cual. El HTML trae el valor
// final, así que sin JS se ve correcto; el texto se actualiza por ref, sin re-render.
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const match = value.match(/^(\d+)([\s\S]*)$/);

  useEffect(() => {
    if (!match || !inView || reduce || !ref.current) return;
    const el = ref.current;
    const target = Number(match[1]);
    const rest = match[2];
    const duration = Math.min(1400, 600 + target * 2.5);
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      el.textContent = `${Math.round(target * easeOutQuint(t))}${rest}`;
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {value}
    </span>
  );
}
