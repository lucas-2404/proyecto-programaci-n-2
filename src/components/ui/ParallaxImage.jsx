import Parallax from "./Parallax";
import ResponsiveImage from "./ResponsiveImage";

// La foto se desplaza dentro de su marco (el marco debe ser `relative overflow-hidden`)
export default function ParallaxImage({ className, ...imageProps }) {
  return (
    <Parallax range={["-8%", "8%"]} className="absolute inset-x-0 -inset-y-[10%]">
      <ResponsiveImage {...imageProps} className={className} />
    </Parallax>
  );
}
