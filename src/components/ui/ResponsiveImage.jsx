import { unsplashSrcSet, unsplashUrl } from "../../utils/unsplash";

export default function ResponsiveImage({
  photoId,
  alt,
  width,
  height,
  sizes = "100vw",
  priority = false,
  className,
}) {
  return (
    <img
      src={unsplashUrl(photoId, 1080)}
      srcSet={unsplashSrcSet(photoId)}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={className}
    />
  );
}
