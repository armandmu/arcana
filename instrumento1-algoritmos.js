"use strict";
/* Fidelidad de trazado en caracteres a los tres algoritmos del original:
   src/core/sigil.ts de Chaos Magick Practice Toolkit (MIT). */
(function(A){
 const alphabet={
 B:[[1,0,1,6],[1,0,4,0],[4,0,4,3],[1,3,4,3]],
 C:[[5,0,2,0],[2,0,2,6],[2,6,5,6]],
 D:[[1,0,1,6],[1,0,4,3],[4,3,1,6]],
 F:[[1,0,1,6],[1,0,5,0],[1,3,4,3]],
 G:[[5,1,2,0],[2,0,2,6],[2,6,5,6],[5,6,5,3]],
 H:[[1,0,1,6],[5,0,5,6],[1,3,5,3]],
 J:[[4,0,4,5],[4,5,2,6]],
 K:[[1,0,1,6],[5,0,1,3],[1,3,5,6]],
 L:[[1,0,1,6],[1,6,5,6]],
 M:[[0,6,0,0],[0,0,3,3],[3,3,6,0],[6,0,6,6]],
 N:[[1,6,1,0],[1,0,5,6],[5,6,5,0]],
 P:[[1,0,1,6],[1,0,4,0],[4,0,4,3],[4,3,1,3]],
 Q:[[2,0,5,0],[5,0,5,4],[5,4,2,6],[2,6,2,0],[4,4,6,6]],
 R:[[1,0,1,6],[1,0,4,0],[4,0,4,3],[4,3,1,3],[3,3,5,6]],
 S:[[5,0,1,0],[1,0,1,3],[1,3,5,3],[5,3,5,6],[5,6,1,6]],
 T:[[0,0,6,0],[3,0,3,6]],
 V:[[0,0,3,6],[3,6,6,0]],
 W:[[0,0,1,6],[1,6,3,3],[3,3,5,6],[5,6,6,0]],
 X:[[0,0,6,6],[6,0,0,6]],
 Y:[[0,0,3,3],[6,0,3,3],[3,3,3,6]],
 Z:[[0,0,6,0],[6,0,0,6],[0,6,6,6]]
 };
 const grid=n=>Array.from({length:n},()=>Array(n).fill(" "));
 function stroke(g,x1,y1,x2,y2,char){
 let dx=Math.abs(x2-x1),dy=Math.abs(y2-y1),sx=x1<x2?1:-1,sy=y1<y2?1:-1,err=dx-dy;
 for(let i=0;i<1000;i++){if(y1>=0&&y1<g.length&&x1>=0&&x1<g[0].length)g[y1][x1]=char;if(x1===x2&&y1===y2)break;const e2=2*err;if(e2>-dy){err-=dy;x1+=sx}if(e2<dx){err+=dx;y1+=sy}}
 }
 const render=g=>g.map(x=>x.join(" ")).join("\n");
 const rings=["ABCDEFGHI","JKLMNOPQR","STUVWXYZ"],radii=[10,7,4];
 function wheelPt(ch){let r=rings.findIndex(s=>s.includes(ch));if(r<0)r=0;let index=rings[r].indexOf(ch);const angle=(index/rings[r].length)*2*Math.PI-Math.PI/2;return [Math.round(10+radii[r]*Math.cos(angle)),Math.round(10+radii[r]*Math.sin(angle))]}
 const saturn=[[2,7,6],[9,5,1],[4,3,8]];
 function saturnPt(ch){const num=(ch.charCodeAt(0)-65)%9+1;for(let y=0;y<3;y++)for(let x=0;x<3;x++)if(saturn[y][x]===num)return [x*5+2,y*5+2];return [7,7]}
 A.originalSigilGrid=function(intent,method){
  const letters=this.process(intent).unique;
  if(method==="witch_circle"){
   const g=grid(21);
   for(const r of radii){for(let i=0;i<Math.max(40,r*8);i++){const a=(i/Math.max(40,r*8))*2*Math.PI,x=Math.round(10+r*Math.cos(a)),y=Math.round(10+r*Math.sin(a));if(x>=0&&x<21&&y>=0&&y<21&&g[y][x]===" ")g[y][x]="·"}}
   for(let k=0;k<3;k++)for(const ch of rings[k]){const [x,y]=wheelPt(ch);g[y][x]=letters.includes(ch)?ch:"·"}
   for(let i=0;i<letters.length-1;i++){const a=wheelPt(letters[i]),b=wheelPt(letters[i+1]);stroke(g,...a,...b,"•")}
   for(const l of letters){const [x,y]=wheelPt(l);g[y][x]=l}
   if(letters.length){const [x,y]=wheelPt(letters[0]);if(y>0)g[y-1][x]="o"}
   if(letters.length>1){const [x,y]=wheelPt(letters.at(-1));if(y+1<21)g[y+1][x]="x"}
   g[10][10]="◉";return render(g)
  }
  if(method==="magic_square"){
   const g=grid(15);
   for(let i=0;i<=3;i++){let pos=i*5-(i>0?1:0);if(pos>=0&&pos<15)for(let j=0;j<15;j++){g[pos][j]="─";g[j][pos]="│"}}
   for(let y=0;y<3;y++)for(let x=0;x<3;x++)g[y*5+2][x*5+2]=String(saturn[y][x]);
   for(let i=0;i<letters.length-1;i++)stroke(g,...saturnPt(letters[i]),...saturnPt(letters[i+1]),"•");
   if(letters.length){const [x,y]=saturnPt(letters[0]);g[y][x]="●"}
   if(letters.length>1){const [x,y]=saturnPt(letters.at(-1));g[y][x]="○"}
   return render(g)
  }
  const g=grid(13),chars=["─","│","╱","╲","╳","●","○","✶"];
  for(const l of letters){const segments=alphabet[l]||[],char=this.pick(chars);for(const seg of segments){const [x1,y1,x2,y2]=seg;stroke(g,Math.round(x1*2),Math.round(y1*2),Math.round(x2*2),Math.round(y2*2),char)}}
  g[6][6]="◉";g[0][0]=g[0][12]=g[12][0]=g[12][12]="○";return render(g)
 };
 const originalView=A.viewSigils;
 A.viewSigils=function(){const body=originalView.call(this);const extra=this.panel("Trazado de caracteres del algoritmo original",
 '<p>El código de referencia dibuja los sigilos en cuadrículas de caracteres Unicode. Además del diseño SVG, aquí puedes ver esa representación y copiarla.</p>'+
 '<pre id="sigil-code" class="code" aria-label="Trazado textual original"></pre>'+
 '<div class="actions">'+this.btn("Copiar trazado","scopygrid","ghost")+'</div><p class="small">La versión de Spare emplea trazos aleatorios, por lo que el patrón de caracteres puede cambiar aunque la intención sea la misma.</p>',"wide");
 return body.replace(/<\/div>\s*$/,extra+"</div>")};
 const prevDraw=A.drawSigil;
 A.drawSigil=function(){prevDraw.call(this);const pre=document.getElementById("sigil-code");if(pre)pre.textContent=this.originalSigilGrid(this.value("si-intent")||"MI VOLUNTAD",this.value("si-method")||"spare")};
 A.actions.scopygrid=function(){const pre=document.getElementById("sigil-code");if(!pre)return A.toast("Genera un sigilo primero");const str=pre.textContent;
 if(navigator.clipboard?.writeText)navigator.clipboard.writeText(str).then(()=>A.toast("Trazado copiado")).catch(()=>A.toast("No se pudo copiar"));else A.toast("Selecciona el texto para copiarlo")};
 const previousRender=A.render;
 A.render=function(){previousRender.call(this);if(this.view==="sigilos")this.drawSigil()};
})(window.I1);