"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { ArrowUp } from "@phosphor-icons/react";
import { asset } from "@/lib/asset";
import { dur, easeOut, exitDur } from "@/lib/motion";
import { ui } from "@/content/site";

// Botón flotante para volver al inicio: aparece cuando el hero sale de pantalla.
export function BackToTop() {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const hero = document.getElementById("inicio");
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting), { rootMargin: "0px 0px -40% 0px" });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <m.button
          type="button"
          aria-label={ui.backToTop}
          onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
          className="group fixed right-4 bottom-4 z-30 flex size-16 items-center justify-center rounded-full bg-yema text-on-yema shadow-[0_0_0_2px_var(--ink)] sm:right-6 sm:bottom-6"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: dur.base, ease: easeOut } }}
          exit={{ opacity: 0, y: 12, transition: { duration: exitDur(dur.base) } }}
          whileTap={{ scale: 0.94 }}
        >
          <span aria-hidden className="flex flex-col items-center transition-transform duration-200 group-hover:-translate-y-1">
            <ArrowUp size={16} weight="bold" />
            <span
              className="ink-mask w-10"
              style={{ ["--src" as string]: `url(${asset("/brand/logo-tractor-solo.webp")})`, aspectRatio: "360 / 245" }}
            />
          </span>
        </m.button>
      )}
    </AnimatePresence>
  );
}
