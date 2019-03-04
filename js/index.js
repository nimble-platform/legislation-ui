$(document).ready(function() {
    var lan = localStorage.getItem('nimsysLan');
    
    if (lan == null)
    	lan = "en";
    
    if(window.localStorage) {
    	localStorage.setItem("nimsysLan", lan);
    	moment.locale(lan);
        i18next.locale = lan;
        jqueryI18next.init(i18next, $);
        $('.container').localize();
	} else {
		alert("localStorage is not supporteb by your brouser");
	}
});


i18next.init({
  lng: localStorage.getItem('nimsysLan'),
  load:['en', 'es'],
  debug: false,
  resources: {
	en: {
		translation: {
			"key": "hello guys",
			"app": {
			    "name": "nimsys"
			},
			"menu": {
				"login": "Login",
				"searchdocument": "Search",
				"user": "User",
				"userinformation": "User information",
				"changepassword": "Change password",
				"logout": "Logout",
				"language": "Language",
				"contact": "Contact"
			},
			"buttons": {
				"save": "Save",
				"submit": "Submit",
				"change": "Change",
				"Regulation": "Regulation",
				"Legislation": "Legislation",
				"Patent": "Patent",
				"Sectorialreport": "Sectorial report",
				"searchoptions": "Search options",
				"searchdocuments": "Search documents",
				"backtosearch": "Back to search",
				"register": "Sign Up"
			},
			"login": {
				"title": "Login",
				"email": "E-Mail",
				"password": "Password",
				"notyetregistered": "Not yet registered?",
				"createaccount": "create new account"
			},
			"logout": {
				"title": "Logging out..."
			},
			"user": {
				"title": "User information",
			    "firstname": "Firstname",
			    "lastname": "Lastname",
			    "company": "Company",
			    "username": "Username",
			    "email": "E-Mail",
			    "createdon": "Created on",
			    "lastaccesson": "Last access on",
			    "comments": "Comments"
			},
			"changepassword": {
				"title": "Change password",
				"old": "Old password",
				"new": "New password",
				"repeat": "Repeat new password"
			},
			"contact": {
				"text": "For any request for advice about product or process certification, please contact AIDIMME",
				"link": "contact form"
			},
			"search": {
				"basicinformation": "Basic information",
				"code": "Code",
				"title": "Title",
				"description": "Description",
				"datefrom": "Date from",
				"dateto": "Date to",
				"dateentry": "Date Entry",
				"descriptors": "Descriptors",
				"found": "Documents found",
				"sortby": "Sort by",
				"link": "Link",
				"country": "Country",
				"downloaddocument": "Download document",
				"results": {
					"type": "TYPE",
					"code": "CODE",
					"title": "TITLE",
					"date": "DATE"
				},
				"pagination": {
					"first": "First",
					"last": "Last",
					"previous": "Previous",
					"next": "Next"
				},
				"docdetails": "Document details",
				"selecteddoc": "Selected document",
				"regulation": {
					"properties": "Normative properties",
					"regulationtype": "Regulation type",
					"regulationnumber": "Regulation number",
					"dateupdate": "Date Update",
					"technicalcommittee": "Tech. Committee",
					"editingdate": "Editing Date",
					"numofpages": "Num. of pages",
					"language": "Language",
					"identifyen": "Identify EN",
					"une-description": "This is a collection of norms, experimental norms and reports (standards) created in the 'Comités Técnicos de Normalización' (CTN) of the 'Asociación Española de Normalización y Certificación' (AENOR)",
					"une-en-description": "When some European or International norm is officially adopted in Spain, the preffix UNE is added to the codification",
					"iso-description": "The International Organization for Standardization (ISO) is an organization for the creation of international standards formed by different national standardisation bodies. Main offices at Geneva, Switzerland",
					"astm-description": "ASTM international is an organization of international norms that develops and publishes voluntary agreements of technical norms for a wide range of materials, products, systems and services. Main offices at USA",
					"ansi-description": "ANSI is a nonprofit organization that monitors the development of standards for products, services, processes and systems in the United States of America"
				},
				"legislation": {
					"properties": "Legislation properties",
					"legalassessment": "Legal assessment",
					"publicationdate": "Publication date",
					"originofdocument": "Origin of document"
				},
				"sectorialreport": {
					"properties": "Sectorial report properties",
					"authors": "Authors",
					"dateofdocumentfrom": "Date of document from",
					"dateofdocumentto": "Date of document to",
					"dateofdocument": "Date Of Document"
				}
			}
	  	}
    },
    es: {
    	translation: {
    		"key": "hola mundo",
    		"app": {
			    "name": "nimsys"
			},
			"menu": {
				"login": "Iniciar sesión",
				"searchdocument": "Buscar",
				"user": "Usuario",
				"userinformation": "Datos de usuario",
				"changepassword": "Cambiar contraseña",
				"logout": "Cerrar sesión",
				"language": "Idioma",
				"contact": "Contacto"
			},
			"buttons": {
				"save": "Guardar",
				"submit": "Aceptar",
				"change": "Cambiar",
				"Regulation": "Normativa",
				"Legislation": "Legislación",
				"Patent": "Patentes",
				"Sectorialreport": "Informes sectoriales",
				"searchoptions": "Opciones de búsqueda",
				"searchdocuments": "Buscar documentos",
				"backtosearch": "Volver a búsqueda",
				"register": "Registrarse"
			},
			"login": {
				"login": "Iniciar sesión",
				"email": "Correo electrónico",
				"password": "Contraseña",
				"notyetregistered": "¿No está registrado?",
				"createaccount": "crear nueva cuenta"
			},
			"logout": {
				"title": "Cerrando sesión..."
			},
			"user": {
				"userinformation": "Datos de usuario",
				"firstname": "Nombre",
			    "lastname": "Apellido",
			    "company": "Empresa",
			    "username": "Nombre de usuario",
			    "email": "Correo electrónico",
			    "createdon": "Creado el",
			    "lastaccesson": "Último acceso el",
			    "comments": "Comentarios"
			 },
			 "changepassword": {
				"title": "Cambiar contraseña",
				"old": "Contraseña actual",
				"new": "Nueva contraseña",
				"repeat": "Repetir nueva contraseña"
			 },
			 "contact": {
				 "text": "Para cualquier consulta de asesoramiento para certificación de producto o proceso, póngase en contacto con AIDIMME",
				 "link": "formulario de contacto"
			 },
			 "search": {
				"basicinformation": "Información principal",
				"code": "Código",
				"title": "Título",
				"description": "Descripción",
				"datefrom": "Fecha desde",
				"dateto": "Fecha hasta",
				"dateentry": "Fecha de alta",
				"descriptors": "Descriptores",
				"found": "Documentos encontrados",
				"sortby": "Ordenar por",
				"link": "Enlace",
				"country": "País",
				"downloaddocument": "Descargar documento",
				"results": {
					"type": "TIPO",
					"code": "CÓDIGO",
					"title": "TITULO",
					"date": "FECHA"
				},
				"pagination": {
					"first": "Primera",
					"last": "Última",
					"previous": "Anterior",
					"next": "Siguiente"
				},
				"docdetails": "Detalles del documento",
				"selecteddoc": "Documento seleccionado",
				"regulation": {
					"properties": "Propiedades de normativa",
					"regulationtype": "Tipo de norma",
					"regulationnumber": "Número de norma",
					"dateupdate": "Fecha de actualización",
					"technicalcommittee": "Comité de norm.",
					"editingdate": "Fecha de edición",
					"numofpages": "Num. de páginas",
					"language": "Idioma",
					"identifyen": "Identifica EN",
					"une-description": "Los documentos normativos UNE (acrónimo de Una Norma Española) son un conjunto de normas, normas experimentales e informes (estándares) creados en los Comités Técnicos de Normalización (CTN) de la Asociación Española de Normalización y Certificación (AENOR)",
					"une-en-description": "En el caso de adopción de una norma europea o internacional, se añade el prefijo UNE a la codificación",
					"iso-description": "La Organización Internacional de Normalización es una organización para la creación de estándares internacionales compuesta por diversas organizaciones nacionales de estandarización. Oficinas centrales: Ginebra, Suiza",
					"astm-description": "ASTM International es una organización de normas internacionales que desarrolla y publica acuerdos voluntarios de normas técnicas para una amplia gama de materiales, productos, sistemas y servicios. Oficinas centrales: Estados Unidos",
					"ansi-description": "El Instituto Nacional Estadounidense de Estándares, más conocido como ANSI, es una organización sin fines de lucro que supervisa el desarrollo de estándares para productos, servicios, procesos y sistemas en los Estados Unidos"
				},
				"legislation": {
					"properties": "Propiedades de legislación",
					"legalassessment": "Evaluación jurídica",
					"publicationdate": "Fecha de publicación",
					"originofdocument": "Origen del documento"
				},
				"sectorialreport": {
					"properties": "Propiedades de informe sectorial",
					"authors": "Autores",
					"dateofdocumentfrom": "Fecha del documento desde",
					"dateofdocumentto": "Fecha del documento hasta",
					"dateofdocument": "Fecha del documento"
				}
			}
        }
    }
  }
}, function(err, t) {
//	$("#mensajito").html(i18next.t('key'));
    jqueryI18next.init(i18next, $);
    $('.container').localize();
});


function changeLanguage(lan) {
	i18next.changeLanguage(lan);
}


i18next.on('languageChanged', function(lng) {
    moment.locale(lng);
    
    i18next.locale = lng;
    
    if(window.localStorage) {
    	localStorage.setItem("nimsysLan", lng);
    	
    	// then re-render your app, maybe refresh the current page
        location.reload();
	} else {
		alert("localStorage is not supporteb by your brouser");
	}
});


angular.module('nimsys', ['ui.router', 'ngStorage', 'ngMaterial', 'ngMessages', 'ngLoadingSpinner', 'ui.bootstrap']).config(function($stateProvider, $urlRouterProvider, USER_ROLES){
	  
  $urlRouterProvider.otherwise('login');
  
  
  $stateProvider
	  .state('base', {abstract: true, url: '', templateUrl:'main.html', controller:'MainCtrl' })
	  .state('login', {parent:'base', url: '/login', templateUrl:'login.html', controller:'LoginCtrl' })
	  .state('admin', {parent:'base', url: '/admin', templateUrl:'admin.html', controller:'AdminCtrl', data: {authorizedRoles: [USER_ROLES.superAdmin, USER_ROLES.admin]}})
	  
	  .state('normal',{parent:'base', url: '/normal', templateUrl:'user.html', controller:'UserCtrl', data: {authorizedRoles: [USER_ROLES.superAdmin, USER_ROLES.admin, USER_ROLES.normal]}})
//	  .state('normal',{parent:'base', url: '/normal', templateUrl:'normal.html', controller:'NormalCtrl', data: {authorizedRoles: [USER_ROLES.superAdmin, USER_ROLES.admin, USER_ROLES.normal]}})
	  
	  .state('user', {parent:'base', url: '/user', templateUrl:'user.html', controller:'UserCtrl', data: {authorizedRoles: [USER_ROLES.superAdmin, USER_ROLES.admin, USER_ROLES.normal]}})
	  .state('changePassword', {parent:'base', url: '/changePassword', templateUrl:'changePassword.html', controller:'ChangePasswordCtrl', data: {authorizedRoles: [USER_ROLES.superAdmin, USER_ROLES.admin, USER_ROLES.normal]}})
	  .state('search', {parent:'base', url: '/search', templateUrl:'search.html', controller:'SearchCtrl', data: {authorizedRoles: [USER_ROLES.superAdmin, USER_ROLES.admin, USER_ROLES.normal]}})
	  .state('docDetails', {parent:'base', url: '/docDetails/:docType/:idDoc', templateUrl:'docDetails.html', controller:'DocDetailsCtrl', data: {authorizedRoles: [USER_ROLES.superAdmin, USER_ROLES.admin, USER_ROLES.normal]}})
	  .state('contact', {parent:'base', url: '/contact', templateUrl:'contact.html', controller:'ContactCtrl', data: {authorizedRoles: [USER_ROLES.superAdmin, USER_ROLES.admin, USER_ROLES.normal]}})
	  .state('registration', {parent:'base', url: '/registration', templateUrl:'registration.html', controller:'RegistrationCtrl', data: {authorizedRoles: [USER_ROLES.superAdmin, USER_ROLES.admin, USER_ROLES.normal]}})
	  
	  .state('test', {parent:'base', url: '/test', templateUrl:'test.html', controller:'TestCtrl', data: {authorizedRoles: [USER_ROLES.superAdmin, USER_ROLES.admin, USER_ROLES.normal]}})
	  
	  .state('logout', {parent:'base', url: '/logout', templateUrl:'logout.html', controller:'LogoutCtrl', data: {authorizedRoles: [USER_ROLES.superAdmin, USER_ROLES.admin, USER_ROLES.normal]}})
	  ;

  
	}).run(function($rootScope, loginFactory, $state, $http, AUTH_EVENTS, AuthService){

		$rootScope.$on('$stateChangeStart', function(event, next){

			    if(next.name !== 'login' && next.name !== 'registration' && next.name !== 'contact') {
			    	var authorizedRoles = next.data.authorizedRoles;
			    	
			    	/*
			    	loginFactory.isValidToken()
						.then(function(good){
							console.log("TOKEN válido");
						}, function (error) {
							console.log("TOKEN caducado");
							$state.go('login');
						});
			    	*/
			    	$state.go('login');
			      
			    	if( !AuthService.isAuthorized(authorizedRoles) ){
			        
			    		event.preventDefault();
			        
			    		if(AuthService.isAuthenticated())
			    			$rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
			    		else
			    			$rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
			           
			    		alert('Access Denied. Only users with administrator role can access this section.');
			    	}
		
		
			    } else if(next.name == 'admin' && AuthService.isAdmin()) {
			    	$state.go('admin');
			    }

			}
		)
		,$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams, options) {
		    
		});

});
