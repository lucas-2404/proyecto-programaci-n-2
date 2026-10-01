// Mensaje cuando una categoría no tiene productos
export default function MenuEmptyState() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="
        flex flex-col items-center justify-center
        py-20 text-center
        glass border border-brand-border rounded-2xl
      "
    >
      <span className="text-5xl mb-4" aria-hidden="true">🍽️</span>
      <p className="text-brand-heading font-semibold text-lg mb-1">
        Sin productos disponibles
      </p>
      <p className="text-brand-subtle text-sm">
        Esta categoria esta temporalmente vacia. Volvé pronto.
      </p>
    </div>
  );
}
