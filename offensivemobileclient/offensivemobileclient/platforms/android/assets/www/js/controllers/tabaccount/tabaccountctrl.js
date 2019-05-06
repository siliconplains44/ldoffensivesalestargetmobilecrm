angular.module('offensiveapp')
    .controller('tabaccountcontroller', ['$scope', '$http', '$state', '$ionicPopup', '$ionicPlatform', '$location', 'authenticationservice', 'applicationservice', 'marketingservice',
        function ($scope, $http, $state, $ionicPopup, $ionicPlatform, $location, authenticationService, applicationService, marketingService) {

            $scope.onSignOutClick = function () {

                $state.go('login');
            }

        }]);