'use strict';
/* Services */

var tracyWebServices = 
 angular.module('tracyWebServices', ['ngResource']);
 
tracyWebServices.factory('TaskMeasurement', ['$resource',
function($resource) {
return $resource("http://localhost:8080/tws/v1/applications/:application/tasks/:task/measurement", {}, {
// return $resource("http://localhost:8080/rest/user/123", {}, {
  get: {method: 'GET', cache: false, isArray: false},	
  query: {method:'GET', isArray:true},
  save: {method: 'POST', cache: false, isArray: false},
  update: {method: 'PUT', cache: false, isArray: false},
  delete: {method: 'DELETE', cache: false, isArray: false}
  });
}]);
