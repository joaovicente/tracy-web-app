'use strict';
/* Services */

var tracyTaskGraphService = angular.module('tracyTaskGraphService', ['']);
tracyTaskGraphService.factory('tracyTaskGraph', function() {
    var customColors = false;
	var nodes = {};
	var edges = {};
	var orphanNodes = [];
	var rootNode = null;
	var childrenMap = {};
	var tree = {};
	var googleTimeline = {};
    var numOptsInComponent = {};
    var factory = {};
    var nodeColors = {
        componentColor : {}, // assign components a color sequence (offset to componentColorPalette)
        componentOptCount : {}, // counts how many operations seen for a given component
        componentColorCursor : 0, // Increments for each new component seen
        componentPalette : [
            {color:'grey',     lightShade:'#B3B3B3', darkShade:'#B3B3B3'},
            {color:'red',      lightShade:'#FF0000', darkShade:'#BD000C'},
            {color:'orange',   lightShade:'#FF7F00', darkShade:'#BE5104'},
            {color:'yellow',   lightShade:'#FFFF00', darkShade:'#C0C407'},
            {color:'green',    lightShade:'#00FF00', darkShade:'#1AC603'},
            {color:'blue',     lightShade:'#0000FF', darkShade:'#0000C0'},
            {color:'purple',   lightShade:'#7F007F', darkShade:'#510053'},
            {color:'violet',   lightShade:'#FF00FF', darkShade:'#BD00C0'}
            ],
        reset : function ()    {
            this.componentColor = {};
            this.componentOptCount = {};
            this.componentColorCursor = 0;
        },
        getNodeColor : function (node) {
            // Assumption: called for each node in a breadth first sequence
            var darkShade = false ;
            if (!this.componentOptCount.hasOwnProperty(node.component)) {
                // new component
                this.componentOptCount[node.component] = 0;
                this.componentColor[node.component] =
                    this.componentColorCursor % this.componentPalette.length;
                    // Assign component color
                this.componentColorCursor++;
            }
            else if ((this.componentOptCount[node.component]%2)) {
                // Interleave darker every other operation (2nd, 4th, 6th, ...)
                darkShade = true;
            }
            this.componentOptCount[node.component]++;

            if (customColors)   {
            console.log(
                "component: " + node.component
                +", label: " + node.label
                +",  component color number: " + this.componentColor[node.component]
                +", component color name: "+ this.componentPalette[this.componentColor[node.component]].color
                +", darkShaded: " + darkShade);
            }

            // Assign colors
            var color;
            if (darkShade)  {
                color = this.componentPalette[this.componentColor[node.component]].darkShade;
            }
            else    {
                color = this.componentPalette[this.componentColor[node.component]].lightShade;
            }
            return color;
        }
    }

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
        // TODO: To customize colors by swap commented lines below and uncomment googleTimeline.options.colors.push
        if (customColors)   {
            googleTimeline.options = { colors : [], hAxis : {}};
        }
        else    {
            googleTimeline.options = { timeline : {}, hAxis : {}};
        }
        googleTimeline.options.hAxis = {format: 'd/M hh:mm', gridlines: {count: 4}};
        googleTimeline.options.hAxis = {format: 'HH:mm', gridlines: {count: 4}};
        if (!customColors)  {
            googleTimeline.options.timeline["colorByRowLabel"] = true;
        }
        nodeColors.reset();
    	if (rootNode != null)	{
    		if (nodes[rootNode].msecElapsed < 1000)	{
		        googleTimeline.options.hAxis = {format: 'HH:mm:ss.SSS'};
    		}
    		var refTimeNodeColor = nodeColors.getNodeColor({component: "reference time"});
    		if (customColors)   {
    		    googleTimeline.options.colors.push(refTimeNodeColor);
            }
    		gtAddTimeReference();

    		breadthFirstOperation(rootNode, gtAddNode, depthWanted, 1);
    	}
//    	 console.log(googleTimeline);
         if (customColors)  {
    	    console.log(JSON.stringify(googleTimeline));
    	 }
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
   		// Ensure empty array is created for all nodes even if they dont have children
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
    		op(fromNode);
    	}
    	else	{
    		// execute self operation before going into children
    		op(fromNode);
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
      row.c.push(gtRowBuilder("reference time"));
      row.c.push(gtRowBuilder(""));
      row.c.push(gtRowBuilder(null));
      row.c.push(gtRowBuilder(new Date(refFrameStart-3600000)));
      row.c.push(gtRowBuilder(new Date(refFrameEnd-3600000)));
      googleTimeline.data.rows.push(row);

    }

    function humanTime(msec)	{
    	var time; 
    	var milliseconds, seconds, minutes, hours, days;
    	var secondsRem, minutesRem, hoursRem, daysRem;
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
     }
    	// less than 1 day
    	if (msec >= hoursInMs && msec < dayInMs)	{
    		hours = Math.round(msec / hoursInMs);
    		hoursRem = msec % hoursInMs;
    		minutes = Math.round(hoursRem / minInMs);
    		time = 
       hours + "h"
       + " " + minutes + "m";
     }
      // more than 1 day
      if (msec > dayInMs)  {
        days = Math.round(msec / dayInMs);
        daysRem = msec % dayInMs;
        hours = Math.round(daysRem / hoursInMs);
        hoursRem = daysRem % hoursInMs;
        minutes = Math.round(hoursRem / minInMs);
        time = 
        days + "d"
        + " " + hours + "h"
        + " " + minutes + "m";
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
      // Add color to node
      var nodeColor = nodeColors.getNodeColor(nodes[node]);
      if (customColors) {
        googleTimeline.options.colors.push(nodeColor);
      }
      // Add node
      var element = nodes[node];
      var row = {c: []};
      row.c.push(gtRowBuilder(element.component));
      row.c.push(gtRowBuilder(element.label));
      row.c.push(gtRowBuilder(gtBuildTooltip(node)));
      row.c.push(gtRowBuilder(new Date(element.msecBefore-3600000)));      
      row.c.push(gtRowBuilder(new Date(element.msecAfter-3600000)));
      googleTimeline.data.rows.push(row);
      // console.log(row);
    }

    return factory;
});