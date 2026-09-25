import { useState, useEffect, useCallback } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// ── Navigation links configuration ────────────────────────────────────────────
const NAV_LINKS = [
  { href: "/",         label: "Inicio" },
  { href: "/menu",     label: "Carta" },
  { href: "/eventos",  label: "Eventos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

// ── Animation variants ─────────────────────────────────────────────────────────
const mobileMenuVariants = {
  closed: {
    opacity: 0,
    scale: 0.95,
    y: -8,
    transition: { duration: 0.2, ease: "easeIn" },
  },
  open: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

const menuItemVariants = {
  closed: { opacity: 0, x: -12 },
  open: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.07, duration: 0.3, ease: "easeOut" },
  }),
};

const logoVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// ── Hamburger icon component ───────────────────────────────────────────────────
function HamburgerIcon({ isOpen }) {
  return (
    <div className="w-5 h-4 flex flex-col justify-between" aria-hidden="true">
      <motion.span
        animate={isOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25 }}
        className="block h-0.5 w-full bg-brand-gold rounded-full origin-center"
      />
      <motion.span
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
        className="block h-0.5 w-full bg-brand-gold rounded-full"
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25 }}
        className="block h-0.5 w-full bg-brand-gold rounded-full origin-center"
      />
    </div>
  );
}

// ── Main Navbar component ──────────────────────────────────────────────────────
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled,  setIsScrolled]  = useState(false);

  // Track scroll to enhance glass effect on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const toggleMenu  = useCallback(() => setIsMenuOpen((v) => !v), []);
  const closeMenu   = useCallback(() => setIsMenuOpen(false), []);

  return (
    <>
      {/* ── Fixed navbar bar ───────────────────────────────────────── */}
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "backdrop-blur-[16px] bg-black/60 border-b border-brand-border shadow-glass"
            : "backdrop-blur-[8px] bg-black/20 border-b border-transparent",
        ].join(" ")}
      >
        <nav
          className="section-container flex items-center justify-between h-16 md:h-18"
          aria-label="Navegación principal"
        >
          {/* Logo */}
          <motion.div variants={logoVariants} initial="initial" animate="animate">
            <Link
              to="/"
              className="flex items-center gap-3 group no-select"
              aria-label="Los Amigos – Inicio"
            >
              {/* Icon mark */}
              <div className="w-8 h-8 rounded-lg bg-brand-gold flex items-center justify-center shadow-gold-glow group-hover:shadow-gold-strong transition-shadow duration-300">
                <span className="text-brand-bg font-heading font-bold text-sm leading-none">
                  LA
                </span>
              </div>
              {/* Wordmark */}
              <div className="flex flex-col leading-none">
                <span className="font-heading font-bold text-base text-brand-heading tracking-wide">
                  Los Amigos
                </span>
                <span className="text-[10px] font-sans text-brand-gold tracking-[0.25em] uppercase">
                  Bar & Coctelería
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {NAV_LINKS.map(({ href, label }, i) => (
              <motion.li
                key={href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: "easeOut" }}
              >
                <NavLink
                  to={href}
                  end={href === "/"}
                  className={({ isActive }) =>
                    [
                      "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 gold-underline",
                      isActive
                        ? "text-brand-gold"
                        : "text-brand-subtle hover:text-brand-heading",
                    ].join(" ")
                  }
                >
                  {label}
                </NavLink>
              </motion.li>
            ))}
          </ul>

          {/* Desktop CTA button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="hidden md:block"
          >
            <Link
              to="/reservas"
              id="navbar-cta-reservas"
              className="
                inline-flex items-center gap-2 px-5 py-2 rounded-xl
                bg-brand-gold text-brand-bg font-semibold text-sm
                shadow-gold-glow hover:shadow-gold-strong hover:bg-brand-gold-light
                transition-all duration-300 will-transform
              "
            >
              <span>Reservar Mesa</span>
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2 8h12M9 3l5 5-5 5" />
              </svg>
            </Link>
          </motion.div>

          {/* Mobile hamburger */}
          <button
            id="navbar-mobile-toggle"
            type="button"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg glass hover:bg-white/10 transition-colors duration-200"
          >
            <HamburgerIcon isOpen={isMenuOpen} />
          </button>
        </nav>
      </header>

      {/* ── Mobile menu overlay ─────────────────────────────────────── */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
              onClick={closeMenu}
              aria-hidden="true"
            />

            {/* Menu panel */}
            <motion.div
              key="mobile-menu"
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menú de navegación"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="
                fixed top-[4.5rem] left-4 right-4 z-50 md:hidden
                rounded-2xl glass-dark shadow-glass-lg
                p-6 border border-brand-border
              "
            >
              {/* Nav links */}
              <ul className="flex flex-col gap-1 mb-6" role="list">
                {NAV_LINKS.map(({ href, label }, i) => (
                  <motion.li key={href} custom={i} variants={menuItemVariants} initial="closed" animate="open">
                    <NavLink
                      to={href}
                      end={href === "/"}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        [
                          "flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-200",
                          isActive
                            ? "text-brand-gold bg-brand-gold/10 border border-brand-gold/20"
                            : "text-brand-text hover:text-brand-heading hover:bg-white/5",
                        ].join(" ")
                      }
                    >
                      {label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>

              {/* Mobile CTA */}
              <motion.div
                custom={NAV_LINKS.length}
                variants={menuItemVariants}
                initial="closed"
                animate="open"
              >
                <Link
                  to="/reservas"
                  id="mobile-navbar-cta-reservas"
                  onClick={closeMenu}
                  className="
                    flex items-center justify-center gap-2 w-full py-3 rounded-xl
                    bg-brand-gold text-brand-bg font-semibold
                    shadow-gold-glow hover:shadow-gold-strong hover:bg-brand-gold-light
                    transition-all duration-300
                  "
                >
                  Reservar Mesa
                </Link>
              </motion.div>

              {/* Social quick links */}
              <motion.div
                custom={NAV_LINKS.length + 1}
                variants={menuItemVariants}
                initial="closed"
                animate="open"
                className="mt-5 pt-5 border-t border-brand-border flex items-center justify-center gap-5"
              >
                {[
                  { label: "Instagram", href: "https://instagram.com", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
                  { label: "Facebook", href: "https://facebook.com", icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
                ].map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-brand-muted hover:text-brand-gold transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d={icon} />
                    </svg>
                  </a>
                ))}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
