import { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EventCard from "./EventCard";
import { EVENTS_CONTENT } from "./eventsContent";

const C = EVENTS_CONTENT.filter;

// ── Empty state ────────────────────────────────────────────────────────────────
const EMPTY_VARIANTS = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * EventsGrid — Grilla responsiva de EventCards con filtrado animado.
 * AnimatePresence + layout: el reordenamiento al filtrar es suave, sin jumps.
 *
 * @param {{ events: object[], onEventClick: function }} props
 */
export default function EventsGrid({ events, onEventClick }) {
  const handleEventClick = useCallback(
    (event) => {
      onEventClick(event);
    },
    [onEventClick]
  );

  return (
    <div id="eventos-grilla" className="section-container mt-10">
      <AnimatePresence mode="popLayout">
        {events.length === 0 ? (
          <motion.div
            key="empty"
            variants={EMPTY_VARIANTS}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div
              aria-hidden="true"
              className="mb-6 flex h-20 w-20 items-center justify-center rounded-full glass border border-brand-border text-4xl"
            >
              🎭
            </div>
            <p className="font-heading text-xl font-bold text-brand-heading">
              {C.emptyTitle}
            </p>
            <p className="mt-2 max-w-xs text-sm text-brand-muted">
              {C.emptySubtitle}
            </p>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onClick={handleEventClick}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
