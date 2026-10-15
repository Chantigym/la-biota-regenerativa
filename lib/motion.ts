// Tokens de movimiento (espejo de las variables --dur-* / --ease-out de globals.css).
// pass: el cruce del tractor entre secciones (el único movimiento largo, es "de relato").
export const dur = { fast: 0.15, base: 0.22, slow: 0.32, path: 0.9, pass: 1.3 } as const;
export const easeOut = [0.23, 1, 0.32, 1] as const;
// Las salidas duran ~70% de la entrada.
export const exitDur = (d: number) => d * 0.7;
