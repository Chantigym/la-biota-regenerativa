import { readFileSync } from "node:fs";
import { join } from "node:path";
import { HeroSky } from "@/components/hero/HeroSky";
import { HeroTractor } from "@/components/hero/HeroTractor";
import { hero, ui } from "@/content/site";

// El tractor se inserta como SVG (se lee en el build) para poder dibujar su contorno con CSS
// y después entintarlo. Ver .draw-ink en globals.css.
const tractorSvg = readFileSync(join(process.cwd(), "public/brand/logo-tractor.svg"), "utf8");
const tractor = {
  viewBox: tractorSvg.match(/viewBox="([^"]+)"/)?.[1] ?? "0 0 1233 668",
  d: [...tractorSvg.matchAll(/ d="([^"]+)"/g)].map((m) => m[1]).join(" "),
};

export function Hero() {
  const words = hero.title.split(" ");
  return (
    <section id="inicio" aria-labelledby="hero-title" className="px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="relative isolate mx-auto grid min-h-[calc(100dvh-64px-12px)] max-w-[1400px] items-center gap-8 overflow-hidden rounded-[var(--radius-block)] bg-hero-bg px-5 py-12 text-hero-ink sm:min-h-[calc(100dvh-64px-16px)] sm:px-10 lg:grid-cols-12 lg:gap-4 lg:px-14 lg:py-16">
        <HeroSky />
        <div className="relative z-10 lg:col-span-6">
          <h1 id="hero-title" className="max-w-[18ch] text-[2.6rem] font-extrabold sm:text-6xl lg:text-[3.5rem] xl:text-[3.8rem]">
            {words.map((w, i) => (
              <span key={i}>
                <span className="hero-word" style={{ ["--w" as string]: i }}>
                  {w}
                </span>
                {i < words.length - 1 ? " " : ""}
              </span>
            ))}
          </h1>
          <p className="hero-rise mt-6 max-w-[42ch] text-lg leading-relaxed sm:text-xl" style={{ ["--i" as string]: words.length / 2 }}>
            {hero.lead}
          </p>
          <div className="hero-rise mt-9 flex flex-wrap gap-3" style={{ ["--i" as string]: words.length / 2 + 1 }}>
            <a href={hero.primary.href} className="btn btn-solid sprout-hover">
              {hero.primary.label}
            </a>
          </div>
        </div>

        <div className="relative z-10 lg:col-span-6">
          <HeroTractor>
          <svg
            role="img"
            aria-label={ui.heroAria}
            viewBox={tractor.viewBox}
            fillRule="evenodd"
            className="draw-ink mx-auto block w-full max-w-[760px] text-hero-fg lg:ml-auto lg:mr-0"
          >
            <path d={tractor.d} pathLength={1} />
          </svg>
          </HeroTractor>
        </div>
      </div>
    </section>
  );
}
