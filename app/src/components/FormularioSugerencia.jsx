import { useId, useState } from "react";
import { API_URL } from "../api.js";

export default function FormularioSugerencia({ rutaId, onCreada }) {
  const [autor, setAutor] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const id = useId();
  const esMejora = rutaId != null;

  async function enviar(event) {
    event.preventDefault();
    if (enviando) return;
    setMensaje(null);
    if (!autor.trim()) {
      setMensaje({ error: true, texto: "El autor es obligatorio." });
      return;
    }
    if (!descripcion.trim() || descripcion.length > 500) {
      setMensaje({ error: true, texto: "La descripción es obligatoria y admite hasta 500 caracteres." });
      return;
    }
    if (esMejora && (!Number.isInteger(Number(rutaId)) || Number(rutaId) <= 0)) {
      setMensaje({ error: true, texto: "La ruta no es válida." });
      return;
    }
    setEnviando(true);
    try {
      const respuesta = await fetch(`${API_URL}/sugerencias`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rutaId: esMejora ? Number(rutaId) : null,
          autor: autor.trim(),
          tipo: esMejora ? "mejora" : "nueva_ruta",
          descripcion: descripcion.trim(),
        }),
      });
      if (!respuesta.ok || respuesta.status !== 201) throw new Error(`Error HTTP ${respuesta.status}`);
      const creada = await respuesta.json();
      onCreada(creada);
      setAutor("");
      setDescripcion("");
      setMensaje({ error: false, texto: "¡Sugerencia publicada con éxito!" });
    } catch {
      setMensaje({ error: true, texto: "No se pudo publicar la sugerencia. Comprueba la conexión con la API." });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form className="formulario" onSubmit={enviar} noValidate aria-labelledby={`${id}-titulo`}>
      <h3 id={`${id}-titulo`}>{esMejora ? "Proponer una mejora" : "Proponer una nueva ruta"}</h3>
      <label htmlFor={`${id}-autor`}>Autor</label>
      <input id={`${id}-autor`} value={autor} onChange={(event) => setAutor(event.target.value)} required />
      <label htmlFor={`${id}-descripcion`}>Descripción</label>
      <p id={`${id}-ayuda`}>
        {esMejora
          ? "Indica el cambio concreto que propones para esta ruta."
          : "Incluye el nombre, sector y descripción del recorrido propuesto."}
        {" "}Máximo 500 caracteres.
      </p>
      <textarea
        id={`${id}-descripcion`}
        value={descripcion}
        onChange={(event) => setDescripcion(event.target.value)}
        aria-describedby={`${id}-ayuda`}
        rows="4"
        maxLength={500}
        required
      />
      <button className="boton" type="submit" disabled={enviando}>
        {enviando ? "Publicando..." : "Publicar sugerencia"}
      </button>
      {mensaje && <p className="mensaje" role={mensaje.error ? "alert" : "status"}>{mensaje.texto}</p>}
    </form>
  );
}
