(function () {
    'use strict';

    angular
        .module('app')
        .factory('MessageService', MessageService);

    MessageService.$inject = ['$http'];
    function MessageService($http) {
        var service = {};

        service.getMessages = getMessages
        service.sendMessage=sendMessage;

        return service;

        function getMessages(message) {
            return $http.post('http://183.182.84.84/MEAN/socialApp/api/api.php?method=getmessage',message).then(handleSuccess, handleError('Error getting all messages'));
        }

    
        function sendMessage(message) {
            return $http.post('http://183.182.84.84/MEAN/socialApp/api/api.php?method=sendmessage', message).then(handleSuccess, handleError('Error in sending message'));
        }
        
          function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
       
    }

})();
