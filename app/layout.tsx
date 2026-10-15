import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { site, ui } from "@/content/site";
import { asset } from "@/lib/asset";
import "./globals.css";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-bricolage", display: "swap" });
const figtree = Figtree({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-figtree", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: ui.metaTitle,
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    locale: ui.htmlLang === "en" ? "en_US" : "es_AR",
    type: "website",
  },
  icons: { icon: asset("/brand/logo-tractor.svg") },
};

export const viewport: Viewport = {
  themeColor: "#fafaf6",
};

// Antes de pintar: limpia preferencias de tema guardadas por versiones anteriores y, si la carga tarda más de 700 ms,
// muestra la pantalla del tractor hasta que termine.
const bootScript = `(function(){var d=document.documentElement;d.removeAttribute("data-theme");try{localStorage.removeItem("biota-tema");}catch(e){}try{if(!localStorage.getItem("biota-intro")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){d.classList.add("intro");localStorage.setItem("biota-intro","1");}}catch(e){}var to=setTimeout(function(){d.classList.add("carga-lenta")},700);window.addEventListener("load",function(){clearTimeout(to);d.classList.remove("carga-lenta");});})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={ui.htmlLang} suppressHydrationWarning className={`${bricolage.variable} ${figtree.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <div id="intro" aria-hidden="true">
          <span className="ink-mask intro-logo" style={{ ["--src" as string]: `url(${asset("/brand/logo-full.webp")})` }} />
        </div>
        <div id="cargando" role="status" aria-live="polite">
          <span className="cargando-tractor">
            <span className="ink-mask absolute inset-0" style={{ ["--src" as string]: `url(${asset("/brand/logo-tractor-solo.webp")})` }} />
            <svg className="cargando-rueda" viewBox="0 0 40 40" aria-hidden>
              <circle cx="20" cy="20" r="16" fill="none" stroke="var(--paper)" strokeWidth="3.5" strokeDasharray="5 6" />
            </svg>
          </span>
          <span className="text-sm font-semibold">{ui.loading}</span>
        </div>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
        >
          {ui.skip}
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
