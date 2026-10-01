import { AnimatePresence, motion } from "framer-motion";
import MenuProductCard from "./MenuProductCard";
import MenuEmptyState from "./MenuEmptyState";

// Contenedor de grilla de productos
export default function MenuProductGrid({ products, activeCategoryId }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={activeCategoryId}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3 }}
        id={`menu-panel-${activeCategoryId}`}
        role="tabpanel"
        aria-labelledby={`menu-tab-${activeCategoryId}`}
      >
        {products.length === 0 ? (
          <MenuEmptyState />
        ) : (
          <ul
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              gap-4 md:gap-6
            "
            aria-label="Productos del menu"
          >
            {products.map((product, index) => (
              <li key={product.id} className="flex h-full">
                <MenuProductCard product={product} index={index} />
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
