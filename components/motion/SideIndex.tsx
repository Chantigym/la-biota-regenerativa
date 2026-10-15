"use client";

import { m, useScroll, useTransform } from "motion/react";
import { useActiveSection } from "@/lib/useActiveSection";

// Índice lateral: un punto por sección, a la derecha (solo pantallas anchas, después del hero).
// El punto de la sección actual se agranda y se pinta; al pasar el mouse o con foco se ve el nombre.
const SECTIONS = [
  { id: "quienes-somos", label: "Comunidad" },
  { id: "el-mantillo", label: "El Mantillo" },
  { id: "que-hacemos", label: "El proyecto" },
  { id: "autocertificacion", label: "Autocertificación" },
  { id: "metodologia", label: "Metodología" },
  { id: "biota", label: "La biota del suelo" },
  { id: "hacia-donde", label: "Objetivos" },
  { id: "hoy", label: "El presente" },
  { id: "jugar", label: "Aprender jugando" },
  { id: "preguntas", label: "Preguntas" },
  { id: "apoyar", label: "Apoyar" },
  { id: "seguinos", label: "Instagram" },
];

export function SideIndex() {
  const active = useActiveSection(SECTIONS.map((s) => s.id));
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [450, 750], [0, 1]);

  return (
    <m.nav
      aria-label="Índice de secciones"
      style={{ opacity }}
      className="fixed top-1/2 right-5 z-30 hidden -translate-y-1/2 min-[1360px]:block"
    >
      <ol className="flex flex-col items-end gap-1">
        {SECTIONS.map((s) => {
          const on = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={on ? "location" : undefined}
                className="group flex min-h-7 items-center justify-end gap-3"
              >
                <span
                  className={`rounded-full bg-paper px-2.5 py-1 text-[13px] font-semibold whitespace-nowrap shadow-[0_0_0_1.5px_var(--ink)] transition-[opacity,translate] duration-200 ${
                    "pointer-events-none translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                  }`}
                >
                  {s.label}
                </span>
                <span
                  aria-hidden
                  className={`block rounded-full shadow-[0_0_0_1.5px_var(--ink)] transition-all duration-300 ${
                    on ? "size-3.5 bg-yema" : "size-2 bg-paper group-hover:size-3"
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ol>
    </m.nav>
  );
}
