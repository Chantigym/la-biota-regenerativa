import { TractorPass } from "@/components/motion/TractorPass";
import { ArrowRight, Check, Tractor } from "@phosphor-icons/react/dist/ssr";
import { FurrowPath } from "@/components/motion/FurrowPath";
import { estadoLabel, haciaDonde, hoy, type HitoEstado } from "@/content/site";

const goalTitle = Object.fromEntries(haciaDonde.goals.map((g) => [g.id, g.title]));

function Node({ estado }: { estado: HitoEstado }) {
  if (estado === "logrado") {
    return (
      <span className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full bg-ink text-paper">
        <Check size={20} weight="bold" aria-hidden />
      </span>
    );
  }
  if (estado === "en-marcha") {
    return (
      <span className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full bg-yema text-on-yema shadow-[0_0_0_1.5px_var(--ink),0_0_0_7px_var(--paper),0_0_0_8.5px_var(--ink)]">
        <Tractor size={22} weight="fill" aria-hidden />
      </span>
    );
  }
  return (
    <span className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-ink/60 bg-paper" />
  );
}

export function DondeEstamos() {
  const n = hoy.hitos.length;
  const current = hoy.hitos.findIndex((h) => h.estado === "en-marcha");
  const progress = current > 0 ? current / (n - 1) : 0;

  return (
    <section id="hoy" aria-labelledby="hoy-title" className="px-4 pt-20 pb-24 sm:px-6 lg:pt-28 lg:pb-36">
      <TractorPass className="mx-auto max-w-[1240px]">
        <h2 id="hoy-title" className="text-4xl font-extrabold sm:text-5xl">
          {hoy.title}
        </h2>
        <p className="mt-4 max-w-[52ch] text-lg text-muted">{hoy.lead}</p>

        <div className="relative mt-16">
          {/* surco: solo desktop, va de centro a centro del primer y último hito */}
          <div className="absolute inset-x-[calc(100%/12)] top-0 hidden lg:block">
            <FurrowPath progress={progress} />
          </div>

          <ol className="grid gap-0 lg:grid-cols-6 lg:gap-6">
            {hoy.hitos.map((h, i) => {
              const isCurrent = h.estado === "en-marcha";
              const isLast = i === n - 1;
              // conector vertical (mobile): sólido si el tramo ya se recorrió
              const walked = i < current;
              return (
                <li
                  key={h.title}
                  aria-current={isCurrent ? "step" : undefined}
                  className="relative flex gap-5 pb-10 lg:flex-col lg:items-center lg:gap-5 lg:pb-0 lg:text-center"
                >
                  {!isLast && (
                    <span
                      aria-hidden
                      className={`absolute top-11 bottom-0 left-[21px] lg:hidden ${
                        walked ? "w-[3px] bg-ink" : "border-l-2 border-dashed border-ink/45"
                      }`}
                    />
                  )}
                  <Node estado={h.estado} />

                  <div className={`pt-2 lg:pt-0 ${h.estado === "pendiente" ? "text-muted" : ""}`}>
                    <p className="flex flex-wrap items-center gap-2 text-sm font-semibold lg:justify-center">
                      {isCurrent ? (
                        <span className="rounded-full bg-yema px-3 py-1 text-on-yema">{hoy.hereLabel}</span>
                      ) : (
                        <span>{estadoLabel[h.estado]}</span>
                      )}
                      <span className="font-medium text-muted">{h.date}</span>
                    </p>
                    <h3 className={`mt-2 text-2xl font-bold ${isCurrent ? "" : "lg:text-xl"}`}>{h.title}</h3>
                    <p className="mt-2 max-w-[36ch] text-[16px] text-muted lg:mx-auto">{h.text}</p>
                    <a
                      href={`#objetivo-${h.goal}`}
                      className="mt-3 inline-block text-[15px] font-semibold underline decoration-[1.5px] underline-offset-4 hover:decoration-[3px]"
                    >
                      Objetivo: {goalTitle[h.goal]}
                    </a>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-16 grid gap-6 lg:mt-24 lg:grid-cols-12">
          <div className="rounded-[var(--radius-block)] bg-yema p-6 text-on-yema sm:p-10 lg:col-span-7">
            <h3 className="text-3xl font-extrabold">{hoy.currentTitle}</h3>
            <p className="mt-2 font-semibold">{current >= 0 ? hoy.hitos[current].title : ""}</p>
            <div className="mt-5 grid max-w-[60ch] gap-4 leading-relaxed">
              {hoy.current.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="rounded-[var(--radius-block)] p-6 shadow-[inset_0_0_0_1.5px_var(--ink)] sm:p-10 lg:col-span-5">
            <h3 className="text-3xl font-extrabold">{hoy.nextTitle}</h3>
            <ul className="mt-5 grid gap-4">
              {hoy.next.map((n, i) => (
                <li key={i} className="flex gap-3 text-muted">
                  <ArrowRight size={20} weight="bold" aria-hidden className="mt-1 shrink-0 text-ink" />
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </TractorPass>
    </section>
  );
}
