# Nombre del Proyecto / Novastack

## Integrantes y y roles de cada integrante (Sprint actual)

| Nombre | Rol ágil |
|---|---|
| Matias Salinas  | Product Owner |
| Gonzalo Albornoz | Scrum Master |
| Rodrigo Sevilla | Developers |
| Carlos Nahuelcoy | QA/Tester |

## Descripción breve del trabajo

> "EcoRuta Temuco" necesita centralizar su información turística dispersa creando una plataforma web accesible. Esto permitirá a turistas y locales descubrir rutas y emprendimientos sustentables en La Araucanía de forma fácil y unificada.

## Estructura del proyecto

```text
proyecto-frontend-novastack/
│
├── index.html
├── README.md
│
├── css/
│
├── img/
│
├── js/
│
└── pages/
```

### Descripción de los archivos y carpetas

- **`index.html`**: Página principal que presenta la información más importante de EcoRuta Temuco y los accesos a otras secciones.
- **`pages/`**: Carpeta destinada a las páginas HTML secundarias del sitio.
- **`css/`**: Archivos CSS utilizados para los estilos y el diseño adaptable a distintos dispositivos.
- **`img/`**: Imágenes y otros recursos visuales del sitio web.
- **`js/`**: Archivos JavaScript para las funcionalidades interactivas.
- **`README.md`**: Documentación general del proyecto.

## Tecnologías utilizadas en este html

- HTML5 / CSS3
- JavaScript / TypeScript
- (Framework a definir)
- (API consumida)

## Cómo ejecutar este proyecto

```bash
# Instalar dependencias
cd app
npm ci

# Ejecutar en modo desarrollo
npm run dev
```

## Estado del proyecto:

- Sprint actual: Sprint 3 (Semana 11)
- Última actualización: (fecha)

## Tablero Kanban:

Enlace al tablero: https://trello.com/invite/b/6a7dd7a0cd940a8f9eef4fc6/ATTIfb61c4ed37dbd34946499f680740b7c172A6E824/trabajo-frontend-novastack

## Enlace de despliegue:

https://galbornoz-uct.github.io/proyecto-frontend-novastack/

### Publicación de React — Semana 13

La URL prevista para la aplicación es
https://galbornoz-uct.github.io/proyecto-frontend-novastack/aplicacion/.
Estará disponible después de fusionar el PR final de publicación. El enlace
«Aplicación» del menú del sitio estático apunta a esa carpeta.

Desde `app/`, `npm run dev` utiliza la API propia en `http://localhost:3001`
y no muestra el aviso de publicación. Para comprobar la versión de producción:

```bash
npm run build
npm run preview
```

El build genera `aplicacion/` en la raíz del repositorio. Vite usa rutas relativas
(`base: './'`) y `HashRouter` conserva las vistas internas al recargar. Preview
sirve ese resultado; utiliza la URL indicada en la terminal (por defecto
http://localhost:4173).

En producción aparece un aviso: la API propia no se ejecuta en GitHub Pages.
Las consultas van a `https://api-propia.invalid`, una dirección deliberadamente
inexistente, para mostrar los estados de error sin acceder al localhost de quien
visita el sitio. Open-Meteo sigue consultándose por HTTPS desde el navegador.

Nominatim necesita publicar su intermediario por separado. Mientras no se
configure `VITE_NOMINATIM_PROXY_URL`, el aviso y el buscador indican que las
ubicaciones no están disponibles. El intermediario ya está publicado en Render y se comprobó su respuesta
desde GitHub Pages. Consulta «Segunda API pública externa — Nominatim»
para obtener su URL. La rama `deploy/configuracion` incluye el código y la plantilla de hallazgos en
`.github/ISSUE_TEMPLATE/hallazgo-qa.md`, pero no los archivos generados. Tras
aprobar y fusionar todos los cambios, solo el integrador genera `aplicacion/`
desde `main` actualizado, en `deploy/aplicacion`, y abre el PR de publicación.
La carpeta se regenera con `npm run build`; no se edita manualmente.


## API propia

Contrato de EcoRuta Temuco acordado en la reunión frontend-backend del jueves 12 de noviembre de 2026, correspondiente a la Semana 11 y al Sprint 3.

Firmado por Matías Salinas (PO), Rodrigo Sevilla y Gonzalo Albornoz (frontend), y Carlos Nahuelcoy (backend y QA).

La fotografía de la hoja firmada debe adjuntarse a la tarjeta «Contrato API» de Trello.

Si el contrato cambia, se cambia primero aquí y después en el código.

### Recursos

| Recurso | La interfaz lo… | Vistas que lo usan | Para qué le sirve al usuario |
|---|---|---|---|
| `rutas` | Solo lee | Inicio, Rutas (Catálogo), DetalleRuta | Conocer las rutas disponibles y elegir una según su distancia y dificultad. |
| `resenas` | Lee, crea y borra | DetalleRuta | Compartir la experiencia de una ruta turística, calificarla de 1 a 5 y leer las reseñas de otros visitantes. |
| `sugerencias` | Lee y crea | DetalleRuta, Rutas (Catálogo), ProponerRuta | Proponer mejoras para una ruta existente desde DetalleRuta y nuevas rutas desde Rutas o ProponerRuta. Consultar cada tipo de sugerencia en su vista correspondiente. |

### Modelo de datos

Cada objeto tiene un `id` de tipo `number`, generado por el servidor. El frontend no envía este campo al crear un registro.

Las relaciones entre recursos utilizan el campo `rutaId`.

#### Recurso: `rutas`

```ts
interface Ruta {
  id: number;
  nombre: string;
  descripcion: string;
  ubicacion: string;
  distanciaKm: number;
  duracionMin: number;
  dificultad: "baja" | "media" | "alta";
}
```

**Reglas del modelo:**

- `nombre`, `descripcion` y `ubicacion` son obligatorios.
- `distanciaKm` es obligatorio y debe ser mayor que 0. Representa los kilómetros del recorrido, no la distancia desde el visitante.
- `duracionMin` es obligatorio y debe ser un número entero mayor que 0, expresado en minutos.
- `dificultad` es obligatoria y solo admite `"baja"`, `"media"` o `"alta"`.
- `imagenUrl` queda fuera del contrato: las imágenes de EcoRuta son estáticas y su incorporación al modelo deberá acordarse con frontend.

**Ejemplo JSON:**

```json
{
  "id": 1,
  "nombre": "Senderismo en Cerro Ñielol",
  "descripcion": "Recorrido por senderos del Cerro Ñielol.",
  "ubicacion": "Cerro Ñielol, Temuco, La Araucanía",
  "distanciaKm": 2.5,
  "duracionMin": 60,
  "dificultad": "baja"
}
```

> La distancia, duración y dificultad de este ejemplo son ilustrativas y no corresponden a información oficial del recorrido.

#### Recurso: `resenas`

```ts
interface Resena {
  id: number;
  rutaId: number;
  autor: string;
  nota: number;
  comentario: string;
  fecha: string;
}
```

**Reglas del modelo:**

- `rutaId` es obligatorio y debe ser un número entero positivo que corresponda al `id` de una ruta existente.
- `autor` es obligatorio y contiene el nombre del visitante.
- `nota` es obligatoria y debe ser un número entero entre 1 y 5.
- `comentario` es obligatorio y debe contener un texto no vacío que describa la experiencia del visitante.
- `fecha` es obligatoria y debe ser una fecha válida con formato `AAAA-MM-DD`.
- La fecha la envía el formulario al publicar la reseña; no acredita la identidad del autor ni corresponde a una hora registrada por el servidor.

**Ejemplo JSON:**

```json
{
  "id": 1,
  "rutaId": 1,
  "autor": "Ana",
  "nota": 5,
  "comentario": "La recomiendo",
  "fecha": "2026-11-12"
}
```

#### Recurso: `sugerencias`

```ts
interface Sugerencia {
  id: number;
  rutaId: number | null;
  autor: string;
  tipo: "mejora" | "nueva_ruta";
  descripcion: string;
}
```

**Reglas del modelo:**

- `rutaId` es obligatorio:
  - Si `tipo` es `"mejora"`, debe ser un número entero positivo que corresponda al `id` de una ruta existente.
  - Si `tipo` es `"nueva_ruta"`, debe ser `null`, sin comillas.
- `autor` es obligatorio y contiene el nombre del visitante.
- `tipo` es obligatorio y solo admite `"mejora"` o `"nueva_ruta"`.
- `descripcion` es obligatoria, no puede estar vacía y admite hasta 500 caracteres.
- Para una mejora, la descripción debe indicar el cambio concreto propuesto.
- Para una nueva ruta, la descripción debe incluir el nombre, sector y descripción del recorrido propuesto.

**Ejemplo JSON de una mejora:**

```json
{
  "id": 1,
  "rutaId": 1,
  "autor": "Ana",
  "tipo": "mejora",
  "descripcion": "Agregar señalización en el sendero."
}
```

**Ejemplo JSON de una nueva ruta:**

```json
{
  "id": 2,
  "rutaId": null,
  "autor": "Pedro",
  "tipo": "nueva_ruta",
  "descripcion": "Proponer un recorrido cultural por el centro de Temuco; trazado por definir."
}
```

### Contrato

En los endpoints, `:id` representa el identificador numérico de la ruta o del registro solicitado.

| Método | Endpoint | Envía el frontend | Responde la API | Código | Vista o componente |
|---|---|---|---|---|---|
| `GET` | `/rutas` | Nada | Arreglo de rutas; `[]` si no hay registros. | 200 | Inicio, Rutas (Catálogo) |
| `GET` | `/rutas/:id` | Nada | Objeto de la ruta solicitada; 404 si el identificador no existe. | 200 · 404 | DetalleRuta |
| `GET` | `/resenas?rutaId=:id` | Nada | Arreglo de reseñas de la ruta indicada; `[]` si no hay reseñas. | 200 | DetalleRuta |
| `POST` | `/resenas` | `{"rutaId":1,"autor":"Ana","nota":5,"comentario":"La recomiendo","fecha":"2026-11-12"}` | Reseña creada con todos sus campos, incluido el `id` generado y la `fecha` enviada. | 201 | DetalleRuta / FormularioResena (planeado) |
| `DELETE` | `/resenas/:id` | Nada | `{}` (objeto vacío). | 200 | DetalleRuta |
| `GET` | `/sugerencias?rutaId=:id` | Nada | Arreglo de mejoras de la ruta indicada; `[]` si no hay sugerencias. | 200 | DetalleRuta |
| `POST` | `/sugerencias` | `{"rutaId":1,"autor":"Ana","tipo":"mejora","descripcion":"Agregar señalización en el sendero."}` | Sugerencia creada con todos sus campos y el `id` generado. | 201 | DetalleRuta para mejoras; ProponerRuta, accesible desde Rutas, para nuevas rutas. FormularioSugerencia planeado. |
| `GET` | `/sugerencias?tipo=nueva_ruta` | Nada | Arreglo de propuestas de nuevas rutas; `[]` si no hay propuestas. | 200 | Rutas (Catálogo), ProponerRuta (uso planeado) |

Para proponer una nueva ruta se utiliza también `POST /sugerencias`, enviando este cuerpo:

```json
{
  "rutaId": null,
  "autor": "Pedro",
  "tipo": "nueva_ruta",
  "descripcion": "Proponer un recorrido cultural por el centro de Temuco; trazado por definir."
}
```

Los cuerpos de las solicitudes `POST` no incluyen `id`, porque lo genera el servidor.

### Revisión del contrato por QA

- [x] Los recursos están en plural, en minúsculas y sin tildes ni ñ.
- [x] Cada recurso tiene un campo `id` de tipo `number` y ningún `POST` lo envía.
- [x] Las relaciones utilizan campos terminados en `Id`, sin guardar arreglos de un recurso dentro de otro.
- [x] Los nombres de los campos coinciden con las props de los componentes de la semana 10.
- [x] Ningún endpoint incluye un verbo en la URL y los filtros utilizan la forma `campo=valor`.
- [x] Existe al menos un recurso que la interfaz escribe mediante `POST` y modifica o elimina mediante `PATCH` o `DELETE`.
- [x] Cada endpoint indica qué vista o componente lo utiliza y cada vista mínima tiene al menos un endpoint.
- [x] No se incluyen usuarios, contraseñas ni inicio de sesión.
- [x] Los ejemplos JSON cumplen los modelos de datos definidos.

### Cómo levantar la API en local

La aplicación React de Semana 12 está en `app/`. Desde la raíz del repositorio:

```bash
cd app
npm ci
npm run api
```

La API usa `json-server` 0.17.4 y escucha en **http://localhost:3001**.
El comando oficial ejecuta `json-server --watch db.json --port 3001`.
Desde otra terminal, inicia la interfaz:

```bash
cd app
npm run dev
```

Vite usa por defecto **http://localhost:5173**; si el puerto está ocupado,
consulta la dirección que indica la terminal. La navegación utiliza HashRouter:
`/#/rutas`, `/#/rutas/1` y `/#/proponer-ruta`.

Para comprobar las consultas, abre en el navegador:

- http://localhost:3001/rutas
- http://localhost:3001/rutas/1
- http://localhost:3001/rutas/9999 (debe responder 404).
- http://localhost:3001/resenas?rutaId=1
- http://localhost:3001/sugerencias?rutaId=1
- http://localhost:3001/sugerencias?tipo=nueva_ruta

Inicio conserva tres rutas destacadas (`slice(0, 3)`) y muestra además un
listado independiente de sugerencias, obtenido de `GET /sugerencias`, con
filtro por tipo. En el detalle se consultan y publican mejoras para esa ruta.
«Proponer ruta», disponible en la navegación incluso desde el catálogo,
consulta las propuestas de tipo `nueva_ruta` y permite registrar otra con
`rutaId: null`. Los formularios de reseñas y sugerencias usan POST; el listado
de reseñas permite DELETE. Los nuevos registros aparecen sin recargar.

Si la API está desconectada, las vistas muestran mensajes de error en vez
de sustituir los resultados por arreglos locales. El listado de sugerencias
mantiene sus estados de carga y error independientes de las rutas.

`app/json-server.json` se carga automáticamente al ejecutar `npm run api`
desde `app/`. Configura `foreignKeySuffix: "__sin_relaciones__"` para evitar
el HTTP 500 de DELETE al encontrar una sugerencia con `rutaId: null`.
Los filtros explícitos del contrato se conservan; las relaciones automáticas
y el borrado de dependientes basados en `rutaId` quedan desactivados.
Consulta también `app/README.md`.

Para QA de POST y DELETE, **no uses `app/db.json` original**: copia la base y
`json-server.json` a un directorio temporal y arranca allí el ejecutable
instalado de `json-server` con `--watch db.json --port 3001` (detén antes
cualquier API en ese puerto). Prueba la interfaz contra esa copia, espera
a que el archivo refleje la escritura y reinicia la API para comprobar la
persistencia. No agregues esa base temporal a Git.

Validaciones técnicas desde `app/`: `npm run build` y `npm run lint`.
Desde la raíz: `git diff --check`.

### API pública externa

El proyecto utiliza Open-Meteo en Inicio de React, mediante `app/src/components/ClimaActual.jsx`, y en la vista HTML Lugares, mediante `js/clima-rutas.js`.

| Dato | Valor |
|---|---|
| Nombre | Open-Meteo. |
| URL base | https://api.open-meteo.com |
| Endpoint que usaremos | `GET /v1/forecast`. |
| Variables utilizadas | `temperature_2m` (temperatura en °C), `wind_speed_10m` (velocidad del viento en km/h) y `weather_code` (código de las condiciones del cielo). |
| Requiere autenticación | No requiere autenticación ni clave de API para el uso actual, conforme al requisito del curso. |
| Vista en que aparece | Inicio de React (`app/src/paginas/Inicio.jsx`), mediante `ClimaActual.jsx`; y Lugares (`pages/lugares.html`), mediante `js/clima-rutas.js`. |
| Para qué le sirve al usuario | Mostrar temperatura, velocidad del viento y condiciones del cielo de lugares turísticos para ayudar a planificar las visitas. |

La consulta envía las coordenadas de cada lugar mediante `latitude` y `longitude`, solicita las tres variables con `current=temperature_2m,wind_speed_10m,weather_code` y utiliza `timezone=America/Santiago`. El código lee los datos desde `current` en la respuesta JSON y traduce `weather_code` a una descripción del cielo.

En Inicio de React se consulta el Cerro Ñielol (latitud -38.71708, longitud -72.58328),
con viento en km/h. El componente consulta al cargar con `useEffect([])`, muestra
sus propios estados de carga y error y cita a Open-Meteo en la interfaz. El clima
es independiente de la API propia: si falla Open-Meteo, las rutas se mantienen;
si se detiene json-server, el clima puede seguir cargando.

### Segunda API pública externa — Nominatim (OpenStreetMap)

| Dato | Valor |
|---|---|
| URL base | https://nominatim.openstreetmap.org |
| Endpoint | `GET /search` |
| Parámetros | `q` (lugar o dirección pública), `format=json`, `limit=1`, `countrycodes=cl` y `accept-language=es`. |
| Datos mostrados | Nombre del lugar (`display_name`), latitud (`lat`) y longitud (`lon`). |
| Autenticación | El uso previsto de la API pública no requiere clave. |
| Vista | ProponerRuta (`/#/proponer-ruta`). |
| Utilidad | Identificar las coordenadas de un lugar en Chile al preparar una propuesta de ruta turística. |

La [política oficial de Nominatim](https://operations.osmfoundation.org/policies/nominatim/)
limita a toda EcoRuta a un máximo de una solicitud por segundo, sumando el tráfico de
todos los usuarios. El buscador se ejecuta al enviar el formulario. Usa lugares y
direcciones públicas y evita enviar domicilios particulares o cualquier dato personal
o confidencial. La interfaz enlaza la atribución
[© colaboradores de OpenStreetMap](https://www.openstreetmap.org/copyright). Los
datos se ofrecen bajo ODbL. Los parámetros se describen en la
[documentación del endpoint de búsqueda](https://nominatim.org/release-docs/latest/api/Search/).

#### Ejecución local

Después de instalar las dependencias con `npm ci`, ejecuta en dos terminales desde
`app/`:

```sh
node servidor/nominatim.mjs
npm run dev -- --host localhost --strictPort
```

Abre `http://localhost:5173/#/proponer-ruta`. Para probar también las sugerencias
y reseñas, ejecuta `npm run api` en otra terminal.

React envía la búsqueda a `POST /buscar-ubicacion` en un intermediario independiente de
`json-server`. El intermediario consulta al proveedor por HTTPS y lo identifica con
el `User-Agent` de EcoRuta. Una instancia comparte el límite y guarda hasta 500
resultados, incluidas búsquedas sin coincidencias, durante 24 horas en memoria.
Si el intermediario está ocupado o aún no ha pasado un segundo desde la última
consulta externa, el navegador pide al usuario que vuelva a intentar. Escribir
en el campo no genera tráfico hacia Nominatim.

La petición del navegador está dentro de un `useEffect` dependiente de la
solicitud enviada. El formulario valida y crea esa solicitud al pulsar «Buscar
ubicación»; escribir no dispara el efecto. Se permite repetir un lugar y se
impiden envíos simultáneos. Al salir de la vista se cancela la petición; si
supera 15 segundos, solo el buscador informa del error. El mapa y sus marcadores
siguen utilizando las coordenadas de la respuesta, sin consultas adicionales.

#### Despliegue del intermediario en Render

El intermediario se publica en Render como **Web Service Free** con Node.js
24 y una sola instancia. Se configuró desde el repositorio público en
`main`, con despliegues manuales. `render.yaml` registra la configuración
del servicio. Usa la raíz del
repositorio como directorio de trabajo. El paso de build ejecuta
`node --check app/servidor/nominatim.mjs` y el de inicio ejecuta
`node app/servidor/nominatim.mjs`. Si el directorio de trabajo se configura en
`app/`, usa `node --check servidor/nominatim.mjs` y `node servidor/nominatim.mjs`.
El intermediario usa módulos nativos de Node.js.

| Variable | Valor en Render |
|---|---|
| `ECORUTA_ORIGEN` | `https://galbornoz-uct.github.io`, el origen exacto de GitHub Pages, sin ruta. |
| `PORT` | Lo asigna Render. El intermediario escucha en `0.0.0.0` al recibir esta variable. |
| `NOMINATIM_HOST` y `NOMINATIM_PORT` | Se dejan sin definir para usar la interfaz y el puerto anteriores. |
| `NOMINATIM_SEARCH_URL` | Opcional. Por defecto, `https://nominatim.openstreetmap.org/search`. Acepta proveedores HTTPS. |
| `NODE_VERSION` | `>=24.0.0 <25.0.0`. |
| `SKIP_INSTALL_DEPS` | `true`. Evita instalar dependencias de React o ejecutar `json-server`. |

Gestiona la instancia existente desde el
[panel del servicio en Render](https://dashboard.render.com/web/srv-dc44vf0u01pc73et16og).
Mantén un solo servicio para toda EcoRuta y las vistas previas desactivadas.

| Endpoint | URL pública |
|---|---|
| `GET /salud` | [Estado del intermediario](https://ecoruta-temuco-nominatim.onrender.com/salud) |
| `POST /buscar-ubicacion` | [Endpoint de búsqueda](https://ecoruta-temuco-nominatim.onrender.com/buscar-ubicacion) |

Verifica que `GET /salud` entregue HTTP 200 y `{"estado":"ok"}`. Abre
[la página de EcoRuta en GitHub Pages](https://galbornoz-uct.github.io/proyecto-frontend-novastack/)
y ejecuta una búsqueda en su consola, usando el endpoint de Render.

```js
const respuesta = await fetch("https://ecoruta-temuco-nominatim.onrender.com/buscar-ubicacion", {
  method: "POST",
  body: new URLSearchParams({ q: "Temuco" }),
});
console.log(location.origin, respuesta.status, await respuesta.json());
```

El 26 de noviembre de 2026, Chrome ejecutó el formulario `q=Temuco` desde
`https://galbornoz-uct.github.io` y leyó una respuesta CORS HTTP 200 con
«Temuco, Provincia de Cautín, Región de la Araucanía, Chile», latitud
`-38.7358908` y longitud `-72.590538`. Ambos extremos usaron HTTPS y Chrome
registró cero errores de CORS o contenido mixto. En el servicio publicado,
`/salud` devolvió HTTP 200 con `{"estado":"ok"}`, una búsqueda sin coincidencias
devolvió HTTP 200 con `null` y otro origen recibió HTTP 403.

Carlos copia `app/.env.example` a `app/.env.production.local`, que Git ignora,
y configura `VITE_NOMINATIM_PROXY_URL` con la URL HTTPS completa de la búsqueda
antes de preparar el PR independiente de publicación de React.

Render Free suspende el servicio tras 15 minutos sin tráfico y puede tardar
alrededor de un minuto en reactivarlo. El buscador de React espera hasta
15 segundos. Si la primera búsqueda vence, comprueba `/salud` y vuelve a
intentar cuando esté activo. El espacio de trabajo dispone de 750 horas de
instancia Free al mes, compartidas. La caché en memoria se vacía cuando
el proceso se detiene. [Límites de Render Free](https://render.com/docs/free)

Para reiniciar el proceso, abre el servicio en el panel de Render y elige
**Manual Deploy → Restart service**. Render prepara un proceso de reemplazo
antes de retirar el anterior y dirige el tráfico nuevo a un solo proceso a
la vez. Haz los reinicios y actualizaciones en un momento de baja actividad.
Después, verifica `/salud` y repite la prueba desde GitHub Pages.
[Reinicios y despliegues de Render](https://render.com/docs/deploys#restarting-a-service)

##### Pruebas locales de despliegue

Con Node.js 24, el puerto asignado por `PORT`, el origen de GitHub Pages y
un proveedor HTTPS simulado se verificaron estos casos:

| Prueba | Resultado |
|---|---|
| Escucha y salud | Escuchó en `0.0.0.0` y `GET /salud` devolvió HTTP 200 con `{"estado":"ok"}`. |
| Formulario y origen autorizado | `POST` con `application/x-www-form-urlencoded` y `q=Temuco` devolvió HTTP 200, nombre y coordenadas simuladas, con la cabecera CORS del origen exacto. |
| Sin coincidencias y caché | Se devolvió HTTP 200 con `null`. Las repeticiones, con y sin coincidencias, usaron la caché. |
| Origen y validaciones | Un origen distinto recibió HTTP 403. Se comprobaron los errores 400, 413 y 415. |
| Límite global | Cinco solicitudes simultáneas generaron una petición al proveedor y cuatro respuestas HTTP 429. Una consulta nueva dentro del intervalo también recibió HTTP 429. |
| Proveedor simulado | Se comprobó el `User-Agent` de EcoRuta. Un HTTP 429 activó la pausa de nuevas consultas y los fallos y coordenadas inválidas devolvieron HTTP 502. |

Una consulta adicional al Nominatim público desde el intermediario local
devolvió HTTP 200, «Temuco, Provincia de Cautín, Región de la Araucanía, Chile»,
latitud `-38.7358908` y longitud `-72.590538`. La cabecera
`Access-Control-Allow-Origin` fue `https://galbornoz-uct.github.io`.

#### Comprobaciones del laboratorio

| Prueba | Resultado |
|---|---|
| Temuco | Chrome mostró latitud `-38.7358908` y longitud `-72.590538`. |
| Pucón | Chrome mostró latitud `-39.2731173` y longitud `-71.9777605`. |
| CORS | Chrome leyó las respuestas del intermediario en un origen distinto del frontend, con `Access-Control-Allow-Origin: http://localhost:5173` y datos reales de Nominatim. |
| Lugar inexistente y envío vacío | Se mostró el mensaje sin coincidencias y se validaron el campo vacío y el envío con solo espacios. Escribir y enviar vacío no generó solicitudes. |
| Fallo de red | Se bloqueó la solicitud del navegador al intermediario mediante Chrome DevTools Protocol. Apareció el mensaje de error y siguieron disponibles el formulario de propuestas y el enlace al catálogo. |
| `json-server` detenido | La consulta nueva «Cerro Ñielol, Temuco» mostró coordenadas aunque la API propia rechazó la conexión. |
| Límite y caché | Con proveedor simulado, cinco solicitudes simultáneas generaron una sola consulta externa. Se verificaron el intervalo, la reutilización de resultados y el tratamiento de respuestas inválidas y de HTTP 429. |
| Funciones existentes | Open-Meteo mostró temperatura y viento. Se verificaron catálogo, detalle y publicación de reseñas y propuestas con una copia local de la base. |
| Diseño y teclado | Se verificaron anchos de 320, 390, 768 y 1440 px, con foco mediante Tab y envío mediante Enter. |
| Compilación y lint | `npm run build` y `npm run lint` finalizaron correctamente. Se verificó en `main` que las dos advertencias de lint ya existían en `DetalleRuta.jsx` y `FormularioResena.jsx`. |

#### Ajustes de código para la rúbrica de Semana 13

- Se conservó el mapa de Salinas y la búsqueda mediante el intermediario de
  Rodrigo; la consulta pasó a `useEffect` y sigue ocurriendo solo al enviar.
- En navegador, con respuestas simuladas, se comprobaron el campo vacío,
  escritura sin consultas, envío único, repetición del mismo lugar, cambio de
  marcador, respuesta sin datos, HTTP 429, datos inválidos, fallo de red,
  tiempo de espera y cancelación al salir de la vista. Las pruebas de tiempo
  de espera usan un reloj acortado de QA, sin cambiar los 15 segundos del código.
- El servidor real respondió a `/salud` usando `PORT`; una búsqueda de Temuco
  devolvió datos reales y la cabecera CORS del origen autorizado. Un origen
  diferente recibió HTTP 403 en la prueba local.
- Se unificaron colores, títulos, tarjetas, botones y formularios con el sitio
  HTML. Se revisaron Inicio, catálogo, detalle y propuesta en 320, 390, 768 y
  1440 px. La base original no se modificó durante las pruebas.

Para la entrega, el PR de estas mejoras de código debe recibir revisión de
otro integrante antes del merge. La compilación generada queda fuera de ese
PR: se vuelve a generar y se publica en un PR independiente después de
integrar el código y configurar la URL pública. Las evidencias individuales,
la revisión en GitHub y los registros de Trello se completan por el equipo.
