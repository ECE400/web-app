// Define app for use with all controllers/directives/factories/etc. */
var app = angular.module('mrPour', ['ui.router']);

/* Control the routing of different pages */
app.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/javascripts/home/main-template.html',
                controller: 'MainCtrl',
                resolve: {
                	postPromise: ['posts', function (posts) {
                		return posts.getAll();
                	}]
                }
            })
            .state('posts', {
                url: '/posts/{id}',
                templateUrl: '/javascripts/posts/posts-template.html',
                controller: 'PostsCtrl',
                resolve: {
                	post: ['$stateParams', 'posts', function($stateParams, posts) {
                		return posts.get($stateParams.id);
                	}]
                }
            })
            .state('login', {
            	url: '/login',
            	templateUrl: '/javascripts/auth/login-template.html',
            	controller: 'AuthCtrl',
            	onEnter: ['$state', 'auth', function ($state, auth) {
            		if (auth.isLoggedIn()) {
            			$state.go('home');
            		}
            	}]
            })
            .state('register', {
            	url: '/register',
            	templateUrl: '/javascripts/auth/registration-template.html',
            	controller: 'AuthCtrl',
            	onEnter: ['$state', 'auth', function ($state, auth) {
            		if (auth.isLoggedIn()) {
            			$state.go('home');
            		}
            	}]
            });

        $urlRouterProvider.otherwise('home');
    }
]);