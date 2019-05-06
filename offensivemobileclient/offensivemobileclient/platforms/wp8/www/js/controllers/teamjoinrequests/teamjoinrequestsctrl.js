angular.module('offensiveapp')
    .controller('teamjoinrequestscontroller', ['$scope', '$http', '$state', '$ionicPopup', '$location', 'authenticationservice', 'applicationservice', 'teamsservice',
        function ($scope, $http, $state, $ionicPopup, $location, authenticationService, applicationService, teamsService) {

            applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                teamsService.retrieveTeamJoinRequestsByTeamLead(securityUserID, function (data) {
                    $scope.joinrequests = data.outData.teamjoinrequests;
                });
            });

            $scope.onAuthorizeJoinRequest = function (joinRequest) {

                applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                    teamsService.authorizeUserToTeam(securityUserID, joinRequest.TeamJoinRequestID, joinRequest.TeamID, joinRequest.SecurityUserID, function (data) {                    
                        teamsService.retrieveTeamJoinRequestsByTeamLead(securityUserID, function (data) {
                            $scope.joinrequests = data.outData.teamjoinrequests;
                            $scope.$apply();
                        });
                    });
                });
            };

            $scope.onDenyJoinRequest = function (joinRequest) {

                applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                    teamsService.denyUserToTeam(joinRequest.TeamJoinRequestID, function (data) {
                        teamsService.retrieveTeamJoinRequestsByTeamLead(securityUserID, function (data) {
                            $scope.joinrequests = data.outData.teamjoinrequests;
                            $scope.$apply();
                        });
                    });
                });
            };
            
        }]);