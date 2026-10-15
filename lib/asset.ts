// Prefija rutas de /public con el basePath (GitHub Pages sirve el sitio bajo /<repo>).
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
