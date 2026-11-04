"use strict";
/* ARCANA - Manual contextual del instrumento 1.
   Elaborado revisando README, data/gnosis-methods.ts y flujos CLI
   de Chaos Magick Practice Toolkit. Se identifica lo que es adaptación. */
(function(A){
 const H={
 sigilos:{
 title:"Cómo crear, cargar y guardar un sigilo",
 short:"Los sigilos representan una intención mediante un símbolo. El repositorio original ofrece tres métodos, explica cómo reducir las letras y propone una secuencia de carga y olvido.",
 steps:[
 ["1. Escribe la intención","Redacta una frase afirmativa, concreta y centrada en tus propias acciones. Por ejemplo: «Organizo mi trabajo con claridad». Evita intentar controlar las decisiones de otras personas."],
 ["2. Comprueba las letras","La aplicación pasa la frase a mayúsculas, normaliza las tildes, elimina las vocales A, E, I, O, U y quita consonantes repetidas. La secuencia resultante es la base del sigilo."],
 ["3. Elige el método","Spare combina trazos de las consonantes; Rueda de la bruja conecta letras en tres circunferencias; Kamea de Saturno asigna números del 1 al 9 a un cuadrado mágico 3 × 3 y conecta sus puntos."],
 ["4. Genera y conserva","Pulsa «Generar / actualizar» para ver el resultado. Puedes guardar la intención y el método en el archivo local o exportar el gráfico como SVG o PNG."],
 ["5. Carga simbólica","En el repositorio original, la secuencia consiste en observar el sigilo, concentrarse, respirar y realizar un gesto de «lanzamiento», seguido de risa. En ARCANA puedes seguir la secuencia guiada de carga que aparece a continuación."],
 ["6. Disolución y registro","«Disolver símbolo» realiza una animación; no borra los sigilos guardados. Si lo deseas, anota la experiencia en el Libro negro y continúa con tus actividades."]
 ],
 note:"El flujo CLI original sí incluye instrucciones de reducción de letras, precaución ética, carga y olvido. El formato SVG/PNG y la interacción visual son adaptaciones de ARCANA."
 },
 gnosis:{
 title:"Cómo utilizar las 14 técnicas de gnosis",
 short:"En la tradición descrita por el repositorio, «gnosis» es un estado de concentración intensa. Las instrucciones del original están en su catálogo de 14 técnicas y en los flujos del motor.",
 steps:[
 ["1. Escoge una familia","Inhibitorias: meditación, contemplación, respiración, mantra, reducción sensorial, paradoja y postura de Spare. Excitatorias: danza, percusión, vocales, ordalía, emoción, sexualidad e hiperventilación."],
 ["2. Lee la explicación","Al seleccionar una técnica aparecerán su descripción y los pasos específicos traducidos o adaptados. Revisa las notas de seguridad de cada modalidad."],
 ["3. Ajusta los controles","«Duración» indica minutos. «BPM» controla el sonido del metrónomo para percusión. «Mantra» es la frase a repetir. «Patrón» y «Ciclos» controlan la guía respiratoria."],
 ["4. Inicia y sigue la sesión","La cuenta atrás registra el tiempo restante. Puedes pausar o detener. En respiración, la pantalla muestra la fase y el ciclo. En percusión, el navegador reproduce pulsos a volumen bajo."],
 ["5. Integra lo vivido","Al terminar, vuelve a tu actividad habitual y apunta cambios de atención o sensaciones en el Libro negro, sin interpretar esos cambios como prueba de efectos sobrenaturales."]
 ],
 note:"El repositorio contiene instrucciones para los 14 métodos. Algunas incluyen hiperventilación, agotamiento o dolor; ARCANA conserva su descripción histórica y sustituye la guía práctica por alternativas seguras."
 },
 servidores:{
 title:"Crear y gestionar servidores simbólicos",
 short:"Un «servidor» o servitor es una figura imaginada a la que se asignan tareas y reglas dentro del sistema ritual. El original permite crearla, alimentarla, ponerla en reposo, reactivarla y disolverla.",
 steps:[
 ["1. Define la finalidad","Escribe un propósito acotado y compatible con tus propias decisiones. Por ejemplo: «Recordarme que debo revisar mi agenda semanal»."],
 ["2. Da forma y nombre","Elige un nombre o usa «Proponer nombre». Describe su apariencia y el objeto físico o digital que actuaría como «alojamiento» o recordatorio."],
 ["3. Establece reglas","Anota qué gesto lo «activa», qué acción simbólica cuenta como «alimentación», con qué frecuencia y qué condiciones marcan su final."],
 ["4. Créalo y revisa su ficha","Pulsa «Crear y registrar servidor». Se guarda un sigilo propio y un historial de acciones. El repositorio original aconseja realizar después la ceremonia de creación del Arquitecto ritual."],
 ["5. Gestión periódica","«Alimentar» registra una actividad. «Reposo» suspende su estado activo; «Activar» lo recupera; «Disolver» marca un cierre permanente y conserva el historial."],
 ["6. Comprueba las alertas","El contador de alimentaciones pendientes usa la última fecha registrada y la periodicidad. La fecha de finalización sirve como referencia para revisar o disolver el servidor."]
 ],
 note:"Las instrucciones de creación, alojamiento, activación, alimentación y disolución aparecen en el flujo original del laboratorio. El almacenamiento local y las fichas visuales son adaptaciones."
 },
 oraculos:{
 title:"Cómo consultar los cuatro oráculos",
 short:"Los resultados se eligen por azar criptográfico. Son lecturas simbólicas para formular preguntas y explorar perspectivas, no herramientas de predicción.",
 steps:[
 ["1. Formula una pregunta abierta","Ejemplo: «¿Qué perspectivas me conviene considerar antes de decidir?». Evita tratar una tirada como confirmación de un hecho objetivo."],
 ["2. Estrella del caos","Selecciona una de ocho direcciones, asociada a uno de los ocho colores: octarino, negro, azul, verde, amarillo, púrpura, naranja y rojo."],
 ["3. Ocho colores","Genera dos colores: el primero representa la situación y el segundo una acción simbólica. Existen 8 × 8 = 64 combinaciones distintas."],
 ["4. Oráculo binario","Genera un número de 8 bits (0–255). Se muestran sus figuras superior e inferior de 4 bits y una de 16 interpretaciones."],
 ["5. Bibliomancia","Selecciona un pasaje de un repertorio textual. ARCANA utiliza fragmentos propios inspirados en el enfoque original, sin copiar citas literales extensas."],
 ["6. Revisa el historial","Cada consulta se guarda localmente con fecha, pregunta, método y resultado. Puedes usar las preguntas como punto de partida para el diario."]
 ],
 note:"Los cuatro motores, las ocho direcciones y el byte binario proceden del original. Las redacciones en castellano y la selección de pasajes en ARCANA son adaptaciones."
 },
 rituales:{
 title:"Cómo seguir y construir un ritual",
 short:"El repositorio contiene cinco rituales predefinidos y un creador de rituales propios; cada paso tiene nombre, descripción, instrucciones y una duración opcional.",
 steps:[
 ["1. Selecciona la plantilla","Elige entre Pentagrama gnóstico (GPR), Carga de sigilos, Creación de servidores, Invocación de arquetipos o Rayo gnóstico."],
 ["2. Examina todos sus pasos","«Cargar ritual» muestra el propósito y el recorrido completo. El GPR original tiene 15 pasos en el código, aunque su README resume menos."],
 ["3. Inicia la práctica","Pulsa «Iniciar / reiniciar». Cada paso tiene instrucciones en castellano y, si procede, un contador orientativo. Puedes retroceder o avanzar cuando quieras."],
 ["4. Presta atención al destierro","Las plantillas que llevan «destierro inicial/final» incluyen una opción para seguir el GPR antes o después del trabajo principal."],
 ["5. Guarda la ejecución","Al terminar, escribe tus notas y pulsa «Completar y guardar». El historial conserva los pasos realizados y si se completó."],
 ["6. Construye tu propio ritual","Escribe nombre, finalidad y una línea por paso: «Título | Instrucción | Segundos». Marca las casillas de apertura/cierre si deseas integrar el GPR y guarda la plantilla."]
 ],
 note:"Los cinco rituales y sus instrucciones proceden de src/data/gpr.ts. La navegación gráfica, el cronómetro y la edición de plantillas son una adaptación al navegador."
 },
 diario:{
 title:"Cómo llevar el Libro negro",
 short:"El original registra condiciones de la práctica, técnica, símbolos, intención, resultados, sueños, etiquetas, fases lunares y una ecuación simbólica atribuida a Peter Carroll.",
 steps:[
 ["1. Describe la práctica","Rellena técnica, estado corporal y mental, intención y símbolos. Deja por escrito qué hiciste antes de valorar lo ocurrido."],
 ["2. Registra la observación","Anota resultados observables, sueños y notas. Distingue lo que sucedió de tu interpretación personal."],
 ["3. Añade etiquetas y relaciones","Usa etiquetas como «meditación, concentración» y enlaza la entrada a un servidor o ritual guardado."],
 ["4. Ecuación de Carroll","Introduce cuatro puntuaciones de 0 a 10: gnosis (G), vínculo (L), conciencia de la intención (A) y resistencia (R). El cálculo es M=(G/10)×(L/10)×(1−A/10)×(1−R/10). Es una fórmula interna del sistema, no una magnitud científicamente validada."],
 ["5. Guarda y consulta","La fecha y la fase lunar se calculan automáticamente. Usa búsqueda libre, etiquetas, fechas, técnicas o fase lunar para encontrar entradas."],
 ["6. Interpreta las estadísticas","El Libro negro muestra número de prácticas, rachas, técnicas frecuentes, fases lunares y etiquetas; son recuentos descriptivos, sin inferir causalidad."]
 ],
 note:"El diario y sus filtros y estadísticas están en src/core/diary.ts y src/cli/diary-flow.ts. ARCANA añade edición de notas, borrado y respaldo JSON."
 }
 };
 const fieldHelp={
 "si-intent":"Escribe una intención en presente, afirmativa y referida a tu propia conducta. Ejemplo: «Termino mis tareas con constancia».",
 "si-method":"Spare: trazos de letras únicas; Rueda: ruta entre letras; Saturno: recorrido numérico sobre un cuadrado 3×3.",
 "g-min":"Tiempo total de la sesión. En respiración, el número de ciclos determina la duración efectiva.",
 "g-bpm":"Pulsos por minuto del metrónomo. Solo afecta a «Percusión rítmica».",
 "g-mantra":"Palabra o sonido para el ejercicio de repetición. No se envía a ningún servidor.",
 "g-pattern":"Inhalación–pausa–exhalación, en segundos. El patrón 4–0–6 evita retenciones.",
 "g-cycles":"Número de veces que se repetirá el patrón respiratorio seleccionado.",
 "sv-name":"Nombre identificativo del servidor simbólico. Puedes escribirlo o generar uno aleatorio.",
 "sv-purpose":"Una tarea delimitada y comprobable, formulada sin vulnerar decisiones o consentimiento de terceros.",
 "sv-appearance":"Cómo imaginas su forma: colores, figura, textura, aspecto o carácter simbólico.",
 "sv-housing":"Objeto, imagen o archivo que usarías como recordatorio tangible de la práctica.",
 "sv-trigger":"Palabra, gesto o señal que significará para ti «activar» el servidor.",
 "sv-feeding":"Acción simbólica que vas a registrar como alimentación: contemplar su sigilo, revisar tu objetivo, etc.",
 "sv-frequency":"Cada cuánto quieres registrar esa acción: todos los días, cada semana o cada mes.",
 "sv-end":"Fecha de revisión o cierre previsto. Es opcional y no ejecuta automáticamente la disolución.",
 "sv-condition":"Circunstancia que determinaría el fin: objetivo revisado, fecha alcanzada o cambio de prioridades.",
 "sv-dissolution":"Acción simbólica de cierre: guardar el objeto, borrar el sigilo o escribir una nota final.",
 "or-question":"Pregunta abierta para reflexionar. Evita usar una tirada para confirmar hechos, diagnósticos o decisiones de alto impacto.",
 "or-method":"Estrella: una dirección. Ocho colores: combinación de dos. Binario: ocho bits. Bibliomancia: un fragmento.",
 "rt-template":"Elige una de las cinco plantillas originales o una creación guardada.",
 "rt-notes":"Apunta qué pasos realizaste y qué observaste. Se guardará con la ejecución.",
 "rt-name":"Nombre que identificará tu ritual personalizado.",
 "rt-purpose":"Qué representa o qué quieres explorar durante este ritual.",
 "rt-steps":"Cada línea representa un paso. Formato: «Nombre | Instrucción | Duración en segundos». Ejemplo: «Apertura | Preparar el espacio | 30».",
 "dj-tech":"Nombre de la técnica o modalidad practicada.",
 "dj-body":"Describe cómo estaba tu cuerpo: energía, postura, tensión o cansancio.",
 "dj-mind":"Describe tu nivel de concentración, ánimo y pensamientos.",
 "dj-intent":"Escribe el propósito que habías formulado antes de la práctica.",
 "dj-symbols":"Anota imágenes, símbolos, palabras o asociaciones que aparecieron.",
 "dj-result":"Registra solo lo observable; distingue hechos de interpretaciones.",
 "dj-dreams":"Anota el recuerdo de un sueño, si existe. No es obligatorio.",
 "dj-notes":"Comentarios que quieras conservar para comparar prácticas posteriores.",
 "dj-tags":"Palabras separadas por comas para encontrar entradas con el filtro de etiquetas.",
 "dj-servitor":"Si la entrada guarda relación con un servidor creado, puedes vincularlo.",
 "dj-ritual":"Selecciona el ritual asociado a la entrada, si lo hubo.",
 "dj-g":"De 0 a 10: profundidad subjetiva del estado de concentración.",
 "dj-l":"De 0 a 10: fuerza subjetiva del vínculo con el símbolo.",
 "dj-a":"De 0 a 10: nivel subjetivo de conciencia de la intención.",
 "dj-r":"De 0 a 10: resistencia o interferencias que percibiste.",
 "dj-search":"Buscará coincidencias en todas las entradas del diario.",
 "dj-tag":"Filtra entradas que contengan esta etiqueta.",
 "dj-filtertech":"Restringe a una técnica concreta del catálogo.",
 "dj-phase":"Filtra entradas de la fase lunar seleccionada.",
 "dj-from":"Fecha inicial del intervalo de búsqueda.",
 "dj-to":"Fecha final del intervalo de búsqueda."
 };
 const actionsHelp={
 "sdraw":"Actualiza el dibujo con la intención y el método seleccionados.",
 "ssave":"Guarda intención, método, letras y fecha en este navegador.",
 "ssvg":"Descarga el sigilo como imagen vectorial, adecuada para imprimir sin perder resolución.",
 "spng":"Descarga el sigilo como imagen PNG de 840 × 840 píxeles.",
 "sdissolve":"Reproduce una desaparición visual. No elimina el registro guardado.",
 "sopen":"Recupera en el editor el sigilo seleccionado.",
 "sdelete":"Elimina definitivamente ese sigilo del archivo local.",
 "gselect":"Muestra los pasos de esta técnica y ajusta su duración recomendada.",
 "gstart":"Comienza la cuenta atrás con las opciones actuales.",
 "gpause":"Pausa o reanuda una sesión iniciada.",
 "gstop":"Interrumpe la sesión y detiene el sonido.",
 "svname":"Genera un nombre aleatorio según el patrón del programa original.",
 "svcreate":"Guarda la ficha y crea su sigilo automático.",
 "svdetail":"Muestra la ficha completa, incluido el historial cronológico.",
 "svfeed":"Registra una acción de alimentación. El contador de frecuencia toma esta fecha.",
 "svsleep":"Cambia el estado a reposo. Se suspenden las alertas de alimentación.",
 "svactivate":"Activa de nuevo un servidor en reposo.",
 "svdissolve":"Cierra el ciclo de ese servidor. El historial se conserva.",
 "or-read":"Selecciona el resultado mediante aleatoriedad criptográfica y lo archiva.",
 "rtload":"Muestra todos los pasos e instrucciones de la plantilla.",
 "rtstart":"Inicia la ejecución en el primer paso.",
 "rtprev":"Regresa al paso anterior sin borrar lo ya escrito.",
 "rtnext":"Avanza al siguiente paso. Puedes dedicar más tiempo del orientativo.",
 "rtfinish":"Guarda el resultado de la ejecución, completa o parcial.",
 "rtcustom":"Guarda la nueva plantilla personal para sesiones posteriores.",
 "rtdelete":"Elimina esta plantilla creada por ti.",
 "djsave":"Guarda la entrada con fecha, fase lunar, campos y puntuaciones.",
 "djfilter":"Aplica búsqueda y filtros acumulativos sobre las entradas guardadas.",
 "djclear":"Restablece los filtros y muestra todas las entradas.",
 "djdelete":"Elimina definitivamente esta entrada del diario.",
 "djedit":"Permite cambiar las notas de una entrada ya creada."
 };
 const formatField=A.field,formatSelect=A.select,formatCheck=A.check,formatButton=A.btn;
 A.field=function(label,id,value,kind,extra){const html=formatField.call(this,label,id,value,kind,extra);return html.replace("</div>",'<p class="field-help" id="help-'+id+'">'+this.safe(fieldHelp[id]||"")+'</p></div>')};
 A.select=function(label,id,options){const html=formatSelect.call(this,label,id,options);return html.replace("</div>",'<p class="field-help" id="help-'+id+'">'+this.safe(fieldHelp[id]||"")+'</p></div>')};
 A.check=function(label,id,checked){const h=formatCheck.call(this,label,id,checked);return h+'<p class="field-help">'+(id==="rt-before"?"Si se activa, se ofrecerá el GPR al iniciar el ritual.":"Si se activa, se ofrecerá el GPR al terminar.")+'</p>'};
 A.btn=function(txt,cmd,cls){return formatButton.call(this,txt,cmd,cls).replace('<button type="button"','<button title="'+this.safe(actionsHelp[cmd]||txt)+'" type="button"')};
 function tutorial(key){
 const info=H[key];return '<section class="manual"><div class="manual-header"><div><span class="manual-overline">GUÍA PASO A PASO</span><h3>'+info.title+'</h3><p>'+info.short+'</p></div><button type="button" class="manual-toggle" data-manual-toggle aria-expanded="true">Ocultar guía</button></div><div class="manual-body"><div class="manual-grid">'+info.steps.map(([title,desc])=>'<div class="manual-step"><h4>'+title+'</h4><p>'+desc+'</p></div>').join("")+'</div><p class="manual-note"><strong>Sobre el proyecto original:</strong> '+info.note+'</p></div></section>';
 }
 const methods=A.gnosis;
 const basis=()=>'<div class="notice">Practica a tu ritmo. Las técnicas se describen como tradiciones simbólicas. Ninguna lectura o ritual garantiza resultados externos.</div>';
 const previousRender=A.render;
 A.render=function(){previousRender.call(this);const screen=document.getElementById("screen");if(!screen)return;const html=tutorial(this.view);const intro=screen.querySelector(".intro");if(intro){intro.insertAdjacentHTML("afterend",html)}else screen.insertAdjacentHTML("afterbegin",html);
 screen.querySelectorAll(".formrow").forEach(el=>{const p=el.querySelector(".field-help");if(p&&!p.textContent.trim())p.remove()});
 screen.querySelectorAll("[data-manual-toggle]").forEach(b=>b.addEventListener("click",()=>{const section=b.closest(".manual"),body=section.querySelector(".manual-body"),visible=!body.hidden;body.hidden=visible;b.textContent=visible?"Mostrar guía":"Ocultar guía";b.setAttribute("aria-expanded",String(!visible))}));
 };
 const originalInit=A.init;
 A.init=function(){originalInit.call(this);this.toast("Manual de instrucciones incorporado a cada apartado")};
})(window.I1);