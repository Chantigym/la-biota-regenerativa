// CONTENIDO DE MUESTRA: todos los textos del sitio viven acá para revisarlos y editarlos en un solo lugar.
// - Los párrafos en latín (lorem ipsum) y los datos con "XX" son de ejemplo: muestran dónde va información
//   que tiene que aportar La Biota y cuánto espacio ocupa.
// - Los textos en castellano son un borrador de redacción académica, también a validar.
// Cuando el contenido real esté completo, poner `sample.enabled` en false para ocultar el aviso.

export const sample = {
  enabled: true,
  notice:
    "Versión de muestra. Los textos en latín (lorem ipsum), los datos marcados con XX y las fotos son de ejemplo y se reemplazarán por información del proyecto.",
};

// Párrafos de relleno
const L = {
  p1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus, posuere velit aliquet. Cras mattis consectetur purus sit amet fermentum, donec ullamcorper nulla non metus auctor fringilla.",
  p2: "Vestibulum id ligula porta felis euismod semper. Maecenas faucibus mollis interdum, nullam quis risus eget urna mollis ornare vel eu leo. Aenean lacinia bibendum nulla sed consectetur, curabitur blandit tempus porttitor.",
  p3: "Sed posuere consectetur est at lobortis. Donec sed odio dui, etiam porta sem malesuada magna mollis euismod. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes.",
  short: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  mid: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper nulla non metus auctor fringilla, vestibulum id ligula porta.",
};

export const site = {
  name: "La Biota Regenerativa",
  description:
    "Proyecto productivo integrado por mujeres que aplica principios de agricultura regenerativa a la producción de alimentos en Traslasierra, Córdoba.",
  url: "https://chantigym.github.io/la-biota-regenerativa/", // TODO: dominio definitivo
};

export const nav = [
  { href: "#quienes-somos", label: "Comunidad" },
  { href: "#que-hacemos", label: "El proyecto" },
  { href: "#autocertificacion", label: "Autocertificación" },
  { href: "#metodologia", label: "Metodología" },
  { href: "#hacia-donde", label: "Objetivos" },
  { href: "#hoy", label: "El presente" },
  { href: "#preguntas", label: "Preguntas" },
];

export const hero = {
  title: "Producción de alimentos basada en la regeneración del suelo",
  lead: "Proyecto productivo de mujeres en Traslasierra, Córdoba, que aplica principios de agricultura regenerativa y documenta sus resultados.",
  primary: { label: "Conocé el proyecto", href: "#quienes-somos" },
};

export const quienes = {
  title: "Comunidad",
  statement:
    "La Biota es un proyecto productivo integrado por mujeres que trabajan de forma colectiva en un establecimiento rural de Traslasierra, Córdoba.",
  body: "El proyecto parte de una premisa: la salud del suelo condiciona la calidad de los alimentos y la estabilidad del agroecosistema. Sobre esa base producimos y comercializamos alimentos con trazabilidad completa, desde el manejo del suelo hasta el producto final.",
  historyTitle: "Historia del proyecto",
  history: [L.p1, L.p2, L.p3],
  historyPhoto: "Foto de muestra: el campo o el equipo trabajando",
  facts: [
    { label: "Año de inicio", value: "20XX" },
    { label: "Superficie del predio", value: "XX ha" },
    { label: "Integrantes", value: "XX" },
    { label: "Ubicación", value: "Traslasierra, Córdoba" },
  ],
  principlesTitle: "Principios",
  principles: [
    {
      title: "Organización colectiva",
      text: "Las decisiones productivas y económicas se toman de forma colegiada y el trabajo se distribuye entre las integrantes.",
    },
    {
      title: "Perspectiva de género",
      text: "Promovemos la participación de mujeres en la producción agropecuaria, un ámbito en el que históricamente estuvieron subrepresentadas.",
    },
    {
      title: "Transparencia",
      text: "Los métodos de manejo, los avances y las limitaciones del proyecto se registran y se comunican públicamente.",
    },
  ],
  teamTitle: "Integrantes",
  teamLead: L.short,
  team: [
    { name: "Nombre Apellido", role: "Rol en el proyecto", bio: L.mid },
    { name: "Nombre Apellido", role: "Rol en el proyecto", bio: L.mid },
    { name: "Nombre Apellido", role: "Rol en el proyecto", bio: L.mid },
    { name: "Nombre Apellido", role: "Rol en el proyecto", bio: L.mid },
  ],
};

export type Subproyecto = {
  id: string;
  title: string;
  text: string;
  illustration: string;
  detail: string[];
  facts: { label: string; value: string }[];
};

const subFacts = (escala: string) => [
  { label: "Escala", value: escala },
  { label: "Prácticas de manejo", value: L.short },
  { label: "Productos", value: "Lorem ipsum, dolor sit amet, consectetur" },
  { label: "Disponibilidad", value: "Lorem ipsum (estacional / todo el año)" },
];

export const queHacemos = {
  title: "El proyecto",
  lead: "El sistema productivo se organiza en cinco subproyectos interdependientes: los residuos y excedentes de cada uno se reincorporan como insumo de los demás.",
  detailTitle: "Detalle de cada subproyecto",
  items: [
    {
      id: "huertas",
      title: "Huertas",
      text: "Producción hortícola de estación sin agroquímicos de síntesis, con rotación de cultivos, cobertura permanente del suelo y compost elaborado en el predio.",
      illustration: "/illustrations/huertas.webp",
      detail: [L.p1, L.p2],
      facts: subFacts("XX parcelas, XX m²"),
    },
    {
      id: "huevos",
      title: "Huevos",
      text: "Gallinas ponedoras en sistema pastoril, con una dieta complementada por pasturas, invertebrados y residuos hortícolas.",
      illustration: "/illustrations/huevos.webp",
      detail: [L.p2, L.p3],
      facts: subFacts("XX gallinas"),
    },
    {
      id: "pollos",
      title: "Pollos",
      text: "Pollos parrilleros en pastoreo rotativo con gallineros móviles, que aportan fertilización orgánica distribuida sobre las parcelas.",
      illustration: "/illustrations/pollos.webp",
      detail: [L.p3, L.p1],
      facts: subFacts("XX aves por ciclo"),
    },
    {
      id: "conservas",
      title: "Conservas",
      text: "Procesamiento de excedentes hortícolas en conservas, dulces y encurtidos, que reduce las pérdidas de cosecha y agrega valor.",
      illustration: "/illustrations/conservas.webp",
      detail: [L.p1, L.p3],
      facts: subFacts("XX frascos por temporada"),
    },
    {
      id: "almacen",
      title: "Almacén orgánico",
      text: "Punto de comercialización que reúne la producción propia y la de productores locales con criterios de manejo compatibles.",
      illustration: "/illustrations/almacen.webp",
      detail: [L.p2, L.p1],
      facts: subFacts("XX productores asociados"),
    },
  ] satisfies Subproyecto[],
};

export const metodologia = {
  title: "Metodología",
  lead: "El manejo del establecimiento se basa en los principios generales de la agricultura regenerativa, adaptados a las condiciones edafoclimáticas de Traslasierra.",
  intro: [L.p1, L.p2],
  principlesTitle: "Principios de manejo",
  principles: [
    { title: "Mínima perturbación del suelo", text: L.mid },
    { title: "Cobertura permanente", text: L.mid },
    { title: "Raíces vivas todo el año", text: L.mid },
    { title: "Diversidad de especies", text: L.mid },
    { title: "Integración animal", text: L.mid },
    { title: "Adaptación al contexto local", text: L.mid },
  ],
  monitoringTitle: "Monitoreo e indicadores",
  monitoringLead:
    "Para evaluar el efecto del manejo se registran indicadores de suelo y de biodiversidad. Los valores se actualizan con cada campaña de muestreo.",
  indicators: [
    { name: "Materia orgánica del suelo", value: "XX %", method: L.short, frequency: "Anual" },
    { name: "Infiltración de agua", value: "XX mm/h", method: L.short, frequency: "Semestral" },
    { name: "Cobertura del suelo", value: "XX %", method: L.short, frequency: "Estacional" },
    { name: "Diversidad vegetal", value: "XX especies", method: L.short, frequency: "Anual" },
  ],
  indicatorsNote: "Valores de muestra. Línea de base: 20XX.",
};

export const haciaDonde = {
  title: "Objetivos",
  purposeLabel: "Nuestro propósito",
  purpose:
    "Restaurar la funcionalidad ecológica del suelo y demostrar que es posible producir alimentos de calidad con ese enfoque.",
  horizonLabel: "Nuestro horizonte",
  horizon:
    "Un agroecosistema con mayor contenido de materia orgánica, actividad biológica en el suelo y recuperación de la vegetación nativa, que abastezca a la comunidad de Traslasierra mediante circuitos cortos de comercialización.",
  horizonMore: L.p2,
  goalsLabel: "Nuestros objetivos",
  goals: [
    { id: "suelo", title: "Regenerar el suelo", text: "Incrementar la materia orgánica y la cobertura vegetal de todas las parcelas, con monitoreo periódico.", indicator: "Materia orgánica del suelo", target: "XX % al 20XX" },
    { id: "diversidad", title: "Diversificar la producción", text: "Incorporar frutales, aromáticas y semillas propias para aumentar la biodiversidad funcional.", indicator: "Especies cultivadas", target: "XX especies al 20XX" },
    { id: "mesas", title: "Ampliar el abastecimiento local", text: "Abastecer de forma regular a familias y comercios de la zona mediante circuitos cortos.", indicator: "Familias abastecidas", target: "XX familias al 20XX" },
    { id: "ciclos", title: "Cerrar ciclos de nutrientes", text: "Integrar los subproyectos para que los residuos de uno se reincorporen como insumo de otro.", indicator: "Insumos externos", target: "Reducción del XX % al 20XX" },
    { id: "compartir", title: "Sistematizar y difundir", text: "Registrar los resultados del manejo y compartirlos con otros proyectos productivos.", indicator: "Informes publicados", target: "XX por año" },
    { id: "sostener", title: "Sostenibilidad económica", text: "Garantizar un ingreso digno y estable para cada integrante del proyecto.", indicator: "Ingreso por integrante", target: "Lorem ipsum al 20XX" },
  ],
};

export type HitoEstado = "logrado" | "en-marcha" | "pendiente";

// TODO: confirmar hitos, fechas y estado real con La Biota.
export const hoy = {
  title: "El presente",
  lead: "Etapas cumplidas y pendientes respecto de los objetivos del proyecto. Esta sección se actualiza a medida que se completa cada etapa.",
  hereLabel: "Etapa actual",
  hitos: [
    { title: "Instalación en el predio", date: "20XX", text: "Diagnóstico inicial del suelo, de la disponibilidad de agua y de la vegetación nativa.", estado: "logrado", goal: "suelo" },
    { title: "Parcelas hortícolas", date: "20XX", text: "Implementación de las primeras parcelas y del sistema de compostaje.", estado: "logrado", goal: "diversidad" },
    { title: "Producción de huevos", date: "20XX", text: "Incorporación del gallinero y comercialización de los primeros huevos.", estado: "logrado", goal: "mesas" },
    { title: "Pollos pastoriles y conservas", date: "20XX", text: "Ensayo de gallineros móviles y puesta en marcha de la sala de elaboración.", estado: "en-marcha", goal: "ciclos" },
    { title: "Almacén orgánico", date: "20XX", text: "Apertura de un punto de venta propio junto a productores de la zona.", estado: "pendiente", goal: "mesas" },
    { title: "Sistematización de resultados", date: "20XX", text: "Publicación periódica de los datos de manejo y de los aprendizajes del proceso.", estado: "pendiente", goal: "compartir" },
  ] as { title: string; date: string; text: string; estado: HitoEstado; goal: string }[],
  currentTitle: "Etapa actual en detalle",
  current: [L.p1, L.p3],
  nextTitle: "Próximos pasos",
  next: [L.mid, L.short, L.mid],
};

export const estadoLabel: Record<HitoEstado, string> = {
  logrado: "Logrado",
  "en-marcha": "En marcha",
  pendiente: "Pendiente",
};

// Autocertificación: La Biota respalda con su propio conocimiento el origen de cada producto que ofrece.
export type Nivel = "verde" | "amarillo" | "naranja";
export type Categoria = "huerta" | "granja" | "conservas" | "almacen";

export const autocert = {
  title: "Autocertificación",
  lead: "Un sistema propio de certificación participativa que informa, para cada producto, cuánto puede garantizar La Biota sobre su origen agroecológico.",
  intro: L.p1,
  levels: [
    {
      id: "verde",
      name: "Verde",
      summary: "100 % orgánico o agroecológico",
      text: "Producción propia o de productores cuyo manejo conocemos de forma directa. Lo respaldamos porque vemos y sabemos cómo se produce.",
    },
    {
      id: "amarillo",
      name: "Amarillo",
      summary: "Agroecológico en parte",
      text: "Aproximadamente la mitad de los ingredientes son agroecológicos. Del resto no tenemos certeza sobre su forma de producción.",
    },
    {
      id: "naranja",
      name: "Naranja",
      summary: "Adquirido como agroecológico",
      text: "Se adquiere como agroecológico, pero no podemos verificarlo por medios propios porque se pierde la trazabilidad.",
    },
  ] as { id: Nivel; name: string; summary: string; text: string }[],
  categories: {
    huerta: "Huerta",
    granja: "Granja",
    conservas: "Conservas",
    almacen: "Almacén",
  } as Record<Categoria, string>,
  listTitle: "Productos",
  listNote: "Lista de muestra. Los productos y su nivel de certificación se completarán con la información de La Biota.",
  // TODO: reemplazar por la lista real de productos.
  products: [
    { name: "Lechuga de estación", category: "huerta", level: "verde", origin: "Producción propia", note: L.short },
    { name: "Acelga", category: "huerta", level: "verde", origin: "Producción propia", note: L.short },
    { name: "Tomate", category: "huerta", level: "verde", origin: "Producción propia", note: L.short },
    { name: "Huevos de pastoreo", category: "granja", level: "verde", origin: "Producción propia", note: L.short },
    { name: "Pollo pastoril", category: "granja", level: "verde", origin: "Producción propia", note: L.short },
    { name: "Salsa de tomate", category: "conservas", level: "verde", origin: "Producción propia", note: L.short },
    { name: "Dulce de durazno", category: "conservas", level: "amarillo", origin: "Elaboración propia", note: L.short },
    { name: "Pickles mixtos", category: "conservas", level: "amarillo", origin: "Elaboración propia", note: L.short },
    { name: "Miel", category: "almacen", level: "verde", origin: "Productor familiar de la zona", note: L.short },
    { name: "Harina integral", category: "almacen", level: "naranja", origin: "Intermediario", note: L.short },
    { name: "Yerba mate", category: "almacen", level: "naranja", origin: "Intermediario", note: L.short },
    { name: "Granola", category: "almacen", level: "amarillo", origin: "Productor familiar de la zona", note: L.short },
  ] as { name: string; category: Categoria; level: Nivel; origin: string; note: string }[],
};

export const preguntas = {
  title: "Preguntas frecuentes",
  items: [
    { q: "¿Qué es la agricultura regenerativa?", a: [L.p1] },
    { q: "¿Dónde se pueden adquirir los productos?", a: [L.p2] },
    { q: "¿Los productos cuentan con certificación?", a: [L.p3] },
    { q: "¿Cómo se mide la salud del suelo?", a: [L.p1, L.short] },
    { q: "¿Cómo se puede seguir el avance del proyecto?", a: [L.p2] },
  ],
};

export const seguinos = {
  title: "Conocé más del proyecto",
  text: "En Instagram publicamos el registro del trabajo en el campo, los avances de cada etapa y los resultados del manejo.",
  instagram: { label: "Instagram", handle: "@la.biota.regenerativa", href: "https://www.instagram.com/la.biota.regenerativa/" },
  place: "Traslasierra, Córdoba, Argentina",
};
