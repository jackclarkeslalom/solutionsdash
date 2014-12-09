'use strict';

var jiraService = require('../../app/controllers/jira.server.controller');

module.exports = function(app) {

// Get user worklog items for specified period (e.g. /current-sprint
  app.route('/worklog/user/:targetUser/:startDate/:endDate')
      .get(jiraService.userWorklog);

// Get group worklog items
  app.route('/worklog/group/:targetGroup/:startDate/:endDate')
      .get(jiraService.groupWorklog);

// Get userlog (account information)
  app.route('/userlog/:targetUser')
      .get(jiraService.userlog);

// Get current sprint information
  app.route('/current-sprint')
      .get(jiraService.workboard);

// Get Jira search (jql)
  app.route('/search')
      .get(jiraService.search);

	};
