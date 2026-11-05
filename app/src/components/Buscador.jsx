import "./Buscador.css";

// Evita que la página se recargue: la búsqueda real se implementará más adelante.
function evitarEnvio(evento) {
  evento.preventDefault();
}

export default function Buscador({
  placeholder = "Busca destinos, eventos o servicios",
}) {
  return (
    <div className="buscador-contenedor">
      <form className="buscador" role="search" onSubmit={evitarEnvio}>
        <label className="buscador-etiqueta" htmlFor="destino">
          ¿Dónde quieres ir?
        </label>
        <input
          className="buscador-campo"
          type="search"
          id="destino"
          name="destino"
          placeholder={placeholder}
        />
        <button className="buscador-boton" type="submit">
          Buscar
        </button>
      </form>
    </div>
  );
}
