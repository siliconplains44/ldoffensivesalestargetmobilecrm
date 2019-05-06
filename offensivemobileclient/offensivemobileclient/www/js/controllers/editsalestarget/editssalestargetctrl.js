angular.module('offensiveapp')
    .controller('editsalestargetcontroller', ['$scope', '$http', '$state', '$stateParams', '$ionicPopup', '$location', 'authenticationservice', 'applicationservice', 'businessobjectsservice', 'campaignsservice',
        function ($scope, $http, $state, $stateParams, $ionicPopup, $location, authenticationService, applicationService, businessObjectsService, campaignsService) {

            var salesTargetID = $location.$$path.split("/")[3];
            var oldStage = null;

            businessObjectsService.retrieveSalesTargetsWithFilter(salesTargetID, null, null, null, function (data) {
                $scope.name = data.outData.salestargets[0].Name;
                $scope.choice = data.outData.salestargets[0].SalesTargetStageID;
                oldStage = data.outData.salestargets[0].SalesTargetStageID;
                $scope.$apply();
            });

            $scope.onBack = function () {
                window.history.back();
            };

            $scope.onEditSalesTarget = function () {
                var name = $scope.$$childHead.name;

                applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                    applicationService.getCurrentTeam(function (currentTeamID) {
                        businessObjectsService.modifySalesTarget(parseInt(salesTargetID), name, securityUserID, $scope.choice, parseInt(currentTeamID), function (data) {
                            campaignsService.getDefaultCampaignSelectionForTeam(currentTeamID, function (dataDefault) {
                                businessObjectsService.retrieveSalesTargetsWithFilter(parseInt(salesTargetID), null, null, null, function (data) {
                                    businessObjectsService.addSalesTargetStageChangeLogEntries(parseInt(salesTargetID), data.outData.salestargets[0].SalesTargetStageID,
                                        oldStage, securityUserID, parseInt(dataDefault), parseInt(currentTeamID), function (data) {
                                        window.history.back();
                                    });
                                });
                            });
                        });
                    });
                });
            };

        }]);
