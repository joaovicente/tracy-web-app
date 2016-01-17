'use strict';
/* Services */

var tracyWebServices = 
 angular.module('tracyWebServices', ['ngResource']);
 
tracyWebServices.factory('TaskMeasurement', ['$resource',
function($resource) {
return $resource("http://tws:8080/tws/v1/applications/:application/tasks/:task/measurement", {}, {
  get: {method: 'GET', cache: false, isArray: false},	
  query: {method:'GET', isArray:true},
  save: {method: 'POST', cache: false, isArray: false},
  update: {method: 'PUT', cache: false, isArray: false},
  delete: {method: 'DELETE', cache: false, isArray: false}
  });
}]);

tracyWebServices.factory('TaskAnalysis', ['$resource',
function($resource) {
return $resource("http://tws:8080/tws/v1/applications/:application/tasks/:task/analysis", {}, {
  get: {method: 'GET', cache: false, isArray: false}, 
  query: {method:'GET', isArray:true},
  save: {method: 'POST', cache: false, isArray: false},
  update: {method: 'PUT', cache: false, isArray: false},
  delete: {method: 'DELETE', cache: false, isArray: false}
  });
}]);

tracyWebServices.factory('ApplicationMeasurement', ['$resource',
function($resource) {
return $resource("http://tws:8080/tws/v1/applications/:application/measurement", {}, {
  get: {method: 'GET', cache: false, isArray: false},	
  query: {method:'GET', isArray:true},
  save: {method: 'POST', cache: false, isArray: false},
  update: {method: 'PUT', cache: false, isArray: false},
  delete: {method: 'DELETE', cache: false, isArray: false}
  });

}]);
