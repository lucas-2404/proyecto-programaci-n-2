// Título y meta etiquetas de cada página
const SITE_NAME = "Los Amigos Bar & Coctelería";

export default function Seo({ title, description, noIndex = false }) {
  const fullTitle = `${title} | ${SITE_NAME}`;

  return (
    <>
      {/* Lo que se ve en la pestaña del navegador y en el resultado de Google */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph: cómo se ve el link al compartirlo en WhatsApp o redes */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Pide a los buscadores que no indexen esta página */}
      {noIndex && <meta name="robots" content="noindex" />}
    </>
  );
}
