/**
 * MenuEmptyState — Estado vacio cuando una categoria no tiene productos.
 * Responsabilidad: feedback visual cuando no hay items para mostrar.
 * Disenado para ser escalable: cuando se integre filtrado/busqueda
 * este componente ya esta preparado para el estado "sin resultados".
 */
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
