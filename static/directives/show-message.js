angular.module('myClassApp').directive('showMessage', function($timeout) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			$timeout(function(){
				if(scope.success){
			      element.showTopbarMessage({close:1500});
			      scope.success = null;
				}	
		   });
		}
	};
});
