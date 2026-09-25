import { memo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// ── Footer data configuration ──────────────────────────────────────────────────
const FOOTER_LINKS = {
  navegacion: [
    { label: "Inicio",    href: "/" },
    { label: "Carta",     href: "/menu" },
    { label: "Eventos",   href: "/eventos" },
    { label: "Nosotros",  href: "/nosotros" },
    { label: "Contacto",  href: "/contacto" },
    { label: "Reservas",  href: "/reservas" },
  ],
  legal: [
    { label: "Política de Privacidad", href: "/privacidad" },
    { label: "Términos de Uso",        href: "/terminos" },
    { label: "Política de Cookies",    href: "/cookies" },
  ],
};

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href:  "https://instagram.com",
    icon:  "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    label: "Facebook",
    href:  "https://facebook.com",
    icon:  "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    label: "TikTok",
    href:  "https://tiktok.com",
    icon:  "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z",
  },
  {
    label: "WhatsApp",
    href:  "https://wa.me",
    icon:  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
  },
];

const CONTACT_INFO = [
  {
    id:    "footer-address",
    label: "Dirección",
    value: "Av. San Martín 1420, Rosario",
    icon:  "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    id:    "footer-phone",
    label: "Teléfono",
    value: "+54 341 555-0199",
    icon:  "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
  },
  {
    id:    "footer-hours",
    label: "Horarios",
    value: "Mié–Dom: 20:00 – 04:00",
    icon:  "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

// ── Animation variants ─────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden:   { opacity: 0, y: 20 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// ── Sub-components (memoized for performance) ──────────────────────────────────
const SocialButton = memo(function SocialButton({ label, href, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="
        group flex items-center justify-center w-10 h-10 rounded-xl
        glass border border-brand-border
        hover:border-brand-gold/40 hover:shadow-gold-glow
        transition-all duration-300 will-transform
      "
    >
      <svg
        className="w-4 h-4 text-brand-muted group-hover:text-brand-gold transition-colors duration-300"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d={icon} />
      </svg>
    </a>
  );
});

const FooterLink = memo(function FooterLink({ label, href }) {
  const isExternal = href.startsWith("http");
  return isExternal ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block text-brand-muted hover:text-brand-gold text-sm transition-colors duration-200 gold-underline w-fit"
    >
      {label}
    </a>
  ) : (
    <Link
      to={href}
      className="block text-brand-muted hover:text-brand-gold text-sm transition-colors duration-200 gold-underline w-fit"
    >
      {label}
    </Link>
  );
});

// ── Main Footer component ──────────────────────────────────────────────────────
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-brand-border overflow-hidden" aria-label="Pie de página">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-brand-gold/5 blur-[80px]" />
        <div className="absolute top-0 right-1/3 w-48 h-48 rounded-full bg-brand-gold/3 blur-[60px]" />
      </div>

      <div className="relative section-container py-16 lg:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8"
        >
          {/* ── Column 1: Brand block (wider) ──────────────────────── */}
          <motion.div variants={itemVariants} className="lg:col-span-4">
            {/* Logo */}
            <Link to="/" className="inline-flex items-center gap-3 mb-5 group no-select" aria-label="Los Amigos – Inicio">
              <div className="w-10 h-10 rounded-xl bg-brand-gold flex items-center justify-center shadow-gold-glow group-hover:shadow-gold-strong transition-shadow duration-300">
                <span className="text-brand-bg font-heading font-bold text-base leading-none">LA</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-heading font-bold text-lg text-brand-heading">Los Amigos</span>
                <span className="text-[10px] font-sans text-brand-gold tracking-[0.25em] uppercase">Bar & Coctelería</span>
              </div>
            </Link>

            {/* Tagline */}
            <p className="text-brand-muted text-sm leading-relaxed max-w-xs mb-6">
              El lugar donde cada noche se convierte en un recuerdo. Cócteles artesanales, música en vivo y la mejor compañía en el corazón de Rosario.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2" role="list" aria-label="Redes sociales">
              {SOCIAL_LINKS.map((social) => (
                <div key={social.label} role="listitem">
                  <SocialButton {...social} />
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Column 2: Navigation ───────────────────────────────── */}
          <motion.div variants={itemVariants} className="lg:col-span-2 lg:col-start-6">
            <h3 className="text-brand-heading text-xs font-semibold uppercase tracking-[0.2em] mb-5">
              Navegación
            </h3>
            <nav aria-label="Navegación del pie de página">
              <ul className="flex flex-col gap-2.5" role="list">
                {FOOTER_LINKS.navegacion.map(({ label, href }) => (
                  <li key={href}>
                    <FooterLink label={label} href={href} />
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* ── Column 3: Contact info ─────────────────────────────── */}
          <motion.div variants={itemVariants} className="lg:col-span-3 lg:col-start-8">
            <h3 className="text-brand-heading text-xs font-semibold uppercase tracking-[0.2em] mb-5">
              Dónde Encontrarnos
            </h3>
            <address className="not-italic flex flex-col gap-4">
              {CONTACT_INFO.map(({ id, label, value, icon }) => (
                <div key={id} id={id} className="flex items-start gap-3">
                  <div className="mt-0.5 w-7 h-7 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-brand-gold" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                      <path d={icon} />
                    </svg>
                  </div>
                  <div>
                    <p className="text-brand-muted text-[11px] uppercase tracking-[0.1em] mb-0.5">{label}</p>
                    <p className="text-brand-text text-sm font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </address>
          </motion.div>

          {/* ── Column 4: Newsletter mini CTA ─────────────────────── */}
          <motion.div variants={itemVariants} className="lg:col-span-3 lg:col-start-11">
            <h3 className="text-brand-heading text-xs font-semibold uppercase tracking-[0.2em] mb-5">
              Novedades
            </h3>
            <p className="text-brand-muted text-sm leading-relaxed mb-4">
              Enterate primero de los eventos exclusivos y promociones.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-2"
              aria-label="Suscribirse a novedades"
            >
              <input
                id="footer-newsletter-email"
                type="email"
                placeholder="tu@email.com"
                aria-label="Correo electrónico"
                required
                className="
                  w-full px-4 py-2.5 rounded-xl text-sm
                  glass border border-brand-border
                  text-brand-text placeholder:text-brand-muted
                  focus:outline-none focus:border-brand-gold/50 focus:shadow-gold-glow
                  transition-all duration-300 bg-transparent
                "
              />
              <button
                id="footer-newsletter-submit"
                type="submit"
                className="
                  w-full py-2.5 rounded-xl text-sm font-semibold
                  bg-brand-gold/10 border border-brand-gold/30 text-brand-gold
                  hover:bg-brand-gold hover:text-brand-bg hover:shadow-gold-glow
                  transition-all duration-300
                "
              >
                Suscribirme
              </button>
            </form>
          </motion.div>
        </motion.div>

        {/* ── Bottom bar ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 pt-6 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-brand-muted text-xs">
            © {currentYear} <span className="text-brand-gold font-medium">Los Amigos Bar</span>. Todos los derechos reservados.
          </p>

          <nav aria-label="Navegación legal">
            <ul className="flex items-center gap-5" role="list">
              {FOOTER_LINKS.legal.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="text-brand-muted hover:text-brand-subtle text-xs transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Crafted-with tag */}
          <p className="text-brand-muted/60 text-[11px] tracking-wide">
            Hecho con <span className="text-brand-gold">♥</span> en Rosario, ARG
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
