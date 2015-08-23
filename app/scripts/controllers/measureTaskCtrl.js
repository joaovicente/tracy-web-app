'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp', ['highcharts-ng', 'tracyWebServices', 'tracyChartService'])
  .controller('MeasureTaskCtrl', ['$scope', '$stateParams', '$timeout', '$http', 'TaskMeasurement', 'tracyCharts',  
  	function ($scope, $stateParams, $timeout, $http, TaskMeasurement, tracyCharts) {

    $scope.application = $stateParams.application;
    $scope.task = $stateParams.task;
    $scope.singleTaskApdexTimechart = tracyCharts.getSingleTaskApdexTimechart($scope.application, $scope.task);
    $scope.singleTaskVitalsTimechart = tracyCharts.getSingleTaskVitalsTimechart($scope.application, $scope.task);
    $scope.latencyHistogram = tracyCharts.getLatencyHistogram($scope.application, $scope.task);

    TaskMeasurement.get({application: "myApp", task: "myTask"},
		function success(response) {
		    console.log("Success:" + JSON.stringify(response));
		},
		function error(errorResponse) {
		    console.log("Error:" + JSON.stringify(errorResponse));
		}
	);
}]);