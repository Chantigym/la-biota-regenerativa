import { Info } from "@phosphor-icons/react/dist/ssr";
import { sample } from "@/content/site";

// Aviso de contenido de muestra. Se apaga con `sample.enabled` en content/site.ts.
export function SampleBanner() {
  if (!sample.enabled) return null;
  return (
    <div role="note" className="bg-ink px-4 py-2.5 text-paper sm:px-6">
      <p className="mx-auto flex max-w-[1240px] items-start gap-2 text-[14px] leading-snug sm:items-center">
        <Info size={18} weight="bold" aria-hidden className="mt-px shrink-0 sm:mt-0" />
        {sample.notice}
      </p>
    </div>
  );
}
