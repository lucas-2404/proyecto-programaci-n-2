const UNSPLASH_BASE = "https://images.unsplash.com/photo-";
const DEFAULT_WIDTHS = [480, 768, 1080, 1440, 1920];

// Builds an optimized WebP URL for an Unsplash photo
export function unsplashUrl(photoId, width, quality = 70) {
  return `${UNSPLASH_BASE}${photoId}?w=${width}&q=${quality}&fm=webp&fit=crop`;
}

// Builds a responsive srcSet so the browser picks the smallest image that fills the rendered slot
export function unsplashSrcSet(photoId, widths = DEFAULT_WIDTHS) {
  return widths.map((width) => `${unsplashUrl(photoId, width)} ${width}w`).join(", ");
}
