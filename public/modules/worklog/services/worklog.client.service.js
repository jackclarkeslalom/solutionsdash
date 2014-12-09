'use strict';

angular.module('worklog').factory('WorklogService', ['$resource',
	function($resource) {
		return {
			userWorklog : $resource('/worklog/user/:targetUser/:startDate/:endDate', {
				targetUser:'@targetUser',
				startDate: '@startDate',
				endDate: '@endDate'
			}),
			groupWorklog : $resource('/worklog/group/:targetGroup/:startDate/:endDate', {
				targetGroup:'@targetGroup',
				startDate: '@startDate',
				endDate: '@endDate'
			}),
			userlog : $resource('/userlog/:targetUser',{
				targetUser:'@targetUser'
			}),
			workboard : $resource('/current-sprint'),
			search : $resource('/search')
		};
	}
]);
