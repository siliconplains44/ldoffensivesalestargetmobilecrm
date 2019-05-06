angular.module('offensiveapp')
    .controller('addemailaddresscontroller', ['$scope', '$http', '$state', '$ionicPopup', '$stateParams', '$window', '$stateParams', '$location', 'authenticationservice', 'applicationservice', 'teamsservice', 'businessobjectsservice', 'campaignsservice',
        function ($scope, $http, $state, $ionicPopup, $stateParams, $window, $stateParams, $location, authenticationService, applicationService, teamsService, businessObjectsService, campaignsService) {

            $scope.formaddressrequired = false;

            $scope.onCreateEmailAddress = function () {
                var type = $scope.$$childHead.type;
                var address = $scope.$$childHead.address;

                var isvalid = true;

                if (address == undefined) {
                    $scope.formaddressrequired = true;
                    isvalid = false;
                    $scope.$apply();
                }

                if (false == isvalid) {
                    return;
                }

                businessObjectsService.addEmailAddress(type, address, $stateParams.params.type, $stateParams.params.id, function (data) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Sales Target',
                        template: 'Email Address has been added!'
                    });
                });

            };

        }]);