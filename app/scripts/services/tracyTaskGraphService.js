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

    factory.asGoogleTimeline = function(depthWanted) {
    	// depth wainted 0=all, 1=level1, 2=level2
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
        googleTimeline.options = { colors : [], hAxis : {}};
        googleTimeline.options.hAxis = {format: 'd/M hh:mm', gridlines: {count: 4}};
        googleTimeline.options.hAxis = {format: 'HH:mm', gridlines: {count: 4}};

    	if (rootNode != null)	{
    		if (nodes[rootNode].msecElapsed < 1000)	{
		        googleTimeline.options.hAxis = {format: 'HH:mm:ss.SSS'};
    		}
    		googleTimeline.options.colors.push('#E6E6E6');
    		gtAddTimeReference();
    		breadthFirstOperation(rootNode, gtAddNode, depthWanted, 1);
    		// Colorize timeline
    		for (var i=0 ; i < Object.keys(nodes).length ; i++)	{
    			if (i%2)	{
    				googleTimeline.options.colors.push('#5DBCF5');
    			}
    			else {
    				googleTimeline.options.colors.push('#2241A3');
    			}
    		}
    	}
    	// console.log(googleTimeline);
    	// console.log(this.inspect());
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

    function breadthFirstOperation(fromNode, op, depthWanted, currentDepth)	{
    	var children = childrenMap[fromNode];
    	if (children.length == 0)	{
    		gtAddNode(fromNode);
    	}
    	else	{
    		// execute self operation before going into children
    		gtAddNode(fromNode);    		
    		if (currentDepth < depthWanted || depthWanted == 0)	{
    			for (var childNode in children) {
    				currentDepth++;
    				breadthFirstOperation(children[childNode], op, depthWanted, currentDepth);	
    			}
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
	  var refFrameStart;
      var refFrameEnd;
      // TODO: Snap to second, minute or hour depending on duration
      if (rootTracyFrame.msecAfter-rootTracyFrame.msecBefore <  60000)	{
      	// Less than a minute - snap to second
		refFrameStart = rootTracyFrame.msecBefore-(rootTracyFrame.msecBefore%1000);
      	refFrameEnd = rootTracyFrame.msecAfter+1000-(rootTracyFrame.msecAfter%1000);
      }
      else if (rootTracyFrame.msecAfter-rootTracyFrame.msecBefore < 3600000)	{
      	// Between a minute and an hour - snap to minute
		refFrameStart = rootTracyFrame.msecBefore-(rootTracyFrame.msecBefore%60000);
      	refFrameEnd = rootTracyFrame.msecAfter+60000-(rootTracyFrame.msecAfter%60000);
      }
      else if (rootTracyFrame.msecAfter-rootTracyFrame.msecBefore > 3600000)	{
      	// Above an hour - snap to hour
		refFrameStart = rootTracyFrame.msecBefore-(rootTracyFrame.msecBefore%3600000);
      	refFrameEnd = rootTracyFrame.msecAfter+3600000-(rootTracyFrame.msecAfter%3600000);
      }


      // console.log(rootTracyFrame.msecBefore);
      // console.log(rootTracyFrame.msecAfter);
      // console.log(refFrameStart);
      // console.log(refFrameEnd);
      var row = {c: []};
      row.c.push(gtRowBuilder("ref time"));
      row.c.push(gtRowBuilder(""));
      row.c.push(gtRowBuilder(null));
      row.c.push(gtRowBuilder(new Date(refFrameStart-3600000)));
      row.c.push(gtRowBuilder(new Date(refFrameEnd-3600000)));
      googleTimeline.data.rows.push(row);

    }

    function humanTime(msec)	{
    	var time; 
    	var milliseconds, seconds, minutes, hours;
    	var secondsRem, minutesRem, hoursRem;
    	var dayInMs = 24*60*60*1000;
    	var secsInMs = 1000;
    	var minInMs = 60000;
    	var hoursInMs = 3600000;
    	// less than 1 second
    	if (msec <secsInMs)	{
    		time = msec + "ms";
    	}
    	// less than 1 minute
    	if (msec > secsInMs && msec < minInMs)	{
    		seconds = Math.round(msec/secsInMs);
    		secondsRem = msec%secsInMs
    		milliseconds = secondsRem;
    		time = seconds + "s" + " " + milliseconds + "ms";
    	}
    	// less than 1 hour
    	if (msec >= minInMs && msec < hoursInMs)	{
    		minutes = Math.round(msec / minInMs);
    		minutesRem= msec % minInMs;
    		seconds = Math.round(minutesRem/secsInMs);
    		secondsRem = minutesRem%secsInMs;
    		milliseconds = secondsRem;
    		time = 
    			minutes + "m"
    			+ " " + seconds + "s";
    			// + " " + milliseconds + "ms";
    	}
    	// less than 1 day
    	if (msec >= hoursInMs && msec < dayInMs)	{
    		hours = Math.round(msec / hoursInMs);
    		hoursRem = msec % hoursInMs;
    		minutes = Math.round(hoursRem / secsInMs);
    		minutesRem= msec % secsInMs;
    		seconds = Math.round(minutesRem/secsInMs);
    		secondsRem = minutesRem%secsInMs;
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
      	"<div style=\"width:300px\">"
     	+ "<b>component: </b>" + tracyFrame.component + "<br>"
      	+ "<b>label: </b>" + tracyFrame.label + "<br>"
      	+ "<b>wall time: </b>" + humanTime(tracyFrame.msecElapsed) + "<br>"
      	+ "<b>start: </b>" + new Date(tracyFrame.msecBefore).toISOString() + "<br>"
      	+ "<b>end: </b>" + new Date(tracyFrame.msecAfter).toISOString() + "<br>"
      	+ "</div>"
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
      row.c.push(gtRowBuilder(new Date(element.msecBefore-3600000)));      
      row.c.push(gtRowBuilder(new Date(element.msecAfter-3600000)));
      googleTimeline.data.rows.push(row);
      // onsole.log(row);
    }

    return factory;
});