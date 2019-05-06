angular.module('offensiveapp')
    .controller('campaignscontroller', ['$scope', '$http', '$state', '$ionicPopup', '$location', 'authenticationservice', 'applicationservice', 'teamsservice', 'campaignsservice',
        function ($scope, $http, $state, $ionicPopup, $location, authenticationService, applicationService, teamsService, campaignsService) {

            var theCurrentTeamID = null;

            applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                applicationService.getCurrentTeam(function (currentTeamID) {
                    if (currentTeamID != null) {
                        theCurrentTeamID = currentTeamID;

                        campaignsService.retrieveCampaignsByTeam(parseInt(currentTeamID), function (data) {
                            $scope.campaigns = data.outData.campaigns;
                        });
                    }
                });
            });

            $scope.onAddCampaign = function () {
                $state.go('tab.addcampaign');
            };            

            $scope.onEditCampaign = function (campaign) {
                $state.go('tab.editcampaign', { id: campaign.CampaignID });
            };

            $scope.onDeleteCampaign = function (campaign) {

                var confirmPopup = $ionicPopup.confirm({
                    title: 'Confirm Campaign Deletion',
                    template: 'Are you sure you want to delete this campaign?'
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        campaignsService.deleteCampaign(campaign.CampaignID, function (data) {
                            applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                                applicationService.getCurrentTeam(function (currentTeamID) {
                                    if (currentTeamID != null) {
                                        theCurrentTeamID = currentTeamID;

                                        campaignsService.retrieveCampaignsByTeam(parseInt(currentTeamID), function (data) {
                                            $scope.campaigns = data.outData.campaigns;
                                            $scope.$apply();
                                        });
                                    }
                                });
                            });
                        });
                    }
                });
            }
        }]);