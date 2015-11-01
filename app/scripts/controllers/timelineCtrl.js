// Code goes here

var app = angular.module('sbAdminApp', [ 'googlechart' ]);

app.controller('TimelineCtrl', function($scope) {

    $scope.chart = {}
    $scope.tempChart = {}
    $scope.tracyTask = [
      {"taskId":"TID-ab1234-x","parentOptId":"4F3D","label":"foo","optId":"AD24","msecBefore":1446415872592,"msecAfter":1446415872712,"msecElapsed":120,"host":"ukdb807735-3.local","component":"Service"}
      ,{"taskId":"TID-ab1234-x","parentOptId":"4F3D","label":"bar","optId":"AE5F","msecBefore":1446415872712,"msecAfter":1446415872733,"msecElapsed":21,"host":"ukdb807735-3.local","component":"Service"}
      ,{"taskId":"TID-ab1234-x","parentOptId":"23CF","label":"Http servlet","optId":"4F3D","msecBefore":1446415872582,"msecAfter":1446415872733,"msecElapsed":151,"host":"ukdb807735-3.local","component":"Service"}
      ,{"taskId":"TID-ab1234-x","parentOptId":"DBF5","label":"Service handler","optId":"23CF","msecBefore":1446415872570,"msecAfter":1446415872755,"msecElapsed":185,"host":"ukdb807735-3.local","component":"Proxy"}
      ,{"taskId":"TID-ab1234-x","parentOptId":"AAAA","label":"Client handler","optId":"DBF5","msecBefore":1446415872559,"msecAfter":1446415872755,"msecElapsed":196,"host":"ukdb807735-3.local","component":"Proxy"}
    ];

    function compareMsecBefore(a,b) {
      return (a.msecBefore - b.msecBefore)
    }

    function compareMsecAfter(a,b) {
      return (a.msecBefore - b.msecBefore)
    }
    
    function buildRefFrame(tracyTask)  {
      tracyTask.sort(compareMsecAfter);
      var refFrameEnd = Math.round(tracyTask[tracyTask.length-1].msecAfter/1000) * 1000;
      tracyTask.sort(compareMsecBefore);
      var refFrameStart = Math.round((tracyTask[0].msecBefore-1000)/1000) * 1000;
     
      referenceTracyFrame = {};
      referenceTracyFrame.component = "Ref time frame";
      referenceTracyFrame.label = "";
      referenceTracyFrame.msecBefore = refFrameStart;
      referenceTracyFrame.msecAfter = refFrameEnd;
      return referenceTracyFrame;
    }

    function rowBuilder(value)  {
      var rowObj = {};
      rowObj.v = value;
      return rowObj;
    }

    function addTracyEventToTimeline(element, index, array) {
      //console.log('a[' + index + '] = ' + element);
      var row = {c: []};
      row.c.push(rowBuilder(element.component));
      row.c.push(rowBuilder(element.label));
      row.c.push(rowBuilder(null));
      row.c.push(rowBuilder(new Date(element.msecBefore)));
      row.c.push(rowBuilder(new Date(element.msecAfter)));
      $scope.tempChart.data.rows.push(row);
      // console.log(row);
    }

    $scope.tempChart.type = "Timeline";
    $scope.tempChart.data = {
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

    $scope.tracyTask.push(buildRefFrame($scope.tracyTask));
    $scope.tracyTask.sort(compareMsecBefore);

    $scope.tracyTask.forEach(addTracyEventToTimeline);
    $scope.chart = $scope.tempChart;
    // console.log($scope.chart.data);
});
