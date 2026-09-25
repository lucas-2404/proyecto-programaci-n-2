import { useEffect, useState } from "react";

/**
 * useCurrentTime — Current Date, refreshed on each `intervalMs` boundary
 * (default: every minute, exactly when the minute changes), so a clock
 * re-renders once per minute instead of every second.
 * Re-syncs when the tab becomes visible again (background timers are throttled).
 *
 * @param {number} [intervalMs=60000]
 * @returns {Date}
 */
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
