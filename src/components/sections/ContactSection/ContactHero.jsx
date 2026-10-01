import { motion } from "framer-motion";
import { RevealGroup, RevealItem } from "../../ui/Reveal";
import SectionEyebrow from "../../ui/SectionEyebrow";

// ── Variants (defined outside component — no re-creation on re-render) ──────────
const lineVariants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.55 },
  },
};

// ── Component ───────────────────────────────────────────────────────────────────
// Page header for the contact section
export default function ContactHero({ hero }) {
  return (
    <header className="relative overflow-hidden py-24 md:py-32">
      {/* Decorative radial glow — same technique as AboutSection, no blur filter */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-0 -z-10 h-[36rem] w-[36rem] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(212,160,23,0.09), rgba(212,160,23,0.03) 55%, transparent 78%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-[28rem] w-[28rem] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(212,160,23,0.06), transparent 70%)",
        }}
      />

      <div className="section-container">
        <RevealGroup className="flex flex-col gap-6 max-w-3xl">
          {/* Eyebrow */}
          <RevealItem>
            <SectionEyebrow>{hero.eyebrow}</SectionEyebrow>
          </RevealItem>

          {/* Heading */}
          <RevealItem>
            <h1 className="font-heading text-5xl font-bold leading-[1.02] tracking-tight text-brand-heading text-balance md:text-7xl lg:text-8xl">
              {hero.heading}{" "}
              <span className="italic text-gold-gradient">
                {hero.headingAccent}
              </span>
            </h1>
          </RevealItem>

          {/* Animated gold line separator */}
          <RevealItem>
            <motion.span
              className="block h-px w-24 bg-gradient-to-r from-brand-gold to-brand-gold-light"
              variants={lineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              aria-hidden="true"
            />
          </RevealItem>

          {/* Subheading */}
          <RevealItem>
            <p className="text-lg leading-relaxed text-brand-subtle max-w-xl text-balance">
              {hero.subheading}
            </p>
          </RevealItem>
        </RevealGroup>

        {/* "Abierto" status badge */}
        <motion.div
          variants={badgeVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 inline-flex items-center gap-3 glass border border-brand-border rounded-2xl px-5 py-3"
        >
          <span
            className="relative flex h-2.5 w-2.5"
            aria-hidden="true"
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
          <span className="text-sm font-medium text-brand-text">
            Abierto esta noche ·{" "}
            <span className="text-brand-gold font-semibold">20:00 – 04:00</span>
          </span>
        </motion.div>
      </div>
    </header>
  );
}
