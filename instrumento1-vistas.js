"use strict";
(function(A){
 A.viewSigils=function(){
 const history=this.get("sigils");
 return this.head("Forja de sigilos","Tres métodos del proyecto original: letras superpuestas de Spare, rueda de la bruja y kamea de Saturno. Intención → símbolo → archivo.")
 +'<div class="layout">'+this.panel("Crear un sigilo",'<div class="stack">'
 +this.field("Declaración de intención","si-intent","Mi proyecto avanza con claridad","textarea")
 +this.select("Método de creación","si-method",[["spare","Spare: superposición de letras"],["witch_circle","Rueda de sigilos (tres anillos)"],["magic_square","Cuadrado mágico de Saturno (3 × 3)"]])
 +'<div class="notice" id="si-letters">Vocales y letras repetidas eliminadas automáticamente.</div>'
 +'<div class="actions">'+this.btn("Generar / actualizar","sdraw")+this.btn("Guardar en mi archivo","ssave")+
 this.btn("Descargar SVG","ssvg","ghost")+this.btn("Descargar PNG","spng","ghost")+this.btn("Disolver símbolo","sdissolve","ghost")+'</div></div>')
 +this.panel("Vista del sigilo",'<div id="sigilPreview" class="art"></div><p class="small">Gráfico SVG vectorial generado en tu navegador. La «disolución» es una animación visual, no elimina el archivo guardado.</p>')
 +this.panel("Sigilos guardados",history.length?'<div class="list">'+history.slice().reverse().map(s=>'<div class="entry"><h4>'+this.safe(s.intent)+'</h4><small>'+this.safe(s.method)+' · '+this.date(s.createdAt)+' · '+this.safe(s.letters)+'</small><div class="actions">'+this.btn("Ver","sopen","ghost").replace('data-action','data-id="'+this.safe(s.id)+'" data-action')+this.btn("Eliminar","sdelete","ghost").replace('data-action','data-id="'+this.safe(s.id)+'" data-action')+'</div></div>').join("")+'</div>':'<p>No hay sigilos guardados todavía.</p>',"wide")+'</div>';
 };
 A.viewGnosis=function(){
 const methods=this.gnosis;const types=[["inhibitoria","Inhibitorias"],["excitatoria","Excitatorias"]];
 return this.head("Motor de gnosis","14 técnicas del catálogo original, sesiones temporizadas, guía de respiración, repetición de mantras y metrónomo. Las prácticas de riesgo se presentan con adaptaciones seguras.")
 +'<div class="layout">'+this.panel("Elegir técnica",types.map(t=>'<h4>'+t[1]+'</h4><div class="choices">'+methods.filter(m=>m[2]===t[0]).map(m=>this.btn(this.safe(m[1]),"gselect","ghost").replace('data-action','data-id="'+m[0]+'" data-action')).join("")+'</div>').join("")+
 '<div class="notice" style="margin-top:15px">El catálogo documenta 14 técnicas. La aplicación no dirige hiperventilación, posturas hasta el colapso ni ejercicios deliberadamente dolorosos.</div>')
 +this.panel("Sesión guiada",'<div id="g-method" class="stack"><h4>Selecciona una técnica</h4></div><div class="two">'+this.field("Duración (minutos)","g-min",10,"number",'min="1" max="120"')+this.field("Ritmo del metrónomo (BPM)","g-bpm",80,"number",'min="30" max="220"')+'</div>'+
 this.field("Mantra (opcional)","g-mantra","IAO")+'<div class="two">'+this.select("Patrón respiratorio","g-pattern",[["4-0-6","4–0–6 suave"],["4-4-6","4–4–6"],["4-7-8","4–7–8"],["6-0-6","6–0–6"]])+this.field("Ciclos respiratorios","g-cycles",8,"number",'min="1" max="100"')+'</div>'+
 '<div class="timer" id="g-clock">00:00</div><div class="bar"><span id="g-progress"></span></div><p id="g-phase" class="muted">Sesión sin iniciar.</p><div class="actions">'+this.btn("Iniciar sesión","gstart")+this.btn("Pausar / reanudar","gpause","ghost")+this.btn("Detener","gstop","ghost")+'</div><p class="small">Usa un volumen moderado con el metrónomo. La respiración guiada se detiene al terminar los ciclos.</p>')+'</div>';
 };
 A.viewServitors=function(){
 const rows=this.get("servitors"),over=rows.filter(x=>x.status==="active" && (!x.lastFed||Date.now()-Date.parse(x.lastFed)>({daily:86400000,weekly:604800000,monthly:2592000000}[x.frequency]||604800000)));
 return this.head("Laboratorio de servidores","Creación, nombre generado, sigilo, apariencia, alojamiento, señal de activación, alimentación, reposo, activación, disolución e historial.")
 +'<div class="layout">'+this.panel("Crear servidor",'<div class="stack">'+this.field("Nombre","sv-name","")+this.btn("Proponer nombre","svname","ghost")
 +this.field("Propósito concreto","sv-purpose","","textarea")
 +this.field("Apariencia simbólica","sv-appearance","","textarea")
 +this.field("Alojamiento u objeto asociado","sv-housing")
 +this.field("Señal de activación","sv-trigger")
 +this.field("Método de alimentación","sv-feeding")
 +this.select("Frecuencia","sv-frequency",[["daily","Diaria"],["weekly","Semanal"],["monthly","Mensual"]])
 +this.field("Fecha de finalización opcional","sv-end","","date")
 +this.field("Condición de disolución","sv-condition","","textarea")
 +this.field("Método de disolución","sv-dissolution")
 +this.btn("Crear y registrar servidor","svcreate")+'</div>')
 +this.panel("Servidores registrados",'<div class="stats"><div class="stat"><strong>'+rows.length+'</strong><span>Total</span></div><div class="stat"><strong>'+rows.filter(x=>x.status==="active").length+'</strong><span>Activos</span></div><div class="stat"><strong>'+over.length+'</strong><span>Alimentaciones pendientes</span></div></div>'+
 '<div class="list" style="margin-top:13px">'+(rows.length?rows.slice().reverse().map(x=>'<div class="entry"><h4>'+this.safe(x.name)+'</h4><small>'+this.safe({active:"Activo",dormant:"En reposo",dissolved:"Disuelto"}[x.status])+(over.some(o=>o.id===x.id)?' · Alimentación pendiente':'')+'</small><p>'+this.safe(x.purpose)+'</p><small>Última alimentación: '+this.date(x.lastFed)+'</small><div class="actions">'
 +this.btn("Ficha","svdetail","ghost").replace('data-action','data-id="'+this.safe(x.id)+'" data-action')+
 (x.status!=="dissolved"?this.btn("Alimentar","svfeed","ghost").replace('data-action','data-id="'+this.safe(x.id)+'" data-action')+
 this.btn(x.status==="active"?"Reposo":"Activar",x.status==="active"?"svsleep":"svactivate","ghost").replace('data-action','data-id="'+this.safe(x.id)+'" data-action')+
 this.btn("Disolver","svdissolve","ghost").replace('data-action','data-id="'+this.safe(x.id)+'" data-action'):"")+'</div></div>').join(""):'<p>Aún no has creado servidores.</p>')+'</div>')+
 this.panel("Ficha e historial",'<div id="sv-detail" class="result">Selecciona «Ficha» para consultar todos los datos y el registro de actividades.</div>',"wide")+'</div>';
 };
 A.viewOracles=function(){
 const hist=this.get("oracles");
 return this.head("Oráculo del caos","Cuatro métodos: estrella del caos, ocho colores de Carroll (64 combinaciones), oráculo binario de 8 bits y bibliomancia. La selección emplea números aleatorios criptográficos del navegador.")
 +'<div class="layout">'+this.panel("Nueva consulta",this.field("Pregunta o reflexión","or-question","","textarea")+
 this.select("Método","or-method",[["star","Estrella del caos · 8 direcciones"],["colors","Ocho colores · 64 interpretaciones"],["binary","Oráculo binario · 8 bits"],["book","Bibliomancia · fragmentos"]])+
 this.btn("Realizar lectura","or-read")+'<div class="notice" style="margin-top:15px">Las lecturas son estímulos simbólicos y aleatorios. No predicen sucesos futuros.</div>')
 +this.panel("Resultado",'<div id="or-result" class="result">Formula una pregunta y elige un método.</div><div id="or-visual"></div>')
 +this.panel("Historial de consultas",hist.length?'<div class="list">'+hist.slice().reverse().map(x=>'<div class="entry"><small>'+this.date(x.date)+' · '+this.safe(x.method)+'</small><h4>'+this.safe(x.question||"Sin pregunta")+'</h4><p>'+this.safe(x.text)+'</p></div>').join("")+'</div>':'<p>Sin consultas guardadas.</p>',"wide")+'</div>';
 };
 A.viewRituals=function(){
 const list=this.allRituals(),history=this.get("history");
 return this.head("Arquitecto ritual","Los cinco rituales originales traducidos, guía paso a paso con cronómetro, historial de ejecuciones y constructor de rituales personalizados.")
 +'<div class="layout">'+this.panel("Seleccionar ritual",this.select("Plantilla","rt-template",list.map(x=>[x.id,x.name]))+this.btn("Cargar ritual","rtload")+
 '<p class="small">Los rituales originales incluyen el pentagrama gnóstico completo, carga del sigilo, creación del servidor, invocación y rayo gnóstico.</p><div id="rt-info"></div>')
 +this.panel("Ejecución guiada",'<div id="rt-progress" class="result">Carga un ritual para ver sus pasos.</div><div class="timer" id="rt-clock">00:00</div><div class="actions">'+this.btn("Iniciar / reiniciar","rtstart")+this.btn("Paso anterior","rtprev","ghost")+this.btn("Siguiente paso","rtnext","ghost")+this.btn("Completar y guardar","rtfinish","ghost")+'</div>'+this.field("Notas de ejecución","rt-notes","","textarea"))
 +this.panel("Constructor de ritual propio",this.field("Nombre del ritual","rt-name")+this.field("Finalidad","rt-purpose","","textarea")+
 this.field("Pasos: uno por línea (Título | Instrucción | Segundos opcionales)","rt-steps","Preparación | Prepara el espacio | 30\nIntención | Formula tu propósito | 60\nCierre | Anota una reflexión | 30","textarea",'rows="7"')+
 this.check("Destierro inicial","rt-before",true)+'<p></p>'+this.check("Destierro final","rt-after",true)+'<div class="actions">'+this.btn("Guardar ritual","rtcustom")+'</div>'+
 '<div class="list">'+this.get("rituals").map(x=>'<div class="entry"><h4>'+this.safe(x.name)+'</h4>'+this.btn("Borrar","rtdelete","ghost").replace('data-action','data-id="'+this.safe(x.id)+'" data-action')+'</div>').join("")+'</div>')
 +this.panel("Historial de prácticas",history.length?'<div class="list">'+history.slice().reverse().map(x=>'<div class="entry"><h4>'+this.safe(x.name)+'</h4><small>'+this.date(x.startedAt)+' · '+x.stepsCompleted+' pasos · '+(x.completedAt?"Completado":"Sin terminar")+'</small><p>'+this.safe(x.notes)+'</p></div>').join("")+'</div>':'<p>No hay ejecuciones registradas.</p>')+'</div>';
 };
 A.viewDiary=function(){
 const entries=this.get("diary"), allTech=[["","Cualquier técnica"],...this.gnosis.map(m=>[m[1],m[1]])];let phases=[["","Cualquier fase"],...["Luna nueva","Creciente","Cuarto creciente","Gibosa creciente","Luna llena","Gibosa menguante","Cuarto menguante","Menguante"].map(p=>[p,p])];
 return this.head("Libro negro · diario mágico","Registro completo de la práctica con estados, símbolos, resultados, sueños, etiquetas, fase lunar automática, ecuación de Carroll, filtros y estadísticas.")
 +'<div class="layout">'+this.panel("Nueva entrada",'<div class="stack">'+this.field("Técnica o tipo de práctica","dj-tech")+
 this.field("Estado corporal","dj-body","","textarea")+this.field("Estado mental","dj-mind","","textarea")+
 this.field("Intención","dj-intent","","textarea")+this.field("Símbolos y asociaciones","dj-symbols","","textarea")+
 this.field("Resultado observado","dj-result","","textarea")+this.field("Sueños","dj-dreams","","textarea")+
 this.field("Notas","dj-notes","","textarea")+this.field("Etiquetas (separadas por comas)","dj-tags")+
 this.select("Servidor relacionado","dj-servitor",[["","Sin servidor asociado"],...this.get("servitors").map(x=>[x.id,x.name+" · "+({active:"activo",dormant:"en reposo",dissolved:"disuelto"}[x.status]||"sin estado")])])+(this.get("servitors").length===0?'<div class="empty-link"><p>Todavía no has creado servidores. Este campo es opcional; puedes guardar el diario sin vincular ninguno.</p>'+this.btn("Crear mi primer servidor","djToServitors","ghost")+'</div>':'<p class="small muted">Vincula un servidor de tu laboratorio si este registro forma parte de su práctica.</p>')+
 this.select("Ritual relacionado","dj-ritual",[["","Ninguno"],...this.allRituals().map(x=>[x.id,x.name])])+
 '<h4>Ecuación simbólica de Carroll</h4><p class="small">M = (G/10) × (L/10) × (1 − A/10) × (1 − R/10). Es un indicador interno del modelo, no una medición de efectos.</p>'
 +'<div class="two">'+this.field("Gnosis · G (0–10)","dj-g",5,"number",'min="0" max="10"')+
 this.field("Vínculo simbólico · L (0–10)","dj-l",5,"number",'min="0" max="10"')+
 this.field("Conciencia de intención · A (0–10)","dj-a",5,"number",'min="0" max="10"')+
 this.field("Resistencia · R (0–10)","dj-r",5,"number",'min="0" max="10"')+'</div>'+this.btn("Guardar entrada","djsave")+'</div>')
 +this.panel("Buscar y filtrar",this.field("Buscar en todo el texto","dj-search")+this.field("Filtrar por etiqueta","dj-tag")+
 this.select("Técnica","dj-filtertech",allTech)+this.select("Fase lunar","dj-phase",phases)+
 '<div class="two">'+this.field("Desde","dj-from","","date")+this.field("Hasta","dj-to","","date")+'</div>'+
 '<div class="actions">'+this.btn("Aplicar filtros","djfilter")+this.btn("Limpiar filtros","djclear","ghost")+'</div><div id="dj-stats" class="stats" style="margin-top:18px"></div>')
 +this.panel("Entradas del diario",'<div id="dj-list" class="list"></div>',"wide")+'</div>';
 };
})(window.I1);