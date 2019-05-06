angular.module('offensiveapp')
    .controller('quotescontroller', ['$scope', '$http', '$state', '$ionicPopup', '$stateParams', '$location', 'authenticationservice', 'applicationservice', 'businessobjectsservice',
        function ($scope, $http, $state, $ionicPopup, $stateParams, $location, authenticationService, applicationService, businessObjectsService) {

            var parentObjectType = $stateParams.params.type;
            var parentObjectID = $stateParams.params.id;

            if ($stateParams.params.type === 'salestarget') {
                parentObjectType = 7;
            }

            businessObjectsService.retrieveQuotesWithFilter(null, parentObjectID, function (data) {
                $scope.quotes = data.outData.quotes;
            });

            $scope.onAddQuote = function () {
                $state.go('tab.addquote', { params: { type: parentObjectType, id: parentObjectID } });
            };

            $scope.onEditQuote = function (quote) {
                $state.go('tab.editquote', { id: quote.QuoteID, params: { type: parentObjectType, id: parentObjectID } });
            };

            $scope.onDeleteQuote = function (quote) {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Confirm Sales Target Deletion',
                    template: 'Are you sure you want to delete this quote?'
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        businessObjectsService.deleteQuote(quote.QuoteID, function (data) {
                            businessObjectsService.retrieveQuotesWithFilter(null, parentObjectID, function (data) {
                                $scope.quotes = data.outData.quotes;
                            });
                        });
                    }
                });
            };

        }]);