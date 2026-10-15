import { TractorPass } from "@/components/motion/TractorPass";
import { ProductList } from "@/components/sections/ProductList";
import { autocert } from "@/content/site";

const bar = {
  verde: "bg-cert-verde",
  amarillo: "bg-cert-amarillo",
  naranja: "bg-cert-naranja",
} as const;

export function Autocertificacion() {
  return (
    <section id="autocertificacion" aria-labelledby="autocert-title" className="px-4 pb-24 sm:px-6 lg:pb-36">
      <TractorPass className="mx-auto max-w-[1240px]">
        <h2 id="autocert-title" className="text-4xl font-extrabold sm:text-5xl">
          {autocert.title}
        </h2>
        <p className="mt-4 max-w-[60ch] text-lg text-muted">{autocert.lead}</p>
        <p className="mt-4 max-w-[60ch] leading-relaxed text-muted">{autocert.intro}</p>

        {/* Los tres niveles */}
        <ul className="mt-12 grid gap-3 md:grid-cols-3">
          {autocert.levels.map((l) => (
            <li key={l.id} className="overflow-hidden rounded-[var(--radius-block)] shadow-[inset_0_0_0_1.5px_var(--ink)]">
              <span aria-hidden className={`block h-3 ${bar[l.id]}`} />
              <div className="p-6">
                <p className="font-display text-3xl font-extrabold tracking-tight">{l.name}</p>
                <p className="mt-1 font-semibold">{l.summary}</p>
                <p className="mt-3 text-muted">{l.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <h3 className="mt-20 text-3xl font-extrabold sm:text-4xl">{autocert.listTitle}</h3>
        <p className="mt-2 mb-8 text-sm text-muted">{autocert.listNote}</p>
        <ProductList />
      </TractorPass>
    </section>
  );
}
