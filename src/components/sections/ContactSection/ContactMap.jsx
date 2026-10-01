import { useState } from "react";

// ── Fallback placeholder ────────────────────────────────────────────────────────
function MapPlaceholder() {
  return (
    <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-4 bg-brand-card">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gold/10 border border-brand-gold/20">
        <svg
          className="h-7 w-7 text-brand-gold"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-brand-heading">
          Av. San Martín 1420
        </p>
        <p className="text-xs text-brand-muted mt-0.5">
          San Miguel de Tucumán, Argentina
        </p>
      </div>
      <a
        href="https://maps.google.com/?q=Av.+San+Martín+1420+Tucumán"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs font-medium text-brand-gold hover:text-brand-gold-light
                   transition-colors duration-200 gold-underline"
      >
        Abrir en Google Maps →
      </a>
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────────
// Embedded Google Maps iframe with dark filter to match theme
export default function ContactMap({ mapUrl }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-[22px] border border-brand-border h-full min-h-[320px] shadow-glass">
      {hasError ? (
        <MapPlaceholder />
      ) : (
        <>
          <iframe
            title="Ubicación de Los Amigos Bar — Av. San Martín 1420, Tucumán"
            src={mapUrl}
            width="100%"
            height="100%"
            style={{
              border: 0,
              // Dark theme inversion — makes the map visually match the brand palette
              filter: "invert(90%) hue-rotate(180deg) saturate(0.8) brightness(0.85)",
              minHeight: "320px",
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onError={() => setHasError(true)}
            className="absolute inset-0 h-full w-full"
          />

          {/* Gold corner badge overlay */}
          <div className="pointer-events-none absolute bottom-4 left-4 z-10">
            <div className="glass-dark flex items-center gap-2 rounded-xl border border-brand-border px-3.5 py-2.5">
              <svg
                className="h-3.5 w-3.5 text-brand-gold flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span className="text-xs font-medium text-brand-text">
                Av. San Martín 1420, Tucumán
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
