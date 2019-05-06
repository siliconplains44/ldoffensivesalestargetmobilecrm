angular.module('offensiveapp')
    .controller('joinateamcontroller', ['$scope', '$http', '$state', '$ionicPopup', '$location', 'authenticationservice', 'applicationservice', 'teamsservice',
        function ($scope, $http, $state, $ionicPopup, $location, authenticationService, applicationService, teamsService) {

            $scope.onAttemptJoinTeam = function () {
                var teamName = $scope.$$childHead.teamname;

                applicationService.getLoggedInSecurityUserID(function(securityUserID) {
                    teamsService.retrieveAuthorizedTeams(securityUserID, function(teamsAuthorized) {

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
                            applicationService.setCurrentTeam(theTeam.TeamID);
                            $state.go('tab.salestargets');
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
                                            alertPopup.then(function (res) {
                                                $location.path('/login').replace();
                                            });
                                        });
                                }
                                else {
                                    var alertPopup = $ionicPopup.alert({
                                        title: 'Sales Target',
                                        template: 'Team does not exist!'
                                    });
                                    alertPopup.then(function (res) {
                                        $location.path('/login').replace();
                                    });
                                }
                            });
                        }
                    });
                });
            }
        }]);
