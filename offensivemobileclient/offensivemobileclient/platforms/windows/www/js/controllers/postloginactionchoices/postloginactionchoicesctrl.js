angular.module('offensiveapp')
    .controller('postloginactionchoicescontroller', ['$scope', '$http', '$state', '$ionicPopup', '$location', 'applicationservice',
        function ($scope, $http, $state, $ionicPopup, $location, applicationService) {

            $scope.choice = 'join';

            $scope.onRunAction = function () {
                if ($scope.choice == 'join') {
                    $location.path('/joinateam').replace();
                }
                else {
                    $location.path('/createateam').replace();
                }
            };
        }]);
