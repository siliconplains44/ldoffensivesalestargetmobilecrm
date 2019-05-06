angular.module('offensiveapp')
    .controller('addphonenumbercontroller', ['$scope', '$http', '$state', '$ionicPopup', '$stateParams', '$window', '$stateParams', '$location', 'authenticationservice', 'applicationservice', 'teamsservice', 'businessobjectsservice', 'campaignsservice',
        function ($scope, $http, $state, $ionicPopup, $stateParams, $window, $stateParams, $location, authenticationService, applicationService, teamsService, businessObjectsService, campaignsService) {

            $scope.formnumberrequired = false;

            $scope.onCreatePhoneNumber = function () {
                var type = $scope.$$childHead.type;
                var number = $scope.$$childHead.number;

                var isvalid = true;

                if (number == undefined) {
                    $scope.formnumberrequired = true;
                    isvalid = false;
                    $scope.$apply();
                }

                if (false == isvalid) {
                    return;
                }

                businessObjectsService.addPhoneNumber(type, number, $stateParams.params.type, $stateParams.params.id, function (data) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Sales Target',
                            template: 'Phone Number has been added!'
                        });
                    });

            };

        }]);