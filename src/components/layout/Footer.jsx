import { memo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logoImg from "../../img/logolosamigos.png";

// ── Animation variants ─────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
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
export default function Footer({ links, socialLinks, contactInfo }) {
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
              <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center shadow-gold-glow group-hover:shadow-gold-strong transition-shadow duration-300 bg-brand-card">
                <img
                  src={logoImg}
                  alt="Logo Los Amigos Bar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-heading font-bold text-lg text-brand-heading">Los Amigos</span>
                <span className="text-[10px] font-sans text-brand-gold tracking-[0.25em] uppercase">Bar & Coctelería</span>
              </div>
            </Link>

            {/* Tagline */}
            <p className="text-brand-muted text-sm leading-relaxed max-w-xs mb-6">
              El lugar donde cada noche se convierte en un recuerdo. Cócteles artesanales, música en vivo y la mejor compañía en el corazón de Tucumán.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2" role="list" aria-label="Redes sociales">
              {/* .map(): un botón por red social. La key es el nombre de la red. */}
              {socialLinks.map((social) => (
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
                {/* .map(): un enlace por página del sitio; el href es único (key). */}
                {links.navegacion.map(({ label, href }) => (
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
              {/* .map(): una fila por dato de contacto; el `id` es la key. */}
              {contactInfo.map(({ id, label, value, icon }) => (
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
              {/* .map(): un enlace por documento legal. */}
              {links.legal.map(({ label, href }) => (
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


        </motion.div>
      </div>
    </footer>
  );
}