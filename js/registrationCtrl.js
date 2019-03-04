
angular.module('nimsys').controller('RegistrationCtrl', ['$scope','$localStorage','$http','$location','$window','UrlService', function($scope,$localStorage,$http,$location,$window,UrlService) {
	
	$scope.msg = [];
	
//	$rootScope.user = $localStorage.user;
//	$rootScope.sLan = localStorage.getItem('nimsysLan');
	
	$scope.user = {};
	$scope.lan = [];
	
	$scope.comments = [];
	
	$scope.init = function () {
		
	};
	
	$scope.sendData = function() {
		
		$("body").addClass("loading");
		
		var url = UrlService.root + "/rest/user/signup/post";

		var data = {
			firstname : $scope.user.firstname,
			lastname : $scope.user.lastname,
			company : $scope.user.company,
			email : $scope.user.email,
			/*role : "normal",*/
			comments: $scope.comments
		};
		
		var req = {
			method: 'POST',
			url: url,
			headers: {
//				'Authorization': 'Bearer ' + $scope.user.token,
				'Content-Type': 'application/json'
			}/*,
			params: {
				'aToken': 'Bearer ' + $scope.user.token
			}*/,
			data: data
		}

		$http(req).then(function (success){
			$scope.msg = "Registration request sent. You will receive a confirmation email when aproved by the administrator.";
    		$('#alert-success').show();
    		$('#alert-error').hide();
    		
    		$("body").removeClass("loading");
    	},function (error){
    		$scope.msg = error.data.description;
			$('#alert-success').hide();
			$('#alert-error').show();
			
			$("body").removeClass("loading");
    	});
	};
	
	
	$scope.$on('$viewContentLoaded', function(){
		$('#wrapper').localize();
	});
	

}]);
