'use strict';
   var App =  angular
        .module('scotchApp', ['ngRoute','ngNotify', 'ngCookies'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
      function config($routeProvider, $locationProvider) {
		  $locationProvider.hashPrefix('');
        $routeProvider
            	// route for the home page
			.when('/', {
				templateUrl : 'app/pages/home.html',
				controller  : 'mainController',
				 controllerAs: 'vm',
				title: 'Home Page'
			})

			// route for the about page
			.when('/about', {
				templateUrl : 'app/pages/about.html',
				controller  : 'aboutController',
				 controllerAs: 'vm',
				title: 'About'
			})

			// route for the contact page
			.when('/contact', {
				templateUrl : 'app/pages/contact.html',
				controller  : 'contactController',
				 controllerAs: 'vm',
				title: 'Contact'
			})
			.when('/register', {
				templateUrl : 'app/pages/register.html',
				controller  : 'RegisterController',
				 controllerAs: 'vm',
				title: 'Register'

			})
			.when('/login', {
				templateUrl : 'app/pages/login.html',
				controller  : 'LoginController',
				 controllerAs: 'vm',
				title: 'Login'

			})
			.when('/dashboard', {
				templateUrl : 'app/pages/dashboard.html',
				controller  : 'DashboardController',
				 controllerAs: 'vm',
				title: 'Dashboard'

			})

            .otherwise({ redirectTo: '/' });
    }

    run.$inject = ['$rootScope', '$location','$route', '$cookies', '$http','ngNotify'];
    function run($rootScope, $location, $cookies, $http ,$route,ngNotify) {

    }


	App.run(['$rootScope', function($rootScope) {
		$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
			$rootScope.title = current.$$route.title;
		});
	}]);

ngNotify.config({
    theme: 'pitchy',
    position: 'top',
    duration: 3000,
    type: 'info',
    sticky: true,
    button: false,
    html: false
});
