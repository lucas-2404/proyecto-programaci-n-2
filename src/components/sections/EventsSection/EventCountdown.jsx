import { motion } from "framer-motion";
import { useEventCountdown } from "../../../hooks/useEventCountdown";

// ── Animation variants ─────────────────────────────────────────────────────────
const BLOCK_VARIANTS = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ── Sub-component ──────────────────────────────────────────────────────────────

/**
 * CountUnit — Un bloque individual del countdown (días / hs / min / seg).
 */
function CountUnit({ value, label, index }) {
  const display = String(value).padStart(2, "0");

  return (
    <motion.div
      custom={index}
      variants={BLOCK_VARIANTS}
      className="flex flex-col items-center gap-2"
    >
      {/* Número */}
      <div
        className="
          glass relative flex h-16 w-16 items-center justify-center
          rounded-2xl border border-brand-gold/20
          shadow-inner-gold md:h-20 md:w-20
        "
      >
        {/* Shimmer superior */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent"
        />
        <span className="font-heading text-2xl font-bold tabular-nums text-brand-heading md:text-3xl">
          {display}
        </span>
      </div>

      {/* Etiqueta */}
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-muted">
        {label}
      </span>
    </motion.div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

/**
 * EventCountdown — Cuenta regresiva en tiempo real hacia un evento.
 * Actualiza cada segundo. El intervalo se limpia en el hook al desmontar.
 *
 * @param {{ targetDate: Date, className?: string }} props
 */
export default function EventCountdown({ targetDate, className }) {
  const { days, hours, minutes, seconds, isExpired } = useEventCountdown(targetDate);

  if (isExpired) {
    return (
      <p className="text-sm font-medium text-brand-gold">
        ¡El evento ya comenzó!
      </p>
    );
  }

  const units = [
    { value: days, label: "Días" },
    { value: hours, label: "Hs" },
    { value: minutes, label: "Min" },
    { value: seconds, label: "Seg" },
  ];

  return (
    <div
      className={className}
      role="timer"
      aria-label="Cuenta regresiva al próximo evento"
      aria-live="off"
    >
      {/* Separator dots */}
      <div className="flex items-center gap-2 md:gap-3">
        {units.map(({ value, label }, i) => (
          <div key={label} className="flex items-center gap-2 md:gap-3">
            <CountUnit value={value} label={label} index={i} />
            {i < units.length - 1 && (
              <span
                aria-hidden="true"
                className="mb-5 self-center text-xl font-bold text-brand-gold/40"
              >
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
