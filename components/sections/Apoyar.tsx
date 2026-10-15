import { HandHeart, Megaphone, Basket, Wrench } from "@phosphor-icons/react/dist/ssr";
import { SectionFurrow } from "@/components/brand/SectionFurrow";
import { apoyar, seguinos } from "@/content/site";

const icons = [Basket, HandHeart, Wrench, Megaphone];

export function Apoyar() {
  return (
    <section id="apoyar" aria-labelledby="apoyar-title" className="px-4 pb-24 sm:px-6 lg:pb-32">
      <SectionFurrow className="mx-auto max-w-[1240px]">
        <h2 id="apoyar-title" className="text-4xl font-extrabold sm:text-5xl">
          {apoyar.title}
        </h2>
        <p className="mt-4 max-w-[60ch] text-lg text-muted">{apoyar.lead}</p>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {apoyar.ways.map((w, i) => {
            const Icon = icons[i % icons.length];
            return (
              <li key={w.title} className="rounded-[var(--radius-block)] bg-salvia p-6 transition-transform duration-200 ease-[var(--ease-out)] hover:-translate-y-1">
                <Icon size={32} weight="bold" aria-hidden />
                <p className="font-display mt-4 text-xl font-bold tracking-tight">{w.title}</p>
                <p className="mt-2 text-[15px] text-muted">{w.text}</p>
              </li>
            );
          })}
        </ul>
        <a
          href={seguinos.instagram.href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-solid sprout-hover mt-8"
        >
          {apoyar.cta}
        </a>
      </SectionFurrow>
    </section>
  );
}
