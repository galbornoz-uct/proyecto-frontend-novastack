import "./BloqueInformativo.css";


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
                      <a href={enlace.href}>
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
