import { quienes } from "@/content/site";

export function QuienesSomos() {
  return (
    <section id="quienes-somos" aria-labelledby="quienes-title" className="px-4 py-24 sm:px-6 lg:py-36">
      <div className="mx-auto max-w-[1240px]">
        <h2 id="quienes-title" className="text-xl font-bold text-muted">
          {quienes.title}
        </h2>
        <p className="font-display mt-6 max-w-[24ch] text-[2rem] leading-[1.12] font-bold tracking-[-0.02em] sm:text-5xl lg:text-[3.6rem]">
          {quienes.statement}
        </p>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-6">
          <p className="max-w-[46ch] text-lg text-muted lg:col-span-5">{quienes.body}</p>

          <dl className="grid gap-8 lg:col-span-6 lg:col-start-7">
            {quienes.principles.map((p) => (
              <div key={p.title} className="grid gap-2 border-t-[1.5px] border-ink pt-4 sm:grid-cols-[13rem_1fr] sm:gap-6">
                <dt className="font-display text-2xl font-bold tracking-tight">{p.title}</dt>
                <dd className="text-muted">{p.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
