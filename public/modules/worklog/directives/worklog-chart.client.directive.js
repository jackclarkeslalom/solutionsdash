'use strict';

angular.module('worklog').directive('worklogChart', [
	function() {
		return {
			template: '<div id="worklog-chart"></div>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				// Worklog chart directive logic
				// ...
			}
		};
	}
]);
