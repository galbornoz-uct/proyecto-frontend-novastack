import { useParams, Link } from "react-router";
import "./DetalleRuta.css";

const rutas = [
  {
    id: 1,
    nombre: "Senderismo en Cerro Ñielol",
    descripcion: "Recorrido por senderos del Cerro Ñielol.",
    ubicacion: "Cerro Ñielol, Temuco, La Araucanía",
    distanciaKm: 2.5,
    duracionMin: 60,
    dificultad: "baja",
  },
  {
    id: 2,
    nombre: "Caminata por Conguillío",
    descripcion: "Caminata entre bosques y paisajes volcánicos.",
    ubicacion: "Parque Nacional Conguillío, La Araucanía",
    distanciaKm: 5,
    duracionMin: 120,
    dificultad: "media",
  },
];

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
