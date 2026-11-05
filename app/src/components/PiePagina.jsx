import "./PiePagina.css";

export default function PiePagina() {
  return (
    <footer className="footer-principal">
      <section>
        <h2>Explora Araucanía</h2>
        <p>
          Descubre los secretos mejor guardados de La Araucanía.
          Bosques de araucarias, volcanes y lagos te esperan.
        </p>
      </section>

      <section>
        <h2>Contacto</h2>
        <address>
          <p>
            Correo:{" "}
            <a href="mailto:info@exploraaraucania.cl">
              info@exploraaraucania.cl
            </a>
          </p>
          <p>
            Teléfono:{" "}
            <a href="tel:+56925456799">+56 9 2545 6799</a>
          </p>
        </address>
      </section>

      <p>© 2026 Explora Araucanía. Todos los derechos reservados.</p>
    </footer>
  );
}
