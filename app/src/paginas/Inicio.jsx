import { Link } from "react-router";
import { rutas } from "../datos/rutas.js";
import BannerPrincipal from "../components/BannerPrincipal.jsx";
import ListaRutas from "../components/ListaRutas.jsx";

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