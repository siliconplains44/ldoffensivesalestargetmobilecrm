angular.module('offensiveapp')
    .controller('adduricontroller', ['$scope', '$http', '$state', '$ionicPopup', '$stateParams', '$window', '$stateParams', '$location', 'authenticationservice', 'applicationservice', 'teamsservice', 'businessobjectsservice', 'campaignsservice',
        function ($scope, $http, $state, $ionicPopup, $stateParams, $window, $stateParams, $location, authenticationService, applicationService, teamsService, businessObjectsService, campaignsService) {

            $scope.formidentifierrequired = false;

            $scope.onCreateUri = function () {
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

                businessObjectsService.addUri(type, identifier, $stateParams.params.type, $stateParams.params.id, function (data) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Sales Target',
                        template: 'Uri has been added!'
                    });
                });

            };

        }]);