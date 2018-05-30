
angular.module('nimsys').controller('ContactCtrl', ['$scope','$rootScope','$localStorage','$http','$location','$window', function($scope,$rootScope,$localStorage,$http,$location,$window) {
	
	$scope.msg = [];
	
//	$rootScope.user = $localStorage.user;
	$rootScope.sLan = localStorage.getItem('nimsysLan');
	
//	$scope.user = [];
	
	$scope.init = function () {
		
	};
	
	
	$scope.$on('$viewContentLoaded', function(){
	    $('.container').localize();
	});
	

}]);
