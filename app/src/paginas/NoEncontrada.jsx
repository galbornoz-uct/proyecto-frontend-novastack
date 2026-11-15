import { Link } from "react-router";

// Estilos en línea para no crear archivos fuera del encargo.
// Reutilizan la paleta de EcoRuta (verde oscuro, turquesa, dorado y crema).
const estilos = {
  seccion: {
    boxSizing: "border-box",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "clamp(32px, 8vw, 80px) clamp(16px, 4vw, 32px)",
    background: "#f2f8f4",
    color: "#153d30",
  },
  tarjeta: {
    boxSizing: "border-box",
    width: "100%",
    maxWidth: "560px",
    padding: "clamp(24px, 5vw, 40px)",
    border: "1px solid #ceded2",
    borderTop: "4px solid #f2be62",
    borderRadius: "16px",
    background: "#fff9ef",
  },
  codigo: {
    margin: 0,
    color: "#087f83",
    fontWeight: 700,
    letterSpacing: "0.1em",
  },
  titulo: {
    margin: "8px 0 12px",
    color: "#153d30",
    fontFamily: 'Georgia, "Times New Roman", serif',
    fontSize: "clamp(28px, 5vw, 40px)",
    lineHeight: 1.15,
    letterSpacing: "normal",
  },
  texto: {
    margin: "0 0 24px",
    color: "#355449",
  },
  enlace: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "44px",
    padding: "8px 20px",
    borderRadius: "8px",
    background: "#153d30",
    color: "#fff",
    fontWeight: 600,
    textDecoration: "none",
  },
};

export default function NoEncontrada() {
  return (
    <section style={estilos.seccion} aria-labelledby="titulo-no-encontrada">
      <div style={estilos.tarjeta}>
        <p style={estilos.codigo}>Error 404</p>
        <h1 id="titulo-no-encontrada" style={estilos.titulo}>
          Esta página no existe
        </h1>
        <p style={estilos.texto}>
          La dirección que abriste no corresponde a ninguna vista de EcoRuta.
          Puede que el enlace esté mal escrito o que la página ya no esté
          disponible.
        </p>
        <Link to="/" style={estilos.enlace}>
          Volver al Inicio
        </Link>
      </div>
    </section>
  );
}
