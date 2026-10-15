import { site, ui } from "@/content/site";
import { asset } from "@/lib/asset";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-[640px] flex-col items-center justify-center gap-6 px-6 py-16 text-center">
      <h1 className="text-4xl font-extrabold sm:text-5xl">{ui.notFound.title}</h1>
      <p className="max-w-[46ch] text-lg text-muted">{ui.notFound.text}</p>
      <a href={asset("/")} className="btn btn-solid sprout-hover">
        {ui.notFound.back}
      </a>
      <p className="text-sm text-muted">{site.name}</p>
    </main>
  );
}
