"use strict";
/* Lecturas de 8 × 8: traducción de las 64 combinaciones en
   src/core/oracle.ts (MIT), con el mismo orden y significado.
   Conservamos el texto original cuando su perspectiva es esotérica. */
(function(A){
const matrix=[
[
"La magia se duplica: la situación es enteramente mágica. Afróntala con plena intención ritual.",
"La magia se disuelve en el vacío. Un trabajo debe terminar antes de que pueda comenzar otro.",
"Encantamiento para obtener beneficios materiales. Magia y riqueza se alinean; se favorece la hechicería práctica.",
"La magia abre el corazón. El encantamiento emocional tiene fuerza en este momento.",
"La magia transforma el yo. Tu identidad es flexible: rediseña su forma mediante la hechicería.",
"La magia y la pasión se fusionan. La fuerza creativa amplifica enormemente tus trabajos.",
"La magia agudiza la mente. Hechicería intelectual: planifica cuidadosamente tu encantamiento.",
"La magia exige acción. Se reclama un encantamiento enérgico. Actúa con voluntad."
],
[
"Transfórmate mediante la magia pura. El final contiene semillas de poder mágico.",
"Doble muerte: disolución total. Suéltalo todo. Tras la destrucción llega el renacimiento.",
"La destrucción produce tesoros. Algo debe terminar para que la riqueza pueda fluir.",
"Duelo y amor se entrelazan. La pérdida abre el corazón a una conexión más profunda.",
"El ego debe morir para renacer. Deja atrás quien eras para convertirte en quien serás.",
"Muerte y deseo se fusionan. La pasión consume lo anterior: creación desde las cenizas.",
"Analiza lo que debe terminar. Piensa con claridad qué necesitas soltar y por qué.",
"Lucha contra el final. No todos los desenlaces son deseables: resiste lo que amenaza con destruir prematuramente."
],
[
"Encanta tus recursos. Aplica pensamiento mágico a la abundancia material.",
"Libera el apego a la riqueza. Acumular bloquea el flujo de la prosperidad.",
"Doble riqueza: la abundancia se multiplica. La hechicería financiera se ve especialmente favorecida.",
"La riqueza fluye a través de los vínculos. La generosidad y el amor atraen prosperidad.",
"Invierte en ti. Dedica recursos a tu transformación y poder personal.",
"Persigue la riqueza con pasión. Canaliza el deseo hacia la manifestación material.",
"Construye riqueza con estrategia. Planifica tu magia financiera con precisión.",
"Compite por los recursos. Defiende tu posición en los asuntos materiales."
],
[
"Encanta para el amor. Aplica magia pura a la conexión y la atracción.",
"Libera una relación. Algo en tu vida emocional debe terminar para poder sanar.",
"El amor trae abundancia. La conexión y la generosidad atraen riqueza material.",
"Doble amor: profunda resonancia emocional. El corazón habla al corazón.",
"El amor te transforma. Una relación está modificando quién eres: permítelo.",
"La pasión enciende el amor. La energía sexual y creativa profundiza los vínculos emocionales.",
"Piensa en el amor con claridad. Analiza honestamente tus patrones emocionales.",
"Lucha por el amor. Defiende lo que aprecias y expresa tus necesidades afectivas."
],
[
"Transfórmate mediante la hechicería. Aplica la voluntad mágica para rediseñar tu identidad.",
"El antiguo yo debe morir. La disolución del ego precede a la transformación auténtica.",
"Construye riqueza desde el autoconocimiento. Tu identidad es tu mayor recurso.",
"Necesitas amor propio. No puedes transformarte sin compasión hacia ti.",
"Doble ego: intensa atención hacia uno mismo. El trabajo con la identidad es prioritario.",
"Autocreación apasionada. Canaliza el deseo hacia convertirte en quien eliges ser.",
"Conócete a fondo. El autoexamen intelectual revela el camino siguiente.",
"Afirma tu identidad. Mantente firme ante la presión externa."
],
[
"Canaliza el deseo hacia la magia. El poder hechicero puro fluye a través de la pasión.",
"El deseo debe morir para renacer. Libera patrones antiguos de pasión y anhelo.",
"La pasión genera riqueza. Canaliza la energía creativa y sexual hacia la abundancia.",
"La pasión y el amor se unen. El deseo profundo se convierte en vínculo emocional.",
"El deseo transforma el yo. La energía sexual y creativa transforma la identidad.",
"Doble pasión: fuerza creativa desbordante. Canalízala para que no te consuma.",
"Comprende tus deseos. Analiza qué quieres realmente bajo la superficie.",
"Pasión agresiva. Persigue lo que deseas con fuerza y determinación."
],
[
"Piensa mágicamente. Aplica la perspectiva hechicera a los problemas intelectuales.",
"Deja morir las ideas antiguas. Abandona los marcos mentales que ya no te sirven.",
"El pensamiento estratégico produce riqueza. Planifica con cuidado para lograr resultados materiales.",
"Piensa con el corazón. La inteligencia emocional ilumina lo que la lógica no alcanza.",
"Replantéate quién eres. Reencuadrar intelectualmente la identidad puede ser poderoso ahora.",
"Pensamiento apasionado. Permite que el deseo impulse tu análisis y planificación.",
"Doble intelecto: claridad mental pura. La mente está especialmente afilada.",
"Debate y defiende tus ideas. La confrontación intelectual agudiza tu posición."
],
[
"Libra una guerra mágica. Aplica fuerza hechicera al conflicto y la competición.",
"Destruye por completo la oposición. Magia de muerte puesta al servicio de la victoria.",
"Lucha por la riqueza. La acción competitiva produce beneficios materiales.",
"Lucha por el amor. Protege lo que te importa con feroz determinación.",
"La batalla te transforma. El conflicto forja un yo más fuerte: acepta la prueba.",
"Agresión apasionada. Canaliza deseo e ira hacia una fuerza abrumadora.",
"Guerra estratégica. Planifica tus batallas con precisión intelectual.",
"Doble guerra: conflicto total. Agresión sin reservas. No contengas nada."
]
];
A.oraculoBin=[
 "El vacío habla con silencio. Espera.",
 "Una única chispa en la oscuridad. El comienzo.",
 "Dos caminos se separan. Elige sin vacilar.",
 "Crecimiento desde la nada. Confía en el proceso.",
 "Los cimientos están asentados. Construye sobre ellos.",
 "El cambio se extiende en ondas. Tu influencia se propaga.",
 "La armonía surge del caos. Equilibrio encontrado.",
 "La puerta se abre. Atraviésala.",
 "Inversión. Lo que estaba arriba está ahora abajo.",
 "La espiral gira hacia el interior. Es necesaria la introspección.",
 "Una conexión tiende un puente. Acércate.",
 "La abundancia se desborda. Comparte libremente.",
 "La torre tiembla. Prepárate para una sacudida.",
 "La transformación se acelera. Entrégate a ella.",
 "La estrella brilla con fuerza. Tu voluntad se manifiesta.",
 "Finalización. El círculo se cierra."
];
A.oraculoA=[
 "Se abre ante ti el camino de la magia pura. Confía en el proceso: tu voluntad da forma a la realidad.",
 "Muerte y transformación. Algo debe terminar para que pueda empezar lo nuevo. Afloja el control.",
 "La abundancia material fluye hacia ti. Los pasos prácticos dan recompensas tangibles.",
 "El amor y la conexión son la respuesta. Abre el corazón: la vulnerabilidad es fuerza aquí.",
 "El yo exige atención. ¿En quién te estás convirtiendo? Hace falta una transformación del ego.",
 "Surge la fuerza creativa y vital. Canaliza tu pasión hacia la creación. Abunda la energía de vida.",
 "El intelecto ilumina el camino. Piensa con claridad, comunica con precisión y diseña una estrategia.",
 "Conflicto y competencia. Afírmate con fuerza. La victoria favorece a quien actúa con decisión."
];
const previous=A.actions["or-read"];
A.actions["or-read"]=function(){
 previous.call(A);
 const records=A.get("oracles"),r=records.at(-1);
 if(r?.method!=="Ocho colores")return;
 const match=r.text.match(/combinación (\d+)\/64/);
 if(!match)return;
 const index=Number(match[1])-1,exact=matrix[Math.floor(index/8)]?.[index%8];
 if(!exact)return;
 r.details=r.details.replace(/\n\nInterpretación específica[^\n]*/,"");
 r.details+="\n\nInterpretación original, traducida:\n"+exact;
 A.put("oracles",records);
 const el=document.getElementById("or-result");
 if(el)el.textContent=r.text+"\n\n"+r.details;
};
A.originalColorMatrix=matrix;
const oldView=A.viewRituals;
A.viewRituals=function(){
 let html=oldView.call(this);
 const moon=this.moon();
 const tips=["inicio y formulación de propósitos","crecimiento y consolidación","expansión y primera revisión","preparación de una culminación","culminación y balance","revisión y cierre de procesos","renuncia y evaluación","descanso antes de reiniciar"];
 const help=this.panel("Calendario lunar y criterios tradicionales",
  '<p>Fase calculada: <strong>'+moon.icon+" "+moon.name+'</strong> · día '+moon.day+' del ciclo sinódico aproximado.</p>'+
  '<p>El origen sugiere luna nueva para comienzos, luna llena para culminaciones, menguante para destierros y creciente para crecimiento. Esta asociación es ritual, no una predicción física.</p>'+
  '<p>Interpretación orientativa de la fase actual: <strong>'+tips[moon.phase]+'</strong>.</p>',"wide");
 return html.replace(/<\/div>\s*$/,help+"</div>");
};
})(window.I1);