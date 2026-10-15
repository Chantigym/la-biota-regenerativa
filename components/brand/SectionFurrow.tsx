// Surco ondulado en tinta que separa las secciones. Estático: sin animación.
const WAVE = Array.from({ length: 20 }, (_, i) => `${i === 0 ? "Q 25 4" : "T"} ${(i + 1) * 50} 10`).join(" ");
const D = `M 0 10 ${WAVE}`;

export function SectionFurrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <svg aria-hidden viewBox="0 0 1000 20" preserveAspectRatio="none" className="block h-5 w-full" fill="none">
        <path d={D} stroke="currentColor" strokeWidth={3} strokeLinecap="round" />
      </svg>
      <div className="pt-10 lg:pt-14">{children}</div>
    </div>
  );
}
