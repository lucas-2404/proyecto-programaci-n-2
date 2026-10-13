import { useEffect } from "react";

// Cuántos componentes están pidiendo bloquear el scroll ahora mismo
// (por ejemplo, el menú mobile y el modal de un evento a la vez).
let activeLocks = 0;

// Bloquea el scroll de la página mientras `locked` sea true.
// Solo se desbloquea cuando el último componente que lo pidió lo libera,
// así dos componentes no se pisan entre sí.
export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return;

    activeLocks += 1;
    document.body.style.overflow = "hidden";

    return () => {
      activeLocks -= 1;
      if (activeLocks === 0) document.body.style.overflow = "";
    };
  }, [locked]);
}
