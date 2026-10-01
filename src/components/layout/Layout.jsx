import { useLocation, useOutlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { NAV_LINKS, FOOTER_LINKS, SOCIAL_LINKS, FOOTER_CONTACT_INFO } from "../../data/siteData";

// Solo opacidad: la página que sale y la que entra se ven a la vez, y si además se moverían en `y` se vería un rebote
const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
};

// Navbar arriba, la página actual en el medio y Footer abajo
export default function Layout() {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <div className="relative flex flex-col min-h-screen bg-brand-bg">
      {/* Fixed navigation bar */}
      <Navbar navLinks={NAV_LINKS} socialLinks={SOCIAL_LINKS} />

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
      <Footer links={FOOTER_LINKS} socialLinks={SOCIAL_LINKS} contactInfo={FOOTER_CONTACT_INFO} />
    </div>
  );
}
