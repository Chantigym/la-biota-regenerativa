"use client";

import { Printer } from "@phosphor-icons/react";

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="btn btn-solid print:hidden">
      <Printer size={20} weight="bold" aria-hidden />
      Imprimir
    </button>
  );
}
