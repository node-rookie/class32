angular.module('myClassApp').controller('RegCtrl', function($scope, $http, $location) {
	$scope.reg = function () {
		$http({
			url: '/api/reg',
			method: 'POST',
			data: {
				email: $scope.email,
				password: $scope.password,
				password_repeat: $scope.password_repeat
			}
		}).success(function (obj) {
			//$scope.showMessage = obj.msg;
			$scope.$emit('login', obj.user);
			$location.path('/')
		}).error(function (obj) {
			$scope.showMessage = obj.msg;
			$("#showMessage").html(obj.msg);
			$("#showMessage").showTopbarMessage({close:2000,success:false});
			$location.path('/reg')
		})
	}
})
