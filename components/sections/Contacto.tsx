import { EnvelopeSimple, InstagramLogo, MapPin, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { contactCta, contacto } from "@/content/site";

const icons = { whatsapp: WhatsappLogo, instagram: InstagramLogo, email: EnvelopeSimple } as const;

export function Contacto() {
  return (
    <section id="contacto" aria-labelledby="contacto-title" className="px-4 pb-24 sm:px-6 lg:pb-32">
      <div className="mx-auto grid max-w-[1240px] gap-12 border-t-[1.5px] border-ink pt-16 lg:grid-cols-12 lg:gap-6 lg:pt-20">
        <div className="lg:col-span-5">
          <h2 id="contacto-title" className="text-4xl font-extrabold sm:text-5xl">
            {contacto.title}
          </h2>
          <p className="mt-5 max-w-[40ch] text-lg text-muted">{contacto.text}</p>
          <p className="mt-6 flex items-center gap-2 font-medium">
            <MapPin size={20} weight="bold" aria-hidden />
            {contacto.place}
          </p>
          <a href={contacto.whatsapp} className="btn btn-solid mt-9" target="_blank" rel="noopener noreferrer">
            {contactCta.label}
          </a>
        </div>

        <ul className="grid content-start gap-3 lg:col-span-6 lg:col-start-7">
          {contacto.channels.map((c) => {
            const Icon = icons[c.kind as keyof typeof icons];
            const external = !c.href.startsWith("mailto:");
            return (
              <li key={c.kind}>
                <a
                  href={c.href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-5 rounded-[var(--radius-block)] bg-salvia px-6 py-5 transition-colors duration-200 hover:bg-yema hover:text-on-yema"
                >
                  <Icon size={28} weight="bold" aria-hidden className="shrink-0" />
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold opacity-75">{c.label}</span>
                    <span className="font-display block text-xl font-bold tracking-tight [overflow-wrap:anywhere] sm:text-2xl">
                      {c.value}
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
