// Brote en tinta: tallo y dos hojas. El crecimiento lo anima quien lo usa (scaleY desde la base).
export function Sprout({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 32" aria-hidden className={className} fill="currentColor">
      <path d="M12 32 C12 25 11.2 19 12 12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M11.6 19.5 C6.5 19.8 3 16.5 2.6 11.6 C7.6 11.4 11 14.6 11.6 19.5 Z" />
      <path d="M12.2 13.4 C12.6 7.6 16.4 4 21.6 3.8 C21.7 9.4 17.8 13 12.2 13.4 Z" />
    </svg>
  );
}
