import { createServer } from "node:http";
import { performance } from "node:perf_hooks";

const origen = new URL(process.env.ECORUTA_ORIGEN || "http://localhost:5173").origin;
const puerto = Number(process.env.NOMINATIM_PORT || process.env.PORT || 3101);
const host = process.env.NOMINATIM_HOST || (process.env.PORT ? "0.0.0.0" : "127.0.0.1");
if (!Number.isInteger(puerto) || puerto < 1 || puerto > 65535) {
  throw new Error("El puerto de Nominatim debe ser un entero entre 1 y 65535.");
}
const proveedor = new URL(
  process.env.NOMINATIM_SEARCH_URL || "https://nominatim.openstreetmap.org/search",
);
if (proveedor.protocol !== "https:") throw new Error("Nominatim requiere HTTPS.");

const cache = new Map();
const vigenciaCache = 24 * 60 * 60 * 1000;
const capacidadCache = 500;
const identificacion = "EcoRutaTemuco/1.0 (+https://github.com/galbornoz-uct/proyecto-frontend-novastack)";
let disponibleDesde = performance.now() + 1000;
let consultaEnCurso = false;

function responder(respuesta, estado, datos) {
  respuesta.writeHead(estado, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  respuesta.end(JSON.stringify(datos));
}

const servidor = createServer(async (peticion, respuesta) => {
  // Comprobación del alojamiento: no consulta al proveedor ni consume su cuota.
  if (peticion.method === "GET" && peticion.url === "/salud") {
    return responder(respuesta, 200, { estado: "ok" });
  }
  respuesta.setHeader("Vary", "Origin");
  if (peticion.headers.origin !== origen) return responder(respuesta, 403, null);
  respuesta.setHeader("Access-Control-Allow-Origin", origen);

  if (peticion.url !== "/buscar-ubicacion") return responder(respuesta, 404, null);
  if (peticion.method !== "POST") return responder(respuesta, 405, null);
  if (!peticion.headers["content-type"]?.startsWith("application/x-www-form-urlencoded")) {
    return responder(respuesta, 415, null);
  }

  let cuerpo = "";
  try {
    peticion.setEncoding("utf8");
    for await (const parte of peticion) {
      cuerpo += parte;
      if (cuerpo.length > 2048) return responder(respuesta, 413, null);
    }
  } catch {
    return responder(respuesta, 400, null);
  }

  const consulta = new URLSearchParams(cuerpo).get("q")?.normalize().trim().replace(/\s+/gu, " ");
  if (!consulta || consulta.length > 160) return responder(respuesta, 400, null);

  const clave = consulta.toLocaleLowerCase("es-CL");
  const ahora = performance.now();
  const guardado = cache.get(clave);
  if (guardado?.vence > ahora) return responder(respuesta, 200, guardado.resultado);
  cache.delete(clave);

  // Un solo proceso comparte este límite entre todos los usuarios de EcoRuta.
  if (consultaEnCurso || ahora < disponibleDesde) return responder(respuesta, 429, null);

  const url = new URL(proveedor);
  url.search = new URLSearchParams({
    q: consulta,
    format: "json",
    limit: "1",
    countrycodes: "cl",
    "accept-language": "es",
  }).toString();

  consultaEnCurso = true;
  disponibleDesde = performance.now() + 1000;
  try {
    const externa = await fetch(url, {
      headers: { "User-Agent": identificacion, Accept: "application/json" },
      redirect: "error",
      signal: AbortSignal.timeout(8000),
    });

    if (externa.status === 429) {
      const reintento = externa.headers.get("Retry-After");
      const demora = /^\d+$/.test(reintento || "")
        ? Number(reintento) * 1000
        : Date.parse(reintento) - Date.now();
      disponibleDesde = performance.now() + Math.max(60000, demora || 0);
      return responder(respuesta, 429, null);
    }
    if (!externa.ok) throw new Error("Error de Nominatim");
    const datos = await externa.json();
    if (!Array.isArray(datos)) throw new Error("Respuesta de Nominatim inválida");

    let resultado = null;
    if (datos.length) {
      const { display_name, lat, lon } = datos[0];
      const latitud = Number(lat);
      const longitud = Number(lon);
      if (!display_name || !lat || !lon ||
          !Number.isFinite(latitud) || Math.abs(latitud) > 90 ||
          !Number.isFinite(longitud) || Math.abs(longitud) > 180) {
        throw new Error("Ubicación de Nominatim inválida");
      }
      resultado = { nombre: display_name, latitud, longitud };
    }

    if (cache.size >= capacidadCache) cache.delete(cache.keys().next().value);
    cache.set(clave, { resultado, vence: performance.now() + vigenciaCache });
    return responder(respuesta, 200, resultado);
  } catch {
    return responder(respuesta, 502, null);
  } finally {
    consultaEnCurso = false;
  }
});

servidor.listen(puerto, host, () => console.log(`Buscador de EcoRuta en ${host}:${puerto}`));
