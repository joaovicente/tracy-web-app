// Code goes here

var app = angular.module('sbAdminApp', [ 'googlechart' ]);

app.controller('TimelineCtrl', function($scope) {
    $scope.chart = {}
    $scope.chart.type = "Timeline";
    $scope.chart.data = {
       "cols": [       
            { type: 'string', id: 'Position' }
            , { type: 'date', id: 'Start' }
            , { type: 'date', id: 'End' }                
      ]
      , "rows": [
            {
              "c": [
                { "v": "Washington" },
                { "v": new Date(1789,3,29),
                  "f": "A long long time ago" },
                { "v": new Date(1797,2,3),
                  "f": "A long long time ago" }
              ]
            }, 
            {
              "c": [
                { "v": "Adams" },
                { "v": new Date(1797,2,3) },
                { "v": new Date(1801,2,3) }
              ]
          }
      ]
    };
});
