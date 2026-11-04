# ARCANA · Gabinete de magia digital

Aplicación web estática, en castellano, con siete instrumentos. Abre `index.html` o visita [ARCANA](https://armandmu.github.io/arcana/).

## Instrumento 1: Magia del caos

La versión extendida está en [instrumento1.html](https://armandmu.github.io/arcana/instrumento1.html) y contiene seis áreas:

- **Forja de sigilos:** método de Spare, rueda de la bruja de tres anillos, cuadrado mágico de Saturno (3 × 3), procesamiento de letras, guardado, disolución visual, exportación SVG/PNG.
- **Gnosis:** catálogo original de 14 métodos, explicaciones en castellano, temporizador de práctica, tres patrones respiratorios y metrónomo de percusión. Las técnicas que en origen contienen riesgos físicos se documentan y se presentan con una alternativa más segura.
- **Servidores:** creación, nombres aleatorios, sigilo propio, propósito, apariencia, alojamiento, activador, alimentación diaria/semanal/mensual, vencimientos, reposo, reactivación, disolución e historial de operaciones.
- **Oráculos:** estrella de ocho direcciones, ocho colores de Carroll con 64 lecturas específicas, sistema binario de ocho bits y bibliomancia. Selecciones hechas con `crypto.getRandomValues`.
- **Rituales:** cinco plantillas originales adaptadas al castellano, con el GPR completo de 15 pasos, carga de sigilos, creación de servidores, invocación de arquetipos y rayo gnóstico. Ejecución por pasos, temporización, registro, creación y eliminación de rituales propios.
- **Libro negro:** diario con estado corporal/mental, intención, técnica, símbolos, resultados, sueños, notas, etiquetas, fase lunar, vínculos con rituales/servidores, ecuación simbólica de Carroll, búsqueda, filtros, estadísticas y rachas.

Los datos se guardan mediante `localStorage` en el navegador. El instrumento 1 ofrece exportación/importación de copia de seguridad en JSON. No requiere cuentas, servidores ni claves de API.

## Comprobación automática

GitHub Actions ejecuta `node --check` en los scripts y las pruebas `node tests/instrumento1.test.cjs` para comprobar estructura, renderizado de vistas y operaciones centrales.

## Fuente y atribución

Instrumento 1 inspirado y adaptado a partir de [Chaos Magick Practice Toolkit](https://github.com/koriyoshi2041/chaos-magick-toolkit), distribuido con licencia MIT. La interfaz, las interpretaciones de los 64 pares y parte de la bibliomancia son implementaciones propias, no traducciones literales del repositorio.

Las prácticas se presentan como ejercicios simbólicos y de reflexión. La aplicación no predice el futuro ni ofrece garantías de resultados sobrenaturales.


## Manual y fidelidad al código fuente

La interfaz del instrumento 1 muestra una guía por pasos en cada apartado, explicaciones junto a los campos y ayudas sobre cada botón. Las instrucciones se han contrastado con los archivos de flujo de la versión de terminal (`src/cli/*-flow.ts`) y con `src/data/gnosis-methods.ts` y `src/data/gpr.ts` del proyecto original.

- Se muestran tanto los **tres trazados de caracteres** que produce el motor de sigilos original como una representación SVG adicional. La carga y el olvido cuentan con un asistente guiado.
- Los oráculos incorporan traducciones al castellano de las **ocho lecturas de la estrella, las dieciséis lecturas binarias y las sesenta y cuatro combinaciones de colores**. La bibliomancia usa textos originales de ARCANA inspirados en la tradición, para no reutilizar citas extensas de autores contemporáneos.
- El arquitecto de rituales puede concatenar los 15 pasos del pentagrama gnóstico antes y después del ritual elegido, como hace el flujo de ejecución del proyecto de referencia. Ofrece instrucciones lunares de carácter simbólico.
- Las técnicas históricas que implican colapso físico, dolor o hiperventilación se explican, pero se sustituyen por opciones guiadas de menor riesgo. Por ello la ejecución **no reproduce literalmente todas las prácticas físicas** del original.

La aplicación no almacena datos en la nube y GitHub Pages no sincroniza la información entre dispositivos. Exporta una copia JSON para trasladar tus anotaciones. No se garantiza equivalencia byte por byte con el programa TypeScript original; se trata de una adaptación web con funciones equivalentes y añadidos de accesibilidad.
