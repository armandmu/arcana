"use strict";
/* Auditoría de coherencia, accesibilidad y migración segura de ARCANA v1. */
(function(A){
 const esc=s=>A.safe(s);
 const oldState=()=>{
   try{const s=JSON.parse(localStorage.getItem("arcana_v1"));return s&&typeof s==="object"?s:null}catch{return null}
 };
 const legacyRecords=()=>{
   const s=oldState()||{};
   const servers=Array.isArray(s.serv)?s.serv.filter(x=>x&&typeof x==="object"&&x.name):[];
   const diary=Array.isArray(s.diary)?s.diary.filter(x=>x&&typeof x==="object"&&(x.title||x.body)):[];
   const savedS=new Set(A.get("servitors").map(x=>String(x.id)));
   const savedD=new Set(A.get("diary").map(x=>String(x.id)));
   return {servers:servers.filter(x=>!savedS.has("legacy-srv-"+String(x.id))),diary:diary.filter(x=>!savedD.has("legacy-dj-"+String(x.id)))};
 };
 const oldViewServ=A.viewServitors;
 A.viewServitors=function(){
   let html=oldViewServ.call(this),legacy=legacyRecords();
   if(!legacy.servers.length)return html;
   const notice=this.panel("Recuperar servidores de la primera versión",
     '<div class="audit-notice"><strong>Hemos encontrado '+legacy.servers.length+' servidor(es) de ARCANA v1.</strong><p>La primera versión los guardaba en otra colección. Puedes importarlos sin borrar ningún servidor actual. Se conservará la información que existía en aquellas fichas.</p>'+
     this.btn("Recuperar servidores anteriores","legacyServitors","ghost")+'</div>',"wide");
   return html.replace(/<\/div>\s*$/,notice+"</div>");
 };
 const oldViewDiary=A.viewDiary;
 A.viewDiary=function(){
   let html=oldViewDiary.call(this),legacy=legacyRecords();
   if(!legacy.diary.length)return html;
   const notice=this.panel("Recuperar entradas del diario anterior",
     '<div class="audit-notice"><strong>Hemos encontrado '+legacy.diary.length+' entrada(s) del antiguo diario.</strong><p>Se pueden importar conservando las entradas actuales. Los campos que no existían antes quedarán vacíos.</p>'+
     this.btn("Recuperar entradas anteriores","legacyDiary","ghost")+'</div>',"wide");
   return html.replace(/<\/div>\s*$/,notice+"</div>");
 };
 A.actions.djToServitors=function(){A.show("servidores");A.toast("Crea un servidor y después vuelve al Libro negro para asociarlo.")};
 A.actions.legacyServitors=function(){
   const records=legacyRecords().servers;
   if(!records.length)return A.toast("No hay registros nuevos que importar.");
   if(!confirm("¿Importar "+records.length+" servidores de ARCANA v1 sin borrar los actuales?"))return;
   const converted=records.map(x=>{
     const date=x.date&&!isNaN(Date.parse(x.date))?x.date:A.now();
     const status={"Pausado":"dormant","Finalizado":"dissolved","Activo":"active"}[x.status]||"active";
     return {id:"legacy-srv-"+String(x.id),name:String(x.name),purpose:String(x.purpose||""),appearance:"",
       housing:"",activationTrigger:"",feedingMethod:"",frequency:"weekly",lastFed:null,lifespan:null,
       dissolutionCondition:String(x.limit||""),dissolutionMethod:"",sigil:A.sigilData(String(x.name)+" "+String(x.purpose||""),"spare"),
       createdAt:date,status,activityLog:[{date,action:"Importado de ARCANA v1",notes:"Datos originales conservados como estaban; comprueba y completa los detalles de la ficha."}]};
   });
   if(A.put("servitors",[...A.get("servitors"),...converted])){A.render();A.toast("Importados "+converted.length+" servidores. Los registros anteriores permanecen intactos.")};
 };
 A.actions.legacyDiary=function(){
   const records=legacyRecords().diary;
   if(!records.length)return A.toast("No hay entradas anteriores que importar.");
   if(!confirm("¿Importar "+records.length+" entradas del diario anterior sin borrar las actuales?"))return;
   const converted=records.map(x=>{
     const date=x.date&&!isNaN(Date.parse(x.date))?x.date:A.now();
     return {id:"legacy-dj-"+String(x.id),date,moon:A.moon(new Date(date)).name,bodyState:"",mentalState:"",technique:"",
       symbols:"",intent:String(x.title||""),result:"",dreams:"",notes:String(x.body||""),tags:["importado-v1"],
       linkedServitorId:"",linkedRitualId:"",equation:null};
   });
   if(A.put("diary",[...A.get("diary"),...converted])){A.render();A.toast("Importadas "+converted.length+" entradas. El antiguo diario sigue disponible.")};
 };
 const originalRender=A.render;
 A.render=function(){
   originalRender.call(this);
   if(this.view==="diario"){
     const related=document.getElementById("dj-servitor");
     const servants=this.get("servitors");
     if(related&&!servants.length){
       related.disabled=true;
       related.title="Todavía no hay servidores disponibles. Crea uno desde la pestaña Servidores.";
     }
     if(related&&servants.length){
       related.disabled=false;
       related.title="Asocia esta entrada a un servidor del laboratorio.";
     }
   }
 };
 const oldImport=A.import;
 A.import=async function(file){
   if(!file)return;
   if(file.size>6*1024*1024)return this.toast("El archivo supera 6 MB. Divide el respaldo antes de importarlo.");
   try{
     const data=JSON.parse(await file.text());
     const fields=["sigils","servitors","oracles","customRituals","ritualHistory","diary"];
     if(data.app!=="ARCANA"||data.version!==2||!fields.every(k=>Array.isArray(data[k])))
       return this.toast("Este archivo no es un respaldo válido del instrumento 1.");
     if(!confirm("¿Sustituir los datos de este instrumento por los del respaldo? Antes puedes exportar una copia."))return;
     const keys=["sigils","servitors","oracles","rituals","history","diary"];
     const backup={};
     for(const key of keys)backup[key]=localStorage.getItem(this.prefix+key);
     try{
       for(let i=0;i<keys.length;i++)localStorage.setItem(this.prefix+keys[i],JSON.stringify(data[fields[i]]));
     }catch(error){
       for(const key of keys){if(backup[key]===null)localStorage.removeItem(this.prefix+key);else localStorage.setItem(this.prefix+key,backup[key])}
       throw error;
     }
     this.render();this.toast("Respaldo importado correctamente.");
   }catch(error){this.toast("No se pudo importar: "+error.message)}
 };
})(window.I1);