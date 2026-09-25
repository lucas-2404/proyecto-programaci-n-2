import { cn } from "../../utils/cn";
import { useCurrentTime } from "../../hooks/useCurrentTime";

// Intl formatters are costly to build: one per time zone, reused every tick.
const formatters = new Map();
function getFormatter(timeZone) {
  if (!formatters.has(timeZone)) {
    formatters.set(
      timeZone,
      new Intl.DateTimeFormat("es-AR", { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone })
    );
  }
  return formatters.get(timeZone);
}

/**
 * LiveClock — Current time (HH:MM) in a given time zone, with a blinking colon.
 * Re-renders once per minute; the blink is a CSS keyframe (tailwind.config.js).
 */
export default function LiveClock({ label, timeZone, className }) {
  const parts = getFormatter(timeZone).formatToParts(useCurrentTime());
  const hours = parts.find((part) => part.type === "hour")?.value ?? "--";
  const minutes = parts.find((part) => part.type === "minute")?.value ?? "--";

  return (
    <p className={cn("flex flex-col items-end gap-1.5", className)}>
      <span className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.28em] text-brand-subtle sm:text-[10px]">
        <span aria-hidden="true" className="h-px w-3.5 bg-brand-text/45" />
        {label}
      </span>
      <time
        dateTime={`${hours}:${minutes}`}
        className="flex items-baseline font-heading text-[32px] leading-none tracking-[-0.01em] text-brand-heading [font-variant-numeric:lining-nums_tabular-nums] sm:text-[40px]"
      >
        {hours}
        <span className="px-0.5 text-brand-gold motion-safe:animate-clock-blink">:</span>
        {minutes}
      </time>
    </p>
  );
}
