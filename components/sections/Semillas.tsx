import { SectionFurrow } from "@/components/brand/SectionFurrow";
import { semillas } from "@/content/site";

// Banco de semillas: cada variedad como un sobre de semillas impreso (solapa, semillas dibujadas y datos).
const tone = { salvia: "bg-salvia", barro: "bg-barro", yema: "bg-yema text-on-yema" } as const;

function SemillasDibujo() {
  // puñadito de semillas dibujadas (decorativo)
  const pts = [
    [18, 22, -20], [34, 14, 15], [50, 24, -5], [26, 36, 30], [44, 38, -25], [60, 34, 10], [38, 50, 0],
  ];
  return (
    <svg viewBox="0 0 78 62" aria-hidden className="h-12 w-auto" fill="currentColor">
      {pts.map(([x, y, r], i) => (
        <ellipse key={i} cx={x} cy={y} rx="6.5" ry="4.2" transform={`rotate(${r} ${x} ${y})`} />
      ))}
    </svg>
  );
}

export function Semillas() {
  return (
    <section id="semillas" aria-labelledby="semillas-title" className="px-4 pb-24 sm:px-6 lg:pb-36">
      <SectionFurrow className="mx-auto max-w-[1240px]">
        <h2 id="semillas-title" className="text-4xl font-extrabold sm:text-5xl">
          {semillas.title}
        </h2>
        <p className="mt-4 max-w-[60ch] text-lg text-muted">{semillas.lead}</p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {semillas.items.map((s, i) => (
            <li
              key={s.name}
              className={`group relative overflow-hidden rounded-[var(--radius-block)] p-6 pt-10 shadow-[inset_0_0_0_1.5px_var(--ink)] transition-transform duration-300 ease-[var(--ease-out)] hover:-translate-y-1 ${
                i % 2 ? "hover:rotate-1" : "hover:-rotate-1"
              } ${tone[s.tone]}`}
            >
              {/* solapa del sobre */}
              <span aria-hidden className="absolute inset-x-0 top-0 block h-6 border-b-[1.5px] border-dashed border-current/50 bg-paper/40" />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold opacity-75">{s.crop}</p>
                  <p className="font-display text-2xl leading-tight font-extrabold tracking-tight">{s.name}</p>
                </div>
                <SemillasDibujo />
              </div>
              <dl className="mt-6 grid grid-cols-3 gap-3 border-t-[1.5px] border-current/20 pt-4 text-sm">
                <div>
                  <dt className="font-semibold opacity-75">{semillas.labels.origin}</dt>
                  <dd className="mt-0.5 font-semibold">{s.origin}</dd>
                </div>
                <div>
                  <dt className="font-semibold opacity-75">{semillas.labels.sowing}</dt>
                  <dd className="mt-0.5 font-semibold">{s.sowing}</dd>
                </div>
                <div>
                  <dt className="font-semibold opacity-75">{semillas.labels.saved}</dt>
                  <dd className="mt-0.5 font-semibold">{s.saved}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted">{semillas.note}</p>
      </SectionFurrow>
    </section>
  );
}
