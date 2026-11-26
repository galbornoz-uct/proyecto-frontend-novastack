import { useId, useState } from "react";
import "./BuscadorUbicacion.css";

const servicio = import.meta.env.VITE_NOMINATIM_PROXY_URL ||
  (import.meta.env.DEV ? "http://127.0.0.1:3101/buscar-ubicacion" : "");

export default function BuscadorUbicacion() {
  const id = useId();
  const [consulta, setConsulta] = useState("");
  const [resultado, setResultado] = useState(null);
  const [estado, setEstado] = useState("");
  const [error, setError] = useState("");
  const [invalido, setInvalido] = useState(false);
  const [cargando, setCargando] = useState(false);

  async function buscar(event) {
    event.preventDefault();
    if (cargando) return;
    setResultado(null);
    setEstado("");
    setError("");

    const lugar = consulta.trim();
    if (!lugar) {
      setInvalido(true);
      setError("Escribe un lugar o una dirección pública para buscar.");
      return;
    }
    if (!servicio) {
      setError("El buscador de ubicaciones no está disponible en este sitio.");
      return;
    }

    setCargando(true);
    setEstado("Buscando ubicación…");

    try {
      const respuesta = await fetch(new URL(servicio, window.location.origin), {
        method: "POST",
        body: new URLSearchParams({ q: lugar }),
        signal: AbortSignal.timeout(15000),
      });

      if (respuesta.status === 429) {
        setEstado("Espera unos segundos y vuelve a buscar.");
        return;
      }
      if (!respuesta.ok) throw new Error("Error de búsqueda");

      const lugarEncontrado = await respuesta.json();
      if (lugarEncontrado === null) {
        setEstado("No se encontraron ubicaciones en Chile para esa búsqueda.");
      } else if (
        !lugarEncontrado?.nombre ||
        !Number.isFinite(lugarEncontrado.latitud) ||
        !Number.isFinite(lugarEncontrado.longitud)
      ) {
        throw new Error("Respuesta inválida");
      } else {
        setResultado(lugarEncontrado);
        setEstado("");
      }
    } catch {
      setEstado("");
      setError("No se pudo consultar OpenStreetMap. Intenta nuevamente más tarde.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <section className="buscador-ubicacion" aria-labelledby={`${id}-titulo`}>
      <h2 id={`${id}-titulo`}>Ubicación de la ruta</h2>
      <form className="formulario buscador-ubicacion__formulario" onSubmit={buscar} noValidate>
        <label htmlFor={`${id}-consulta`}>Lugar o dirección pública en Chile</label>
        <p id={`${id}-ayuda`}>Por ejemplo, Temuco o Pucón. Evita ingresar domicilios particulares o datos personales.</p>
        <input
          id={`${id}-consulta`}
          type="search"
          value={consulta}
          onChange={(event) => {
            setConsulta(event.target.value);
            if (invalido) setError("");
            setInvalido(false);
          }}
          aria-describedby={invalido ? `${id}-ayuda ${id}-error` : `${id}-ayuda`}
          aria-invalid={invalido}
          autoComplete="off"
          maxLength={160}
          readOnly={cargando}
          required
        />
        <button className="boton" type="submit" disabled={cargando}>Buscar ubicación</button>
      </form>
      <div role="status" aria-atomic="true">
        {estado && <p className="buscador-ubicacion__respuesta">{estado}</p>}
        {resultado && (
          <dl className="buscador-ubicacion__respuesta">
            <dt>Lugar</dt>
            <dd>{resultado.nombre}</dd>
            <dt>Latitud</dt>
            <dd>{resultado.latitud}</dd>
            <dt>Longitud</dt>
            <dd>{resultado.longitud}</dd>
          </dl>
        )}
      </div>
      <p id={`${id}-error`} role="alert" className={error ? "estado error buscador-ubicacion__respuesta" : undefined}>{error}</p>
      <p className="buscador-ubicacion__fuente">
        Datos de <a href="https://www.openstreetmap.org/copyright">© colaboradores de OpenStreetMap</a>.
      </p>
    </section>
  );
}
