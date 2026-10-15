import { Autocertificacion } from "@/components/sections/Autocertificacion";
import { DondeEstamos } from "@/components/sections/DondeEstamos";
import { Footer } from "@/components/sections/Footer";
import { Metodologia } from "@/components/sections/Metodologia";
import { Preguntas } from "@/components/sections/Preguntas";
import { SampleBanner } from "@/components/sections/SampleBanner";
import { HaciaDonde } from "@/components/sections/HaciaDonde";
import { Hero } from "@/components/sections/Hero";
import { Nav } from "@/components/sections/Nav";
import { QueHacemos } from "@/components/sections/QueHacemos";
import { QuienesSomos } from "@/components/sections/QuienesSomos";
import { Seguinos } from "@/components/sections/Seguinos";

export default function Home() {
  return (
    <>
      <SampleBanner />
      <Nav />
      <main id="contenido">
        <Hero />
        <QuienesSomos />
        <QueHacemos />
        <Autocertificacion />
        <Metodologia />
        <HaciaDonde />
        <DondeEstamos />
        <Preguntas />
        <Seguinos />
      </main>
      <Footer />
    </>
  );
}
