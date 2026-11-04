"use strict";
/* Cierre de funciones del flujo original: carga, olvido y destierros. */
(function(A){
 const esc=s=>A.safe(s);
 const originalSigils=A.viewSigils;
 A.viewSigils=function(){
  const html=originalSigils.call(this);
  const charge=this.panel("Secuencia guiada de carga y olvido del sigilo",
   '<p>El asistente original conduce por concentración, respiración, liberación, risa y olvido. Puedes utilizar esta versión breve, adaptada para realizarla sentado y sin retenciones forzadas.</p>'+
   '<div id="charge-instructions" class="learning-steps"></div>'+
   '<div class="actions">'+this.btn("Iniciar carga","schargeStart")+this.btn("Paso siguiente","schargeNext","ghost")+this.btn("Reiniciar","schargeReset","ghost")+'</div>'+
   '<p class="small">No hay una medición de «carga». Estos pasos son instrucciones rituales simbólicas y opcionales.</p>',
   "wide");
  return html.replace("</div>", "</div>") .replace(/<\/div>\s*$/, charge+"</div>");
 };
 const steps=[
  ["Preparar el símbolo","Genera el sigilo y observa sus formas. Si lo deseas, colócalo a la altura de los ojos."],
  ["Concentración","Dedica un minuto a mirar el diseño o imaginarlo. Mantén una respiración espontánea."],
  ["Respiración consciente","Inspira cómodamente y espira con calma tres veces. No fuerces pausas ni retenciones."],
  ["Liberación simbólica","Cuando decidas terminar, acompaña una exhalación normal con un gesto, una palabra o una palmada suave."],
  ["Risa y cambio de estado","Sonríe, ríe si te apetece o cambia deliberadamente de postura. La práctica ritual ha terminado."],
  ["Olvido y disolución","Si quieres, pulsa «Disolver símbolo» en el generador. No hace falta borrar un archivo que quieras conservar. Retoma otra actividad."]
 ];
 A.chargeIndex=-1;
 A.chargeDraw=function(){const el=document.getElementById("charge-instructions");if(!el)return;el.innerHTML=steps.map(([title,desc],i)=>'<div class="learning-step '+(i===A.chargeIndex?"active":i<A.chargeIndex?"done":"")+'"><strong>'+esc((i+1)+". "+title)+'</strong><p>'+esc(desc)+'</p></div>').join("")};
 A.actions.schargeStart=function(){A.chargeIndex=0;A.chargeDraw();A.toast("Secuencia iniciada: sigue el paso destacado")};
 A.actions.schargeNext=function(){if(A.chargeIndex<0){A.actions.schargeStart();return}A.chargeIndex=Math.min(steps.length-1,A.chargeIndex+1);A.chargeDraw();A.toast(A.chargeIndex===steps.length-1?"Último paso de la secuencia":"Paso "+(A.chargeIndex+1)+" de "+steps.length)};
 A.actions.schargeReset=function(){A.chargeIndex=-1;A.chargeDraw();A.toast("Secuencia reiniciada")};
 const originalRender=A.render;
 A.render=function(){originalRender.call(this);if(this.view==="sigilos")this.chargeDraw();if(this.view==="gnosis"){
  const technique=this.gchoice;
  if(technique==="gazing")this.focusView();
 }};
 A.focusView=function(){const el=document.getElementById("g-method");if(el&&!el.querySelector(".focus"))el.insertAdjacentHTML("beforeend",'<div class="focus" aria-label="Punto para el ejercicio de contemplación"><span></span></div>')};
 const originalSelect=A.actions.gselect;
 A.actions.gselect=function(id){originalSelect.call(A,id);if(id==="gazing")A.focusView()};
 // Corregir estados: solo se alimentan servidores activos y no disueltos.
 const originalUpdate=A.actions.svupdate;
 A.actions.svupdate=function(id,action){
  const srv=A.get("servitors").find(x=>x.id===id);
  if(!srv)return A.toast("No se encuentra ese servidor");
  if(action==="alimentar"&&srv.status!=="active")return A.toast("Activa antes el servidor para registrar su alimentación");
  if(action==="activar"&&srv.status==="active")return A.toast("El servidor ya está activo");
  if(action==="reposo"&&srv.status!=="active")return A.toast("Solo pueden ponerse en reposo servidores activos");
  return originalUpdate.call(A,id,action);
 };
 const originalCreate=A.actions.svcreate;
 A.actions.svcreate=function(){
  originalCreate.call(A);
  const last=A.get("servitors").at(-1);
  if(last&&Date.now()-new Date(last.createdAt).getTime()<1500)A.toast("Servidor guardado. Para completar el proceso original, realiza la ceremonia de creación en «Rituales»");
 };
 const originalLoad=A.actions.rtload;
 A.actions.rtload=function(){
  originalLoad.call(A);
  const r=A.ritual;
  if(!r)return;
  const el=document.getElementById("rt-info");
  if(!el)return;
  const opening=r.id!=="gpr"&&r.id!=="gnostic-thunderbolt"&&Boolean(r.before);
  const closing=r.id!=="gpr"&&r.id!=="gnostic-thunderbolt"&&Boolean(r.after);
  el.insertAdjacentHTML("beforeend",'<div class="ritual-stage">'+
   '<h4>Preparación y cierre (opciones del original)</h4>'+
   '<p class="small">Si activas una opción, sus pasos se ejecutarán realmente, antes o después del trabajo central.</p>'+
   '<label><input type="checkbox" id="rt-opening" '+(opening?"checked":"")+(r.id==="gpr"?" disabled":"")+'> Ejecutar GPR de apertura (15 pasos)</label>'+
   '<label><input type="checkbox" id="rt-closing" '+(closing?"checked":"")+(r.id==="gpr"?" disabled":"")+'> Ejecutar GPR de cierre (15 pasos)</label>'+
   '<small>El GPR forma parte de las tradiciones de destierro recogidas por el programa original. Su ejecución aquí es una práctica simbólica.</small></div>');
 };
 const originalStart=A.actions.rtstart;
 A.actions.rtstart=function(){
  const selected=A.ritual;
  if(!selected){A.actions.rtload();if(!A.ritual)return}
  const source=A.ritual,opening=document.getElementById("rt-opening")?.checked,closing=document.getElementById("rt-closing")?.checked;
  const gpr=A.builtins.find(x=>x.id==="gpr");
  if(!gpr)return originalStart.call(A);
  let queue=[];
  if(opening&&source.id!=="gpr")queue=queue.concat(gpr.steps.map(x=>({...x,name:"Apertura · "+x.name})));
  queue=queue.concat(source.steps.map(x=>({...x,name:"Trabajo principal · "+x.name})));
  if(closing&&source.id!=="gpr")queue=queue.concat(gpr.steps.map(x=>({...x,name:"Cierre · "+x.name})));
  A.ritual={...source,steps:queue};
  A.ritualIdx=0;A.ritualStarted=A.now();A.rtShow();
  A.toast("Práctica iniciada: "+queue.length+" pasos");
 };
 const originalNext=A.actions.rtnext;
 A.actions.rtnext=function(){
  if(!A.ritual)return originalNext.call(A);
  if(A.ritualIdx===A.ritual.steps.length-1)return A.toast("Último paso. Finaliza y guarda la práctica");
  return originalNext.call(A);
 };
 const originalSave=A.actions.ssave;
 A.actions.ssave=function(){const text=A.value("si-intent");if(!A.process(text).unique)return A.toast("La frase no contiene consonantes válidas. Reformula la intención.");originalSave.call(A)};
})(window.I1);