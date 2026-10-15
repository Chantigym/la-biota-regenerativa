"use client";

import { useEffect, useState } from "react";

// Devuelve el id de la sección que cruza la franja central de la ventana (null en el hero).
// Un IntersectionObserver por instancia; no escucha el scroll.
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id === "inicio" ? null : e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    const hero = document.getElementById("inicio");
    if (hero) io.observe(hero);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join()]);
  return active;
}
