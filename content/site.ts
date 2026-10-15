// BORRADOR: todos los textos del sitio viven acá para que se puedan revisar y editar en un solo lugar.
// Los datos marcados con TODO (contacto, hitos) deben confirmarse con La Biota antes de publicar.

export const site = {
  name: "La Biota Regenerativa",
  description:
    "Proyecto de mujeres en comunidad que produce y comercializa alimentos conscientes con agricultura regenerativa en Traslasierra, Córdoba.",
  url: "https://labiota.com.ar", // TODO: dominio definitivo
};

export const nav = [
  { href: "#quienes-somos", label: "Quiénes somos" },
  { href: "#que-hacemos", label: "Qué hacemos" },
  { href: "#hacia-donde", label: "Hacia dónde" },
  { href: "#hoy", label: "Dónde estamos" },
];

export const hero = {
  title: "Cultivamos alimentos conscientes en comunidad",
  lead: "Un proyecto de mujeres en un campo de Traslasierra, Córdoba. Producimos regenerando el suelo y contamos cómo lo hacemos.",
  primary: { label: "Conocé el proyecto", href: "#quienes-somos" },
};

export const quienes = {
  title: "Quiénes somos",
  statement:
    "Somos un grupo de mujeres que eligió vivir y trabajar en el campo. Producimos y vendemos alimentos conscientes: sabemos de dónde viene cada uno y cómo se hizo.",
  body: "La Biota nace en Traslasierra con una idea simple: cuidar el suelo es cuidar lo que comemos. Trabajamos en comunidad, compartimos las decisiones y abrimos el proceso a quien quiera conocerlo.",
  principles: [
    {
      title: "Comunidad",
      text: "Las decisiones se toman en conjunto y el trabajo se reparte. Nadie sostiene el campo sola.",
    },
    {
      title: "Mujeres en el campo",
      text: "Ocupamos un lugar que durante mucho tiempo nos fue negado, con oficio, herramientas y voz propia.",
    },
    {
      title: "Transparencia",
      text: "Mostramos cómo producimos, qué nos falta y en qué etapa estamos. Tal cual es.",
    },
  ],
};

export type Subproyecto = {
  id: string;
  title: string;
  text: string;
  illustration: string;
};

export const queHacemos = {
  title: "Qué hacemos",
  lead: "Cinco subproyectos que se alimentan entre sí: lo que sobra en uno es insumo del otro.",
  items: [
    {
      id: "huertas",
      title: "Huertas",
      text: "Verduras de estación cultivadas sin agroquímicos, con abonos propios y rotación de cultivos.",
      illustration: "/illustrations/huertas.webp",
    },
    {
      id: "huevos",
      title: "Huevos",
      text: "Gallinas a cielo abierto que comen pasto, insectos y restos de la huerta.",
      illustration: "/illustrations/huevos.webp",
    },
    {
      id: "pollos",
      title: "Pollos",
      text: "Pollos de pastoreo que recorren el campo en gallineros móviles y abonan el suelo a su paso.",
      illustration: "/illustrations/pollos.webp",
    },
    {
      id: "conservas",
      title: "Conservas",
      text: "Lo que la huerta da de más se vuelve conserva, dulce o encurtido, hecho por nosotras.",
      illustration: "/illustrations/conservas.webp",
    },
    {
      id: "almacen",
      title: "Almacén orgánico",
      text: "Reunimos nuestra producción y la de productores vecinos en un solo lugar.",
      illustration: "/illustrations/almacen.webp",
    },
  ] satisfies Subproyecto[],
};

export const haciaDonde = {
  title: "Hacia dónde apuntamos",
  purposeLabel: "Nuestro propósito",
  purpose:
    "Regenerar la tierra y la comunidad que vive de ella, con alimentos que se puedan mirar de cerca.",
  horizonLabel: "Nuestro horizonte",
  horizon:
    "Imaginamos un campo con suelo vivo, monte nativo recuperado y una red de familias de Traslasierra que se abastece de alimentos sanos producidos a pocos kilómetros.",
  goalsLabel: "Nuestros objetivos",
  goals: [
    { id: "suelo", title: "Regenerar el suelo", text: "Más materia orgánica y cobertura viva en todas las parcelas." },
    { id: "diversidad", title: "Diversificar la producción", text: "Sumar frutales, aromáticas y semillas propias." },
    { id: "mesas", title: "Llegar a más mesas", text: "Abastecer de forma regular a familias y comercios de la zona." },
    { id: "ciclos", title: "Cerrar ciclos", text: "Que lo que sobra en un subproyecto alimente al otro." },
    { id: "compartir", title: "Compartir lo que aprendemos", text: "Contar el proceso y compartir saberes con otros proyectos." },
    { id: "sostener", title: "Sostener a quienes trabajan", text: "Que el proyecto dé un ingreso digno a cada integrante." },
  ],
};

export type HitoEstado = "logrado" | "en-marcha" | "pendiente";

// TODO: confirmar hitos y estado real con La Biota.
export const hoy = {
  title: "Dónde estamos hoy",
  lead: "El camino recorrido y lo que falta. Lo vamos actualizando a medida que avanzamos.",
  hereLabel: "Estamos acá",
  hitos: [
    { title: "Llegamos al campo", text: "Nos instalamos y empezamos a conocer el suelo, el agua y el monte.", estado: "logrado", goal: "suelo" },
    { title: "Primeras huertas", text: "Armamos las primeras parcelas y la compostera.", estado: "logrado", goal: "diversidad" },
    { title: "Gallinas ponedoras", text: "Sumamos el gallinero y los primeros huevos a la venta.", estado: "logrado", goal: "mesas" },
    { title: "Pollos y conservas", text: "Probamos los gallineros móviles y la sala de elaboración.", estado: "en-marcha", goal: "ciclos" },
    { title: "Almacén orgánico", text: "Abrir un punto de venta propio junto a productores vecinos.", estado: "pendiente", goal: "mesas" },
    { title: "Compartir el proceso", text: "Contar de forma regular cómo avanzamos y qué aprendemos en el camino.", estado: "pendiente", goal: "compartir" },
  ] as { title: string; text: string; estado: HitoEstado; goal: string }[],
};

export const estadoLabel: Record<HitoEstado, string> = {
  logrado: "Logrado",
  "en-marcha": "En marcha",
  pendiente: "Por venir",
};

// TODO: confirmar el usuario real de Instagram.
export const seguinos = {
  title: "Conocé más del proyecto",
  text: "Contamos el día a día del campo, los avances y lo que vamos aprendiendo en Instagram.",
  instagram: { label: "Instagram", handle: "@labiota.regenerativa", href: "https://instagram.com/labiota.regenerativa" },
  place: "Traslasierra, Córdoba, Argentina",
};
