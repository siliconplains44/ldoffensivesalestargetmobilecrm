angular.module('offensiveapp')
    .controller('manageteammileagecontroller', ['$scope', '$http', '$state', '$ionicPopup', '$location', 'authenticationservice', 'applicationservice', 'teamsservice', 'businessobjectsservice',
        function ($scope, $http, $state, $ionicPopup, $location, authenticationService, applicationService, teamsService, businessObjectsService) {

            var theCurrentTeamID = null;

            $scope.choice = "not";

            applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                applicationService.getCurrentTeam(function (currentTeamID) {
                    if (currentTeamID != null) {
                        theCurrentTeamID = currentTeamID;

                        businessObjectsService.retrieveMileageLogEntriesNotReimbursedByTeamID(theCurrentTeamID, function (data) {
                            $scope.notreimbursedmileagelogentries = data.outData.notreimbursedmileagelogentries;
                        });

                        businessObjectsService.retrieveMileageLogEntriesReimbursedByTeamID(theCurrentTeamID, function (data) {
                            $scope.reimbursedmileagelogentries = data.outData.reimbursedmileagelogentries;
                        });
                    }
                });
            });


            $scope.onShowMileageLogEntriesNotReimbursed = function () {
                $scope.shownotreimbursed = true;
                $scope.showreimbursed = false;
                $scope.$apply();
            };

            $scope.onShowMileageLogEntriesReimbursed = function () {
                $scope.shownotreimbursed = false;
                $scope.showreimbursed = true;
                $scope.$apply();
            };

            $scope.onSetReimbursed = function () {

                async.series([
                    function (cb) {
                        async.each($scope.notreimbursedmileagelogentries, function (item, callback) {
                            if (item.ischecked) {
                                if (item.ischecked == true) {
                                    businessObjectsService.setMileageLogEntryReimbursed(item.MileageLogEntryID, function (data) {
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
                        businessObjectsService.retrieveMileageLogEntriesNotReimbursedByTeamID(theCurrentTeamID, function (data) {
                            $scope.notreimbursedmileagelogentries = data.outData.notreimbursedmileagelogentries;
                            cb(null, null);
                        });
                    },
                    function (cb) {
                        businessObjectsService.retrieveMileageLogEntriesReimbursedByTeamID(theCurrentTeamID, function (data) {
                            $scope.reimbursedmileagelogentries = data.outData.reimbursedmileagelogentries;
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
                        async.each($scope.reimbursedmileagelogentries, function (item, callback) {
                            if (item.ischecked) {
                                if (item.ischecked == true) {
                                    businessObjectsService.setMileageLogEntryUnreimbursed(item.MileageLogEntryID, function (data) {
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
                        businessObjectsService.retrieveMileageLogEntriesNotReimbursedByTeamID(theCurrentTeamID, function (data) {
                            $scope.notreimbursedmileagelogentries = data.outData.notreimbursedmileagelogentries;
                            cb(null, null);
                        });
                    },
                    function (cb) {
                        businessObjectsService.retrieveMileageLogEntriesReimbursedByTeamID(theCurrentTeamID, function (data) {
                            $scope.reimbursedmileagelogentries = data.outData.reimbursedmileagelogentries;
                            cb(null, null);
                        });
                    }
                ], function (err, results) {
                    $scope.$apply();
                });

            };

            $scope.onShowMileageLogEntriesNotReimbursed();

        }]);
