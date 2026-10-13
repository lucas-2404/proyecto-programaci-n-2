import { motion } from "framer-motion";

const CATEGORY_PLACEHOLDERS = 5;
const CARD_PLACEHOLDERS = 8;

// Bloque gris que "late" mientras carga (sin animación si el usuario pidió movimiento reducido)
function Bone({ className = "" }) {
  return <div className={`rounded-lg bg-white/[0.06] motion-safe:animate-pulse ${className}`} />;
}

// Esqueleto de la carta: misma forma que <Menu> para que no salte el layout al llegar los datos
export default function MenuSkeleton() {
  return (
    // Aparece con un pequeño retraso: si la API responde rápido, el esqueleto ni se llega a ver
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      role="status"
      aria-live="polite"
      className="relative"
    >
      <span className="sr-only">Cargando la carta…</span>

      {/* Hero de categoría */}
      <div className="relative h-56 md:h-72 overflow-hidden bg-brand-surface" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/70 to-transparent" />
        <div className="absolute bottom-6 inset-x-0 flex justify-center">
          <Bone className="h-11 w-44 rounded-full" />
        </div>
      </div>

      <div className="section-container pb-20" aria-hidden="true">
        {/* Encabezado */}
        <div className="flex flex-col items-center gap-4 mb-12 md:mb-16">
          <Bone className="h-7 w-36 rounded-full mb-2" />
          <Bone className="h-10 md:h-14 w-full max-w-md" />
          <Bone className="h-4 w-full max-w-sm" />
          <Bone className="h-4 w-full max-w-xs" />
        </div>

        {/* Pestañas de categorías */}
        <div className="flex gap-2 overflow-hidden justify-start md:justify-center mb-10 md:mb-12 pb-2">
          {Array.from({ length: CATEGORY_PLACEHOLDERS }, (_, i) => (
            <Bone key={i} className="h-11 w-32 shrink-0 rounded-xl" />
          ))}
        </div>

        {/* Grilla de productos */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: CARD_PLACEHOLDERS }, (_, i) => (
            <li key={i} className="rounded-2xl overflow-hidden border border-brand-border bg-brand-card">
              <Bone className="h-40 rounded-none" />
              <div className="flex flex-col gap-3 p-4">
                <Bone className="h-4 w-16 rounded-full" />
                <Bone className="h-4 w-3/4" />
                <Bone className="h-3 w-full" />
                <div className="pt-3 border-t border-brand-border">
                  <Bone className="h-6 w-24" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}
