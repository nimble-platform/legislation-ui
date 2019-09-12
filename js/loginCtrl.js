
angular.module('nimsys').controller('LoginCtrl', ['$scope','loginFactory','$http','$localStorage','UrlService', function($scope, loginFactory, $http, $localStorage, UrlService){

	$scope.msg = [];
	
	$scope.user = {};
	
	$scope.lan = [];
  
	$scope.login = function(user){
		
		$("body").addClass("loading");
		
		$scope.user.authMode = UrlService.props.authMode;
		
		if (UrlService.props.authMode == "nimble") {
			
			loginFactory.login_nimble($scope.user)
				.then(function(good){
					$scope.user.token = good.data.accessToken;
					$scope.user.role = "normal";
					$scope.setUser($scope.user);
					$scope.msg = "User successfully authenticated!";
					$('#alert-success').show();
			 		$('#alert-error').hide();
//			 		alert("TOKEN=" + $scope.user.token + "ROLE=" + $scope.user.role);
			 		console.log("nimble token: " + $scope.user.token);
			 		
			 		$scope.save($scope.user);
			 		
			 		$("body").removeClass("loading");
	
				}, function (error) {
//					$scope.msg = error.data.description;
					$scope.msg = "Not valid user/password";
					$('#alert-success').hide();
					$('#alert-error').show();
					
					$("body").removeClass("loading");
				});
			
		} else {
    
			loginFactory.login_internal($scope.user)
				.then(function(good){
					$scope.user.token = good.data.token;
					$scope.user.role = good.data.role;
					$scope.setUser($scope.user);
					$scope.msg = "User successfully authenticated!";
					$('#alert-success').show();
			 		$('#alert-error').hide();
	//		 		alert("TOKEN=" + $scope.user.token + "ROLE=" + $scope.user.role);
			 		console.log("internal token: " + $scope.user.token);
			 		
			 		$scope.save($scope.user);
			 		
			 		$("body").removeClass("loading");
	
				}, function (error) {
					$scope.msg = error.data.message;
					$('#alert-success').hide();
					$('#alert-error').show();
					
					$("body").removeClass("loading");
				});
		}
	};
  
  
	$scope.init = function () {
		$scope.user.username = "";
	};
	
	
	$scope.save = function(user) {
		$localStorage.user = user;
	};

	$scope.load = function() {
		$scope.user = $localStorage.user;
	};
	
	
	$scope.$on('$viewContentLoaded', function(){
		$('#wrapper').localize();
	});

}]);
