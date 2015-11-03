'use strict';
/* Services */

var tracyTaskGraphService = angular.module('tracyTaskGraphService', ['']);
tracyTaskGraphService.factory('tracyTaskGraph', function() {
     
	var nodes = {};
	var edges = [];

    var factory = {}; 

    factory.addTracyTask = function(tracyTask) {
    	// TODO: Create graph from task
    	tracyTask.forEach(addToGraph);
    }
 
    factory.reset = function() {
            //..
    }

    factory.asGoogleTimeline = function() {
    	
    }

    factory.asGraph = function() {
    	var graph = {};
    	graph.nodes = nodes;
		graph.edges = edges;
		return graph;
    }

    // Helper functions
   	function addToGraph(element, index, array) {
   		nodes[element.optId] = element;
   		var edge = {};
   		edge[element.optId] = element.parentOptId;
   		edges.push(edge);
    }

    return factory;
});