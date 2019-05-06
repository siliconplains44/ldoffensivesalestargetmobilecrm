angular.module('offensiveapp')
    .controller('addquotecontroller', ['$scope', '$http', '$state', '$ionicPopup', '$stateParams', '$window', '$stateParams', '$location', 'authenticationservice', 'applicationservice', 'teamsservice', 'businessobjectsservice', 'campaignsservice',
        function ($scope, $http, $state, $ionicPopup, $stateParams, $window, $stateParams, $location, authenticationService, applicationService, teamsService, businessObjectsService, campaignsService) {

            $scope.formproductorservicerequired = false;
            $scope.formsentrequired = false;
            $scope.formtimeframetyperequired = false;
            $scope.formamountrequired = false;
            $scope.formnotesrequired = false;

            businessObjectsService.retrieveTimeFrameTypes(function (data) {
                $scope.timeframetypes = data.outData.timeframetypes;
            });

            $scope.onCreateQuote = function () {
                var productorservice = $scope.$$childHead.productorservice;
                var sent = $scope.$$childHead.sent;
                var timeframetype = $scope.$$childHead.thetimeframetype;
                var amount = $scope.$$childHead.amount;
                var notes = $scope.$$childHead.notes;

                var isvalid = true;

                if (productorservice == undefined) {
                    $scope.formproductorservicerequired = true;
                    isvalid = false;
                    $scope.$apply();
                }

                if (sent == undefined) {
                    $scope.formsentrequired = true;
                    isvalid = false;
                    $scope.$apply();
                }

                if (timeframetype == undefined) {
                    $scope.formtimeframetyperequired = true;
                    isvalid = false;
                    $scope.$apply();
                }

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
                    businessObjectsService.addQuote($stateParams.params.id, productorservice, sent, timeframetype.TimeFrameTypeID, amount, notes, function (data) {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Sales Target',
                                template: 'Quote has been added!'
                            });
                        });
                });
            };

        }]);