import { Play } from "@phosphor-icons/react/dist/ssr";
import { video } from "@/content/site";

// Lugar reservado para el video del campo (16:9). No reproduce nada hasta tener el video real.
export function VideoSlot() {
  return (
    <div className="mt-20 lg:mt-28">
      <h3 className="text-3xl font-extrabold sm:text-4xl">{video.title}</h3>
      <p className="mt-3 max-w-[60ch] text-lg text-muted">{video.lead}</p>
      <figure
        className="relative mt-8 flex aspect-video flex-col items-center justify-center gap-4 rounded-[var(--radius-block)] border-2 border-dashed border-current/30 bg-salvia/60 text-center text-muted"
      >
        <span className="flex size-20 items-center justify-center rounded-full bg-ink text-paper">
          <Play size={36} weight="fill" aria-hidden />
        </span>
        <figcaption className="max-w-[32ch] font-medium">
          {video.placeholder} ({video.duration})
        </figcaption>
      </figure>
    </div>
  );
}
