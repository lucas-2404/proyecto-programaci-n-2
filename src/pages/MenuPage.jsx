import Menu from "../components/menu/Menu";
import Seo from "../components/seo/Seo";
import { menuCategories } from "../data/menuData";

// Página /menu (la carta)
export default function MenuPage() {
  return (
    <>
      <Seo
        title="Carta"
        description="Nuestra carta: cócteles de autor, cervezas artesanales, picadas para compartir, shots y opciones sin alcohol. Precios en pesos argentinos."
      />
      <Menu categories={menuCategories} />
    </>
  );
}
