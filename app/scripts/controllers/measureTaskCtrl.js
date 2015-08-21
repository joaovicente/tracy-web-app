'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp', ['tracyWebServices'])
  .controller('MeasureTaskCtrl', ['$scope', '$stateParams', '$timeout', '$http', 'TaskMeasurement',  
  	function ($scope, $stateParams, $timeout, $http, TaskMeasurement) {
  		// , TaskMeasurement
    $scope.application = $stateParams.application;
    $scope.task = $stateParams.task;

    	    TaskMeasurement.get({application: "myApp", task: "myTask"},
	     	function success(response) {
	     		console.log("Success:" + JSON.stringify(response));
	    	},
	    	function error(errorResponse) {
	      		console.log("Error:" + JSON.stringify(errorResponse));
	    	}
	    );
}]);