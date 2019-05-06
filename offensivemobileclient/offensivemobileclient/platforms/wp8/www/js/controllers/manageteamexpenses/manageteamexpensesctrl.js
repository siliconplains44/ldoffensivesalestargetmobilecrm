angular.module('offensiveapp')
    .controller('manageteamexpensescontroller', ['$scope', '$log', '$http', '$state', '$ionicPopup', '$location', 'authenticationservice', 'applicationservice', 'teamsservice', 'businessobjectsservice',
        function ($scope, $log, $http, $state, $ionicPopup, $location, authenticationService, applicationService, teamsService, businessObjectsService) {

            var theCurrentTeamID = null;

            $scope.choice = "not";

            applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                applicationService.getCurrentTeam(function (currentTeamID) {
                    if (currentTeamID != null) {
                        theCurrentTeamID = currentTeamID;

                        businessObjectsService.retrieveExpensesNotReimbursedByTeamID(theCurrentTeamID, function (data) {
                            $scope.notreimbursedexpenses = data.outData.notreimbursedexpenses;
                        });

                        businessObjectsService.retrieveExpensesReimbursedByTeamID(theCurrentTeamID, function (data) {
                            $scope.reimbursedexpenses = data.outData.reimbursedexpenses;
                        });
                    }
                });
            });

                
            $scope.onShowExpensesNotReimbursed = function () {
                $scope.shownotreimbursed = true;
                $scope.showreimbursed = false;
                $scope.$apply();
            };

            $scope.onShowExpensesReimbursed = function () {
                $scope.shownotreimbursed = false;
                $scope.showreimbursed = true;
                $scope.$apply();
            };

            $scope.onSetReimbursed = function () {

                async.series([
                    function (cb) {
                        async.each($scope.notreimbursedexpenses, function (item, callback) {
                            if (item.ischecked) {
                                if (item.ischecked == true) {
                                    businessObjectsService.setExpenseReimbursed(item.ExpenseID, function (data) {
                                        callback();
                                    });
                                }
                            }
                            else {
                                callback();
                            }
                        }, function (err) {
                            cb(null, null);
                        });
                    },
                    function (cb) {
                        businessObjectsService.retrieveExpensesNotReimbursedByTeamID(theCurrentTeamID, function (data) {
                            $scope.notreimbursedexpenses = data.outData.notreimbursedexpenses;
                            cb(null, null);
                        });
                    },
                    function (cb) {
                        businessObjectsService.retrieveExpensesReimbursedByTeamID(theCurrentTeamID, function (data) {
                            $scope.reimbursedexpenses = data.outData.reimbursedexpenses;
                            cb(null, null);
                        });
                    }
                ], function (err, results) {
                    $scope.$apply();
                });

            };

            $scope.onSetNotReimbursed = function () {

                async.series([
                    function (cb) {
                        async.each($scope.reimbursedexpenses, function (item, callback) {
                            if (item.ischecked) {
                                if (item.ischecked == true) {
                                    businessObjectsService.setExpenseUnreimbursed(item.ExpenseID, function (data) {
                                        callback();
                                    });
                                }
                            }
                            else {
                                callback();
                            }
                        }, function (err) {
                            cb(null, null);
                        });
                    },
                    function (cb) {
                        businessObjectsService.retrieveExpensesNotReimbursedByTeamID(theCurrentTeamID, function (data) {
                            $scope.notreimbursedexpenses = data.outData.notreimbursedexpenses;
                            cb(null, null);
                        });
                    },
                    function (cb) {
                        businessObjectsService.retrieveExpensesReimbursedByTeamID(theCurrentTeamID, function (data) {
                            $scope.reimbursedexpenses = data.outData.reimbursedexpenses;
                            cb(null, null);
                        });
                    }
                ], function (err, results) {
                    $scope.$apply();
                });

            };

            $scope.onShowExpensesNotReimbursed();

        }]);
