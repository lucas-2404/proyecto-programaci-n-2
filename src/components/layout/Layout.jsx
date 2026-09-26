import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

// ── Page transition variants ──
// Solo opacidad. Con mode="popLayout" la página que sale y la que entra se ven
// al mismo tiempo, superpuestas: si además se mueven en `y` (la vieja subía a
// -8px y la nueva arrancaba en +12px), el ojo ve el contenido subir, caer 20px
// y volver a subir — el "rebote" al navegar.
// El desplazamiento de abajo hacia arriba va en el contenido de cada página
// (Reveal), no en el cascarón. ContactPage ya lo hacía así, y por eso era la
// única que no rebotaba.
const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
};

export default function Layout() {
  const location = useLocation();

  return (
    <div className="relative flex flex-col min-h-screen bg-brand-bg">
      {/* Fixed navigation bar */}
      <Navbar />

      {/* Main content area.
          mode="popLayout" y no "wait": con "wait" la pagina vieja tenia que
          terminar de desvanecerse ANTES de montar la nueva, que ademas arrancaba
          invisible — quedaban ~0,3s con el contenido en opacidad cero (el
          "pestaneo" al navegar). Con popLayout la que sale se saca del flujo
          (position: absolute) y se desvanece encima mientras la nueva ya entra:
          nunca hay un instante vacio. Por eso el <div> de arriba es `relative`:
          PopChild mide offsetTop/offsetLeft contra el offsetParent. */}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.main
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex-1 pt-16 md:pt-18 will-transform"
          id="main-content"
          role="main"
          aria-label="Contenido principal"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </div>
  );
}
