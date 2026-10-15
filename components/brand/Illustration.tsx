// Ilustración en tinta (máscara WebP con alpha). Decorativa: el texto contiguo la describe.
export function Illustration({ src, className = "" }: { src: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={`ink-mask aspect-square ${className}`}
      style={{ ["--src" as string]: `url(${src})` }}
    />
  );
}
