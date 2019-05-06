angular.module('offensiveapp')
    .controller('uriscontroller', ['$scope', '$http', '$state', '$ionicPopup', '$stateParams', '$location', 'authenticationservice', 'applicationservice', 'businessobjectsservice',
        function ($scope, $http, $state, $ionicPopup, $stateParams, $location, authenticationService, applicationService, businessObjectsService) {

            var parentObjectType = $stateParams.params.type;
            var parentObjectID = $stateParams.params.id;

            if ($stateParams.params.type === 'salestarget') {
                parentObjectType = 7;
            }
            else if ($stateParams.params.type === 'individual') {
                parentObjectType = 3;
            };

            businessObjectsService.retrieveURIsWithFilter(null, parentObjectType, parentObjectID, function (data) {
                $scope.uris = data.outData.uris;
            });

            $scope.onAddUri = function () {
                $state.go('tab.adduri', { params: { type: parentObjectType, id: parentObjectID } });
            };

            $scope.onEditUri = function (uri) {
                $state.go('tab.edituri', { id: uri.UriID, params: { type: parentObjectType, id: parentObjectID } });
            };

            $scope.onDeleteUri = function (uri) {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Confirm Sales Target Deletion',
                    template: 'Are you sure you want to delete this uri?'
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        businessObjectsService.deleteUri(uri.UriID, function (data) {
                            businessObjectsService.retrieveURIsWithFilter(null, parentObjectType, parentObjectID, function (data) {
                                $scope.uris = data.outData.uris;
                            });
                        });
                    }
                });
            };

        }]);