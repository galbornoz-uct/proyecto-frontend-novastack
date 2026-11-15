import { Link } from "react-router";
import "./TarjetaRuta.css";

export default function TarjetaRuta({
  id,
  nombre,
  descripcion,
  ubicacion,
  distanciaKm,
  duracionMin,
  dificultad,
}) {
  return (
    <article className="tarjeta-ruta">
      <h3>{nombre}</h3>
      <p>{descripcion}</p>
      <p>Ubicación: {ubicacion}</p>
      <p>Distancia: {distanciaKm} km</p>
      <p>Duración: {duracionMin} minutos</p>
      <p>Dificultad: {dificultad}</p>

      <Link to={`/rutas/${id}`}>Ver ruta</Link>
    </article>
  );
}
