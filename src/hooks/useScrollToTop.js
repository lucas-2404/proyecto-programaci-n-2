import { useLayoutEffect } from "react";

// El navegador no debe restaurar el scroll por su cuenta al ir atrás/adelante:
// lo decidimos nosotros en el hook de abajo.
if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

// Cada vez que cambia la página, la nueva arranca desde arriba.
// Si la URL trae un #ancla (ej: /#historia) dejamos que el navegador vaya a esa sección.
export function useScrollToTop(pathname, hash) {
  // useLayoutEffect corre antes de que se pinte la pantalla: no se ve el salto.
  useLayoutEffect(() => {
    if (hash) return;

    // index.css tiene `scroll-behavior: smooth`: con behavior "instant" el salto es
    // inmediato y no una animación desde el fondo de la página hasta arriba.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);
}
