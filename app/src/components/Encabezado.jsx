import { Link, NavLink } from "react-router";
import "./Encabezado.css";

// Vistas de la app React (contrato del Laboratorio 07).
// Se navegan con NavLink, sin recargar la página.
const enlaces = [
  { texto: "Inicio", ruta: "/" },
  { texto: "Rutas", ruta: "/rutas" },
  { texto: "Proponer ruta", ruta: "/proponer-ruta" },
];

// La app Vite vive en /app y no sirve las páginas HTML del repositorio.
// Estas páginas NO son rutas de React Router: se mantienen como enlaces
// HTML normales. En desarrollo local se abren las páginas publicadas y en
// GitHub Pages se usa la ruta absoluta del proyecto.
const SITIO_PUBLICADO = "https://galbornoz-uct.github.io";
const RUTA_PROYECTO = "/proyecto-frontend-novastack";

const paginasEstaticas = [
  { texto: "Lugares", pagina: "pages/lugares.html" },
  { texto: "Eventos", pagina: "pages/eventos.html" },
  { texto: "Servicios", pagina: "pages/servicios.html" },
];

function crearRutaEstatica(pagina) {
  const ruta = `${RUTA_PROYECTO}/${pagina}`;
  const enDesarrolloLocal =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1");

  return enDesarrolloLocal ? `${SITIO_PUBLICADO}${ruta}` : ruta;
}

// NavLink entrega { isActive }. Devolvemos "activo", la clase que ya
// estiliza Encabezado.css, solo cuando la ruta coincide con la URL actual.
const claseActiva = ({ isActive }) => (isActive ? "activo" : undefined);

export default function Encabezado() {
  return (
    <header className="navegacion-principal">
      <Link className="logo" to="/" aria-label="EcoRuta - Ir al inicio">
        EcoRuta
      </Link>

      <nav id="menu-principal" aria-label="Navegación principal">
        <ul>
          {enlaces.map(({ texto, ruta }) => (
            <li key={ruta}>
              {/* "end" en Inicio: "/" no debe quedar activo en /rutas */}
              <NavLink to={ruta} end={ruta === "/"} className={claseActiva}>
                {texto}
              </NavLink>
            </li>
          ))}

          {paginasEstaticas.map(({ texto, pagina }) => (
            <li key={pagina}>
              <a href={crearRutaEstatica(pagina)}>{texto}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
