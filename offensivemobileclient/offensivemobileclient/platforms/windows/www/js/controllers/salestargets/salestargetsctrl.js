angular.module('offensiveapp')
    .controller('salestargetscontroller', ['$scope', '$http', '$state', '$ionicPopup', '$location', 'authenticationservice', 'applicationservice', 'businessobjectsservice', 'utilityservice', 'teamsservice',
        function ($scope, $http, $state, $ionicPopup, $location, authenticationService, applicationService, businessObjectsService, utilityService, teamsService) {

            $scope.viewTitle = "";
            $scope.viewTitleNoS = "";

            var viewID = parseInt($location.$$path.split("/")[3]);

            applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                applicationService.getCurrentTeam(function (currentTeamID) {

                    if (viewID === utilityService.eProbable) {
                        $scope.viewTitle = "Probables";
                        $scope.viewTitleNoS = "Probable";
                    }
                    else if (viewID === utilityService.ePropect) {
                        $scope.viewTitle = "Prospects";
                        $scope.viewTitleNoS = "Prospect";

                    }
                    else if (viewID === utilityService.eLead) {
                        $scope.viewTitle = "Leads";
                        $scope.viewTitleNoS = "Lead";
                    }
                    else if (viewID === utilityService.eOpportunity) {
                        $scope.viewTitle = "Opportunities";
                        $scope.viewTitleNoS = "Opportunity";
                    }
                    else if (viewID === utilityService.eAccount) {
                        $scope.viewTitle = "Accounts";
                        $scope.viewTitleNoS = "Account";
                    }
                    else if (viewID === utilityService.eInactive) {
                        $scope.viewTitle = "Inactives";
                        $scope.viewTitleNoS = "Inactive";
                    }

                    $scope.selections = [
                        { Name: "My " + $scope.viewTitle },
                        { Name: "Shared " + $scope.viewTitle }
                    ];

                    teamsService.isSecurityUserLeadOfTeam(parseInt(currentTeamID), securityUserID, function (data) {
                        if (data.outData.islead == 1) {
                            $scope.selections.push({ Name: "Team " + $scope.viewTitle });

                            $scope.$$childHead.theselection = $scope.selections[0];

                            $scope.$apply();

                            businessObjectsService.retrieveSalesTargetsWithFilter(null, securityUserID, viewID,
                                parseInt(currentTeamID), function (data) {
                                    $scope.salestargets = data.outData.salestargets;
                                    $scope.$apply();
                                });
                        }
                        else {
                            businessObjectsService.retrieveSalesTargetsWithFilter(null, securityUserID, viewID,
                                parseInt(currentTeamID), function (data) {
                                    $scope.salestargets = data.outData.salestargets;
                                    $scope.$apply();
                                });
                        }
                    });
                });
            });

            $scope.onAddSalesTarget = function() {
                $state.go('tab.addsalestarget', { params : { "returnuri" : $location.$$path, "type" : viewID } });
            };

            $scope.onEditSalesTarget = function (salesTarget) {
                $state.go('tab.editsalestarget', { id: salesTarget.SalesTargetID, params: { "returnuri": $location.$$path, "type": viewID } });
            };

            $scope.onDeleteSalesTarget = function (salesTarget) {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Confirm Sales Target Deletion',
                    template: 'Are you sure you want to delete this sales target?'
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                            applicationService.getCurrentTeam(function (currentTeamID) {
                                businessObjectsService.deleteSalesTarget(salesTarget.SalesTargetID, function (data) {
                                    businessObjectsService.retrieveSalesTargetsWithFilter(null, securityUserID, viewID,
                                    parseInt(currentTeamID), function (data) {
                                        $scope.salestargets = data.outData.salestargets;
                                        $scope.$apply();
                                    });
                                });
                            });
                        });
                    }
                });
            };

            $scope.onFilterChange = function (selection) {
                if (selection.Name === "My " + $scope.viewTitle) {
                    applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                        applicationService.getCurrentTeam(function (currentTeamID) {
                            businessObjectsService.retrieveSalesTargetsWithFilter(null, securityUserID, viewID,
                                parseInt(currentTeamID), function (data) {
                                    $scope.salestargets = data.outData.salestargets;
                                    $scope.$apply();
                                });
                        });
                    });
                }
                else if (selection.Name === "Shared " + $scope.viewTitle) {
                    applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                        applicationService.getCurrentTeam(function (currentTeamID) {
                        businessObjectsService.retrieveSalesTargetsSharedWithUser(securityUserID, function (data) {
                                $scope.salestargets = data.outData.salestargets;
                                $scope.$apply();
                            });
                        });
                    });
                }
                else if (selection.Name ==="Team " + $scope.viewTitle) {
                    applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                        applicationService.getCurrentTeam(function (currentTeamID) {
                            businessObjectsService.retrieveSalesTargetsWithFilter(null, null, viewID,
                                parseInt(currentTeamID), function (data) {
                                    $scope.salestargets = data.outData.salestargets;
                                    $scope.$apply();
                                });
                        });
                    });
                }
            };

            $scope.onSalesTargetSharing = function (salesTarget) {
                $state.go('tab.salestargetsharing', { id: salesTarget.SalesTargetID });
            };

            $scope.onSalesTargetIndividuals = function (salesTarget) {
                $state.go('tab.salestargetindividuals', { id: salesTarget.SalesTargetID });
            };

            $scope.onSalesTargetNotes = function (salesTarget) {
                $state.go('tab.notes', { params: { type: "salestarget", id: salesTarget.SalesTargetID } });
            };

            $scope.onSalesTargetActivities = function (salesTarget) {
                $state.go('tab.activities', { params: { type: "salestarget", id: salesTarget.SalesTargetID } });
            };

            $scope.onSalesTargetQuotes = function (salesTarget) {
                $state.go('tab.quotes', { params: { type: "salestarget", id: salesTarget.SalesTargetID } });
            };

            $scope.onSalesTargetDeals = function (salesTarget) {
                $state.go('tab.deals', { params: { type: "salestarget", id: salesTarget.SalesTargetID } });
            };

            $scope.onSalesTargetAddresses = function (salesTarget) {
                $state.go('tab.addresses', { params: { type: "salestarget", id: salesTarget.SalesTargetID } });
            };

            $scope.onSalesTargetPhoneNumbers = function (salesTarget) {
                $state.go('tab.phonenumbers', { params: { type: "salestarget", id: salesTarget.SalesTargetID } });
            };

            $scope.onSalesTargetEmailAddresses = function (salesTarget) {
                $state.go('tab.emailaddresses', { params: { type: "salestarget", id: salesTarget.SalesTargetID } });
            }

            $scope.onSalesTargetUris = function (salesTarget) {
                $state.go('tab.uris', { params: { type: "salestarget", id: salesTarget.SalesTargetID } });
            };

            $scope.onSalesTargetInstantMessengerAccounts = function (salesTarget) {
                $state.go('tab.instantmessengeraccounts', { params: { type: "salestarget", id: salesTarget.SalesTargetID } });
            };

            $scope.onSalesTargetAttachments = function (salesTarget) {
                $state.go('tab.attachments', { params: { type: "salestarget", id: salesTarget.SalesTargetID } });
            }

        }]);
