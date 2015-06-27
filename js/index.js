var app = angular.module('DreamSupport', ['ngRoute', 'ngAnimate', 'restangular'])
    .constant('API_DOMAIN', 'http://dream-support.ddns.net/')
    .config(function ($routeProvider, RestangularProvider, API_DOMAIN) {
        RestangularProvider.setBaseUrl(API_DOMAIN);
        $routeProvider
            .when('/', {
                templateUrl: 'template/index.shady.html',
            })
            .when('/login', {
                templateUrl: 'template/index.login.html',
            })
            .otherwise('/');
    });