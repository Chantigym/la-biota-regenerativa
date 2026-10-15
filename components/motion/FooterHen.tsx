"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { Gallinita, type Pose } from "@/components/motion/Gallinita";
import { cacarear } from "@/lib/sound";

// Al llegar al final de la página, la gallinita (parada sobre el footer) saluda con el ala.
export function FooterHen() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.8 });
  const [pose, setPose] = useState<Pose>("idle");

  useEffect(() => {
    if (!inView) return;
    setPose("wave");
    const t = setTimeout(() => setPose("idle"), 3300);
    return () => clearTimeout(t);
  }, [inView]);

  return (
    <div ref={ref} className="absolute right-8 bottom-full w-14 sm:right-14 sm:w-16" onClick={cacarear}>
      <Gallinita pose={pose} className="w-full" />
    </div>
  );
}
