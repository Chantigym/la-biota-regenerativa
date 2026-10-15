import { Autocertificacion } from "@/components/sections/Autocertificacion";
import { BackToTop } from "@/components/motion/BackToTop";
import { PageFurrow } from "@/components/motion/PageFurrow";
import { Mapa } from "@/components/sections/Mapa";
import { LemaMarquee } from "@/components/sections/LemaMarquee";
import { SideIndex } from "@/components/motion/SideIndex";
import { Suelo } from "@/components/sections/Suelo";
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
      <PageFurrow />
      <SideIndex />
      <main id="contenido">
        <Hero />
        <QuienesSomos />
        <Mapa />
        <QueHacemos />
        <Autocertificacion />
        <Metodologia />
        <Suelo />
        <HaciaDonde />
        <LemaMarquee />
        <DondeEstamos />
        <Preguntas />
        <Seguinos />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
