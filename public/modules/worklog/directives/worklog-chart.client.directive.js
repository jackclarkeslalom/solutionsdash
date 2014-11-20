'use strict';

angular.module('worklog').directive('worklogChart', [
	function() {
		return {
			template: '<div></div>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				// Worklog chart directive logic
				// ...

				element.text('this is the worklogChart directive');
			}
		};
	}
]);