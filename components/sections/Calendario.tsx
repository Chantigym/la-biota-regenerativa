"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useInView, useReducedMotion } from "motion/react";
import { Clock } from "@phosphor-icons/react";
import { calendario, recetas } from "@/content/site";
import { haptic } from "@/lib/haptic";

const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

// Calendario de estación: verduras por mes. Al entrar en pantalla se desplaza solo hasta el mes actual
// (en pantallas angostas, donde la tabla scrollea de costado) y lo marca con un pulso.
export function Calendario() {
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const [month, setMonth] = useState<number | null>(null);
  const [sel, setSel] = useState<number | null>(null);

  // El mes actual se calcula en el navegador (el sitio es estático); arranca seleccionado
  useEffect(() => {
    const now = new Date().getMonth();
    setMonth(now);
    setSel(now);
  }, []);
  const disponibles = sel === null ? [] : calendario.crops.filter((c) => c.months.includes(sel)).map((c) => c.name);
  const recetasDelMes = recetas.items.filter((r) => r.crops.some((c) => disponibles.includes(c))).slice(0, 3);

  useEffect(() => {
    if (!inView || month === null || !wrap.current) return;
    const el = wrap.current;
    const col = el.querySelector<HTMLElement>(`[data-month="${month}"]`);
    if (col && el.scrollWidth > el.clientWidth) {
      el.scrollTo({ left: col.offsetLeft - el.clientWidth / 2 + col.offsetWidth / 2, behavior: reduce ? "auto" : "smooth" });
    }
  }, [inView, month, reduce]);

  return (
    <div className="mt-20 lg:mt-28">
      <h3 className="text-3xl font-extrabold sm:text-4xl">{calendario.title}</h3>
      <p className="mt-3 max-w-[60ch] text-lg text-muted">{calendario.lead}</p>
      <p className="mt-4 min-h-7 font-semibold" aria-live="polite">
        {sel !== null && (
          <>
            En {MESES[sel]}: <span className="font-normal text-muted">{disponibles.length ? disponibles.join(", ") : "sin verduras en este calendario de muestra"}.</span>
          </>
        )}
      </p>

      <div ref={wrap} className="mt-8 overflow-x-auto rounded-[var(--radius-block)] bg-salvia p-4 sm:p-6">
        <table className="w-full min-w-[720px] table-fixed border-separate border-spacing-x-1 border-spacing-y-1.5 text-left">
          <caption className="sr-only">
            {calendario.title}: meses en los que hay cada verdura
            {month !== null ? `. Mes actual: ${calendario.months[month]}` : ""}
          </caption>
          <thead>
            <tr>
              <th scope="col" className="w-32 pb-2 text-sm font-semibold">
                Verdura
              </th>
              {calendario.months.map((mName, i) => (
                <th
                  key={mName}
                  scope="col"
                  data-month={i}
                  aria-current={i === month ? "date" : undefined}
                  className="relative pb-2 text-center text-sm font-semibold"
                >
                  <button
                    type="button"
                    onClick={() => {
                      haptic();
                      setSel(i);
                    }}
                    aria-pressed={sel === i}
                    aria-label={`Ver qué hay en ${MESES[i]}${i === month ? " (mes actual)" : ""}`}
                    className="min-h-9 w-full rounded-full"
                  >
                    <m.span
                      className={`inline-block rounded-full px-2 py-0.5 transition-colors duration-200 ${
                        sel === i ? "bg-ink text-paper" : i === month ? "shadow-[0_0_0_1.5px_var(--ink)]" : "hover:bg-paper"
                      }`}
                      animate={i === month && inView && !reduce ? { scale: [1, 1.25, 1, 1.15, 1] } : undefined}
                      transition={{ duration: 1.1, delay: 0.5, ease: "easeInOut" }}
                    >
                      {mName}
                    </m.span>
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {calendario.crops.map((c) => (
              <tr key={c.name}>
                <th scope="row" className="pr-3 font-semibold">
                  {c.name}
                </th>
                {calendario.months.map((mName, i) => {
                  const on = c.months.includes(i);
                  return (
                    <td key={mName} className="p-0">
                      <span
                        className={`block h-7 rounded-md ${on ? "bg-monte" : "bg-paper/70"} ${
                          i === sel ? "outline-2 outline-offset-1 outline-ink" : ""
                        }`}
                        title={`${c.name}, ${mName}: ${on ? "disponible" : "no disponible"}`}
                      >
                        <span className="sr-only">{on ? "disponible" : "no disponible"}</span>
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted">
        <span className="inline-flex items-center gap-2">
          <span aria-hidden className="inline-block size-3.5 rounded bg-monte" /> Disponible
        </span>
        <span className="inline-flex items-center gap-2">
          <span aria-hidden className="inline-block size-3.5 rounded bg-paper shadow-[inset_0_0_0_1px_var(--muted)]" /> No disponible
        </span>
        <span>{calendario.note}</span>
      </p>

      {/* Recetas de estación: según el mes elegido en el calendario */}
      <div className="mt-16">
        <h3 className="text-3xl font-extrabold sm:text-4xl">{recetas.title}</h3>
        <p className="mt-3 max-w-[60ch] text-lg text-muted">
          {recetas.lead} {sel !== null && <span className="font-semibold text-ink">Ahora: {MESES[sel]}.</span>}
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {recetasDelMes.map((r) => (
              <m.li
                key={r.name}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="rounded-[var(--radius-block)] bg-barro p-6"
              >
                <p className="font-display text-xl font-bold tracking-tight">{r.name}</p>
                <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold">
                  <Clock size={16} weight="bold" aria-hidden /> {r.time} · {r.crops.join(", ")}
                </p>
                <p className="mt-3 text-[15px] text-muted">{r.text}</p>
              </m.li>
            ))}
          </AnimatePresence>
        </ul>
        {recetasDelMes.length === 0 && <p className="mt-4 text-muted">No hay recetas de muestra para este mes.</p>}
        <p className="mt-3 text-sm text-muted">{recetas.note}</p>
      </div>
    </div>
  );
}
