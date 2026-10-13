import axios from "axios";

// Cliente HTTP de la app: todas las peticiones a la API salen de esta instancia.
// En desarrollo apunta al json-server (npm run server); en producción se cambia
// con la variable de entorno VITE_API_URL sin tocar el código.
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3001",
  timeout: 8000, // si la API no responde en 8 s, axios corta y lanza un error
});
