# DESIGN.md · La Biota Regenerativa

Este documento define el diseño del sitio y manda sobre cualquier otra decisión: cada componente nuevo tiene que respetarlo.

## Lectura del brief
Es un sitio de una sola página que presenta la identidad de un proyecto de mujeres que hacen agricultura regenerativa en Traslasierra, Córdoba. Le habla a vecinos, clientes, posibles visitantes y a cualquier curioso. El tono es honesto, cálido y concreto, y lo visual sale del logo: tinta negra a marcador, dibujada a mano.

**Dirección visual:** impresión rural en dos tintas, como un sobre de semillas o un afiche de feria. La tinta del logo se combina con un color plano amarillo yema. No hay degradados ni sombras grandes, y todo es "impreso" y plano.

**Diales:** VARIANCE 6 · MOTION 3 · DENSITY 3.

## Color (tokens en `app/globals.css`)
| Token | Valor | Uso |
|---|---|---|
| `--paper` | #FAFAF6 | fondo de página |
| `--ink` | #1D201B | texto, logo, ilustraciones, CTA |
| `--muted` | #4D5348 | texto secundario (AA sobre paper) |
| `--yema` | #F2B42C | tinta plana de marca: fondo del hero, marcador "Estamos acá", celda Huevos |
| `--on-yema` | #1D201B | texto sobre yema |
| `--monte` | #2D4A33 | bloque "Hacia dónde" y celda Huertas (texto paper) |
| `--salvia` | #DFE5D5 | tinte suave |
| `--barro` | #EADFD2 | tinte suave |
| `--hero-bg` / `--hero-fg` | yema / ink | hero |
| `--cert-verde` / `--cert-amarillo` / `--cert-naranja` | #2F7A3B / #F2B42C / #E8762B | niveles de autocertificación; siempre con su nombre escrito, nunca solo el color (texto encima: paper sobre verde, ink sobre amarillo y naranja) |

**Reglas de color:**
- Hay un solo color de marca (yema), siempre plano y nunca en degradé.
- El CTA usa el par ink/paper de la paleta clara.
- Nunca se usa #000 ni #fff puros.

## Tipografía
- **Bricolage Grotesque** (next/font, pesos fijos 700 y 800, sin ejes variables, que son caros de dibujar en celulares) para títulos. Va con tracking ajustado y su ancho estándar.
- **Figtree** para cuerpo y UI. El cuerpo va en 17 a 18px, con interlineado de 1.6 y un largo de línea de 65ch o menos.
- **Escala:** UI y meta 14-16px · cuerpo 17-20px · subtítulos 20-26px · títulos de sección 36-48px · enunciados (Quiénes somos, Propósito) 32-62px · hero 42-61px.
- **Lo que se evita:** etiquetas en mayúsculas, eyebrows sobre cada título y destacar una sola palabra dentro de un titular.

## Forma
- Los botones son píldoras (radio completo).
- Los bloques y las celdas del bento usan radio de 20px. No llevan sombra; se separan por color de fondo o por borde de 1.5px en tinta.
- El foco es un anillo de 3px en tinta con offset de 3px.

## Ilustración
- El logo vectorizado está en `public/brand/*.svg`, generado con `scripts/trace-logo.mjs`. El sitio usa su versión raster `*.webp`, generada con `scripts/raster-logo.mjs`, como `mask-image`: una máscara SVG con miles de nodos es cara de pintar en celulares. Así toma el color del texto.
- Las ilustraciones de los subproyectos están en `public/illustrations/*.webp`, con canal alpha, y también son máscaras.
- Son decorativas: llevan `aria-hidden` porque el texto al lado ya las describe.
- Las fotos que lleguen después tienen que entrar en slots con `aspect-ratio` fijo.

## Movimiento
- **Tokens** en `lib/motion.ts` y en las variables CSS `--dur-*` y `--ease-out`:
  - fast 150ms · base 220ms · slow 320ms · path 900ms · pass 1.3s
  - ease-out `cubic-bezier(.23,1,.32,1)`
- **Momentos de relato:**
  1. La entrada del hero, hecha en CSS para que funcione sin JS: el tractor entra 24px desde la izquierda y el texto aparece en cascada de 40ms.
  2. **Separador de secciones:** un surco ondulado estático (`components/brand/SectionFurrow.tsx`). La animación del tractor y la del hero se sacaron a pedido; quedan en el historial de git (commit 7c82d04).

  - **Surco de progreso** (`PageFurrow`): fijo al costado, solo desde 1360px de ancho y después del hero.
  - **Detalles:** números que cuentan (`CountUp`), hitos que se encienden (`NodePop`), sección activa en el menú (`layoutId`), productos que viajan a su lugar al reordenar y hovers en el bento y en las tarjetas de nivel.
  - **Peso:** `domMax` (layout) se carga aparte, en `lib/motion-features.ts`.
  3. El surco de "Dónde estamos hoy", que se dibuja hasta el hito actual (Motion `pathLength`, `whileInView`, `once`).
- **Respuesta a acciones:** el press en botones (`scale .98`) y el menú móvil con `AnimatePresence`, donde la salida dura el 70% de la entrada.
- **Reglas:**
  - Solo se animan transform, opacity y pathLength.
  - Se respeta `prefers-reduced-motion` (CSS más `MotionConfig reducedMotion="user"`).
- Motion se carga con `LazyMotion` + `domAnimation` y componentes `m.*`, solo en hojas `'use client'`.

## Movimiento por zona (estado actual)
- **Hero:** el tractor se dibuja con marcador y después se entinta (CSS, sin JS); el título aparece palabra por palabra; una nota a mano.
- **Entre secciones:** el surco ondulado se traza al entrar (`FurrowLine`); los bloques de color (Objetivos, La biota del suelo, footer) suben y se apoyan (`RiseBlock`).
- **La biota del suelo:** recorrido fijo por capas guiado por el scroll (solo desktop; lista en mobile y con reduced motion).
- **Elementos:** árboles del monte con parallax, números que cuentan, barras de indicadores que crecen, ciclo de nutrientes ilustrado que se recorre solo, sello de autocertificación que se estampa, gallina guía e ilustraciones vivas (gallina, frascos, lombriz, mapa).
- **Interacción:** zoom al punto en el mapa, calendario que viaja al mes actual, brote al pasar por botones y links (`.sprout-hover`), preguntas que se abren con altura animada, productos que se reordenan y buscador.

## Idiomas y publicación
- El contenido vive en `content/es.ts` y `content/en.ts`, con la misma estructura (incluye `ui`: botones, etiquetas y textos de accesibilidad). `content/site.ts` elige uno según `NEXT_PUBLIC_LOCALE`.
- `npm run build:pages` compila el castellano en `/la-biota-regenerativa/` y el inglés en `/la-biota-regenerativa/en/` (todo queda en `out/`, listo para la rama `gh-pages`).
- Ningún componente lleva texto escrito a mano: todo sale del contenido.

## Contenido de muestra
- Mientras el contenido real no esté, los párrafos van en lorem ipsum, los datos en "XX" y las fotos en `PhotoSlot` (marco punteado con aspect-ratio final).
- Un aviso arriba de todo (`SampleBanner`) lo explica. Se apaga con `sample.enabled = false` en `content/site.ts`.

## Secciones
Comunidad · El Mantillo (región, clima, predio, video) · El proyecto (bento, ciclo de nutrientes, calendario, detalle) · Autocertificación (sello, niveles, lista de productos con buscador y ficha) · Metodología · La biota del suelo · Objetivos · El presente · Preguntas frecuentes · Apoyar el proyecto · Instagram.

## Texto
- Registro académico e informativo, con vocabulario técnico de agricultura regenerativa y sin metáforas. Castellano rioplatense.
- Cero em-dashes, sin "Paso 1" y sin números inventados.
- El único CTA es **"Conocé el proyecto"**, en el hero. No hay CTA de contacto ni se ofrecen visitas al campo: el cierre de la página invita a conocer más del proyecto en Instagram.
- Todos los textos viven en `content/site.ts` y son BORRADOR hasta que el cliente los apruebe.
