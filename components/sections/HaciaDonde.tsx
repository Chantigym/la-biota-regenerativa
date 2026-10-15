import { TractorPass } from "@/components/motion/TractorPass";
import { haciaDonde } from "@/content/site";

export function HaciaDonde() {
  return (
    <section id="hacia-donde" aria-labelledby="hacia-title" className="px-3 sm:px-4">
      <div className="mx-auto max-w-[1400px] rounded-[var(--radius-block)] bg-monte px-5 pt-10 pb-20 text-on-monte [--focus:var(--on-monte)] sm:px-10 lg:px-14 lg:pt-14 lg:pb-32">
        <TractorPass className="mx-auto max-w-[1240px]">
          <h2 id="hacia-title" className="text-center text-xl font-bold opacity-80">
            {haciaDonde.title}
          </h2>

          <figure className="mt-8 text-center">
            <figcaption className="sr-only">{haciaDonde.purposeLabel}</figcaption>
            <blockquote className="font-display mx-auto max-w-[20ch] text-[2.1rem] leading-[1.1] font-extrabold tracking-[-0.025em] sm:text-5xl lg:text-[3.9rem]">
              {haciaDonde.purpose}
            </blockquote>
          </figure>

          <div className="mt-20 grid gap-14 lg:mt-28 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-4">
              <h3 className="text-2xl font-bold">{haciaDonde.horizonLabel}</h3>
              <p className="mt-4 max-w-[44ch] text-lg leading-relaxed opacity-90">{haciaDonde.horizon}</p>
              <p className="mt-4 max-w-[44ch] leading-relaxed opacity-80">{haciaDonde.horizonMore}</p>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <h3 className="text-2xl font-bold">{haciaDonde.goalsLabel}</h3>
              <ul className="mt-6 grid gap-x-8 gap-y-7 sm:grid-cols-2">
                {haciaDonde.goals.map((g) => (
                  <li key={g.id} id={`objetivo-${g.id}`} className="scroll-mt-28 border-l-[3px] border-yema pl-4">
                    <p className="font-display text-xl font-bold tracking-tight">{g.title}</p>
                    <p className="mt-1 opacity-85">{g.text}</p>
                    <dl className="mt-3 grid gap-1 text-[15px]">
                      <div className="flex flex-wrap gap-x-1.5">
                        <dt className="font-semibold">Indicador:</dt>
                        <dd className="opacity-85">{g.indicator}</dd>
                      </div>
                      <div className="flex flex-wrap gap-x-1.5">
                        <dt className="font-semibold">Meta:</dt>
                        <dd className="opacity-85">{g.target}</dd>
                      </div>
                    </dl>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </TractorPass>
      </div>
    </section>
  );
}
