"use client";

import { useEffect, useState } from "react";
import { Cloud, CloudRain, CloudSun, Drop, Snowflake, Sun, Wind } from "@phosphor-icons/react";
import { MapPin } from "@phosphor-icons/react";
import { clima, region, ui } from "@/content/site";
import { asset } from "@/lib/asset";

// Mapa ilustrado del valle con El Mantillo marcado, y el clima de hoy en la zona (Open-Meteo, sin clave).
type Tiempo = { temp: number; code: number; precip: number; wind: number };

function describir(code: number) {
  if (code === 0) return { text: ui.weather.clear, Icon: Sun };
  if (code <= 2) return { text: ui.weather.partly, Icon: CloudSun };
  if (code === 3 || code === 45 || code === 48) return { text: ui.weather.cloudy, Icon: Cloud };
  if (code >= 71 && code <= 77) return { text: ui.weather.snow, Icon: Snowflake };
  if (code >= 51) return { text: ui.weather.rain, Icon: CloudRain };
  return { text: ui.weather.variable, Icon: CloudSun };
}

function Clima() {
  const [data, setData] = useState<Tiempo | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${clima.lat}&longitude=${clima.lon}&current=temperature_2m,precipitation,weather_code,wind_speed_10m&timezone=America%2FArgentina%2FCordoba`;
    fetch(url, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j) =>
        setData({ temp: j.current.temperature_2m, code: j.current.weather_code, precip: j.current.precipitation, wind: j.current.wind_speed_10m })
      )
      .catch((e) => e?.name !== "AbortError" && setError(true));
    return () => ctrl.abort();
  }, []);

  return (
    <div className="rounded-[var(--radius-block)] bg-yema p-6 text-on-yema" aria-live="polite">
      <h3 className="text-sm font-semibold">{clima.title}</h3>
      {error ? (
        <p className="mt-3">{ui.weather.error}</p>
      ) : !data ? (
        <div className="mt-3 grid gap-2" aria-label={ui.weather.loading}>
          <span className="block h-10 w-28 animate-pulse rounded-lg bg-on-yema/15" />
          <span className="block h-4 w-40 animate-pulse rounded bg-on-yema/15" />
        </div>
      ) : (
        (() => {
          const { text, Icon } = describir(data.code);
          return (
            <>
              <p className="mt-2 flex items-center gap-3">
                <Icon size={40} weight="bold" aria-hidden />
                <span className="font-display text-5xl font-extrabold tabular-nums">{Math.round(data.temp)}°</span>
              </p>
              <p className="mt-1 font-semibold">{text}</p>
              <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                <span className="inline-flex items-center gap-1">
                  <Drop size={16} weight="bold" aria-hidden /> {data.precip} mm
                </span>
                <span className="inline-flex items-center gap-1">
                  <Wind size={16} weight="bold" aria-hidden /> {Math.round(data.wind)} km/h
                </span>
              </p>
            </>
          );
        })()
      )}
    </div>
  );
}

export function Region() {
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <h3 className="text-2xl font-extrabold sm:text-3xl">{region.title}</h3>
        <p className="mt-2 max-w-[60ch] text-muted">{region.lead}</p>
        <div className="relative mt-6 overflow-hidden rounded-[var(--radius-block)] bg-salvia">
          <div className="relative" style={{ aspectRatio: "1400 / 928" }}>
            <span className="ink-mask absolute inset-0" style={{ ["--src" as string]: `url(${asset("/illustrations/traslasierra.webp")})` }} />
            {region.places.map((p) => (
              <span
                key={p.name}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-2 py-0.5 text-[12px] font-semibold whitespace-nowrap sm:text-sm ${
                  p.kind === "zona"
                    ? "bg-ink text-paper"
                    : p.kind === "ruta"
                      ? "rounded-md bg-yema text-on-yema shadow-[0_0_0_1.5px_var(--ink)]"
                      : "bg-paper shadow-[0_0_0_1.5px_var(--ink)]"
                }`}
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              >
                {p.name}
              </span>
            ))}
            <span
              className="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center"
              style={{ left: `${region.farm.x}%`, top: `${region.farm.y}%` }}
            >
              <span className="rounded-full bg-yema px-2.5 py-1 text-sm font-bold text-on-yema shadow-[0_0_0_2px_var(--ink)]">{region.farm.name}</span>
              <MapPin size={30} weight="fill" aria-hidden className="-mt-1 text-ink" />
            </span>
          </div>
        </div>
        <p className="mt-2 text-sm text-muted">{region.note}</p>
      </div>
      <div className="lg:col-span-4 lg:pt-[4.5rem]">
        <Clima />
      </div>
    </div>
  );
}
