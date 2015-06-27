var app = angular.module('DreamSupport', ['ngRoute', 'ngAnimate', 'restangular', 'ngCookies'])
    .constant('API_DOMAIN', 'http://ds.com/')
    .config(function ($routeProvider, RestangularProvider, API_DOMAIN) {
        RestangularProvider.setBaseUrl(API_DOMAIN);
        $routeProvider
            .when('/', {
                templateUrl: 'template/index.shady.html',
            })
            .when('/travel/create', {
                templateUrl: 'template/travel/create.html',
                controller: 'TravelCtrl'
            })
            .when('/route', {
                templateUrl: 'template/route/index.html',
            	controller:""
            })

            .otherwise('/');
    });
