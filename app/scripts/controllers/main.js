'use strict';

angular.module('ngMovieApp')
  .controller('MainCtrl', function ($scope, $http) {
  	  $http.get('manywars.json').success(function(data) {
          $scope.data = data["Search"];
      });
 
  });
