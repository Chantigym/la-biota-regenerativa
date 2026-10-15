import { ui } from "@/content/site";
// Franja con el lema del proyecto, desplazándose de costado (una sola en la página).
// Se pausa al pasar el mouse y queda quieta con reduced motion. El texto se lee una vez para lectores de pantalla.
const LEMA = ui.lema;

export function LemaMarquee() {
  const items = Array.from({ length: 4 }, (_, i) => i);
  return (
    <section aria-label={ui.lemaAria} className="marquee overflow-hidden py-10 lg:py-14">
      <p className="sr-only">{LEMA}</p>
      <div aria-hidden className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0">
            {items.map((i) => (
              <span key={i} className="font-display flex items-center text-4xl font-extrabold whitespace-nowrap sm:text-6xl">
                <span className="px-6">{LEMA}</span>
                <span className="inline-block size-4 shrink-0 rounded-full bg-yema shadow-[0_0_0_2px_var(--ink)] sm:size-5" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
