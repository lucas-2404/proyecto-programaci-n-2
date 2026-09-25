/**
 * cn — Utility to merge class names conditionally.
 * Lightweight alternative to clsx/classnames.
 *
 * @param {...(string|undefined|null|false)} classes
 * @returns {string}
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * formatDate — Formats a Date object to a localized Spanish string.
 * @param {Date} date
 * @returns {string}
 */
export function formatDate(date) {
  return new Intl.DateTimeFormat("es-AR", {
    day:   "2-digit",
    month: "long",
    year:  "numeric",
  }).format(date);
}
