angular.module('offensiveapp')
    .controller('teamscontroller', ['$scope', '$http', '$state', '$ionicPopup', '$location', 'authenticationservice', 'applicationservice', 'teamsservice',
        function ($scope, $http, $state, $ionicPopup, $location, authenticationService, applicationService, teamsService) {
                
            applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                teamsService.retrieveTeamsLeadBySecurityUserID(securityUserID, function (data) {
                    $scope.teams = data.outData.teams;
                });
            });
         
            $scope.onAddTeam = function () {
                $state.go('tab.addteam');
            };

            $scope.onManageTeamMembers = function (team) {
                $state.go('tab.teammembers', { id: team.TeamID });
            };

            $scope.onEditTeam = function (team) {
                $state.go('tab.editteam', { id: team.TeamID });
            };

            $scope.onDeleteTeam = function (team) {
               
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Confirm Team Deletion',
                    template: 'Are you sure you want to delete this team?'
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        teamsService.deleteTeam(team.TeamID, function (data) {
                            applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                                teamsService.retrieveTeamsLeadBySecurityUserID(securityUserID, function (data) {
                                    $scope.teams = data.outData.teams;
                                    $scope.$apply();
                                });
                            });
                        });
                    }
                });                                          
            }
        }]);