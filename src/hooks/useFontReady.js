import { useEffect, useState } from "react";

/**
 * useFontReady — Resolves to true once a web font face is loaded, or after
 * `timeoutMs` so a slow network never blocks rendering.
 *
 * GlyphPortal freezes its font on mount and disables the scroll camera if the
 * requested face is still pending, so it must mount after the font is ready.
 *
 * @param {string} descriptor  CSS font shorthand, e.g. '900 100px "Playfair Display"'
 * @param {string} [text]      Characters that must be covered by the face
 * @param {number} [timeoutMs=2000]
 * @returns {boolean}
 */
export function useFontReady(descriptor, text, timeoutMs = 2000) {
  const [ready, setReady] = useState(
    () => !document.fonts || document.fonts.check(descriptor, text)
  );

  useEffect(() => {
    if (ready) return;
    let cancelled = false;
    const done = () => {
      if (!cancelled) setReady(true);
    };
    const timer = setTimeout(done, timeoutMs);
    document.fonts.load(descriptor, text).then(done, done);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [descriptor, text, timeoutMs, ready]);

  return ready;
}
