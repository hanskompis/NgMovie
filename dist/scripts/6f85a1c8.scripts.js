"use strict";angular.module("ngMovieApp",["ngCookies","ngResource","ngSanitize"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]).config(["$httpProvider",function(a){a.defaults.useXDomain=!0,a.defaults.headers.get={Accept:"application/json"},delete a.defaults.headers.common["X-Requested-With"]}]).controller("MainCtrl",function(a,b){b.get("http://www.omdbapi.com/?s=Love").success(function(b){a.data=b.Search})}),angular.module("ngMovieApp");