angular.module('offensiveapp')
    .controller('dealscontroller', ['$scope', '$http', '$state', '$ionicPopup', '$stateParams', '$location', 'authenticationservice', 'applicationservice', 'businessobjectsservice',
        function ($scope, $http, $state, $ionicPopup, $stateParams, $location, authenticationService, applicationService, businessObjectsService) {

            var parentObjectType = $stateParams.params.type;
            var parentObjectID = $stateParams.params.id;

            if ($stateParams.params.type === 'salestarget') {
                parentObjectType = 7;
            }

            businessObjectsService.retrieveDealsWithFilter(null, parentObjectID, null, function (data) {
                $scope.deals = data.outData.deals;
            });

            $scope.onAddDeal = function () {
                $state.go('tab.adddeal', { params: { type: parentObjectType, id: parentObjectID } });
            };

            $scope.onEditDeal = function (deal) {
                $state.go('tab.editdeal', { id: deal.DealID, params: { type: parentObjectType, id: parentObjectID } });
            };

            $scope.onDeleteDeal = function (deal) {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Confirm Sales Target Deletion',
                    template: 'Are you sure you want to delete this deal?'
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        businessObjectsService.deleteDeal(deal.DealID, function (data) {
                            businessObjectsService.retrieveDealsWithFilter(null, parentObjectID, null, function (data) {
                                $scope.deals = data.outData.deals;
                            });
                        });
                    }
                });
            };

        }]);