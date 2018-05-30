
angular.module('nimsys').controller('LoginCtrl', ['$scope','loginFactory','$http','$localStorage', function($scope, loginFactory, $http, $localStorage){

	$scope.msg = [];
	
	$scope.user = {};
	
	$scope.lan = [];
  
	$scope.login = function(user){
		
		$("body").addClass("loading");
    
		loginFactory.login($scope.user)
			.then(function(good){
				$scope.user.token = good.data.token;
				$scope.user.role = good.data.role;
				$scope.setUser($scope.user);
				$scope.msg = "User successfully authenticated!";
				$('#alert-success').show();
		 		$('#alert-error').hide();
//		 		alert("TOKEN=" + $scope.user.token + "ROLE=" + $scope.user.role);
		 		
		 		// KEEP USER
		 		$scope.save($scope.user);
		 		
		 		$("body").removeClass("loading");

			}, function (error) {
				$scope.msg = error.data.message;
				$('#alert-success').hide();
				$('#alert-error').show();
				
				$("body").removeClass("loading");
			});
	};
  
  
	$scope.init = function () {
	};
	
	
	$scope.save = function(user) {
		$localStorage.user = user;
	};

	$scope.load = function() {
		$scope.user = $localStorage.user;
	};
	
	
	$scope.$on('$viewContentLoaded', function(){
	    $('.container').localize();
	});

}]);
