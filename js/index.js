var app = angular.module('DreamSupport', ['ngRoute', 'ngAnimate', 'restangular'])
    .constant('API_DOMAIN', 'http://dream-support.ddns.net/')
    .config(function ($routeProvider, RestangularProvider, API_DOMAIN) {
        RestangularProvider.setBaseUrl(API_DOMAIN);
        $routeProvider
            .when('/', {
                templateUrl: 'template/index.shady.html',
            })
            .when('/travel/create', {
                templateUrl: 'template/travel/create.html',
            })
            .when('/route', {
                templateUrl: 'template/route/index.html',
            	controller:""
            })

            .otherwise('/');
    });