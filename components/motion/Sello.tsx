"use client";

import { useId } from "react";
import { m } from "motion/react";
import { ui } from "@/content/site";
import { asset } from "@/lib/asset";

// Sello de autocertificación, como un sello de goma: una sola tinta, doble aro, texto en el anillo
// repartido de forma pareja (textLength) y una textura de tinta gastada (filtro SVG).
// Entra "estampándose" al aparecer. Decorativo: la sección explica el sistema.
const C = 100;
const R_TEXT = 77; // radio sobre el que corre el texto del anillo
const CIRC = 2 * Math.PI * R_TEXT;

export function Sello({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <m.div
      aria-hidden
      className={`text-ink ${className}`}
      initial={{ scale: 1.5, rotate: -24, opacity: 0 }}
      whileInView={{ scale: 1, rotate: -9, opacity: 0.92 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ type: "spring", stiffness: 320, damping: 16, mass: 0.9 }}
    >
      <svg viewBox="0 0 200 200" className="block w-full overflow-visible">
        <defs>
          {/* tinta gastada: huecos irregulares y bordes apenas temblorosos */}
          <filter id={`tinta-${id}`} x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" result="ruido" />
            <feColorMatrix in="ruido" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -7 5.2" result="huecos" />
            <feComposite in="SourceGraphic" in2="huecos" operator="in" result="tinta" />
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="3" result="onda" />
            <feDisplacementMap in="tinta" in2="onda" scale="1.2" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          {/* trazo para el texto: arranca arriba a la izquierda y gira en sentido horario */}
          <path id={`anillo-${id}`} d={`M ${C} ${C} m -${R_TEXT} 0 a ${R_TEXT} ${R_TEXT} 0 1 1 ${R_TEXT * 2} 0 a ${R_TEXT} ${R_TEXT} 0 1 1 -${R_TEXT * 2} 0`} />
          {/* el tractor como máscara: toma el color de la tinta */}
          <mask id={`tractor-${id}`} style={{ maskType: "alpha" }}>
            <image href={asset("/brand/logo-tractor-solo.webp")} x="64" y="54" width="72" height="49" />
          </mask>
        </defs>

        <g filter={`url(#tinta-${id})`} fill="currentColor" stroke="currentColor">
          {/* doble aro exterior y aro interior */}
          <circle cx={C} cy={C} r="95" fill="none" strokeWidth="4.5" />
          <circle cx={C} cy={C} r="89" fill="none" strokeWidth="1.4" />
          <circle cx={C} cy={C} r="64" fill="none" strokeWidth="2.6" />

          {/* texto del anillo, repartido parejo en toda la vuelta */}
          <text
            stroke="none"
            fontFamily="var(--font-display)"
            fontWeight="800"
            fontSize="15"
            letterSpacing="1"
            dominantBaseline="central"
          >
            <textPath href={`#anillo-${id}`} textLength={CIRC - 6} lengthAdjust="spacing">
              ★ {ui.sealRing}
            </textPath>
          </text>

          {/* centro: tractor, nombre y lugar */}
          <rect x="60" y="52" width="80" height="54" mask={`url(#tractor-${id})`} stroke="none" />
          <line x1="62" y1="110" x2="138" y2="110" strokeWidth="1.6" />
          <text x={C} y="126" textAnchor="middle" stroke="none" fontFamily="var(--font-display)" fontWeight="800" fontSize="17" letterSpacing="1.5">
            LA BIOTA
          </text>
          <text x={C} y="140" textAnchor="middle" stroke="none" fontFamily="var(--font-sans)" fontWeight="700" fontSize="8" letterSpacing="2">
            TRASLASIERRA
          </text>
        </g>
      </svg>
    </m.div>
  );
}
