import { InstagramLogo, MapPin, QrCode } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/brand/Logo";
import { RiseBlock } from "@/components/motion/RiseBlock";
import { nav, seguinos, site, ui } from "@/content/site";
import { asset } from "@/lib/asset";

// Footer completo: mapa del sitio, secciones extra, ubicación, Instagram y QR para imprimir.

export function Footer() {
  return (
    <footer className="px-3 pt-24 pb-3 sm:px-4 sm:pb-4">
      <RiseBlock className="relative mx-auto max-w-[1400px] rounded-[var(--radius-block)] bg-hero-bg px-5 py-12 text-hero-ink sm:px-10 lg:px-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo variant="full" className="w-44 text-hero-fg sm:w-52" label={site.name} />
            <p className="mt-6 max-w-[36ch] text-[15px]">{site.description}</p>
          </div>
          <nav aria-label={ui.footer.sitemap} className="grid grid-cols-2 gap-8 md:col-span-5">
            <div>
              <p className="text-sm font-bold">{ui.footer.sections}</p>
              <ul className="mt-3 grid gap-2 text-[15px]">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="hover:underline hover:decoration-2 hover:underline-offset-4">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-bold">{ui.footer.more}</p>
              <ul className="mt-3 grid gap-2 text-[15px]">
                {ui.footer.extra.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="hover:underline hover:decoration-2 hover:underline-offset-4">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          <div className="grid content-start gap-4 text-[15px] md:col-span-3">
            <p className="flex items-start gap-2">
              <MapPin size={20} weight="bold" aria-hidden className="mt-0.5 shrink-0" />
              <span>
                El Mantillo
                <br />
                {seguinos.place}
              </span>
            </p>
            <a href={seguinos.instagram.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-semibold hover:underline">
              <InstagramLogo size={20} weight="bold" aria-hidden />
              {seguinos.instagram.handle}
            </a>
            <a href={asset("/qr/")} className="flex items-center gap-2 font-semibold hover:underline">
              <QrCode size={20} weight="bold" aria-hidden />
              {ui.footer.qr}
            </a>
          </div>
        </div>
        <p className="mt-12 border-t-[1.5px] border-current/20 pt-6 text-sm">
          © {new Date().getFullYear()} {site.name}. {ui.footer.place}
        </p>
      </RiseBlock>
    </footer>
  );
}
