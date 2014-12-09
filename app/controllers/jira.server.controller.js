'use strict';

// Module dependencies

  var JiraApi = require('jira').JiraApi;

  var config = {
        'user': 'jirabot',
        'password': 'jiraBotSlalom1',
        'port':'443',
        'host': 'slalom100.jira.com'
    };

// Module exports

// Search for user worklog items
  exports.userWorklog = function(req, res, next){
          var targetUser = req.param('targetUser');
          var startDate = req.param('startDate');
          var endDate = req.param('endDate');
          var searchString = 'targetUser=' + targetUser + '&startDate=' + startDate + '&endDate=' + endDate;
          var jira = new JiraApi('https', config.host, config.port, config.user, config.password, '2');

          jira.searchWorklog(searchString,function(error, issues) {
              if(error){
                  console.log('Logging targetUser worklog service error to console:' + error);
                  return;
              }
              console.log('Successful targetUser service connection');
              res.json(issues);
          });
      };

// Search for group worklog items
  exports.groupWorklog = function(req, res, next){
          var targetGroup = req.param('targetGroup');
          var startDate = req.param('startDate');
          var endDate = req.param('endDate');
          var searchString = 'targetGroup=' + targetGroup + '&startDate=' + startDate + '&endDate=' + endDate;
          var jira = new JiraApi('https', config.host, config.port, config.user, config.password, '2');

          jira.searchWorklog(searchString,function(error, issues) {
              if(error){
                  console.log('Logging targetGroup worklog service error to console:' + error);
                  return;
              }
              console.log('Successful targetGroup service connection');
              res.json(issues);
          });

      };

// Search for user information (account details)
  exports.userlog = function(req, res, next){
          var searchString = req.param('targetUser');
          var jira = new JiraApi('https', config.host, config.port, config.user, config.password, '2');

          jira.searchUsers(searchString,0, 50, true, true, function(error, user) {
              if(error){
                  console.log('Logging userlog service error to console:' + error);
                  return;
              }
              console.log('Successful userlog service connection');
              res.json(user);
          });
      };

// Search for workboard information (here: current sprint)
  exports.workboard = function(req, res, next){
          var rapidViewId = '2';
          var jira = new JiraApi('https', config.host, config.port, config.user, config.password, '1.0');

          jira.findWorkBoard(rapidViewId,function(error, rapidViews) {
              if(error){
                  console.log('Logging findWorkBoard error to console: ' + error);
                  console.log(jira.findWorkBoard.request);
                  return;
              }
              console.log('Successful findWorkboard service connection');
              res.json(rapidViews);
          });
      };

// General Jira search (jql/find issues)
  exports.search = function(req, res, next){
          var query = 'Sprint=88';
          var jira = new JiraApi('https', config.host, config.port, config.user, config.password, '2');

          jira.searchJira(query,function(error, issues) {
              if(error){
                  console.log('Logging searchJira error to console:' + error);
                  return;
              }
              console.log('Successful searchJira service connection');
              res.json(issues);
          });
      };
