(function () {
    'use strict';

    angular
        .module('scotchApp')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout'];
    function AuthenticationService($http, $cookieStore, $rootScope, $timeout) {
        var service = {};
        var BASE_PATH = 'http://183.182.84.84/MEAN/socialApp/api/';
        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;

        return service;
/**
 * [Login description]
 * @param {[type]}   username [description]
 * @param {[type]}   password [description]
 * @param {Function} callback [description]
 */
        function Login(email, password, callback) {
            $http.post('api/userlogin', { email: email, password: password })
                .then(function (response) {
                    callback(response);
                });
        }

/**
 * [SetCredentials description]
 * @param {[type]} userid    [description]
 * @param {[type]} username  [description]
 * @param {[type]} firstname [description]
 */
        function SetCredentials(id, firstname) {
          alert(id);
            var authdata = id + ':' + firstname;
            $rootScope.globals = {
                currentUser: {
                    id: id,
                    authdata: authdata,
                    first_name:firstname
                }
            };
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
        }

/**
 * [SetCredentials ClearCredentials]
 *
 */
        function ClearCredentials() {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic';
        }
    }


})();
