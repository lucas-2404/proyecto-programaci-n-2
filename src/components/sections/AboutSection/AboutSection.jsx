import { Link } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import NoiseOverlay from "../../ui/NoiseOverlay";
import Parallax from "../../ui/Parallax";
import ParallaxImage from "../../ui/ParallaxImage";
import RollingNumber from "../../ui/RollingNumber";
import SectionEyebrow from "../../ui/SectionEyebrow";
import { Reveal, RevealGroup, RevealItem } from "../../ui/Reveal";
import PillarIcon from "./PillarIcon";
import { GALLERY, PILLARS, STATS, STORY, TAP_LIST } from "./aboutContent";

const IMAGE_ZOOM = "transition-transform duration-700 ease-out group-hover:scale-105";
const GLASS_CARD = "rounded-[22px] border border-white/[0.08] bg-white/[0.035]";

// Parallax depth, in px: [offset entering from below, offset leaving at the top].
// Positive → negative rises faster than the page (closer); the reverse lags (farther).
const DEPTH = {
  title: [30, -30],
  intro: [70, -70],
  story: [16, -16],
  gallery: [70, -70],
  pillars: [
    [12, -12],
    [32, -32],
    [20, -20],
  ],
  tapList: [36, -36],
};

/**
 * AboutSection — Story, craft beer and atmosphere of Los Amigos.
 * Entrance animations: framer-motion whileInView (once), transform + opacity only.
 * Scroll parallax: layers move at different speeds (see DEPTH) and photos drift
 * inside their frames.
 * MotionConfig honours prefers-reduced-motion (drops the translate, keeps the fade).
 */
export default function AboutSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="historia"
        aria-labelledby="about-title"
        className="relative isolate overflow-hidden bg-gradient-to-b from-gray-900 to-black py-24 md:py-36"
      >
        <NoiseOverlay />
        {/* Glow de fondo. Antes era un div de 720×720 con blur-[160px] dentro
            de un <Parallax>: el navegador tenía que re-rasterizar ese desenfoque
            gigante en cada frame de scroll. Un radial-gradient da el mismo halo
            difuso, se rasteriza una sola vez y no crea capa ni filtro. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-48 top-96 -z-10 h-[45rem] w-[45rem] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(212,160,23,0.085), rgba(212,160,23,0.03) 55%, transparent 78%)",
          }}
        />

        <div className="section-container flex flex-col gap-24 md:gap-28">
          {/* ── Header ── */}
          <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-8">
            <Parallax range={DEPTH.title} className="lg:col-span-7">
              <Reveal className="flex flex-col gap-6">
                <SectionEyebrow>Nuestra historia</SectionEyebrow>
                <h2
                  id="about-title"
                  className="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-brand-heading text-balance md:text-6xl"
                >
                  Empezó como una mesa entre amigos.{" "}
                  <span className="italic text-gold-gradient">Hoy es la tuya.</span>
                </h2>
              </Reveal>
            </Parallax>
            <Parallax range={DEPTH.intro} className="lg:col-span-4 lg:col-start-9">
              <Reveal as="p" delay={0.15} className="text-[17px] leading-relaxed text-brand-subtle">
                Un bar de barrio con alma de cervecería: canillas que rotan, tragos pensados y una
                barra donde todos terminan conociéndose.
              </Reveal>
            </Parallax>
          </div>

          {/* ── Story + gallery ── */}
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <Parallax range={DEPTH.story} className="flex flex-col justify-between gap-12 lg:col-span-5 lg:py-2">
              <RevealGroup className="flex flex-col gap-6 text-[17px] leading-[1.75]">
                {STORY.map((paragraph, i) => (
                  <RevealItem as="p" key={i} className={i === 0 ? "text-brand-text" : "text-brand-subtle"}>
                    {paragraph}
                  </RevealItem>
                ))}
              </RevealGroup>

              <RevealGroup as="dl" className="grid grid-cols-3 border-t border-white/[0.08] pt-7">
                {STATS.map(({ value, label }, i) => (
                  <RevealItem
                    key={label}
                    className={i > 0 ? "flex flex-col-reverse gap-1.5 border-l border-white/[0.08] pl-4 sm:pl-6" : "flex flex-col-reverse gap-1.5"}
                  >
                    <dt className="text-[13px] text-brand-subtle">{label}</dt>
                    <dd className="font-heading text-3xl font-bold tabular-nums text-brand-heading md:text-4xl">
                      <RollingNumber value={value} delay={i * 0.12} />
                    </dd>
                  </RevealItem>
                ))}
              </RevealGroup>
            </Parallax>

            <Parallax range={DEPTH.gallery} className="lg:col-span-6 lg:col-start-7">
              <RevealGroup stagger={0.15} className="grid grid-cols-2 gap-4 md:gap-5 lg:h-[40rem] lg:grid-rows-2">
                <RevealItem as="figure" className="group relative col-span-2 aspect-[4/3] overflow-hidden rounded-[22px] lg:col-span-1 lg:row-span-2 lg:aspect-auto">
                  <ParallaxImage
                    photoId={GALLERY.main.photoId}
                    alt={GALLERY.main.alt}
                    priority
                    width={1080}
                    height={810}
                    sizes="(min-width: 1024px) 25vw, 100vw"
                    className={`h-full w-full object-cover object-[38%_50%] ${IMAGE_ZOOM}`}
                  />
                  <figcaption className="glass-dark absolute inset-x-4 bottom-4 flex flex-col gap-0.5 rounded-2xl px-4 py-3.5">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-gold">
                      {GALLERY.main.caption.title}
                    </span>
                    <span className="text-sm text-brand-heading">{GALLERY.main.caption.place}</span>
                  </figcaption>
                </RevealItem>
                {GALLERY.side.map(({ photoId, alt }) => (
                  <RevealItem key={photoId} className="group relative aspect-square overflow-hidden rounded-[22px] lg:aspect-auto">
                    <ParallaxImage
                      photoId={photoId}
                      alt={alt}
                      width={768}
                      height={768}
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className={`h-full w-full object-cover ${IMAGE_ZOOM}`}
                    />
                  </RevealItem>
                ))}
              </RevealGroup>
            </Parallax>
          </div>

          {/* ── Pillars: each card at its own depth, so the row ripples ── */}
          <RevealGroup as="ul" className="grid gap-6 md:grid-cols-3">
            {PILLARS.map(({ icon, title, text }, i) => (
              <Parallax as="li" key={title} range={DEPTH.pillars[i % DEPTH.pillars.length]}>
                <RevealItem className={`${GLASS_CARD} flex h-full flex-col gap-4 p-8 md:p-9`}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gold/10 text-brand-gold">
                    <PillarIcon name={icon} />
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-brand-heading">{title}</h3>
                  <p className="text-[15px] leading-relaxed text-brand-subtle">{text}</p>
                </RevealItem>
              </Parallax>
            ))}
          </RevealGroup>

          {/* ── On tap ── */}
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
            <Reveal className="group relative h-64 overflow-hidden rounded-[22px] md:h-80 lg:col-span-5">
              <ParallaxImage
                photoId={TAP_LIST.image.photoId}
                alt={TAP_LIST.image.alt}
                width={1080}
                height={720}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className={`h-full w-full object-cover ${IMAGE_ZOOM}`}
              />
            </Reveal>

            <Parallax range={DEPTH.tapList} className="flex flex-col gap-6 lg:col-span-6 lg:col-start-7">
              <Reveal className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold">
                  En canilla esta semana
                </h3>
                <Link to="/menu" className="gold-underline text-sm font-medium text-brand-gold-light">
                  Ver la carta completa →
                </Link>
              </Reveal>
              <RevealGroup as="ul" stagger={0.08} className="border-b border-white/[0.08]">
                {TAP_LIST.beers.map(({ style, notes }) => (
                  <RevealItem
                    as="li"
                    key={style}
                    className="flex flex-col gap-1 border-t border-white/[0.08] py-4 sm:flex-row sm:items-baseline sm:gap-4"
                  >
                    <span className="font-heading text-[22px] text-brand-heading sm:w-40 sm:shrink-0">{style}</span>
                    <span className="text-sm text-brand-subtle">{notes}</span>
                  </RevealItem>
                ))}
              </RevealGroup>
            </Parallax>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
