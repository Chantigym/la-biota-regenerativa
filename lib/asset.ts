// Prefija rutas de /public con el basePath (GitHub Pages sirve el sitio bajo /<repo>, y el inglés bajo /<repo>/en).
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

// Raíz del sitio sin idioma (para el cambio de idioma): castellano en "/", inglés en "/en/".
export const siteRoot = process.env.NEXT_PUBLIC_SITE_ROOT ?? process.env.NEXT_PUBLIC_BASE_PATH ?? "";
