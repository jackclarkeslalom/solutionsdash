'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('worklog').factory('UserWorklog', ['$resource',
	function($resource) {
		return $resource('/worklog/user/:targetUser/:startDate/:endDate', {

		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
