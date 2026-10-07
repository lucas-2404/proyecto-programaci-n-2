import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionEyebrow from "../../ui/SectionEyebrow";
import { Reveal } from "../../ui/Reveal";
import { EVENTS_CONTENT } from "./eventsContent";
import { featuredEvents } from "../../../data/eventsData";
import { unsplashUrl, unsplashSrcSet } from "../../../utils/unsplash";
import { formatDate } from "../../../utils/cn";

const C = EVENTS_CONTENT.carousel;

// ── Slide animation variants ───────────────────────────────────────────────────
const SLIDE_VARIANTS = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: (dir) => ({
    opacity: 0,
    x: dir > 0 ? -60 : 60,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  }),
};

/**
 * EventsFeaturedCarousel — Carousel de eventos destacados con navegación animada.
 * Muestra los eventos con featured: true usando framer-motion AnimatePresence.
 */
export default function EventsFeaturedCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const total = featuredEvents.length;

  const goTo = useCallback((index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  const prev = useCallback(() => {
    const next = (current - 1 + total) % total;
    setDirection(-1);
    setCurrent(next);
  }, [current, total]);

  const next = useCallback(() => {
    const nextIdx = (current + 1) % total;
    setDirection(1);
    setCurrent(nextIdx);
  }, [current, total]);

  if (total === 0) return null;

  const event = featuredEvents[current];

  return (
    <section
      aria-label="Eventos destacados"
      className="relative overflow-hidden py-20 md:py-28"
    >
      <div className="section-container">
        {/* Header */}
        <Reveal className="mb-12 flex flex-col gap-3">
          <SectionEyebrow>{C.eyebrow}</SectionEyebrow>
          <h2 className="font-heading text-3xl font-bold text-brand-heading md:text-4xl">
            {C.title}
          </h2>
        </Reveal>

        {/* Carousel */}
        <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
          {/* ── Imagen ── */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-[22px]">
            <AnimatePresence custom={direction} mode="popLayout">
              {event.imageLocal ? (
                <motion.img
                  key={event.id + "-img"}
                  custom={direction}
                  variants={SLIDE_VARIANTS}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  src={event.imageLocal}
                  alt={`Evento: ${event.title}`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <motion.img
                  key={event.id + "-img"}
                  custom={direction}
                  variants={SLIDE_VARIANTS}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  src={unsplashUrl(event.imageUnsplashId, 1080)}
                  srcSet={unsplashSrcSet(event.imageUnsplashId, [480, 768, 1080])}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  alt={`Evento: ${event.title}`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
            </AnimatePresence>

            {/* Badge Featured */}
            <div
              className="absolute left-4 top-4 rounded-full bg-brand-gold px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-brand-bg shadow-gold-glow"
              aria-label="Evento destacado"
            >
              Destacado
            </div>
          </div>

          {/* ── Contenido ── */}
          <div className="flex flex-col gap-6 lg:pl-4">
            <AnimatePresence custom={direction} mode="popLayout">
              <motion.div
                key={event.id + "-content"}
                custom={direction}
                variants={SLIDE_VARIANTS}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col gap-4"
              >
                {/* Category badge */}
                <span className="inline-flex w-fit items-center rounded-full glass border border-brand-border px-3 py-1 text-xs font-semibold text-brand-gold">
                  {event.category}
                </span>

                {/* Fecha + hora */}
                <p className="text-sm text-brand-muted">
                  {formatDate(event.date)} · {event.time}
                </p>

                {/* Título */}
                <h3 className="font-heading text-3xl font-bold leading-tight text-brand-heading md:text-4xl">
                  {event.title}
                </h3>

                {/* Descripción larga */}
                <p className="text-[15px] leading-relaxed text-brand-subtle">
                  {event.longDescription}
                </p>

                {/* Artista */}
                <div className="flex flex-col gap-1 border-t border-brand-border pt-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold">
                    Artista
                  </span>
                  <span className="font-heading text-lg font-bold text-brand-heading">
                    {event.artist.name}
                  </span>
                  <span className="text-sm text-brand-muted">{event.artist.genre}</span>
                </div>

                {/* Precio */}
                <div className="flex items-center gap-4">
                  <span className="font-heading text-2xl font-bold text-brand-heading">
                    {event.price === 0
                      ? "Entrada libre"
                      : `$${event.price.toLocaleString("es-AR")}`}
                  </span>
                  {event.spotsLeft !== null && (
                    <span className="rounded-full glass-dark border border-brand-border px-3 py-1 text-xs text-brand-subtle">
                      {event.spotsLeft} lugares
                    </span>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* ── Controles de navegación ── */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={prev}
                aria-label={C.prevLabel}
                id="carousel-prev"
                className="
                  flex h-11 w-11 items-center justify-center rounded-full
                  glass border border-brand-border
                  text-brand-subtle transition-all duration-200
                  hover:border-brand-gold/40 hover:text-brand-gold
                "
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M13 16l-6-6 6-6" />
                </svg>
              </button>

              {/* Indicadores */}
              <div className="flex items-center gap-2" role="tablist" aria-label="Diapositivas del carousel">
                {featuredEvents.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={i === current}
                    aria-label={`${C.goToLabel} ${i + 1}`}
                    id={`carousel-indicator-${i}`}
                    onClick={() => goTo(i)}
                    className="relative h-1.5 overflow-hidden rounded-full bg-brand-border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                    style={{ width: i === current ? "2rem" : "0.375rem" }}
                  >
                    {i === current && (
                      <motion.span
                        layoutId="carousel-active-dot"
                        className="absolute inset-0 rounded-full bg-brand-gold"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={next}
                aria-label={C.nextLabel}
                id="carousel-next"
                className="
                  flex h-11 w-11 items-center justify-center rounded-full
                  glass border border-brand-border
                  text-brand-subtle transition-all duration-200
                  hover:border-brand-gold/40 hover:text-brand-gold
                "
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 4l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
