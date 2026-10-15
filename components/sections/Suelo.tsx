"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { RiseBlock } from "@/components/motion/RiseBlock";
import { suelo } from "@/content/site";
import { asset } from "@/lib/asset";
import { dur, easeOut, exitDur } from "@/lib/motion";

// "Excavar el suelo": en pantallas anchas la sección queda fija mientras scrolleás y el corte del suelo
// sube, como si bajaras por sus capas; el texto cambia según la capa. En mobile y con reduced motion,
// las capas se muestran en lista junto a la ilustración, sin scroll fijo.
const N = suelo.layers.length;

function Layers({ active }: { active: number }) {
  const layer = suelo.layers[active];
  return (
    <div>
      <p className="text-sm font-semibold opacity-75">
        Capa {active + 1} de {N}
      </p>
      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={active}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0, transition: { duration: dur.slow, ease: easeOut } }}
          exit={{ opacity: 0, y: -10, transition: { duration: exitDur(dur.slow) } }}
        >
          <h3 className="mt-2 text-4xl font-extrabold sm:text-5xl">{layer.title}</h3>
          <p className="mt-4 max-w-[42ch] text-lg leading-relaxed opacity-90">{layer.text}</p>
        </m.div>
      </AnimatePresence>
      <ol className="mt-8 flex gap-2" aria-hidden>
        {suelo.layers.map((l, i) => (
          <li key={l.title} className={`h-1.5 w-8 rounded-full transition-colors duration-300 ${i <= active ? "bg-yema" : "bg-current/25"}`} />
        ))}
      </ol>
    </div>
  );
}

export function Suelo() {
  const reduce = useReducedMotion() ?? false;
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(N - 1, Math.floor(v * N));
    if (i !== active) setActive(i);
  });
  // la ilustración sube a medida que bajás (mostrando capas más profundas), justo hasta su borde inferior
  const frame = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLSpanElement>(null);
  const shift = useRef(0);
  useEffect(() => {
    const measure = () => {
      if (!frame.current || !img.current) return;
      const extra = img.current.offsetHeight + 48 - frame.current.clientHeight;
      shift.current = Math.max(0, extra);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  const y = useTransform(scrollYProgress, (v) => -v * shift.current);
  // una lombriz cruza el corte mientras bajás por la capa de fauna
  const wormX = useTransform(scrollYProgress, [0.35, 0.65], ["-15%", "110%"]);

  return (
    <section id="biota" aria-labelledby="biota-title" className="px-3 pb-24 sm:px-4 lg:pb-36">
      <RiseBlock className="mx-auto max-w-[1400px] rounded-[var(--radius-block)] bg-[#2b241d] text-[#efe9df] [--focus:#efe9df]">
        <div className="px-5 pt-16 sm:px-10 lg:px-14 lg:pt-24">
          <div className="mx-auto max-w-[1240px]">
            <h2 id="biota-title" className="text-4xl font-extrabold sm:text-5xl">
              {suelo.title}
            </h2>
            <p className="mt-4 max-w-[60ch] text-lg opacity-85">{suelo.lead}</p>
          </div>
        </div>

        {/* Desktop con movimiento: recorrido fijo */}
        {!reduce && (
          <div ref={track} className="relative hidden lg:block" style={{ height: `${N * 70}vh` }}>
            <div className="sticky top-16 mx-auto grid h-[calc(100dvh-64px)] max-w-[1240px] grid-cols-12 items-center gap-6 px-14">
              <div className="col-span-5">
                <Layers active={active} />
              </div>
              <div ref={frame} className="relative col-span-6 col-start-7 h-[86%] overflow-hidden rounded-[var(--radius-block)] bg-[#3a3027]">
                <m.span
                  ref={img}
                  aria-hidden
                  className="ink-mask absolute inset-x-6 top-6 text-[#efe9df]"
                  style={{ ["--src" as string]: `url(${asset("/illustrations/suelo.webp")})`, aspectRatio: "900 / 1709", y }}
                />
                {/* lombriz */}
                <m.div aria-hidden className="pointer-events-none absolute inset-x-0 top-[46%]" style={{ x: wormX }}>
                  <svg viewBox="0 0 90 24" className="lombriz block w-24 text-[#e7a98f]" fill="none">
                    <path d="M4 14 C 14 4, 24 4, 34 14 S 54 24, 64 14 S 80 6, 86 10" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
                    <circle cx="84" cy="10" r="1.6" fill="#2b241d" />
                  </svg>
                </m.div>
                {/* microorganismos: aparecen en la capa más profunda */}
                <div
                  aria-hidden
                  className={`pointer-events-none absolute inset-x-6 bottom-6 h-1/3 text-[#efe9df] transition-opacity duration-700 ${active === N - 1 ? "opacity-100" : "opacity-0"}`}
                >
                  {[
                    [8, 20, 10], [22, 60, 7], [35, 30, 12], [48, 70, 8], [60, 15, 9], [72, 50, 11], [85, 25, 7], [15, 80, 9], [55, 85, 6], [90, 70, 10],
                  ].map(([x, yy, sz], k) => (
                    <span key={k} className="microbio" style={{ left: `${x}%`, top: `${yy}%`, width: sz, height: sz * 0.7, ["--k" as string]: k }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile (y reduced motion): lista de capas */}
        <div className={`px-5 pt-10 pb-16 sm:px-10 ${reduce ? "" : "lg:hidden"}`}>
          <div className="mx-auto grid max-w-[1240px] gap-10 sm:grid-cols-2">
            <span
              aria-hidden
              className="ink-mask mx-auto w-full max-w-[320px] text-[#efe9df]"
              style={{ ["--src" as string]: `url(${asset("/illustrations/suelo.webp")})`, aspectRatio: "900 / 1709" }}
            />
            <ol className="grid content-start gap-7">
              {suelo.layers.map((l, i) => (
                <li key={l.title} className="border-l-[3px] border-yema pl-4">
                  <p className="text-sm font-semibold opacity-75">Capa {i + 1}</p>
                  <h3 className="text-2xl font-extrabold">{l.title}</h3>
                  <p className="mt-2 opacity-90">{l.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="hidden h-16 lg:block" />
      </RiseBlock>
    </section>
  );
}
