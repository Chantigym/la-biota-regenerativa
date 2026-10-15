// CONTENIDO DE MUESTRA (castellano). en.ts tiene la misma estructura en inglés: mantener ambos sincronizados.
// - Los párrafos en latín (lorem ipsum) y los datos con "XX" son de ejemplo: muestran dónde va información
//   que tiene que aportar La Biota y cuánto espacio ocupa.
// - Los textos en castellano son un borrador de redacción académica, también a validar.
// Cuando el contenido real esté completo, poner `sample.enabled` en false (en es.ts y en.ts) para ocultar el aviso.

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
  lead: "Productoras de verdura orgánica en El Mantillo, un predio rural del centro de Traslasierra, Córdoba.",
  primary: { label: "Conocé el proyecto", href: "#quienes-somos" },
};

export const quienes = {
  title: "Comunidad",
  statement:
    "La Biota es un proyecto de producción de verdura orgánica llevado adelante por mujeres en El Mantillo, un predio rural ubicado en el centro de Traslasierra, Córdoba.",
  body: "El proyecto se organiza en torno a dos ejes: conservar el monte nativo que aún persiste en el predio y producir alimentos agroecológicos respetando la biodiversidad del entorno. Parte de una premisa: la salud del suelo condiciona la de las plantas, los animales y las personas.",
  historyTitle: "Historia del proyecto",
  history: [L.p1, L.p2, L.p3],
  historyPhoto: "Foto de muestra: el campo o el equipo trabajando",
  facts: [
    { label: "Año de inicio", value: "20XX" },
    { label: "Superficie del predio", value: "XX ha" },
    { label: "Integrantes", value: "2" },
    { label: "Predio", value: "El Mantillo, Traslasierra" },
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
    {
      title: "Consumo local",
      text: "Entendemos el consumo local como una posición política: acorta la distancia entre quien produce y quien consume, y fortalece la economía de la región.",
    },
  ],
  teamTitle: "Integrantes",
  teamLead: L.short,
  // TODO: nombre completo, rol y foto de cada integrante.
  team: [
    { name: "Nombre Apellido", handle: "caroopaoloni", role: "Rol en el proyecto", bio: L.mid },
    { name: "Nombre Apellido", handle: "merlina.maitena", role: "Rol en el proyecto", bio: L.mid },
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
      text: "Producción de verdura orgánica de estación, sin agroquímicos de síntesis, con rotación de cultivos, cobertura permanente del suelo y compost elaborado en el predio.",
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
    // series: valores relativos de muestra (0 a 1) por campaña, solo para mostrar el gráfico
    { name: "Materia orgánica del suelo", value: "XX %", method: L.short, frequency: "Anual", series: [0.38, 0.44, 0.52, 0.6, 0.71] },
    { name: "Infiltración de agua", value: "XX mm/h", method: L.short, frequency: "Semestral", series: [0.3, 0.36, 0.47, 0.55, 0.66] },
    { name: "Cobertura del suelo", value: "XX %", method: L.short, frequency: "Estacional", series: [0.5, 0.58, 0.64, 0.78, 0.86] },
    { name: "Diversidad vegetal", value: "XX especies", method: L.short, frequency: "Anual", series: [0.34, 0.4, 0.5, 0.57, 0.69] },
  ],
  indicatorsNote: "Valores y series de muestra. Línea de base: 20XX.",
  seriesLabels: ["20X1", "20X2", "20X3", "20X4", "20X5"],
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
    { id: "monte", title: "Conservar el monte nativo", text: "Proteger el monte nativo que persiste en el predio y la biodiversidad asociada, integrándolo al manejo productivo.", indicator: "Superficie de monte nativo conservada", target: "XX ha al 20XX" },
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

// Mapa ilustrado del predio. x/y en % sobre la ilustración.
// TODO: confirmar sectores y ubicación real con La Biota (el mapa es ilustrativo).
export const mapa = {
  title: "El Mantillo",
  lead: "Distribución de los sectores productivos y del monte nativo dentro del predio. Tocá cada punto para conocer qué se hace en ese lugar.",
  note: "Mapa ilustrativo de muestra. La ubicación de cada sector se ajustará al predio real.",
  points: [
    { id: "huertas", title: "Huertas", x: 45, y: 27, text: "Parcelas hortícolas con cobertura permanente y mantas de protección contra heladas. " + L.short },
    { id: "gallinero", title: "Gallinero", x: 29, y: 29, text: "Gallinas ponedoras con acceso a pastoreo. " + L.short },
    { id: "pollos", title: "Gallineros móviles", x: 23, y: 45, text: "Pollos en pastoreo rotativo; los gallineros se trasladan sobre las parcelas. " + L.short },
    { id: "sala", title: "Sala de elaboración", x: 58, y: 59, text: "Procesamiento de excedentes en conservas, dulces y encurtidos. " + L.short },
    { id: "compost", title: "Compost", x: 67, y: 72, text: "Pilas de compostaje con residuos hortícolas y cama de los gallineros. " + L.short },
    { id: "monte", title: "Monte nativo", x: 80, y: 30, text: "Sector de monte nativo bajo conservación, refugio de biodiversidad. " + L.short },
    { id: "casa", title: "Casa y reserva de agua", x: 30, y: 63, text: "Vivienda y tanque de almacenamiento de agua para riego. " + L.short },
  ],
};

// Calendario de estación. Meses: 0 = enero … 11 = diciembre.
// TODO: reemplazar por la disponibilidad real de cada verdura.
export const calendario = {
  title: "Calendario de estación",
  lead: "Disponibilidad estimada de cada verdura a lo largo del año, según el ciclo de cultivo en Traslasierra.",
  note: "Calendario de muestra.",
  months: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
  crops: [
    { name: "Lechuga", months: [2, 3, 4, 5, 6, 7, 8, 9, 10] },
    { name: "Acelga", months: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
    { name: "Kale", months: [4, 5, 6, 7, 8, 9] },
    { name: "Coliflor", months: [5, 6, 7, 8] },
    { name: "Remolacha", months: [3, 4, 5, 6, 7, 8, 9, 10] },
    { name: "Zanahoria", months: [4, 5, 6, 7, 8, 9, 10] },
    { name: "Tomate", months: [0, 1, 2, 3, 11] },
    { name: "Zapallo", months: [1, 2, 3, 4, 5] },
  ],
};

// Ciclo de nutrientes entre subproyectos
export const ciclo = {
  title: "Cómo se conectan",
  center: "Ciclo de nutrientes",
  autoHint: "Se recorre solo; tocá una etapa para detenerlo.",
  lead: "Los subproyectos forman un ciclo: los residuos de cada etapa se reincorporan como insumo de la siguiente y la materia orgánica vuelve al suelo.",
  nodes: [
    { id: "suelo", img: "/illustrations/suelo-vivo.webp", title: "Suelo vivo", text: "Nutrientes y agua para los cultivos", flow: "El suelo, con su biota activa, pone a disposición de la huerta nutrientes y agua. " },
    { id: "huerta", img: "/illustrations/huertas.webp", title: "Huerta", text: "Verdura, excedentes y residuos", flow: "La huerta produce verdura para la venta; los residuos y excedentes complementan la alimentación de las aves. " },
    { id: "aves", img: "/illustrations/huevos.webp", title: "Gallinas y pollos", text: "Huevos, carne, guano y cama", flow: "Las aves producen huevos y carne; su guano y la cama de los gallineros se destinan al compost. " },
    { id: "compost", img: "/illustrations/compost.webp", title: "Compost", text: "Materia orgánica estabilizada", flow: "El compost estabiliza la materia orgánica y la devuelve al suelo, cerrando el ciclo. " },
  ],
  outputs: [
    { title: "Conservas", text: "Los excedentes de la huerta se procesan y no se pierden." },
    { title: "Almacén", text: "Verdura, huevos y conservas llegan a la comunidad local." },
  ],
};

// La biota del suelo: recorrido por capas (de la superficie hacia abajo)
export const suelo = {
  title: "La biota del suelo",
  lead: "El nombre del proyecto viene de la comunidad de organismos que vive bajo tierra. Bajá para recorrer las capas de un suelo vivo.",
  layers: [
    { title: "Cobertura", text: "La cobertura vegetal y el mantillo protegen el suelo de la erosión, regulan su temperatura y conservan la humedad." },
    { title: "Raíces", text: "Las raíces estructuran el suelo y liberan exudados que alimentan a la comunidad microbiana de la rizósfera." },
    { title: "Fauna del suelo", text: "Lombrices, escarabajos y otros invertebrados fragmentan la materia orgánica y abren galerías que mejoran la infiltración y la aireación." },
    { title: "Hongos", text: "Las redes de micelio, entre ellas las micorrizas, extienden el alcance de las raíces y facilitan la absorción de agua y nutrientes." },
    { title: "Microorganismos", text: "Bacterias y otros microorganismos descomponen la materia orgánica y vuelven disponibles los nutrientes. Son la biota que da nombre al proyecto." },
  ],
};

// Glosario: términos que aparecen subrayados en el texto y muestran su definición al tocarlos.
export const glosario: Record<string, string> = {
  biota: "Conjunto de organismos que viven en un ambiente; en el suelo incluye bacterias, hongos, lombrices e insectos.",
  micorrizas: "Asociaciones entre hongos y raíces de plantas que mejoran la absorción de agua y nutrientes.",
  compost: "Materia orgánica descompuesta y estabilizada que se incorpora al suelo como abono.",
  rizósfera: "Zona del suelo que rodea a las raíces y está influida por sus exudados y microorganismos.",
  agroecológico: "Producido con prácticas que integran principios ecológicos y sociales, sin agroquímicos de síntesis.",
  "monte nativo": "Vegetación natural de la región; en Traslasierra incluye algarrobo, chañar, espinillo y molle.",
  "circuitos cortos": "Formas de comercialización con pocos o ningún intermediario entre quien produce y quien consume.",
};

// Video del campo. TODO: subir el video real (archivo o link de YouTube/Vimeo).
export const video = {
  title: "Un día en el campo",
  lead: "Recorrido por las tareas diarias en El Mantillo.",
  placeholder: "Video de muestra: acá va el video del campo",
  duration: "X:XX",
};

// Apoyar el proyecto (sin visitas al campo). TODO: confirmar formas de apoyo.
export const apoyar = {
  title: "Apoyar el proyecto",
  lead: "Hay distintas formas de acompañar a La Biota sin necesidad de visitar el campo.",
  ways: [
    { title: "Comprar local", text: "Elegir verdura y productos de la zona sostiene el proyecto y acorta la cadena. " + L.short },
    { title: "Aportes", text: "Aportes económicos para herramientas, semillas o infraestructura. " + L.short },
    { title: "Difusión", text: "Compartir el proyecto en redes y recomendarlo a quienes buscan alimentos locales. " + L.short },
  ],
};

// Mapa de Traslasierra. x/y en % sobre la ilustración (aproximado). El Mantillo: ruta 14, La Travesía, entre La Población y Luyaba.
export const region = {
  title: "En el valle de Traslasierra",
  lead: "El Mantillo está sobre la ruta 14, en La Travesía, entre La Población y Luyaba, al pie de las Sierras de Comechingones.",
  note: "Mapa ilustrativo y aproximado.",
  places: [
    { name: "Villa Dolores", x: 46, y: 31 },
    { name: "San Javier", x: 55, y: 56 },
    { name: "Ruta 14", x: 60, y: 44, kind: "ruta" },
    { name: "La Población", x: 50, y: 70 },
    { name: "Luyaba", x: 74, y: 80 },
    { name: "La Paz", x: 64, y: 93 },
    { name: "Sierras de Comechingones", x: 84, y: 20, kind: "zona" },
  ],
  farm: { name: "El Mantillo", x: 62, y: 73 },
};

// Clima en el campo (Open-Meteo, sin clave). Coordenadas aproximadas de La Travesía (ruta 14, entre La Población y Luyaba).
export const clima = {
  title: "Hoy en el campo",
  lat: -32.1,
  lon: -65.03,
};

// Gallina guía: aparece en algunas secciones con un dato corto (tono informativo).
export const gallina = {
  tips: {
    "que-hacemos": "Las gallinas también trabajan: comen restos de la huerta y su guano termina en el compost.",
    autocertificacion: "Fijate el color de cada producto: indica cuánto podemos garantizar sobre su origen.",
    biota: "En una cucharada de suelo sano hay más microorganismos que personas en el planeta.",
    hoy: "Tocá el nombre de cada etapa para ver su detalle.",
  } as Record<string, string>,
};

// Manejo del agua. TODO: datos reales.
export const agua = {
  title: "Manejo del agua",
  lead: "En un valle con lluvias concentradas en verano, el agua se cosecha, se almacena y se aplica de forma eficiente.",
  practices: [
    { title: "Cosecha de lluvia", text: "Captación del agua de lluvia de los techos hacia tanques de almacenamiento. Lorem ipsum dolor sit amet." },
    { title: "Riego por goteo", text: "El agua llega a cada planta con pérdidas mínimas por evaporación y escurrimiento. Lorem ipsum dolor sit amet." },
    { title: "Cobertura y mantillo", text: "El suelo cubierto conserva la humedad y reduce la frecuencia de riego. Lorem ipsum dolor sit amet." },
    { title: "Riego según la estación", text: "La frecuencia se ajusta al clima de cada época y a la humedad del suelo. Lorem ipsum dolor sit amet." },
  ],
  facts: [
    { label: "Capacidad de almacenamiento", value: "XX L" },
    { label: "Superficie con riego por goteo", value: "XX %" },
    { label: "Lluvia anual promedio", value: "XX mm" },
  ],
  note: "Datos de muestra.",
};

// Banco de semillas: variedades propias. TODO: lista real.
export const semillas = {
  title: "Banco de semillas",
  lead: "Guardamos semillas de las variedades que mejor se adaptan al predio, para sembrarlas cada temporada y compartirlas.",
  note: "Variedades de muestra.",
  labels: { origin: "Origen", sowing: "Siembra", saved: "Guardadas desde" },
  items: [
    { name: "Lechuga criolla", crop: "Lechuga", origin: "Lorem ipsum", sowing: "Mar a Oct", saved: "20XX", tone: "salvia" },
    { name: "Tomate platense", crop: "Tomate", origin: "Lorem ipsum", sowing: "Ago a Oct", saved: "20XX", tone: "barro" },
    { name: "Zapallo anco", crop: "Zapallo", origin: "Lorem ipsum", sowing: "Sep a Nov", saved: "20XX", tone: "yema" },
    { name: "Acelga penca blanca", crop: "Acelga", origin: "Lorem ipsum", sowing: "Feb a Abr", saved: "20XX", tone: "salvia" },
    { name: "Remolacha", crop: "Remolacha", origin: "Lorem ipsum", sowing: "Feb a Sep", saved: "20XX", tone: "barro" },
    { name: "Maíz morado", crop: "Maíz", origin: "Lorem ipsum", sowing: "Oct a Dic", saved: "20XX", tone: "yema" },
  ] as { name: string; crop: string; origin: string; sowing: string; saved: string; tone: "salvia" | "barro" | "yema" }[],
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

// Textos de interfaz (botones, etiquetas, avisos y textos para lectores de pantalla)
const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
export const ui = {
  htmlLang: "es-AR",
  metaTitle: "La Biota Regenerativa | Agricultura regenerativa en Traslasierra",
  skip: "Saltar al contenido",
  loading: "Cargando…",
  homeAria: "La Biota Regenerativa, ir al inicio",
  navMain: "Principal",
  navMobile: "Menú",
  openMenu: "Abrir menú",
  closeMenu: "Cerrar menú",
  toNight: "Cambiar a modo noche",
  toDay: "Cambiar a modo día",
  soundOn: "Activar sonido",
  soundOff: "Desactivar sonido",
  notFound: {
    title: "Esta página no existe",
    text: "La gallinita la buscó por todo el campo y no la encontró. Puede que el link esté mal escrito o que la página se haya movido.",
    back: "Volver al inicio",
  },
  lang: { short: "EN", aria: "Ver el sitio en inglés", lang: "en" },
  heroAria: "Ilustración: una mujer maneja un tractor sobre una loma",
  seeDetail: "Ver detalle",
  seeDetailOf: (t: string) => ` de ${t}`,
  photoSample: "Foto de muestra",
  goal: "Objetivo:",
  indicator: "Indicador:",
  target: "Meta:",
  frequency: "Frecuencia:",
  sampleValue: "valor de muestra",
  sampleSeries: "serie de muestra",
  layerOf: (i: number, n: number) => `Capa ${i} de ${n}`,
  layer: (i: number) => `Capa ${i}`,
  map: {
    predio: "El predio",
    hint: "Elegí un punto del mapa o de la lista para ver qué se hace en cada sector.",
    all: "Ver todo",
  },
  weather: {
    error: "No pudimos cargar el clima en este momento. Volvé a intentar más tarde.",
    loading: "Cargando el clima",
    clear: "Despejado",
    partly: "Parcialmente nublado",
    cloudy: "Nublado",
    snow: "Nieve",
    rain: "Lluvia",
    variable: "Variable",
  },
  cycleHint: "Tocá cada etapa del ciclo para ver qué aporta a la siguiente.",
  timelineHint: "Tocá el nombre de cada etapa para ver su detalle.",
  stageDetail: "Detalle de la etapa",
  stageSample: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus, posuere velit aliquet.",
  calendar: {
    crop: "Verdura",
    available: "Disponible",
    unavailable: "No disponible",
    inMonth: (m: string) => `En ${m}:`,
    see: (m: string, current: boolean) => `Ver qué hay en ${m}${current ? " (mes actual)" : ""}`,
    none: "sin verduras en este calendario de muestra",
    caption: (t: string, m: string | null) => `${t}: meses en los que hay cada verdura${m ? `. Mes actual: ${m}` : ""}`,
    cell: (c: string, m: string, on: boolean) => `${c}, ${m}: ${on ? "disponible" : "no disponible"}`,
    monthsFull: MESES,
  },
  products: {
    search: "Buscar producto",
    placeholder: "Ej.: huevos, conservas, miel",
    clear: "Borrar búsqueda",
    sortBy: "Ordenar por",
    byLevel: "Certificación",
    byCategory: "Categoría",
    found: (n: number) => `${n} productos encontrados`,
    noneTitle: (q: string) => `No hay productos que coincidan con «${q}».`,
    noneHint: "Probá con otra palabra, una categoría (Huerta, Granja, Conservas, Almacén) o un nivel (Verde, Amarillo, Naranja).",
    seeAll: "Ver todos los productos",
    close: "Cerrar ficha",
    levelTitle: "Nivel de certificación",
    howTitle: "Cómo se produce",
    howText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper nulla non metus.",
    presTitle: "Presentación y disponibilidad",
    presText: "Lorem ipsum (XX g) · disponible lorem ipsum.",
    sample: "Ficha de muestra.",
  },
  footer: {
    sitemap: "Mapa del sitio",
    sections: "Secciones",
    more: "Más",
    extra: [
      { href: "#el-mantillo", label: "El Mantillo" },
      { href: "#biota", label: "La biota del suelo" },
      { href: "#apoyar", label: "Apoyar el proyecto" },
    ],
    qr: "QR para imprimir",
    place: "Traslasierra, Córdoba, Argentina.",
  },
  hen: "Dato de la gallina guía",
  sealRing: "AUTOCERTIFICACIÓN ★ LA BIOTA",
  qr: { title: "Escaneá para conocer el proyecto", print: "Imprimir", meta: "QR para imprimir" },
};
