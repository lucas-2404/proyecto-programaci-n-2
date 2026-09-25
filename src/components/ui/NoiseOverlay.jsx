import { cn } from "../../utils/cn";

// El grano se calcula UNA vez en un tile de 160×160 y se repite.
//
// La versión anterior corría <feTurbulence> sobre todo el elemento
// (`inset-0 h-full w-full`), o sea varios miles de píxeles de alto en la
// sección About. El navegador rasteriza ese filtro en CPU y lo rehace en cada
// repintado, que era la causa principal de la traba al scrollear.
//
// El resultado es visualmente idéntico: el ruido fractal es estático y
// `stitchTiles="stitch"` hace que el tile calce sin costura.
const TILE = encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160">' +
    '<filter id="n">' +
      '<feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/>' +
    "</filter>" +
    '<rect width="160" height="160" filter="url(#n)"/>' +
    "</svg>"
);

const NOISE_TILE_URL = `url("data:image/svg+xml,${TILE}")`;

export default function NoiseOverlay({ className, opacity = 0.06 }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{ opacity, backgroundImage: NOISE_TILE_URL, backgroundRepeat: "repeat" }}
    />
  );
}
