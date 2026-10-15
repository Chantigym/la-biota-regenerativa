import { Contacto } from "@/components/sections/Contacto";
import { DondeEstamos } from "@/components/sections/DondeEstamos";
import { Footer } from "@/components/sections/Footer";
import { HaciaDonde } from "@/components/sections/HaciaDonde";
import { Hero } from "@/components/sections/Hero";
import { Nav } from "@/components/sections/Nav";
import { QueHacemos } from "@/components/sections/QueHacemos";
import { QuienesSomos } from "@/components/sections/QuienesSomos";

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
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
