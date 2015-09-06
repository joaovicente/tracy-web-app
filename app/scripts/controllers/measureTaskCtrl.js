'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp', ['highcharts-ng', 'tracyWebServices', 'tracyChartService'])
  .controller('MeasureTaskCtrl', ['$scope', '$stateParams', '$timeout', '$http', '$interval', 'TaskMeasurement', 'tracyCharts',  
  	function ($scope, $stateParams, $timeout, $http, $interval, TaskMeasurement, tracyCharts) {
	    $scope.application = $stateParams.application;
	    $scope.task = $stateParams.task;
	    $scope.measurement = null;
	    $scope.refreshMsecPeriod = 10000;

	    $scope.getChartData = function () {
		    	TaskMeasurement.get({application: $scope.application, task: $scope.task},
				function success(response) {
				    // console.log("GET /measurement [" + $scope.application + "][" + $scope.task + "]");
				    $scope.measurement = response;
				    // console.log($scope.measurement);
				    // console.log("Success:" + JSON.stringify(response));

				    $scope.singleTaskApdexTimechart 
		    			= tracyCharts.getSingleTaskApdexTimechart($scope.application, $scope.task, $scope.measurement.singleApdexTimechart);
		    		$scope.singleTaskVitalsTimechart = 
		    			tracyCharts.getSingleTaskVitalsTimechart($scope.application, $scope.task, $scope.measurement.vitalsTimechart);
		    		$scope.latencyHistogram = 
		    			tracyCharts.getLatencyHistogram($scope.application, $scope.task, $scope.measurement.latencyHistogram);
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