"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useInView, useReducedMotion } from "motion/react";
import { ArrowsClockwise } from "@phosphor-icons/react";
import { Glossed } from "@/components/motion/Glossed";
import { ciclo, ui } from "@/content/site";
import { asset } from "@/lib/asset";
import { haptic } from "@/lib/haptic";
import { dur, easeOut, exitDur } from "@/lib/motion";

// Ciclo de nutrientes: cuatro etapas ilustradas en círculo, unidas por flechas gruesas.
// Al entrar en pantalla se recorre solo (cada 3,5 s) hasta que la persona toca una etapa.
// La etapa elegida se agranda y su flecha de salida se pinta de amarillo.

const N = ciclo.nodes.length;
const C = 50; // centro del viewBox (100 × 100)
const R = 35; // radio de la órbita
const NODE = 14.5; // radio de cada etapa (en unidades del viewBox)
const ang = (i: number) => (-90 + (360 / N) * i) * (Math.PI / 180);
const pt = (a: number, r = R) => ({ x: C + r * Math.cos(a), y: C + r * Math.sin(a) });

// arco de la etapa i a la siguiente, dejando lugar a los círculos
const GAP = Math.asin((NODE + 3.2) / R);
function arc(i: number) {
  const a0 = ang(i) + GAP;
  const a1 = ang(i + 1) - GAP - 0.07;
  const p0 = pt(a0);
  const p1 = pt(a1);
  return `M ${p0.x} ${p0.y} A ${R} ${R} 0 0 1 ${p1.x} ${p1.y}`;
}
// punta de flecha al final del arco, orientada según la tangente
function head(i: number) {
  const a = ang(i + 1) - GAP;
  const tip = pt(a);
  const t = a + Math.PI / 2; // dirección de avance (horario)
  const back = { x: tip.x - 3.6 * Math.cos(t), y: tip.y - 3.6 * Math.sin(t) };
  const n = { x: Math.cos(a) * 2.4, y: Math.sin(a) * 2.4 };
  return `M ${tip.x} ${tip.y} L ${back.x + n.x} ${back.y + n.y} L ${back.x - n.x} ${back.y - n.y} Z`;
}

export function Ciclo() {
  const [sel, setSel] = useState(0);
  const [auto, setAuto] = useState(true);
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const inView = useInView(box, { amount: 0.5 });

  useEffect(() => {
    if (!auto || !inView || reduce) return;
    const id = setInterval(() => setSel((s) => (s + 1) % N), 3500);
    return () => clearInterval(id);
  }, [auto, inView, reduce]);

  const pick = (i: number) => {
    haptic();
    setAuto(false);
    setSel(i);
  };
  const node = ciclo.nodes[sel];
  const next = ciclo.nodes[(sel + 1) % N];

  return (
    <div className="mt-20 lg:mt-28">
      <h3 className="text-3xl font-extrabold sm:text-4xl">{ciclo.title}</h3>
      <p className="mt-3 max-w-[60ch] text-lg text-muted">{ciclo.lead}</p>

      <div className="mt-10 grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
        {/* Diagrama */}
        <div ref={box} className="relative mx-auto aspect-square w-full max-w-[600px] lg:col-span-7">
          <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden fill="none">
            {/* disco de fondo y órbita */}
            <circle cx={C} cy={C} r={R + NODE + 1} className="fill-salvia" />
            <circle cx={C} cy={C} r={R} stroke="var(--ink)" strokeOpacity={0.18} strokeWidth={0.5} strokeDasharray="0.6 2" />
            {ciclo.nodes.map((_, i) => {
              const on = i === sel;
              return (
                <m.g
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.25 }}
                >
                  {/* contorno en tinta y relleno (amarillo en la flecha activa) */}
                  <path d={arc(i)} stroke="var(--ink)" strokeWidth={4.2} strokeLinecap="round" />
                  <path
                    d={arc(i)}
                    stroke={on ? "var(--yema)" : "var(--paper)"}
                    strokeWidth={2.4}
                    strokeLinecap="round"
                    style={{ transition: "stroke 300ms" }}
                  />
                  <path
                    d={head(i)}
                    fill={on ? "var(--yema)" : "var(--paper)"}
                    stroke="var(--ink)"
                    strokeWidth={0.9}
                    strokeLinejoin="round"
                    style={{ transition: "fill 300ms" }}
                  />
                </m.g>
              );
            })}
          </svg>

          {/* centro */}
          <div className="absolute top-1/2 left-1/2 flex w-[30%] -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
            <ArrowsClockwise size={28} weight="bold" aria-hidden className={reduce || !auto ? "" : "animate-[spin_9s_linear_infinite]"} />
            <p className="font-display mt-1 text-[clamp(0.85rem,2.2vw,1.25rem)] leading-tight font-extrabold tracking-tight">{ciclo.center}</p>
          </div>

          {/* etapas */}
          {ciclo.nodes.map((n, i) => {
            const p = pt(ang(i));
            const on = i === sel;
            return (
              <m.button
                key={n.id}
                type="button"
                onClick={() => pick(i)}
                aria-pressed={on}
                aria-label={`${i + 1}. ${n.title}`}
                className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${NODE * 2}%` }}
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: i * 0.25 }}
              >
                <m.span
                  animate={{ scale: on ? 1.08 : 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className={`relative block aspect-square w-full rounded-full transition-colors duration-300 ${
                    on ? "bg-yema shadow-[0_0_0_3px_var(--ink)]" : "bg-paper shadow-[0_0_0_2px_var(--ink)] group-hover:bg-barro"
                  }`}
                >
                  <span aria-hidden className="ink-mask absolute inset-[14%] text-ink" style={{ ["--src" as string]: `url(${asset(n.img)})` }} />
                  <span className="absolute -top-1 -left-1 flex size-7 items-center justify-center rounded-full bg-ink text-sm font-bold text-paper">
                    {i + 1}
                  </span>
                </m.span>
                <span
                  className={`font-display mt-2 rounded-full px-3 py-1 text-[13px] leading-tight font-bold whitespace-nowrap shadow-[0_0_0_1.5px_var(--ink)] sm:text-[15px] ${
                    on ? "bg-ink text-paper" : "bg-paper"
                  }`}
                >
                  {n.title}
                </span>
              </m.button>
            );
          })}
        </div>

        {/* Detalle de la etapa elegida */}
        <div className="lg:col-span-5">
          <div className="rounded-[var(--radius-block)] bg-salvia p-6 sm:p-8" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={node.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { duration: dur.slow, ease: easeOut } }}
                exit={{ opacity: 0, y: -6, transition: { duration: exitDur(dur.base) } }}
                className="grid grid-cols-[5rem_1fr] items-start gap-5"
              >
                <span className="relative block aspect-square rounded-full bg-paper shadow-[0_0_0_2px_var(--ink)]">
                  <span aria-hidden className="ink-mask absolute inset-[14%]" style={{ ["--src" as string]: `url(${asset(node.img)})` }} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-muted">
                    {sel + 1} / {N}
                  </p>
                  <p className="font-display text-2xl font-extrabold tracking-tight">{node.title}</p>
                  <p className="mt-2 text-muted">
                    <Glossed text={node.flow} />
                  </p>
                  <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-paper px-3 py-1 text-sm font-semibold shadow-[0_0_0_1.5px_var(--ink)]">
                    → {next.title}
                  </p>
                </div>
              </m.div>
            </AnimatePresence>
            {/* progreso del recorrido */}
            <div className="mt-6 flex gap-1.5" aria-hidden>
              {ciclo.nodes.map((_, i) => (
                <span key={i} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i === sel ? "bg-ink" : "bg-ink/15"}`} />
              ))}
            </div>
          </div>
          <p className="mt-3 text-sm text-muted">{auto && !reduce ? ciclo.autoHint : ui.cycleHint}</p>
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
