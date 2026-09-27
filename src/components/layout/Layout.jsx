import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useOutlet } from "react-router-dom";
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
  const outlet = useOutlet();

  return (
    <div className="relative flex flex-col min-h-screen bg-brand-bg">
      {/* Fixed navigation bar */}
      <Navbar />

      {/* Main content area, with page transitions */}
      <AnimatePresence mode="popLayout">
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
          {outlet}
        </motion.main>
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </div>
  );
}
