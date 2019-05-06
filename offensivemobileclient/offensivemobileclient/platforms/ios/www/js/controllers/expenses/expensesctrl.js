angular.module('offensiveapp')
    .controller('expensescontroller', ['$scope', '$http', '$state', '$ionicPopup', '$stateParams', '$location', 'authenticationservice', 'applicationservice', 'businessobjectsservice',
        function ($scope, $http, $state, $ionicPopup, $stateParams, $location, authenticationService, applicationService, businessObjectsService) {

            applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                businessObjectsService.retrieveExpensesWithFilter(null, securityUserID, null, null, null, function (data) {
                    $scope.expenses = data.outData.expenses;
                });
            });

            $scope.onAddExpense = function () {
                $state.go('tab.addexpense', { params: { type: null, id: null } });
            };

            $scope.onEditExpense = function (expense) {
                $state.go('tab.editexpense', { id: expense.ExpenseID, params: { type: null, id: null } });
            };

            $scope.onDeleteExpense = function (expense) {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Confirm Sales Target Deletion',
                    template: 'Are you sure you want to delete this expense?'
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        businessObjectsService.deleteExpense(expense.ExpenseID, function (data) {
                            applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                                businessObjectsService.retrieveExpensesWithFilter(null, securityUserID, null, null, null, function (data) {
                                    $scope.expenses = data.outData.expenses;
                                });
                            });
                        });
                    }
                });
            };

        }]);

