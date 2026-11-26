---
name: Hallazgo QA
about: Informar un problema encontrado al probar EcoRuta Temuco
title: "[QA] "
labels: ""
assignees: ""
---

## Lugar de la prueba

- URL y vista:
- Dispositivo y sistema operativo:
- Navegador:
- Versión local o publicada:
- Equipo que realiza la revisión:

## Pasos para reproducir

1.
2.
3.

## Resultado esperado

Describe qué debería ocurrir.

## Resultado observado

Describe qué ocurrió y si se puede seguir usando la aplicación.

## Evidencia

Adjunta una captura o los mensajes relevantes de la consola, si corresponde.

## Impacto

Indica a qué función afecta y si impide completar el recorrido del usuario.

## Contexto de la versión publicada

En GitHub Pages, la API propia no está disponible: el aviso y los mensajes de
error de rutas, reseñas y sugerencias son esperados. Las solicitudes fallidas a
`api-propia.invalid` tampoco son un hallazgo por sí solas. El clima de Open-Meteo
debe poder consultarse con conexión a internet. La búsqueda de ubicaciones
requiere que el intermediario de Nominatim esté configurado y publicado.
