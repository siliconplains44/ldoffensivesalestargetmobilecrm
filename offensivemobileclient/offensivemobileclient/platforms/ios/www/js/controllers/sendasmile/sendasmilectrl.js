angular.module('offensiveapp')
    .controller('sendasmilecontroller', ['$scope', '$http', '$state', '$ionicPopup', '$location', 'authenticationservice', 'applicationservice', 'marketingservice',
        function ($scope, $http, $state, $ionicPopup, $location, authenticationService, applicationService, marketingService) {

            $scope.onSubmitSmile = function () {
                var smilereport = $scope.$$childHead.smilereport;

                applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                    marketingService.sendASmile(smilereport, securityUserID, false, '', function (data) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Sales Target',
                            template: 'Your smile has been submitted!'
                        });
                    });
                });
            }

        }]);