var app = angular.module('scotchApp', []);


app.factory('Page', function($rootScope){
  var title = 'Welcome';
   return {
        setTitle: function(title){
            $rootScope.title = title;
        }
    }
});
