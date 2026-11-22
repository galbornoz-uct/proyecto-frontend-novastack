import { useEffect, useId, useState } from "react";
import { Link } from "react-router";
import { API_URL } from "../api.js";
import FormularioSugerencia from "./FormularioSugerencia.jsx";
import "./Sugerencias.css";

export default function Sugerencias({ rutaId, soloNuevas = false, permitirCrear = false }) {
  const [sugerencias, setSugerencias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [tipo, setTipo] = useState("todos");
  const id = useId();

  useEffect(() => {
    const controlador = new AbortController();
    async function cargar() {
      setCargando(true);
      setError("");
      try {
        const filtro = rutaId != null
          ? `?rutaId=${encodeURIComponent(rutaId)}`
          : soloNuevas ? "?tipo=nueva_ruta" : "";
        const respuesta = await fetch(`${API_URL}/sugerencias${filtro}`, {
          signal: controlador.signal,
        });
        if (!respuesta.ok) throw new Error(`Error HTTP ${respuesta.status}`);
        const datos = await respuesta.json();
        if (!Array.isArray(datos)) throw new Error("Respuesta inválida");
        setSugerencias(datos);
      } catch (errorCarga) {
        if (errorCarga.name !== "AbortError") {
          setSugerencias([]);
          setError("No se pudieron cargar las sugerencias. Intenta nuevamente.");
        }
      } finally {
        if (!controlador.signal.aborted) setCargando(false);
      }
    }
    cargar();
    return () => controlador.abort();
  }, [rutaId, soloNuevas]);

  const visibles = tipo === "todos"
    ? sugerencias
    : sugerencias.filter((sugerencia) => sugerencia.tipo === tipo);

  return (
    <section className="sugerencias" aria-labelledby={`${id}-titulo`}>
      <h2 id={`${id}-titulo`}>
        {rutaId != null ? "Mejoras para esta ruta" : "Sugerencias de la comunidad"}
      </h2>
      {rutaId == null && !soloNuevas && (
        <div className="sugerencias__filtro">
          <label htmlFor={`${id}-tipo`}>Filtrar por tipo</label>
          <select id={`${id}-tipo`} value={tipo} onChange={(event) => setTipo(event.target.value)}>
            <option value="todos">Todos</option>
            <option value="mejora">Mejoras</option>
            <option value="nueva_ruta">Nuevas rutas</option>
          </select>
        </div>
      )}
      {cargando && <p role="status">Cargando sugerencias...</p>}
      {error && <p className="estado error" role="alert">{error}</p>}
      {!cargando && !error && (
        <>
          <p role="status">Sugerencias disponibles: {visibles.length}</p>
          {visibles.length === 0 ? (
            <p>No hay sugerencias para esta selección.</p>
          ) : (
            <ul className="sugerencias__lista">
              {visibles.map((sugerencia) => (
                <li key={sugerencia.id}>
                  <strong>{sugerencia.autor}</strong>
                  <p>{sugerencia.tipo === "mejora" ? "Mejora" : "Nueva ruta"}</p>
                  <p>{sugerencia.descripcion}</p>
                  {rutaId == null && sugerencia.rutaId != null && (
                    <Link to={`/rutas/${sugerencia.rutaId}`}>Ver ruta</Link>
                  )}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
      {permitirCrear ? (
        <FormularioSugerencia
          key={rutaId ?? "nueva"}
          rutaId={rutaId}
          onCreada={(creada) => setSugerencias((actuales) => [...actuales, creada])}
        />
      ) : (
        <Link to="/proponer-ruta">Proponer una nueva ruta</Link>
      )}
    </section>
  );
}
