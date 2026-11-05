import "./BloqueInformativo.css";

// Contenido recuperado de las dos secciones del index.html original.
// App.jsx actualmente pasa los nombres de las secciones como cadenas.
const seccionesOriginales = {
  "Explorar La Araucanía": {
    etiquetaNavegacion: "Explorar La Araucanía",
    claseLista: "explorar-grid",
    enlaces: [
      {
        href: "pages/explorar.html#destinos",
        nombre: "Destinos populares",
        descripcion: "Lugares para visitar",
      },
      {
        href: "pages/explorar.html#actividades",
        nombre: "Rutas y senderos",
        descripcion: "Recorridos y naturaleza",
      },
      {
        href: "pages/emprendimientos.html",
        nombre: "Emprendimientos locales",
        descripcion: "Productos y negocios de la región",
      },
    ],
  },
  "Servicios para tu viaje": {
    etiquetaNavegacion: "Servicios turísticos",
    claseLista: "servicios-grid",
    enlaces: [
      { href: "pages/servicios.html#alojamiento", nombre: "Alojamiento" },
      { href: "pages/servicios.html#transporte", nombre: "Transporte" },
      { href: "pages/gastronomia.html", nombre: "Dónde comer" },
    ],
  },
};

// La app Vite vive en /app y no sirve las páginas HTML del repositorio.
// En desarrollo abrimos las páginas publicadas; en el sitio final usamos
// una ruta absoluta para impedir /pages/pages/ al navegar entre secciones.
function resolverHref(href) {
  if (!href.startsWith("pages/")) return href;

  const ruta = `/proyecto-frontend-novastack/${href}`;
  const enDesarrolloLocal = typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1");

  return enDesarrolloLocal
    ? `https://galbornoz-uct.github.io${ruta}`
    : ruta;
}

export default function BloqueInformativo({ titulo, secciones = [] }) {
  return (
    <aside className="bloque-informativo" aria-label={titulo}>
      {secciones.map((seccion, indice) => {
        // Acepta las cadenas que ya envía App.jsx y, en el futuro,
        // objetos con sus propios enlaces sin cambiar la interfaz de props.
        const esTexto = typeof seccion === "string";
        const nombre = esTexto ? seccion : seccion.titulo;
        const original = seccionesOriginales[nombre];
        const enlaces = esTexto
          ? (original?.enlaces ?? [])
          : (seccion.enlaces ?? original?.enlaces ?? []);
        const etiquetaNavegacion = esTexto
          ? (original?.etiquetaNavegacion ?? nombre)
          : (seccion.etiquetaNavegacion ?? original?.etiquetaNavegacion ?? nombre);
        const claseLista = esTexto
          ? (original?.claseLista ?? "")
          : (seccion.claseLista ?? original?.claseLista ?? "");

        return (
          <section key={esTexto ? nombre : (seccion.id ?? nombre)}>
            <h2>{indice === 0 ? titulo : nombre}</h2>
            {enlaces.length > 0 && (
              <nav aria-label={etiquetaNavegacion}>
                <ul className={claseLista}>
                  {enlaces.map((enlace) => (
                    <li key={enlace.href}>
                      <a href={resolverHref(enlace.href)}>
                        {enlace.descripcion ? (
                          <span>
                            <strong>{enlace.nombre}</strong>
                            <small>{enlace.descripcion}</small>
                          </span>
                        ) : (
                          <strong>{enlace.nombre}</strong>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </section>
        );
      })}
    </aside>
  );
}
