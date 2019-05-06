angular.module('offensiveapp')
    .controller('manageteamrevenuecontroller', ['$scope', '$http', '$state', '$ionicPopup', '$location', 'authenticationservice', 'applicationservice', 'teamsservice', 'businessobjectsservice',
        function ($scope, $http, $state, $ionicPopup, $location, authenticationService, applicationService, teamsService, businessObjectsService) {

            var theCurrentTeamID = null;

            $scope.periodyear = moment().format("YYYY").toString();
            $scope.periodmonth = moment().format("M").toString();
            $scope.$apply();

            applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                applicationService.getCurrentTeam(function (currentTeamID) {
                    if (currentTeamID != null) {
                        theCurrentTeamID = parseInt(currentTeamID);

                        businessObjectsService.retrieveTeamSalesTargetsWithRevenueAmounts(theCurrentTeamID,
                            parseInt($scope.periodyear), parseInt($scope.periodmonth), function (data) {
                            $scope.salestargets = data.outData.salestargets;
                        });
                    }
                });
            });

            $scope.onYearChange = function (periodyear) {
                $scope.periodyear = periodyear;
                businessObjectsService.retrieveTeamSalesTargetsWithRevenueAmounts(theCurrentTeamID,
                            parseInt($scope.periodyear), parseInt($scope.periodmonth), function (data) {
                                $scope.salestargets = data.outData.salestargets;
                            });
            };

            $scope.onMonthChange = function (periodmonth) {
                $scope.periodmonth = periodmonth;
                businessObjectsService.retrieveTeamSalesTargetsWithRevenueAmounts(theCurrentTeamID,
                            parseInt($scope.periodyear), parseInt($scope.periodmonth), function (data) {
                                $scope.salestargets = data.outData.salestargets;
                            });
            };

            $scope.onSaveRevenueEntries = function () {
                async.each($scope.salestargets, function (item, callback) {
                    businessObjectsService.updateSalesTargetRevenueAmountForPeriodYearAndMonth(
                        item.SalesTargetID, parseInt($scope.periodyear), parseInt($scope.periodmonth), item.Amount, function (data) {
                            callback();
                        });
                    }
             , function (err) {
                    cb(null, null);
                });
            };
            
        }]);
