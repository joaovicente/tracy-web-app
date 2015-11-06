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
    		// TODO: Support cross-component time adjustment
    		// For each node, time-align its cross-component children if they are outside its parent frame.
    		// crossComponentTimeAdjustment(); 
    		// TODO: Support for ordered depth first iteration/operation using:
    		// sortChildrenMap("msecBefore"); 
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
    		gtAddTimeReference();
    		breadthFirstOperation(rootNode, gtAddNode)
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
    		gtAddNode(fromNode);
    	}
    	else	{
    		// execute self operation before going into children
    		gtAddNode(fromNode);    		
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

    function gtRowBuilder(value)  {
      var rowObj = {};
      rowObj.v = value;
      return rowObj;
    }

    function gtAddTimeReference()  {
      var rootTracyFrame = nodes[rootNode]
      var refFrameEnd = Math.round(rootTracyFrame.msecAfter/1000) * 1000;
      var refFrameStart = Math.round((rootTracyFrame.msecBefore-1000)/1000) * 1000;
      var row = {c: []};
      row.c.push(gtRowBuilder("Reference time"));
      row.c.push(gtRowBuilder(""));
      row.c.push(gtRowBuilder(null));
      row.c.push(gtRowBuilder(new Date(refFrameStart)));
      row.c.push(gtRowBuilder(new Date(refFrameEnd)));
      googleTimeline.data.rows.push(row);

    }

    function humanTime(msec)	{
    	var time;
    	var milliseconds;
    	var seconds;
    	var minutes;
    	var hours;
    	var dayInMs = 24*60*60*1000;
    	// less than 1 second
    	if (msec <1000)	{
    		time = msec + "ms";
    	}
    	// less than 1 minute
    	if (msec > 1000 && msec < 60000)	{
    		seconds = msec/1000;
    		milliseconds = (msec-(seconds*1000));
    		time = seconds + "s" + " " + milliseconds + "ms";
    	}
    	// less than 1 hour
    	if (msec >= 60000 && msec < 3600000)	{
    		minutes = msec / 60000;
    		minutesRem= msec % 60000;
    		seconds = minutesRem/1000;
    		secondsRem = minutesRem%1000;
    		milliseconds = secondsRem;
    		time = 
    			minutes + "m"
    			+ " " + seconds + "s";
    			// + " " + milliseconds + "ms";
    	}
    	// less than 1 day
    	if (msec >= 3600000 && msec < dayInMs)	{
    		hours = msec / 3600000;
    		hoursRem = msec % 3600000;
    		minutes = hoursRem / 60000;
    		minutesRem= msec % 60000;
    		seconds = minutesRem/1000;
    		secondsRem = minutesRem%1000;
    		milliseconds = secondsRem;
    		time = 
    			hours + "h"
    			+ " " + minutes + "m";
    			// + " " + seconds + "s" 
    			// + " " + milliseconds + "ms";
    	}
    	return time;
    }

    function gtBuildTooltip(node)	{
      //     { "v": 'Backend handler time: <em>170ms</em><br>blah blah' },
      var tracyFrame = nodes[node];
      var tooltip = 
     	 "<b>component: </b>" + tracyFrame.component + "<br>"
      	+ "<b>label: </b>" + tracyFrame.label + "<br>"
      	+ "<b>wall time: </b>" + humanTime(tracyFrame.msecElapsed) + "<br>"
      	// console.log(tooltip);
      return tooltip;

    }

    function gtAddNode(node) {
      //console.log('a[' + index + '] = ' + element);
      var element = nodes[node];
      var row = {c: []};
      row.c.push(gtRowBuilder(element.component));
      row.c.push(gtRowBuilder(element.label));
      row.c.push(gtRowBuilder(gtBuildTooltip(node)));
      row.c.push(gtRowBuilder(new Date(element.msecBefore)));
      row.c.push(gtRowBuilder(new Date(element.msecAfter)));
      googleTimeline.data.rows.push(row);
      // console.log(row);
    }

    return factory;
});