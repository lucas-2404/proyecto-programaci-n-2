import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";

/**
 * App — Root component. Sets up React Router with the master Layout
 * wrapping all page routes via nested routing (<Outlet />).
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout acts as the master shell for all routes */}
        <Route path="/" element={<Layout />}>
          {/* Index route → HomePage */}
          <Route index element={<HomePage />} />

          {/* Placeholder routes */}

          {/* Legal pages */}


          {/* 404 fallback */}
          <Route path="*" element={<PlaceholderPage title="Página no encontrada" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

/** Minimal placeholder so non-implemented routes do not crash. */
function PlaceholderPage({ title }) {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <p className="text-brand-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">
        Próximamente
      </p>
      <h1 className="font-heading text-4xl md:text-5xl font-bold text-brand-heading mb-4">
        {title}
      </h1>
      <p className="text-brand-muted text-base max-w-sm">
        Esta sección está en desarrollo. Volvé pronto.
      </p>
    </section>
  );
}
