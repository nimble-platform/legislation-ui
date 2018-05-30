
angular.module('nimsys').controller('UserCtrl', ['$scope','loginFactory','$rootScope','$localStorage','$http','$location','$window','UrlService', function($scope,loginFactory,$rootScope,$localStorage,$http,$location,$window,UrlService) {
	
	$scope.msg = [];
	
	$rootScope.user = $localStorage.user;
	$rootScope.sLan = localStorage.getItem('nimsysLan');
	
	$scope.user = [];
	
	$scope.init = function () {
		$scope.getUser();
	};
	
	
	$scope.getUser = function() {
		
		$("body").addClass("loading");
		
		var username = $rootScope.user.username;
		var password = $rootScope.user.password;
		
		var url = UrlService.root + "/rest/user/get/" + username;
		
//		$http.defaults.useXDomain = true;
		
		var req = {
			method: 'GET',
			url: url,
//			withCredentials: true,
//			headers: {
//				'Authorization': 'Bearer ' + $rootScope.user.token
//			},
			params: {
				'aToken': 'Bearer ' + $rootScope.user.token
			}
		}
		
		$http(req).then(function (success){
			$scope.user = success.data;
    		console.log($scope.user);
    		$scope.msg = "User data succesfully retrieved";
    		
    		$('#alert-success').show();
    		$('#alert-error').hide();
    		
    		$("body").removeClass("loading");

    	},function (error){
    		if (error.data != null)    		
    			$scope.msg = error.data.message;
    		else 
    			$scope.msg = error.message;
    		$('#alert-success').hide();
    		$('#alert-error').show();
    		
    		$("body").removeClass("loading");
    	});
	};
	
	
	$scope.sendData = function() {

		var username = $rootScope.user.username;
		var password = $rootScope.user.password;
		
		var url = UrlService.root + "/rest/user/post/" + username;

		var data = {
			firstname : $scope.user.firstname,
			lastname : $scope.user.lastname,
			company : $scope.user.company
		};
		
		var req = {
			method: 'POST',
			url: url,
			headers: {
//				'Authorization': 'Bearer ' + $scope.user.token,
				'Content-Type': 'application/json'
			},
			params: {
				'aToken': 'Bearer ' + $scope.user.token
			},
			data: data
		}
		
		$http(req).then(function (success){
			$scope.msg = "Changes successfully saved!";
    		$('#alert-success').show();
    		$('#alert-error').hide();
    	},function (error){
    		$scope.msg = error.data.message;
    		$('#alert-success').hide();
    		$('#alert-error').show();
    	});

	};
	
	
	$scope.$on('$viewContentLoaded', function(){
	    $('.container').localize();
	});
	

}]);
