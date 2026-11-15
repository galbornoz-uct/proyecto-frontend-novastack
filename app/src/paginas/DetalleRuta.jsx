import { useParams, Link } from "react-router";
import { rutas } from "../datos/rutas.js";
import "./DetalleRuta.css";

export default function DetalleRuta() {
  const { id } = useParams();

  const ruta = rutas.find((r) => r.id === Number(id));

  if (!ruta) {
    return (
      <section className="detalle-ruta">
        <h1>Ruta no encontrada</h1>
        <p>No existe una ruta con el número solicitado.</p>
        <Link to="/rutas">Volver al catálogo</Link>
      </section>
    );
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

      <Link to="/rutas">Volver al catálogo</Link>
    </section>
  );
}
