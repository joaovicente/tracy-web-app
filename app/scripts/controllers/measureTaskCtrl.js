'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('MeasureTaskCtrl', ['$scope', '$stateParams', '$timeout' , function ($scope, $stateParams, $timeout) {
    $scope.application = $stateParams.application;
    $scope.task = $stateParams.task;
}]);