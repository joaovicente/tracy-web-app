// Code goes here

var app = angular.module('sbAdminApp', [ 'googlechart' ]);

app.controller('TimelineCtrl', function($scope) {
    $scope.chart = {}
    $scope.chart.type = "Timeline";
    $scope.chart.data = {
       "cols": [       
            { type: 'string', id: 'Component' }
            , { type: 'string', id: 'Label' }
            , { type: 'string', role: 'tooltip', 'p': {'html': true} }
            , { type: 'date', id: 'Start' }
            , { type: 'date', id: 'End' }
      ]
      , "rows": [
            {
              "c": [
                { "v": "Proxy" },{ "v": "Client handler" },
                { "v": null },
                { "v": new Date(0)},{ "v": new Date(200)}
              ]
            },
            {
              "c": [
                { "v": "Proxy" },{ "v": "Service handler" },
                { "v": 'Backend handler time: <em>170ms</em><br>blah blah' },
                { "v": new Date(10)},{ "v": new Date(190)}
              ]
            },
            {
              "c": [
                { "v": "Acme-Service" },{ "v": "httpServlet" },
                { "v": null },
                { "v": new Date(20)},{ "v": new Date(180)}
              ]
            },
            {
              "c": [
                { "v": "Acme-Service" },{ "v": "foo" },
                { "v": null },
                { "v": new Date(30)},{ "v": new Date(149)}
              ]
            },
            {
              "c": [
                { "v": "Acme-Service" },{ "v": "bar" },
                { "v": null },
                { "v": new Date(150)},{ "v": new Date(170)}
              ]
            },            
      ]      
    };
});
