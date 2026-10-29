
// 1. Seleccionamos los elementos del HTML
const boton = document.getElementById("btnClima");
const pTemperatura = document.getElementById("parrafoTemperatura");
const pViento = document.getElementById("parrafoViento");
const selectorCiudad = document.getElementById("ciudad");
const tituloClima = document.getElementById("tituloClima");

// 2. Creamos la función que consulta la API
function cargarClima() {

    // Prevenir el doble clic
    boton.disabled = true;
    selectorCiudad.disabled = true;

    // Obtener las coordenadas de la ciudad
    const [lat, lon] = selectorCiudad.value.split(",");

    // Obtener el nombre de la ciudad
    const ciudad = selectorCiudad.options[selectorCiudad.selectedIndex].text;

    // Cambiar los títulos
    tituloClima.textContent = `El Clima en ${ciudad}`;
    document.title = `Clima en ${ciudad}`;

    // Mostrar mensaje mientras carga
    pTemperatura.textContent = "Temperatura: Cargando...";
    pViento.textContent = "Viento: Cargando...";

    // Construimos la URL
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m&timezone=auto`;

    // Hacemos la petición con fetch
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error en la petición");
            }
            return response.json();
        })
        .then(data => {

            console.log(data);

            // Mostrar temperatura
            pTemperatura.textContent =
                `Temperatura: ${data.current.temperature_2m}°C`;

            // Mostrar velocidad del viento
            pViento.textContent =
                `Velocidad del viento: ${data.current.wind_speed_10m} km/h`;
        })
        .catch(error => {

            console.error("Error al obtener el clima:", error);

            pTemperatura.textContent =
                "Error al cargar la temperatura.";

            pViento.textContent =
                "Error al cargar el viento.";
        })
        .finally(() => {

            // Volver a habilitar el botón
            boton.disabled = false;
            selectorCiudad.disabled = false;
        });
}

// 3. Evento del botón
boton.addEventListener("click", cargarClima);

// 4. Cambiar el clima al seleccionar otra ciudad
selectorCiudad.addEventListener("change", cargarClima);
