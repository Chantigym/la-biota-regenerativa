import { Logo } from "@/components/brand/Logo";
import { nav, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="mx-auto grid max-w-[1400px] gap-10 rounded-[var(--radius-block)] bg-hero-bg px-5 py-12 text-hero-ink sm:px-10 md:grid-cols-[auto_1fr] md:items-end lg:px-14">
        <Logo variant="full" className="w-44 text-hero-fg sm:w-52" label={site.name} />
        <div className="grid gap-6 md:justify-items-end">
          <nav aria-label="Pie de página">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 font-medium">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:underline hover:decoration-2 hover:underline-offset-4">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <p className="max-w-[48ch] text-[15px] md:text-right">
            Agricultura regenerativa hecha por mujeres en comunidad, en Traslasierra, Córdoba.
          </p>
        </div>
      </div>
    </footer>
  );
}
