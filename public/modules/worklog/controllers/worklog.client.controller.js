'use strict';

angular.module('worklog')
//TODO move into client.service factory
        .controller('WorklogController', ['$scope', '$stateParams', '$location', '$http', '$filter', 'WorklogService',
           function($scope, $stateParams, $location, $http, $filter, WorklogService) {

              $scope.targetUser = $stateParams.targetUser;
              $scope.targetGroup = $stateParams.targetGroup;
              $scope.worklogData = {};
              $scope.userlogData = {};
              $scope.worklogContext = '';
              $scope.worklogDataCall = function() {

            // Call Jira findWorkBoard to get current sprint information

              var currentSprintResponsePromise = WorklogService.workboard.get();
                currentSprintResponsePromise.$promise.then(function(data, status){
                    console.log('Workboard success!');
                    $scope.sprintData = data;
                    $scope.sprintName = $scope.sprintData.sprints[0].name;
                    $scope.startDate = $scope.sprintData.sprints[0].startDate;
                    $scope.endDate = $scope.sprintData.sprints[0].endDate;
                        var startDateFilter = new Date($scope.startDate);
                        var endDateFilter = new Date($scope.endDate);
                        $scope.filterStartDate = $filter('date')(startDateFilter, 'yyyy-MM-dd');
                        $scope.filterEndDate = $filter('date')(endDateFilter, 'yyyy-MM-dd');
                        $scope.displayStartDate = $filter('date')(startDateFilter, 'fullDate');
                        $scope.displayEndDate = $filter('date')(endDateFilter, 'fullDate');
                },
                    function(data, status, headers, config) {
                        alert('Unable to connect to workboard service');
                    }
                )

            // If connection to sprint information is successful, then get user/group info with sprint dates filtered

                 .then(function(){

            // If the URL context is /user/ (!= /group) search for users (else search for groups)

                      if ($scope.targetGroup === undefined){

                     // Call Jira userSearch to get user information

                        var targetUserInfoResponsePromise = WorklogService.userlog.query({
                            targetUser: $scope.targetUser
                        });

                          targetUserInfoResponsePromise.$promise.then(function(data, status, headers, config) {
                              console.log('Userlog success!');
                              $scope.userlogData = data;
                              $scope.displayName = $scope.userlogData[0].displayName;
                              $scope.userAvatar = $scope.userlogData[0].avatarUrls[3];
                          },
                            function(data, status, headers, config) {
                                alert('Unable to connect to userlog service');
                            }
                          );

                    // Call Jira worklogSearch to get user worklog

                          var targetUserResponsePromise = WorklogService.userWorklog.get({
                            targetUser:$scope.targetUser,
                            startDate:$scope.filterStartDate,
                            endDate: $scope.filterEndDate
                          });

                          targetUserResponsePromise.$promise.then(function(data, status, headers, config) {
                              console.log('User Worklog success!');
                        //$scope.worklogKey = $scope.worklogData.worklog[0].key;
                        //console.log($scope.worklogKey);
                        //console.log('Worklog Length: ' + $scope.worklogData.worklog.length);
                        //console.log('Worklog Length: ' + $scope.worklogData.worklog[2].entries.length);
                              $scope.worklogData = data;
                              var worklogItem = $scope.worklogData.worklog.map(function(item){
                                return item;
                              });
                                $scope.getTotal = function(){
                                   var total = 0;
                                   for(var i = 0; i < $scope.worklogData.worklog.length; i++){
                                    for(var j = 0; j < $scope.worklogData.worklog[i].entries; j++){
                                       var timeSpent = $scope.worklogData.worklog[i].entries[j].timeSpent;
                                       total = total + (timeSpent);
                                     return total;
                                    }
                                   }
                                };
                              $scope.worklogContext = $scope.displayName;
                          });
                        }

                    // Call Jira worklogSearch to get group worklog

                      else {

                            var targetGroupResponsePromise = WorklogService.groupWorklog.get({
                                targetGroup:$scope.targetGroup,
                                startDate:$scope.filterStartDate,
                                endDate: $scope.filterEndDate
                            });

                            targetGroupResponsePromise.$promise.then(function(data, status, headers, config) {
                                console.log('Group Worklog success!');
                                $scope.worklogData = data;
                                $scope.worklogContext = $scope.targetGroup;
                            });
                      }
                    });
                 };
            }
        ]);
