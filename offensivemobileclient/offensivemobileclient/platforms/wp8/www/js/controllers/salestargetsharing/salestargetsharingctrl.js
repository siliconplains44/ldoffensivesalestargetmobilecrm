angular.module('offensiveapp')
    .controller('salestargetsharingcontroller', ['$scope', '$http', '$state', '$stateParams', '$ionicPopup', '$location', 'authenticationservice', 'applicationservice', 'businessobjectsservice', 'teamsservice',
        function ($scope, $http, $state, $stateParams, $ionicPopup, $location, authenticationService, applicationService, businessObjectsService, teamsService) {

            var salesTargetID = $location.$$path.split("/")[3];

            applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                applicationService.getCurrentTeam(function (currentTeamID) {
                    if (currentTeamID != null) {
                        teamsService.retrieveTeamByTeamID(currentTeamID, function (data) {
                            $scope.currentTeam = data.outData.team.Name;
                            $scope.$apply();
                        });

                        teamsService.retrieveNonLeadTeamMembersOfTeam(currentTeamID, function (data) {

                            angular.forEach(data.outData.teammembers, function(teammember) {
                                businessObjectsService.isSalesTargetSharedWithUser(salesTargetID, teammember.SecurityUserID, function (data) {
                                    if (data.outData.isshared === 1) {
                                        teammember.checked = true;
                                    }
                                    else {
                                        teammember.checked = false;
                                    }
                                });
                            });

                            $scope.teammembers = data.outData.teammembers;
                            $scope.$apply();
                        });
                    }
                });
            });



            $scope.$apply();

            $scope.onBack = function () {
                window.history.back();
            };

            $scope.onClickTeamMemberForSharing = function (teammember) {
                
                if (teammember.checked === true) {
                    businessObjectsService.shareSalesTargetWithTeamMember(salesTargetID, teammember.SecurityUserID, function (data) {

                    });
                }
                else {
                    businessObjectsService.unshareSalesTargetWithTeamMember(salesTargetID, teammember.SecurityUserID, function (data) {

                    });
                }

            };

        }]);