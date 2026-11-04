"use strict";
/* Validaciones, reproducción controlada y pulido final del instrumento 1. */
(function(A){
 const oldOr=A.actions["or-read"];
 A.actions["or-read"]=function(){if(!A.value("or-question").trim())return A.toast("Escribe una pregunta para la consulta.");return oldOr.call(A)};
 const oldLoad=A.actions.rtload;
 A.actions.rtload=function(){oldLoad.call(A);A.ritualBase=A.ritual};
 const oldStart=A.actions.rtstart;
 A.actions.rtstart=function(){if(A.ritualBase)A.ritual=A.ritualBase;return oldStart.call(A)};
 const oldDraw=A.actions.sdraw;
 A.actions.sdraw=function(){
 oldDraw.call(A);
 const el=document.getElementById("si-letters");
 if(el){const norm=A.normal(A.value("si-intent")),withoutVowels=[...norm].filter(x=>!"AEIOU".includes(x));el.innerHTML="<strong>Reducción de letras</strong><p>Consonantes, antes de eliminar duplicados: <code>"+A.safe(withoutVowels.join(" "))+"</code></p><p>Consonantes sin repeticiones: <code>"+A.safe(A.process(A.value("si-intent")).unique.split("").join(" "))+"</code></p><p class='small'>Si tu frase contiene solo vocales, reformúlala antes de guardar.</p>"}
 };
 const originalDissolve=A.actions.sdissolve;
 A.actions.sdissolve=function(){
  if(A.dissolutionTimer){clearInterval(A.dissolutionTimer);A.dissolutionTimer=null}
  originalDissolve.call(A);
  const el=document.getElementById("sigil-code");if(!el)return;
  const original=el.textContent;
  if(!original.trim())return;
  const palette=["░","▒","▓","█"," "," "," "];let i=0;
  A.dissolutionTimer=setInterval(()=>{
   i++;
   const chance=i/5;
   el.textContent=[...original].map(ch=>ch===" "||ch==="\n"?ch:(A.rand(0,1000)/1000<chance?A.pick(palette):ch)).join("");
   if(i>=5){clearInterval(A.dissolutionTimer);A.dissolutionTimer=null;el.textContent="El sigilo se ha disuelto simbólicamente.\nPulsa «Generar / actualizar» para recuperar el trazado."}
  },300);
 };
 const oldStop=A.stop;
 A.stop=function(){oldStop.call(this);if(this.dissolutionTimer){clearInterval(this.dissolutionTimer);this.dissolutionTimer=null}};
 const oldServitors=A.viewServitors;
 A.viewServitors=function(){
  const html=oldServitors.call(this),past=this.get("servitors").filter(x=>x.status!=="dissolved"&&x.lifespan&&new Date(x.lifespan+"T23:59:59")<new Date());
  if(!past.length)return html;
  const note=this.panel("Fechas de finalización pendientes de revisión",'<div class="important">Estos servidores han superado su fecha prevista de finalización, pero <strong>no se disuelven automáticamente</strong>. Revisa sus condiciones de cierre y decide qué hacer:</div><ul>'+past.map(x=>'<li>'+this.safe(x.name)+" · "+this.safe(x.lifespan)+'</li>').join("")+"</ul>","wide");
  return html.replace(/<\/div>\s*$/,note+"</div>");
 };
})(window.I1);