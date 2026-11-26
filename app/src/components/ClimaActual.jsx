import { useEffect, useState } from "react";
import "./ClimaActual.css";

// Coordenadas del Cerro Ñielol, también utilizadas en pages/lugares.html.
const URL_CLIMA = "https://api.open-meteo.com/v1/forecast"
  + "?latitude=-38.71708&longitude=-72.58328"
  + "&current=temperature_2m,wind_speed_10m,weather_code"
  + "&wind_speed_unit=kmh&timezone=America/Santiago";

function describirCielo(codigo) {
  if (codigo === 0) return "Despejado";
  if (codigo >= 1 && codigo <= 3) return "Parcialmente nublado o nublado";
  if (codigo === 45 || codigo === 48) return "Niebla";
  if (codigo >= 51 && codigo <= 57) return "Llovizna";
  if (codigo >= 61 && codigo <= 67) return "Lluvia";
  if (codigo >= 71 && codigo <= 77) return "Nieve";
  if (codigo >= 80 && codigo <= 82) return "Chubascos";
  if (codigo === 85 || codigo === 86) return "Chubascos de nieve";
  if (codigo >= 95 && codigo <= 99) return "Tormenta";
  return "Condición no disponible";
}

export default function ClimaActual() {
  const [clima, setClima] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controlador = new AbortController();

    async function cargarClima() {
      try {
        const respuesta = await fetch(URL_CLIMA, { signal: controlador.signal });
        if (!respuesta.ok) throw new Error(`Open-Meteo respondió ${respuesta.status}`);
        const datos = await respuesta.json();
        const actual = datos.current;
        if (!actual || !Number.isFinite(actual.temperature_2m)
          || !Number.isFinite(actual.wind_speed_10m)
          || !Number.isInteger(actual.weather_code)) {
          throw new Error("Datos meteorológicos incompletos");
        }
        setClima(actual);
      } catch (errorCarga) {
        if (errorCarga.name !== "AbortError") {
          setError("No pudimos cargar el clima. Revisa tu conexión.");
        }
      } finally {
        if (!controlador.signal.aborted) setCargando(false);
      }
    }

    cargarClima();
    return () => controlador.abort();
  }, []);

  return (
    <section className="clima-actual" aria-labelledby="titulo-clima-actual">
      <h2 id="titulo-clima-actual">Clima en Cerro Ñielol</h2>
      <p>Temuco, La Araucanía</p>
      {cargando && <p className="estado" role="status">Cargando clima…</p>}
      {error && <p className="estado error" role="alert">{error}</p>}
      {clima && (
        <>
          <p className="clima-actual__temperatura">{clima.temperature_2m} °C</p>
          <p>{describirCielo(clima.weather_code)}</p>
          <p>Viento: {clima.wind_speed_10m} km/h</p>
        </>
      )}
      <p className="clima-actual__fuente">
        Datos de <a href="https://open-meteo.com/">Open-Meteo</a>
      </p>
    </section>
  );
}
