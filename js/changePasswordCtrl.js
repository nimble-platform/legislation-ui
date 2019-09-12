
angular.module('nimsys').controller('ChangePasswordCtrl', ['$scope','$rootScope','$localStorage','$http','$location','$window','UrlService', function($scope,$rootScope,$localStorage,$http,$location,$window,UrlService) {
	
	$scope.msg = [];
	
	$rootScope.user = $localStorage.user;
	$rootScope.sLan = localStorage.getItem('nimsysLan');
	
	$scope.passwordOld;
	$scope.passwordNew1;
	$scope.passwordNew2;
		
	$scope.init = function () {
	};

	$scope.sendPassword = function() {

		var username = $rootScope.user.username;

		var passwordOld = $scope.passwordOld;
		var passwordNew1 = $scope.passwordNew1;
		var passwordNew2 = $scope.passwordNew2;
		
		if (passwordNew1 != passwordNew2) {
			$scope.msg = "Password and repeated password do not match";
			$('#alert-error').show();
		}		
		else if (passwordNew1.length < 6) {
			$scope.msg = "Password should contain at least 6 characters";
			$('#alert-error').show();
		}
		else {
			var url = UrlService.props.root + "/rest" + "/changepassword/post/" + username;

			var req = {
				method: 'POST',
				url: url,
//				headers: {
//					'Authorization': 'Bearer ' + $scope.user.token
//				},
				params: {
					'aToken': 'Bearer ' + $scope.user.token,
					'passwordOld': passwordOld,
					'passwordNew': passwordNew1,
					'authMode': UrlService.props.authMode
				}
			}
			
			$http(req).then(function (success){
				$scope.msg = success.data.description;
	    		$('#alert-success').show();
	    		$('#alert-error').hide();
				
	    	},function (error){
	    		if (error.data != null)
	    			$scope.msg = error.data.description;
	    		else 
	    			$scope.msg = error.message;
	    		$('#alert-success').hide();
	    		$('#alert-error').show();
	    	});
		}

	};
	
	
	$scope.$on('$viewContentLoaded', function(){
		$('#wrapper').localize();
	});
	
}]);
