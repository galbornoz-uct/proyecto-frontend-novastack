# Nombre del Proyecto / Novastack

## Integrantes y y roles de cada integrante (Sprint actual)

| Nombre | Rol ágil |
|---|---|
| Matias Salinas  | Product Owner |
| Francisco Larenas | Developers |
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
npm install

# Ejecutar en modo desarrollo
npm run dev
```

## Estado del proyecto:

- Sprint actual: Sprint 0 (Kickoff)
- Última actualización: (fecha)

## Tablero Kanban:

Enlace al tablero: https://trello.com/invite/b/6a7dd7a0cd940a8f9eef4fc6/ATTIfb61c4ed37dbd34946499f680740b7c172A6E824/trabajo-frontend-novastack

## Enlace de despliegue:

https://galbornoz-uct.github.io/proyecto-frontend-novastack/


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

Se completará en la semana 12, cuando la API se construya con `json-server`.

### API pública externa

La API pública externa está pendiente de registrar en este contrato.

| Dato | Valor |
|---|---|
| Nombre | Pendiente de confirmar por el equipo. |
| URL base | Pendiente de registrar. |
| Endpoint que usaremos | Pendiente de registrar. |
| Requiere autenticación | Debe funcionar sin autenticación, según el requisito del curso. |
| Vista en que aparece | Pendiente de confirmar. |
| Para qué le sirve al usuario | Pendiente de definir según la API elegida. |