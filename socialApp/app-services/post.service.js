(function () {
    'use strict';

    angular
        .module('app')
        .factory('PostService', PostService);

    PostService.$inject = ['$http'];
    function PostService($http) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        service.insertComment = insertComment;
        service.deleteComment=deleteComment;

        return service;

        function GetAll() {
            return $http.get('http://183.182.84.84/MEAN/socialApp/api/api.php?method=postlist').then(handleSuccess, handleError('Error getting all users'));
        }

        function GetById(id) {
            return $http.get('/api/posts/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

       
        function Create(post) {
            return $http.post('http://183.182.84.84/MEAN/socialApp/api/api.php?method=postinsert', post).then(handleSuccess, handleError('Error creating user'));
        }

        function Update(user) {
            return $http.put('/api/posts/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(post) {
            return $http.post('http://183.182.84.84/MEAN/socialApp/api/api.php?method=deletepost',post).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
        
        function insertComment(comment) {
            return $http.post('http://183.182.84.84/MEAN/socialApp/api/api.php?method=insertcomment', comment).then(handleSuccess, handleError('Error creating user'));
        }
        
         function deleteComment(comment) {
            return $http.post('http://183.182.84.84/MEAN/socialApp/api/api.php?method=deletecomment',comment).then(handleSuccess, handleError('Error deleting user'));
        }
    }

})();
