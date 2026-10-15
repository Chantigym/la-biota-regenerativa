"use client";

import { useState } from "react";
import { ArrowsLeftRight } from "@phosphor-icons/react";
import { comparador } from "@/content/site";
import { asset } from "@/lib/asset";

// Antes y después: suelo degradado (izquierda) y suelo vivo (derecha) superpuestos;
// el deslizador corre el corte. Funciona con mouse, toque y teclado (input range nativo).
export function Comparador() {
  const [pos, setPos] = useState(50);
  const img = (src: string) => ({ ["--src" as string]: `url(${asset(src)})` });

  return (
    <div className="mx-auto max-w-[1240px] px-5 pb-16 sm:px-10 lg:px-14">
      <h3 className="text-3xl font-extrabold sm:text-4xl">{comparador.title}</h3>
      <p className="mt-3 max-w-[60ch] text-lg opacity-85">{comparador.lead}</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-center">
        <div className="relative mx-auto w-full max-w-[420px] lg:col-span-5">
          <div className="relative overflow-hidden rounded-[var(--radius-block)] bg-[#3a3027]" style={{ aspectRatio: "900 / 1709" }}>
            {/* suelo vivo (derecha) */}
            <span aria-hidden className="ink-mask absolute inset-3" style={img("/illustrations/suelo.webp")} />
            {/* suelo degradado (izquierda), recortado por el deslizador */}
            <span
              aria-hidden
              className="absolute inset-0 bg-[#4a3f35]"
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            >
              <span className="ink-mask absolute inset-3" style={img("/illustrations/suelo-degradado.webp")} />
            </span>
            {/* línea y manija */}
            <span aria-hidden className="pointer-events-none absolute inset-y-0 w-[3px] -translate-x-1/2 bg-yema" style={{ left: `${pos}%` }}>
              <span className="absolute top-1/2 left-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-yema text-[#2b241d] shadow-[0_0_0_2px_#2b241d]">
                <ArrowsLeftRight size={20} weight="bold" />
              </span>
            </span>
            <input
              type="range"
              min={0}
              max={100}
              value={pos}
              onChange={(e) => setPos(Number(e.target.value))}
              aria-label={`Comparar: ${comparador.left} a la izquierda, ${comparador.right} a la derecha`}
              aria-valuetext={`${pos}% ${comparador.left.toLowerCase()}`}
              className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
            />
          </div>
          <div className="mt-3 flex justify-between text-sm font-semibold">
            <span>{comparador.left}</span>
            <span>{comparador.right}</span>
          </div>
        </div>
        <dl className="grid gap-6 lg:col-span-6 lg:col-start-7">
          <div className="border-l-[3px] border-[#a08a74] pl-4">
            <dt className="font-display text-2xl font-bold">{comparador.left}</dt>
            <dd className="mt-1 opacity-85">{comparador.leftText}</dd>
          </div>
          <div className="border-l-[3px] border-yema pl-4">
            <dt className="font-display text-2xl font-bold">{comparador.right}</dt>
            <dd className="mt-1 opacity-85">{comparador.rightText}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
