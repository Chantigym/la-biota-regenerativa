"use client";

import { useEffect, useRef, useState } from "react";
import { m, useInView, useReducedMotion } from "motion/react";
import { calendario } from "@/content/site";

// Calendario de estación: verduras por mes. Al entrar en pantalla se desplaza solo hasta el mes actual
// (en pantallas angostas, donde la tabla scrollea de costado) y lo marca con un pulso.
export function Calendario() {
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const [month, setMonth] = useState<number | null>(null);

  // El mes actual se calcula en el navegador (el sitio es estático)
  useEffect(() => setMonth(new Date().getMonth()), []);

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
                  {i === month && inView ? (
                    <m.span
                      className="inline-block rounded-full bg-ink px-2 py-0.5 text-paper"
                      initial={{ scale: 1 }}
                      animate={reduce ? undefined : { scale: [1, 1.25, 1, 1.15, 1] }}
                      transition={{ duration: 1.1, delay: 0.5, ease: "easeInOut" }}
                    >
                      {mName}
                    </m.span>
                  ) : (
                    <span className={i === month ? "inline-block rounded-full bg-ink px-2 py-0.5 text-paper" : ""}>{mName}</span>
                  )}
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
                          i === month ? "outline-2 outline-offset-1 outline-ink" : ""
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
    </div>
  );
}
