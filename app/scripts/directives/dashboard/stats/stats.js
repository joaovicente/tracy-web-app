'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
    .directive('stats',function() {
    	return {
  		templateUrl:'scripts/directives/dashboard/stats/stats.html',
  		restrict:'E',
  		replace:true,
  		scope: {
        info: '=info'
        // 'rttt': '@',
        // 'rttunit': '@',
        // 'apdexscore': '@'
        },
        link: function (scope, element) {
          // Resolve ADPDEX Rating, and score related shades
          if (scope.info.apdexScore >= 0.94) {
            scope.apdexRating = "EXCELLENT";
            scope.color = "blue";
            scope.apdexRatingShade = "primary";
          }
          else if (scope.info.apdexScore >= 0.85 && scope.info.apdexScore <= 0.93) {
            scope.apdexRating = "GOOD";
            scope.color = "green";
            scope.apdexRatingShade = "success";
          }
          else if (scope.info.apdexScore >= 0.70 && scope.info.apdexScore <= 0.84) {
            scope.apdexRating = "FAIR";
            scope.color = "orange";
            scope.apdexRatingShade = "warning";
          }
          else if (scope.info.apdexScore >= 0.50 && scope.info.apdexScore <= 0.69) {
            scope.apdexRating = "POOR";
            scope.color = "red";
            scope.apdexRatingShade = "danger";
          }
          else {
            scope.apdexRating = "UNACCEPTABLE";
            scope.color = "gray";
            scope.apdexRatingShade = "default";
          }

        }
    }
  });
