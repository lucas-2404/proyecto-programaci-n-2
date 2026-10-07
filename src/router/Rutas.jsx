import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import HomePage from "../pages/HomePage";
import MenuPage from "../pages/MenuPage";
import ContactPage from "../pages/ContactPage";
import NotFoundPage from "../pages/NotFoundPage";

// Lista de rutas de la app
const RUTAS = [
  { id: "inicio",   index: true,       element: <HomePage /> },
  { id: "carta",    path: "/menu",     element: <MenuPage /> },
  { id: "contacto", path: "/contacto", element: <ContactPage /> },
  { id: "404",      path: "*",         element: <NotFoundPage title="Página no encontrada" /> },
];

// Todas las rutas del sitio en un solo lugar
export default function Rutas() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* .map() convierte cada objeto de RUTAS en un <Route>.
            La key es el `id`, único para cada ruta. */}
        {RUTAS.map((ruta) => (
          <Route key={ruta.id} index={ruta.index} path={ruta.path} element={ruta.element} />
        ))}
      </Route>
    </Routes>
  );
}
