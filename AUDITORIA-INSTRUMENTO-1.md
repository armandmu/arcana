# Auditoría comparativa — Instrumento 1 de ARCANA
Fecha: 4 de noviembre de 2026

## Referencia consultada
Repositorio: https://github.com/koriyoshi2041/chaos-magick-toolkit
Archivos inspeccionados: `README.md`, `src/types.ts`, `src/core/{sigil,gnosis,servitor,oracle,ritual,diary,moon,random}.ts`, `src/data/{colors,gnosis-methods,gpr,quotes}.ts` y los seis flujos de `src/cli/`.

## Correspondencia por funciones

| Módulo original | Referencia original | Implementación ARCANA | Situación |
|---|---|---|---|
| Sigil Forge | 3 motores: Spare, Witch Circle, Saturn Kamea; reducción de consonantes; destrucción progresiva; carga | Trazados Unicode siguiendo los algoritmos, SVG/PNG, reducción de letras, guardado, guía de carga y disolución | Implementado con representación visual adicional |
| Gnosis Engine | 14 técnicas; guías; respiración 4-4-6/4-7-8/6-6-6/3-2-4; temporizadores; percusión; mantra | Catálogo de 14, guía en castellano, metrónomo, respiración, mantra y sesiones; cuatro patrones originales con sus ciclos 10/8/12/6 | Implementado, con alternativas de menor riesgo |
| Servitor Lab | Creación y nombre aleatorio, sigilo, finalidad, aspecto, alojamiento, activador, periodicidad, alimentación, actividad, reposo y disolución | Fichas, historial, alertas de alimentación, cuatro estados/acciones y recuperación de servidores antiguos | Implementado; cancelaciones respetadas |
| Chaos Oracle | Estrella de 8 direcciones, matriz de 8×8, oráculo binario de 8 bits, bibliomancia | Cuatro métodos, 64 traducciones de la matriz y 16 mensajes binarios; biblioteca personal añadida | Implementado; bibliomancia utiliza textos propios en lugar de reproducir íntegramente las citas ajenas |
| Ritual Architect | 5 rituales predefinidos; 15 pasos GPR; rituales propios; destierro previo/posterior; historial | 5 plantillas en español, editor, cronómetro, GPR concatenable, historial de ejecuciones | Implementado con adaptación de instrucciones de riesgo |
| Black Book | Diario, datos físicos/mentales, técnica, símbolos, propósito, observaciones, sueños, etiquetas, fase lunar, fórmula M, búsqueda, filtros y estadísticas | Campos, registros, enlaces a servidor/ritual, cálculo, filtros, rachas y estadísticas | Implementado; fase lunar aproximada como en el original |

## Correcciones de esta pasada

1. Incorporado el cuarto patrón de respiración **3–2–4 (6 ciclos)**, ausente en la aplicación. Corregida la relación patrón/ciclos para que se ajuste automáticamente: **4–4–6 (10), 4–7–8 (8), 6–6–6 (12), 3–2–4 (6)**. Las opciones 4–0–6 y 6–0–6 son añadidos de ARCANA.
2. Corregida la gestión del laboratorio: **Cancelar** en las ventanas de alimentación, reposo, activación o disolución no debe registrar una actividad ni cambiar el estado.
3. Ampliadas las pruebas automáticas para comprobar explícitamente los patrones de respiración y su presencia en la interfaz.
4. Verificadas de nuevo las funciones existentes de migración de registros de la primera versión, asociaciones del diario, tres motores de sigilos, 64 lecturas, 5 rituales y bibliomancia personal.

## Verificación realizada

- Se cargaron los scripts desde el repositorio actual y se probaron mediante un entorno de ejecución JavaScript con DOM y almacenamiento simulados.
- Pasaron doce grupos de pruebas: render de seis módulos, patrones, catálogo de gnosis, tres sigilos, rituales, oráculos, cancelación de servidor, ciclo de vida, migración sin duplicación, asociación de entradas, reinicio ritual y biblioteca personal.
- Se añadió cobertura a `tests/instrumento1.test.cjs` para los valores exactos de los patrones originales.

## Diferencias y límites que permanecen

- **Distinto formato de ejecución:** el original funciona en terminal con Node/TypeScript y guarda JSON en disco; ARCANA es una aplicación estática de navegador con `localStorage`. No es un port literal byte por byte.
- **Ejercicios físicos:** las técnicas de dolor deliberado, agotamiento/colapso, hiperventilación y experiencias emocionales intensas se documentan pero no se reproducen de manera literal. Se ofrecen alternativas de menor riesgo.
- **Bibliomancia y citas:** no se vuelcan de forma literal todos los pasajes atribuidos a autores contemporáneos del catálogo de citas del original. ARCANA ofrece fragmentos propios y biblioteca personal.
- **Exactitud visual:** el gráfico vectorial es una reinterpretación; el trazado de cuadrícula Unicode se ofrece por separado. La aplicación no es una reproducción visual de la terminal.
- **Validación de publicación:** pendiente comprobar en un navegador real los flujos de clic, descarga SVG/PNG, audio, selectores nativos y persistencia tras cerrar/abrir la página. Las pruebas de JavaScript simulado no sustituyen esta revisión. El estado de GitHub Pages y de GitHub Actions debe verificarse por separado antes de afirmar que el despliegue está completado.
- **Datos entre dispositivos:** no existe sincronización en la nube, solo respaldo/importación JSON.

## Criterio de cierre

No se identifican módulos principales del programa original enteramente ausentes de ARCANA. Los cambios anteriores resuelven carencias funcionales puntuales. La adaptación puede considerarse **completa a nivel de cobertura principal**, pero **no plenamente validada para producción** hasta la prueba real de navegador y publicación correcta.
