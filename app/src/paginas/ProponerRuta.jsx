import { Link } from "react-router";
import BuscadorUbicacion from "../components/BuscadorUbicacion.jsx";
import Sugerencias from "../components/Sugerencias.jsx";

export default function ProponerRuta() {
  return (
    <>
      <h1>Proponer ruta</h1>
      <BuscadorUbicacion />
      <Sugerencias soloNuevas permitirCrear />
      <Link to="/rutas">Volver al catálogo</Link>
    </>
  );
}
