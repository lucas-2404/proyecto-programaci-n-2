import Menu from "../components/menu/Menu";

/**
 * MenuPage — Pagina de la carta del bar.
 * Actua como thin wrapper entre el router y el componente Menu.
 * Esta separacion permite reutilizar <Menu /> en otros contextos si fuera necesario.
 */
export default function MenuPage() {
  return <Menu />;
}
