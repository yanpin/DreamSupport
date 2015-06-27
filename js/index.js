var app = angular.module('DreamSupport', ['ngRoute', 'ngAnimate', 'restangular', 'ngCookies', 'ui.bootstrap', 'uiGmapgoogle-maps'])
    .constant('API_DOMAIN', 'http://dream-support.ddns.net/api/')
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
            	controller: 'RouteCtrl'
            })
            .otherwise('/');
    })
    .config(function (uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            v: '3.17',
             libraries: 'places'
         });
     })
