'use strict';

angular.module('ngMovieApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize'
])
  .config(['$routeProvider',function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);


