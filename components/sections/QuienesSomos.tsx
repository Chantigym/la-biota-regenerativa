import { PhotoSlot } from "@/components/brand/PhotoSlot";
import { CountUp } from "@/components/motion/CountUp";
import { SectionFurrow } from "@/components/brand/SectionFurrow";
import { quienes } from "@/content/site";

export function QuienesSomos() {
  return (
    <section id="quienes-somos" aria-labelledby="quienes-title" className="px-4 pt-20 pb-24 sm:px-6 lg:pt-28 lg:pb-36">
      <SectionFurrow className="mx-auto max-w-[1240px]">
        <h2 id="quienes-title" className="text-xl font-bold text-muted">
          {quienes.title}
        </h2>
        <p className="font-display mt-6 max-w-[26ch] text-[2rem] leading-[1.12] font-bold tracking-[-0.02em] sm:text-5xl lg:text-[3.4rem]">
          {quienes.statement}
        </p>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-6">
          <p className="max-w-[52ch] text-lg leading-relaxed text-muted lg:col-span-6">{quienes.body}</p>
          <dl className="grid grid-cols-2 gap-3 lg:col-span-5 lg:col-start-8">
            {quienes.facts.map((f) => (
              <div key={f.label} className="rounded-[var(--radius-block)] bg-salvia p-5">
                <dt className="text-sm font-semibold text-muted">{f.label}</dt>
                <dd className="font-display mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                  <CountUp value={f.value} />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Historia */}
        <div className="mt-20 grid items-start gap-10 lg:mt-28 lg:grid-cols-12 lg:gap-6">
          <PhotoSlot label={quienes.historyPhoto} className="lg:col-span-5" />
          <div className="lg:col-span-6 lg:col-start-7">
            <h3 className="text-3xl font-extrabold sm:text-4xl">{quienes.historyTitle}</h3>
            <div className="mt-6 grid max-w-[62ch] gap-5 text-lg leading-relaxed text-muted">
              {quienes.history.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Principios */}
        <div className="mt-20 grid gap-8 lg:mt-28 lg:grid-cols-12 lg:gap-6">
          <h3 className="text-3xl font-extrabold sm:text-4xl lg:col-span-4">{quienes.principlesTitle}</h3>
          <dl className="grid gap-8 lg:col-span-7 lg:col-start-6">
            {quienes.principles.map((p) => (
              <div key={p.title} className="grid gap-2 border-t-[1.5px] border-ink pt-4 sm:grid-cols-[13rem_1fr] sm:gap-6">
                <dt className="font-display text-2xl font-bold tracking-tight">{p.title}</dt>
                <dd className="text-muted">{p.text}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Integrantes */}
        <div className="mt-20 lg:mt-28">
          <h3 className="text-3xl font-extrabold sm:text-4xl">{quienes.teamTitle}</h3>
          <p className="mt-3 max-w-[52ch] text-lg text-muted">{quienes.teamLead}</p>
          <ul className="mt-10 grid max-w-[880px] gap-x-6 gap-y-10 sm:grid-cols-2">
            {quienes.team.map((m, i) => (
              <li key={i}>
                <PhotoSlot label="Foto de muestra" ratio="4 / 3" />
                <p className="font-display mt-4 text-xl font-bold tracking-tight">{m.name}</p>
                <a
                  href={`https://www.instagram.com/${m.handle}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] font-semibold underline decoration-[1.5px] underline-offset-4 hover:decoration-[3px]"
                >
                  @{m.handle}
                </a>
                <p className="text-[15px] font-semibold">{m.role}</p>
                <p className="mt-2 text-[16px] text-muted">{m.bio}</p>
              </li>
            ))}
          </ul>
        </div>
      </SectionFurrow>
    </section>
  );
}
