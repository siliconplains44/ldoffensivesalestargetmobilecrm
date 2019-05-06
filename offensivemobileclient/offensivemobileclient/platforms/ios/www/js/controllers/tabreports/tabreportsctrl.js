angular.module('offensiveapp')
    .controller('tabreportscontroller', ['$scope', '$rootScope', '$http', '$state', '$ionicPopup', '$location', 'authenticationservice', 'applicationservice', 'marketingservice', 'teamsservice',
        function ($scope, $rootScope, $http, $state, $ionicPopup, $location, authenticationService, applicationService, marketingService, teamsService) {

            $scope.dohide = "none";

            applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                applicationService.getCurrentTeam(function (currentTeamID) {
                    teamsService.isSecurityUserLeadOfTeam(parseInt(currentTeamID), securityUserID, function (data) {
                        if (data.outData.islead == 1) {
                            $scope.dohide = "block";
                        }
                        else {
                            $scope.dohide = "none";
                        }
                    });
                });
            });

        }]);