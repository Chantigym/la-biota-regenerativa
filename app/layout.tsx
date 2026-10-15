import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree, Permanent_Marker } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { site } from "@/content/site";
import { asset } from "@/lib/asset";
import "./globals.css";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-bricolage", display: "swap" });
// Letra de marcador, como la del logo: solo para notas escritas a mano (no se precarga).
const marker = Permanent_Marker({ subsets: ["latin"], weight: "400", variable: "--font-pm", display: "swap", preload: false });
const figtree = Figtree({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-figtree", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} | Agricultura regenerativa en Traslasierra`,
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    locale: "es_AR",
    type: "website",
  },
  icons: { icon: asset("/brand/logo-tractor.svg") },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf6" },
    { media: "(prefers-color-scheme: dark)", color: "#161914" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${bricolage.variable} ${figtree.variable} ${marker.variable}`}>
      <body>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
        >
          Saltar al contenido
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
