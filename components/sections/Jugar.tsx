"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, m } from "motion/react";
import { ArrowCounterClockwise, Check } from "@phosphor-icons/react";
import { SectionFurrow } from "@/components/brand/SectionFurrow";
import { bolson, calendario, quiz, sembrar, ui } from "@/content/site";
import { haptic } from "@/lib/haptic";
import { dur, easeOut, exitDur } from "@/lib/motion";

// Aprender jugando: sembrar en el surco, armar un bolsón y un quiz de consumo local.

function Brote({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 32" aria-hidden className={className} fill="currentColor">
      <path d="M12 32 C12 25 11.2 19 12 12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M11.6 19.5 C6.5 19.8 3 16.5 2.6 11.6 C7.6 11.4 11 14.6 11.6 19.5 Z" />
      <path d="M12.2 13.4 C12.6 7.6 16.4 4 21.6 3.8 C21.7 9.4 17.8 13 12.2 13.4 Z" />
    </svg>
  );
}

/* ---------- Sembrá en el surco ---------- */
function Sembrar() {
  const [planted, setPlanted] = useState<boolean[]>(() => Array(sembrar.holes).fill(false));
  const holes = useRef<(HTMLButtonElement | null)[]>([]);
  const left = planted.filter((p) => !p).length;

  const plant = (i: number) => {
    if (planted[i]) return;
    haptic(18);
    setPlanted((p) => p.map((v, k) => (k === i ? true : v)));
  };
  // soltar una semilla: se planta en el hueco libre más cercano al punto donde se suelta
  const drop = (x: number, y: number) => {
    let best = -1;
    let bestD = 90;
    holes.current.forEach((el, i) => {
      if (!el || planted[i]) return;
      const r = el.getBoundingClientRect();
      const d = Math.hypot(r.left + r.width / 2 - x, r.top + r.height / 2 - y);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    if (best >= 0) plant(best);
  };

  return (
    <div className="rounded-[var(--radius-block)] bg-salvia p-6 sm:p-8">
      <h3 className="text-2xl font-extrabold sm:text-3xl">{sembrar.title}</h3>
      <p className="mt-2 text-muted">{sembrar.lead}</p>

      {/* semillas para arrastrar */}
      <div className="mt-6 flex min-h-12 flex-wrap items-center gap-3" aria-hidden>
        {Array.from({ length: left }).map((_, i) => (
          <m.span
            key={`${left}-${i}`}
            drag
            dragSnapToOrigin
            dragElastic={0.6}
            whileDrag={{ scale: 1.3, zIndex: 20 }}
            onDragEnd={(_, info) => drop(info.point.x - window.scrollX, info.point.y - window.scrollY)}
            className="block size-6 cursor-grab touch-none rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-[#8a6a3c] shadow-[0_0_0_2px_var(--ink)] active:cursor-grabbing"
          />
        ))}
        {left === 0 && <p className="font-semibold">{sembrar.done}</p>}
      </div>

      {/* surco con huecos (también se siembra tocando el hueco) */}
      <div className="relative mt-8">
        <span aria-hidden className="absolute inset-x-0 bottom-3 block h-[3px] rounded-full bg-ink" />
        <ol className="relative flex justify-between px-2">
          {planted.map((p, i) => (
            <li key={i} className="flex flex-col items-center">
              <span className="flex h-14 items-end">
                <AnimatePresence>
                  {p && (
                    <m.span
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      exit={{ scaleY: 0, transition: { duration: exitDur(dur.base) } }}
                      transition={{ type: "spring", stiffness: 260, damping: 14 }}
                      className="block origin-bottom text-monte"
                    >
                      <Brote className="h-12 w-9" />
                    </m.span>
                  )}
                </AnimatePresence>
              </span>
              <button
                ref={(el) => {
                  holes.current[i] = el;
                }}
                type="button"
                onClick={() => plant(i)}
                disabled={p}
                aria-label={p ? ui.games.planted(i + 1) : ui.games.plantIn(i + 1)}
                className="relative z-10 size-11 rounded-full disabled:cursor-default"
              >
                <span aria-hidden className={`mx-auto block h-4 w-8 rounded-b-full ${p ? "bg-[#8a6a3c]" : "bg-paper shadow-[inset_0_0_0_2px_var(--ink)]"}`} />
              </button>
            </li>
          ))}
        </ol>
      </div>
      <p className="mt-4 text-sm font-semibold" aria-live="polite">
        {left === 0 ? sembrar.done : ui.games.holesLeft(left)}
      </p>
      {left === 0 && (
        <button type="button" onClick={() => setPlanted(Array(sembrar.holes).fill(false))} className="btn btn-line mt-4 !min-h-11">
          <ArrowCounterClockwise size={18} weight="bold" aria-hidden /> {ui.games.again}
        </button>
      )}
    </div>
  );
}

/* ---------- Armá tu bolsón ---------- */
function Bolson() {
  const [mes, setMes] = useState<number | null>(null);
  const [items, setItems] = useState<string[]>([]);
  useEffect(() => setMes(new Date().getMonth()), []);
  const disponibles = mes === null ? [] : calendario.crops.filter((c) => c.months.includes(mes)).map((c) => c.name);
  const lleno = items.length >= bolson.max;

  const toggle = (name: string) => {
    haptic();
    setItems((it) => (it.includes(name) ? it.filter((n) => n !== name) : it.length >= bolson.max ? it : [...it, name]));
  };

  return (
    <div className="rounded-[var(--radius-block)] bg-barro p-6 sm:p-8">
      <h3 className="text-2xl font-extrabold sm:text-3xl">{bolson.title}</h3>
      <p className="mt-2 text-muted">{bolson.lead}</p>
      <LayoutGroup>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold">{ui.games.available}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {disponibles.map((n) => {
                const on = items.includes(n);
                return (
                  <li key={n}>
                    <button
                      type="button"
                      onClick={() => toggle(n)}
                      aria-pressed={on}
                      disabled={!on && lleno}
                      className={`inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 text-[15px] font-semibold transition-colors duration-200 disabled:opacity-40 ${
                        on ? "bg-monte text-on-monte" : "bg-paper shadow-[inset_0_0_0_1.5px_var(--ink)] hover:bg-salvia"
                      }`}
                    >
                      {on && <Check size={16} weight="bold" aria-hidden />}
                      {n}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* el bolsón */}
          <div className="relative mx-auto w-full max-w-[260px]">
            <svg viewBox="0 0 200 220" className="block w-full text-ink" aria-hidden fill="none">
              <path d="M62 52 C62 22 138 22 138 52" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
              <path d="M24 56 L176 56 L162 206 Q160 214 152 214 L48 214 Q40 214 38 206 Z" fill="var(--paper)" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
            </svg>
            <ul className="absolute inset-x-[16%] top-[32%] bottom-[8%] flex flex-col-reverse flex-wrap content-center items-center justify-start gap-1" aria-label={ui.games.bagAria}>
              <AnimatePresence>
                {items.map((n) => (
                  <m.li
                    key={n}
                    layout
                    initial={{ y: -80, opacity: 0, rotate: -8 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: -40, opacity: 0, transition: { duration: exitDur(dur.base) } }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="rounded-full bg-monte px-3 py-1 text-[13px] font-semibold text-on-monte"
                  >
                    {n}
                  </m.li>
                ))}
              </AnimatePresence>
            </ul>
            <p className="mt-2 text-center text-sm font-semibold" aria-live="polite">
              {ui.games.count(items.length, bolson.max, lleno)}
            </p>
          </div>
        </div>
      </LayoutGroup>
      <p className="mt-4 text-sm text-muted">{bolson.note}</p>
    </div>
  );
}

/* ---------- Quiz de consumo local ---------- */
function Quiz() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const total = quiz.questions.length;
  const done = step >= total;
  const result = [...quiz.results].reverse().find((r) => score >= r.min) ?? quiz.results[0];

  const answer = (pts: number) => {
    haptic();
    setScore((s) => s + pts);
    setStep((s) => s + 1);
  };

  return (
    <div className="rounded-[var(--radius-block)] p-6 shadow-[inset_0_0_0_1.5px_var(--ink)] sm:p-8 lg:col-span-2">
      <h3 className="text-2xl font-extrabold sm:text-3xl">{quiz.title}</h3>
      <p className="mt-2 text-muted">{quiz.lead}</p>
      {/* progreso */}
      <div className="mt-5 flex gap-1.5" aria-hidden>
        {quiz.questions.map((_, i) => (
          <span key={i} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i < step ? "bg-yema" : "bg-ink/15"}`} />
        ))}
      </div>
      <div className="mt-6 min-h-[11rem]" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          {!done ? (
            <m.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0, transition: { duration: dur.slow, ease: easeOut } }}
              exit={{ opacity: 0, x: -16, transition: { duration: exitDur(dur.base) } }}
            >
              <p className="text-sm font-semibold text-muted">
                {ui.games.question(step + 1, total)}
              </p>
              <p className="font-display mt-1 text-2xl font-bold tracking-tight">{quiz.questions[step].q}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {quiz.questions[step].options.map((o, i) => (
                  <button key={o} type="button" onClick={() => answer(quiz.questions[step].points[i])} className="btn btn-line !min-h-11">
                    {o}
                  </button>
                ))}
              </div>
            </m.div>
          ) : (
            <m.div
              key="resultado"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: dur.slow, ease: easeOut } }}
              className="rounded-[var(--radius-block)] bg-yema p-6 text-on-yema"
            >
              <p className="text-sm font-semibold">
                {ui.games.result(score, total * 2)}
              </p>
              <p className="font-display mt-1 text-3xl font-extrabold">{result.title}</p>
              <p className="mt-2">{result.text}</p>
              <button
                type="button"
                onClick={() => {
                  setStep(0);
                  setScore(0);
                }}
                className="btn btn-solid mt-5 !min-h-11"
              >
                <ArrowCounterClockwise size={18} weight="bold" aria-hidden /> {ui.games.restart}
              </button>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function Jugar() {
  return (
    <section id="jugar" aria-labelledby="jugar-title" className="px-4 pb-24 sm:px-6 lg:pb-36">
      <SectionFurrow className="mx-auto max-w-[1240px]">
        <h2 id="jugar-title" className="text-4xl font-extrabold sm:text-5xl">
          {ui.games.title}
        </h2>
        <p className="mt-4 max-w-[60ch] text-lg text-muted">{ui.games.lead}</p>
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <Sembrar />
          <Bolson />
          <Quiz />
        </div>
      </SectionFurrow>
    </section>
  );
}
