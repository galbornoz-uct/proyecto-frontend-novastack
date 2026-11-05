
import Encabezado from "./components/Encabezado.jsx";
import BannerPrincipal from "./components/BannerPrincipal.jsx";
import TarjetaEventos from "./components/TarjetaEventos.jsx";
import TarjetaClima from "./components/TarjetaClima.jsx";
import MapaAraucania from "./components/MapaAraucania.jsx";
import BloqueInformativo from "./components/BloqueInformativo.jsx";
import PiePagina from "./components/PiePagina.jsx";

import { eventos } from "./datos/eventos.js";

function App() {
  return (
    <>
      {/* Rodrigo: encabezado */}
      <Encabezado
        enlaces={["Inicio", "Lugares", "Eventos", "Servicios"]}
        paginaActual="Inicio"
      />

      <main>
        {/* Carlos: banner principal */}
        <section>
          <BannerPrincipal
            titulo="Explora La Araucanía"
            subtitulo="Descubre destinos y experiencias turísticas"
          />
        </section>

        {/* Sección central */}
        <section>
          {/* Matías: eventos */}
          <TarjetaEventos
            titulo="Próximos eventos"
            eventos={eventos}
          />

          {/* Carlos: mapa */}
          <MapaAraucania
            titulo="Mapa de La Araucanía"
            descripcion="Descubre lugares turísticos de la región"
          />

          {/* Matías: clima */}
          <TarjetaClima
            titulo="Clima detallado"
            ciudad="Temuco"
            temperatura={null}
          />
        </section>

        {/* Gonzalo: bloques informativos */}
        <BloqueInformativo
          titulo="Explorar La Araucanía"
          secciones={[
            "Explorar La Araucanía",
            "Servicios para tu viaje"
          ]}
        />
      </main>

      {/* Gonzalo: pie de página */}
      <PiePagina />
    </>
  );
}

export default App;
