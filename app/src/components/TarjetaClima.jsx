
import "./TarjetaClima.css";

export default function TarjetaClima({
  titulo,
  ciudad,
  temperatura = null,
}) {
  const temperaturaDisponible =
    typeof temperatura === "number" &&
    Number.isFinite(temperatura);

  return (
    <article className="tarjeta-clima" aria-label={titulo}>
      <h2>{titulo}</h2>

      <label className="tarjeta-clima__ciudad">
        Ciudad
        <select value={ciudad} disabled>
          <option value={ciudad}>{ciudad}</option>
        </select>
      </label>

      <p
        className={
          temperaturaDisponible
            ? "tarjeta-clima__temperatura"
            : "tarjeta-clima__temperatura tarjeta-clima__temperatura--pendiente"
        }
        role="status"
      >
        {temperaturaDisponible
          ? `${temperatura} °C`
          : "Temperatura pendiente"}
      </p>

      <p className="tarjeta-clima__condiciones">
        Condiciones meteorológicas no disponibles.
      </p>

      <ul className="tarjeta-clima__detalles">
        <li>Humedad: pendiente</li>
        <li>Viento: pendiente</li>
        <li>Sensación térmica: pendiente</li>
      </ul>

      <h3>Pronóstico</h3>

      <ul className="tarjeta-clima__pronostico">
        <li>Hoy: información pendiente</li>
        <li>Mañana: información pendiente</li>
        <li>Próximos días: información pendiente</li>
      </ul>

      <a
        className="tarjeta-clima__ver-mas"
        href="https://galbornoz-uct.github.io/proyecto-frontend-novastack/pages/clima.html"
      >
        Ver más
      </a>
    </article>
  );
}
