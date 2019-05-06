angular.module('offensiveapp')
    .controller('currentcampaigncontroller', ['$scope', '$http', '$state', '$ionicPopup', '$location', 'authenticationservice', 'applicationservice', 'campaignsservice', 'teamsservice',
        function ($scope, $http, $state, $ionicPopup, $location, authenticationService, applicationService, campaignsService, teamsService) {

            var theCurrentTeamID = null;

            applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                applicationService.getCurrentTeam(function (currentTeamID) {
                    if (currentTeamID != null) {
                        theCurrentTeamID = currentTeamID;
                        teamsService.retrieveTeamByTeamID(currentTeamID, function (data) {
                            $scope.currentTeam = data.outData.team.Name;
                        });

                        campaignsService.retrieveCampaignsByTeam(currentTeamID, function (data) {
                                $scope.campaigns = data.outData.campaigns;

                                if (data.outData.campaigns.length > 0) {
                                    $scope.showCampaignSwitcher = true;

                                    campaignsService.getDefaultCampaignSelectionForTeam(currentTeamID, function (dataDefault) {

                                        if (null != data) {
                                            for (var i = 0; i < data.outData.campaigns.length; i++) {
                                                if (data.outData.campaigns[i].CampaignID == dataDefault) {
                                                    $scope.$$childHead.thecampaign = data.outData.campaigns[0];
                                                    break;
                                                }
                                            }
                                        }
                                    });
                                }
                                else {
                                    $scope.showCampaignSwitcher = false;
                                }
                            });
                    }
                });
            });

            $scope.onCampaignSelected = function (campaign) {
                campaignsService.setDefaultCampaignSelectionForTeam(theCurrentTeamID, campaign.CampaignID, function () { })
            };

        }]);