"use client";

import { m } from "motion/react";
import { ciclo } from "@/content/site";
import { easeOut } from "@/lib/motion";

// Ciclo de nutrientes: cuatro nodos en círculo unidos por flechas que se trazan una tras otra
// y una semilla que recorre el ciclo. Debajo, lo que sale del ciclo hacia la comunidad.
const R = 150; // radio en unidades del viewBox (400 × 400)
const C = 200;
const pos = [
  { x: C, y: C - R }, // arriba
  { x: C + R, y: C }, // derecha
  { x: C, y: C + R }, // abajo
  { x: C - R, y: C }, // izquierda
];
// Arcos entre nodos, dejando espacio para el nodo (±18°)
function arc(i: number) {
  const a0 = (-90 + i * 90 + 20) * (Math.PI / 180);
  const a1 = (-90 + (i + 1) * 90 - 20) * (Math.PI / 180);
  return `M ${C + R * Math.cos(a0)} ${C + R * Math.sin(a0)} A ${R} ${R} 0 0 1 ${C + R * Math.cos(a1)} ${C + R * Math.sin(a1)}`;
}

export function Ciclo() {
  return (
    <div className="mt-20 lg:mt-28">
      <h3 className="text-3xl font-extrabold sm:text-4xl">{ciclo.title}</h3>
      <p className="mt-3 max-w-[60ch] text-lg text-muted">{ciclo.lead}</p>

      <div className="mt-10 grid items-center gap-10 lg:grid-cols-12 lg:gap-6">
        <div className="relative mx-auto w-full max-w-[460px] lg:col-span-6">
          <svg viewBox="0 0 400 400" className="block w-full" aria-hidden fill="none">
            <defs>
              <marker id="flecha" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
              </marker>
            </defs>
            <circle cx={C} cy={C} r={R} stroke="currentColor" strokeOpacity={0.15} strokeWidth={2} strokeDasharray="2 8" />
            {pos.map((_, i) => (
              <m.path
                key={i}
                d={arc(i)}
                stroke="currentColor"
                strokeWidth={3}
                strokeLinecap="round"
                markerEnd="url(#flecha)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.35, ease: easeOut }}
              />
            ))}
          </svg>
          {/* semilla que recorre el ciclo (CSS offset-path; quieta con reduced motion) */}
          <span aria-hidden className="ciclo-seed" />

          {ciclo.nodes.map((n, i) => (
            <m.div
              key={n.id}
              className="absolute flex w-[34%] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-2xl bg-paper p-2 text-center shadow-[inset_0_0_0_1.5px_var(--ink)] sm:p-3"
              style={{ left: `${(pos[i].x / 400) * 100}%`, top: `${(pos[i].y / 400) * 100}%` }}
              initial={{ scale: 0.6, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ type: "spring", stiffness: 380, damping: 24, delay: i * 0.35 }}
            >
              <span className="font-display text-[15px] leading-tight font-bold tracking-tight sm:text-lg">{n.title}</span>
              <span className="mt-0.5 hidden text-[13px] leading-snug text-muted sm:block">{n.text}</span>
            </m.div>
          ))}
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          {/* lectura en texto del ciclo (también para lectores de pantalla) */}
          <ol className="grid gap-3">
            {ciclo.nodes.map((n, i) => (
              <li key={n.id} className="flex gap-3">
                <span className="font-display w-6 shrink-0 text-xl font-bold">{i + 1}</span>
                <span>
                  <span className="font-semibold">{n.title}:</span> <span className="text-muted">{n.text}</span>
                  {i === ciclo.nodes.length - 1 && <span className="text-muted">, que vuelve al suelo.</span>}
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {ciclo.outputs.map((o) => (
              <div key={o.title} className="rounded-[var(--radius-block)] bg-barro p-5">
                <p className="font-display text-xl font-bold tracking-tight">{o.title}</p>
                <p className="mt-1 text-[15px] text-muted">{o.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
