'use strict';

var app = angular.module('ngMovieApp')


app.config(['$httpProvider', function ($httpProvider) {
    
  $httpProvider.defaults.useXDomain = true;
  $httpProvider.defaults.headers.get = {'Accept':'application/json'};
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

app.factory('MovieList', function ($http) {
  
  var movieList = {};
  
  movieList.query = function (queryString) {
    return  $http.get('http://www.omdbapi.com/?s='+queryString);
  }

    return movieList;
});

app.factory('MovieDetail', function ($http) {
  
  var movieDetail = {};
  
  movieDetail.query = function (imdbID) {
    return  $http.get('http://www.omdbapi.com/?i='+imdbID);
  }

    return movieDetail;
});

app.controller('MainCtrl',  function ($scope, MovieList, MovieDetail) {

  $scope.movieName = '';
  $scope.movieDetails = {'asasas' : 'fdgdfg'};
  
  var queryForMovie = function () {

    MovieList.query($scope.movieName)
        
    .success(function (data) {
      $scope.movies = data["Search"];
      setMovieDetails();
    });  
  };

  var setMovieDetails = function () {

    for (var i = 0; i < $scope.movies.length ; i++) {
      MovieDetail.query($scope.movies[i].imdbID)

      .success(function (data) {        
        addData(data);       
      });
      
    }
  };

  var addData = function (data) {
    $scope.movieDetails[data.imdbID] = data;
  };

  $scope.search = function () {
    queryForMovie();      
  }

});
