angular.module('offensiveapp')
    .controller('emailaddressescontroller', ['$scope', '$http', '$state', '$ionicPopup', '$stateParams', '$location', 'authenticationservice', 'applicationservice', 'businessobjectsservice',
        function ($scope, $http, $state, $ionicPopup, $stateParams, $location, authenticationService, applicationService, businessObjectsService) {

            var parentObjectType = $stateParams.params.type;
            var parentObjectID = $stateParams.params.id;

            if ($stateParams.params.type === 'salestarget') {
                parentObjectType = 7;
            }
            else if ($stateParams.params.type === 'individual') {
                parentObjectType = 3;
            };

            businessObjectsService.retrieveEmailAddressesWithFilter(null, parentObjectType, parentObjectID, function (data) {
                $scope.emailaddresses = data.outData.emailaddresses;
            });

            $scope.onAddEmailAddress = function () {
                $state.go('tab.addemailaddress', { params: { type: parentObjectType, id: parentObjectID } });
            };

            $scope.onEditEmailAddress = function (emailaddress) {
                $state.go('tab.editemailaddress', { id: emailaddress.EmailAddressID, params: { type: parentObjectType, id: parentObjectID } });
            };

            $scope.onDeleteEmailAddress = function (emailaddress) {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Confirm Sales Target Deletion',
                    template: 'Are you sure you want to delete this email address?'
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        businessObjectsService.deleteEmailAddress(emailaddress.EmailAddressID, function (data) {
                            businessObjectsService.retrieveEmailAddressesWithFilter(null, parentObjectType, parentObjectID, function (data) {
                                $scope.emailaddresses = data.outData.emailaddresses;
                            });
                        });
                    }
                });
            };

        }]);