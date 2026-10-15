# DESIGN.md · La Biota Regenerativa

Este documento define el diseño del sitio y manda sobre cualquier otra decisión: cada componente nuevo tiene que respetarlo.

## Lectura del brief
Es un sitio de una sola página que presenta la identidad de un proyecto de mujeres que hacen agricultura regenerativa en Traslasierra, Córdoba. Le habla a vecinos, clientes, posibles visitantes y a cualquier curioso. El tono es honesto, cálido y concreto, y lo visual sale del logo: tinta negra a marcador, dibujada a mano.

**Dirección visual:** impresión rural en dos tintas, como un sobre de semillas o un afiche de feria. La tinta del logo se combina con un color plano amarillo yema. No hay degradados ni sombras grandes, y todo es "impreso" y plano.

**Diales:** VARIANCE 6 · MOTION 3 · DENSITY 3.

## Color (tokens en `app/globals.css`)
| Token | Claro | Oscuro | Uso |
|---|---|---|---|
| `--paper` | #FAFAF6 | #161914 | fondo de página |
| `--ink` | #1D201B | #ECECE4 | texto, logo, ilustraciones, CTA |
| `--muted` | #4D5348 | #B4B8AC | texto secundario (AA sobre paper) |
| `--yema` | #F2B42C | #F2B42C | tinta plana de marca: fondo del hero, marcador "Estamos acá", celda Huevos |
| `--on-yema` | #1D201B | #1D201B | texto sobre yema |
| `--monte` | #2D4A33 | #24382A | bloque "Hacia dónde" y celda Huertas (texto paper) |
| `--salvia` | #DFE5D5 | #222A21 | tinte suave |
| `--barro` | #EADFD2 | #2A241F | tinte suave |
| `--hero-bg` / `--hero-fg` | yema / ink | #1E221B / yema | hero |
| `--cert-verde` / `--cert-amarillo` / `--cert-naranja` | #2F7A3B / #F2B42C / #E8762B | igual | niveles de autocertificación; siempre con su nombre escrito, nunca solo el color (texto encima: paper sobre verde, ink sobre amarillo y naranja) |

**Reglas de color:**
- Hay un solo color de marca (yema), siempre plano y nunca en degradé.
- El CTA usa el par ink/paper, que se invierte solo en modo oscuro.
- Nunca se usa #000 ni #fff puros.

## Tipografía
- **Bricolage Grotesque** (next/font, pesos fijos 700 y 800, sin ejes variables, que son caros de dibujar en celulares) para títulos. Va con tracking ajustado y su ancho estándar.
- **Figtree** para cuerpo y UI. El cuerpo va en 17 a 18px, con interlineado de 1.6 y un largo de línea de 65ch o menos.
- **Escala:** UI y meta 14-16px · cuerpo 17-20px · subtítulos 20-26px · títulos de sección 36-48px · enunciados (Quiénes somos, Propósito) 32-62px · hero 42-61px.
- **Lo que se evita:** etiquetas en mayúsculas, eyebrows sobre cada título y destacar una sola palabra dentro de un titular.

## Forma
- Los botones son píldoras (radio completo).
- Los bloques y las celdas del bento usan radio de 20px. No llevan sombra; se separan por color de fondo o por borde de 1.5px en tinta.
- El foco es un anillo de 3px en tinta con offset de 3px, visible en los dos modos.

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
  2. **El tractor que ara entre secciones** (`components/motion/TractorPass.tsx`): cuando entra una sección, el tractor del logo (`logo-tractor-solo.webp`) la cruza de derecha a izquierda en 1.3s mientras dibuja el surco que la separa de la anterior. El contenido de la sección aparece detrás (fundido y 16px), con un 45% de retraso. Se dispara una sola vez, solo con transform y opacity.
  3. El surco de "Dónde estamos hoy", que se dibuja hasta el hito actual (Motion `pathLength`, `whileInView`, `once`).
- **Respuesta a acciones:** el press en botones (`scale .98`) y el menú móvil con `AnimatePresence`, donde la salida dura el 70% de la entrada.
- **Reglas:**
  - Solo se animan transform, opacity y pathLength.
  - Se respeta `prefers-reduced-motion` (CSS más `MotionConfig reducedMotion="user"`).
- Motion se carga con `LazyMotion` + `domAnimation` y componentes `m.*`, solo en hojas `'use client'`.

## Contenido de muestra
- Mientras el contenido real no esté, los párrafos van en lorem ipsum, los datos en "XX" y las fotos en `PhotoSlot` (marco punteado con aspect-ratio final).
- Un aviso arriba de todo (`SampleBanner`) lo explica. Se apaga con `sample.enabled = false` en `content/site.ts`.

## Secciones
Comunidad · El proyecto · Autocertificación (lista de productos ordenable por certificación o por categoría) · Metodología · Objetivos · El presente · Preguntas frecuentes · Instagram.

## Texto
- Registro académico e informativo, con vocabulario técnico de agricultura regenerativa y sin metáforas. Castellano rioplatense.
- Cero em-dashes, sin "Paso 1" y sin números inventados.
- El único CTA es **"Conocé el proyecto"**, en el hero. No hay CTA de contacto ni se ofrecen visitas al campo: el cierre de la página invita a conocer más del proyecto en Instagram.
- Todos los textos viven en `content/site.ts` y son BORRADOR hasta que el cliente los apruebe.
