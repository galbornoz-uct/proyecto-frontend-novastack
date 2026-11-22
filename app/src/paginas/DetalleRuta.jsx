import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { API_URL } from "../api.js";
import Resenas from "../components/Resenas.jsx";
import Sugerencias from "../components/Sugerencias.jsx";
import "./DetalleRuta.css";

export default function DetalleRuta() {
  const { id } = useParams();
  const [ruta, setRuta] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [noEncontrada, setNoEncontrada] = useState(false);

  useEffect(() => {
    const controlador = new AbortController();

    setRuta(null);
    setCargando(true);
    setError("");
    setNoEncontrada(false);

    async function obtenerRuta() {
      try {
        const respuesta = await fetch(`${API_URL}/rutas/${id}`, {
          signal: controlador.signal,
        });

        if (respuesta.status === 404) {
          setNoEncontrada(true);
          return;
        }

        if (!respuesta.ok) {
          throw new Error(`La API respondió con el estado ${respuesta.status}`);
        }

        const datos = await respuesta.json();
        setRuta(datos);
      } catch (errorSolicitud) {
        if (errorSolicitud.name !== "AbortError") {
          setError("No se pudo conectar con la API. Inténtalo nuevamente.");
        }
      } finally {
        if (!controlador.signal.aborted) {
          setCargando(false);
        }
      }
    }

    obtenerRuta();

    return () => controlador.abort();
  }, [id]);

  if (cargando) {
    return (
      <section className="detalle-ruta">
        <p>Cargando ruta...</p>
      </section>
    );
  }

  if (noEncontrada) {
    return (
      <section className="detalle-ruta">
        <h1>Ruta no encontrada</h1>
        <p>No existe una ruta con el número solicitado.</p>
        <Link to="/rutas">Volver al catálogo</Link>
      </section>
    );
  }

  if (error) {
    return (
      <section className="detalle-ruta">
        <h1>Error al cargar la ruta</h1>
        <p>{error}</p>
        <Link to="/rutas">Volver al catálogo</Link>
      </section>
    );
  }

  if (!ruta) {
    return null;
  }

  return (
    <section className="detalle-ruta">
      <h1>{ruta.nombre}</h1>
      <p className="detalle-ruta__descripcion">{ruta.descripcion}</p>

      <dl>
        <dt>Número de ruta</dt>
        <dd>{ruta.id}</dd>

        <dt>Ubicación</dt>
        <dd>{ruta.ubicacion}</dd>

        <dt>Distancia</dt>
        <dd>{ruta.distanciaKm} km</dd>

        <dt>Duración</dt>
        <dd>{ruta.duracionMin} minutos</dd>

        <dt>Dificultad</dt>
        <dd>{ruta.dificultad}</dd>
      </dl>

      <p className="detalle-ruta__nota">
        Datos ilustrativos para el laboratorio.
      </p>

      <Resenas rutaId={ruta.id} />
      <Sugerencias rutaId={ruta.id} permitirCrear />

      <Link to="/rutas">Volver al catálogo</Link>
    </section>
  );
}
