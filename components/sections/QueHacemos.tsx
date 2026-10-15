import { Illustration } from "@/components/brand/Illustration";
import { queHacemos } from "@/content/site";

// Cada celda tiene su propio tamaño y tinta: el bento tiene exactamente 5 celdas, una por subproyecto.
const cell: Record<string, { box: string; feature?: boolean }> = {
  huertas: {
    box: "sm:col-span-2 lg:col-span-4 bg-monte text-on-monte [--focus:var(--on-monte)]",
    feature: true,
  },
  huevos: { box: "lg:col-span-2 bg-yema text-on-yema" },
  pollos: { box: "lg:col-span-2 bg-salvia" },
  conservas: { box: "lg:col-span-2 bg-barro" },
  almacen: { box: "sm:col-span-2 lg:col-span-2 shadow-[inset_0_0_0_1.5px_var(--ink)]" },
};

export function QueHacemos() {
  return (
    <section id="que-hacemos" aria-labelledby="que-title" className="px-4 pb-24 sm:px-6 lg:pb-36">
      <div className="mx-auto max-w-[1240px]">
        <h2 id="que-title" className="text-4xl font-extrabold sm:text-5xl">
          {queHacemos.title}
        </h2>
        <p className="mt-4 max-w-[52ch] text-lg text-muted">{queHacemos.lead}</p>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
          {queHacemos.items.map((item) => {
            const c = cell[item.id];
            return (
              <li
                key={item.id}
                className={`flex flex-col gap-6 rounded-[var(--radius-block)] p-6 sm:p-8 ${c.box} ${
                  c.feature ? "lg:flex-row lg:items-center lg:gap-10" : ""
                }`}
              >
                <Illustration
                  src={item.illustration}
                  className={c.feature ? "w-48 sm:w-60 lg:order-2 lg:w-[46%] lg:shrink-0" : "w-40 sm:w-44"}
                />
                <div className={c.feature ? "lg:order-1" : ""}>
                  <h3 className={`font-extrabold ${c.feature ? "text-4xl sm:text-5xl" : "text-3xl"}`}>{item.title}</h3>
                  <p className={`mt-3 max-w-[38ch] ${c.feature ? "text-lg" : ""} opacity-90`}>{item.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
