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
		    	TaskMeasurement.get({application: "myApp", task: "myTask"},
				function success(response) {
				    $scope.measurement = response;
				    // console.log($scope.measurement);
				    // console.log("Success:" + JSON.stringify(response));
				    console.log("GET /measurement")

				    $scope.singleTaskApdexTimechart 
		    			= tracyCharts.getSingleTaskApdexTimechart($scope.application, $scope.task, $scope.measurement.dapdexTimechart);
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
	    $scope.getChartData();
	   	$interval(function(){ $scope.getChartData();}, $scope.refreshMsecPeriod);
}]);