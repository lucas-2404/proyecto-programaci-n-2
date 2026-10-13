import Menu from "../components/menu/Menu";
import MenuError from "../components/menu/MenuError";
import MenuSkeleton from "../components/menu/MenuSkeleton";
import Seo from "../components/seo/Seo";
import { useMenuCategories } from "../hooks/useMenuCategories";

// Página /menu (la carta). Los datos llegan de la API (json-server) a través del hook
export default function MenuPage() {
  const { categories, isLoading, error, retry } = useMenuCategories();

  return (
    <>
      <Seo
        title="Carta"
        description="Nuestra carta: cócteles de autor, cervezas artesanales, picadas para compartir, shots y opciones sin alcohol. Precios en pesos argentinos."
      />
      {/* Un estado por vez: cargando, error o la carta lista */}
      {isLoading && <MenuSkeleton />}
      {error && <MenuError message={error} onRetry={retry} />}
      {!isLoading && !error && <Menu categories={categories} />}
    </>
  );
}
