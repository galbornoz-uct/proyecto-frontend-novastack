
import "./TarjetaEventos.css";

export default function TarjetaEventos({ titulo, eventos = [] }) {
  const listaEventos = Array.isArray(eventos) ? eventos : [];

  return (
    <article className="tarjeta-eventos" aria-label={titulo}>
      <h2>{titulo}</h2>

      {listaEventos.length > 0 ? (
        <ul className="tarjeta-eventos__lista">
          {listaEventos.map((evento) => (
            <li key={evento.id}>
              <h3>{evento.nombre}</h3>

              {evento.informacion && (
                <p>
                  {evento.enlace ? (
                    <a href={evento.enlace}>
                      {evento.informacion}
                    </a>
                  ) : (
                    evento.informacion
                  )}
                </p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="tarjeta-eventos__vacio">
          No hay eventos disponibles.
        </p>
      )}

      <a
        className="tarjeta-eventos__ver-todos"
        href="https://galbornoz-uct.github.io/proyecto-frontend-novastack/pages/eventos.html"
      >
        Ver todos los eventos
      </a>
    </article>
  );
}
