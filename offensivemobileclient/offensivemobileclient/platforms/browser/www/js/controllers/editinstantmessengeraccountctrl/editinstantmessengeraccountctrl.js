angular.module('offensiveapp')
    .controller('editinstantmessengeraccountcontroller', ['$scope', '$http', '$state', '$ionicPopup', '$window', '$stateParams', '$location', 'authenticationservice', 'applicationservice', 'teamsservice', 'businessobjectsservice', 'campaignsservice',
        function ($scope, $http, $state, $ionicPopup, $window, $stateParams, $location, authenticationService, applicationService, teamsService, businessObjectsService, campaignsService) {

            $scope.formhandlerequired = false;

            var instantMessageAccountID = $location.$$path.split("/")[3];

            businessObjectsService.retrieveInstantMessengerAccountsWithFilter(parseInt(instantMessageAccountID), null, null, function (data) {
                $scope.$$childHead.type = data.outData.instantmessageaccounts[0].Type;
                $scope.$$childHead.handle = data.outData.instantmessageaccounts[0].Handle;
            });

            $scope.onModifyInstantMessageAccount = function () {
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


                businessObjectsService.modifyInstantMessengerAccount(parseInt(instantMessageAccountID), type, handle, $stateParams.params.type, $stateParams.params.id,
                    function (data) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Sales Target',
                            template: 'Instant Messenger Account has been edited!'
                        });
                    });
            };

        }]);