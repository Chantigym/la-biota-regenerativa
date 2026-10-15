import { CountUp } from "@/components/motion/CountUp";
import { ParallaxTree } from "@/components/motion/ParallaxTree";
import { SparkBars } from "@/components/motion/SparkBars";
import { SectionFurrow } from "@/components/brand/SectionFurrow";
import { metodologia, ui } from "@/content/site";

export function Metodologia() {
  return (
    <section id="metodologia" aria-labelledby="metodologia-title" className="px-4 pb-24 sm:px-6 lg:pb-36">
      <SectionFurrow className="mx-auto max-w-[1240px]">
        <div className="relative">
          <ParallaxTree src="/illustrations/chanar.webp" className="absolute -top-10 right-0 hidden w-56 lg:block xl:w-64" />
          <h2 id="metodologia-title" className="text-4xl font-extrabold sm:text-5xl">
            {metodologia.title}
          </h2>
          <p className="mt-4 max-w-[60ch] text-lg text-muted">{metodologia.lead}</p>
        </div>

        <div className="mt-10 gap-10 text-lg leading-relaxed text-muted lg:columns-2">
          {metodologia.intro.map((p, i) => (
            <p key={i} className="mb-5 break-inside-avoid">
              {p}
            </p>
          ))}
        </div>

        <h3 className="mt-16 text-3xl font-extrabold sm:text-4xl lg:mt-20">{metodologia.principlesTitle}</h3>
        <ul className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {metodologia.principles.map((p) => (
            <li key={p.title} className="border-t-[3px] border-yema pt-4">
              <p className="font-display text-xl font-bold tracking-tight">{p.title}</p>
              <p className="mt-2 text-muted">{p.text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-16 rounded-[var(--radius-block)] bg-salvia p-6 sm:p-10 lg:mt-24">
          <h3 className="text-3xl font-extrabold sm:text-4xl">{metodologia.monitoringTitle}</h3>
          <p className="mt-3 max-w-[60ch] text-lg text-muted">{metodologia.monitoringLead}</p>
          <dl className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {metodologia.indicators.map((ind) => (
              <div key={ind.name} className="flex flex-col rounded-[var(--radius-block)] bg-paper p-5">
                <dt className="font-semibold">{ind.name}</dt>
                <dd className="font-display mt-3 text-4xl font-extrabold tracking-tight">
                  <CountUp value={ind.value} />
                </dd>
                <dd>
                  <SparkBars series={ind.series} labels={metodologia.seriesLabels} name={ind.name} />
                </dd>
                <dd className="mt-3 text-[15px] text-muted">{ind.method}</dd>
                <dd className="mt-auto pt-4 text-sm font-semibold">{ui.frequency} {ind.frequency}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm text-muted">{metodologia.indicatorsNote}</p>
        </div>
      </SectionFurrow>
    </section>
  );
}
