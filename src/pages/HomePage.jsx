import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import Seo from "../components/seo/Seo";
// La página importa los datos y se los pasa a cada sección por props.
import { TONIGHT } from "../data/homeData";
import { GALLERY, PILLARS, STATS, STORY, TAP_LIST } from "../data/aboutData";

// Página de inicio
export default function HomePage() {
  return (
    <>
      <Seo
        title="Inicio"
        description="Cervezas artesanales, coctelería de autor y música en vivo en el corazón de Tucumán. Reservá tu mesa en Los Amigos Bar & Coctelería."
      />
      <HeroSection tonight={TONIGHT} />
      <AboutSection
        story={STORY}
        stats={STATS}
        gallery={GALLERY}
        pillars={PILLARS}
        tapList={TAP_LIST}
      />
    </>
  );
}
