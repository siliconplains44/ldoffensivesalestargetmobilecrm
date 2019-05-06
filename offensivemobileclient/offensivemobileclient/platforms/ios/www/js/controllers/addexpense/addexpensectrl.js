angular.module('offensiveapp')
    .controller('addexpensecontroller', ['$scope', '$http', '$state', '$ionicPopup', '$stateParams', '$window', '$stateParams', '$location', 'authenticationservice', 'applicationservice', 'teamsservice', 'businessobjectsservice', 'campaignsservice',
        function ($scope, $http, $state, $ionicPopup, $stateParams, $window, $stateParams, $location, authenticationService, applicationService, teamsService, businessobjectsservice, campaignsService) {

            $scope.formnamerequired = false;
            $scope.formamountrequired = false;

            $scope.onCreateExpense = function () {
                var name = $scope.$$childHead.name;
                var description = $scope.$$childHead.description;
                var amount = $scope.$$childHead.amount;

                var isvalid = true;

                if (name == undefined) {
                    $scope.formnamerequired = true;
                    isvalid = false;
                    $scope.$apply();
                }

                if (amount == undefined) {
                    $scope.formamountrequired = true;
                    isvalid = false;
                    $scope.$apply();
                }

                if (false == isvalid) {
                    return;
                }

                applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                    businessobjectsservice.addExpense(name, description, securityUserID,
                                                              null, null,
                                                              amount, 0, function (data) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Sales Target',
                            template: 'Expense has been added!'
                        });
                    });
                });
            };

        }]);

