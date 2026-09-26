import { motion } from "framer-motion";

/**
 * MenuHeader — Encabezado de la seccion Menu.
 * Responsabilidad: titulo, descripcion y elementos decorativos introductorios.
 */
export default function MenuHeader() {
  return (
    <header className="text-center mb-12 md:mb-16">
      {/* Eyebrow badge */}
      <motion.div
        initial={{ y: 16 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-brand-gold/25 mb-6"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" aria-hidden="true" />
        <span className="text-brand-gold text-xs font-semibold tracking-[0.18em] uppercase">
          Nuestra Carta
        </span>
      </motion.div>

      {/* Main heading */}
      <motion.h1
        initial={{ y: 24 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="font-heading font-bold text-4xl md:text-6xl text-brand-heading leading-tight mb-4 text-balance"
      >
        Lo mejor de{" "}
        <span className="text-gold-gradient">Los Amigos</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.55, delay: 0.35 }}
        className="text-brand-subtle text-base md:text-lg leading-relaxed max-w-xl mx-auto"
      >
        Cockteleria artesanal, picadas para compartir y la mejor seleccion de cervezas.
        Precios en pesos argentinos.
      </motion.p>

      {/* Decorative divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-8 mx-auto w-20 h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent"
        aria-hidden="true"
      />
    </header>
  );
}
