angular.module('offensiveapp')
    .controller('addmileagelogentrycontroller', ['$scope', '$http', '$state', '$ionicPopup', '$stateParams', '$window', '$stateParams', '$location', 'authenticationservice', 'applicationservice', 'teamsservice', 'businessobjectsservice', 'campaignsservice',
        function ($scope, $http, $state, $ionicPopup, $stateParams, $window, $stateParams, $location, authenticationService, applicationService, teamsService, businessObjectsService, campaignsService) {

            $scope.formoccurredrequired = false;
            $scope.formdescriptionrequired = false;
            $scope.formstartingmileagerequired = false;
            $scope.formendingmileagerequired = false;

            $scope.onCreateMileageLogEntry = function () {
                var occurred = $scope.$$childHead.occurred;
                var description = $scope.$$childHead.description;
                var startingmileage = $scope.$$childHead.startingmileage;
                var endingmileage = $scope.$$childHead.endingmileage;

                var isvalid = true;

                if (occurred == undefined) {
                    $scope.formoccurredrequired = true;
                    isvalid = false;
                    $scope.$apply();
                }

                if (description == undefined) {
                    $scope.formdescriptionrequired = true;
                    isvalid = false;
                    $scope.$apply();
                }

                if (startingmileage == undefined) {
                    $scope.formstartingmileagerequired = true;
                    isvalid = false;
                    $scope.$apply();
                }

                if (endingmileage == undefined) {
                    $scope.formendingmileagerequired = true;
                    isvalid = false;
                    $scope.$apply();
                }

                if (false == isvalid) {
                    return;
                }

                applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                    businessObjectsService.addMileageLogEntry(occurred, description, securityUserID, startingmileage, endingmileage, 0, function (data) {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Sales Target',
                                template: 'Mileage Log Entry has been added!'
                            });
                        });
                });
            };

        }]);

