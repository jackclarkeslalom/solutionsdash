'use strict';

angular.module('worklog')
//TODO move into client.service factory
        .controller('WorklogController', ['$scope', '$stateParams', '$location', '$http', '$filter',
           function($scope, $stateParams, $location, $http, $filter) {

              $scope.targetUser = $stateParams.targetUser;
              $scope.targetGroup = $stateParams.targetGroup;
              $scope.worklogData = {};
              $scope.userlogData = {};
              $scope.worklogContext = '';
              $scope.worklogDataCall = function() {

            // Call Jira findWorkBoard to get current sprint information

              var currentSprintResponsePromise = $http.get('/current-sprint');

                currentSprintResponsePromise.success(function(data, status){
                    $scope.sprintData = data;
                    $scope.sprintName = $scope.sprintData.sprints[0].name;
                    $scope.startDate = $scope.sprintData.sprints[0].startDate;
                    $scope.endDate = $scope.sprintData.sprints[0].endDate;
                        var startDateFilter = new Date($scope.startDate);
                        var endDateFilter = new Date($scope.endDate);
                        $scope.filterStartDate = $filter('date')(startDateFilter, 'yyyy-MM-dd');
                        $scope.filterEndDate = $filter('date')(endDateFilter, 'yyyy-MM-dd');
                });

                 currentSprintResponsePromise.error(function(data, status){
                    alert('Unable to connect to user sprint info service');
                 });

            // If connection to sprint information is successful, then get user/group info with sprint dates filtered

                 currentSprintResponsePromise.then(function(){

            // If the URL context is /user/ (!= /group) search for users (else search for groups)

                      if ($scope.targetGroup === undefined){

                     // Call Jira userSearch to get user information

                        var targetUserInfoResponsePromise = $http.get('/userlog/' + $scope.targetUser);

                          targetUserInfoResponsePromise.success(function(data, status, headers, config) {
                              $scope.userlogData = data;
                              $scope.displayName = $scope.userlogData[0].displayName;
                              $scope.userAvatar = $scope.userlogData[0].avatarUrls[4];
                          });
                          targetUserInfoResponsePromise.error(function(data, status, headers, config) {
                              alert('Unable to connect to user search service');
                          });

                    // Call Jira worklogSearch to get user worklog

                          var targetUserResponsePromise = $http.get('/worklog/user/' + $scope.targetUser + '/' + $scope.filterStartDate + '/' + $scope.filterEndDate);

                          targetUserResponsePromise.success(function(data, status, headers, config) {
                              $scope.worklogData = data;
                              $scope.worklogContext = $scope.displayName;
                          });
                          targetUserResponsePromise.error(function(data, status, headers, config) {
                              alert('Unable to connect to user worklog service');
                          });

                        }

                    // Call Jira worklogSearch to get group worklog

                      else {
                            var targetGroupResponsePromise = $http.get('/worklog/group/'+ $scope.targetGroup);

                            targetGroupResponsePromise.success(function(data, status, headers, config) {
                                $scope.worklogData = data;
                                $scope.worklogContext = $scope.targetGroup;
                            });
                            targetGroupResponsePromise.error(function(data, status, headers, config) {
                                alert('Unable to connect to group worklog service');
                            });
                        }
                     });
              };
          }
        ]);
