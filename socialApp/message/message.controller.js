(function() {
    'use strict';

    angular
            .module('app')
            .controller('MessageController', MessageController);

    MessageController.$inject = ['MessageService', '$location', '$rootScope', 'FlashService','$routeParams'];
    function MessageController(MessageService, $location, $rootScope, FlashService,$routeParams) {
        var vm = this;
        

        vm.sendMessage = sendMessage;
        vm.message_text = '';
        vm.getMessages = getMessages;
        getMessages();
     

        function getMessages() {
            var messageData = {message_sender_id:$rootScope.globals.currentUser.logged_user_id,message_receiver_id:$routeParams.id};
            MessageService.getMessages(messageData)
                    .then(function(messages) {
               vm.messages = messages.data;
               
            });
        }

      
        function sendMessage() {
           
             if ($rootScope.globals.currentUser) {
                 
                if (vm.message_text == '') {
                    FlashService.Error("Message can not be blank.");
                } else {
                    vm.dataLoading = true;
                    var messageData = {message_sender_id: $rootScope.globals.currentUser.logged_user_id, message_receiver_id:$routeParams.id, message_text: vm.message_text};
                    MessageService.sendMessage(messageData)
                            .then(function(response) {
                        if (response.success) {
                            vm.message_text = '';
                            FlashService.Success('Message send successful', true);
                            getMessages();
                        } else {
                            FlashService.Error(response.message);
                            vm.dataLoading = false;
                        }
                    });
                }
            } else {
                $location.path('/login');
            }
        }
        
    
        
    }

})();
