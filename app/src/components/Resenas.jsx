import { useEffect, useState } from "react";
import { API_URL } from "../api.js";
import FormularioResena from "./FormularioResena.jsx";

export default function Resenas({ rutaId }) {
  const [resenas, setResenas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [eliminandoId, setEliminandoId] = useState(null);

  useEffect(() => {
    const controlador = new AbortController();

    async function cargarResenas() {
      setCargando(true);
      setError("");

      try {
        const respuesta = await fetch(
          `${API_URL}/resenas?rutaId=${rutaId}`,
          { signal: controlador.signal },
        );

        if (!respuesta.ok) {
          throw new Error(`No se pudieron cargar las reseñas (${respuesta.status}).`);
        }

        const datos = await respuesta.json();
        setResenas(datos);
      } catch (errorCarga) {
        if (errorCarga.name !== "AbortError") {
          setError("No se pudieron cargar las reseñas. Intenta nuevamente.");
          setResenas([]);
        }
      } finally {
        if (!controlador.signal.aborted) {
          setCargando(false);
        }
      }
    }

    cargarResenas();

    return () => controlador.abort();
  }, [rutaId]);

  async function eliminar(resena) {
    setError("");
    setEliminandoId(resena.id);

    try {
      const respuesta = await fetch(`${API_URL}/resenas/${resena.id}`, {
        method: "DELETE",
      });

      if (!respuesta.ok) {
        throw new Error(`No se pudo eliminar la reseña (${respuesta.status}).`);
      }

      setResenas((actuales) =>
        actuales.filter((actual) => actual.id !== resena.id),
      );
    } catch {
      setError("No se pudo eliminar la reseña. Intenta nuevamente.");
    } finally {
      setEliminandoId(null);
    }
  }

  function agregar(nuevaResena) {
    setResenas((actuales) => [...actuales, nuevaResena]);
  }

  if (cargando) {
    return (
      <section className="resenas" aria-labelledby="resenas-titulo">
        <h3 id="resenas-titulo">Reseñas</h3>
        <p className="estado" role="status">
          Cargando reseñas…
        </p>
      </section>
    );
  }

  return (
    <section className="resenas" aria-labelledby="resenas-titulo">
      <h3 id="resenas-titulo">Reseñas</h3>

      {error && (
        <p className="estado error" role="alert">
          {error}
        </p>
      )}

      {!error && resenas.length === 0 && (
        <p className="estado">Esta ruta todavía no tiene reseñas.</p>
      )}

      {resenas.length > 0 && (
        <ul>
          {resenas.map((resena) => (
            <li className="resena" key={resena.id}>
              <p>
                <strong>{resena.autor}</strong>
              </p>
              <p aria-label={`Calificación: ${resena.nota} de 5`}>
                <span aria-hidden="true">
                  {"★".repeat(resena.nota)}
                  {"☆".repeat(5 - resena.nota)}
                </span>{" "}
                {resena.nota}/5
              </p>
              <p>{resena.comentario}</p>
              <time dateTime={resena.fecha}>{resena.fecha}</time>
              <br />
              <button
                className="borrar"
                type="button"
                aria-label={`Borrar la reseña de ${resena.autor}`}
                disabled={eliminandoId === resena.id}
                onClick={() => eliminar(resena)}
              >
                {eliminandoId === resena.id ? "Borrando…" : "Borrar"}
              </button>
            </li>
          ))}
        </ul>
      )}

      <FormularioResena rutaId={rutaId} onCreada={agregar} />
    </section>
  );
}
