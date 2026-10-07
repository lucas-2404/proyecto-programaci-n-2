import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MenuHeader from "./MenuHeader";
import MenuCategories from "./MenuCategories";
import MenuProductGrid from "./MenuProductGrid";

// Componente coordinador de la seccion Menu
export default function Menu({ categories }) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    categories[0]?.id ?? ""
  );

  const selectedCategory = categories.find(
    (cat) => cat.id === selectedCategoryId
  );

  return (
    <section
      aria-labelledby="menu-section-heading"
      className="relative"
    >
      {/* ── Hero de categoria con imagen real ──────────────────── */}
      <div className="relative h-56 md:h-72 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={selectedCategoryId}
            src={selectedCategory?.categoryImage}
            alt={`Imagen de la categoria ${selectedCategory?.name}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full object-cover"
            width={1200}
            height={896}
            // Es lo primero que se ve al entrar: con loading="lazy" el navegador
            // la posterga y el hero queda negro hasta que termina de bajar.
            fetchPriority="high"
            decoding="async"
          />
        </AnimatePresence>

        {/* Gradient overlay — transicion suave hacia el fondo del sitio */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/30 via-transparent to-transparent" />

        {/* Category name badge sobre la imagen */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`badge-${selectedCategoryId}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 px-5 py-2 rounded-full glass-dark border border-brand-gold/20 shadow-glass"
            >
              <span className="text-xl" aria-hidden="true">{selectedCategory?.icon}</span>
              <span className="font-heading font-bold text-brand-heading text-lg">
                {selectedCategory?.name}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Contenido principal ──────────────────────────────────── */}
      <div className="section-container pb-20">
        <span id="menu-section-heading" className="sr-only">Menu del bar Los Amigos</span>

        <MenuHeader />

        <MenuCategories
          categories={categories}
          selectedId={selectedCategoryId}
          onSelect={setSelectedCategoryId}
        />

        {/* Descripcion de la categoria activa */}
        <AnimatePresence mode="wait" initial={false}>
          {selectedCategory?.description && (
            <motion.p
              key={`desc-${selectedCategoryId}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="text-center text-brand-subtle text-sm mb-8 -mt-6 italic"
              aria-live="polite"
            >
              {selectedCategory.description}
            </motion.p>
          )}
        </AnimatePresence>

        <MenuProductGrid
          products={selectedCategory?.products ?? []}
          activeCategoryId={selectedCategoryId}
        />
      </div>

      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-brand-gold/4 blur-[120px]" />
      </div>
    </section>
  );
}
