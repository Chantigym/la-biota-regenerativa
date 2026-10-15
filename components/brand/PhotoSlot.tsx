import { Camera } from "@phosphor-icons/react/dist/ssr";

// Lugar reservado para una foto real: mantiene el aspect-ratio final para que la página no cambie
// cuando se reemplace por la imagen.
export function PhotoSlot({ label, ratio = "4 / 3", className = "" }: { label: string; ratio?: string; className?: string }) {
  return (
    <figure
      className={`flex flex-col items-center justify-center gap-3 rounded-[var(--radius-block)] border-2 border-dashed border-current/30 bg-salvia/60 p-6 text-center text-muted ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <Camera size={32} weight="bold" aria-hidden />
      <figcaption className="max-w-[28ch] text-[15px] font-medium">{label}</figcaption>
    </figure>
  );
}
