(function() {
    'use strict';

    angular
            .module('app')
            .controller('PostController', PostController);

    PostController.$inject = ['PostService', 'UserService', '$location', '$rootScope', 'FlashService'];
    function PostController(PostService, UserService, $location, $rootScope, FlashService) {
        var vm = this;
        vm.post = '';

        vm.createPost = createPost;
        vm.deletePost = deletePost;
        vm.saveComment = saveComment;
        vm.deleteComment = deleteComment;
      
        loadAllPost();
        loadAllUsers()

        function createPost() {
            if ($rootScope.globals.currentUser) {
                if (vm.post == '') {
                    FlashService.Error("Post can not be blank.");
                } else {
                    vm.dataLoading = true;
                    var postData = {post_user_id: $rootScope.globals.currentUser.logged_user_id, post_text: vm.post};
                    PostService.Create(postData)
                            .then(function(response) {
                        if (response.success) {
                            vm.post = '';
                            FlashService.Success('Post Insert successful', true);
                            loadAllPost();
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

        function loadAllPost() {
            PostService.GetAll()
                    .then(function(posts) {
                $rootScope.allPosts = posts.data.post;
            });
        }

        function loadAllUsers() {
            UserService.GetAll()
                    .then(function(users) {
                $rootScope.allUsers = users.data;
            });
        }

        function deletePost(postId) {
            var deletePost = {post_id: postId, post_user_id: $rootScope.globals.currentUser.logged_user_id};
            PostService.Delete(deletePost)
                    .then(function() {
                 FlashService.Success('Post deleted sucessfully', true);
                $location.path('/post');
            });
        }
        
        function saveComment(postId,postComment) {
             if ($rootScope.globals.currentUser) {
                if (postComment == '') {
                    FlashService.Error("Comment can not be blank.");
                } else {
                    vm.dataLoading = true;
                    var commentData = {comment_user_id: $rootScope.globals.currentUser.logged_user_id, comment_post_id: postId, comment_text: postComment};
                    PostService.insertComment(commentData)
                            .then(function(response) {
                        if (response.success) {
                            vm.post.comment='';
                            FlashService.Success('Comment Insert successful', true);
                            loadAllPost();
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
        
         function deleteComment(commentId) {
            var deleteComment = {comment_id: commentId, comment_user_id: $rootScope.globals.currentUser.logged_user_id};
            PostService.deleteComment(deleteComment)
                    .then(function() {
                 FlashService.Success('Comment deleted sucessfully', true);
                $location.path('/post');
            });
        } 
        
    }

})();
