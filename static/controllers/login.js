angular.module('myClassApp').controller('LoginCtrl', function($scope, $http, $location) {
	$scope.login = function () {
		$http({
			url: '/api/login',
			method: 'POST',
			data: {
				email: $scope.email,
				password: $scope.password
			}
		}).success(function (obj) {
			$scope.$emit('login', obj.user);
			//$scope.showMessage = obj.msg;
			$location.path('/');			
		}).error(function (obj) {
			$("#showMessage").html(obj.msg);
			$("#showMessage").showTopbarMessage({close:2000,success:false});
			$location.path('/login')
		})
	}
})
