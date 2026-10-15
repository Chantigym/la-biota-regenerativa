// Tokens de movimiento (espejo de las variables --dur-* / --ease-out de globals.css).
export const dur = { fast: 0.15, base: 0.22, slow: 0.32, path: 0.9 } as const;
export const easeOut = [0.23, 1, 0.32, 1] as const;
// Las salidas duran ~70% de la entrada.
export const exitDur = (d: number) => d * 0.7;
