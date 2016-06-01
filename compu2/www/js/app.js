var app = angular.module( 'universidad' , ['ionic', 'ui.router', 'ngCordova' ]);

var m_degree = 111320;
var RANGE = 0.00005 ;// five meters
var preguntas = [
{
  id: 1 ,
  valor: 10,
  pregunta : "como estas?",
  checked:"false",
  explicacion: "la respuesta correcta es bien",
  respuestas : [
  {
    respuesta : "bien",
    correcta : true
  },
  {
    respuesta : "mal",
    correcta : false
  }
  ]
},
{ 
  id: 2 ,
  valor: 10,
  pregunta : "Que es Mineria de Datos?",
  checked:"false",
  explicacion: "la respuesta correcta es Materia muy importante",
  respuestas : [
  {
    respuesta : "Un rellenazo",
    correcta : false
  },
  {
    respuesta : "Materia muy importante",
    correcta : true
  }
  ]
},
{ 
  id: 3 ,
  valor: 40,
  pregunta : "Complejidad de la busqueda binaria?",
  checked:"false",
  explicacion: "la respuesta correcta es Log(n)",
  respuestas : [
  {
    respuesta : "n a la 2",
    correcta : false
  },
  {
    respuesta : "Log(n)",
    correcta : true
  }
  ]
}
];
var examenes = [
  {
    id: 1,
    nombre: "Parcial 1 Calculo",
    descripcion: "1 hora, Tambien puede ser tomado presencial en el salon 2-305. Importante llevar cuaderno, lapiz y borrador",
    tema : "Derivadas",
    eliminar : false,
    preguntas : [
      {
        id: 1 ,
        valor: 50
      },{
        id: 2,
        valor: 50
      }
    ]
  },
  {
    id: 2,
    nombre: "Parcial 3 Computacion Movil",
    descripcion: "3 horas, El parcial consiste en hacer una aplicacion movil sencilla. Solo se puede usar phonegap",
    tema : "iOS, PhoneGap y Patrones",
    eliminar : false,
    preguntas : [
      {
        id: 1 ,
        valor: 50
      },{
        id: 2,
        valor: 50
      }
    ]
  },
  {
    id: 3,
    nombre: "Bioquimica",
    descripcion: "3 horas, el parcial es un domingo a las 7am antes de un festivo. 30 preguntas, 20 minutos para resolverlo.",
    tema : "TODO lo visto desde primer semestre. ",
    eliminar : false,
    preguntas : [
      {
        id: 1 ,
        valor: 50
      },{
        id: 2,
        valor: 50
      }]
  },
  {
    id: 4,
    nombre: "Analisis de Algoritmos",
    descripcion: "Pasas o pasas.",
    tema : "Programacion Dinamica",
    eliminar : false,
    preguntas : [
      {
        id: 1 ,
        valor: 25
      },{
        id: 3,
        valor: 75
      }]
  }
];

var examXubicacion = 
[
  {
    idEval: 2,
    nombre: "Facultad Ingenieria",
    lat: 4.626978,
    lon: -74.064081,
    radio: 27 / m_degree,
  },
  {
    idEval: 4,
    nombre: "Facultad Ingenieria",
    lat: 4.626713,
    lon: -74.06409,
    radio: 27 / m_degree,
  },
  {
    idEval: 3,
    nombre: "Tepanyaki",
    lat: 4.626978,
    lon: -74.064081,
    radio: 8 / m_degree,
  },
  {
    idEval: 1,
    nombre: "Facultad de artes",
    lat: 4.6267,
    lon: -74.06413,
    radio: 35 / m_degree,
  },
  {
    idEval: 4,
    nombre: "Edificio Fernando Baron",
    lat: 4.6266522,
    lon: -74.06407,
    radio: 16 / m_degree,
  }
];

var respuestas = [];

/**
 * Controlador de la pagina principal
 * 
 * */

 var preguntasAElegir=[];
 var preElegidas=[];
 var reguntas=[];
 var examenTemporal={reguntas:[] };
 var total=0;

app.controller('ExamenesController', function($scope) { 
 
  
  preguntasAElegir=darPreguntas();
  $scope.preguntas=[];
  $scope.preguntas=preguntasAElegir.slice(0);
 
  $scope.elegidas=[];
  $scope.elegidas=preElegidas.slice(0);
  
  $scope.examenes=[];
  $scope.examenes=obtenerExamenes();

 $scope.examenAGuardar=examenTemporal.nombre;
  $scope.totalexamen=0;
  $scope.totalexamen=total;
  $scope.eliminarExamen=function(){
    
    for(var j=0; j<$scope.examenes.length;j++)
    {
      if($scope.examenes[j].eliminar==true){
      
        $scope.examenes.splice(j,1);
        
        j--;
      }
    }
    almacenarExamenes($scope.examenes);
  }
  
  $scope.mostrarNombre=function(){
    examenTemporal.nombre=$scope.nombresito;
   
    examenTemporal.descripcion=$scope.descripcion;
    examenTemporal.tema=$scope.tema;
  }
   

  $scope.agregarPre=function()
  {
    
      for( var j  = 0 ; j < $scope.preguntas.length ; j++ ){
      if($scope.preguntas[j].checked==true){
        
          preElegidas.push($scope.preguntas[j]);
          
         
      }
    }
  $scope.elegidas=preElegidas.slice(0);
  }
  
   $scope.agregarValor=function(){
   
     examenTemporal.preguntas=$scope.elegidas.slice(0);
      for(var j=0; j< examenTemporal.preguntas.length;j++){
        total=total+Number(examenTemporal.preguntas[j].valor);
      }
     agregarExamen(examenTemporal);
   
  }
  
  
  $scope.mostrarCheck=function(){
    alert($scope.checkbox);
  }
   
   
 });
  
app.controller('PreguntaController', function($scope) { 
 

  $scope.mostrarCheck=function(){
    alert($scope.checkbox);
  }
   
   
 });
var opciones=[];
var pregun = { opciones:[] };
app.controller('MainController', function($scope) { // el scope es como una variable global en angular, se puede crear un controlador por vista o conjunto de vistas, como te quede mas facil
  
  $scope.hello = "Hola mundo, prueba de angular";

  $scope.opcionesPregunta=[];
  
  $scope.agregarProfesor = function(profesor) {
    $scope.profesores.push(profesor);
  }
  
  $scope.correcta = "qewrtytuiop";
  
  $scope.preguntaNueva = null; // aqui agregue una variable para que angular le haga referncia, en el html lo referencio como ng-model, despues cuando llamo el metedo lo envio por paramtero
  
  $scope.opcionesPregunta = [];
  
  
  console.log("la correcta es: " + $scope.correcta );
  
  $scope.agregarRespuesta = function(opcion) {
    pre.value=" ";
   
    opciones.push({opcion:opcion} ); // tienes que meter un objeto que este formado igual que el otro, osea los de la lista
    $scope.opcionesPregunta=opciones.slice(0);
   
  }
   $scope.elegirPregunta = function(opcion) {
    
    $scope.opcionesPregunta.push( { opcion : opcion } ); // tienes que meter un objeto que este formado igual que el otro, osea los de la lista
  }
  
  
  $scope.agregarPre=function()
  {
         
    pregun.pregunta=$scope.nombre;
    pregun.valor=$scope.puntaje;
    pregun.tema=$scope.temaPre;
    pregun.explicacion=$scope.explicacion;
    pregun.opciones=opciones.slice(0);
    alert(pregun.pregunta);
    agregarPregunta(pregun);
    
    
  }
  
  $scope.temas=[
  {
    tema : "ADOO"
  },
  {
    tema: "POO"
  },
  {
    tema: "Estructuras"
  }

  ];
  
  
  
  
});

app.controller( 'MyCtrl', function($scope) {
});
/**
 * 
 * Controlador de prueba del GPS
 *
 * */
app.controller( 'GpsCtrl' , function( $scope , $cordovaGeolocation )
{
  $scope.exmUbi = null;
  
  function buscarEvals () 
  {
    alert("ENTRA ALCONTROL GPS");
    var watchOptions = { timeout : 3000, enableHighAccuracy: false  };
    var watch = $cordovaGeolocation.watchPosition(watchOptions);
    watch.then( null,
      function(err) 
      {
        alert("Error");
      },
      function(position) 
      {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        alert( "LAT: "+ lat + "LON" + long );
        buscarExamenes( lat, lon );
      }
    );
  watch.clearWatch();
  }
  
  function mostrarExamen( id ){
    examenes = obtenerExamenes();
    for( var i = 0; i < examenes.length ; i++ ){
      examen = examenes[i];
      if( examen.id == id ){
        return examen;
      }
    }
    return null;
  }
  
  function buscarExamenes ( lat, lon )
  {
     alert("LLEGA  ABUSCAR");
     var latitudLeft = lat - RANGE;
     var latitudRight = lat + RANGE;
     var longitudeUp = lon + RANGE;
     var longitudeDown = lon - RANGE;
     
     for( var i = 0; i < examXubicacion.length; i++ )
     {
       var parc = examXubicacion[i];
       if( parc.lon + parc.radio >longitudeDown &&
           parc.lon -parc.radio < longitudeUp &&
           parc.lat +  parc.radio > latitudLeft &&
          parc.lat -  parc.radio < latitudRight )
       {
        var ex = mostrarExamen( parc.idEval );
        alert( "Estas en " + parc.nombre + "presenta la evaluacion: " + ex.nombre );
        $scope.exmUbi.push( ex );
       }
     }
  }
    $scope.buscarEvals = buscarEvals();
});


/**
 * 
 * Controlador de Tomar un Examen 
 * 
 */
app.controller('TomarExamen', function( $state , $stateParams , $scope , $cordovaCamera ){
  
  //////////////// FUNCIONALIDAD DE FOTOS //////////////////////////////
  //alert( $stateParams.id )
  $scope.preguntas = [];
  //$scope.evaluacion = { preguntas:[] };
  
  var id = $stateParams.id;
  if( id != null ){
    var examen = mostrarExamen( id );
    $scope.examenApresentarReal = null;
    $scope.examenApresentarReal = examen;

    var preg = obtenerPreguntas( examen );
    for( var j  = 0 ; j < preg.length ; j++ ){
      $scope.examenApresentarReal.preguntas.push( preg[ j ]);
    }
  }
  
  $scope.takePhoto = function () {
    var options = {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: true
    };
    var foto = $cordovaCamera.getPicture(options).then(function (imageData) {
        $scope.imgURI = "data:image/jpeg;base64," + imageData;
        console.log( $scope.imgURI );
        alert( $scope.imgURI );
    }, function (err) {
        // An error occured. Show a message to the user
        console.log("Error al obtener la foto");
    });
    console.log( foto.toString() )
  }
                
  $scope.choosePhoto = function () {
    var options = {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
  };
   
  $cordovaCamera.getPicture(options).then(function (imageData) {
      $scope.imgURI = "data:image/jpeg;base64," + imageData;
      console.log( $scope.imgURI );
      alert( $scope.imgURI );
  }, function (err) {
      alert("Error al tomar la foto")
  });
  
  }
  
  function obtenerPreguntas( examen ) {
    var pregntas = darPreguntas();
    retorno = [];
    for( var i = 0 ;  i < examen.preguntas.length ; i++ ){
      for( var j = 0; j < pregntas.length ; j++){
        if( examen.preguntas[i].id == pregntas[j].id ){
          retorno.push( pregntas[j] );
        }
      }
    }
    return retorno;
  }
  
  function mostrarExamenesDisponibles(){
    examenes = obtenerExamenes();
    if( examenes != null ){
        examenes.forEach(function(examen){
          console.log(examen.nombre); // falta lo del GPS, para eso el ciclo
        });
    }
    return examenes;
  }
  
  function mostrarExamen( id ){
    examenes = obtenerExamenes();
    for( var i = 0; i < examenes.length ; i++ ){
      examen = examenes[i];
      if( examen.id == id ){
        return examen;
      }
    }
    return null;
  }
  $scope.mostrarExamen = mostrarExamen;
  $scope.mostrarExamenesDisponibles = mostrarExamenesDisponibles;
  $scope.examenes = examenes; 
  $scope.examen = null;
});

/**
 * Controlador del codigo QR
 * 
 */
app.controller( 'qr', function($scope, $rootScope, $cordovaBarcodeScanner, $ionicPlatform, $http ) 
{
        function construirExamen ( datos )
        {      
          var examen = new Object();
          var pregunta = new Object();
          var respuesta = new Object();          
          
          examen.id = obtenerCantidadExamenes() + 1;
          examen.nombre = datos.nombre;
          examen.descripcion = datos.descripcion;
          examen.tema = datos.tema;
          examen.eliminar = datos.eliminar;
          examen.preguntas = [];
           
          for( var i = 0; i < datos.tamPreguntas; i++ )
          {
            pregunta.id = obtenerCantidadPreguntas() + 1;
            pregunta.pregunta = datos.preguntas[i].texto;  
            pregunta.checked = datos.preguntas[i].checked;
            pregunta.valor = datos.preguntas[i].valor; 
            pregunta.respuestas = datos.preguntas[i].respuestas;
            pregunta.explicacion = datos.preguntas[i].explicacion;
            
/*            for( var j = 0; j < datos.tamRespuestas; j++ )
            {
              pregunta.respuestas[j] = datos.preguntas[i].respuestas[j];
            }*/
            agregarPregunta( pregunta );
            examen.preguntas[i] = new Object();
            examen.preguntas[i].id = pregunta.id;
            examen.preguntas[i].valor = pregunta.valor;
          }
          agregarExamen( examen );
          alert("Se ha registrado un nuevo examen bajo el nombre: " + examen.nombre );
          //$scope.examenes = obtenerExamenes();
        }
        var vm = this;
        $scope.scanResults = "No se ha escaneado ningun codigo";
        $scope.url = null;
        $scope.scan = function(){
          console.log("Entra")
                $cordovaBarcodeScanner
                    .scan()
                    .then(function(result) 
                    {
                        // Success! Barcode data is here
                        $scope.scanResults = "Se obtuvo la \n" +
                        "url: " + result.text + "\n";
                        $scope.url = result.text;
                    }, function(error) 
                    {
                        // An error occurred
                        $scope.scanResults = 'Error: ' + error;
                        alert("Error al escanear el codigo QR")
                    });
            };
        
        $scope.agregarQR= function(){
          $http
          ({
              method: 'GET',
              url: $scope.url
          }).then(
          function successCallback( response ) 
          {
              construirExamen( response.data  );	
          }, 
          function errorCallback(response) 
          {
              alert( "Error al obtener el examen!!" );     
          });          
          $scope.url = null;
        }
        vm.scanResults = '';
        });

/**
 * 
 * este modulo se encarga de enrutar las vistas
 */
app.config(function($stateProvider, $urlRouterProvider, $httpProvider ) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
  
        $stateProvider
          .state('index', {
            url: '/',
            templateUrl: 'index.html',
            controller: 'MainController'
          })
          .state('ejemplo', {
            url: '/ejemplo',
            templateUrl: 'ejemplo.html',
            controller: 'MainController'
          }).state('profesor', {
            url: '/profesor',
            templateUrl: 'profesor.html',
            controller: 'MainController'
          }).state('estudiante', {
            url: '/estudiante',
            templateUrl: 'estudiante.html',
            controller: 'MyCtrl'
          }).state('creareva', {
            url: '/profesor/crear-evaluacion',
            templateUrl: 'creareva.html',
            controller: 'ExamenesController'
          }).state('examenPorUbicacion', {
            url: '/examenPorUbicacion',
            templateUrl: 'examenPorUbicacion.html',
            controller: 'GpsCtrl'
          }).state('secciontemas', {
            url: '/profesor/secciontemas',
            templateUrl: 'secciontemas.html',
            controller: 'ExamenesController'
          }).state('valorpre', {
            url: '/profesor/valorpre',
            templateUrl: 'valorpre.html',
            controller: 'ExamenesController'
          }).state('agregarpregunta', {
            url: '/profesor/agregar-pregunta',
            templateUrl: 'agregarpregunta.html',
            controller: 'MainController'
          }).state('eliminarev', {
            url: '/profesor/eliminar-evaluacion',
            templateUrl: 'eliminarev.html',
            controller: 'ExamenesController'
          }).state('ev-presentadas', {
            url: '/profesor/ev-presentadas',
            templateUrl: 'ev-presentadas.html',
            controller: 'ExamenesController'
          }).state('info-evaluacion', {
            url: '/profesor/info-evaluacion',
            templateUrl: 'info-evaluacion.html',
            controller: 'ExamenesController'
          }).state('camara', {
            url: '/camara',
            templateUrl: 'camara.html',
            controller: 'TomarExamen'
          }).state('qr', {
            url: '/qr',
            templateUrl: 'qr.html',
            controller: 'qr'
          }).state('url', {
            url: '/url',
            templateUrl: 'url.html',
            controller: 'qr'
          }).state('examenes', {
            url: '/examenes',
            templateUrl: 'examenes.html',
            controller: 'TomarExamen'
          }).state('tomarexamen', {
            url: '/tomarexamen/:id',
            templateUrl: 'tomarexamen.html',
            controller: 'TomarExamen'
          });
  $urlRouterProvider.otherwise("/");
});

