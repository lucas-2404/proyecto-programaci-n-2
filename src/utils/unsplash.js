const UNSPLASH_BASE = "https://images.unsplash.com/photo-";
const DEFAULT_WIDTHS = [480, 768, 1080, 1440, 1920];

/**
 * unsplashUrl — Builds an optimized WebP URL for an Unsplash photo.
 * @param {string} photoId  Unsplash photo id (the part after "photo-")
 * @param {number} width
 * @param {number} [quality=70]
 * @returns {string}
 */
export function unsplashUrl(photoId, width, quality = 70) {
  return `${UNSPLASH_BASE}${photoId}?w=${width}&q=${quality}&fm=webp&fit=crop`;
}

/**
 * unsplashSrcSet — Builds a responsive srcSet so the browser picks the
 * smallest image that fills the rendered slot.
 * @param {string} photoId
 * @param {number[]} [widths]
 * @returns {string}
 */
export function unsplashSrcSet(photoId, widths = DEFAULT_WIDTHS) {
  return widths.map((width) => `${unsplashUrl(photoId, width)} ${width}w`).join(", ");
}
