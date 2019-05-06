angular.module('offensiveapp')
    .controller('adddealcontroller', ['$scope', '$http', '$state', '$ionicPopup', '$stateParams', '$window', '$stateParams', '$location', 'authenticationservice', 'applicationservice', 'teamsservice', 'businessobjectsservice', 'campaignsservice',
        function ($scope, $http, $state, $ionicPopup, $stateParams, $window, $stateParams, $location, authenticationService, applicationService, teamsService, businessObjectsService, campaignsService) {

            $scope.formproductorservicerequired = false;
            $scope.formisestimaterequired = false;
            //$scope.formtimeframetyperequired = false;
            $scope.formamountrequired = false;
            $scope.formnotesrequired = false;

            businessObjectsService.retrieveTimeFrameTypes(function (data) {
                $scope.timeframetypes = data.outData.timeframetypes;
            });

            $scope.onCreateDeal = function () {
                var productorservice = $scope.$$childHead.productorservice;
                var closed = $scope.$$childHead.closed;
                var isestimate = $scope.$$childHead.isestimate;
                var timeframetype = $scope.$$childHead.thetimeframetype;
                var amount = $scope.$$childHead.amount;
                var notes = $scope.$$childHead.notes;

                var isvalid = true;

                if (productorservice == undefined) {
                    $scope.formproductorservicerequired = true;
                    isvalid = false;
                    $scope.$apply();
                }

                if (isestimate == undefined) {
                    $scope.formisestimaterequired = true;
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
                    businessObjectsService.addDeal($stateParams.params.id, productorservice, close, isestimate, 1, amount, notes, function (data) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Sales Target',
                            template: 'Deal has been added!'
                        });
                    });
                });
            };

        }]);