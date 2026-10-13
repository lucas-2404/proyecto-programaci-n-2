import { useState, useCallback, useMemo } from "react";
import { MotionConfig } from "framer-motion";
import NoiseOverlay from "../../ui/NoiseOverlay";
import EventsHero from "./EventsHero";
import EventsFeaturedCarousel from "./EventsFeaturedCarousel";
import EventsFilter from "./EventsFilter";
import EventsGrid from "./EventsGrid";
import EventModal from "./EventModal";
import { upcomingEvents } from "../../../data/eventsData";

/**
 * EventsSection — Orchestrador de la página de Eventos de Los Amigos Bar.
 *
 * Layout:
 *   1. EventsHero          — H1 + countdown al próximo evento featured
 *   2. EventsFeaturedCarousel — Carousel de eventos destacados
 *   3. EventsFilter        — Filtro de categorías (pill animado)
 *   4. EventsGrid          — Grilla de cards (animada con AnimatePresence)
 *   5. EventModal          — Modal de detalle (overlay global)
 *
 * Estado centralizado aquí para evitar prop drilling innecesario.
 * MotionConfig reducedMotion="user" cubre todo el árbol de animaciones.
 */
export default function EventsSection() {
  // ── Estado ─────────────────────────────────────────────────────────────────
  const [activeCategory, setActiveCategory] = useState("Todos");
  // Un solo estado para el modal: hay un evento elegido → el modal está abierto.
  // (AnimatePresence conserva el evento anterior mientras dura la animación de salida,
  // así que no hace falta ningún setTimeout.)
  const [selectedEvent, setSelectedEvent] = useState(null);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleCategoryChange = useCallback((cat) => {
    setActiveCategory(cat);
  }, []);

  const handleEventClick = useCallback((event) => {
    setSelectedEvent(event);
  }, []);

  const handleModalClose = useCallback(() => {
    setSelectedEvent(null);
  }, []);

  // ── Datos derivados ────────────────────────────────────────────────────────
  const filteredEvents = useMemo(() => {
    const source = upcomingEvents; // ya ordenados por fecha
    if (activeCategory === "Todos") return source;
    return source.filter((e) => e.category === activeCategory);
  }, [activeCategory]);

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="eventos"
        aria-label="Sección de eventos de Los Amigos Bar"
        className="relative isolate bg-brand-bg"
      >
        <NoiseOverlay opacity={0.04} />

        {/* Ambient glow — pure CSS, no filter en scroll */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[60rem] w-[60rem] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(212,160,23,0.06), rgba(212,160,23,0.015) 55%, transparent 78%)",
          }}
        />

        {/* ── 1. Hero ── */}
        <EventsHero />

        {/* Section divider */}
        <div aria-hidden="true" className="section-container">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-border to-transparent" />
        </div>

        {/* ── 2. Featured Carousel ── */}
        <EventsFeaturedCarousel />

        {/* Section divider */}
        <div aria-hidden="true" className="section-container">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-border to-transparent" />
        </div>

        {/* ── 3. Filter + 4. Grid ── */}
        <div className="py-16 md:py-24">
          <EventsFilter
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            resultCount={filteredEvents.length}
          />
          <EventsGrid
            events={filteredEvents}
            onEventClick={handleEventClick}
          />
        </div>
      </section>

      {/* ── 5. Modal — se dibuja en <body> con un portal (ver EventModal) ── */}
      <EventModal event={selectedEvent} onClose={handleModalClose} />
    </MotionConfig>
  );
}
