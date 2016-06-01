function almacenarExamenes( examenes )
{
	localStorage.setItem('examenes', JSON.stringify( examenes ) );
}

function agregarExamen( examen )
{
	mexamenes = obtenerExamenes();
	mexamenes.push( examen )
	examenes = mexamenes;
	almacenarExamenes( examenes );
}

function obtenerCantidadExamenes()
{
	var cadenaExamenes = localStorage.getItem('examenes');
	var examenes = JSON.parse( cadenaExamenes );
	return examenes.length;
}

function obtenerExamenes()
{
	cadenaExamenes = localStorage.getItem('examenes');
	return JSON.parse( cadenaExamenes );
}

function inicializarDB(){
	
	var copiaPreg = darPreguntas();
	if( copia == null || copia.length == 0 )
	{
		almacenarPreguntas( preguntas );
	}
	
	var copia = obtenerExamenes();
	if( copia == null || copia.length == 0 ){
		almacenarExamenes( examenes );
	}
	
	var copiaUbi = darUbicaciones();
	if( copiaUbi == null || copiaUbi.length == 0 ){
		almacenarUbicaciones( examXubicacion );
		alert("Almaceno ubis");
	}
	
    preguntas = darPreguntas();
    examenes = obtenerExamenes();
    examXubicacion = darUbicaciones();
	
}

function crearPregunta( pregunta , valor ){
	return { pregunta : pregunta , valor: valor}
}

function obtenerCantidadPreguntas()
{
	var cadenaPreguntas = localStorage.getItem('preguntas');
	var pregs = JSON.parse( cadenaPreguntas );
	return pregs.length;
}

function darPreguntas(){
	cadenaPregunta = localStorage.getItem('preguntas');
	return JSON.parse( cadenaPregunta );
}

function agregarPregunta( pregunta )
{
	mpreguntas = darPreguntas();
	mpreguntas.push( pregunta );
	almacenarPreguntas( mpreguntas );
	preguntas = mpreguntas;
}

function almacenarPreguntas( preguntas )
{
	localStorage.setItem('preguntas', JSON.stringify( preguntas ));
}


function obtenerCantidadUbicaciones()
{
	var cadenaUbicaciones = localStorage.getItem('Ubicaciones');
	var ubis = JSON.parse( cadenaUbicaciones );
	return ubis.length;
}

function darUbicaciones(){
	cadenaUbicacion = localStorage.getItem('Ubicaciones');
	return JSON.parse( cadenaUbicacion );
}

function agregarUbicaion( ubicacion )
{
	mUbicaciones = darUbicaciones();
	mUbicaciones.push( ubicacion );
	almacenarUbicaciones( mUbicaciones );
	examXubicacion = mUbicaciones;
}

function almacenarUbicaciones( Ubicaciones )
{
	alert(JSON.stringify( Ubicaciones ));
	localStorage.setItem('Ubicaciones', JSON.stringify( Ubicaciones ));
}







inicializarDB();

/*	
	examen = crearExamen();	
	examenes = obtenerExamenes();
	examenes.push( examen );
	almacenarExamenes( examenes  )

*/
 // esto para que por primera vea cargue los examenes