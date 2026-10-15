"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { Logo } from "@/components/brand/Logo";
import { nav } from "@/content/site";
import { dur, easeOut, exitDur } from "@/lib/motion";

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b-[1.5px] border-ink/15 bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-6 px-4 sm:px-6">
        <a href="#inicio" className="shrink-0" aria-label="La Biota Regenerativa, ir al inicio">
          <Logo variant="wordmark" className="h-9 text-ink" />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-[15px] font-medium">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="rounded-sm py-2 hover:underline hover:decoration-2 hover:underline-offset-[6px]">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full lg:hidden"
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} weight="bold" aria-hidden /> : <List size={24} weight="bold" aria-hidden />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <m.nav
            id="menu-movil"
            aria-label="Menú"
            key="menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0, transition: { duration: dur.base, ease: easeOut } }}
            exit={{ opacity: 0, y: -8, transition: { duration: exitDur(dur.base), ease: easeOut } }}
            className="absolute inset-x-0 top-full border-b-[1.5px] border-ink/15 bg-paper lg:hidden"
          >
            <ul className="mx-auto flex max-w-[1240px] flex-col px-4 py-3 sm:px-6">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="font-display block py-3 text-2xl font-bold tracking-tight"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
