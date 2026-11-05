import "./Encabezado.css";

// Convierte el texto de un enlace en una ruta: "Inicio" -> "/", "Lugares" -> "#lugares".
function crearRuta(texto) {
  if (texto === "Inicio") return "/";

  const identificador = texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");

  return `#${identificador}`;
}

export default function Encabezado({ enlaces = [], paginaActual = "" }) {
  return (
    <header className="navegacion-principal">
      <a className="logo" href="/" aria-label="EcoRuta - Ir al inicio">
        EcoRuta
      </a>

      <nav id="menu-principal" aria-label="Navegación principal">
        <ul>
          {enlaces.map((enlace) => {
            const esActual = enlace === paginaActual;

            return (
              <li key={enlace}>
                <a
                  href={crearRuta(enlace)}
                  className={esActual ? "activo" : undefined}
                  aria-current={esActual ? "page" : undefined}
                >
                  {enlace}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
