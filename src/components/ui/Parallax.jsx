import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// Shifts its content vertically while it crosses the viewport
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
