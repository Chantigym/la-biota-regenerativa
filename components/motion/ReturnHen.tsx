"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { Gallinita } from "@/components/motion/Gallinita";

// Si la persona se va a otra pestaña (más de 4 s) y vuelve, la gallinita asoma abajo a la derecha y saluda.
export function ReturnHen() {
  const [show, setShow] = useState(false);
  const leftAt = useRef<number | null>(null);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const onVis = () => {
      if (document.visibilityState === "hidden") {
        leftAt.current = Date.now();
      } else if (leftAt.current && Date.now() - leftAt.current > 4000) {
        setShow(true);
        clearTimeout(t);
        t = setTimeout(() => setShow(false), 3600);
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      clearTimeout(t);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed right-4 bottom-0 z-40 w-16 overflow-hidden sm:right-8 sm:w-20" style={{ height: 150 }}>
      <AnimatePresence>
        {show && (
          <m.div
            initial={{ y: 150 }}
            animate={{ y: 12, transition: { type: "spring", stiffness: 260, damping: 18 } }}
            exit={{ y: 150, transition: { duration: 0.25 } }}
            className="absolute inset-x-0 bottom-0"
          >
            <Gallinita pose="wave" className="w-full" />
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
