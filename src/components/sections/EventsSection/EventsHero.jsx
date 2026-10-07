import { motion } from "framer-motion";
import SectionEyebrow from "../../ui/SectionEyebrow";
import NoiseOverlay from "../../ui/NoiseOverlay";
import { Reveal } from "../../ui/Reveal";
import EventCountdown from "./EventCountdown";
import { EVENTS_CONTENT } from "./eventsContent";
import { featuredEvents } from "../../../data/eventsData";
import { unsplashUrl, unsplashSrcSet } from "../../../utils/unsplash";
import { formatDate } from "../../../utils/cn";

const C = EVENTS_CONTENT.hero;

// El primer evento featured es el protagonista del hero
const nextFeatured = featuredEvents[0] ?? null;

// ── Animation variants ─────────────────────────────────────────────────────────
const TEXT_VARIANTS = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const VIEWPORT = { once: true, amount: 0.2 };

/**
 * EventsHero — Sección hero de la página de eventos.
 * Incluye H1, subtítulo, badge del próximo evento featured y countdown en vivo.
 */
export default function EventsHero() {
  return (
    <section
      aria-labelledby="events-hero-title"
      className="relative isolate min-h-[92vh] overflow-hidden bg-brand-bg"
    >
      {/* ── Imagen de fondo ── */}
      {nextFeatured && (
        <>
          {nextFeatured.imageLocal ? (
            <img
              src={nextFeatured.imageLocal}
              alt=""
              aria-hidden="true"
              loading="eager"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <img
              src={unsplashUrl(nextFeatured.imageUnsplashId, 1920, 55)}
              srcSet={unsplashSrcSet(nextFeatured.imageUnsplashId)}
              sizes="100vw"
              alt=""
              aria-hidden="true"
              loading="eager"
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          {/* Overlay multicapa para legibilidad del texto */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-brand-bg"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent"
          />
        </>
      )}

      {/* Glow ambiental */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/4 -z-10 h-[40rem] w-[40rem] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(212,160,23,0.12), rgba(212,160,23,0.03) 55%, transparent 78%)",
        }}
      />

      <NoiseOverlay opacity={0.04} />

      {/* ── Contenido ── */}
      <div className="relative section-container flex min-h-[92vh] flex-col justify-end pb-20 pt-32 md:pb-28 md:pt-40">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            custom={0}
            variants={TEXT_VARIANTS}
            initial="hidden"
            animate="visible"
          >
            <SectionEyebrow className="mb-6">{C.eyebrow}</SectionEyebrow>
          </motion.div>

          {/* H1 */}
          <motion.h1
            id="events-hero-title"
            custom={0.1}
            variants={TEXT_VARIANTS}
            initial="hidden"
            animate="visible"
            className="font-heading text-5xl font-bold leading-[1.04] tracking-tight text-brand-heading text-balance md:text-7xl lg:text-8xl"
          >
            {C.title}{" "}
            <span className="italic text-gold-gradient">{C.titleAccent}</span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            custom={0.22}
            variants={TEXT_VARIANTS}
            initial="hidden"
            animate="visible"
            className="mt-6 max-w-xl text-lg leading-relaxed text-brand-text md:text-xl"
          >
            {C.subtitle}
          </motion.p>

          {/* ── Countdown card ── */}
          {nextFeatured ? (
            <motion.div
              custom={0.35}
              variants={TEXT_VARIANTS}
              initial="hidden"
              animate="visible"
              className="mt-10 inline-flex flex-col gap-5 rounded-[22px] glass-dark border border-brand-gold/20 p-6 shadow-glass-lg"
            >
              {/* Label */}
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-brand-gold" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold">
                  {C.nextEventLabel}
                </span>
              </div>

              {/* Evento info */}
              <div className="flex flex-col gap-1">
                <span className="text-xs text-brand-muted">
                  {formatDate(nextFeatured.date)} · {nextFeatured.time}
                </span>
                <h2 className="font-heading text-2xl font-bold text-brand-heading">
                  {nextFeatured.title}
                </h2>
                <span className="text-sm text-brand-subtle">
                  {nextFeatured.artist.genre}
                </span>
              </div>

              {/* Countdown */}
              <div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-muted">
                  {C.countdownLabel}
                </p>
                <EventCountdown targetDate={nextFeatured.date} />
              </div>
            </motion.div>
          ) : (
            <motion.p
              custom={0.35}
              variants={TEXT_VARIANTS}
              initial="hidden"
              animate="visible"
              className="mt-10 text-brand-muted"
            >
              {C.noUpcoming}
            </motion.p>
          )}

          {/* CTA scroll */}
          <motion.a
            href="#eventos-grilla"
            custom={0.48}
            variants={TEXT_VARIANTS}
            initial="hidden"
            animate="visible"
            aria-label={`${C.cta} — desplazarse hacia abajo`}
            className="
              mt-8 inline-flex items-center gap-2.5
              text-sm font-semibold text-brand-gold gold-underline
              transition-opacity duration-300 hover:opacity-80
            "
          >
            {C.cta}
            <svg
              className="h-4 w-4"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M8 2v12M3 9l5 5 5-5" />
            </svg>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
