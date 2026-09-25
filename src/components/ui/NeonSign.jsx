import { cn } from "../../utils/cn";

const NEON_TEXT_GLOW =
  "[text-shadow:0_0_3px_#ffd77a,0_0_10px_#f0c040,0_0_24px_rgba(212,160,23,0.75),0_0_44px_rgba(212,160,23,0.4)]";
const NEON_TUBE_GLOW =
  "shadow-[0_0_6px_rgba(240,192,64,0.85),0_0_18px_rgba(212,160,23,0.45),inset_0_0_10px_rgba(212,160,23,0.35)]";

/** Cord ends sit over the two screws on the plaque (9% / 91% of its width). */
function Cords() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
      className="block min-h-0 w-full flex-1 overflow-visible"
    >
      <line x1="50%" y1="0" x2="9%" y2="100%" stroke="rgba(200,200,216,0.38)" strokeWidth="1" />
      <line x1="50%" y1="0" x2="91%" y2="100%" stroke="rgba(200,200,216,0.38)" strokeWidth="1" />
    </svg>
  );
}

function Screw({ className }) {
  return (
    <span
      aria-hidden="true"
      className={cn("absolute -top-[3px] h-[7px] w-[7px] rounded-full border border-[#55555f] bg-[#3a3a44]", className)}
    />
  );
}

export default function NeonSign({ title, subtitle, className }) {
  return (
    <div
      className={cn(
        "relative flex w-[156px] origin-top flex-col items-center will-change-transform motion-safe:animate-sign-swing sm:w-44",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="-mt-1 h-2 w-2 shrink-0 rounded-full border-[1.5px] border-brand-muted bg-brand-bg sm:h-[9px] sm:w-[9px]"
      />
      <Cords />

      <div className="relative h-20 w-full shrink-0 rounded-[11px] border border-white/[0.07] bg-gradient-to-b from-[#17120b] to-[#0c0a07] p-1.5 shadow-[0_22px_44px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.05)] sm:h-[88px] sm:rounded-xl">
        <Screw className="left-[11px] sm:left-3" />
        <Screw className="right-[11px] sm:right-3" />

        <div
          className={cn(
            "flex h-full flex-col items-center justify-center gap-[5px] rounded-[7px] border-[1.5px] border-brand-gold sm:rounded-lg",
            NEON_TUBE_GLOW
          )}
        >
          <span
            className={cn(
              "font-heading text-[26px] font-bold italic leading-none text-[#fff1c9] motion-safe:animate-neon-flicker sm:text-[30px]",
              NEON_TEXT_GLOW
            )}
          >
            {title}
          </span>
          <span className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.32em] text-brand-text sm:text-[9.5px] sm:tracking-[0.34em]">
            <span aria-hidden="true" className="h-px w-3 bg-brand-text/45 sm:w-3.5" />
            {subtitle}
            <span aria-hidden="true" className="h-px w-3 bg-brand-text/45 sm:w-3.5" />
          </span>
        </div>
      </div>

      {/* Warm light the neon casts on the wall below; swings with the sign. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 left-1/2 -z-10 h-20 w-64 -translate-x-1/2 rounded-full bg-brand-gold/[0.14] blur-[36px]"
      />
    </div>
  );
}
