import { motion } from "framer-motion";
import SectionEyebrow from "../../ui/SectionEyebrow";
import { Reveal } from "../../ui/Reveal";
import { EVENT_CATEGORIES } from "../../../data/eventsData";
import { EVENTS_CONTENT } from "./eventsContent";
import { cn } from "../../../utils/cn";

const C = EVENTS_CONTENT.filter;

/**
 * EventsFilter — Barra de filtros de categorías con pill animado vía layoutId.
 * Accesible: cada botón tiene aria-pressed y un id único.
 *
 * @param {{ activeCategory: string, onCategoryChange: function, resultCount: number }} props
 */
export default function EventsFilter({ activeCategory, onCategoryChange, resultCount }) {
  return (
    <div className="section-container">
      <Reveal className="mb-8 flex flex-col gap-3">
        <SectionEyebrow>{C.eyebrow}</SectionEyebrow>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-heading text-3xl font-bold text-brand-heading md:text-4xl">
            {C.title}
          </h2>
          <p className="text-sm text-brand-muted">
            <span className="font-semibold text-brand-subtle">{resultCount}</span>{" "}
            {C.resultsLabel}
          </p>
        </div>
      </Reveal>

      {/* Filter pills */}
      <Reveal delay={0.1}>
        <ul
          role="list"
          aria-label="Filtrar eventos por categoría"
          className="flex flex-wrap gap-2"
        >
          {EVENT_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            const btnId = `events-filter-${cat.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`;

            return (
              <li key={cat} role="listitem">
                <button
                  type="button"
                  id={btnId}
                  onClick={() => onCategoryChange(cat)}
                  aria-pressed={isActive}
                  className={cn(
                    "relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
                    isActive
                      ? "text-brand-bg"
                      : "text-brand-subtle hover:text-brand-heading glass border border-brand-border"
                  )}
                >
                  {/* Pill background animado */}
                  {isActive && (
                    <motion.span
                      layoutId="events-filter-pill"
                      className="absolute inset-0 rounded-full bg-brand-gold shadow-gold-glow"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </div>
  );
}
