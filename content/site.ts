// Punto de entrada del contenido: elige el idioma según NEXT_PUBLIC_LOCALE (se fija en el build).
// El sitio se compila dos veces: castellano en la raíz e inglés en /en (ver scripts/build-pages.mjs).
import * as en from "./en";
import * as es from "./es";

export type { Categoria, HitoEstado, Nivel, Subproyecto } from "./es";

export const locale: "es" | "en" = process.env.NEXT_PUBLIC_LOCALE === "en" ? "en" : "es";
const c = (locale === "en" ? en : es) as typeof es;

export const {
  sample,
  site,
  nav,
  hero,
  quienes,
  queHacemos,
  metodologia,
  haciaDonde,
  hoy,
  estadoLabel,
  mapa,
  calendario,
  ciclo,
  suelo,
  glosario,
  video,
  apoyar,
  region,
  clima,
  gallina,
  autocert,
  agua,
  semillas,
  preguntas,
  seguinos,
  ui,
} = c;
