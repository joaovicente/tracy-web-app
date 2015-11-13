// Code goes here
//, 'tracyTaskGraph'
var app = angular.module('sbAdminApp', [ 'googlechart', 'tracyTaskGraphService']);

app.controller('TimelineCtrl', ['$scope', '$stateParams','tracyTaskGraph', function($scope, $stateParams, tracyTaskGraph) {

  function disableIfFirst() {
    var disabled = "";
    if ($scope.sequenceId == 1) {
      disabled = "disabled";
    }
    return disabled;
  }

  function previousUrl()  {
    var decrement = 1;
    if ($scope.sequenceId == 1) {
      decrement = 0;
    }
    var prevUrl = "/timeline/" 
      + (Number($scope.sequenceId)-decrement)  
      + "?application=" + $scope.application
      + "&task=" + $scope.task
      + "&earliest=" + $stateParams['earliest']
      + "&latest=" + $stateParams['latest'] 
      + "&rtBelow=" + $stateParams['rtBelow']
      + "&rtAbove=" + $stateParams['rtAbove'];
    return prevUrl;
  }

  function nextUrl()  {
    var increment = 1;
    if ($scope.sequenceId == 20) {
      increment = 0;
    }
    var nextUrl = "/timeline/" 
    + (Number($scope.sequenceId)+increment)  
    + "?application=" + $scope.application
    + "&task=" + $scope.task
    + "&earliest=" + $stateParams['earliest']
    + "&latest=" + $stateParams['latest'] 
    + "&rtBelow=" + $stateParams['rtBelow']
    + "&rtAbove=" + $stateParams['rtAbove'];
    return nextUrl;
  }

  function disableIfLast() {
    var disabled = "";
    if ($scope.sequenceId == 20) {
      disabled = "disabled";
    }
    return disabled;
  }

  $scope.chart = {};
  var rt = 1446415872559;
    // var offset = 10; // msecOffset
    // var offset = 1010; // secOffset
    // var offset = 61010; // minOffset
  var offset = 3601000; // hourOffset

    // TODO: Make earliest and latest human readable as per GMT clock
  $scope.earliest = new Date(Number($stateParams['earliest']));
  $scope.latest = new Date(Number($stateParams['latest']));
  $scope.rtAbove = $stateParams['rtAbove'];
  $scope.rtBelow = $stateParams['rtBelow'];
  $scope.sequenceId = $stateParams['sequenceId'];
  $scope.application = (typeof $stateParams['application'] === 'undefined') ? 'unknown-application' : $stateParams['application'];
  $scope.task = (typeof $stateParams['task'] === 'undefined') ? 'unknown-task' : $stateParams['task'];
  $scope.disablePrevious = disableIfFirst();
  $scope.disableLast = disableIfLast();
  $scope.prevUrl = previousUrl();
  $scope.nextUrl = nextUrl();

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
