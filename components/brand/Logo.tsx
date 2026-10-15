import { asset } from "@/lib/asset";

type Variant = "wordmark" | "tractor" | "full";

const ratios: Record<Variant, string> = {
  wordmark: "882 / 365",
  tractor: "1233 / 668",
  full: "1233 / 964",
};

// El logo vectorizado se usa como máscara: toma el color del texto (currentColor).
export function Logo({
  variant = "wordmark",
  className = "",
  label,
}: {
  variant?: Variant;
  className?: string;
  label?: string;
}) {
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`ink-mask ${className}`}
      style={{ ["--src" as string]: `url(${asset(`/brand/logo-${variant}.webp`)})`, aspectRatio: ratios[variant] }}
    />
  );
}
