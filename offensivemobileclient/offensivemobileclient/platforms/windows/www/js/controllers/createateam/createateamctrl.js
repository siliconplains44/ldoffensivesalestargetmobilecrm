angular.module('offensiveapp')
    .controller('createateamcontroller', ['$scope', '$http', '$state', '$ionicPopup', '$location', 'authenticationservice', 'applicationservice', 'teamsservice',
        function ($scope, $http, $state, $ionicPopup, $location, authenticationService, applicationService, teamsService) {

            $scope.onAttemptCreateaTeam = function () {
                var teamName = $scope.$$childHead.teamname;

                applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                    teamsService.doesTeamExist(teamName, function (data) {
                        if (data.outData.teamexists == 1) {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Sales Target',
                                template: 'A team by the name you entered already exists, please choose another.'
                            });
                        }
                        else {
                            teamsService.createTeam(teamName, function (data) {
                                newTeamID = data.outData.teamid;

                                teamsService.addTeamMember(newTeamID, securityUserID, function (data) {

                                    newTeamMemberID = data.outData.teammemberid;

                                    teamsService.setTeamMemberAsLead(newTeamMemberID, newTeamID, function (data) {
                                        applicationService.setCurrentTeam(newTeamID, function () {
                                            $state.go('tab.salestargets');
                                        });                                        
                                    });                                    
                                });
                            });
                        }
                    });
                });
            }
        }]);
