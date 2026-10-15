"use client";

import { useState } from "react";
import { AnimatePresence, m, useAnimationControls, useReducedMotion } from "motion/react";
import { gallina, ui } from "@/content/site";
import { dur, easeOut, exitDur } from "@/lib/motion";
import { asset } from "@/lib/asset";
import { cacarear } from "@/lib/sound";

// Gallina guía (ilustración en tinta). Aparece con un saltito cuando la sección entra en pantalla.
// Al tocarla salta (se estira y se aplasta al caer), cacarea si el sonido está activado y muestra un dato.
export function GallinaTip({ section, className = "" }: { section: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const jump = useAnimationControls();
  const tip = gallina.tips[section];
  if (!tip) return null;

  const onClick = () => {
    setOpen((v) => !v);
    cacarear();
    if (!reduce)
      jump.start({
        scaleY: [1, 0.86, 1.14, 1, 0.9, 1],
        scaleX: [1, 1.12, 0.9, 1, 1.08, 1],
        y: [0, 0, -22, -22, 0, 0],
        transition: { duration: 0.6, times: [0, 0.12, 0.35, 0.55, 0.78, 1], ease: "easeOut" },
      });
  };

  return (
    <div className={`relative z-20 ${className}`} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <m.button
        type="button"
        onClick={onClick}
        aria-expanded={open}
        aria-label={ui.hen}
        className="block size-16 sm:size-20"
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: [30, -10, 0], opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.6, ease: easeOut }}
      >
        <m.span animate={jump} className="block origin-bottom">
          <span aria-hidden className="ink-mask aspect-square w-full" style={{ ["--src" as string]: `url(${asset("/illustrations/gallina.webp")})` }} />
        </m.span>
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
