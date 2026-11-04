"use strict";
/* Cinco rituales de origen y biblioteca de pasos: adaptación al castellano. */
(function(A){
 const step=(name,instruction,time=null)=>({name,instruction,time});
 A.builtins=[
 {id:"gpr",name:"Ritual gnóstico del pentagrama (GPR)",purpose:"Destierro y preparación simbólica del espacio",before:false,after:false,steps:[
 step("Preparación","Sitúate en el centro del espacio. Relaja los músculos y dirige la atención a la respiración.",30),
 step("Vibración I · coronilla","Entona «I» con una voz cómoda e imagina una esfera luminosa sobre la cabeza.",20),
 step("Vibración E · garganta","Entona «E» e imagina una sensación de luz en la garganta.",20),
 step("Vibración A · pecho","Entona «A» e imagina una luz que se extiende por el pecho.",20),
 step("Vibración O · abdomen","Entona «O» e imagina un foco de luz en el abdomen.",20),
 step("Vibración U · base","Entona «U» e imagina una luz en la base del cuerpo.",20),
 step("Primer pentagrama","Con el brazo extendido dibuja un pentagrama en el aire mientras entonas I-E-A-O-U.",30),
 step("Segundo pentagrama","Gira un cuarto de vuelta en sentido contrario a las agujas del reloj y repite el trazado y las vocales.",30),
 step("Tercer pentagrama","Vuelve a girar un cuarto de vuelta en sentido antihorario y repite el pentagrama.",30),
 step("Cuarto pentagrama","Haz otro cuarto de vuelta antihorario, dibuja el último pentagrama y completa el círculo.",30),
 step("Cierre U · base","Entona «U» en una exhalación natural.",15),
 step("Cierre O · abdomen","Entona «O» y desplaza la atención hacia el abdomen.",15),
 step("Cierre A · pecho","Entona «A» y presta atención a la zona del pecho.",15),
 step("Cierre E · garganta","Entona «E» y lleva la atención a la garganta.",15),
 step("Cierre I · coronilla","Entona «I», vuelve a una respiración normal y finaliza.",15)
 ]},
 {id:"sigil-charge",name:"Ceremonia de carga de sigilos",purpose:"Trabajo simbólico con una intención codificada",before:true,after:true,steps:[
 step("Preparar el espacio","Realiza tu destierro habitual o una breve preparación del espacio."),
 step("Declarar la intención","Contempla el sigilo y formula una última vez la intención que representa.",30),
 step("Concentración gnóstica","Utiliza un método de atención elegido para concentrarte en el símbolo."),
 step("Liberar el sigilo","En el momento que elijas, realiza un gesto de cierre simbólico.",15),
 step("Risa de destierro","Rí o cambia de actividad para señalar que la práctica ha terminado.",30),
 step("Desapego","Guarda, rompe o elimina el sigilo según prefieras. Evita la comprobación repetitiva de resultados.")
 ]},
 {id:"servitor-create",name:"Ceremonia de creación de servidores",purpose:"Crear y definir un servidor mágico simbólico",before:true,after:true,steps:[
 step("Preparar el espacio","Dispón el sigilo y las características escritas del servidor."),
 step("Declarar su nombre","Pronuncia tres veces el nombre que has elegido y visualiza su aspecto.",30),
 step("Definir su finalidad","Formula en voz alta su tarea concreta y sus límites.",30),
 step("Dar forma","Emplea tu método de concentración para imaginar el servidor y relacionarlo con su símbolo."),
 step("Establecer límites","Revisa la señal de activación, el método de alimentación y las condiciones de disolución.",30),
 step("Primera alimentación","Realiza la primera acción simbólica elegida para alimentar al servidor.",60),
 step("Sellar y cerrar","Declara terminada la creación y anota lo ocurrido.",30)
 ]},
 {id:"invocation",name:"Invocación de forma divina o arquetipo",purpose:"Exploración simbólica de las cualidades de una figura",before:true,after:true,steps:[
 step("Destierro inicial","Realiza el ritual de preparación que prefieras."),
 step("Investigación y preparación","Anota cualidades, símbolos y relatos asociados con la figura que quieres explorar."),
 step("Asunción de la forma","Adopta deliberadamente una postura corporal que asocies con el arquetipo.",60),
 step("Invocación","Pronuncia el nombre elegido y representa, de manera consciente, algunas de sus cualidades."),
 step("Comunión","Reflexiona o escribe desde la perspectiva simbólica del arquetipo y registra las ideas que surjan."),
 step("Desinvocación","Deshaz la postura y pronuncia tu propio nombre, cerrando la representación.",30),
 step("Destierro final","Concluye con tu ritual habitual y vuelve a tus actividades cotidianas.")
 ]},
 {id:"gnostic-thunderbolt",name:"Rayo gnóstico",purpose:"Cierre breve y activación simbólica",before:false,after:false,steps:[
 step("Enraizamiento","Coloca los pies cómodamente sobre el suelo y siente su apoyo.",10),
 step("Inspiración","Inspira de forma natural e imagina una luz que se reúne en el centro.",10),
 step("Concentración","Mantén la atención en esa imagen unos instantes; evita retener el aire si resulta incómodo.",5),
 step("Liberación del rayo","Exhala con naturalidad, abre los brazos e imagina una onda de luz expandiéndose.",5),
 step("Quietud","Permanece inmóvil un momento y termina.",10)
 ]}
 ];
 A.allRituals=function(){return [...this.builtins,...this.get("rituals")]};
})(window.I1);