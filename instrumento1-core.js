"use strict";
/* ARCANA instrumento 1. Adaptación al navegador de Chaos Magick Toolkit (MIT).
   Proyecto original: https://github.com/koriyoshi2041/chaos-magick-toolkit */
const I1={
 prefix:"arcana-chaos-v2-",view:"sigilos",timer:null,metronome:null,audio:null,ritualIdx:0,ritualStarted:null,
 safe(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))},
 get(k,def=[]){try{return JSON.parse(localStorage.getItem(this.prefix+k))??def}catch{return def}},
 put(k,obj){try{localStorage.setItem(this.prefix+k,JSON.stringify(obj));return true}catch{this.toast("No se pudo guardar. Revisa el almacenamiento del navegador.");return false}},
 now(){return new Date().toISOString()},
 id(p){return p+"-"+Date.now().toString(36)+"-"+this.rand(0,65535).toString(36)},
 rand(min,max){let range=max-min+1, lim=0x100000000-(0x100000000%range),n;const a=new Uint32Array(1);do{crypto.getRandomValues(a);n=a[0]}while(n>=lim);return min+(n%range)},
 pick(a){return a[this.rand(0,a.length-1)]},
 date(v){return v?new Date(v).toLocaleString("es-ES"):"Sin registrar"},
 toast(t){const el=document.getElementById("toast");el.textContent=t;el.classList.add("show");clearTimeout(this.toaster);this.toaster=setTimeout(()=>el.classList.remove("show"),2800)},
 value(id){return document.getElementById(id)?.value??""},
 field(label,id,value="",kind="text",extra=""){return '<div class="formrow"><label for="'+id+'">'+this.safe(label)+'</label>'+(kind==="textarea"?'<textarea id="'+id+'" '+extra+'>'+this.safe(value)+'</textarea>':'<input id="'+id+'" type="'+kind+'" value="'+this.safe(value)+'" '+extra+'>')+'</div>'},
 select(label,id,opts){return '<div class="formrow"><label for="'+id+'">'+this.safe(label)+'</label><select id="'+id+'">'+opts.map(o=>'<option value="'+this.safe(o[0])+'">'+this.safe(o[1])+'</option>').join("")+'</select></div>'},
 btn(txt,cmd,cls=""){return '<button type="button" class="'+cls+'" data-action="'+cmd+'">'+txt+'</button>'},
 check(txt,id,checked=false){return '<label class="small"><input type="checkbox" id="'+id+'" '+(checked?"checked":"")+'> '+this.safe(txt)+'</label>'},
 panel(title,body,cls=""){return '<section class="panel '+cls+'"><h3>'+title+'</h3>'+body+'</section>'},
 head(title,desc){return '<div class="intro"><div><h2>'+title+'</h2><p>'+desc+'</p></div></div>'},
 moon(date=new Date()){const epoch=Date.parse("2000-01-06T18:14:00Z"), syn=29.53058770576;const x=((date.getTime()-epoch)/86400000%syn+syn)%syn;const i=Math.floor(x/syn*8)%8;
 const n=["Luna nueva","Creciente","Cuarto creciente","Gibosa creciente","Luna llena","Gibosa menguante","Cuarto menguante","Menguante"];
 const icon=["🌑","🌒","🌓","🌔","🌕","🌖","🌗","🌘"];return {phase:i,name:n[i],icon:icon[i],day:Math.floor(x)}},
 normal(s){return String(s||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toUpperCase().replace(/[^A-Z]/g,"")},
 process(s){const norm=this.normal(s);return {original:s,all:norm,unique:[...new Set([...norm].filter(x=>!"AEIOU".includes(x)))].join("")}},
 colors:[
 ["Octarino","Norte","Magia pura","Comprensión, flexibilidad y voluntad","#be9be6"],
 ["Negro","Noreste","Finales y transformación","Cierre, duelo y renovación","#8d8496"],
 ["Azul","Este","Prosperidad","Recursos materiales y oportunidades","#709ae2"],
 ["Verde","Sureste","Vínculos","Afecto, empatía y conexiones","#80ba93"],
 ["Amarillo","Sur","Identidad","Autoconcepto y cambio personal","#e6c46e"],
 ["Púrpura","Suroeste","Creatividad vital","Deseo, imaginación y creación","#b58dd3"],
 ["Naranja","Oeste","Pensamiento","Conocimiento, estrategia y comunicación","#e8a163"],
 ["Rojo","Noroeste","Conflicto y defensa","Asertividad y decisiones difíciles","#d87c7b"]
 ],
 oraculoA:[
 "Considera qué creencia puedes flexibilizar para avanzar.","Observa qué necesitas terminar antes de iniciar otra etapa.",
 "Examina los recursos reales con que cuentas y concreta un paso.","Busca una conversación o un apoyo significativo.",
 "Pregunta qué imagen de ti mismo estás tratando de mantener.","Da un espacio concreto a tu capacidad de crear.",
 "Antes de decidir, ordena la información y distingue hechos de hipótesis.","Define qué merece tu energía y dónde establecer límites."
 ],
 oraculoBin:[
 "Quietud: deja la decisión abierta.","Inicio: prueba un gesto pequeño.","Bifurcación: compara dos posibilidades.","Desarrollo: observa los cambios.",
 "Estructura: revisa el plan.","Influencia: observa las consecuencias.","Equilibrio: redistribuye esfuerzos.","Umbral: ensaya una posibilidad.",
 "Revisión: cambia el punto de vista.","Introspección: escribe lo que piensas.","Conexión: pide otra perspectiva.","Recursos: comparte con criterio.",
 "Inestabilidad: prepara alternativas.","Transformación: suelta un hábito inútil.","Claridad: concreta una intención.","Cierre: registra lo aprendido."
 ],
 bibliomancia:[
 "Una creencia puede servir para explorar otra perspectiva. — Adaptación temática de la magia del caos",
 "Registrar la práctica permite separar impresiones y observaciones. — Adaptación temática",
 "El símbolo concentra una intención; su significado lo aporta quien lo usa. — Adaptación temática",
 "La duda puede ser una herramienta de exploración. — Adaptación temática",
 "Revisa tus objetivos antes de interpretar los resultados. — Adaptación temática",
 "Lo que haces después del ritual también merece anotarse. — Adaptación temática",
 "Cambiar de marco conceptual permite considerar opciones nuevas. — Adaptación temática",
 "La observación cuidadosa evita confundir azar con causalidad. — Adaptación temática"
 ],
 gnosis:[
 ["meditation","Meditación","inhibitoria",15,"Sentarte cómodamente, observar los pensamientos sin perseguirlos y volver a la atención al presente."],
 ["gazing","Contemplación de un punto","inhibitoria",10,"Fijar la atención visual en un símbolo o punto; parpadear normalmente y descansar si notas fatiga."],
 ["breathing","Respiración rítmica","inhibitoria",10,"Seguir un ritmo suave de inhalación y exhalación, sin forzar ni prolongar retenciones."],
 ["mantra","Repetición de mantras","inhibitoria",15,"Repetir una palabra o frase y atender a su sonido y cadencia."],
 ["sensory_deprivation","Reducción sensorial","inhibitoria",20,"Reducir luz y ruido de forma cómoda, manteniendo un entorno accesible y seguro."],
 ["neither_neither","Ni esto ni aquello (Spare)","inhibitoria",15,"Sostener provisionalmente dos interpretaciones opuestas y observar cómo cambia tu relación con ellas."],
 ["death_posture","Postura de la muerte (Spare)","inhibitoria",5,"El original propone tensión muscular extrema hasta el colapso; esta adaptación usa una postura firme y una relajación gradual, sin agotamiento ni caídas."],
 ["dancing","Danza espontánea","excitatoria",20,"Moverte siguiendo música a una intensidad cómoda y detenerte al notar cansancio."],
 ["drumming","Percusión rítmica","excitatoria",15,"Seguir el metrónomo con palmas, golpecitos o percusión ligera."],
 ["chanting","Vibración de vocales","excitatoria",10,"Entonar I-E-A-O-U de forma natural, sin forzar la voz ni la respiración."],
 ["pain","Prueba física / Ordalía","excitatoria",10,"El original plantea estímulos físicos intensos; aquí se ofrece una alternativa de movimiento leve y atención corporal, sin dolor deliberado."],
 ["emotional_arousal","Foco emocional","excitatoria",10,"Explorar una emoción moderada y volver al entorno presente; evita forzar recuerdos perturbadores."],
 ["sexual","Gnosis sexual","excitatoria",15,"Utilizar el deseo, en una práctica adulta y consentida, como punto de concentración personal."],
 ["overbreathing","Hiperventilación (documentación)","excitatoria",5,"El original plantea hiperventilar. Por seguridad no se guía esta técnica: se ofrece respiración espontánea y relajación."]
 ],
 stop(){if(this.timer){clearInterval(this.timer);this.timer=null}if(this.metronome){clearInterval(this.metronome);this.metronome=null}try{this.audio?.close()}catch{}this.audio=null},
 download(name,mime,text){const blob=new Blob([text],{type:mime});const u=URL.createObjectURL(blob),a=document.createElement("a");a.href=u;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),1200)},
 export(){const data={app:"ARCANA",version:2,date:this.now(),sigils:this.get("sigils"),servitors:this.get("servitors"),oracles:this.get("oracles"),customRituals:this.get("rituals"),ritualHistory:this.get("history"),diary:this.get("diary")};this.download("arcana-caos-respaldo.json","application/json",JSON.stringify(data,null,2));this.toast("Copia de seguridad exportada")},
 async import(file){if(!file)return;try{const obj=JSON.parse(await file.text());if(obj.app!=="ARCANA"||obj.version!==2)throw Error("Formato incompatible");if(!confirm("¿Quieres sustituir los datos del instrumento 1 con este respaldo?"))return;
 for(const [k,key] of [["sigils","sigils"],["servitors","servitors"],["oracles","oracles"],["customRituals","rituals"],["ritualHistory","history"],["diary","diary"]]){if(!Array.isArray(obj[k]))throw Error("El archivo no contiene "+k);this.put(key,obj[k])}this.toast("Datos importados");this.render()}catch(err){this.toast("No se ha podido importar: "+err.message)}},
 init(){document.getElementById("lunar").textContent=this.moon().icon+" "+this.moon().name;document.querySelectorAll("[data-tab]").forEach(b=>b.addEventListener("click",()=>this.show(b.dataset.tab)));
 document.getElementById("screen").addEventListener("click",e=>{const b=e.target.closest("[data-action]");if(b){const action=b.dataset.action;this.handle(action,b.dataset.id)}});
 document.getElementById("export").addEventListener("click",()=>this.export());
 document.getElementById("import").addEventListener("change",e=>this.import(e.target.files[0]));
 document.getElementById("wipe").addEventListener("click",()=>{if(confirm("¿Borrar definitivamente todos los datos guardados en este instrumento?")){for(const key of ["sigils","servitors","oracles","rituals","history","diary","bibliomancy"])localStorage.removeItem(this.prefix+key);this.render();this.toast("Datos eliminados") }});
 const init=location.hash.replace("#","");this.show(["sigilos","gnosis","servidores","oraculos","rituales","diario"].includes(init)?init:"sigilos");
 },
 show(id){this.stop();this.view=id;history.replaceState(null,"","#"+id);document.querySelectorAll("[data-tab]").forEach(b=>b.classList.toggle("active",b.dataset.tab===id));this.render();window.scrollTo({top:0,behavior:"instant"})},
 render(){const f={sigilos:()=>this.viewSigils(),gnosis:()=>this.viewGnosis(),servidores:()=>this.viewServitors(),oraculos:()=>this.viewOracles(),rituales:()=>this.viewRituals(),diario:()=>this.viewDiary()};document.getElementById("screen").innerHTML=f[this.view]();if(this.view==="sigilos")this.drawSigil()},
 handle(action,id){const f=this.actions?.[action];if(f)f.call(this,id);else this.toast("Acción no disponible")},
 sigilData(intent,method){return {id:this.id("sig"),intent,method,letters:this.process(intent).unique,createdAt:this.now()}},
 sigilSvg(intent,method,size=420){const letters=this.process(intent).unique||"X",r=165,c=size/2;
 let body='<circle cx="'+c+'" cy="'+c+'" r="190" stroke="#a9876c" stroke-width="2" fill="none"/><circle cx="'+c+'" cy="'+c+'" r="184" stroke="#6a4f61" fill="none"/>';
 const pt=(rad,ang)=>[c+rad*Math.cos(ang-Math.PI/2),c+rad*Math.sin(ang-Math.PI/2)];
 if(method==="witch_circle"){const rings=["ABCDEFGHI","JKLMNOPQR","STUVWXYZ"];const pts={};rings.forEach((set,k)=>{const rad=[160,118,75][k];body+='<circle cx="'+c+'" cy="'+c+'" r="'+rad+'" stroke="#725971" stroke-dasharray="3,7" fill="none"/>';[...set].forEach((l,i)=>{const [x,y]=pt(rad,i/set.length*2*Math.PI);pts[l]=[x,y];body+='<text x="'+x+'" y="'+(y+4)+'" font-size="11" fill="#d5bd95" text-anchor="middle">'+l+'</text>'})});
 const p=[...letters].map(l=>pts[l]);body+='<polyline points="'+p.map(a=>a.join(",")).join(" ")+'" stroke="#ecd1a0" stroke-width="3" fill="none" stroke-linejoin="round"/>';for(const [i,[x,y]] of p.entries())body+='<circle cx="'+x+'" cy="'+y+'" r="'+(i===0?7:3)+'" fill="'+(i===0?"#f4d09a":"#ae90b8")+'"/>';
 }else if(method==="magic_square"){const vals=[[2,7,6],[9,5,1],[4,3,8]], pts={};for(let y=0;y<3;y++)for(let x=0;x<3;x++){const px=c-100+x*100,py=c-100+y*100;pts[vals[y][x]]=[px,py];body+='<circle cx="'+px+'" cy="'+py+'" r="20" fill="#2a2231" stroke="#7d667b"/><text x="'+px+'" y="'+(py+5)+'" fill="#d6bb90" text-anchor="middle">'+vals[y][x]+'</text>'}
 let path=[...letters].map(ch=>pts[1+((ch.charCodeAt(0)-65)%9)]);body+='<polyline fill="none" stroke="#ead3ab" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" points="'+path.map(x=>x.join(",")).join(" ")+'"/>';if(path.length){body+='<circle cx="'+path[0][0]+'" cy="'+path[0][1]+'" r="7" fill="#e9be77"/>'}
 }else{
 const segments={B:[[0,0,0,6],[0,0,4,0],[4,0,4,3],[0,3,4,3],[4,3,4,6],[0,6,4,6]],C:[[5,0,1,0],[1,0,1,6],[1,6,5,6]],D:[[0,0,0,6],[0,0,5,3],[5,3,0,6]],F:[[0,0,0,6],[0,0,5,0],[0,3,4,3]],G:[[5,0,1,0],[1,0,1,6],[1,6,5,6],[5,6,5,3],[5,3,3,3]],H:[[0,0,0,6],[6,0,6,6],[0,3,6,3]],J:[[4,0,4,5],[4,5,1,6]],K:[[0,0,0,6],[6,0,0,3],[0,3,6,6]],L:[[0,0,0,6],[0,6,6,6]],M:[[0,6,0,0],[0,0,3,3],[3,3,6,0],[6,0,6,6]],N:[[0,6,0,0],[0,0,6,6],[6,6,6,0]],P:[[0,6,0,0],[0,0,5,0],[5,0,5,3],[5,3,0,3]],Q:[[0,0,5,0],[5,0,5,5],[5,5,0,6],[0,6,0,0],[3,4,6,6]],R:[[0,6,0,0],[0,0,5,0],[5,0,5,3],[5,3,0,3],[3,3,6,6]],S:[[6,0,0,0],[0,0,0,3],[0,3,6,3],[6,3,6,6],[6,6,0,6]],T:[[0,0,6,0],[3,0,3,6]],V:[[0,0,3,6],[3,6,6,0]],W:[[0,0,1,6],[1,6,3,3],[3,3,5,6],[5,6,6,0]],X:[[0,0,6,6],[6,0,0,6]],Y:[[0,0,3,3],[6,0,3,3],[3,3,3,6]],Z:[[0,0,6,0],[6,0,0,6],[0,6,6,6]]};
 for(const [i,l] of [...letters].entries()){const stroke=segments[l]||[];const rot=(i%4)*Math.PI/2;
 for(const a of stroke){const cv=(x,y)=>{let xx=(x-3)*22,yy=(y-3)*22;return [c+xx*Math.cos(rot)-yy*Math.sin(rot),c+xx*Math.sin(rot)+yy*Math.cos(rot)]};const p=cv(a[0],a[1]),q=cv(a[2],a[3]);body+='<line x1="'+p[0]+'" y1="'+p[1]+'" x2="'+q[0]+'" y2="'+q[1]+'" stroke="#e8cc9e" stroke-width="3.8" stroke-linecap="round" opacity="'+(0.62+(i%3)*.17)+'"/>'}}
 body+='<circle cx="'+c+'" cy="'+c+'" r="7" fill="#e8c68b"/>';
 }return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+size+' '+size+'" role="img" aria-label="Sigilo generado"><rect width="100%" height="100%" fill="#15111c"/>'+body+'<text x="'+c+'" y="403" text-anchor="middle" fill="#b29bb3" font-size="10" letter-spacing="3">ARCANA • SIGILO</text></svg>'},
 drawSigil(){const out=document.getElementById("sigilPreview");if(!out)return;out.innerHTML=this.sigilSvg(this.value("si-intent")||"MI VOLUNTAD",this.value("si-method")||"spare")},
};
window.I1=I1;