'use strict';

angular.module('ngMovieApp')

  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.headers.get = {'Accept':'application/json'};
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }])

  .controller('MainCtrl', function ($scope, $http) {

  	  $http.get('http://www.omdbapi.com/?s=Star').success(function(data) {
 
          $scope.data = data["Search"];
      });
 
  });
