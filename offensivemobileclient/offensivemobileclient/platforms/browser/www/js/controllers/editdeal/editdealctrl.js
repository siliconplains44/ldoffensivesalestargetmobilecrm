angular.module('offensiveapp')
    .controller('editdealcontroller', ['$scope', '$http', '$state', '$ionicPopup', '$stateParams', '$window', '$stateParams', '$location', 'authenticationservice', 'applicationservice', 'teamsservice', 'businessobjectsservice', 'campaignsservice',
        function ($scope, $http, $state, $ionicPopup, $stateParams, $window, $stateParams, $location, authenticationService, applicationService, teamsService, businessObjectsService, campaignsService) {

            $scope.formproductorservicerequired = false;
            $scope.formisestimaterequired = false;
            //$scope.formtimeframetyperequired = false;
            $scope.formamountrequired = false;
            $scope.formnotesrequired = false;

            var dealID = $location.$$path.split("/")[3];

            businessObjectsService.retrieveTimeFrameTypes(function (data) {
                $scope.timeframetypes = data.outData.timeframetypes;

                businessObjectsService.retrieveDealsWithFilter(parseInt(dealID), null, null, function (data) {
                    $scope.$$childHead.productorservice = data.outData.deals[0].ProductOrService;
                    $scope.$$childHead.closed = new Date(data.outData.deals[0].ClosedDate);

                    if (data.outData.deals[0].IsEstimate == null || data.outData.deals[0].IsEstimate == 0)
                        $scope.$$childHead.isestimate = false;
                    else
                        $scope.$$childHead.isestimate = true;
                    

                    /*for (var i = 0; i < $scope.timeframetypes.length; i++) {
                        if ($scope.timeframetypes[i].TimeFrameTypeID === data.outData.deals[0].TimeFrameTypeID) {
                            $scope.$$childHead.thetimeframetype = $scope.timeframetypes[i];
                            $scope.$apply();
                            break;
                        }
                    }*/

                    $scope.$$childHead.amount = data.outData.deals[0].Amount;
                    $scope.$$childHead.notes = data.outData.deals[0].Notes;
                    $scope.$apply();
                });
            });

            $scope.onModifyDeal = function () {
                var productorservice = $scope.$$childHead.productorservice;
                var closed = $scope.$$childHead.closed;
                var isestimate = $scope.$$childHead.isestimate;
                //var timeframetype = $scope.$$childHead.thetimeframetype;
                var amount = $scope.$$childHead.amount;
                var notes = $scope.$$childHead.notes;

                var isvalid = true;

                if (productorservice == undefined) {
                    $scope.formproductorservicerequired = true;
                    isvalid = false;
                    $scope.$apply();
                }

                /*if (timeframetype == undefined) {
                    $scope.formtimeframetyperequired = true;
                    isvalid = false;
                    $scope.$apply();
                }*/

                if (amount == undefined) {
                    $scope.formamountrequired = true;
                    isvalid = false;
                    $scope.$apply();
                }

                if (notes == undefined) {
                    $scope.formnotesrequired = true;
                    isvalid = false;
                    $scope.$apply();
                }

                if (false == isvalid) {
                    return;
                }

                applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                    businessObjectsService.modifyDeal(parseInt(dealID), $stateParams.params.id, productorservice, closed, isestimate, 1, amount, notes, function (data) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Sales Target',
                            template: 'Deal has been edited!'
                        });
                    });
                });
            };

        }]);