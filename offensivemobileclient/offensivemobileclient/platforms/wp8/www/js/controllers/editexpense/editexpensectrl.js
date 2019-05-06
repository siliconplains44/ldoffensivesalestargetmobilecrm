angular.module('offensiveapp')
    .controller('editexpensecontroller', ['$scope', '$http', '$state', '$ionicPopup', '$stateParams', '$window', '$stateParams', '$location', 'authenticationservice', 'applicationservice', 'teamsservice', 'businessobjectsservice', 'campaignsservice',
        function ($scope, $http, $state, $ionicPopup, $stateParams, $window, $stateParams, $location, authenticationService, applicationService, teamsService, businessObjectsService, campaignsService) {

            $scope.formnamerequired = false;
            $scope.formamountrequired = false;

            var expenseID = $location.$$path.split("/")[3];

            applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                businessObjectsService.retrieveExpensesWithFilter(parseInt(expenseID), null, null, null, null, function (data) {
                    $scope.$$childHead.name = data.outData.expenses[0].Name;
                    $scope.$$childHead.description = data.outData.expenses[0].Description;
                    $scope.$$childHead.amount = data.outData.expenses[0].Amount;
                });
            });

            $scope.onModifyExpense = function () {
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
                    businessObjectsService.modifyExpense(parseInt(expenseID), name, description, securityUserID,
                                                              null, null,
                                                              amount, 0, function (data) {
                                                                  var alertPopup = $ionicPopup.alert({
                                                                      title: 'Sales Target',
                                                                      template: 'Expense has been modified!'
                                                                  });
                                                              });
                });
            };

        }]);