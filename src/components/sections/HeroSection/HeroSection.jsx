import { Link } from "react-router-dom";
import GlyphPortal from "../../ui/GlyphPortal";
import LiveClock from "../../ui/LiveClock";
import NeonSign from "../../ui/NeonSign";
import ResponsiveImage from "../../ui/ResponsiveImage";
import ScrollIndicator from "../../ui/ScrollIndicator";
import SectionEyebrow from "../../ui/SectionEyebrow";
import { useFontReady } from "../../../hooks/useFontReady";

// ── Config ─────────────────────────────────────────────────────────────────────
const HERO_WORD = "AMIGOS";
const FOCUS_CHAR = "O";
const PORTAL_FONT = '"Playfair Display", "Arial Black", serif';
const PORTAL_FONT_DESCRIPTOR = '900 100px "Playfair Display"';
const HERO_PHOTO_ID = "1572116469696-31de0f17cc34"; // Bar lit by Edison bulbs and neon
const BAR_TIME_ZONE = "America/Argentina/Tucuman"; // Tucumán: the bar's time, not the visitor's

// GlyphPortal theme tokens mapped to the brand palette (tailwind.config.js)
const PORTAL_THEME = {
  "--gp-paper": "#0a0a0f",
  "--gp-ink": "#c8c8d8",
  "--gp-field": "#0a0a0f",
  "--gp-foreground": "#f0f0f8",
};

// Scroll parallax for the opening frame. GlyphPortal writes --gp-caption on the
// section every scroll frame (1 at rest → 0 at ~16% of the travel, smoothstep).
// Pure CSS transforms driven by that var: no listeners, no React re-renders.
// The sign retracts up past the top edge (plus room for its glow); the scroll
// indicator and the clock drop below the bottom edge (plus their 9% offset).

const RETRACT_UP = {
  transform: "translate3d(0, calc((var(--gp-caption, 1) - 1) * (100% + 3rem)), 0)",
};
const RETRACT_DOWN = {
  transform:
    "translate3d(0, calc((1 - var(--gp-caption, 1)) * (100% + var(--gp-height, 100svh) * 0.09 + 1rem)), 0)",
};

// TODO: completar con los datos reales del bar.
const TONIGHT = [
  { label: "Horario", value: "19:00 - 02:00" },
  { label: "Música en vivo", value: "30 sep. - 20:00hs" },
  { label: "Happy hour", value: "21:00 - 22:00" },
];

// ── Portal slots ───────────────────────────────────────────────────────────────
// Declared once at module scope: stable references, never rebuilt on re-render.

/** Scene seen through the letters, then full-bleed once the camera enters. */
function HeroBackground() {
  return (
    <div className="absolute inset-0 will-change-transform [transform:scale(var(--gp-field-scale,1))]">
      <ResponsiveImage
        photoId={HERO_PHOTO_ID}
        alt=""
        width={1920}
        height={1280}
        priority
        className="h-full w-full object-cover object-[50%_55%]"
      />
      {/* Scrims fade in with the content (--gp-reveal) so the letters stay bright. */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/10 opacity-[var(--gp-reveal,1)]" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-brand-bg to-transparent opacity-[var(--gp-reveal,1)]" />
    </div>
  );
}

function HeroFront() {
  return (
    <>
      {/* Hangs from the top of the frame down to just above the word. */}
      <div
        className="absolute inset-x-0 top-0 flex h-[calc(var(--gp-word-top,35%)_-_1.25rem)] justify-center will-change-transform"
        style={RETRACT_UP}
      >
        <NeonSign title="Abierto" subtitle="esta noche" className="h-full" />
      </div>

      <p className="absolute inset-x-4 top-[calc(var(--gp-word-bottom,65%)_+_1.75rem)] mx-auto max-w-md text-center text-base leading-relaxed text-brand-subtle opacity-[var(--gp-caption,1)] sm:text-lg">
        Cervezas artesanales, coctelería de autor y la barra amiguera de siempre. Scrollea para entrar
      </p>

      <div className="absolute bottom-[9%] left-[8%] will-change-transform" style={RETRACT_DOWN}>
        <ScrollIndicator />
      </div>

      <div className="absolute bottom-[9%] right-[8%] will-change-transform" style={RETRACT_DOWN}>
        <LiveClock label="Tucumán · ahora" timeZone={BAR_TIME_ZONE} />
      </div>
    </>
  );
}

/** Revealed once the camera passes through the O. */
function HeroContent() {
  return (
    <div className="mx-auto grid w-full max-w-7xl items-end gap-12 lg:grid-cols-12">
      <div className="flex flex-col gap-7 lg:col-span-7">
        <SectionEyebrow>Bienvenidos a Los Amigos</SectionEyebrow>
        <h1 className="font-heading text-5xl font-bold leading-[1.02] tracking-tight text-brand-heading text-balance md:text-7xl">
          Donde cada noche <span className="italic text-gold-gradient">cobra vida</span>
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-brand-text">
          Canillas de cerveza artesanal, tragos de autor y música en vivo en el corazón de Tucumán.
          Pasá, que siempre hay lugar para uno más.
        </p>
        <div className="flex flex-col gap-4 pt-2 sm:flex-row">
          <Link
            to="/reservas"
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-brand-gold px-8 text-sm font-semibold text-brand-bg shadow-gold-glow transition-[box-shadow,background-color] duration-300 hover:bg-brand-gold-light hover:shadow-gold-strong"
          >
            Reservar una mesa
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2 8h12M9 3l5 5-5 5" />
            </svg>
          </Link>
          <Link
            to="/menu"
            className="glass inline-flex min-h-[52px] items-center justify-center rounded-xl px-8 text-sm font-medium text-brand-heading transition-colors duration-300 hover:border-brand-gold/40 hover:text-brand-gold"
          >
            Ver la carta
          </Link>
        </div>
      </div>

      <aside
        aria-label="Hoy en Los Amigos"
        className="glass-dark flex flex-col gap-4 rounded-2xl p-6 shadow-glass lg:col-span-4 lg:col-start-9"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-subtle">Hoy</span>
          <span className="flex items-center gap-2 text-sm text-brand-heading">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            Abierto
          </span>
        </div>
        <dl className="flex flex-col gap-2.5 text-[15px]">
          {TONIGHT.map(({ label, value }) => (
            <div key={label} className="flex justify-between gap-4">
              <dt className="text-brand-subtle">{label}</dt>
              <dd className="text-brand-heading">{value}</dd>
            </div>
          ))}
        </dl>
      </aside>
    </div>
  );
}

const heroBackground = <HeroBackground />;
const heroFront = <HeroFront />;

// ── Section ────────────────────────────────────────────────────────────────────
/**
 * HeroSection — Scroll-driven camera through the word "AMIGOS" (GlyphPortal).
 * The portal mounts only after Playfair Display 900 is ready: it freezes its
 * font on mount and would fall back to a static frame if the face were pending.
 */
export default function HeroSection() {
  const fontReady = useFontReady(PORTAL_FONT_DESCRIPTOR, HERO_WORD);

  if (!fontReady) {
    // Same footprint as the portal's opening frame: no layout shift on swap.
    return <div className="h-[100svh] bg-brand-bg" aria-busy="true" />;
  }

  return (
    <GlyphPortal
      word={HERO_WORD}
      focusChar={FOCUS_CHAR}
      interactive={false}
      fontFamily={PORTAL_FONT}
      fontWeight={900}
      scrollLength={2.6}
      background={heroBackground}
      front={heroFront}
      enterLabel="Entrar al bar"
      // Front layer stays opaque: its pieces exit by moving, not by fading.
      // The portal's "Entrar al bar" link is replaced visually by the clock but
      // kept as a keyboard skip link: hidden until it receives focus.
      className="font-sans text-[13px] tracking-wide [&_[data-gp-front]]:opacity-100 [&_[data-gp-enter]:not(:focus-visible)]:sr-only"
      style={PORTAL_THEME}
    >
      <HeroContent />
    </GlyphPortal>
  );
}
