'use strict';

var app = angular.module('ngMovieApp')


app.config(['$httpProvider', function ($httpProvider) {
    
  $httpProvider.defaults.useXDomain = true;
  $httpProvider.defaults.headers.get = {'Accept':'application/json'};
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

app.directive('movie', function () {
  return { 
    restrict: 'E',
    scope: {
      movie: '=data'
    },
    link: function (scope, elems, attrs) {
    },
    //template: '<div ng-click="show=!show" ng-init="show=false"><p>{{movie.Title}} {{movie.Year}}</p><div class="detailed" ng-show="show">XXXX{{movieDetails[movie.imdbID]}}</div></div>',
    templateUrl: 'views/partials/movie.html'
  }
});

app.factory('MovieList', function ($http, $q) {
  
  var movieList = {};
  
  movieList.query = function (queryString) {
    var deferred = $q.defer();

    $http.get('http://www.omdbapi.com/?s='+queryString)

      .success(function (data) {
        deferred.resolve(data);
      })

      .error(function (data) {
        deferred.reject("Error fetching data....");
      });

    return deferred.promise;
  }
    return movieList;
});


app.factory('MovieDetail', function ($http, $q) {
  
  var movieDetail = {};
  
  movieDetail.getAll = function (movieData) {
    var promises = []

    angular.forEach(movieData.Search, function (item){
      promises.push(movieDetail.get(item.imdbID));
    });   

    return $q.all(promises);
  }

  movieDetail.get = function (imdbID) {

    var deferred = $q.defer();

    $http.get('http://www.omdbapi.com/?i='+imdbID).success(function (data) {
      deferred.resolve(data);
    });

    return  deferred.promise;
  }

    return movieDetail;
});

app.controller('MainCtrl',  function ($scope, MovieList, MovieDetail, $q) {

  $scope.movieName = 'Love';

  var queryForMovie = function () {

    MovieList.query($scope.movieName).then(MovieDetail.getAll).then( function (data) {
      $scope.movieDetails = {};
      angular.forEach(data, function (item) {
        $scope.movieDetails[item.imdbID] = item;  
      });
    });
  };

/*
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
*/
  $scope.search = function () {
    queryForMovie();      
  }

});
