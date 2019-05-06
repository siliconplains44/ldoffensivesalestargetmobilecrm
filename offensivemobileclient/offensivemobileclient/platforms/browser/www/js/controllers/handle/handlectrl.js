angular.module('offensiveapp')
    .controller('handlecontroller', ['$scope', '$http', '$ionicNavBarDelegate', '$state', '$ionicPopup', '$location', 'authenticationservice', 'applicationservice', 'teamsservice',
        function ($scope, $ionicNavBarDelegate, $http, $state, $ionicPopup, $location, authenticationService, applicationService, teamsService) {
            $scope.data = {};
            //$ionicNavBarDelegate.showBackButton(false);

            $scope.onAttemptCreateHandle = function () {
                
                teamsService.retrieveHandleByName($scope.data.handle, function(data) {
                    if (data.outData.handle == null) {
                        applicationService.getLoggedInSecurityUserID(function (securityUserID) {

                            teamsService.updateHandle(securityUserID, $scope.data.handle, function (data) {
                                $state.go('login');
                            });
                        });
                    }
                    else {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Sales Target',
                            template: 'Handle is already taken, please create another and press submit again!'
                        });
                    }
                });
            }
        }]);