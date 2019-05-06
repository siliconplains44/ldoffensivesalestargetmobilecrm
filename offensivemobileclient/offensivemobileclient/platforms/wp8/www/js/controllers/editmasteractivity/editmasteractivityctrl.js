angular.module('offensiveapp')
    .controller('editmasteractivitycontroller', ['$scope', '$http', '$state', '$ionicPopup', '$window', '$stateParams', '$location', 'authenticationservice', 'applicationservice', 'teamsservice', 'businessobjectsservice', 'campaignsservice',
        function ($scope, $http, $state, $ionicPopup, $window, $stateParams, $location, authenticationService, applicationService, teamsService, businessObjectsService, campaignsService) {

            $scope.formstartedrequired = false;
            $scope.formdurationrequired = false;
            $scope.formdescriptionrequired = false;
            $scope.formcampaignrequired = false;
            $scope.formactivitytyperequired = false;

            var theCurrentTeamID = null;
            var campaignsLoaded = false;
            var activityTypesLoaded = false;

            var activityID = $location.$$path.split("/")[3];

            applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                applicationService.getCurrentTeam(function (currentTeamID) {
                    if (currentTeamID != null) {
                        theCurrentTeamID = currentTeamID;

                        campaignsService.retrieveCampaignsByTeam(currentTeamID, function (data) {
                            $scope.campaigns = data.outData.campaigns;

                            businessObjectsService.retrieveActivityTypes(function (data) {
                                $scope.activitytypes = data.outData.activitytypes;

                                $scope.$apply();

                                businessObjectsService.retrieveActivitiesWithFilter(parseInt(activityID), null, null, null, null, function (data) {
                                    $scope.$$childHead.started = new Date(data.outData.activities[0].Started);
                                    $scope.$$childHead.duration = data.outData.activities[0].DurationInHours;
                                    $scope.$$childHead.description = data.outData.activities[0].Description;

                                    for (var i = 0; i < $scope.campaigns.length; i++) {
                                        if ($scope.campaigns[i].CampaignID === data.outData.activities[0].CampaignID) {
                                            $scope.$$childHead.thecampaign = $scope.campaigns[i];
                                            $scope.$apply();
                                            break;
                                        }
                                    }

                                    for (var i = 0; i < $scope.activitytypes.length; i++) {
                                        if ($scope.activitytypes[i].ActivityTypeID === data.outData.activities[0].ActivityTypeID) {
                                            $scope.$$childHead.theactivitytype = $scope.activitytypes[i];
                                            $scope.$apply();
                                            break;
                                        }
                                    }

                                    $scope.$$childHead.customactivitytype = data.outData.activities[0].ActivityTypeCustomName;
                                    $scope.$apply();
                                });
                            });
                        });
                    }
                });
            });

            $scope.onModifyActivity = function () {
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
                    businessObjectsService.modifyActivity(parseInt(activityID), securityUserID, campaign.CampaignID, started, duration, description,
                        null, null, activitytype.ActivityTypeID, customactivity, function (data) {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Sales Target',
                                template: 'Activity has been edited!'
                            });
                        });
                });
            };

        }]);