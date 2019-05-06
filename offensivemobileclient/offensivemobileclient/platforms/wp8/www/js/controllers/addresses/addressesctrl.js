angular.module('offensiveapp')
    .controller('addressescontroller', ['$scope', '$http', '$state', '$ionicPopup', '$stateParams', '$location', 'authenticationservice', 'applicationservice', 'businessobjectsservice',
        function ($scope, $http, $state, $ionicPopup, $stateParams, $location, authenticationService, applicationService, businessObjectsService) {

            var parentObjectType = $stateParams.params.type;
            var parentObjectID = $stateParams.params.id;

            if ($stateParams.params.type === 'salestarget') {
                parentObjectType = 7;
            }
            else if ($stateParams.params.type === 'individual') {
                parentObjectType = 3;
            };

            businessObjectsService.retrieveAddressesWithFilter(null, parentObjectType, parentObjectID, function (data) {
                $scope.addresses = data.outData.addresses;
            });

            $scope.onAddAddress = function () {
                $state.go('tab.addaddress', { params: { type: parentObjectType, id: parentObjectID } });
            };

            $scope.onEditAddress = function (address) {
                $state.go('tab.editaddress', { id: address.AddressID, params: { type: parentObjectType, id: parentObjectID } });
            };

            $scope.onDeleteAddress = function (address) {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Confirm Sales Target Deletion',
                    template: 'Are you sure you want to delete this address?'
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        businessObjectsService.deleteAddress(address.AddressID, function (data) {
                            businessObjectsService.retrieveAddressesWithFilter(null, parentObjectType, parentObjectID, function (data) {
                                $scope.addresses = data.outData.addresses;
                            });
                        });
                    }
                });
            };

        }]);