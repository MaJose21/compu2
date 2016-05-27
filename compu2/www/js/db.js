function almacenarExamenes( examenes ){
	localStorage.setItem('examenes', JSON.stringify( examenes ) );
}

function agregarExamen( examen ){
	mexamenes = obtenerExamenes();
	mexamenes.push( examen )
	examenes = mexamenes;
	almacenarExamenes( examenes );
}

function obtenerExamenes(){
	var cadenaExamenes = localStorage.getItem('examenes');
	return JSON.parse( cadenaExamenes );
}

function inicializarDB(){
	var copia = obtenerExamenes();
	if( copia == null || copia.length == 0 ){
		almacenarExamenes( examenes );
	}
    examenes = obtenerExamenes();
}

function crearPregunta( pregunta , valor ){
	return { pregunta : pregunta , valor: valor}
}

function darPreguntas(){
	var cadenaPregunta = localStorage.getItem('preguntas');
	return JSON.parse( cadenaPregunta );
}

function agregarPregunta( pregunta ){
	var mpreguntas = darPreguntas();
	mpreguntas.push( pregunta );
	almacenarPreguntas( mpreguntas );
	preguntas = mpreguntas;
}

function almacenarPreguntas( preguntas ){
	localStorage.setItem('preguntas', JSON.stringify( preguntas ))
}
inicializarDB();

/*	
	examen = crearExamen();	
	examenes = obtenerExamenes();
	examenes.push( examen );
	almacenarExamenes( examenes  )

*/
 // esto para que por primera vea cargue los examenes