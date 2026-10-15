"use client";

import { useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { gallina } from "@/content/site";
import { asset } from "@/lib/asset";
import { dur, easeOut, exitDur } from "@/lib/motion";

// Gallina guía: aparece dando un saltito cuando la sección entra en pantalla; al tocarla
// (o pasar el mouse) muestra un dato corto sobre la sección.
export function GallinaTip({ section, className = "" }: { section: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const tip = gallina.tips[section];
  if (!tip) return null;
  return (
    <div className={`relative z-20 ${className}`} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <m.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Dato de la gallina guía"
        className="block size-16 sm:size-20"
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: [30, -10, 0], opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.6, ease: easeOut }}
        whileHover={{ rotate: -6 }}
        whileTap={{ scale: 0.92 }}
      >
        <span aria-hidden className="ink-mask aspect-square w-full" style={{ ["--src" as string]: `url(${asset("/illustrations/gallina.webp")})` }} />
      </m.button>
      <AnimatePresence>
        {open && (
          <m.p
            role="status"
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: dur.base, ease: easeOut } }}
            exit={{ opacity: 0, transition: { duration: exitDur(dur.base) } }}
            className="absolute right-full bottom-1/2 mr-2 w-[min(17rem,70vw)] origin-bottom-right rounded-2xl rounded-br-sm bg-ink p-3 text-[15px] leading-snug text-paper shadow-lg"
          >
            {tip}
          </m.p>
        )}
      </AnimatePresence>
    </div>
  );
}
