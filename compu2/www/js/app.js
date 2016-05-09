var app = angular.module( 'universidad' , ['ionic', 'ui.router', 'ngCordova' ]);
var preguntas = [];
var examenes = [
  {
    id: 1,
    nombre: "Parcial 1 Cálculo",
    descripcion: "1 hora, También puede ser tomado presencial en el salón 2-305. Importante llevar cuaderno, lapiz y borrador",
    tema : "Derivadas",
  },
  {
    id: 2,
    nombre: "Parcial 3 Computación Móvil",
    descripcion: "3 horas, El parcial consiste en hacer una aplicación móvil sencilla. Solo se puede usar phonegap",
    tema : "iOS, PhoneGap y Patrones"
  },{
    id: 3,
    nombre: "Bioquímica",
    descripcion: "3 horas, el parcial es un domingo a las 7am antes de un festivo. 30 preguntas, 20 minutos para resolverlo. Pasa aproximadamante el 1% de los estudiantes",
    tema : "TODO lo visto desde primer semestre. "
  }
];
var respuestas = [];


/**
 * Controlador de la pagina principal
 * 
 * */
app.controller('MainController', function($scope) { // el scope es como una variable global en angular, se puede crear un controlador por vista o conjunto de vistas, como te quede más fácil
  $scope.hello = "Hola mundo, prueba de angular";
  $scope.opciones = [{
    nombre: "Profesores",
    url: "Una URL"
  }, {
    nombre: "Estudiante",
    url: "qwerty"
  }];

  $scope.agregarProfesor = function(profesor) {
    $scope.profesores.push(profesor);
  }
  
  
  $scope.preguntaNueva = null; // aqui agregue una variable para que angular le haga referncia, en el html lo referencio como ng-model, despues cuando llamo el metedo lo envio por paramtero
  $scope.opcionesPregunta = [
    
  ];
  
  $scope.agregarPregunta = function(opcion) {
    $scope.opcionesPregunta.push( { opcion : opcion } ); // tienes que meter un objeto que este formado igual que el otro, osea los de la lista
  }
});


/**
 * 
 * Controlador de prueba del GPS
 *
 * */
app.controller( 'MyCtrl' , function( $scope , $cordovaGeolocation ){
  var watchOptions = { timeout : 3000, enableHighAccuracy: false  };
  var watch = $cordovaGeolocation.watchPosition(watchOptions);
  
  watch.then( null,
  function(err) {
    console.log("Error");
  },
  function(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
  });
  watch.clearWatch();
});


/**
 * 
 * Controlador de Tomar un Examen 
 * 
 */
app.controller('TomarExamen', function( $scope , $cordovaCamera ){
  
  
  
  //////////////// FUNCIONALIDAD DE FOTOS //////////////////////////////
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
  
  function mostrarExamenesDisponibles(){
    examenes.forEach(function(examen){
      console.log(examen.nombre); // falta lo del GPS, para eso el ciclo
    });
    return examenes;
  }
  
  $scope.mostrarExamenesDisponibles = mostrarExamenesDisponibles;
  $scope.examenes = mostrarExamenesDisponibles();
  
  
});

/**
 * Controlador del codigo QR
 * 
 */
app.controller('qr', function($scope, $rootScope, $cordovaBarcodeScanner, $ionicPlatform) {
        var vm = this;
        $scope.scanResults = "No se ha escaneado ningún código";
        $scope.url = null;
        $scope.scan = function(){
          console.log("Entra")
                $cordovaBarcodeScanner
                    .scan()
                    .then(function(result) {
                        // Success! Barcode data is here
                        $scope.scanResults = "Se obtuvo la url \n" +
                        "url: " + result.text + "\n";
                        $scope.url = result.text;
                    }, function(error) {
                        // An error occurred
                        $scope.scanResults = 'Error: ' + error;
                    });
        };
        
        $scope.agregarQR= function(){
          alert("Se agrega a \n" + $scope.url);
          $scope.url = null;
        }
        vm.scanResults = '';
});




/**
 * 
 * este modulo se encarga de enrutar las vistas
 */
app.config(function($stateProvider, $urlRouterProvider) {
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
            controller: 'MainController'
          }).state('agregarpregunta', {
            url: '/profesor/agregar-pregunta',
            templateUrl: 'agregarpregunta.html',
            controller: 'MainController'
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
          });
  $urlRouterProvider.otherwise("/");
});
