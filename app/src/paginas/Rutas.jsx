import { useState } from "react";
import { rutas } from "../datos/rutas.js";
import { Link } from "react-router";

const filtros = [
  { valor: "todas", etiqueta: "Todas" },
  { valor: "baja", etiqueta: "Baja" },
  { valor: "media", etiqueta: "Media" },
  { valor: "alta", etiqueta: "Alta" },
];

function TarjetaCatalogo({ ruta }) {
  return (
    <article className="catalogo-rutas__tarjeta">
      <span className="catalogo-rutas__dificultad">{ruta.dificultad}</span>
      <h2>{ruta.nombre}</h2>
      <p>{ruta.descripcion}</p>
      <dl className="catalogo-rutas__datos">
        <div>
          <dt>Ubicación</dt>
          <dd>{ruta.ubicacion}</dd>
        </div>
        <div>
          <dt>Distancia</dt>
          <dd>{ruta.distanciaKm} km</dd>
        </div>
        <div>
          <dt>Duración</dt>
          <dd>{ruta.duracionMin} min</dd>
        </div>
      </dl>
      <Link
        className="catalogo-rutas__enlace"
        to={`/rutas/${ruta.id}`}
        aria-label={`Ver ruta: ${ruta.nombre}`}
      >
        Ver ruta
      </Link>
    </article>
  );
}

export default function Rutas() {
  const [dificultad, setDificultad] = useState("todas");
  const visibles =
    dificultad === "todas"
      ? rutas
      : rutas.filter((ruta) => ruta.dificultad === dificultad);

  return (
    <section className="catalogo-rutas" aria-labelledby="titulo-catalogo-rutas">
      <h1 id="titulo-catalogo-rutas">Catálogo de rutas</h1>
      <p>Explora La Araucanía y elige un recorrido según su dificultad.</p>
      <p className="catalogo-rutas__nota">
        Rutas de ejemplo. Las distancias y duraciones son ilustrativas.
      </p>

      <div className="filtros" role="group" aria-label="Filtrar por dificultad">
        {filtros.map(({ valor, etiqueta }) => (
          <button
            key={valor}
            type="button"
            aria-pressed={dificultad === valor}
            onClick={() => setDificultad(valor)}
          >
            {etiqueta}
          </button>
        ))}
      </div>

      <p className="catalogo-rutas__estado" role="status">
        {visibles.length === 0
          ? "No hay rutas para esta dificultad."
          : `Rutas disponibles: ${visibles.length}`}
      </p>
      {visibles.length > 0 && (
        <ul className="catalogo-rutas__lista">
          {visibles.map((ruta) => (
            <li key={ruta.id}>
              <TarjetaCatalogo ruta={ruta} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
