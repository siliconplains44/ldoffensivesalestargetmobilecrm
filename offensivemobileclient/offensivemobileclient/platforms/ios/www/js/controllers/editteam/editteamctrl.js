angular.module('offensiveapp')
    .controller('editteamcontroller', ['$scope', '$http', '$state', '$ionicPopup', '$location', 'authenticationservice', 'applicationservice', 'teamsservice',
        function ($scope, $http, $state, $ionicPopup, $location, authenticationService, applicationService, teamsService) {

            var teamID = $location.$$path.split("/")[3];

            teamsService.retrieveTeamByTeamID(teamID, function (data) {
                $scope.teamname = data.outData.team.Name;
                $scope.$apply();
            });

            $scope.onBack = function () {
                $state.go('tab.teams');
            };

            $scope.onModifyTeam = function () {
                var teamName = $scope.$$childHead.teamname;
                
                teamsService.modifyTeam(teamID, teamName, function (data) {
                    $state.go('tab.teams');
                });                
            };

        }]);