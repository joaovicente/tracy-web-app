// Code goes here
//, 'tracyTaskGraph'
var app = angular.module('sbAdminApp', [ 'googlechart', 'tracyTaskGraphService', 'tracyWebServices']);

app.controller('TimelineCtrl', ['$scope', '$stateParams','tracyTaskGraph', 'TaskAnalysis',
  function($scope, $stateParams, tracyTaskGraph, TaskAnalysis) {

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
    if ($scope.sequenceId == $scope.lastId) {
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
    if ($scope.sequenceId == $scope.lastId) {
      disabled = "disabled";
    }
    // console.log($scope.sequenceId + "-" +$scope.lastId);
    return disabled;
  }

  function mockTracyEvent(timeOffset)  {
    var rt = 1446415872559;
    // var offset = 10; // msecOffset
    // var offset = 1010; // secOffset
    // var offset = 61010; // minOffset
    var offset = 3601000; // hourOffset
    var tracyEvents = [
      {"taskId":"TID-ab1234-x","parentOptId":"4F3D","label":"foo","optId":"AD24","msecBefore":timeOffset+rt+offset*5,"msecAfter":timeOffset+rt+offset*7,"msecElapsed":offset*2,"host":"ukdb807735-3.local","component":"Service"}
      ,{"taskId":"TID-ab1234-x","parentOptId":"4F3D","label":"bar","optId":"AE5F","msecBefore":timeOffset+rt+offset*3,"msecAfter":timeOffset+rt+offset*5,"msecElapsed":offset*2,"host":"ukdb807735-3.local","component":"Service"}
      ,{"taskId":"TID-ab1234-x","parentOptId":"23CF","label":"Http servlet","optId":"4F3D","msecBefore":timeOffset+rt+offset*2,"msecAfter":timeOffset+rt+offset*8,"msecElapsed":offset*6,"host":"ukdb807735-3.local","component":"Service"}
      ,{"taskId":"TID-ab1234-x","parentOptId":"DBF5","label":"Service handler","optId":"23CF","msecBefore":timeOffset+rt+offset,"msecAfter":timeOffset+rt+offset*9,"msecElapsed":offset*8,"host":"ukdb807735-3.local","component":"Proxy"}
      ,{"taskId":"TID-ab1234-x","parentOptId":"AAAA","label":"Client handler","optId":"DBF5","msecBefore":timeOffset+rt,"msecAfter":timeOffset+rt+offset*10,"msecElapsed":offset*10,"host":"ukdb807735-3.local","component":"Proxy"}
      ];
    return tracyEvents;
  }

  function mockTracyTaskCreation(timeOffset)  {
    var tracyTask = {tracyTask: {tracyEvents: []}};
    tracyTask.tracyTask.tracyEvents = mockTracyEvent(timeOffset);
    return tracyTask;
  }

  //TaskMeasurement.get({application: $scope.application, task: $scope.task},
  function mockTaskAnalysisReource(query) {
    // GET .../tws/v1/applications/Direct+/tasks/IDR-Golf/analysis
    // &filter=msecBefore:[1446187500000 TO 1446201000000] AND msecElapsed:[120 TO 180] AND t_application:”Direct+" AND t_task:”IDR-Golf"
    // ?sort=-msecElapsed
    // &offset=0
    // &limit=20
    var response = {application: '', task: '', tracyTasksPage : {}};
    response.application = query.application;
    response.task = query.task;
    response.tracyTasksPage.offset = 0;
    response.tracyTasksPage.limit = 20;
    response.tracyTasksPage.records = 18;
    response.tracyTasksPage.tracyTasks = [];
    for (var i=0 ; i<response.tracyTasksPage.records ; i++) {
      response.tracyTasksPage.tracyTasks.push(mockTracyTaskCreation(3600000*i));
    }
    // console.log(response);
    return response;
  }

  $scope.updateNavAndChart = function()  {
    $scope.lastId = $scope.taskAnalysisResponse.tracyTasksPage.records;
    tracyTaskGraph.addTracyTask($scope.taskAnalysisResponse.tracyTasksPage.tracyTasks[$scope.sequenceId-1].tracyTask.tracyEvents);
    $scope.chart = tracyTaskGraph.asGoogleTimeline(0);
    // console.log(JSON.stringify($scope.chart));
    $scope.disablePrevious = disableIfFirst();
    $scope.disableLast = disableIfLast();
    $scope.prevUrl = previousUrl();
    $scope.nextUrl = nextUrl();
  }

  $scope.getTaskAnalysis = function(query) {
    TaskAnalysis.get(query,
      function success(response) {
        // console.log(JSON.stringify(response));
        // $scope.updateNavAndChart();
        // $scope.taskAnalysisResponse = response;
      },
      function error(errorResponse) {
        console.log("Error:" + JSON.stringify(errorResponse));
      }
    );
  }

  function prepareAnalysisQuery(application, task, earliest, latest, rtAbove, rtBelow) {
    var query = {};
    query.application = application;
    query.task = task;
    query.filter = "msecAfter:[" + earliest + " TO " + latest + "]"
      + " AND msecElapsed:[" + rtAbove + " TO " + rtBelow + "]";
    query.sort = "-msecElapsed";
    query.offset = "0";
    query.limit = "20";
    // console.log(query);
    return query;
  }
  // TODO: tracy-timeline-viewer controller: maxSequenceNumber, timelineArray, tracyTaskArray, rawTwsResponsesMap


  $scope.chart = {};
  var rt = 1446415872559;
    // var offset = 10; // msecOffset
    // var offset = 1010; // secOffset
    // var offset = 61010; // minOffset
  var offset = 3601000; // hourOffset


  $scope.earliest = new Date(Number($stateParams['earliest']));
  $scope.latest = new Date(Number($stateParams['latest']));
  $scope.rtAbove = $stateParams['rtAbove'];
  $scope.rtBelow = $stateParams['rtBelow'];
  $scope.sequenceId = $stateParams['sequenceId'];
  $scope.application = (typeof $stateParams['application'] === 'undefined') ? 'unknown-application' : $stateParams['application'];
  $scope.task = (typeof $stateParams['task'] === 'undefined') ? 'unknown-task' : $stateParams['task'];

  $scope.query = prepareAnalysisQuery($scope.application, $scope.task, $stateParams['earliest'], $stateParams['latest'], $scope.rtAbove, $scope.rtBelow);
  $scope.taskAnalysisResponse = mockTaskAnalysisReource($scope.query);

  $scope.getTaskAnalysis($scope.query);

  $scope.updateNavAndChart();
}]);
