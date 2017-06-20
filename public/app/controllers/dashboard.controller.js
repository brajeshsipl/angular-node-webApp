(function () {
    'use strict';

    angular
        .module('scotchApp')
        .controller('DashboardController', DashboardController)
      	RegisterController.$inject = ['$scope','$http','ngNotify'];
		function  DashboardController($scope, $http,ngNotify){
			var vm = this;
			$scope.message = 'WELCOME TO DASHBOARD.';
		}

})();
