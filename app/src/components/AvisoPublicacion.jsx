import { EN_PUBLICACION } from "../api.js";

export default function AvisoPublicacion() {
  if (!EN_PUBLICACION) return null;

  const buscadorConfigurado = Boolean(import.meta.env.VITE_NOMINATIM_PROXY_URL?.trim());

  return (
    <p className="aviso-publicacion" role="note">
      <strong>Estás viendo la versión publicada.</strong>{" "}
      El catálogo de rutas, las reseñas y las sugerencias funcionan en la versión
      local y se muestran en el Demo Day. El clima de Open-Meteo sí se consulta
      en vivo.{" "}
      {!buscadorConfigurado && "El buscador de ubicaciones todavía no está disponible en esta versión."}
    </p>
  );
}
