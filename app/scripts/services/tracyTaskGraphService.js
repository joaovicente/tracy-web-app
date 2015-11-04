'use strict';
/* Services */

var tracyTaskGraphService = angular.module('tracyTaskGraphService', ['']);
tracyTaskGraphService.factory('tracyTaskGraph', function() {
     
	var nodes = {};
	var edges = {};
	var orphanNodes = [];
	var rootNode = null;
	var tree = {};

    var factory = {}; 

    factory.addTracyTask = function(tracyTask) {
    	// Create graph from task
    	tracyTask.forEach(addToGraph);
    	Object.keys(edges).forEach(determineRootNode);
    	if (rootNode != null)	{
    		buildTree();
    	}
    }
 
    factory.reset = function() {
    	nodes = {};
    	edges = {};
		orphanNodes = [];
		rootNode = null;
		tree = {};
    }

    factory.asGoogleTimeline = function() {
    	
    }

    factory.asGraph = function() {
    	var graph = {};
    	graph.nodes = nodes;
		graph.edges = edges;
		graph.root = rootNode;
		return graph;
    }

    factory.inspect = function() {
    	var graph = {};
    	graph.nodes = nodes;
		graph.edges = edges;
		graph.root = rootNode;
		graph.tree = tree;
		return graph;
    }

    // Helper functions
   	function addToGraph(element, index, array) {
   		nodes[element.optId] = element;
   		edges[element.optId] = element.parentOptId
    }

    function determineRootNode(element, index, array) {
    	// TODO: find nodes for which the parent is not in the set
    	console.log("testing " + element);
    	if (!(edges[element] in nodes))	{
    		orphanNodes.push(element);
    	}
    	if (orphanNodes.length == 1) {
    		rootNode = orphanNodes[0];
    	}
    }

    function buildTree()	{
    	// TODO
    	// var nodesChildren = {}; // {node: 'AAAA', children : [ {node : 'BBBB', children : }]
    }

    return factory;
});