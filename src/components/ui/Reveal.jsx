import { motion } from "framer-motion";

// Only transform + opacity are animated: both run on the compositor.
const EASE_OUT = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, amount: 0.2 };

const BASE_TRANSITION = { duration: 0.7, ease: EASE_OUT };

// `delay` arrives through `custom`. It is omitted when 0 so a parent's
// staggerChildren still controls the timing of grouped items.
const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: delay ? { ...BASE_TRANSITION, delay } : BASE_TRANSITION,
  }),
};

/**
 * Reveal — Fades an element up the first time it enters the viewport.
 * @param {{ as?: string, delay?: number, className?: string, children: React.ReactNode }} props
 */
export function Reveal({ as = "div", delay = 0, className, children }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={itemVariants}
      custom={delay}
    >
      {children}
    </Tag>
  );
}

/**
 * RevealGroup — One viewport observer that staggers its <RevealItem> children.
 */
export function RevealGroup({ as = "div", stagger = 0.12, className, children }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </Tag>
  );
}

/** RevealItem — Child of <RevealGroup>; inherits the group's trigger. */
export function RevealItem({ as = "div", className, children }) {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={itemVariants}>
      {children}
    </Tag>
  );
}
