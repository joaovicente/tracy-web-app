'use strict';
/* Services */

var tracyTaskGraphService = angular.module('tracyTaskGraphService', ['']);
tracyTaskGraphService.factory('tracyTaskGraph', function() {
     
    var factory = {}; 
 
    factory.addTracyTask = function(tracyTask) {
    	// TODO: Create graph from task
    	return tracyTask.length;
    }
 
    factory.reset = function() {
            //..
    }
 
    return factory;
});