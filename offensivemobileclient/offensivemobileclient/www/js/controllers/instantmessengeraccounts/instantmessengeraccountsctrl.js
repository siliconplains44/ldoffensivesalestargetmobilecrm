angular.module('offensiveapp')
    .controller('instantmessengeraccountscontroller', ['$scope', '$http', '$state', '$ionicPopup', '$stateParams', '$location', 'authenticationservice', 'applicationservice', 'businessobjectsservice',
        function ($scope, $http, $state, $ionicPopup, $stateParams, $location, authenticationService, applicationService, businessObjectsService) {

            var parentObjectType = $stateParams.params.type;
            var parentObjectID = $stateParams.params.id;

            if ($stateParams.params.type === 'salestarget') {
                parentObjectType = 7;
            }
            else if ($stateParams.params.type === 'individual') {
                parentObjectType = 3;
            };

            businessObjectsService.retrieveInstantMessengerAccountsWithFilter(null, parentObjectType, parentObjectID, function (data) {
                $scope.instantmessengeraccounts = data.outData.instantmessageaccounts;
            });

            $scope.onAddInstantMessengerAccount = function () {
                $state.go('tab.addinstantmessengeraccount', { params: { type: parentObjectType, id: parentObjectID } });
            };

            $scope.onEditInstantMessengerAccount = function (instantmessengeraccount) {
                $state.go('tab.editinstantmessengeraccount', { id: instantmessengeraccount.InstantMessageAccountID, params: { type: parentObjectType, id: parentObjectID } });
            };

            $scope.onDeleteInstantMessengerAccount = function (instantmessengeraccount) {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Confirm Sales Target Deletion',
                    template: 'Are you sure you want to delete this uri?'
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        businessObjectsService.deleteInstantMessengerAccount(instantmessengeraccount.InstantMessageAccountID, function (data) {
                            businessObjectsService.retrieveInstantMessengerAccountsWithFilter(null, parentObjectType, parentObjectID, function (data) {
                                $scope.instantmessengeraccounts = data.outData.instantmessageaccounts;
                            });
                        });
                    }
                });
            };

        }]);