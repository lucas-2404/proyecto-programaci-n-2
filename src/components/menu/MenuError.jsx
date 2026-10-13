import { motion } from "framer-motion";

// Se muestra si la API de la carta falla: explica qué pasó y permite reintentar
export default function MenuError({ message, onRetry }) {
  return (
    <section className="section-container py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        role="alert"
        className="mx-auto max-w-lg flex flex-col items-center gap-4 px-6 py-16 text-center glass rounded-2xl"
      >
        <span className="text-5xl" aria-hidden="true">🍸</span>
        <h1 className="font-heading font-bold text-2xl md:text-3xl text-brand-heading">
          La carta se quedó sin hielo
        </h1>
        <p className="text-brand-subtle text-sm leading-relaxed max-w-sm">{message}</p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-brand-gold px-7 text-sm font-semibold text-brand-bg shadow-gold-glow transition-[box-shadow,background-color] duration-300 hover:bg-brand-gold-light hover:shadow-gold-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg"
        >
          Reintentar
        </button>
      </motion.div>
    </section>
  );
}
