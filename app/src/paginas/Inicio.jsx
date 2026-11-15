import { Link } from "react-router";
import BannerPrincipal from "../components/BannerPrincipal.jsx";
import ListaRutas from "../components/ListaRutas.jsx";

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

export default function Inicio() {
  return (
    <>
      <BannerPrincipal
        titulo="Explora La Araucanía"
        subtitulo="Descubre rutas y paisajes únicos del sur de Chile."
      />

      <ListaRutas
        rutas={rutas.slice(0, 3)}
        titulo="Rutas destacadas"
      />

      <Link to="/rutas" className="boton">
        Ver todas las rutas
      </Link>
    </>
  );
}