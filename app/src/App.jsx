import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router";

import Encabezado from "./components/Encabezado.jsx";
import PiePagina from "./components/PiePagina.jsx";
import AvisoPublicacion from "./components/AvisoPublicacion.jsx";

import Inicio from "./paginas/Inicio.jsx";
import Rutas from "./paginas/Rutas.jsx";
import DetalleRuta from "./paginas/DetalleRuta.jsx";
import NoEncontrada from "./paginas/NoEncontrada.jsx";
import ProponerRuta from "./paginas/ProponerRuta.jsx";

function DesplazarAlInicio() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <Encabezado/>

      <main>
        <AvisoPublicacion />
        <DesplazarAlInicio />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/rutas" element={<Rutas />} />
          <Route path="/rutas/:id" element={<DetalleRuta />} />
          <Route path="/proponer-ruta" element={<ProponerRuta />} />
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </main>

      <PiePagina />
    </>
  );
}

export default App;
