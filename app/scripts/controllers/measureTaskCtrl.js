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
//This is not a highcharts object. It just looks a little like one!
var chartConfig = {

  options: {
      //This is the Main Highcharts chart config. Any Highchart options are valid here.
      //will be overriden by values specified below.
      chart: {
          type: 'bar'
      },
      tooltip: {
          style: {
              padding: 10,
              fontWeight: 'bold'
          }
      }
  },
  //The below properties are watched separately for changes.

  //Series object (optional) - a list of series using normal highcharts series options.
  series: [{
     data: [10, 15, 12, 8, 7]
  }],
  //Title configuration (optional)
  title: {
     text: 'Hello'
  },
  //Boolean to control showng loading status on chart (optional)
  //Could be a string if you want to show specific loading text.
  loading: false,
  //Configuration for the xAxis (optional). Currently only one x axis can be dynamically controlled.
  //properties currentMin and currentMax provied 2-way binding to the chart's maximimum and minimum
  xAxis: {
  currentMin: 0,
  currentMax: 20,
  title: {text: 'values'}
  },
  //Whether to use HighStocks instead of HighCharts (optional). Defaults to false.
  useHighStocks: false,
  //size (optional) if left out the chart will default to size of the div or something sensible.
  size: {
   width: 400,
   height: 300
  },
  //function (optional)
  func: function (chart) {
   //setup some logic for the chart
  }
};


    $scope.application = $stateParams.application;
    $scope.task = $stateParams.task;
    // $scope.singleTaskDapdexTimechart = chartConfig;
    $scope.singleTaskDapdexTimechart = tracyCharts.getSingleTaskDapdexTimechart($scope.application, $scope.task);
    console.log($scope.singleTaskDapdexTimechart);

    	    TaskMeasurement.get({application: "myApp", task: "myTask"},
	     	function success(response) {
	     		console.log("Success:" + JSON.stringify(response));
	    	},
	    	function error(errorResponse) {
	      		console.log("Error:" + JSON.stringify(errorResponse));
	    	}
	    );
}]);