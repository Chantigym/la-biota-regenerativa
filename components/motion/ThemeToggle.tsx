"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "@phosphor-icons/react";

// Modo "campo de noche": botón para elegir claro u oscuro. La preferencia se recuerda en este navegador
// (si no hay, sigue al sistema). El script de layout.tsx la aplica antes de pintar, sin parpadeo.
export function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    const t = document.documentElement.dataset.theme;
    setDark(t ? t === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    try {
      localStorage.setItem("biota-tema", next ? "dark" : "light");
    } catch {
      /* sin almacenamiento: el cambio dura hasta recargar */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark ?? undefined}
      aria-label={dark ? "Cambiar a modo día" : "Cambiar a modo noche"}
      className="inline-flex size-11 items-center justify-center rounded-full transition-colors duration-200 hover:bg-salvia"
    >
      {dark ? <Sun size={22} weight="bold" aria-hidden /> : <Moon size={22} weight="bold" aria-hidden />}
    </button>
  );
}
