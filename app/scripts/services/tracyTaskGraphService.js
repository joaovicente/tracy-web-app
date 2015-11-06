'use strict';
/* Services */

var tracyTaskGraphService = angular.module('tracyTaskGraphService', ['']);
tracyTaskGraphService.factory('tracyTaskGraph', function() {
     
	var nodes = {};
	var edges = {};
	var orphanNodes = [];
	var rootNode = null;
	var childrenMap = {};
	var tree = {};
	var googleTimeline = {};


    var factory = {}; 

    factory.addTracyTask = function(tracyTask) {
    	// Create graph from task
   		reset();
    	tracyTask.forEach(addToGraph);
    	Object.keys(edges).forEach(determineRootNode);
    	if (rootNode != null)	{
    		buildTree();
    	}
    }
 
    factory.reset = function() {
    	reset();
    }

    factory.asGoogleTimeline = function() {
    	googleTimeline.type = "Timeline";
    	googleTimeline.data = {
    		"cols": [       
    		{ type: 'string', id: 'Component' }
    		, { type: 'string', id: 'Label' }
    		, { type: 'string', role: 'tooltip', 'p': {'html': true} }
    		, { type: 'date', id: 'Start' }
    		, { type: 'date', id: 'End' }
    		]
    		, "rows": [
            // {
            //   "c": [
            //     { "v": "_" },{ "v": " 1 second " },
            //     { "v": null },
            //     { "v": new Date(1446379124000)},{ "v": new Date(1446379125000)}
            //   ]
            // },
            // {
            //   "c": [
            //     { "v": "Proxy" },{ "v": "Service handler" },
            //     { "v": 'Backend handler time: <em>170ms</em><br>blah blah' },
            //     { "v": new Date(10)},{ "v": new Date(190)}
            //   ]
            // },
            ]      
        };
    	if (rootNode != null)	{
    		addRefFrameToGoogleTimeline();
    		breadthFirstOperation(rootNode, addToGoogleTimeline)
    	}
    	return googleTimeline;
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
		graph.childrenMap = childrenMap;
		graph.googleTimeline = googleTimeline;
		return graph;
    }

    // Helper functions
    function reset() {
    	nodes = {};
    	edges = {};
		orphanNodes = [];
		rootNode = null;
		childrenMap = {};
		tree = {};
    }

   	function addToGraph(element, index, array) {
   		nodes[element.optId] = element;
   		edges[element.optId] = element.parentOptId;
   		// addToChildrenMap()
   		// Ensure empty array is created for all nodes even if they dont have childredn
		if (!(element.optId in childrenMap))	{
   			childrenMap[element.optId] = [];
		}
		// console.log(childrenMap);
   		// append child to parent->childrenArray record if array already created
   		if (element.parentOptId in childrenMap)	{
   			childrenMap[element.parentOptId].push(element.optId);
   		} 
   		// create array and append child to parent->childrenArray record if array does not exist
   		else	{
   			childrenMap[element.parentOptId] = [];
   			childrenMap[element.parentOptId].push(element.optId);
   		}
    }

    function determineRootNode(element, index, array) {
    	//  Find nodes for which the parent is not in the set
    	// console.log("testing " + element);
    	if (!(edges[element] in nodes))	{
    		orphanNodes.push(element);
    	}
    	// There can be only one
    	if (orphanNodes.length == 1) {
    		rootNode = orphanNodes[0];
    	}
    }

    function breadthFirstOperation(fromNode, op)	{
    	var children = childrenMap[fromNode];
    	if (children.length == 0)	{
    		addToGoogleTimeline(fromNode);
    	}
    	else	{
    		// execute self operation before going into children
    		addToGoogleTimeline(fromNode);    		
    		for (var childNode in children) {
    			breadthFirstOperation(children[childNode], op);	
    		}
    	}
    }

    function buildTree()	{
    	// TODO
    	//	var nodesChildren = {}; 
    	//	{ node: 'AAAA', depth: 1, children : 
    	//		[ { node : 'BBBB', level: 2,  children : 
    	//			[...]}]
    }

    // ******************************************
    // Google timeline
    // ******************************************

    function rowBuilder(value)  {
      var rowObj = {};
      rowObj.v = value;
      return rowObj;
    }

    function addRefFrameToGoogleTimeline()  {
      var rootTracyFrame = nodes[rootNode]
      var refFrameEnd = Math.round(rootTracyFrame.msecAfter/1000) * 1000;
      var refFrameStart = Math.round((rootTracyFrame.msecBefore-1000)/1000) * 1000;
      var row = {c: []};
      row.c.push(rowBuilder("Ref time frame"));
      row.c.push(rowBuilder(""));
      row.c.push(rowBuilder(null));
      row.c.push(rowBuilder(new Date(refFrameStart)));
      row.c.push(rowBuilder(new Date(refFrameEnd)));
      googleTimeline.data.rows.push(row);

    }

    function addToGoogleTimeline(node) {
      //console.log('a[' + index + '] = ' + element);
      var element = nodes[node];
      var row = {c: []};
      row.c.push(rowBuilder(element.component));
      row.c.push(rowBuilder(element.label));
      row.c.push(rowBuilder(null));
      row.c.push(rowBuilder(new Date(element.msecBefore)));
      row.c.push(rowBuilder(new Date(element.msecAfter)));
      googleTimeline.data.rows.push(row);
      // console.log(row);
    }

    return factory;
});