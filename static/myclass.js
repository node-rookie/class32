angular.module('myClassApp', ['ngRoute']).
run(function ($window, $rootScope, $http, $location) {
	$http({
		url: '/api/validate',
		mothod: 'GET'
	}).success(function (user) {
		$rootScope.me = user
		$location.path('/')
	}).error(function (data) {
		$location.path('/login')
	})
	$rootScope.logout = function() {
		$http({
			url: '/api/logout',
			method: 'GET'
		}).success(function () {
			$rootScope.me = null
			$rootScope.success = "注销成功"
			$location.path('/login')
		})
	}
	$rootScope.$on('login', function (evt, me) {
		$rootScope.me = me
	})
	$rootScope.$on('showMessage', function (evt, message) {
		$rootScope.showMessage = message  
	})
})
