// Code goes here
//, 'tracyTaskGraph'
var app = angular.module('sbAdminApp', [ 'googlechart', 'tracyTaskGraphService']);

app.controller('TimelineCtrl', ['$scope', '$stateParams','tracyTaskGraph', function($scope, $stateParams, tracyTaskGraph) {
    $scope.chart = {};
    var rt = 1446415872559;
    // var offset = 10; // msecOffset
    // var offset = 1010; // secOffset
    // var offset = 61010; // minOffset
    var offset = 3601000; // hourOffset

    // Object.keys($stateParams).forEach(function(key) {
    //  console.log(key, $stateParams[key]);
    // });

    $scope.tracyTask = [
      {"taskId":"TID-ab1234-x","parentOptId":"4F3D","label":"foo","optId":"AD24","msecBefore":rt+offset*5,"msecAfter":rt+offset*7,"msecElapsed":offset*2,"host":"ukdb807735-3.local","component":"Service"}
      ,{"taskId":"TID-ab1234-x","parentOptId":"4F3D","label":"bar","optId":"AE5F","msecBefore":rt+offset*3,"msecAfter":rt+offset*5,"msecElapsed":offset*2,"host":"ukdb807735-3.local","component":"Service"}
      ,{"taskId":"TID-ab1234-x","parentOptId":"23CF","label":"Http servlet","optId":"4F3D","msecBefore":rt+offset*2,"msecAfter":rt+offset*8,"msecElapsed":offset*6,"host":"ukdb807735-3.local","component":"Service"}
      ,{"taskId":"TID-ab1234-x","parentOptId":"DBF5","label":"Service handler","optId":"23CF","msecBefore":rt+offset,"msecAfter":rt+offset*9,"msecElapsed":offset*8,"host":"ukdb807735-3.local","component":"Proxy"}
      ,{"taskId":"TID-ab1234-x","parentOptId":"AAAA","label":"Client handler","optId":"DBF5","msecBefore":rt,"msecAfter":rt+offset*10,"msecElapsed":offset*10,"host":"ukdb807735-3.local","component":"Proxy"}
    ];

    tracyTaskGraph.addTracyTask($scope.tracyTask);
    $scope.chart = tracyTaskGraph.asGoogleTimeline(0);
    // console.log(tracyTaskGraph.inspect());
}]);
