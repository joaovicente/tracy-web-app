'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
 angular.module('sbAdminApp')
 .controller('HeaderNotificationCtrl', ['$scope', function($scope) {
 	$scope.clock = {
 		clock : new Date()
 	}
 	var updateClock = function () {
 		var m = new Date();
 		$scope.clock.now =
 		m.getUTCFullYear() +"/"+
 		("0" + (m.getUTCMonth()+1)).slice(-2) +"/"+
 		("0" + m.getUTCDate()).slice(-2) + " " +
 		("0" + m.getUTCHours()).slice(-2) + ":" +
 		("0" + m.getUTCMinutes()).slice(-2) + ":" +
 		("0" + m.getUTCSeconds()).slice(-2) + " UTC";
 	};

 	setInterval(function () {
 		$scope.$apply(updateClock);
 	}, 1000);

 	updateClock();
 }])
 .directive('headerNotification',function(){
 	return {
 		templateUrl:'scripts/directives/header/header-notification/header-notification.html',
 		restrict: 'E',
 		replace: true,
 	}
 });


