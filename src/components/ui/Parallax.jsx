import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Parallax — Shifts its content vertically while it crosses the viewport.
 * `range` is [offset when entering from below, offset when leaving at the top]:
 * [60, -60] rises faster than the page (foreground), [-60, 60] lags behind it
 * (background). Values are px numbers or strings such as "8%".
 *
 * Scroll-linked MotionValue bound to `transform`: no React re-renders, no
 * layout work. Safe to wrap Reveal elements: it sets no variants, so their
 * entrance animations still stagger from the parent group.
 * Disabled under prefers-reduced-motion.
 */
export default function Parallax({ as = "div", range = [40, -40], className, children }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], range);
  const Tag = motion[as];

  return (
    <Tag ref={ref} className={className} style={reduceMotion ? undefined : { y }}>
      {children}
    </Tag>
  );
}
