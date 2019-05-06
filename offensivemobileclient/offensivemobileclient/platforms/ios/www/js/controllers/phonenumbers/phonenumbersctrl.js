angular.module('offensiveapp')
    .controller('phonenumberscontroller', ['$scope', '$http', '$state', '$ionicPopup', '$stateParams', '$location', 'authenticationservice', 'applicationservice', 'businessobjectsservice',
        function ($scope, $http, $state, $ionicPopup, $stateParams, $location, authenticationService, applicationService, businessObjectsService) {

            var parentObjectType = $stateParams.params.type;
            var parentObjectID = $stateParams.params.id;

            if ($stateParams.params.type === 'salestarget') {
                parentObjectType = 7;
            }
            else if ($stateParams.params.type === 'individual') {
                parentObjectType = 3;
            };

            businessObjectsService.retrievePhoneNumbersWithFilter(null, parentObjectType, parentObjectID, function (data) {
                $scope.phonenumbers = data.outData.phonenumbers;
            });

            $scope.onAddPhoneNumber = function () {
                $state.go('tab.addphonenumber', { params: { type: parentObjectType, id: parentObjectID } });
            };

            $scope.onEditPhoneNumber = function (phonenumber) {
                $state.go('tab.editphonenumber', { id: phonenumber.PhoneNumberID, params: { type: parentObjectType, id: parentObjectID } });
            };

            $scope.onDeletePhoneNumber = function (phonenumber) {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Confirm Sales Target Deletion',
                    template: 'Are you sure you want to delete this phone number?'
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        businessObjectsService.deletePhoneNumber(phonenumber.PhoneNumberID, function (data) {
                            businessObjectsService.retrievePhoneNumbersWithFilter(null, parentObjectType, parentObjectID, function (data) {
                                $scope.phonenumbers = data.outData.phonenumbers;
                            });
                        });
                    }
                });
            };

        }]);