
function almacenarExamenes( examenes )
{
	window.localStorage.setItem('examenes', JSON.stringify( examenes ) );
}

function agregarExamen( examen )
{
	var mexamenes = obtenerExamenes();
	mexamenes.push( examen )
	examenes = mexamenes;
	almacenarExamenes( examenes );
}

function storeEvaluaciones(){
	window.localStorage.setItem('evals', JSON.stringify( evals ) );
}
function getEvaluaciones(){
	var evaluacion = JSON.parse( window.localStorage.getItem('evals') );
	if( evaluacion == null ){
		evals = [];
		storeEvaluaciones();
	}else{
		evals = evaluacion;
	}
	return evals;
}

function addEvaluacion( evaluacion ){
	evals.push( evaluacion );
	storeEvaluaciones();
}

function obtenerCantidadExamenes()
{
	var cadenaExamenes = window.localStorage.getItem('examenes');
	var examenes = JSON.parse( cadenaExamenes );
	return examenes.length;
}

function obtenerExamenes()
{
	var cadenaExamenes = window.localStorage.getItem('examenes');
	var retorno = JSON.parse( cadenaExamenes );
	return retorno;
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
	}
	
    preguntas = darPreguntas();
    examenes = obtenerExamenes();
    examXubicacion = darUbicaciones();
	
}

function crearPregunta( pregunta , valor ){
	return { pregunta : pregunta , valor: valor }
}

function obtenerCantidadPreguntas()
{
	var cadenaPreguntas = window.localStorage.getItem('preguntas');
	var pregs = JSON.parse( cadenaPreguntas );
	return pregs.length;
}

function darPreguntas(){
	cadenaPregunta = window.localStorage.getItem('preguntas');
	var retorno =  JSON.parse( cadenaPregunta );
	return retorno;
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
	window.localStorage.setItem('preguntas', JSON.stringify( preguntas ));
}


function obtenerCantidadUbicaciones()
{
	var cadenaUbicaciones = window.localStorage.getItem('Ubicaciones');
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
	window.localStorage.setItem('Ubicaciones', JSON.stringify( Ubicaciones ));
}

inicializarDB();