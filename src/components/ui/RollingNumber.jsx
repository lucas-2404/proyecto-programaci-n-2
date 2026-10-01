import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const IS_DIGIT = /\d/;
const ITEM_EM = 1.3; // Reel slot height; the glyph sits centred with room for the fade mask.
const BASE_SLOTS = 10; // Digits a reel passes through before landing…
const EXTRA_SLOTS = 5; // …plus this many more for each digit to its right.
const BASE_DURATION = 1.2; // Seconds for the first reel; later reels roll longer.
const EXTRA_DURATION = 0.25;
const REEL_STAGGER = 0.08;
// Fast drop, long settle, with a slight overshoot so the digit "lands".
const LANDING_EASE = [0.2, 0.85, 0.25, 1.06];

const REEL_MASK =
  "[mask-image:linear-gradient(to_bottom,transparent,#000_15%,#000_85%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,#000_15%,#000_85%,transparent)]";

// One slot-machine reel
function DigitReel({ digit, slots, active, duration, delay }) {
  const strip = Array.from({ length: slots }, (_, i) => (digit - i + 10 * slots) % 10);
  const start = `${-(slots - 1) * ITEM_EM}em`;

  return (
    <span className={`relative inline-block h-[1.3em] overflow-hidden ${REEL_MASK}`}>
      <motion.span
        className="flex flex-col"
        initial={{ y: start }}
        animate={{ y: active ? "0em" : start }}
        transition={{ duration, delay, ease: LANDING_EASE }}
      >
        {strip.map((value, i) => (
          <span key={i} className="block h-[1.3em] leading-[1.3em]">
            {value}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

// Contador tipo tragamonedas: al entrar en pantalla cada dígito gira y se frena en su valor
export default function RollingNumber({ value, delay = 0, className }) {
  const ref = useRef(null);
  const active = useInView(ref, { once: true });
  let reelIndex = -1;

  return (
    <span className={className}>
      <span ref={ref} aria-hidden="true" className="inline-flex">
        {Array.from(value).map((char, i) => {
          if (!IS_DIGIT.test(char)) return <span key={i}>{char}</span>;
          reelIndex += 1;
          return (
            <DigitReel
              key={i}
              digit={Number(char)}
              slots={BASE_SLOTS + reelIndex * EXTRA_SLOTS}
              active={active}
              duration={BASE_DURATION + reelIndex * EXTRA_DURATION}
              delay={delay + reelIndex * REEL_STAGGER}
            />
          );
        })}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
