(function () {
    'use strict';

    angular
        .module('scotchApp')
        .controller('LoginController', LoginController)
      	LoginController.$inject = ['$scope','$http','ngNotify','AuthenticationService'];
		function  LoginController($scope, $http,ngNotify,AuthenticationService){

			var vm = this;

      $scope.getlogin  =  function(){

        AuthenticationService.Login($scope.user.email, $scope.user.password, function (response) {
            if (response.data.success) {
                
                var user = response.data.data;
                console.table(user)
                AuthenticationService.SetCredentials(user._id,user.firstname);
                ngNotify.set(response.data.message, {
								position: 'top',
								theme: 'prime',
								sticky: false,
								type: 'success',
								duration: 2000
							});
							 window.location.href = "#/dashboard";
            } else {
              ngNotify.set(response.data.message, {
              position: 'top',
              theme: 'prime',
              sticky: false,
              type: 'error',
              duration: 2000
            });
            vm.dataLoading = false;
            }
        });

			}
		}

})();
