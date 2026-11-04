"use strict";
(function(A){
 A.breathDefaults={"4-4-6":10,"4-7-8":8,"6-6-6":12,"3-2-4":6,"4-0-6":10,"6-0-6":10};
 const originalInit=A.init;
 A.init=function(){
  originalInit.call(this);
  const screen=document.getElementById("screen");
  screen.addEventListener("change",event=>{
   if(event.target.id!=="g-pattern")return;
   const cycles=document.getElementById("g-cycles");
   if(cycles)cycles.value=String(this.breathDefaults[event.target.value]||10);
  });
 };
})(window.I1);
