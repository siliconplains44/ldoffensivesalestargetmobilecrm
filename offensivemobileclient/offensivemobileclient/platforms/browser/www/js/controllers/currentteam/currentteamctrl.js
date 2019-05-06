angular.module('offensiveapp')
    .controller('currentteamcontroller', ['$scope', '$http', '$state', '$ionicPopup', '$location', 'authenticationservice', 'applicationservice', 'teamsservice',
        function ($scope, $http, $state, $ionicPopup, $location, authenticationService, applicationService, teamsService) {
            
            applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                applicationService.getCurrentTeam(function (currentTeamID) {
                    if (currentTeamID != null) {
                        teamsService.retrieveTeamByTeamID(currentTeamID, function (data) {
                            $scope.currentTeam = data.outData.team.Name;
                        });

                        teamsService.retrieveTeamsForSecurityUserThatAreNotActive(securityUserID,
                            parseInt(currentTeamID), function (data) {
                                $scope.teams = data.outData.teams;

                                if (data.outData.teams.length > 0) {
                                    $scope.showTeamSwitcher = true;
                                    $scope.$$childHead.theteam = data.outData.teams[0];
                                }
                                else {
                                    $scope.showTeamSwitcher = false;
                                }
                            });
                    }
                });
            });

            $scope.onAttemptSwitchTeam = function () {
                var teamSelected = $scope.$$childHead.theteam;

                applicationService.setCurrentTeam(teamSelected.TeamID, function () {
                    applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                        applicationService.getCurrentTeam(function (currentTeamID) {
                            if (currentTeamID != null) {
                                teamsService.retrieveTeamByTeamID(currentTeamID, function (data) {
                                    $scope.currentTeam = data.outData.team.Name;
                                    $scope.$apply();
                                });

                                teamsService.retrieveTeamsForSecurityUserThatAreNotActive(securityUserID,
                                    parseInt(currentTeamID), function (data) {
                                        $scope.teams = data.outData.teams;

                                        if (data.outData.teams.length > 0) {
                                            $scope.showTeamSwitcher = true;
                                            $scope.$$childHead.theteam = data.outData.teams[0];
                                        }
                                        else {
                                            $scope.showTeamSwitcher = false;
                                        }
                                        $scope.$apply();
                                    });
                            }
                        });
                    });
                });                              
            };

            $scope.onAttemptJoinTeam = function () {
                var teamName = $scope.$$childHead.teamname;

                if (teamName === $scope.currentTeam) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Sales Target',
                        template: 'This is already your active team'
                    });

                    return;
                }
                else {
                    applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                        teamsService.retrieveAuthorizedTeams(securityUserID, function (teamsAuthorized) {

                            var foundTeam = null;
                            var theTeam = null;

                            for (var i = 0; i < teamsAuthorized.outData.authorizedteams.length; i++) {
                                var foundTeam = false;
                                if (teamsAuthorized.outData.authorizedteams[i].Name === teamName) {
                                    foundTeam = true;
                                    theTeam = teamsAuthorized.outData.authorizedteams[i];
                                    break;
                                }
                            }

                            if (foundTeam === true) {              
                                applicationService.setCurrentTeam(theTeam.TeamID, function () {
                                    applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                                        applicationService.getCurrentTeam(function (currentTeamID) {
                                            if (currentTeamID != null) {
                                                teamsService.retrieveTeamByTeamID(currentTeamID, function (data) {
                                                    $scope.currentTeam = data.outData.team.Name;
                                                    $scope.$apply();
                                                });

                                                teamsService.retrieveTeamsForSecurityUserThatAreNotActive(securityUserID,
                                                    parseInt(currentTeamID), function (data) {
                                                        $scope.teams = data.outData.teams;

                                                        if (data.outData.teams.length > 0) {
                                                            $scope.showTeamSwitcher = true;
                                                            $scope.$$childHead.theteam = data.outData.teams[0];
                                                        }
                                                        else {
                                                            $scope.showTeamSwitcher = false;
                                                        }
                                                        $scope.$apply();
                                                    });
                                            }
                                        });
                                    });
                                });
                            }
                            else {
                                teamsService.doesTeamExist(teamName, function (data) {
                                    if (data.outData.teamexists === 1) {
                                        teamsService.createTeamJoinRequest(securityUserID, teamName,
                                            function (data) {
                                                var alertPopup = $ionicPopup.alert({
                                                    title: 'Sales Target',
                                                    template: 'A request has been sent to the team lead for you to join, please try joining again after you have been added'
                                                });                       
                                            });
                                    }
                                    else {
                                        var alertPopup = $ionicPopup.alert({
                                            title: 'Sales Target',
                                            template: 'Team does not exist!'
                                        });
                                    }
                                });
                            }
                        });
                    });
                };
            };
       
        }]);