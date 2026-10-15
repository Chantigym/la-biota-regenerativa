import { Plus } from "@phosphor-icons/react/dist/ssr";
import { TractorPass } from "@/components/motion/TractorPass";
import { preguntas } from "@/content/site";

// Acordeón nativo (details/summary): funciona sin JS y con teclado.
export function Preguntas() {
  return (
    <section id="preguntas" aria-labelledby="preguntas-title" className="px-4 pb-24 sm:px-6 lg:pb-32">
      <TractorPass className="mx-auto grid max-w-[1240px]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
          <h2 id="preguntas-title" className="text-4xl font-extrabold sm:text-5xl lg:col-span-4">
            {preguntas.title}
          </h2>
          <div className="lg:col-span-8">
            {preguntas.items.map((item) => (
              <details key={item.q} className="group border-t-[1.5px] border-ink last:border-b-[1.5px]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-xl font-bold tracking-tight sm:text-2xl">{item.q}</span>
                  <Plus
                    size={24}
                    weight="bold"
                    aria-hidden
                    className="shrink-0 transition-transform duration-200 group-open:rotate-45"
                  />
                </summary>
                <div className="grid max-w-[64ch] gap-4 pb-6 text-lg leading-relaxed text-muted">
                  {item.a.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </TractorPass>
    </section>
  );
}
