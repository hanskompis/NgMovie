'use strict';

var app = angular.module('ngMovieApp')


app.config(['$httpProvider', function ($httpProvider) {
    
  $httpProvider.defaults.useXDomain = true;
  $httpProvider.defaults.headers.get = {'Accept':'application/json'};
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

app.factory('Movie', function ($http) {
  
  var movie = {};
  
  movie.query = function (queryString) {
    return  $http.get('http://www.omdbapi.com/?s='+queryString);
  }

    return movie;
});

app.controller('MainCtrl',  function ($scope, Movie) {

  $scope.movieName = '';
  
  var queryForMovie = function () {
    Movie.query($scope.movieName)
        
    .success(function (data) {
      $scope.data = data["Search"];
    });  
  };

  $scope.search = function () {
    queryForMovie();      
  }

  });

/*
    .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {

  	  $http.get('http://www.omdbapi.com/?s=Love')
  	    
  	    .success(function(data) {

          $scope.data = data["Search"];
        });
  }]);

*/