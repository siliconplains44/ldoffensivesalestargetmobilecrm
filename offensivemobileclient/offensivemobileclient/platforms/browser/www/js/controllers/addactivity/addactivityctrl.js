angular.module('offensiveapp')
    .controller('addactivitycontroller', ['$scope', '$http', '$state', '$ionicPopup', '$stateParams', '$window', '$stateParams', '$location', 'authenticationservice', 'applicationservice', 'teamsservice', 'businessobjectsservice', 'campaignsservice',
        function ($scope, $http, $state, $ionicPopup, $stateParams, $window, $stateParams, $location, authenticationService, applicationService, teamsService, businessObjectsService, campaignsService) {

            $scope.formstartedrequired = false;
            $scope.formdurationrequired = false;
            $scope.formdescriptionrequired = false;
            $scope.formcampaignrequired = false;
            $scope.formactivitytyperequired = false;

            var theCurrentTeamID = null;

            applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                applicationService.getCurrentTeam(function (currentTeamID) {
                    if (currentTeamID != null) {
                        theCurrentTeamID = currentTeamID;

                        campaignsService.retrieveCampaignsByTeam(currentTeamID, function (data) {
                            $scope.campaigns = data.outData.campaigns;

                            campaignsService.getDefaultCampaignSelectionForTeam(parseInt(currentTeamID), function (dataDefault) {

                                if (null != data) {
                                    for (var i = 0; i < data.outData.campaigns.length; i++) {
                                        if (data.outData.campaigns[i].CampaignID == dataDefault) {
                                            $scope.$$childHead.thecampaign = data.outData.campaigns[0];
                                            break;
                                        }
                                    }
                                }
                            });
                        });
                    }
                });
            });

            businessObjectsService.retrieveActivityTypes(function (data) {
                $scope.activitytypes = data.outData.activitytypes;
            });

            $scope.onCreateActivity = function () {
                var started = $scope.$$childHead.started;
                var duration = $scope.$$childHead.duration;
                var description = $scope.$$childHead.description;
                var campaign = $scope.$$childHead.thecampaign;
                var activitytype = $scope.$$childHead.theactivitytype;
                var customactivity = $scope.$$childHead.customactivitytype;

                var isvalid = true;

                if (started == undefined) {
                    $scope.formstartedrequired = true;
                    isvalid = false;
                    $scope.$apply();
                }

                if (duration == undefined) {
                    $scope.formdurationrequired = true;
                    isvalid = false;
                    $scope.$apply();
                }

                if (description == undefined) {
                    $scope.formdescriptionrequired = true;
                    isvalid = false;
                    $scope.$apply();
                }

                if (campaign == undefined) {
                    $scope.formcampaignrequired = true;
                    isvalid = false;
                    $scope.$apply();
                }

                if (activitytype == undefined) {
                    $scope.formactivitytyperequired = true;
                    isvalid = false;
                    $scope.$apply();
                }

                if (false == isvalid) {
                    return;
                }

                applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                    businessObjectsService.addActivity(securityUserID, campaign.CampaignID, started, duration, description,
                        $stateParams.params.type, $stateParams.params.id, activitytype.ActivityTypeID, customactivity, function (data) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Sales Target',
                            template: 'Activity has been added!'
                        });
                    });
                });
            };

        }]);