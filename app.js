//Module
var W = angular.module('weatherApp', ['ngRoute','ngResource']);

//routes
W.config(function ($routeProvider){
	$routeProvider
		.when('/',{
			templateUrl: 'home.html',
			controller: 'homeController'
			})
		.when('/forecast', {
        templateUrl: 'forecast.html',
        controller: 'forecastController'
    })
	});

//Controller 

W.controller('homeController',['$scope', 'cityService',
	function($scope, cityService){
	$scope.city = cityService.city ;
	//console.log($scope.city);

	$scope.$watch('city', function() {
		cityService.city = $scope.city ;
	});
}]);

W.controller('forecastController',['$scope','$resource','cityService',
 	function($scope, $resource, cityService){
	$scope.city = cityService.city ;
	$scope.days = 2 ;

	$scope.weatherApi = $resource("http://api.openweathermap.org/data/2.5/forecast/daily",
	 {method: {get: "JSONP" }});

	$scope.weatherResult = JSON.parse($scope.weatherApi.get({q: $scope.city, cnt: $scope.days, APPID: cityService.apiID});
	
	$scope.weatherResult.$promise.then(function(data){
    $scope.weatherResult = JSON.parse(data);
	});

	console.log($scope.weatherResult);
	console.log($scope.weatherResult.list);

	$scope.toFahrenheit = function(degK){
		return Math.round((1.8 * (degK - 273)) + 32); 
	}
	
	$scope.toDate = function(date){
		return new Date(date);
	}

}])

//Service
 W.service('cityService', function () { 
this.city = 'New York, NY';
this.apiID = '590a2068af0ab24fecbf95a8d70249d6';
  });

 //Directive 

 W.directive('weatherReport',function(){
 	return {
 		restrict: 'E',
 		templateUrl: 'weatherReport.html',
 		replace: true,
 		scope: {
 			weatherDay: '=',
 			convertToF: '&',
 			convertToDate: '&',
 			dateFormate: '@'
 		}

 	}
 });