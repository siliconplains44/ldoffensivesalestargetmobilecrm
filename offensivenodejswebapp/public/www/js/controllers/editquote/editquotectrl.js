angular.module('offensiveapp')
    .controller('editquotecontroller', ['$scope', '$http', '$state', '$ionicPopup', '$stateParams', '$window', '$stateParams', '$location', 'authenticationservice', 'applicationservice', 'teamsservice', 'businessobjectsservice', 'campaignsservice',
        function ($scope, $http, $state, $ionicPopup, $stateParams, $window, $stateParams, $location, authenticationService, applicationService, teamsService, businessObjectsService, campaignsService) {

            $scope.formproductorservicerequired = false;
            $scope.formsentrequired = false;
            $scope.formtimeframetyperequired = false;
            $scope.formamountrequired = false;
            $scope.formnotesrequired = false;

            var quoteID = $location.$$path.split("/")[3];

            businessObjectsService.retrieveTimeFrameTypes(function (data) {
                $scope.timeframetypes = data.outData.timeframetypes;

                businessObjectsService.retrieveQuotesWithFilter(parseInt(quoteID), null, function (data) {
                    $scope.$$childHead.productorservice = data.outData.quotes[0].ProductOrService;
                    $scope.$$childHead.sent = new Date(data.outData.quotes[0].SentDate);

                    for (var i = 0; i < $scope.timeframetypes.length; i++) {
                        if ($scope.timeframetypes[i].TimeFrameTypeID === data.outData.quotes[0].TimeFrameTypeID) {
                            $scope.$$childHead.thetimeframetype = $scope.timeframetypes[i];
                            $scope.$apply();
                            break;
                        }
                    }

                    $scope.$$childHead.amount = data.outData.quotes[0].Amount;
                    $scope.$$childHead.notes = data.outData.quotes[0].Notes;
                    $scope.$apply();
                });
            });

            $scope.onModifyQuote = function () {
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
                    businessObjectsService.modifyQuote(parseInt(quoteID), $stateParams.params.id, productorservice, sent, timeframetype.TimeFrameTypeID, amount, notes, function (data) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Sales Target',
                            template: 'Quote has been edited!'
                        });
                    });
                });
            };

        }]);