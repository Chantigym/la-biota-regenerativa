import { DondeEstamos } from "@/components/sections/DondeEstamos";
import { Footer } from "@/components/sections/Footer";
import { HaciaDonde } from "@/components/sections/HaciaDonde";
import { Hero } from "@/components/sections/Hero";
import { Nav } from "@/components/sections/Nav";
import { QueHacemos } from "@/components/sections/QueHacemos";
import { QuienesSomos } from "@/components/sections/QuienesSomos";
import { Seguinos } from "@/components/sections/Seguinos";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="contenido">
        <Hero />
        <QuienesSomos />
        <QueHacemos />
        <HaciaDonde />
        <DondeEstamos />
        <Seguinos />
      </main>
      <Footer />
    </>
  );
}
