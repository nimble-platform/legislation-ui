
angular.module('nimsys').controller('LogoutCtrl', ['$scope','$rootScope','$state','$http','$localStorage','$location','$window', function($scope, $rootScope, $state, $http, $localStorage,$location,$window){
  
	$scope.init = function () {
		$rootScope.user = null;
		
		/* Remove from localStorage */
		$localStorage.user = null;

		//$state.go('login');
		$window.location.href = 'index.html';
	};
	
	
	$scope.$on('$viewContentLoaded', function(){
	    $('.container').localize();
	});

}]);
