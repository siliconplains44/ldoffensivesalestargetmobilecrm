angular.module('offensiveapp')
    .controller('editcampaigncontroller', ['$scope', '$http', '$state', '$ionicPopup', '$location', 'authenticationservice', 'applicationservice', 'teamsservice', 'campaignsservice',
        function ($scope, $http, $state, $ionicPopup, $location, authenticationService, applicationService, teamsService, campaignsService) {

            $scope.formnamerequired = false;
            $scope.formstartdaterequired = false;
            $scope.formenddaterequired = false;

            var theCurrentTeamID = null;

            applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                applicationService.getCurrentTeam(function (currentTeamID) {
                    if (currentTeamID != null) {
                        theCurrentTeamID = currentTeamID;
                    }
                });
            });

            var campaignID = $location.$$path.split("/")[3];

            campaignsService.retrieveCampaignByCampaignID(campaignID, function (data) {
                $scope.$$childHead.campaignname = data.outData.campaign.Name;
                $scope.$$childHead.description = data.outData.campaign.Description;
                $scope.$$childHead.startdate = new Date(data.outData.campaign.StartDate);
                $scope.$$childHead.enddate = new Date(data.outData.campaign.EndDate);
                $scope.$apply();
            });

            $scope.onBack = function () {
                $state.go('tab.campaigns');
            };

            $scope.onModifyCampaign = function () {
                var campaignName = $scope.$$childHead.campaignname;
                var description = $scope.$$childHead.description;
                var startdate = $scope.$$childHead.startdate;
                var enddate = $scope.$$childHead.enddate;

                var isvalid = true;

                if (campaignName == undefined) {
                    $scope.formnamerequired = true;
                    isvalid = false;
                    $scope.$apply();
                }

                if (startdate == undefined) {
                    $scope.formstartdaterequired = true;
                    isvalid = false;
                    $scope.$apply();
                }

                if (enddate == undefined) {
                    $scope.formenddaterequired = true;
                    isvalid = false;
                    $scope.$apply();
                }

                if (false == isvalid) {
                    return;
                }

                campaignsService.modifyCampaign(campaignID, startdate, campaignName, description, enddate, theCurrentTeamID, function (data) {
                    $state.go('tab.campaigns');
                });

            };

        }]);