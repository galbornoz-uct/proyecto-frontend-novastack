# EcoRuta Temuco — ejecución local

Desde esta carpeta (`app`), instala las dependencias con `npm ci` y ejecuta
`npm run api` y `npm run dev` en terminales separadas. La API escucha en
`http://localhost:3001`.

## Configuración de la API

Se utiliza `json-server` 0.17.4. Su CLI carga automáticamente
`json-server.json` desde el directorio de ejecución; el comando oficial sigue
siendo `json-server --watch db.json --port 3001` (`npm run api`).

La opción `foreignKeySuffix: "__sin_relaciones__"` evita que el servidor
interprete los campos `rutaId` como relaciones automáticas. Con el sufijo
predeterminado `Id`, cualquier DELETE revisa las referencias de toda la base
y falla en `lodash-id` al encontrar la sugerencia válida con `rutaId: null`.
La configuración permite borrar reseñas sin alterar ese dato ni el contrato.

Los filtros explícitos como `GET /resenas?rutaId=1` siguen funcionando.
Las relaciones automáticas basadas en `rutaId` (rutas anidadas, `_expand`,
`_embed` y borrado de dependientes) quedan desactivadas. La interfaz actual
utiliza endpoints directos y filtros explícitos.

Para comprobar POST y DELETE, utiliza una copia temporal de `db.json`,
`package.json` y `json-server.json`, con el ejecutable instalado disponible
en `PATH`. Nunca realices pruebas destructivas sobre la base original.
Comprueba la persistencia en el archivo temporal antes de detener la API y
vuelve a consultar después de reiniciarla.

## Plantilla React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
