import { Link } from "react-router";
import Sugerencias from "../components/Sugerencias.jsx";

export default function ProponerRuta() {
  return (
    <>
      <h1>Proponer ruta</h1>
      <Sugerencias soloNuevas permitirCrear />
      <Link to="/rutas">Volver al catálogo</Link>
    </>
  );
}
