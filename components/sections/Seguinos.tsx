import { SectionFurrow } from "@/components/brand/SectionFurrow";
import { ArrowUpRight, InstagramLogo, MapPin } from "@phosphor-icons/react/dist/ssr";
import { seguinos } from "@/content/site";

export function Seguinos() {
  const ig = seguinos.instagram;
  return (
    <section id="seguinos" aria-labelledby="seguinos-title" className="px-4 pb-24 sm:px-6 lg:pb-32">
      <SectionFurrow className="mx-auto max-w-[1240px]">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-6">
        <div className="lg:col-span-5">
          <h2 id="seguinos-title" className="text-4xl font-extrabold sm:text-5xl">
            {seguinos.title}
          </h2>
          <p className="mt-5 max-w-[40ch] text-lg text-muted">{seguinos.text}</p>
          <p className="mt-6 flex items-center gap-2 font-medium">
            <MapPin size={20} weight="bold" aria-hidden />
            {seguinos.place}
          </p>
        </div>

        <a
          href={ig.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-5 rounded-[var(--radius-block)] bg-salvia px-6 py-7 transition-colors duration-200 hover:bg-yema hover:text-on-yema sm:px-8 lg:col-span-6 lg:col-start-7"
        >
          <InstagramLogo size={40} weight="bold" aria-hidden className="shrink-0" />
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold opacity-75">{ig.label}</span>
            <span className="font-display block text-2xl font-bold tracking-tight [overflow-wrap:anywhere] sm:text-3xl">
              {ig.handle}
            </span>
          </span>
          <ArrowUpRight
            size={28}
            weight="bold"
            aria-hidden
            className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
          <span className="sr-only">(se abre en una pestaña nueva)</span>
        </a>
      </div>
      </SectionFurrow>
    </section>
  );
}
