"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { glosario } from "@/content/site";
import { dur, easeOut, exitDur } from "@/lib/motion";

// Término del glosario: subrayado punteado; al tocarlo (o con Enter) muestra su definición.
export function Term({ term, children }: { term: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const ref = useRef<HTMLSpanElement>(null);
  const def = glosario[term.toLowerCase()];

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("click", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  if (!def) return <>{children}</>;
  return (
    <span ref={ref} className="relative inline">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-describedby={open ? id : undefined}
        className="cursor-help underline decoration-current/50 decoration-dotted decoration-2 underline-offset-4 hover:decoration-solid"
      >
        {children}
      </button>
      <AnimatePresence>
        {open && (
          <m.span
            id={id}
            role="tooltip"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0, transition: { duration: dur.fast, ease: easeOut } }}
            exit={{ opacity: 0, transition: { duration: exitDur(dur.fast) } }}
            className="absolute bottom-full left-0 z-30 mb-2 block w-[min(18rem,80vw)] rounded-xl bg-ink p-3 text-left text-[15px] leading-snug font-normal text-paper shadow-lg"
          >
            <span className="block font-semibold capitalize">{term}</span>
            {def}
          </m.span>
        )}
      </AnimatePresence>
    </span>
  );
}

// Texto con glosario: marca la primera aparición de cada término definido.
const TERMS = Object.keys(glosario).sort((a, b) => b.length - a.length);
const escapeRe = (t: string) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const RE = new RegExp(`(${TERMS.map(escapeRe).join("|")})`, "i");

export function Glossed({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let rest = text;
  const used = new Set<string>();
  let k = 0;
  while (rest) {
    const match = rest.match(RE);
    if (!match || match.index === undefined) {
      parts.push(rest);
      break;
    }
    const key = match[0].toLowerCase();
    // solo palabras completas y la primera vez
    const before = rest[match.index - 1];
    const after = rest[match.index + match[0].length];
    const whole = (!before || !/[\p{L}]/u.test(before)) && (!after || !/[\p{L}]/u.test(after));
    parts.push(rest.slice(0, match.index));
    if (whole && !used.has(key)) {
      used.add(key);
      parts.push(
        <Term key={k++} term={key}>
          {match[0]}
        </Term>
      );
    } else parts.push(match[0]);
    rest = rest.slice(match.index + match[0].length);
  }
  return <>{parts}</>;
}
