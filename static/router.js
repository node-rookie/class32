angular.module('myClassApp').config(function($routeProvider, $locationProvider) {
	//$locationProvider.html5Mode(true);
	$routeProvider.
	when('/login', {
		templateUrl: '/pages/login.html',
		controller: 'LoginCtrl'
	}).
	when('/reg', {
		templateUrl: '/pages/reg.html',
		controller: 'RegCtrl'
	}).
	when('/', {
		templateUrl: '/pages/index.html',
		controller: 'IndexCtrl'
	}).
	otherwise({
		redirectTo: '/login'
	})
})

