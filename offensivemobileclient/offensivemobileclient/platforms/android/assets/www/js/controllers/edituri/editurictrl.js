angular.module('offensiveapp')
    .controller('edituricontroller', ['$scope', '$http', '$state', '$ionicPopup', '$window', '$stateParams', '$location', 'authenticationservice', 'applicationservice', 'teamsservice', 'businessobjectsservice', 'campaignsservice',
        function ($scope, $http, $state, $ionicPopup, $window, $stateParams, $location, authenticationService, applicationService, teamsService, businessObjectsService, campaignsService) {

            $scope.formidentifierrequired = false;

            var uriID = $location.$$path.split("/")[3];

            businessObjectsService.retrieveURIsWithFilter(parseInt(uriID), null, null, function (data) {
                $scope.$$childHead.type = data.outData.uris[0].Type;
                $scope.$$childHead.identifier = data.outData.uris[0].Identifier;
            });

            $scope.onModifyUri = function () {
                var type = $scope.$$childHead.type;
                var identifier = $scope.$$childHead.identifier;

                var isvalid = true;

                if (identifier == undefined) {
                    $scope.formidentifierrequired = true;
                    isvalid = false;
                    $scope.$apply();
                }

                if (false == isvalid) {
                    return;
                }


                businessObjectsService.modifyUri(parseInt(uriID), type, identifier, $stateParams.params.type, $stateParams.params.id,
                    function (data) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Sales Target',
                            template: 'Uri has been edited!'
                        });
                    });
            };

        }]);