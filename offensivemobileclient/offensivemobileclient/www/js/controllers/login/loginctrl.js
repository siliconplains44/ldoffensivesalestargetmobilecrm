angular.module('offensiveapp')
    .controller('logincontroller', ['$scope', '$http', '$ionicNavBarDelegate', '$state', '$ionicPopup', '$location', 'authenticationservice', 'applicationservice', 'teamsservice',
        function ($scope, $ionicNavBarDelegate, $http, $state, $ionicPopup, $location, authenticationService, applicationService, teamsService) {
            $scope.data = {};
            //$ionicNavBarDelegate.showBackButton(false);

            $scope.init = function () {
                if (window.cordova) {
                    // running on device/emulator

                    var db = window.sqlitePlugin.openDatabase({ name: 'salestarget.db', location: 'default' });

                    db.transaction(function (tx) {
                        tx.executeSql('CREATE TABLE IF NOT EXISTS LastLogin (username, password)');                        
                        tx.executeSql("INSERT INTO LastLogin (username, password) SELECT '', '' WHERE NOT EXISTS(SELECT 1 FROM LastLogin)");
                    }, function (error) {
                        console.log('Transaction ERROR: ' + error.message);
                    }, function () {
                        console.log('Populated database OK');

                        db.transaction(function (txinner) {
                            txinner.executeSql('SELECT *  FROM LastLogin', [], function (txinnerinner, rs) {
                                if (rs.rows.length > 0) {
                                    $scope.data.username = rs.rows.item(0)['username'];
                                    $scope.data.password = rs.rows.item(0)['password'];

                                    $scope.$apply();
                                }
                            }, function (tx, error) {
                                console.log('SELECT error: ' + error.message);
                            });
                        });

                    });
                } else {
                    // running in dev mode
                }                
            };

            $scope.login = function() {
                console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);

                authenticationService.loginUser($scope.data.username,
                    $scope.data.password,
                    function(data) {

                        if (data.outData.loginresult === true) {

                            if (window.cordova) {
                                // running on device/emulator

                                // save off login to reopened later

                                var db = window.sqlitePlugin.openDatabase({ name: 'salestarget.db', location: 'default' });

                                db.sqlBatch([
                                        [
                                            'UPDATE LastLogin SET username = ?, password = ?',
                                            [$scope.data.username, $scope.data.password]
                                        ]
                                    ],
                                    function() {
                                        console.log('Populated database OK');
                                    },
                                    function(error) {
                                        console.log('SQL batch ERROR: ' + error.message);
                                    });
                            } else {
                                // running in dev mode
                            }

                            applicationService.getLoggedInSecurityUserID(function(securityUserID) {
                                teamsService.retrieveHandle(securityUserID,
                                    function(data) {

                                        if (data.outData.handle === null) {
                                            $state.go('handle');
                                        } else {
                                            applicationService.getCurrentTeam(function(currentTeamID) {
                                                if (currentTeamID === null) {
                                                    $location.path('/postloginactionchoices').replace();
                                                } else {
                                                    $state.go('tab.salestargets');
                                                }
                                            });
                                        }
                                    });
                            });
                        } else {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Sales Target',
                                template: 'Login failed!'
                            });
                        }
                    });
            };
        }]);

