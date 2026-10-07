import { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { unsplashUrl, unsplashSrcSet } from "../../../utils/unsplash";
import { formatDate } from "../../../utils/cn";
import { EVENTS_CONTENT } from "./eventsContent";

const C = EVENTS_CONTENT.modal;

// ── Animation variants ─────────────────────────────────────────────────────────
const BACKDROP_VARIANTS = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const MODAL_VARIANTS = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 16,
    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Helpers ────────────────────────────────────────────────────────────────────
function DetailRow({ label, value }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-muted">
        {label}
      </span>
      <span className="text-sm font-medium text-brand-text">{value}</span>
    </div>
  );
}

/**
 * EventModal — Modal de detalle de un evento.
 * Accesible: role=dialog, aria-modal, aria-labelledby, focus trap, ESC, scroll lock.
 *
 * @param {{ event: object|null, isOpen: boolean, onClose: function }} props
 */
export default function EventModal({ event, isOpen, onClose }) {
  const closeButtonRef = useRef(null);

  // ── ESC + scroll lock ──────────────────────────────────────────────────────
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
      // Focus trap: foco al botón de cierre al abrir
      requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });
    }

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  if (!event) return null;

  const priceLabel =
    event.price === 0
      ? C.freeEntry
      : `$${event.price.toLocaleString("es-AR")}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="modal-backdrop"
            variants={BACKDROP_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
            onClick={handleBackdropClick}
            aria-hidden="true"
          />

          {/* ── Panel ── */}
          <motion.div
            key="modal-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-event-title"
            variants={MODAL_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="
              fixed inset-x-4 top-1/2 z-50 -translate-y-1/2
              max-h-[90vh] overflow-y-auto overscroll-contain
              rounded-[24px] bg-brand-surface border border-brand-border shadow-glass-lg
              md:inset-x-auto md:left-1/2 md:w-full md:max-w-2xl md:-translate-x-1/2
            "
          >
            {/* ── Imagen ── */}
            <div className="relative aspect-video overflow-hidden rounded-t-[24px]">
              {event.imageLocal ? (
                <img
                  src={event.imageLocal}
                  alt={`Imagen del evento: ${event.title}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              ) : (
                <img
                  src={unsplashUrl(event.imageUnsplashId, 1080)}
                  srcSet={unsplashSrcSet(event.imageUnsplashId, [768, 1080])}
                  sizes="(min-width: 768px) 672px, 100vw"
                  alt={`Imagen del evento: ${event.title}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              )}
              {/* Gradient bottom */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-surface to-transparent"
              />

              {/* Botón cerrar */}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label={C.closeLabelSr}
                id="modal-close-btn"
                className="
                  absolute right-4 top-4 flex h-9 w-9 items-center justify-center
                  rounded-full glass-dark border border-brand-border
                  text-brand-heading transition-all duration-200
                  hover:border-brand-gold/50 hover:text-brand-gold
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold
                "
              >
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M2 2l12 12M14 2L2 14" />
                </svg>
              </button>

              {/* Badge categoría */}
              <div className="absolute left-4 bottom-4 rounded-full glass-dark border border-brand-border px-3 py-1 text-xs font-semibold text-brand-gold">
                {event.category}
              </div>
            </div>

            {/* ── Contenido ── */}
            <div className="flex flex-col gap-6 p-6 md:p-8">
              {/* Título */}
              <div className="flex flex-col gap-2">
                <h2
                  id="modal-event-title"
                  className="font-heading text-2xl font-bold text-brand-heading md:text-3xl"
                >
                  {event.title}
                </h2>
                <p className="text-sm text-brand-subtle">{event.description}</p>
              </div>

              {/* Detalles en grid */}
              <div
                aria-label={C.detailsLabel}
                className="grid grid-cols-2 gap-4 rounded-2xl glass border border-brand-border p-5 sm:grid-cols-3"
              >
                <DetailRow label={C.dateLabel} value={formatDate(event.date)} />
                <DetailRow label={C.timeLabel} value={event.time} />
                <DetailRow label={C.doorsLabel} value={event.doorTime} />
                <DetailRow label={C.priceLabel} value={priceLabel} />
                {event.capacity && (
                  <DetailRow
                    label={C.capacityLabel}
                    value={event.capacity.toString()}
                  />
                )}
                {event.spotsLeft !== null && (
                  <DetailRow
                    label={C.spotsLabel}
                    value={event.spotsLeft.toString()}
                  />
                )}
              </div>

              {/* Descripción larga */}
              <p className="text-[15px] leading-relaxed text-brand-subtle">
                {event.longDescription}
              </p>

              {/* Artista */}
              {event.artist && (
                <div className="flex flex-col gap-3 rounded-2xl border border-brand-border bg-brand-card p-5">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-gold">
                    {C.artistLabel}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-heading text-xl font-bold text-brand-heading">
                      {event.artist.name}
                    </h3>
                    <span className="text-xs text-brand-muted">
                      {event.artist.genre}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-brand-subtle">
                    {event.artist.bio}
                  </p>
                  {event.artist.instagramHandle && (
                    <a
                      href={`https://instagram.com/${event.artist.instagramHandle.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${C.instagramLabel}: ${event.artist.instagramHandle}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-brand-gold gold-underline w-fit"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      {event.artist.instagramHandle}
                    </a>
                  )}
                </div>
              )}

              {/* Tags */}
              {event.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full glass border border-brand-border px-3 py-1 text-xs text-brand-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* CTA */}
              <div className="pt-2">
                {event.price === 0 ? (
                  <p className="text-center text-sm font-semibold text-brand-gold">
                    {C.freeEntry}
                  </p>
                ) : (
                  <button
                    type="button"
                    id={`modal-reserve-btn-${event.id}`}
                    className="
                      w-full rounded-xl bg-brand-gold py-3.5 text-sm font-bold text-brand-bg
                      shadow-gold-glow transition-all duration-300
                      hover:bg-brand-gold-light hover:shadow-gold-strong
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface
                    "
                    aria-label={`Reservar lugar para ${event.title}`}
                  >
                    {C.reserveCta} — {priceLabel}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
