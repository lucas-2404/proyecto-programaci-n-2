import { motion } from "framer-motion";

/**
 * MenuCategories — Navegacion horizontal de categorias del menu.
 * Responsabilidad: renderizar tabs de categoria y notificar la seleccion al padre.
 *
 * @param {Object} props
 * @param {Array}  props.categories      - Lista de categorias del menu
 * @param {string} props.selectedId      - ID de la categoria actualmente seleccionada
 * @param {Function} props.onSelect      - Callback al seleccionar una categoria
 */
export default function MenuCategories({ categories, selectedId, onSelect }) {
  return (
    <nav
      aria-label="Categorias del menu"
      className="mb-10 md:mb-12"
    >
      <ul
        role="tablist"
        className="
          flex gap-2 overflow-x-auto pb-2
          scrollbar-hide
          justify-start md:justify-center
          flex-nowrap
        "
      >
        {categories.map((category, index) => {
          const isSelected = category.id === selectedId;

          return (
            <li key={category.id} role="presentation">
              <motion.button
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                role="tab"
                aria-selected={isSelected}
                aria-controls={`menu-panel-${category.id}`}
                id={`menu-tab-${category.id}`}
                onClick={() => onSelect(category.id)}
                className={`
                  relative flex items-center gap-2
                  px-4 py-2.5 rounded-xl
                  text-sm font-medium
                  whitespace-nowrap
                  transition-all duration-300
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg
                  ${
                    isSelected
                      ? "bg-brand-gold text-brand-bg shadow-gold-glow"
                      : "glass border border-brand-border text-brand-subtle hover:border-brand-gold/40 hover:text-brand-text"
                  }
                `}
              >
                <span aria-hidden="true" className="text-base leading-none">
                  {category.icon}
                </span>
                <span>{category.name}</span>

                {/* Active indicator pill */}
                {isSelected && (
                  <motion.span
                    layoutId="menu-category-indicator"
                    className="absolute inset-0 rounded-xl bg-brand-gold/10"
                    aria-hidden="true"
                  />
                )}
              </motion.button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
