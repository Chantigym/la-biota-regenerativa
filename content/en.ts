// SAMPLE CONTENT (English). Same structure as es.ts: keep both files in sync.
// Lorem ipsum paragraphs and "XX" values are placeholders for information La Biota will provide.
import type { Categoria, HitoEstado, Nivel, Subproyecto } from "./es";

export const sample = {
  enabled: true,
  notice:
    "Sample version. Latin text (lorem ipsum), values marked XX and photos are placeholders and will be replaced with project information.",
};

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
    "A women-led farming project applying regenerative agriculture principles to food production in Traslasierra, Córdoba, Argentina.",
  url: "https://chantigym.github.io/la-biota-regenerativa/en/",
};

export const nav = [
  { href: "#quienes-somos", label: "Community" },
  { href: "#que-hacemos", label: "The project" },
  { href: "#autocertificacion", label: "Self-certification" },
  { href: "#metodologia", label: "Methods" },
  { href: "#hacia-donde", label: "Goals" },
  { href: "#hoy", label: "Today" },
  { href: "#preguntas", label: "FAQ" },
];

export const hero = {
  title: "Food production grounded in soil regeneration",
  lead: "Organic vegetable growers at El Mantillo, a rural plot in central Traslasierra, Córdoba.",
  primary: { label: "Discover the project", href: "#quienes-somos" },
};

export const quienes = {
  title: "Community",
  statement:
    "La Biota is an organic vegetable project run by women at El Mantillo, a rural plot in the heart of Traslasierra, Córdoba.",
  body: "The project rests on two pillars: conserving the native woodland that still remains on the plot and producing agroecological food while respecting local biodiversity. Its premise is that soil health shapes the health of plants, animals and people.",
  historyTitle: "Project history",
  history: [L.p1, L.p2, L.p3],
  historyPhoto: "Sample photo: the farm or the team at work",
  facts: [
    { label: "Founded", value: "20XX" },
    { label: "Plot size", value: "XX ha" },
    { label: "Members", value: "2" },
    { label: "Plot", value: "El Mantillo, Traslasierra" },
  ],
  principlesTitle: "Principles",
  principles: [
    { title: "Collective organisation", text: "Production and financial decisions are made jointly, and the work is shared among members." },
    { title: "Gender perspective", text: "We promote women's participation in farming, a field where they have historically been under-represented." },
    { title: "Transparency", text: "Management methods, progress and the project's limitations are recorded and shared publicly." },
    { title: "Local consumption", text: "We see buying local as a political stance: it shortens the distance between growers and eaters and strengthens the regional economy." },
  ],
  teamTitle: "Members",
  teamLead: L.short,
  team: [
    { name: "Name Surname", handle: "caroopaoloni", role: "Role in the project", bio: L.mid },
    { name: "Name Surname", handle: "merlina.maitena", role: "Role in the project", bio: L.mid },
  ],
};

const subFacts = (scale: string) => [
  { label: "Scale", value: scale },
  { label: "Management practices", value: L.short },
  { label: "Products", value: "Lorem ipsum, dolor sit amet, consectetur" },
  { label: "Availability", value: "Lorem ipsum (seasonal / year-round)" },
];

export const queHacemos = {
  title: "The project",
  lead: "The farm is organised into five interdependent sub-projects: the residues and surpluses of each one become inputs for the others.",
  detailTitle: "Each sub-project in detail",
  items: [
    {
      id: "huertas",
      title: "Vegetable gardens",
      text: "Seasonal organic vegetables grown without synthetic agrochemicals, with crop rotation, permanent soil cover and on-farm compost.",
      illustration: "/illustrations/huertas.webp",
      detail: [L.p1, L.p2],
      facts: subFacts("XX beds, XX m²"),
    },
    {
      id: "huevos",
      title: "Eggs",
      text: "Pasture-raised laying hens whose diet is supplemented with grass, invertebrates and vegetable scraps.",
      illustration: "/illustrations/huevos.webp",
      detail: [L.p2, L.p3],
      facts: subFacts("XX hens"),
    },
    {
      id: "pollos",
      title: "Chickens",
      text: "Broilers in rotational grazing with mobile coops, spreading organic fertility across the beds.",
      illustration: "/illustrations/pollos.webp",
      detail: [L.p3, L.p1],
      facts: subFacts("XX birds per cycle"),
    },
    {
      id: "conservas",
      title: "Preserves",
      text: "Surplus vegetables processed into preserves, jams and pickles, reducing harvest losses and adding value.",
      illustration: "/illustrations/conservas.webp",
      detail: [L.p1, L.p3],
      facts: subFacts("XX jars per season"),
    },
    {
      id: "almacen",
      title: "Organic pantry",
      text: "A shop bringing together our own produce and that of local growers with compatible practices.",
      illustration: "/illustrations/almacen.webp",
      detail: [L.p2, L.p1],
      facts: subFacts("XX partner growers"),
    },
  ] satisfies Subproyecto[],
};

export const metodologia = {
  title: "Methods",
  lead: "Farm management follows the general principles of regenerative agriculture, adapted to the soil and climate of Traslasierra.",
  intro: [L.p1, L.p2],
  principlesTitle: "Management principles",
  principles: [
    { title: "Minimal soil disturbance", text: L.mid },
    { title: "Permanent cover", text: L.mid },
    { title: "Living roots year-round", text: L.mid },
    { title: "Species diversity", text: L.mid },
    { title: "Animal integration", text: L.mid },
    { title: "Fitting the local context", text: L.mid },
  ],
  monitoringTitle: "Monitoring and indicators",
  monitoringLead: "Soil and biodiversity indicators are recorded to assess the effect of management. Values are updated with each sampling campaign.",
  indicators: [
    { name: "Soil organic matter", value: "XX %", method: L.short, frequency: "Yearly", series: [0.38, 0.44, 0.52, 0.6, 0.71] },
    { name: "Water infiltration", value: "XX mm/h", method: L.short, frequency: "Twice a year", series: [0.3, 0.36, 0.47, 0.55, 0.66] },
    { name: "Ground cover", value: "XX %", method: L.short, frequency: "Seasonal", series: [0.5, 0.58, 0.64, 0.78, 0.86] },
    { name: "Plant diversity", value: "XX species", method: L.short, frequency: "Yearly", series: [0.34, 0.4, 0.5, 0.57, 0.69] },
  ],
  indicatorsNote: "Sample values and series. Baseline: 20XX.",
  seriesLabels: ["20X1", "20X2", "20X3", "20X4", "20X5"],
};

export const haciaDonde = {
  title: "Goals",
  purposeLabel: "Our purpose",
  purpose: "To restore the ecological function of the soil and show that quality food can be produced this way.",
  horizonLabel: "Our horizon",
  horizon:
    "An agroecosystem with more organic matter, active soil life and recovering native vegetation, supplying the Traslasierra community through short supply chains.",
  horizonMore: L.p2,
  goalsLabel: "Our goals",
  goals: [
    { id: "suelo", title: "Regenerate the soil", text: "Increase organic matter and plant cover on every bed, with regular monitoring.", indicator: "Soil organic matter", target: "XX % by 20XX" },
    { id: "monte", title: "Conserve the native woodland", text: "Protect the native woodland on the plot and its biodiversity, integrating it into farm management.", indicator: "Native woodland area conserved", target: "XX ha by 20XX" },
    { id: "diversidad", title: "Diversify production", text: "Add fruit trees, herbs and saved seed to increase functional biodiversity.", indicator: "Crop species", target: "XX species by 20XX" },
    { id: "mesas", title: "Expand local supply", text: "Supply local families and shops regularly through short supply chains.", indicator: "Households supplied", target: "XX households by 20XX" },
    { id: "ciclos", title: "Close nutrient cycles", text: "Integrate the sub-projects so that each one's residues become another's inputs.", indicator: "External inputs", target: "XX % reduction by 20XX" },
    { id: "compartir", title: "Document and share", text: "Record management results and share them with other farming projects.", indicator: "Reports published", target: "XX per year" },
    { id: "sostener", title: "Economic sustainability", text: "Ensure a fair and stable income for every member of the project.", indicator: "Income per member", target: "Lorem ipsum by 20XX" },
  ],
};

export const hoy = {
  title: "Today",
  lead: "Completed and pending stages against the project's goals. This section is updated as each stage is completed.",
  hereLabel: "Current stage",
  hitos: [
    { title: "Settling on the plot", date: "20XX", text: "Initial assessment of soil, water availability and native vegetation.", estado: "logrado", goal: "suelo" },
    { title: "Vegetable beds", date: "20XX", text: "First beds and the composting system set up.", estado: "logrado", goal: "diversidad" },
    { title: "Egg production", date: "20XX", text: "Hen house added and first eggs sold.", estado: "logrado", goal: "mesas" },
    { title: "Pastured chickens and preserves", date: "20XX", text: "Trialling mobile coops and launching the processing kitchen.", estado: "en-marcha", goal: "ciclos" },
    { title: "Organic pantry", date: "20XX", text: "Opening our own shop together with local growers.", estado: "pendiente", goal: "mesas" },
    { title: "Documenting results", date: "20XX", text: "Regular publication of management data and lessons learned.", estado: "pendiente", goal: "compartir" },
  ] as { title: string; date: string; text: string; estado: HitoEstado; goal: string }[],
  currentTitle: "Current stage in detail",
  current: [L.p1, L.p3],
  nextTitle: "Next steps",
  next: [L.mid, L.short, L.mid],
};

export const estadoLabel: Record<HitoEstado, string> = {
  logrado: "Done",
  "en-marcha": "In progress",
  pendiente: "Pending",
};

export const mapa = {
  title: "El Mantillo",
  lead: "Layout of the production areas and the native woodland on the plot. Tap each point to see what happens there.",
  note: "Illustrative sample map. The location of each area will be adjusted to the real plot.",
  points: [
    { id: "huertas", title: "Vegetable gardens", x: 45, y: 27, text: "Beds with permanent cover and frost protection fleece. " + L.short },
    { id: "gallinero", title: "Hen house", x: 29, y: 29, text: "Laying hens with access to pasture. " + L.short },
    { id: "pollos", title: "Mobile coops", x: 23, y: 45, text: "Chickens in rotational grazing; the coops move across the beds. " + L.short },
    { id: "sala", title: "Processing kitchen", x: 58, y: 59, text: "Surplus processed into preserves, jams and pickles. " + L.short },
    { id: "compost", title: "Compost", x: 67, y: 72, text: "Compost piles with vegetable scraps and coop bedding. " + L.short },
    { id: "monte", title: "Native woodland", x: 80, y: 30, text: "Conserved native woodland, a refuge for biodiversity. " + L.short },
    { id: "casa", title: "House and water tank", x: 30, y: 63, text: "Home and irrigation water storage tank. " + L.short },
  ],
};

export const calendario = {
  title: "Seasonal calendar",
  lead: "Estimated availability of each vegetable through the year, based on the growing cycle in Traslasierra.",
  note: "Sample calendar.",
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  crops: [
    { name: "Lettuce", months: [2, 3, 4, 5, 6, 7, 8, 9, 10] },
    { name: "Chard", months: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
    { name: "Kale", months: [4, 5, 6, 7, 8, 9] },
    { name: "Cauliflower", months: [5, 6, 7, 8] },
    { name: "Beetroot", months: [3, 4, 5, 6, 7, 8, 9, 10] },
    { name: "Carrot", months: [4, 5, 6, 7, 8, 9, 10] },
    { name: "Tomato", months: [0, 1, 2, 3, 11] },
    { name: "Squash", months: [1, 2, 3, 4, 5] },
  ],
};

export const ciclo = {
  title: "How it all connects",
  center: "Nutrient cycle",
  autoHint: "It plays on its own; tap a stage to stop it.",
  lead: "The sub-projects form a cycle: the residues of each stage become inputs for the next, and organic matter returns to the soil.",
  nodes: [
    { id: "suelo", img: "/illustrations/suelo-vivo.webp", title: "Living soil", text: "Nutrients and water for crops", flow: "The soil and its active biota supply the vegetable garden with nutrients and water." },
    { id: "huerta", img: "/illustrations/huertas.webp", title: "Garden", text: "Vegetables, surplus and scraps", flow: "The garden produces vegetables for sale; scraps and surplus supplement the birds' diet." },
    { id: "aves", img: "/illustrations/huevos.webp", title: "Hens and chickens", text: "Eggs, meat, manure and bedding", flow: "The birds produce eggs and meat; their manure and coop bedding go to the compost." },
    { id: "compost", img: "/illustrations/compost.webp", title: "Compost", text: "Stabilised organic matter", flow: "Compost stabilises organic matter and returns it to the soil, closing the cycle." },
  ],
  outputs: [
    { title: "Preserves", text: "Garden surplus is processed instead of wasted." },
    { title: "Pantry", text: "Vegetables, eggs and preserves reach the local community." },
  ],
};

export const suelo = {
  title: "Soil biota",
  lead: "The project is named after the community of organisms living underground. Scroll down through the layers of a living soil.",
  layers: [
    { title: "Cover", text: "Plant cover and mulch protect the soil from erosion, regulate its temperature and keep it moist." },
    { title: "Roots", text: "Roots build soil structure and release exudates that feed the microbial community of the rhizosphere." },
    { title: "Soil fauna", text: "Earthworms, beetles and other invertebrates break down organic matter and dig channels that improve infiltration and aeration." },
    { title: "Fungi", text: "Mycelium networks, including mycorrhizae, extend the reach of roots and help them take up water and nutrients." },
    { title: "Microorganisms", text: "Bacteria and other microorganisms decompose organic matter and make nutrients available. They are the biota the project is named after." },
  ],
};

export const glosario: Record<string, string> = {
  biota: "All the organisms living in an environment; in soil it includes bacteria, fungi, earthworms and insects.",
  mycorrhizae: "Partnerships between fungi and plant roots that improve water and nutrient uptake.",
  compost: "Decomposed, stabilised organic matter added to the soil as fertiliser.",
  rhizosphere: "The zone of soil around roots, shaped by their exudates and microorganisms.",
  agroecological: "Produced with practices that combine ecological and social principles, without synthetic agrochemicals.",
  "native woodland": "The region's natural vegetation; in Traslasierra it includes algarrobo, chañar, espinillo and molle trees.",
  "short supply chains": "Ways of selling with few or no intermediaries between growers and consumers.",
};

export const video = {
  title: "A day on the farm",
  lead: "A walk through the daily work at El Mantillo.",
  placeholder: "Sample video: the farm video goes here",
  duration: "X:XX",
};

export const apoyar = {
  title: "Support the project",
  lead: "There are several ways to support La Biota without visiting the farm.",
  ways: [
    { title: "Buy local", text: "Choosing local vegetables and products sustains the project and shortens the chain. " + L.short },
    { title: "Contributions", text: "Financial contributions for tools, seeds or infrastructure. " + L.short },
    { title: "Spread the word", text: "Sharing the project online and recommending it to people looking for local food. " + L.short },
  ],
};

export const region = {
  title: "In the Traslasierra valley",
  lead: "El Mantillo sits on Route 14 at La Travesía, between La Población and Luyaba, at the foot of the Sierras de Comechingones.",
  note: "Illustrative, approximate map.",
  places: [
    { name: "Villa Dolores", x: 46, y: 31 },
    { name: "San Javier", x: 55, y: 56 },
    { name: "Route 14", x: 60, y: 44, kind: "ruta" },
    { name: "La Población", x: 50, y: 70 },
    { name: "Luyaba", x: 74, y: 80 },
    { name: "La Paz", x: 64, y: 93 },
    { name: "Sierras de Comechingones", x: 84, y: 20, kind: "zona" },
  ],
  farm: { name: "El Mantillo", x: 62, y: 73 },
};

export const clima = {
  title: "On the farm today",
  lat: -32.1,
  lon: -65.03,
};

export const gallina = {
  tips: {
    "que-hacemos": "Hens work too: they eat garden scraps and their manure ends up in the compost.",
    autocertificacion: "Check each product's colour: it shows how much we can vouch for its origin.",
    biota: "A teaspoon of healthy soil holds more microorganisms than there are people on Earth.",
    hoy: "Tap each stage name to see its details.",
  } as Record<string, string>,
};

export const agua = {
  title: "Water management",
  lead: "In a valley where rain falls mostly in summer, water is harvested, stored and applied efficiently.",
  practices: [
    { title: "Rainwater harvesting", text: "Rain from the roofs is collected into storage tanks. Lorem ipsum dolor sit amet." },
    { title: "Drip irrigation", text: "Water reaches each plant with minimal losses to evaporation and runoff. Lorem ipsum dolor sit amet." },
    { title: "Cover and mulch", text: "Covered soil holds moisture and reduces how often we water. Lorem ipsum dolor sit amet." },
    { title: "Seasonal watering", text: "Frequency is adjusted to each season's weather and soil moisture. Lorem ipsum dolor sit amet." },
  ],
  facts: [
    { label: "Storage capacity", value: "XX L" },
    { label: "Area under drip irrigation", value: "XX %" },
    { label: "Average annual rainfall", value: "XX mm" },
  ],
  note: "Sample data.",
};

export const semillas = {
  title: "Seed bank",
  lead: "We save seed from the varieties best suited to the plot, to sow them every season and share them.",
  note: "Sample varieties.",
  labels: { origin: "Origin", sowing: "Sowing", saved: "Saved since" },
  items: [
    { name: "Heirloom lettuce", crop: "Lettuce", origin: "Lorem ipsum", sowing: "Mar to Oct", saved: "20XX", tone: "salvia" },
    { name: "Platense tomato", crop: "Tomato", origin: "Lorem ipsum", sowing: "Aug to Oct", saved: "20XX", tone: "barro" },
    { name: "Butternut squash", crop: "Squash", origin: "Lorem ipsum", sowing: "Sep to Nov", saved: "20XX", tone: "yema" },
    { name: "White-stem chard", crop: "Chard", origin: "Lorem ipsum", sowing: "Feb to Apr", saved: "20XX", tone: "salvia" },
    { name: "Beetroot", crop: "Beetroot", origin: "Lorem ipsum", sowing: "Feb to Sep", saved: "20XX", tone: "barro" },
    { name: "Purple corn", crop: "Corn", origin: "Lorem ipsum", sowing: "Oct to Dec", saved: "20XX", tone: "yema" },
  ] as { name: string; crop: string; origin: string; sowing: string; saved: string; tone: "salvia" | "barro" | "yema" }[],
};

export const autocert = {
  title: "Self-certification",
  lead: "Our own participatory certification system, showing for each product how much La Biota can vouch for its agroecological origin.",
  intro: L.p1,
  levels: [
    { id: "verde", name: "Green", summary: "100 % organic or agroecological", text: "Our own produce or from growers whose practices we know first-hand. We vouch for it because we see and know how it is produced." },
    { id: "amarillo", name: "Yellow", summary: "Partly agroecological", text: "About half of the ingredients are agroecological. We are not certain how the rest are produced." },
    { id: "naranja", name: "Orange", summary: "Bought as agroecological", text: "Bought as agroecological, but we cannot verify it ourselves because traceability is lost." },
  ] as { id: Nivel; name: string; summary: string; text: string }[],
  categories: { huerta: "Garden", granja: "Farmyard", conservas: "Preserves", almacen: "Pantry" } as Record<Categoria, string>,
  listTitle: "Products",
  listNote: "Sample list. Products and their certification level will be completed with La Biota's information.",
  products: [
    { name: "Seasonal lettuce", category: "huerta", level: "verde", origin: "Own production", note: L.short },
    { name: "Chard", category: "huerta", level: "verde", origin: "Own production", note: L.short },
    { name: "Tomato", category: "huerta", level: "verde", origin: "Own production", note: L.short },
    { name: "Pasture-raised eggs", category: "granja", level: "verde", origin: "Own production", note: L.short },
    { name: "Pastured chicken", category: "granja", level: "verde", origin: "Own production", note: L.short },
    { name: "Tomato sauce", category: "conservas", level: "verde", origin: "Own production", note: L.short },
    { name: "Peach jam", category: "conservas", level: "amarillo", origin: "Made by us", note: L.short },
    { name: "Mixed pickles", category: "conservas", level: "amarillo", origin: "Made by us", note: L.short },
    { name: "Honey", category: "almacen", level: "verde", origin: "Local family grower", note: L.short },
    { name: "Wholemeal flour", category: "almacen", level: "naranja", origin: "Intermediary", note: L.short },
    { name: "Yerba mate", category: "almacen", level: "naranja", origin: "Intermediary", note: L.short },
    { name: "Granola", category: "almacen", level: "amarillo", origin: "Local family grower", note: L.short },
  ] as { name: string; category: Categoria; level: Nivel; origin: string; note: string }[],
};

export const preguntas = {
  title: "Frequently asked questions",
  items: [
    { q: "What is regenerative agriculture?", a: [L.p1] },
    { q: "Where can I buy the products?", a: [L.p2] },
    { q: "Are the products certified?", a: [L.p3] },
    { q: "How is soil health measured?", a: [L.p1, L.short] },
    { q: "How can I follow the project's progress?", a: [L.p2] },
  ],
};

export const seguinos = {
  title: "Learn more about the project",
  text: "On Instagram we share records of the work on the farm, progress at each stage and management results.",
  instagram: { label: "Instagram", handle: "@la.biota.regenerativa", href: "https://www.instagram.com/la.biota.regenerativa/" },
  place: "Traslasierra, Córdoba, Argentina",
};

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const ui = {
  htmlLang: "en",
  metaTitle: "La Biota Regenerativa | Regenerative agriculture in Traslasierra",
  skip: "Skip to content",
  loading: "Loading…",
  homeAria: "La Biota Regenerativa, go to top",
  navMain: "Main",
  navMobile: "Menu",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  toNight: "Switch to night mode",
  toDay: "Switch to day mode",
  soundOn: "Turn sound on",
  soundOff: "Turn sound off",
  notFound: {
    title: "This page doesn't exist",
    text: "The little hen searched the whole farm and couldn't find it. The link may be mistyped or the page may have moved.",
    back: "Back to home",
  },
  lang: { short: "ES", aria: "Ver el sitio en español", lang: "es" },
  sideIndex: "Section index",
  sections: [
    { id: "quienes-somos", label: "Community" },
    { id: "el-mantillo", label: "El Mantillo" },
    { id: "que-hacemos", label: "The project" },
    { id: "autocertificacion", label: "Self-certification" },
    { id: "metodologia", label: "Methods" },
    { id: "agua", label: "Water" },
    { id: "semillas", label: "Seeds" },
    { id: "biota", label: "Soil biota" },
    { id: "hacia-donde", label: "Goals" },
    { id: "hoy", label: "Today" },
    { id: "preguntas", label: "FAQ" },
    { id: "apoyar", label: "Support" },
    { id: "seguinos", label: "Instagram" },
  ],
  heroAria: "Illustration: a woman drives a tractor over a hill",
  seeDetail: "See details",
  seeDetailOf: (t: string) => ` of ${t}`,
  photoSample: "Sample photo",
  goal: "Goal:",
  indicator: "Indicator:",
  target: "Target:",
  frequency: "Frequency:",
  sampleValue: "sample value",
  sampleSeries: "sample series",
  layerOf: (i: number, n: number) => `Layer ${i} of ${n}`,
  layer: (i: number) => `Layer ${i}`,
  map: {
    predio: "The plot",
    hint: "Pick a point on the map or in the list to see what happens in each area.",
    all: "Show all",
  },
  weather: {
    error: "We couldn't load the weather right now. Please try again later.",
    loading: "Loading the weather",
    clear: "Clear",
    partly: "Partly cloudy",
    cloudy: "Cloudy",
    snow: "Snow",
    rain: "Rain",
    variable: "Variable",
  },
  cycleHint: "Tap each stage of the cycle to see what it contributes to the next.",
  timelineHint: "Tap each stage name to see its details.",
  stageDetail: "Stage details",
  stageSample: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus, posuere velit aliquet.",
  calendar: {
    crop: "Vegetable",
    available: "Available",
    unavailable: "Not available",
    inMonth: (m: string) => `In ${m}:`,
    see: (m: string, current: boolean) => `See what's available in ${m}${current ? " (this month)" : ""}`,
    none: "no vegetables in this sample calendar",
    caption: (t: string, m: string | null) => `${t}: months when each vegetable is available${m ? `. This month: ${m}` : ""}`,
    cell: (c: string, m: string, on: boolean) => `${c}, ${m}: ${on ? "available" : "not available"}`,
    monthsFull: MONTHS,
  },
  products: {
    search: "Search products",
    placeholder: "e.g. eggs, preserves, honey",
    clear: "Clear search",
    sortBy: "Sort by",
    byLevel: "Certification",
    byCategory: "Category",
    found: (n: number) => `${n} products found`,
    noneTitle: (q: string) => `No products match “${q}”.`,
    noneHint: "Try another word, a category (Garden, Farmyard, Preserves, Pantry) or a level (Green, Yellow, Orange).",
    seeAll: "Show all products",
    close: "Close details",
    levelTitle: "Certification level",
    howTitle: "How it's produced",
    howText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper nulla non metus.",
    presTitle: "Size and availability",
    presText: "Lorem ipsum (XX g) · available lorem ipsum.",
    sample: "Sample details.",
  },
  footer: {
    sitemap: "Site map",
    sections: "Sections",
    more: "More",
    extra: [
      { href: "#el-mantillo", label: "El Mantillo" },
      { href: "#biota", label: "Soil biota" },
      { href: "#apoyar", label: "Support the project" },
    ],
    qr: "Printable QR code",
    place: "Traslasierra, Córdoba, Argentina.",
  },
  hen: "Tip from the guide hen",
  sealRing: "SELF-CERTIFICATION ★ LA BIOTA",
  qr: { title: "Scan to discover the project", print: "Print", meta: "Printable QR code" },
};
