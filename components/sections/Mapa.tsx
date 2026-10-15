"use client";

import { useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { ArrowsOut } from "@phosphor-icons/react";
import { SectionFurrow } from "@/components/brand/SectionFurrow";
import { mapa } from "@/content/site";
import { asset } from "@/lib/asset";
import { dur, easeOut, exitDur } from "@/lib/motion";

const ZOOM = 1.7;
const zoomMove = { type: "spring", stiffness: 120, damping: 22 } as const;

// Desplazamiento (en % del propio mapa) para centrar un punto con el zoom aplicado,
// sin mostrar bordes vacíos.
function centerOn(p: number) {
  const max = ((ZOOM - 1) / 2) * 100;
  const v = -(p / 100 - 0.5) * ZOOM * 100;
  return `${Math.max(-max, Math.min(max, v))}%`;
}

export function Mapa() {
  const [sel, setSel] = useState<string | null>(null);
  const point = mapa.points.find((p) => p.id === sel);

  return (
    <section id="el-mantillo" aria-labelledby="mapa-title" className="px-4 pb-24 sm:px-6 lg:pb-36">
      <SectionFurrow className="mx-auto max-w-[1240px]">
        <h2 id="mapa-title" className="text-4xl font-extrabold sm:text-5xl">
          {mapa.title}
        </h2>
        <p className="mt-4 max-w-[60ch] text-lg text-muted">{mapa.lead}</p>

        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          {/* Mapa */}
          <div className="relative overflow-hidden rounded-[var(--radius-block)] bg-salvia lg:col-span-8">
            <m.div
              className="relative"
              style={{ aspectRatio: "1400 / 903" }}
              animate={point ? { scale: ZOOM, x: centerOn(point.x), y: centerOn(point.y) } : { scale: 1, x: "0%", y: "0%" }}
              transition={zoomMove}
            >
              <span className="ink-mask absolute inset-0" style={{ ["--src" as string]: `url(${asset("/illustrations/mapa.webp")})` }} />
              {mapa.points.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSel(sel === p.id ? null : p.id)}
                  aria-pressed={sel === p.id}
                  aria-label={p.title}
                  className="group absolute flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                >
                  <span
                    className={`flex size-7 items-center justify-center rounded-full text-sm font-bold shadow-[0_0_0_2px_var(--ink)] transition-transform duration-200 group-hover:scale-110 ${
                      sel === p.id ? "bg-ink text-paper" : "bg-yema text-on-yema"
                    }`}
                  >
                    {i + 1}
                  </span>
                </button>
              ))}
            </m.div>
            {point && (
              <button
                type="button"
                onClick={() => setSel(null)}
                className="btn btn-solid absolute right-3 bottom-3 !min-h-10 !px-4 text-sm"
              >
                <ArrowsOut size={18} weight="bold" aria-hidden />
                Ver todo
              </button>
            )}
          </div>

          {/* Detalle del punto y lista (también sirve sin el mapa, con teclado o lector de pantalla) */}
          <div className="lg:col-span-4">
            <div className="min-h-[9.5rem] rounded-[var(--radius-block)] bg-yema p-6 text-on-yema" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  key={point?.id ?? "nada"}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: dur.base, ease: easeOut } }}
                  exit={{ opacity: 0, transition: { duration: exitDur(dur.base) } }}
                >
                  {point ? (
                    <>
                      <p className="font-display text-2xl font-bold tracking-tight">{point.title}</p>
                      <p className="mt-2">{point.text}</p>
                    </>
                  ) : (
                    <p className="font-medium">Elegí un punto del mapa o de la lista para ver qué se hace en cada sector.</p>
                  )}
                </m.div>
              </AnimatePresence>
            </div>
            <ol className="mt-4 grid gap-1">
              {mapa.points.map((p, i) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => setSel(sel === p.id ? null : p.id)}
                    aria-pressed={sel === p.id}
                    className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left font-medium transition-colors duration-200 ${
                      sel === p.id ? "bg-ink text-paper" : "hover:bg-salvia"
                    }`}
                  >
                    <span className="w-5 text-right font-bold tabular-nums">{i + 1}</span>
                    {p.title}
                  </button>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm text-muted">{mapa.note}</p>
          </div>
        </div>
      </SectionFurrow>
    </section>
  );
}
