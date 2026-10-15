import type { Metadata } from "next";
import QRCode from "qrcode";
import { Logo } from "@/components/brand/Logo";
import { PrintButton } from "@/app/qr/PrintButton";
import { site, ui } from "@/content/site";

export const metadata: Metadata = {
  title: `${ui.qr.meta} | ${site.name}`,
  robots: { index: false },
};

// QR imprimible (para ferias y puntos de venta) que lleva a la web. Se genera en el build.
export default async function QrPage() {
  const svg = await QRCode.toString(site.url, { type: "svg", margin: 0, errorCorrectionLevel: "H", color: { dark: "#1d201b", light: "#ffffff00" } });
  return (
    <main className="mx-auto flex min-h-dvh max-w-[720px] flex-col items-center justify-center gap-8 px-6 py-12 text-center print:min-h-0 print:py-0">
      <Logo variant="full" className="w-56 text-ink" label={site.name} />
      <div className="relative w-full max-w-[420px] rounded-[var(--radius-block)] bg-white p-6 shadow-[0_0_0_2px_var(--ink)]">
        <div className="[&>svg]:block [&>svg]:h-auto [&>svg]:w-full" dangerouslySetInnerHTML={{ __html: svg }} />
        {/* tractor al centro (el nivel H de corrección de errores permite tapar el centro) */}
        <span className="absolute top-1/2 left-1/2 flex w-[26%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-yema p-2 shadow-[0_0_0_3px_#fff]">
          <Logo variant="tractor" className="w-full text-[#1d201b]" />
        </span>
      </div>
      <div>
        <p className="font-display text-3xl font-extrabold tracking-tight">{ui.qr.title}</p>
        <p className="mt-2 text-muted">{site.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</p>
      </div>
      <PrintButton />
    </main>
  );
}
