"use client";

import { SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";
import { ui } from "@/content/site";
import { sound, useSound } from "@/lib/sound";

// Botón de sonido (apagado por defecto). Por ahora solo suena el cacareo de la gallinita.
export function SoundToggle() {
  const on = useSound();
  return (
    <button
      type="button"
      onClick={() => sound.set(!on)}
      aria-pressed={on}
      aria-label={on ? ui.soundOff : ui.soundOn}
      className="inline-flex size-11 items-center justify-center rounded-full transition-colors duration-200 hover:bg-salvia"
    >
      {on ? <SpeakerHigh size={22} weight="bold" aria-hidden /> : <SpeakerSlash size={22} weight="bold" aria-hidden />}
    </button>
  );
}
