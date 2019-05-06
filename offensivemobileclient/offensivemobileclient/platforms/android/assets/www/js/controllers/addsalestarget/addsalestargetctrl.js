angular.module('offensiveapp')
    .controller('addsalestargetcontroller', ['$scope', '$http', '$state', '$stateParams', '$ionicPopup', '$location', 'authenticationservice', 'applicationservice', 'businessobjectsservice',
        function ($scope, $http, $state, $stateParams, $ionicPopup, $location, authenticationService, applicationService, businessObjectsService) {

            $scope.choice = $stateParams.params.type;
            $scope.$apply();

            $scope.onBack = function () {
                window.history.back();
            };

            $scope.onCreateSalesTarget = function () {
                var name = $scope.$$childHead.name;

                applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                    applicationService.getCurrentTeam(function(currentTeamID) {
                        businessObjectsService.addSalesTarget(name, securityUserID, $scope.choice, currentTeamID,  function (data) {
                            window.history.back();
                        });
                    });
                });
            };

        }]);
