// Une nombres de clase, ignorando los valores vacíos
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Formats a Date object to a localized Spanish string
export function formatDate(date) {
  return new Intl.DateTimeFormat("es-AR", {
    day:   "2-digit",
    month: "long",
    year:  "numeric",
  }).format(date);
}
