angular.module('offensiveapp')
    .controller('reportabugcontroller', ['$scope', '$http', '$state', '$ionicPopup', '$location', 'authenticationservice', 'applicationservice', 'marketingservice',
        function ($scope, $http, $state, $ionicPopup, $location, authenticationService, applicationService, marketingService) {

            $scope.onSubmitReport = function () {
                var bugreport = $scope.$$childHead.bugreport;

                applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                    marketingService.reportABug(bugreport, securityUserID, function (data) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Sales Target',
                            template: 'Your bug report has been submitted!'
                        });                        
                    });
                });
            }


        }]);