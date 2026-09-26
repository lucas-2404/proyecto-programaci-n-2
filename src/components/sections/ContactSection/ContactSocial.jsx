import { memo } from "react";
import { RevealGroup, RevealItem } from "../../ui/Reveal";
import { Reveal } from "../../ui/Reveal";
import SectionEyebrow from "../../ui/SectionEyebrow";
import { SOCIAL_LINKS } from "./contactContent";

// ── Sub-component (memoized) ────────────────────────────────────────────────────
/**
 * SocialCard — Individual social network card with icon, label, and handle.
 */
const SocialCard = memo(function SocialCard({ label, handle, href, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Seguinos en ${label}${handle ? ` — ${handle}` : ""}`}
      className="
        group flex flex-col items-center gap-3 glass border border-brand-border
        rounded-[22px] p-6 text-center
        hover:border-brand-gold/40 hover:shadow-gold-glow
        transition-all duration-300 will-transform
      "
    >
      {/* Icon circle */}
      <div
        className="
          flex h-12 w-12 items-center justify-center rounded-2xl
          bg-brand-gold/10 border border-brand-gold/20
          group-hover:bg-brand-gold/20 group-hover:border-brand-gold/40
          transition-all duration-300
        "
        aria-hidden="true"
      >
        <svg
          className="h-5 w-5 text-brand-muted group-hover:text-brand-gold transition-colors duration-300"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d={icon} />
        </svg>
      </div>

      {/* Text */}
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-semibold text-brand-heading group-hover:text-brand-gold transition-colors duration-300">
          {label}
        </span>
        {handle && (
          <span className="text-xs text-brand-muted">{handle}</span>
        )}
      </div>
    </a>
  );
});

// ── Main component ──────────────────────────────────────────────────────────────
/**
 * ContactSocial — Section with eyebrow, heading, and grid of social network cards.
 */
export default function ContactSocial() {
  return (
    <div className="section-container">
      {/* Header */}
      <Reveal className="flex flex-col gap-4 mb-10 max-w-lg">
        <SectionEyebrow>Redes sociales</SectionEyebrow>
        <h2 className="font-heading text-3xl font-bold text-brand-heading md:text-4xl">
          Seguinos y{" "}
          <span className="italic text-gold-gradient">mantente al tanto.</span>
        </h2>
        <p className="text-base text-brand-subtle leading-relaxed">
          Eventos, promociones y todo lo que pasa en Los Amigos, primero en nuestras redes.
        </p>
      </Reveal>

      {/* Social cards grid */}
      <RevealGroup
        as="ul"
        stagger={0.08}
        className="grid grid-cols-2 gap-4 sm:grid-cols-4"
      >
        {SOCIAL_LINKS.map(({ label, handle, href, icon }) => (
          <RevealItem as="li" key={label}>
            <SocialCard
              label={label}
              handle={handle}
              href={href}
              icon={icon}
            />
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
