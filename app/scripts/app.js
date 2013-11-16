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
  }])
  .config(['$httpProvider', function ($httpProvider) {
    
      $httpProvider.defaults.useXDomain = true;
      $httpProvider.defaults.headers.get = {'Accept':'application/json'};
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }])

  .controller('MainCtrl', function ($scope, $http) {

      $http.get('http://www.omdbapi.com/?s=Love')
        
        .success(function(data) {

          $scope.data = data["Search"];
        });
  });


