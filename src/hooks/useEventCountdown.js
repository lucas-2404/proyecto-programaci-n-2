import { useState, useEffect } from "react";

/**
 * useEventCountdown — Cuenta regresiva en vivo hacia una fecha objetivo.
 *
 * Retorna { days, hours, minutes, seconds, isExpired }.
 * El intervalo se limpia en el cleanup del efecto para evitar memory leaks.
 *
 * @param {Date} targetDate — Fecha objetivo del evento
 * @returns {{ days: number, hours: number, minutes: number, seconds: number, isExpired: boolean }}
 */
export function useEventCountdown(targetDate) {
  const getTimeLeft = () => {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isExpired: false };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    // Si ya expiró no arrancamos el intervalo
    if (timeLeft.isExpired) return;

    const id = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(id); // cleanup obligatorio
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDate]);

  return timeLeft;
}
