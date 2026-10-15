"use client";

import { useMemo, useState } from "react";
import { LayoutGroup, m } from "motion/react";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { autocert, type Categoria, type Nivel } from "@/content/site";
import { dur, easeOut } from "@/lib/motion";

const move = { type: "spring", stiffness: 380, damping: 38 } as const;

// Búsqueda sin distinguir mayúsculas ni tildes
const norm = (t: string) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

type Vista = "nivel" | "categoria";

const levelOrder: Nivel[] = ["verde", "amarillo", "naranja"];
const categoryOrder = Object.keys(autocert.categories) as Categoria[];
const levelName = Object.fromEntries(autocert.levels.map((l) => [l.id, l.name])) as Record<Nivel, string>;
const levelSummary = Object.fromEntries(autocert.levels.map((l) => [l.id, l.summary])) as Record<Nivel, string>;

const swatch: Record<Nivel, string> = {
  verde: "bg-cert-verde text-on-cert-verde",
  amarillo: "bg-cert-amarillo text-on-cert-amarillo",
  naranja: "bg-cert-naranja text-on-cert-naranja",
};

export function LevelBadge({ level }: { level: Nivel }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${swatch[level]}`}>
      {levelName[level]}
    </span>
  );
}

export function ProductList() {
  const [vista, setVista] = useState<Vista>("nivel");
  const [q, setQ] = useState("");

  const groups = useMemo(() => {
    const nq = norm(q.trim());
    const visibles = nq
      ? autocert.products.filter((p) => norm(`${p.name} ${autocert.categories[p.category]} ${p.origin} ${levelName[p.level]}`).includes(nq))
      : autocert.products;
    const byName = (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name, "es");
    if (vista === "nivel") {
      return levelOrder.map((l) => ({
        key: l,
        title: `${levelName[l]}: ${levelSummary[l]}`,
        level: l as Nivel | undefined,
        items: visibles.filter((p) => p.level === l).sort(byName),
      }));
    }
    return categoryOrder.map((c) => ({
      key: c,
      title: autocert.categories[c],
      level: undefined,
      items: visibles
        .filter((p) => p.category === c)
        .sort((a, b) => levelOrder.indexOf(a.level) - levelOrder.indexOf(b.level) || byName(a, b)),
    }));
  }, [vista, q]);
  const total = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <div>
      {/* Búsqueda y orden */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="w-full sm:max-w-sm">
        <label htmlFor="buscar-producto" className="text-sm font-semibold">
          Buscar producto
        </label>
        <div className="relative mt-2">
          <MagnifyingGlass size={20} weight="bold" aria-hidden className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted" />
          <input
            id="buscar-producto"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Ej.: huevos, conservas, miel"
            autoComplete="off"
            className="min-h-12 w-full rounded-full bg-paper pr-11 pl-11 text-[16px] shadow-[inset_0_0_0_1.5px_var(--ink)] placeholder:text-muted"
          />
          {q && (
            <button
              type="button"
              onClick={() => setQ("")}
              aria-label="Borrar búsqueda"
              className="absolute top-1/2 right-1.5 flex size-9 -translate-y-1/2 items-center justify-center rounded-full hover:bg-salvia"
            >
              <X size={18} weight="bold" aria-hidden />
            </button>
          )}
        </div>
      </div>
      <div>
        <p id="orden-label" className="text-sm font-semibold">
          Ordenar por
        </p>
        <div role="group" aria-labelledby="orden-label" className="mt-2 inline-flex rounded-full bg-salvia p-1">
          {(
            [
              ["nivel", "Certificación"],
              ["categoria", "Categoría"],
            ] as [Vista, string][]
          ).map(([v, label]) => (
            <button
              key={v}
              type="button"
              aria-pressed={vista === v}
              onClick={() => setVista(v)}
              className={`min-h-11 rounded-full px-5 text-[15px] font-semibold transition-colors duration-200 ${
                vista === v ? "bg-ink text-paper" : "hover:bg-ink/10"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {q ? `${total} productos encontrados` : ""}
      </p>
      {total === 0 && (
        <div className="mt-10 rounded-[var(--radius-block)] bg-salvia p-6">
          <p className="font-semibold">No hay productos que coincidan con «{q}».</p>
          <p className="mt-1 text-muted">Probá con otra palabra, una categoría (Huerta, Granja, Conservas, Almacén) o un nivel (Verde, Amarillo, Naranja).</p>
          <button type="button" onClick={() => setQ("")} className="btn btn-solid mt-4 !min-h-11">
            Ver todos los productos
          </button>
        </div>
      )}

      {/* Lista agrupada: al cambiar el orden, cada producto viaja a su nuevo lugar (layoutId) */}
      <LayoutGroup>
        <div className="mt-10 grid gap-12">
          {groups
            .filter((g) => g.items.length > 0)
            .map((g) => (
              <m.div key={g.key} layout="position" transition={move}>
                <m.h4
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: dur.base, ease: easeOut } }}
                  className="flex items-center gap-3 font-display text-2xl font-bold tracking-tight"
                >
                  {g.level && <span aria-hidden className={`size-4 shrink-0 rounded-full ${swatch[g.level]}`} />}
                  {g.title}
                  <span className="text-base font-medium text-muted">({g.items.length})</span>
                </m.h4>
                <ul className="mt-4">
                  {g.items.map((p) => (
                    <m.li
                      key={p.name}
                      layoutId={`producto-${p.name}`}
                      transition={move}
                      className="grid gap-2 border-t-[1.5px] border-ink/15 bg-paper py-4 sm:grid-cols-[8.5rem_1fr_auto] sm:items-center sm:gap-6"
                    >
                      <span>
                        <LevelBadge level={p.level} />
                      </span>
                      <span>
                        <span className="block text-lg font-semibold">{p.name}</span>
                        <span className="block text-[15px] text-muted">{p.note}</span>
                      </span>
                      <span className="text-[15px] text-muted sm:text-right">
                        <span className="block font-semibold text-ink">{autocert.categories[p.category]}</span>
                        {p.origin}
                      </span>
                    </m.li>
                  ))}
                </ul>
              </m.div>
            ))}
        </div>
      </LayoutGroup>
    </div>
  );
}
