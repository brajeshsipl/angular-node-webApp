(function () {
    'use strict';

    angular
        .module('scotchApp')
        .controller('RegisterController', RegisterController)
      	RegisterController.$inject = ['$scope','$http','ngNotify'];
		function  RegisterController($scope, $http,ngNotify){

			var vm = this;
				$scope.submit  =  function(){
					 vm.dataLoading = true;
					$http.post('api/registeruser', {firstname : $scope.user.firstName,
						lastname : $scope.user.lastName,
						email: $scope.user.username ,
						password: $scope.user.password
					}).then(function (res){
						if(res.data.success == true){
								ngNotify.set(res.data.message,{
								position: 'top',
								theme: 'prime',
								sticky: false,
								type: 'success',
								duration: 2000
							});
							vm.dataLoading = false;
						}else{
								ngNotify.set(res.data.message, {
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
