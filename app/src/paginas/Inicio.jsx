import { useEffect, useState } from "react";
import { Link } from "react-router";
import { API_URL } from "../api.js";
import BannerPrincipal from "../components/BannerPrincipal.jsx";
import ListaRutas from "../components/ListaRutas.jsx";
import Sugerencias from "../components/Sugerencias.jsx";
import ClimaActual from "../components/ClimaActual.jsx";

export default function Inicio() {
  const [rutas, setRutas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controlador = new AbortController();

    async function cargarRutas() {
      setCargando(true);
      setError("");

      try {
        const respuesta = await fetch(`${API_URL}/rutas`, {
          signal: controlador.signal,
        });

        if (!respuesta.ok) {
          throw new Error(`Error HTTP ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        if (!Array.isArray(datos)) {
          throw new Error("La respuesta de la API no es válida.");
        }

        setRutas(datos);
      } catch (errorCarga) {
        if (errorCarga.name !== "AbortError") {
          setRutas([]);
          setError("No se pudieron cargar las rutas. Intenta nuevamente.");
        }
      } finally {
        if (!controlador.signal.aborted) {
          setCargando(false);
        }
      }
    }

    cargarRutas();

    return () => controlador.abort();
  }, []);

  return (
    <>
      <BannerPrincipal
        titulo="Explora La Araucanía"
        subtitulo="Descubre rutas y paisajes únicos del sur de Chile."
      />

      {cargando && (
        <p className="estado" role="status">
          Cargando rutas destacadas...
        </p>
      )}

      {error && (
        <p className="estado error" role="alert">
          {error}
        </p>
      )}

      {!cargando && !error && rutas.length === 0 && (
        <p className="estado" role="status">
          No hay rutas disponibles por el momento.
        </p>
      )}

      {!cargando && !error && rutas.length > 0 && (
        <ListaRutas
          rutas={rutas.slice(0, 3)}
          titulo="Rutas destacadas"
        />
      )}

      {!cargando && !error && rutas.length > 3 && (
        <ListaRutas
          rutas={rutas.slice(3)}
          titulo="Más rutas para descubrir"
        />
      )}

      <ClimaActual />

      <Link to="/rutas" className="boton">
        Ver todas las rutas
      </Link>
      <Sugerencias />
    </>
  );
}
