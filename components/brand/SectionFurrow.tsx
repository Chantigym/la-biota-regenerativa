import { FurrowLine } from "@/components/motion/FurrowLine";

// Separador de secciones: un surco ondulado en tinta que se traza al entrar en pantalla.
export function SectionFurrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <FurrowLine />
      <div className="pt-10 lg:pt-14">{children}</div>
    </div>
  );
}
