
/*
  Página: Inicio - EcoRuta Temuco

  Calcula la distancia desde la ubicación del usuario
  hasta los lugares turísticos con coordenadas.
  Ordena los lugares por cercanía.
*/

/* ELEMENTOS HTML */
const boton = document.getElementById("btn-ubicacion");
const estado = document.getElementById("estado-ubicacion");
const lista = document.querySelector(".grid-tarjetas");

/* CALCULO DE DISTANCIAS */
function calcularDistancia(lat1, lon1, lat2, lon2) {
    const rad = grados => grados * Math.PI / 180;
    const diferenciaLat = rad(lat2 - lat1);
    const diferenciaLon = rad(lon2 - lon1);
    const a = Math.sin(diferenciaLat / 2) ** 2 +
        Math.cos(rad(lat1)) * Math.cos(rad(lat2)) *
        Math.sin(diferenciaLon / 2) ** 2;

    return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/* GEOLOCALIZACION */
boton.addEventListener("click", () => {
    if (!navigator.geolocation) {
        estado.textContent = "Tu navegador no permite obtener la ubicación.";
        return;
    }

    boton.disabled = true;
    estado.textContent = "Obteniendo tu ubicación...";

    navigator.geolocation.getCurrentPosition(
        posicion => {
            const lat = posicion.coords.latitude;
            const lon = posicion.coords.longitude;
            const tarjetas = [...lista.querySelectorAll(".tarjeta")];
            const resultados = [];
            const pendientes = [];

            /* ORDENAMIENTO DE LUGARES */
            tarjetas.forEach(tarjeta => {
                const latTexto = tarjeta.getAttribute("data-lat");
                const lonTexto = tarjeta.getAttribute("data-lon");
                const latLugar = Number(latTexto);
                const lonLugar = Number(lonTexto);
                const salida = tarjeta.querySelector(".distancia");

                if (!latTexto || !lonTexto ||
                    !Number.isFinite(latLugar) || !Number.isFinite(lonLugar)) {
                    if (salida) salida.textContent = "📍 Ubicación pendiente de definir";
                    pendientes.push(tarjeta);
                    return;
                }

                const distancia = calcularDistancia(lat, lon, latLugar, lonLugar);

                if (salida) {
                    salida.textContent = "📍 A " + distancia.toFixed(1) +
                        " km aproximadamente (línea recta)";
                }

                resultados.push({ tarjeta, distancia });
            });

            resultados.sort((a, b) => a.distancia - b.distancia);

            lista.replaceChildren(
                ...resultados.map(resultado => resultado.tarjeta),
                ...pendientes
            );

            estado.textContent = "Lugares con coordenadas ordenados por distancia desde tu ubicación.";
            boton.disabled = false;
        },

        /* MANEJO DE ERRORES */
        error => {
            estado.textContent = error.code === 1
                ? "No autorizaste el acceso a tu ubicación."
                : "No se pudo obtener tu ubicación. Inténtalo nuevamente.";

            boton.disabled = false;
        },

        { enableHighAccuracy: false, timeout: 12000, maximumAge: 300000 }
    );
});
