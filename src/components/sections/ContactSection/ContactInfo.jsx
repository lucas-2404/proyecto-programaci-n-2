import { memo } from "react";
import { RevealGroup, RevealItem } from "../../ui/Reveal";
import { cn } from "../../../utils/cn";

// ── Sub-component (memoized) ────────────────────────────────────────────────────
// Single glass card for one piece of contact info
const InfoCard = memo(function InfoCard({ id, icon, label, value, detail, href, external }) {
  const inner = (
    <div className="flex items-start gap-4">
      {/* Icon container */}
      <div
        className="mt-0.5 flex h-11 w-11 flex-shrink-0 items-center justify-center
                   rounded-2xl bg-brand-gold/10 border border-brand-gold/20"
        aria-hidden="true"
      >
        <svg
          className="h-5 w-5 text-brand-gold"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d={icon} />
        </svg>
      </div>

      {/* Text */}
      <div className="flex flex-col gap-0.5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-muted">
          {label}
        </p>
        <p className="text-base font-semibold text-brand-heading leading-snug">
          {value}
        </p>
        {detail && (
          <p className="text-xs text-brand-muted mt-0.5">{detail}</p>
        )}
      </div>
    </div>
  );

  const cardClasses = cn(
    "group relative glass border border-brand-border rounded-[22px] p-6",
    "transition-all duration-300",
    "hover:border-brand-gold/40 hover:shadow-gold-glow",
    href && "cursor-pointer"
  );

  if (href) {
    const linkProps = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};
    return (
      <a id={id} href={href} className={cardClasses} {...linkProps}>
        {inner}
      </a>
    );
  }

  return (
    <div id={id} className={cardClasses}>
      {inner}
    </div>
  );
});

// ── Main component ──────────────────────────────────────────────────────────────
// Grid of 3 glass cards: address, phone, hours
export default function ContactInfo({ items }) {
  return (
    <div className="section-container">
      <RevealGroup
        as="ul"
        stagger={0.1}
        className="grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        {/* .map() crea una tarjeta por dato; la key es el `id`, único y estable */}
        {items.map((item) => (
          <RevealItem as="li" key={item.id}>
            <InfoCard {...item} />
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
