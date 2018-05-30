
angular.module('nimsys').controller('AdminCtrl', ['$scope','$rootScope','$localStorage', function($scope,$rootScope,$localStorage) {
	
	$rootScope.user = $localStorage.user;
	$rootScope.sLan = localStorage.getItem('nimsysLan');
	
	
	$scope.checkSignedIn = function() {
        return $rootScope.user;
    }
	
	
	$scope.$on('$viewContentLoaded', function(){
	    $('.container').localize();
	});
	
	
}]);