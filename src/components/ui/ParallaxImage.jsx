import Parallax from "./Parallax";
import ResponsiveImage from "./ResponsiveImage";

/**
 * ParallaxImage — The photo drifts inside its frame while the frame scrolls
 * (the frame must be `relative overflow-hidden`). The image layer is 20% taller
 * than the frame and travels ±8% of its own height, so no edge ever shows.
 */
export default function ParallaxImage({ className, ...imageProps }) {
  return (
    <Parallax range={["-8%", "8%"]} className="absolute inset-x-0 -inset-y-[10%]">
      <ResponsiveImage {...imageProps} className={className} />
    </Parallax>
  );
}
