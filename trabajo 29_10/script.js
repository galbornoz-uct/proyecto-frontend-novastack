// 1. Seleccionamos los elementos del HTML
const boton = document.getElementById("btnClima");
const pTemperatura = document.getElementById("parrafoTemperatura");
const pViento = document.getElementById("parrafoViento");
const selectCiudad = document.getElementById("selectCiudad");
const tituloCiudad = document.getElementById("tituloCiudad");

// Ciudades con sus coordenadas
const ciudades = {
    santiago: {
        nombre: "Santiago",
        lat: -33.45,
        lon: -70.67
    },

    temuco: {
        nombre: "Temuco",
        lat: -38.74,
        lon: -72.59
    },

    valparaiso: {
        nombre: "Valparaíso",
        lat: -33.05,
        lon: -71.62
    }
};

//funcion para cargar el clima
function cargarClima() {
    // Evitar varios clics mientras se cargan los datos
    boton.disabled = true;
    selectCiudad.disabled = true;
    boton.textContent = "Cargando...";

    // Obtenemos la ciudad seleccionada
    const ciudadSeleccionada = selectCiudad.value;
    const ciudad = ciudades[ciudadSeleccionada];

    // Cambiamos el título
    tituloCiudad.textContent = `El Clima en ${ciudad.nombre}`;

    // Mostramos un mensaje mientras esperamos
    pTemperatura.textContent = "Temperatura: Cargando...";
    pViento.textContent = "Viento: Cargando...";

    // URL de la API
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${ciudad.lat}&longitude=${ciudad.lon}&current=temperature_2m,wind_speed_10m&timezone=auto`;

    // Realizamos la petición
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo obtener el clima");
            }

            return response.json();
        })
        .then(data => {
            console.log(data);

            // Obtenemos los datos y sus unidades
            const temperatura = data.current.temperature_2m;
            const viento = data.current.wind_speed_10m;

            const unidadTemperatura =
                data.current_units.temperature_2m;

            const unidadViento =
                data.current_units.wind_speed_10m;

            // Mostramos los datos
            pTemperatura.textContent =
                `Temperatura: ${temperatura} ${unidadTemperatura}`;

            pViento.textContent =
                `Viento: ${viento} ${unidadViento}`;
        })
        .catch(error => {
            console.error("Error al obtener el clima:", error);

            pTemperatura.textContent =
                "Error al cargar la temperatura.";

            pViento.textContent =
                "Error al cargar el viento.";
        })
        .finally(() => {
            // Habilitamos nuevamente el botón y el selector
            boton.disabled = false;
            selectCiudad.disabled = false;
            boton.textContent = "Traer Clima";
        });
}

// Ejecutar al presionar el botón
boton.addEventListener("click", cargarClima);

// Ejecutar automáticamente al seleccionar otra ciudad
selectCiudad.addEventListener("change", cargarClima);