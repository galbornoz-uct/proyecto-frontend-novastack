import Buscador from "./Buscador.jsx";
import "./banner-mapa.css";

export default function BannerPrincipal({ titulo, subtitulo }) {
  const palabras = titulo.trim().split(/\s+/);
  const ultimaPalabra = palabras.pop();

  return (
    <div className="banner-principal">
      <h1>
        {palabras.join(" ")} <span>{ultimaPalabra}</span>
      </h1>

      <p className="banner-subtitulo">{subtitulo}</p>

      <Buscador
        placeholder="Busca destinos, eventos o servicios"
      />

      <img
        src="https://chile.travel/wp-content/uploads/2024/08/6bf4eec2-5-panoramas-imperdibles-de-la-region-de-la-araucania.jpg"
        alt="Paisaje natural de La Araucanía"
      />
    </div>
  );
}
