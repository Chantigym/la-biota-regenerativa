"use client";

import { m } from "motion/react";

// Serie corta de barras (una sola serie: sin leyenda, el título del indicador la nombra).
// Barras finas, remate redondeado de 4px apoyado en la base, 2px de separación; crecen al entrar en pantalla.
// El valor de cada barra está en el tooltip nativo y en una tabla para lectores de pantalla.
export function SparkBars({ series, labels, name }: { series: number[]; labels: string[]; name: string }) {
  return (
    <figure className="mt-4">
      <div aria-hidden className="flex h-16 items-end gap-[2px] border-b border-current/20">
        {series.map((v, i) => (
          <m.span
            key={i}
            title={`${labels[i]}: valor de muestra`}
            className={`block flex-1 origin-bottom rounded-t-[4px] ${i === series.length - 1 ? "bg-ink" : "bg-ink/35"}`}
            style={{ height: `${v * 100}%` }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ type: "spring", stiffness: 260, damping: 26, delay: i * 0.06 }}
          />
        ))}
      </div>
      <figcaption className="mt-1 flex justify-between text-[12px] text-muted" aria-hidden>
        <span>{labels[0]}</span>
        <span>{labels[labels.length - 1]}</span>
      </figcaption>
      <table className="sr-only">
        <caption>{name}, serie de muestra</caption>
        <tbody>
          {series.map((v, i) => (
            <tr key={i}>
              <th scope="row">{labels[i]}</th>
              <td>valor de muestra</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
