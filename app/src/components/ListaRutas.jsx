import TarjetaRuta from "./TarjetaRuta.jsx";
import "./ListaRutas.css";

export default function ListaRutas({ rutas, titulo = "Rutas destacadas" }) {
  return (
    <section className="lista-rutas">
      <h2>{titulo}</h2>

      <ul className="lista-rutas__lista">
        {rutas.map((ruta) => (
          <li key={ruta.id}>
            <TarjetaRuta
              id={ruta.id}
              nombre={ruta.nombre}
              descripcion={ruta.descripcion}
              ubicacion={ruta.ubicacion}
              distanciaKm={ruta.distanciaKm}
              duracionMin={ruta.duracionMin}
              dificultad={ruta.dificultad}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
