import { TractorPass } from "@/components/motion/TractorPass";
import { Illustration } from "@/components/brand/Illustration";
import { queHacemos } from "@/content/site";

// Cada celda tiene su propio tamaño y tinta: el bento tiene exactamente 5 celdas, una por subproyecto.
const cell: Record<string, { box: string; feature?: boolean }> = {
  huertas: {
    box: "sm:col-span-2 lg:col-span-4 bg-monte text-on-monte [--focus:var(--on-monte)]",
    feature: true,
  },
  huevos: { box: "lg:col-span-2 bg-yema text-on-yema" },
  pollos: { box: "lg:col-span-2 bg-salvia" },
  conservas: { box: "lg:col-span-2 bg-barro" },
  almacen: { box: "sm:col-span-2 lg:col-span-2 shadow-[inset_0_0_0_1.5px_var(--ink)]" },
};

export function QueHacemos() {
  return (
    <section id="que-hacemos" aria-labelledby="que-title" className="px-4 pb-24 sm:px-6 lg:pb-36">
      <TractorPass className="mx-auto max-w-[1240px]">
        <h2 id="que-title" className="text-4xl font-extrabold sm:text-5xl">
          {queHacemos.title}
        </h2>
        <p className="mt-4 max-w-[52ch] text-lg text-muted">{queHacemos.lead}</p>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
          {queHacemos.items.map((item) => {
            const c = cell[item.id];
            return (
              <li
                key={item.id}
                className={`flex flex-col gap-6 rounded-[var(--radius-block)] p-6 sm:p-8 ${c.box} ${
                  c.feature ? "lg:flex-row lg:items-center lg:gap-10" : ""
                }`}
              >
                <Illustration
                  src={item.illustration}
                  className={c.feature ? "w-48 sm:w-60 lg:order-2 lg:w-[46%] lg:shrink-0" : "w-40 sm:w-44"}
                />
                <div className={c.feature ? "lg:order-1" : ""}>
                  <h3 className={`font-extrabold ${c.feature ? "text-4xl sm:text-5xl" : "text-3xl"}`}>{item.title}</h3>
                  <p className={`mt-3 max-w-[38ch] ${c.feature ? "text-lg" : ""} opacity-90`}>{item.text}</p>
                  <a
                    href={`#detalle-${item.id}`}
                    className="mt-4 inline-block font-semibold underline decoration-[1.5px] underline-offset-4 hover:decoration-[3px]"
                  >
                    Ver detalle<span className="sr-only"> de {item.title}</span>
                  </a>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Detalle de cada subproyecto */}
        <h3 className="mt-20 text-3xl font-extrabold sm:text-4xl lg:mt-28">{queHacemos.detailTitle}</h3>
        <div className="mt-8 grid">
          {queHacemos.items.map((item) => (
            <article
              key={item.id}
              id={`detalle-${item.id}`}
              aria-labelledby={`detalle-${item.id}-title`}
              className="grid scroll-mt-28 gap-8 border-t-[1.5px] border-ink py-10 lg:grid-cols-12 lg:gap-6 lg:py-14"
            >
              <div className="lg:col-span-4">
                <Illustration src={item.illustration} className="w-24" />
                <h4 id={`detalle-${item.id}-title`} className="font-display mt-4 text-3xl font-extrabold tracking-tight">
                  {item.title}
                </h4>
                <p className="mt-3 max-w-[40ch] text-muted">{item.text}</p>
              </div>
              <div className="grid gap-8 lg:col-span-7 lg:col-start-6">
                <div className="grid max-w-[64ch] gap-4 text-lg leading-relaxed text-muted">
                  {item.detail.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <dl className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
                  {item.facts.map((f) => (
                    <div key={f.label} className="border-l-[3px] border-yema pl-4">
                      <dt className="text-sm font-semibold">{f.label}</dt>
                      <dd className="mt-1 text-muted">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </div>
      </TractorPass>
    </section>
  );
}
