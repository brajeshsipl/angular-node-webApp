(function () {
    'use strict';

    angular
        .module('scotchApp')
        .controller('mainController', mainController)
        .controller('aboutController', aboutController)
        .controller('contactController', contactController);
		mainController.$inject = ['$scope'];
		aboutController.$inject = ['$scope'];
		contactController.$inject = ['$scope'];
    
		function  mainController($scope ){
			$scope.message = 'NEW HOME PAGE.';
			 
		}
	
		function  aboutController($scope){
			$scope.message = 'Look! I am an about page.';
		 
		}
		function  contactController($scope){
			$scope.message = 'Contact us! JK. This is just a demo.';
			 
		}
})();
