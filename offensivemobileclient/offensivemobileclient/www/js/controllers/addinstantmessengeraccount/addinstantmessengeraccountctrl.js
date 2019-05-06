angular.module('offensiveapp')
    .controller('addinstantmessengeraccountcontroller', ['$scope', '$http', '$state', '$ionicPopup', '$stateParams', '$window', '$stateParams', '$location', 'authenticationservice', 'applicationservice', 'teamsservice', 'businessobjectsservice', 'campaignsservice',
        function ($scope, $http, $state, $ionicPopup, $stateParams, $window, $stateParams, $location, authenticationService, applicationService, teamsService, businessObjectsService, campaignsService) {

            $scope.formhandlerequired = false;

            $scope.onCreateInstantMessageAccount = function () {
                var type = $scope.$$childHead.type;
                var handle = $scope.$$childHead.handle;

                var isvalid = true;

                if (handle == undefined) {
                    $scope.formhandlerequired = true;
                    isvalid = false;
                    $scope.$apply();
                }

                if (false == isvalid) {
                    return;
                }

                businessObjectsService.addInstantMessengerAccount(type, handle, $stateParams.params.type, $stateParams.params.id, function (data) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Sales Target',
                        template: 'Instant Messenger Account has been added!'
                    });
                });

            };

        }]);