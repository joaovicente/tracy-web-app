// Code goes here
//, 'tracyTaskGraph'
var app = angular.module('sbAdminApp', [ 'googlechart', 'tracyTaskGraphService']);

app.controller('TimelineCtrl', ['$scope', 'tracyTaskGraph', function($scope, tracyTaskGraph) {
    $scope.chart = {};
    $scope.tracyTask = [
      {"taskId":"TID-ab1234-x","parentOptId":"4F3D","label":"foo","optId":"AD24","msecBefore":1446415872592,"msecAfter":1446415872712,"msecElapsed":120,"host":"ukdb807735-3.local","component":"Service"}
      ,{"taskId":"TID-ab1234-x","parentOptId":"4F3D","label":"bar","optId":"AE5F","msecBefore":1446415872712,"msecAfter":1446415872733,"msecElapsed":21,"host":"ukdb807735-3.local","component":"Service"}
      ,{"taskId":"TID-ab1234-x","parentOptId":"23CF","label":"Http servlet","optId":"4F3D","msecBefore":1446415872582,"msecAfter":1446415872733,"msecElapsed":151,"host":"ukdb807735-3.local","component":"Service"}
      ,{"taskId":"TID-ab1234-x","parentOptId":"DBF5","label":"Service handler","optId":"23CF","msecBefore":1446415872570,"msecAfter":1446415872755,"msecElapsed":185,"host":"ukdb807735-3.local","component":"Proxy"}
      ,{"taskId":"TID-ab1234-x","parentOptId":"AAAA","label":"Client handler","optId":"DBF5","msecBefore":1446415872559,"msecAfter":1446415872755,"msecElapsed":196,"host":"ukdb807735-3.local","component":"Proxy"}
    ];

    tracyTaskGraph.addTracyTask($scope.tracyTask);
    $scope.chart = tracyTaskGraph.asGoogleTimeline();
    // console.log(tracyTaskGraph.inspect());
}]);
