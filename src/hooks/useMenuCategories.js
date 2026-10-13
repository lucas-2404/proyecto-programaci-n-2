import { useEffect, useState } from "react";
import { getMenuCategories } from "../services/menuService";

// Trae la carta desde la API y expone los tres estados posibles de la petición:
// cargando, error o datos listos. `retry` vuelve a intentarlo.
export function useMenuCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0); // cambia en cada reintento y vuelve a correr el efecto

  useEffect(() => {
    // Si el componente se desmonta antes de que llegue la respuesta, la ignoramos
    let ignore = false;

    async function loadMenu() {
      try {
        const data = await getMenuCategories();
        if (!ignore) setCategories(data);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadMenu();
    return () => {
      ignore = true;
    };
  }, [attempt]);

  function retry() {
    setError(null);
    setIsLoading(true);
    setAttempt((n) => n + 1);
  }

  return { categories, isLoading, error, retry };
}
