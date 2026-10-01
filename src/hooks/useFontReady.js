import { useEffect, useState } from "react";

// Devuelve true cuando la fuente cargó, o al vencer el tiempo máximo
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
