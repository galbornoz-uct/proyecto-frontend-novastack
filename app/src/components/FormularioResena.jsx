import { useState } from "react";
import { API_URL } from "../api.js";

function fechaDeHoy() {
  const hoy = new Date();
  const anio = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const dia = String(hoy.getDate()).padStart(2, "0");
  return `${anio}-${mes}-${dia}`;
}

function FormularioResena({ rutaId, onCreada }) {
  const [autor, setAutor] = useState("");
  const [nota, setNota] = useState("");
  const [comentario, setComentario] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const [enviando, setEnviando] = useState(false);

  function validar() {
    const idRuta = Number(rutaId);
    const notaNumero = Number(nota);

    if (!Number.isInteger(idRuta) || idRuta <= 0) {
      return "La ruta no es válida.";
    }
    if (autor.trim() === "") {
      return "El autor es obligatorio.";
    }
    if (nota === "" || !Number.isInteger(notaNumero) || notaNumero < 1 || notaNumero > 5) {
      return "La nota debe ser un número entero entre 1 y 5.";
    }
    if (comentario.trim() === "") {
      return "El comentario es obligatorio.";
    }
    return null;
  }

  async function enviar(event) {
    event.preventDefault();
    setMensaje(null);

    const error = validar();
    if (error) {
      setMensaje({ tipo: "error", texto: error });
      return;
    }

    const nuevaResena = {
      rutaId: Number(rutaId),
      autor: autor.trim(),
      nota: Number(nota),
      comentario: comentario.trim(),
      fecha: fechaDeHoy(),
    };

    setEnviando(true);
    try {
      const respuesta = await fetch(`${API_URL}/resenas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaResena),
      });

      if (respuesta.status !== 201) {
        throw new Error(`Estado inesperado: ${respuesta.status}`);
      }

      const creada = await respuesta.json();

      if (typeof onCreada === "function") {
        onCreada(creada);
      }

      setAutor("");
      setNota("");
      setComentario("");
      setMensaje({ tipo: "exito", texto: "¡Reseña publicada con éxito!" });
    } catch (e) {
      setMensaje({
        tipo: "error",
        texto: "No se pudo publicar la reseña. ¿Está corriendo la API?",
      });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form className="formulario" onSubmit={enviar} noValidate>
      <label htmlFor="resena-autor">Autor</label>
      <input
        id="resena-autor"
        type="text"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
      />

      <label htmlFor="resena-nota">Nota (1 a 5)</label>
      <input
        id="resena-nota"
        type="number"
        min="1"
        max="5"
        step="1"
        value={nota}
        onChange={(e) => setNota(e.target.value)}
      />

      <label htmlFor="resena-comentario">Comentario</label>
      <textarea
        id="resena-comentario"
        rows="4"
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
      />

      <button className="boton" type="submit" disabled={enviando}>
        {enviando ? "Publicando..." : "Publicar reseña"}
      </button>

      {mensaje && (
        <p
          className="mensaje"
          role={mensaje.tipo === "error" ? "alert" : "status"}
        >
          {mensaje.texto}
        </p>
      )}
    </form>
  );
}

export default FormularioResena;
