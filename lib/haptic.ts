// Vibración breve al tocar (solo celulares que lo soportan; en el resto no hace nada).
export function haptic(ms = 12) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    try {
      navigator.vibrate(ms);
    } catch {
      /* algunos navegadores bloquean vibrate sin gesto del usuario */
    }
  }
}
