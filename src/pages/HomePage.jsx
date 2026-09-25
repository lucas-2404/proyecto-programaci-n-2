import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/**
 * HomePage — Placeholder landing page for "Los Amigos" bar.
 * Demonstrates the Layout system with a minimal hero section.
 */
export default function HomePage() {
  return (
    <section className="relative flex items-center justify-center min-h-[calc(100vh-4rem)] overflow-hidden px-4">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-gold/6 blur-[120px]" />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-brand-gold/4 blur-[80px]" />
      </div>

      <div className="relative text-center max-w-3xl mx-auto">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-brand-gold/25 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
          <span className="text-brand-gold text-xs font-semibold tracking-[0.15em] uppercase">
            Abierto esta noche
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-heading font-bold text-5xl md:text-7xl text-brand-heading leading-tight mb-6 text-balance"
        >
          Donde cada noche{" "}
          <span className="text-gold-gradient">cobra vida</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.55 }}
          className="text-brand-subtle text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto"
        >
          Cócteles artesanales, música en vivo y la mejor vibra en el corazón de Rosario. Los Amigos, tu bar de confianza.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/reservas"
            id="hero-cta-reservas"
            className="
              inline-flex items-center gap-2 px-8 py-3.5 rounded-xl
              bg-brand-gold text-brand-bg font-semibold text-sm
              shadow-gold-glow hover:shadow-gold-strong hover:bg-brand-gold-light
              transition-all duration-300 will-transform
            "
          >
            Reservar una Mesa
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2 8h12M9 3l5 5-5 5" />
            </svg>
          </Link>
          <Link
            to="/menu"
            id="hero-cta-carta"
            className="
              inline-flex items-center gap-2 px-8 py-3.5 rounded-xl
              glass border border-brand-border text-brand-text font-medium text-sm
              hover:border-brand-gold/40 hover:text-brand-gold
              transition-all duration-300
            "
          >
            Ver la Carta
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
