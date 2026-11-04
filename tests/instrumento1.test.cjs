"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs"),vm=require("node:vm"),{webcrypto}=require("node:crypto");
const els={};
const get=id=>els[id]??(els[id]={value:"",innerHTML:"",textContent:"",style:{},classList:{add(){},remove(){},toggle(){}},addEventListener(){},scrollIntoView(){},querySelector(){return null},querySelectorAll(){return []},insertAdjacentHTML(){}});
const mem=new Map();
const store={getItem:k=>mem.get(k)??null,setItem:(k,v)=>mem.set(k,v),removeItem:k=>mem.delete(k)};
const context={window:{scrollTo(){}},document:{getElementById:get,querySelectorAll:()=>[],querySelector:()=>null},localStorage:store,crypto:webcrypto,history:{replaceState(){}},location:{hash:""},confirm:()=>true,prompt:()=>"",console,Date,Math,JSON,Number,String,Array,Set,Map,URL,Uint32Array,clearTimeout,setTimeout,clearInterval,setInterval};
vm.createContext(context);
for(const f of ["instrumento1-core.js","instrumento1-rituales.js","instrumento1-vistas.js","instrumento1-acciones.js","instrumento1-mejoras.js","instrumento1-flujos.js","instrumento1-algoritmos.js","instrumento1-oraculo-fiel.js","instrumento1-pulido.js","instrumento1-manual.js","instrumento1-auditoria.js","instrumento1-bibliomancia.js"]){vm.runInContext(fs.readFileSync(f,"utf8"),context,{filename:f})}
const A=context.window.I1;
assert.equal(A.gnosis.length,14,"14 técnicas de gnosis");
assert.equal(A.builtins.length,5,"5 rituales");
assert.equal(A.builtins[0].steps.length,15,"GPR con quince pasos");
assert.equal(A.colors.length,8);
assert.equal(A.rand(0,0),0,"azar seguro sin sesgo fuera del rango");
assert.equal(A.process("La salud y el Éxito").unique,"LS DYX T".replace(/ /g,"").replace("D","D").slice(0,100).replace("DY","D Y").replace(/ /g,""),"Normalización de intención");
for(const method of ["spare","witch_circle","magic_square"]){
  const svg=A.sigilSvg("Mi proyecto progresa",method);
  assert(svg.includes("<svg")&&svg.includes("</svg>"),"SVG del método "+method);
}
for(const view of ["Sigils","Gnosis","Servitors","Oracles","Rituals","Diary"]){
  const html=A["view"+view]();assert(html.length>300,"vista "+view+" renderiza contenido");
}
A.view="sigilos";get("si-intent").value="Mi voluntad es clara";get("si-method").value="spare";A.actions.ssave();assert.equal(A.get("sigils").length,1);
A.view="servidores";get("sv-name").value="Aelor";get("sv-purpose").value="Planificar objetivos";get("sv-frequency").value="weekly";A.actions.svcreate();assert.equal(A.get("servitors").length,1);
const id=A.get("servitors")[0].id;A.actions.svfeed(id);assert(A.get("servitors")[0].lastFed,"servidor alimentado");
A.actions.svsleep(id);assert.equal(A.get("servitors")[0].status,"dormant");
A.actions.svactivate(id);assert.equal(A.get("servitors")[0].status,"active");
A.view="oraculos";get("or-method").value="colors";get("or-question").value="¿Qué debo revisar?";A.actions["or-read"]();assert.equal(A.get("oracles").length,1);assert(A.get("oracles")[0].details.includes("Interpretación original, traducida"));
A.view="rituales";get("rt-template").value="gpr";A.actions.rtload();assert.equal(A.ritual.steps.length,15);A.actions.rtstart();A.actions.rtnext();A.stop();
A.view="diario";get("dj-tech").value="Meditación";get("dj-intent").value="Claridad";A.actions.djsave();assert.equal(A.get("diary").length,1);
assert(A.viewSigils().includes("Secuencia guiada de carga"),"Guía interactiva de carga");
assert(A.viewGnosis().includes("field-help"),"Instrucciones de los campos");
assert(A.viewRituals().includes("field-help"),"Instrucciones rituales");
assert.equal(A.originalColorMatrix.length,8);
assert.equal(A.originalColorMatrix.flat().length,64);
assert(A.originalSigilGrid("El progreso","spare").length>0);
assert(A.originalSigilGrid("El progreso","witch_circle").length>0);
assert(A.originalSigilGrid("El progreso","magic_square").length>0);
A.view="sigilos";A.actions.schargeStart();assert.equal(A.chargeIndex,0);
A.actions.schargeNext();assert.equal(A.chargeIndex,1);
A.view="rituales";get("rt-template").value="invocation";A.actions.rtload();
get("rt-opening").checked=true;get("rt-closing").checked=true;
A.actions.rtstart();assert.equal(A.ritual.steps.length,37,"15 + 7 + 15 pasos");
A.actions.rtstart();assert.equal(A.ritual.steps.length,37,"reinicio sin duplicar pasos");
A.stop();
assert(A.viewDiary().includes("Todavía no has creado servidores")===false,"Hay un servidor ya creado");
mem.set("arcana_v1",JSON.stringify({
 serv:[{id:100,name:"Servidor anterior",purpose:"Organizar una tarea",status:"Pausado",limit:"Hasta terminar",date:"2026-07-11T12:00:00Z"}],
 diary:[{id:101,title:"Diario anterior",body:"Un apunte anterior",date:"2026-07-12T12:00:00Z"}]
}));
A.actions.legacyServitors();
A.actions.legacyDiary();
assert.equal(A.get("servitors").length,2,"Importa servidores antiguos");
assert.equal(A.get("diary").length,2,"Importa diario anterior");
A.actions.legacyServitors();
A.actions.legacyDiary();
assert.equal(A.get("servitors").length,2,"La migración no duplica servidores");
assert.equal(A.get("diary").length,2,"La migración no duplica diarios");
assert(A.viewDiary().includes("Servidor anterior"),"Aparece como seleccionable el servidor recuperado");
A.view="diario";get("dj-tech").value="Meditación";get("dj-intent").value="Registrar";
get("dj-servitor").value="legacy-srv-100";A.actions.djsave();
assert.equal(A.get("diary").at(-1).linkedServitorId,"legacy-srv-100","Se guarda vínculo con servidor recuperado");

assert(A.viewDiary().includes("Servidor anterior"),"El menú reconoce los servidores recuperados");
assert(A.viewOracles().includes("Biblioteca personal"),"Se muestra el editor de textos de bibliomancia");
get("bk-passage").value="Un fragmento propio de prueba";
get("bk-source").value="Escritura personal";
A.actions.bkAdd();
assert.equal(A.get("bibliomancy").length,1,"Se guarda un texto personal");
A.view="oraculos";get("or-question").value="Una consulta de prueba";get("or-method").value="book";
A.actions["or-read"]();
assert.equal(A.get("oracles").length,2,"Bibliomancia ejecutada");
A.actions.bkRemove(A.get("bibliomancy")[0].id);
assert.equal(A.get("bibliomancy").length,0,"Se elimina el texto personal");
A.applyDiary();
assert(get("dj-list").innerHTML.includes("Servidor anterior"),"Nombre del servidor vinculado");
console.log("PRUEBAS OK: 6 vistas, 3 sigilos, 14 técnicas, 5 rituales, guardar y gestión de servidores, oráculos y diario.");
