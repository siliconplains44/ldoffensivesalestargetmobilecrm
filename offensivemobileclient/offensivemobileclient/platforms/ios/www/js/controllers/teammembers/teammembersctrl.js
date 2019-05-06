angular.module('offensiveapp')
    .controller('teammemberscontroller', ['$scope', '$http', '$state', '$ionicPopup', '$location', 'authenticationservice', 'applicationservice', 'teamsservice',
        function ($scope, $http, $state, $ionicPopup, $location, authenticationService, applicationService, teamsService) {                      

            var teamID = $location.$$path.split("/")[3];

            applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                teamsService.retrieveTeamByTeamID(teamID, function (data) {
                            $scope.currentTeam = data.outData.team.Name;
                        });
            });

            teamsService.retrieveNonLeadTeamMembersOfTeam(teamID, function (data) {
                $scope.teammembers = data.outData.teammembers;
            });

            teamsService.retrieveLeadTeamMembersOfTeam(teamID, function (data) {
                $scope.teamleads = data.outData.teamleads;
            });

            $scope.onBack = function () {
                $state.go('tab.teams');
            };

            $scope.onAttemptJoinTeam = function () {
                var requestedhandle = $scope.$$childHead.handle;
                var islead = $scope.$$childHead.islead;

                teamsService.isHandlePartOfTeam(teamID, requestedhandle, function (data) {
                    if (data.outData.partofteam == false) {
                        if (false == islead || islead == undefined) {
                            teamsService.retrieveHandleByName(requestedhandle, function (data) {
                                teamsService.addTeamMember(teamID, data.outData.handle.SecurityUserID, function (data) {
                                    teamsService.retrieveNonLeadTeamMembersOfTeam(teamID, function (data) {
                                        $scope.teammembers = data.outData.teammembers;
                                        $scope.$apply();
                                    });

                                    teamsService.retrieveLeadTeamMembersOfTeam(teamID, function (data) {
                                        $scope.teamleads = data.outData.teamleads;
                                        $scope.$apply();
                                    });
                                });
                            });
                        }
                        else {
                            teamsService.retrieveHandleByName(requestedhandle, function (data) {
                                teamsService.addTeamMember(teamID, data.outData.handle.SecurityUserID, function (data) {
                                    teamsService.setTeamMemberAsLead(data.outData.teammemberid, teamID, function (data) {
                                        teamsService.retrieveNonLeadTeamMembersOfTeam(teamID, function (data) {
                                            $scope.teammembers = data.outData.teammembers;
                                            $scope.$apply();
                                        });

                                        teamsService.retrieveLeadTeamMembersOfTeam(teamID, function (data) {
                                            $scope.teamleads = data.outData.teamleads;
                                            $scope.$apply();
                                        });
                                    });
                                });
                            });                            
                        }
                        
                    }
                    else {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Sales Target',
                            template: 'Is already part of team!'
                        });
                        alertPopup.then(function (res) {
                            
                        });
                    }
                });
            };

            $scope.onMakeTeamLead = function (teammember) {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Confirm Team Member To Lead',
                    template: 'Are you sure you want to set this team member as a lead?'
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        teamsService.setTeamMemberAsLead(teammember.TeamMemberID, teammember.TeamID, function (data) {
                            teamsService.retrieveLeadTeamMembersOfTeam(teamID, function (data) {
                                $scope.teamleads = data.outData.teamleads;
                                $scope.$apply();
                            });

                            teamsService.retrieveNonLeadTeamMembersOfTeam(teamID, function (data) {
                                $scope.teammembers = data.outData.teammembers;
                                $scope.$apply();
                            });
                        });
                    }
                });
            };

            $scope.onRemoveTeamMember = function (teammember) {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Confirm Team Member Removal',
                    template: 'Are you sure you want to remove this person from your team?'
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        teamsService.unJoinTeam(teammember.TeamMemberID, function (data) {
                            teamsService.retrieveNonLeadTeamMembersOfTeam(teamID, function (data) {
                                $scope.teammembers = data.outData.teammembers;
                                $scope.$apply();
                            });
                        });
                    }
                });
            };  
        }]);