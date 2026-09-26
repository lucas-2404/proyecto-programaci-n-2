import { MotionConfig } from "framer-motion";
import NoiseOverlay from "../../ui/NoiseOverlay";
import ContactHero from "./ContactHero";
import ContactInfo from "./ContactInfo";
import ContactMap from "./ContactMap";
import ContactForm from "./ContactForm";
import ContactSocial from "./ContactSocial";

/**
 * ContactSection — Orchestrator for the full /contacto page content.
 *
 * Layout:
 *   1. ContactHero   — Page title and status badge
 *   2. ContactInfo   — 3 glass cards (address, phone, hours)
 *   3. Map + Form    — Side-by-side responsive grid
 *   4. ContactSocial — Social network cards
 *
 * MotionConfig reducedMotion="user" wraps the entire tree so all Framer Motion
 * animations respect the user's prefers-reduced-motion preference.
 */
export default function ContactSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="contacto"
        aria-labelledby="contact-form-title"
        className="relative isolate overflow-hidden bg-brand-bg"
      >
        {/* Noise grain — tiled 160×160 SVG, rasterized once, no GPU re-raster on scroll */}
        <NoiseOverlay opacity={0.05} />

        {/* Ambient background glow — pure CSS radial, no blur filter */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-1/4 -z-10 h-[50rem] w-[50rem] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(212,160,23,0.07), rgba(212,160,23,0.02) 55%, transparent 78%)",
          }}
        />

        {/* ── 1. Hero ── */}
        <ContactHero />

        {/* Section divider */}
        <div
          aria-hidden="true"
          className="section-container"
        >
          <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-border to-transparent" />
        </div>

        {/* ── 2. Info cards ── */}
        <div className="py-16 md:py-20">
          <ContactInfo />
        </div>

        {/* ── 3. Map + Form ── */}
        <div className="pb-24 md:pb-32">
          <div className="section-container grid gap-8 lg:grid-cols-2 lg:items-stretch">
            {/* Map — takes full column height on desktop */}
            <div className="min-h-[360px] lg:min-h-[560px]">
              <ContactMap />
            </div>

            {/* Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>

        {/* Section divider */}
        <div
          aria-hidden="true"
          className="section-container"
        >
          <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-border to-transparent" />
        </div>

        {/* ── 4. Social ── */}
        <div className="py-20 md:py-28">
          <ContactSocial />
        </div>
      </section>
    </MotionConfig>
  );
}
