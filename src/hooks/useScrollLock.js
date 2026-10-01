import { useEffect, useRef } from "react";

// Locks the document body scroll when `locked` is true
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
