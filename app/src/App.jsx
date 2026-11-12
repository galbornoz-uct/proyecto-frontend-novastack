import { Routes, Route } from "react-router";

import Encabezado from "./components/Encabezado.jsx";
import PiePagina from "./components/PiePagina.jsx";

import Inicio from "./paginas/Inicio.jsx";
import Rutas from "./paginas/Rutas.jsx";
import DetalleRuta from "./paginas/DetalleRuta.jsx";
import NoEncontrada from "./paginas/NoEncontrada.jsx";

function App() {
  return (
    <>
      <Encabezado
        enlaces={["Inicio", "Lugares", "Eventos", "Servicios"]}
        paginaActual="Inicio"
      />

      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/rutas" element={<Rutas />} />
          <Route path="/rutas/:id" element={<DetalleRuta />} />
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </main>

      <PiePagina />
    </>
  );
}

export default App;