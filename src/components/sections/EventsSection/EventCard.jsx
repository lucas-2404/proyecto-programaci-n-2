import { useCallback } from "react";
import { motion } from "framer-motion";
import { unsplashUrl, unsplashSrcSet } from "../../../utils/unsplash";
import { formatDate } from "../../../utils/cn";
import { EVENTS_CONTENT } from "./eventsContent";

const C = EVENTS_CONTENT.card;

// ── Animation variants (definidas fuera del componente para no recrear en render) ──
const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Category color map ─────────────────────────────────────────────────────────
const CATEGORY_COLORS = {
  "Música en Vivo": "text-brand-amber border-brand-amber/30 bg-brand-amber/10",
  "DJ Set":         "text-sky-400 border-sky-400/30 bg-sky-400/10",
  "Noche Temática": "text-purple-400 border-purple-400/30 bg-purple-400/10",
  "Especial":       "text-brand-gold border-brand-gold/30 bg-brand-gold/10",
};

/**
 * EventCard — Card individual de un evento.
 * Hover: borde dorado + sombra gold-glow + escala de la imagen.
 *
 * @param {{ event: object, onClick: function }} props
 */
export default function EventCard({ event, onClick }) {
  const handleClick = useCallback(() => {
    onClick(event);
  }, [event, onClick]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick(event);
      }
    },
    [event, onClick]
  );

  const categoryClass =
    CATEGORY_COLORS[event.category] ??
    "text-brand-subtle border-brand-border bg-brand-card";

  const priceLabel =
    event.price === 0
      ? C.freeEntry
      : `${C.pricePrefix}${event.price.toLocaleString("es-AR")}`;

  return (
    <motion.article
      layout
      variants={CARD_VARIANTS}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -12, transition: { duration: 0.25 } }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Ver detalle de ${event.title}`}
      id={`event-card-${event.id}`}
      className="
        group relative flex cursor-pointer flex-col overflow-hidden
        rounded-[22px] border border-brand-border bg-brand-card
        transition-all duration-300
        hover:border-brand-gold/40 hover:shadow-gold-glow
        focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold
      "
    >
      {/* ── Imagen ── */}
      <div className="relative aspect-video overflow-hidden">
        {event.imageLocal ? (
          <img
            src={event.imageLocal}
            alt={`Evento: ${event.title}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <img
            src={unsplashUrl(event.imageUnsplashId, 768)}
            srcSet={unsplashSrcSet(event.imageUnsplashId, [480, 768, 1080])}
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            alt={`Evento: ${event.title}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}

        {/* Gradient inferior sobre la imagen */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-card to-transparent"
        />

        {/* Badge categoría */}
        <div
          className={`absolute left-3 top-3 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${categoryClass}`}
        >
          {event.category}
        </div>

        {/* Badge featured */}
        {event.featured && (
          <div className="absolute right-3 top-3 rounded-full bg-brand-gold px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.12em] text-brand-bg shadow-gold-glow">
            {C.featured}
          </div>
        )}
      </div>

      {/* ── Contenido ── */}
      <div className="flex flex-1 flex-col gap-3 p-5 pt-4">
        {/* Fecha + hora */}
        <div className="flex items-center gap-2 text-xs text-brand-muted">
          <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="3" width="12" height="11" rx="2" />
            <path d="M5 1v3M11 1v3M2 7h12" />
          </svg>
          <span>
            {formatDate(event.date)} · {event.time}
          </span>
        </div>

        {/* Título */}
        <h3 className="font-heading text-xl font-bold leading-tight text-brand-heading line-clamp-2 group-hover:text-gold-gradient">
          {event.title}
        </h3>

        {/* Descripción */}
        <p className="flex-1 text-sm leading-relaxed text-brand-subtle line-clamp-2">
          {event.description}
        </p>

        {/* Tags */}
        {event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full glass border border-brand-border px-2 py-0.5 text-[10px] text-brand-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer: precio + CTA */}
        <div className="mt-auto flex items-center justify-between border-t border-brand-border pt-4">
          <span
            className={`font-heading text-base font-bold ${
              event.price === 0 ? "text-brand-gold" : "text-brand-heading"
            }`}
          >
            {priceLabel}
          </span>
          <span className="text-xs font-semibold text-brand-subtle transition-colors duration-200 group-hover:text-brand-gold">
            {C.detailCta} →
          </span>
        </div>
      </div>
    </motion.article>
  );
}
