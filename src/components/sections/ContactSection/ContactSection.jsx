import { MotionConfig } from "framer-motion";
import NoiseOverlay from "../../ui/NoiseOverlay";
import ContactHero from "./ContactHero";
import ContactInfo from "./ContactInfo";
import ContactMap from "./ContactMap";
import ContactForm from "./ContactForm";
import ContactSocial from "./ContactSocial";

// Orchestrator for the full /contacto page content
export default function ContactSection({ hero, infoItems, socialLinks, formSubjects, mapUrl }) {
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
        <ContactHero hero={hero} />

        {/* Section divider */}
        <div
          aria-hidden="true"
          className="section-container"
        >
          <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-border to-transparent" />
        </div>

        {/* ── 2. Info cards ── */}
        <div className="py-16 md:py-20">
          <ContactInfo items={infoItems} />
        </div>

        {/* ── 3. Map + Form ── */}
        <div className="pb-24 md:pb-32">
          <div className="section-container grid gap-8 lg:grid-cols-2 lg:items-stretch">
            {/* Map — takes full column height on desktop */}
            <div className="min-h-[360px] lg:min-h-[560px]">
              <ContactMap mapUrl={mapUrl} />
            </div>

            {/* Form */}
            <div>
              <ContactForm subjects={formSubjects} />
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
          <ContactSocial links={socialLinks} />
        </div>
      </section>
    </MotionConfig>
  );
}
