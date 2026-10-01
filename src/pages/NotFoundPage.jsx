import Seo from "../components/seo/Seo";

// Se muestra en cualquier URL que no coincide con una ruta (la ruta "*" de src/router/Rutas.jsx)
export default function NotFoundPage({ title }) {
  return (
    <>
      <Seo
        title={title}
        description="La página que buscás no existe o todavía está en desarrollo."
        noIndex
      />
      <section className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <p className="text-brand-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">
          Próximamente
        </p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-brand-heading mb-4">
          {title}
        </h1>
        <p className="text-brand-muted text-base max-w-sm">
          Esta sección está en desarrollo. Volvé pronto.
        </p>
      </section>
    </>
  );
}
