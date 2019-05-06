angular.module('offensiveapp')
    .controller('tabcontroller', ['$scope', '$http', '$state', '$ionicPopup', '$location', 'authenticationservice', 'applicationservice', 'marketingservice', 'teamsservice',
        function ($scope, $http, $state, $ionicPopup, $location, authenticationService, applicationService, marketingService, teamsService) {

            applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                applicationService.getCurrentTeam(function (currentTeamID) {
                    teamsService.isSecurityUserLeadOfTeam(parseInt(currentTeamID), securityUserID, function (data) {
                        if (data.outData.islead == 1) {
                            $scope.hideLeadTab = false;
                        }
                        else {
                            $scope.hideLeadTab = true;
                        }
                        $scope.$apply();
                    });
                });
            });
            

        }]);