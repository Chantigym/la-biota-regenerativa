import { Drop } from "@phosphor-icons/react/dist/ssr";
import { Illustration } from "@/components/brand/Illustration";
import { SectionFurrow } from "@/components/brand/SectionFurrow";
import { CountUp } from "@/components/motion/CountUp";
import { agua } from "@/content/site";

export function Agua() {
  return (
    <section id="agua" aria-labelledby="agua-title" className="px-4 pb-24 sm:px-6 lg:pb-36">
      <SectionFurrow className="mx-auto max-w-[1240px]">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <h2 id="agua-title" className="text-4xl font-extrabold sm:text-5xl">
              {agua.title}
            </h2>
            <p className="mt-4 max-w-[60ch] text-lg text-muted">{agua.lead}</p>
            <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {agua.practices.map((p) => (
                <li key={p.title} className="flex gap-3">
                  <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-salvia">
                    <Drop size={20} weight="bold" aria-hidden />
                  </span>
                  <span>
                    <span className="font-display block text-xl font-bold tracking-tight">{p.title}</span>
                    <span className="mt-1 block text-muted">{p.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="rounded-[var(--radius-block)] bg-salvia p-6">
              <Illustration src="/illustrations/huertas.webp" className="mx-auto w-48" />
              <dl className="mt-6 grid gap-4">
                {agua.facts.map((f) => (
                  <div key={f.label} className="flex items-baseline justify-between gap-4 border-t-[1.5px] border-ink/15 pt-3">
                    <dt className="text-[15px] font-semibold">{f.label}</dt>
                    <dd className="font-display text-2xl font-extrabold tracking-tight">
                      <CountUp value={f.value} />
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-sm text-muted">{agua.note}</p>
            </div>
          </div>
        </div>
      </SectionFurrow>
    </section>
  );
}
