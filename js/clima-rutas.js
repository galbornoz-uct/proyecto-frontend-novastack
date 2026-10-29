
/*
  EcoRuta Temuco - Clima en la ruta
  Consulta datos meteorológicos reales mediante la API Open-Meteo.
  Muestra temperatura, viento, estado del cielo y recomendaciones.
*/

function describirCielo(codigo) {
    if (codigo === 0) {
        return "Despejado";
    } else if (codigo >= 1 && codigo <= 3) {
        return "Parcialmente nublado o nublado";
    } else if (codigo === 45 || codigo === 48) {
        return "Niebla";
    } else if (codigo >= 51 && codigo <= 57) {
        return "Llovizna";
    } else if (codigo >= 61 && codigo <= 67) {
        return "Lluvia";
    } else if (codigo >= 71 && codigo <= 77) {
        return "Nieve";
    } else if (codigo >= 80 && codigo <= 82) {
        return "Chubascos";
    } else if (codigo >= 95 && codigo <= 99) {
        return "Tormenta";
    }

    return "Condición no disponible";
}

function mostrarAviso(clima, aviso) {
    if (clima.temperature_2m < 8) {
        aviso.textContent = "Hace frío: lleva abrigo.";
    } else if (clima.wind_speed_10m > 40) {
        aviso.textContent = "Viento fuerte: evita los miradores.";
    } else {
        aviso.textContent = "Condiciones meteorológicas favorables.";
    }

    aviso.hidden = false;
}

async function cargarClima(lat, lon, tarjeta) {
    const widget = tarjeta.querySelector(".clima-ruta");

    if (!widget) return;

    const estado = widget.querySelector(".clima-estado");
    const temperatura = widget.querySelector(".clima-temperatura");
    const viento = widget.querySelector(".clima-viento");
    const cielo = widget.querySelector(".clima-cielo");
    const aviso = widget.querySelector(".clima-aviso");

    if (!estado || !temperatura || !viento || !cielo || !aviso) {
        console.warn("Faltan elementos del widget de clima.");
        return;
    }

    const URL_CLIMA = "https://api.open-meteo.com/v1/forecast"
        + `?latitude=${lat}&longitude=${lon}`
        + "&current=temperature_2m,wind_speed_10m,weather_code"
        + "&timezone=America/Santiago";

    estado.textContent = "Cargando clima…";
    aviso.hidden = true;

    try {
        const respuesta = await fetch(URL_CLIMA);

        if (!respuesta.ok) {
            throw new Error("La API respondió con error");
        }

        const datos = await respuesta.json();
        const clima = datos.current;

        if (!clima ||
            typeof clima.temperature_2m !== "number" ||
            typeof clima.wind_speed_10m !== "number" ||
            typeof clima.weather_code !== "number") {
            throw new Error("Datos meteorológicos incompletos");
        }

        temperatura.textContent = `${clima.temperature_2m} °C`;
        viento.textContent = `${clima.wind_speed_10m} km/h`;
        cielo.textContent = describirCielo(clima.weather_code);

        mostrarAviso(clima, aviso);

        estado.textContent = "Clima actualizado.";

    } catch (error) {
        console.error("Error al consultar el clima:", error);
        estado.textContent = "No pudimos cargar el clima.";
    }
}

document.querySelectorAll(
    ".grid-tarjetas .tarjeta[data-lat][data-lon]"
).forEach((tarjeta) => {
    const lat = Number(tarjeta.dataset.lat);
    const lon = Number(tarjeta.dataset.lon);

    if (Number.isFinite(lat) && Number.isFinite(lon)) {
        cargarClima(lat, lon, tarjeta);
    }
});
