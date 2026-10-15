"use client";

import { Printer } from "@phosphor-icons/react";
import { ui } from "@/content/site";

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="btn btn-solid print:hidden">
      <Printer size={20} weight="bold" aria-hidden />
      {ui.qr.print}
    </button>
  );
}
