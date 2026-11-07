import "./Encabezado.css";

// La app Vite vive en /app y no sirve las páginas HTML del repositorio.
// Igual que en BloqueInformativo: en desarrollo local se abren las páginas
// publicadas y en GitHub Pages se usa la ruta absoluta del proyecto.
const SITIO_PUBLICADO = "https://galbornoz-uct.github.io";
const RUTA_PROYECTO = "/proyecto-frontend-novastack";

// Páginas reales del proyecto original (carpeta pages/).
const PAGINAS = {
  Lugares: "pages/lugares.html",
  Eventos: "pages/eventos.html",
  Servicios: "pages/servicios.html",
};

// "./" abre el inicio de la propia app, tanto en local como publicada.
const RUTA_INICIO = "./";

function crearRuta(texto) {
  const pagina = PAGINAS[texto];
  if (!pagina) return RUTA_INICIO;

  const ruta = `${RUTA_PROYECTO}/${pagina}`;
  const enDesarrolloLocal =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1");

  return enDesarrolloLocal ? `${SITIO_PUBLICADO}${ruta}` : ruta;
}

export default function Encabezado({ enlaces = [], paginaActual = "" }) {
  return (
    <header className="navegacion-principal">
      <a className="logo" href={RUTA_INICIO} aria-label="EcoRuta - Ir al inicio">
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