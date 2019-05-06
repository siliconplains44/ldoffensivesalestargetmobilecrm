angular.module('offensiveapp')
    .controller('addteamcontroller', ['$scope', '$http', '$state', '$ionicPopup', '$location', 'authenticationservice', 'applicationservice', 'teamsservice',
        function ($scope, $http, $state, $ionicPopup, $location, authenticationService, applicationService, teamsService) {

            $scope.onBack = function () {
                $state.go('tab.teams');
            };

            $scope.onCreateTeam = function () {
                var teamName = $scope.$$childHead.teamname;

                applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                    teamsService.createTeamWithLead(teamName, securityUserID, function (data) {
                        $state.go('tab.teams');
                    });
                });                
            };
            
        }]);