angular.module('offensiveapp')
    .controller('sendafrowncontroller', ['$scope', '$http', '$state', '$ionicPopup', '$location', 'authenticationservice', 'applicationservice', 'marketingservice',
        function ($scope, $http, $state, $ionicPopup, $location, authenticationService, applicationService, marketingService) {

            $scope.onSubmitFrown = function () {
                var frownreport = $scope.$$childHead.frownreport;

                applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                    marketingService.sendAFrown(frownreport, securityUserID, false, '', function (data) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Sales Target',
                            template: 'Your frown has been submitted!'
                        });
                    });
                });
            }

        }]);