import { useEffect, useState } from "react";

// Fecha actual, actualizada una vez por minuto
export function useCurrentTime(intervalMs = 60_000) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let timer;
    const schedule = () => {
      timer = setTimeout(tick, intervalMs - (Date.now() % intervalMs));
    };
    const tick = () => {
      setNow(new Date());
      schedule();
    };
    const resync = () => {
      if (document.visibilityState !== "visible") return;
      clearTimeout(timer);
      tick();
    };

    schedule();
    document.addEventListener("visibilitychange", resync);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", resync);
    };
  }, [intervalMs]);

  return now;
}
