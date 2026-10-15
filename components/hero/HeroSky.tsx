"use client";

import { useEffect, useState } from "react";

// Cielo del hero según la hora real: mañana más clara, tarde dorada, noche más tenue.
// En modo noche se suman estrellas y luciérnagas (ver .cielo-* en globals.css). Decorativo.
function momento(h: number) {
  if (h >= 6 && h < 11) return "manana";
  if (h >= 11 && h < 16) return "dia";
  if (h >= 16 && h < 20) return "tarde";
  return "noche";
}

const STARS = [
  [8, 12], [18, 30], [27, 8], [41, 18], [52, 6], [63, 22], [74, 10], [86, 16], [93, 34], [12, 48], [35, 40], [58, 44],
];
const FIREFLIES = [
  [58, 70], [66, 58], [80, 64], [90, 52], [72, 80], [52, 84],
];

export function HeroSky() {
  const [parte, setParte] = useState<string | null>(null);
  useEffect(() => setParte(momento(new Date().getHours())), []);
  return (
    <div aria-hidden className="cielo pointer-events-none absolute inset-0 z-0" data-momento={parte ?? undefined}>
      <div className="cielo-luz absolute inset-0" />
      <div className="cielo-noche absolute inset-0">
        {STARS.map(([x, y], i) => (
          <span key={i} className="estrella" style={{ left: `${x}%`, top: `${y}%`, ["--k" as string]: i }} />
        ))}
        {FIREFLIES.map(([x, y], i) => (
          <span key={i} className="luciernaga" style={{ left: `${x}%`, top: `${y}%`, ["--k" as string]: i }} />
        ))}
      </div>
    </div>
  );
}
