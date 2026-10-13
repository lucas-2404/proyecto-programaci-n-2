import { api } from "./api";

// Pide la carta completa (categorías con sus productos) al json-server.
// Devuelve el array de categorías o lanza un error con un mensaje para mostrar en pantalla.
export async function getMenuCategories() {
  try {
    const response = await api.get("/menuCategories");
    return response.data;
  } catch (error) {
    // El detalle técnico queda en la consola; a la UI le llega un mensaje entendible
    console.error("Error al cargar la carta:", error.message);
    throw new Error("No pudimos cargar la carta. Revisá tu conexión y probá de nuevo.", {
      cause: error, // guarda el error original de axios por si hay que depurarlo
    });
  }
}
