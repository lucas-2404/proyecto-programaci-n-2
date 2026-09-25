import { useEffect, useRef } from "react";

/**
 * useScrollLock — Locks the document body scroll when `locked` is true.
 * Restores original overflow on cleanup. GPU-safe: does not cause layout thrashing
 * beyond the initial style read (cached in ref).
 *
 * @param {boolean} locked - Whether the scroll should be locked.
 */
export function useScrollLock(locked) {
  const originalOverflowRef = useRef("");

  useEffect(() => {
    if (locked) {
      originalOverflowRef.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalOverflowRef.current;
    }

    return () => {
      document.body.style.overflow = originalOverflowRef.current;
    };
  }, [locked]);
}
