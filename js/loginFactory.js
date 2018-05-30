'use strict';

angular.module('nimsys').factory('UrlService', function() {
	return {
		root : 'http://83.136.188.223/nimsys'
	};
});

angular.module('nimsys').factory('loginFactory',['$http', '$q', '$rootScope', '$localStorage', 'UrlService', function($http, $q, $rootScope, $localStorage, UrlService){
	var ajsbsFactory = {};
	$http.defaults.useXDomain = true;
   
	ajsbsFactory.login = function(user){
		
		var deferred = $q.defer();

	    var url = UrlService.root + "/rest/authentication";

	    var req = {
	    	method: 'POST',
			url: url,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			transformRequest: function(obj) {
		        var str = [];
		        for(var p in obj)
		        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		        return str.join("&");
		    },
			data: user
	    }
		
	    $http(req).then(function (success){
	    	deferred.resolve(success);
	    	
	    },function (error){
	    	deferred.reject(error);
	    });
	
	    return deferred.promise;
	}

	
	
	/*
	 * New method to check token to server
	 */
//	ajsbsFactory.isValidToken = function(){
//		
//		var deferred = $q.defer();
//		
//		$rootScope.user = $localStorage.user;
//		
//		var tokenObj = {
//			username: $rootScope.user.username,
//			token: $rootScope.user.token
//		}
//	
//	    var url = UrlService.root + "/rest/checktoken";
//
//	    var req = {
//	    	method: 'POST',
//			url: url,
//			headers: {
//				'Content-Type': 'application/json'
//			},
//			data: tokenObj
//	    }
//		
//	    $http(req).then(function (success){
//	    	deferred.resolve(success);	    	
//	    	
//	    },function (error){
//	    	deferred.reject(error);
//	    });
//	    
//	    return deferred.promise;
//	}

	
	return ajsbsFactory;
 }]);
  
angular.module('nimsys').constant('AUTH_EVENTS', {
	loginSuccess: 'auth-login-success',
	loginFailed: 'auth-login-failed',
	logoutSuccess: 'auth-logout-success',
	sessionTimeout: 'auth-session-timeout',
	notAuthenticated: 'auth-not-authenticated',
	notAuthorized: 'auth-not-authorized'
});

angular.module('nimsys').constant('USER_ROLES', {
	all: '*',
	superAdmin: 'superAdmin',
	admin: 'admin',
	normal: 'normal'
});

angular.module('nimsys').service('Session', function(){
	this.create = function(id, role, code){
		this.id = id;
		this.role = role;
		this.roleCode = code;
	};

	this.destroy = function(){
		this.id = null;
		this.role = null;
		this.roleCode = null;
	};

     return this;

});


angular.module('nimsys').factory('AuthService',['$http', 'Session', '$rootScope', '$localStorage', 'UrlService', function($http, Session, $rootScope, $localStorage, UrlService){

	var authService = {};
	
	authService.redirect = true;

	authService.logout = function(){

		var token = Session.id;
		Session.destroy();
		
		var url = UrlService.root + "/rest/logout";

		var req = {
			method: 'POST',
			url: url,
			headers: {
				'Content-Type': 'application/json'
			},
			data: token
		}
	
		$http(req).then(function (success){

		},function (error){

		});

	}

	authService.isAdmin = function(){
	
		return !!Session.id && (Session.roleCode === USER_ROLES.admin || Session.roleCode === USER_ROLES.superAdmin);
	}

	authService.isAuthenticated = function(){
		
//		return !!Session.id;
		
		$rootScope.user = $localStorage.user;
//		alert("estamos en isAuthenticated y username = " + $rootScope.user.username);
		return !!$rootScope.user.username;
	}

	authService.isAuthorized = function(authorizedRoles){
	
		if(!angular.isArray(authorizedRoles)){
			authorizedRoles = [authorizedRoles];
		}

		$rootScope.user = $localStorage.user;
		return (authService.isAuthenticated() &&
				authorizedRoles.indexOf($rootScope.user.roleCode) !== -1);
	};
	

	return authService;

}]);

