import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";

/**
 * HomePage — Landing de "Los Amigos". Rendered inside <Layout />, which
 * already provides the Navbar and Footer.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
    </>
  );
}
