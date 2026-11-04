"use strict";
/* Bibliomancia: repertorio personal y último ajuste de la auditoría. */
(function(A){
 const prevView=A.viewOracles;
 A.viewOracles=function(){
   const base=prevView.call(this),items=this.get("bibliomancy");
   const library=this.panel("Biblioteca personal de bibliomancia",
     '<p>El método original permite elegir textos de un repertorio. Aquí puedes añadir tus propios fragmentos o reflexiones. La selección al azar utilizará tanto la biblioteca de ARCANA como tus textos.</p>'+
     this.field("Nuevo fragmento para la bibliomancia","bk-passage","","textarea")+
     this.field("Referencia o procedencia (opcional)","bk-source")+
     '<div class="actions">'+this.btn("Añadir a mi biblioteca","bkAdd")+'</div>'+
     '<div class="list">'+(items.length?items.map(x=>'<div class="entry"><p>'+this.safe(x.text)+'</p><small>'+this.safe(x.source||"Sin procedencia indicada")+'</small><div class="actions">'+this.btn("Eliminar","bkRemove","ghost").replace('data-action','data-id="'+this.safe(x.id)+'" data-action')+'</div></div>').join(""):'<p class="small">Tu biblioteca está vacía. La aplicación dispone de un repertorio inicial propio.</p>')+'</div>',
     "wide");
   return base.replace(/<\/div>\s*$/,library+"</div>");
 };
 A.actions.bkAdd=function(){
   const text=A.value("bk-passage").trim(),source=A.value("bk-source").trim();
   if(!text)return A.toast("Escribe un fragmento.");
   if(text.length>4000)return A.toast("El fragmento supera los 4.000 caracteres.");
   const record={id:A.id("bk"),text,source};
   if(A.put("bibliomancy",[...A.get("bibliomancy"),record])){A.render();A.toast("Fragmento añadido a la biblioteca.")};
 };
 A.actions.bkRemove=function(id){
   if(!confirm("¿Eliminar este fragmento de tu biblioteca personal?"))return;
   if(A.put("bibliomancy",A.get("bibliomancy").filter(x=>x.id!==id))){A.render();A.toast("Fragmento eliminado.")};
 };
 const originalOracle=A.actions["or-read"];
 A.actions["or-read"]=function(){
   const personal=A.get("bibliomancy").map(x=>x.text+" — "+(x.source||"Biblioteca personal"));
   A.bibliomancia=[...A.bibliomanciaBase||A.bibliomancia,...personal];
   A.bibliomanciaBase??=A.bibliomancia.slice(0,A.bibliomancia.length-personal.length);
   return originalOracle.call(A);
 };
 const prevExport=A.export;
 A.export=function(){
   const data={app:"ARCANA",version:2,date:this.now(),sigils:this.get("sigils"),servitors:this.get("servitors"),oracles:this.get("oracles"),customRituals:this.get("rituals"),ritualHistory:this.get("history"),diary:this.get("diary"),bibliomancy:this.get("bibliomancy")};
   this.download("arcana-caos-respaldo.json","application/json",JSON.stringify(data,null,2));
   this.toast("Copia de seguridad exportada (incluida la biblioteca personal).");
 };
 const oldImport=A.import;
 A.import=async function(file){
   if(!file)return;
   if(file.size>6*1024*1024)return this.toast("El archivo supera 6 MB.");
   try{
     const data=JSON.parse(await file.text()),fields=["sigils","servitors","oracles","customRituals","ritualHistory","diary"];
     if(data.app!=="ARCANA"||data.version!==2||!fields.every(k=>Array.isArray(data[k]))||(data.bibliomancy!==undefined&&!Array.isArray(data.bibliomancy)))return this.toast("Respaldo incompatible o incompleto.");
     if(!confirm("¿Restaurar el respaldo? Sustituirá las colecciones actuales. Puedes exportar antes una copia."))return;
     const mappings=[["sigils",data.sigils],["servitors",data.servitors],["oracles",data.oracles],["rituals",data.customRituals],["history",data.ritualHistory],["diary",data.diary]];
     if(data.bibliomancy!==undefined)mappings.push(["bibliomancy",data.bibliomancy]);
     const snapshots=mappings.map(([key])=>localStorage.getItem(A.prefix+key));
     try{mappings.forEach(([key,value])=>localStorage.setItem(A.prefix+key,JSON.stringify(value)))}
     catch(e){mappings.forEach(([key],i)=>{if(snapshots[i]===null)localStorage.removeItem(A.prefix+key);else localStorage.setItem(A.prefix+key,snapshots[i])});throw e}
     A.render();A.toast("Respaldo restaurado.");
   }catch(e){A.toast("Error de restauración: "+e.message)}
 };
})(window.I1);