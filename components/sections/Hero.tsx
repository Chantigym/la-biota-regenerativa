import { Logo } from "@/components/brand/Logo";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { hero } from "@/content/site";

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="mx-auto grid min-h-[calc(100dvh-64px-12px)] max-w-[1400px] items-center gap-8 overflow-hidden rounded-[var(--radius-block)] bg-hero-bg px-5 py-12 text-hero-ink sm:min-h-[calc(100dvh-64px-16px)] sm:px-10 lg:grid-cols-12 lg:gap-4 lg:px-14 lg:py-16">
        {/* al bajar, el texto se queda un poco atrás y el tractor sigue su camino hacia la izquierda */}
        <ParallaxLayer className="lg:col-span-6" y={[0, 110]}>
          <h1
            id="hero-title"
            className="hero-rise max-w-[18ch] text-[2.6rem] font-extrabold sm:text-6xl lg:text-[3.5rem] xl:text-[3.8rem]"
            style={{ ["--i" as string]: 0 }}
          >
            {hero.title}
          </h1>
          <p
            className="hero-rise mt-6 max-w-[42ch] text-lg leading-relaxed sm:text-xl"
            style={{ ["--i" as string]: 1 }}
          >
            {hero.lead}
          </p>
          <div className="hero-rise mt-9 flex flex-wrap gap-3" style={{ ["--i" as string]: 2 }}>
            <a href={hero.primary.href} className="btn btn-solid">
              {hero.primary.label}
            </a>
          </div>
        </ParallaxLayer>

        <ParallaxLayer className="lg:col-span-6" x={[0, -260]}>
          <Logo
            variant="tractor"
            className="hero-drive mx-auto w-full max-w-[760px] text-hero-fg lg:ml-auto lg:mr-0"
            label="Ilustración: una mujer maneja un tractor sobre una loma"
          />
        </ParallaxLayer>
      </div>
    </section>
  );
}
