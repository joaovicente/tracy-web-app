'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp', ['highcharts-ng', 'tracyWebServices', 'tracyChartService'])
  .controller('MeasureApplicationCtrl', ['$scope', '$stateParams', '$timeout', '$http', '$interval', 'ApplicationMeasurement', 'tracyCharts',  
  	function ($scope, $stateParams, $timeout, $http, $interval, ApplicationMeasurement, tracyCharts) {
	    $scope.application = $stateParams.application;
	    $scope.task = $stateParams.task;
	    $scope.measurement = null;
	    $scope.refreshMsecPeriod = 10000;

	    $scope.getChartData = function () {
				// console.log("GETing /measurement [" + $scope.application + "]");
		    	ApplicationMeasurement.get({application: $scope.application},
				function success(response) {
				    // console.log("GET /measurement [" + $scope.application + "]");
				    $scope.measurement = response;
				    // console.log($scope.measurement);
				    // console.log("Success:" + JSON.stringify(response));

				    $scope.multiApdexTimechart 
				    	= tracyCharts.getMultiTaskApdexTimechart($scope.application, $scope.measurement.multiApdexTimechart); 
				    // console.log($scope);
				    
				},
				function error(errorResponse) {
				    console.log("Error:" + JSON.stringify(errorResponse));
				}
			);
	    };
	    // console.log("Created MeasureTaskCtrl: [" + $scope.application + "][" + $scope.task + "]");
	    $scope.getChartData();
	    var measurementGetInterval = $interval(function(){ $scope.getChartData();}, $scope.refreshMsecPeriod);
	    $scope.$on("$destroy", function() {
		   		// console.log("Destroyed MeasureTaskCtrl: [" + $scope.application + "][" + $scope.task + "]");
		   		$interval.cancel(measurementGetInterval);
	    });

}]);